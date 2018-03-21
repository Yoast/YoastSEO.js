const Assessment = require( "../../assessment.js" );
const AssessmentResult = require( "../../values/AssessmentResult.js" );
const countWords = require( "../../stringProcessing/countWords.js" );
const inRange = require( "../../helpers/inRange.js" );
const recommendedKeywordCount = require( "../../assessmentHelpers/recommendedKeywordCount.js" );
const merge = require( "lodash/merge" );

const inRangeEndInclusive = inRange.inRangeEndInclusive;
const inRangeStartInclusive = inRange.inRangeStartInclusive;
const inRangeStartEndInclusive = inRange.inRangeStartEndInclusive;

class KeywordDensityAssessment extends Assessment {

	/**
	 * Sets the identifier and the config.
	 *
	 * @param {object} config The configuration to use.
	 *
	 * @returns {void}
	 */
	constructor( config = {} ) {
		super();

		let defaultConfig = {
			overMaximum: 4,
			maximum: 3,
			minimum: 0.5,
			scores: {
				wayOverMaximum: -50,
				overMaximum: -10,
				correctDensity: 9,
				underMinimum: 4,
			},
		};

		this.identifier = "keywordDensity";
		this._config = merge( defaultConfig, config );
	}

	/**
	 * Runs the keyword density module, based on this returns an assessment result with score.
	 *
	 * @param {Paper} paper The paper to use for the assessment.
	 * @param {Researcher} researcher The researcher used for calling the research.
	 * @param {object} i18n The object used for translations
	 *
	 * @returns {AssessmentResult} The assessment result.
	 */
	getResult( paper, researcher, i18n ) {
		let assessmentResult = new AssessmentResult();

		this._keywordCount = researcher.getResearch( "keywordCount" );
		this._keywordDensity = researcher.getResearch( "getKeywordDensity" );
		this._minRecommendedKeywordCount = recommendedKeywordCount( paper, this._config.minimum, "min" );
		this._maxRecommendedKeywordCount = recommendedKeywordCount( paper, this._config.maximum, "max" );

		assessmentResult.setScore( this.calculateScore() );
		assessmentResult.setText( this.translateScore( i18n ) );

		return assessmentResult;
	}

	/*
	 * Checks whether there are no keyword matches in the text.
	 *
	 * @returns {boolean} Returns true if the keyword count is 0.
	 */
	hasNoMatches() {
		return this._keywordCount === 0;
	}

	/*
	 * Checks whether there are too few keyword matches in the text. One keyword match is always considered
	 * as bad, regardless of the density.
	 *
	 * @returns {boolean} Returns true if the rounded keyword density is between 0 and the recommended minimum
	 * or if there there is only 1 keyword match (regardless of the density).
	 */
	hasTooFewMatches() {
		return inRangeStartInclusive( this._keywordDensity, 0, this._config.minimum ) ||
			this._keywordCount === 1;
	}

	/*
	 * Checks whether there is a good number of keyword matches in the text. Two keyword matches are always
	 * considered as good, regardless of the density.
	 *
	 * @returns {boolean} Returns true if the rounded keyword density is between the recommended minimum
	 * and the recommended maximum or if the keyword count is 2 and the recommended minimum is lower than 2.
	 */
	hasGoodNumberOfMatches() {
		return inRangeStartEndInclusive( this._keywordDensity, this._config.minimum, this._config.maximum ) ||
			( this._keywordCount === 2 && this._minRecommendedKeywordCount <= 2 );
	}

	/*
	 * Checks whether the number of keyword matches in the text is between the recommended maximum and the
	 * specified overMaximum value.
	 *
	 * @returns {boolean} Returns true if the rounded keyword density is between the recommended maximum and
	 * the specified overMaximum value.
	 */
	hasTooManyMatches() {
		return inRangeEndInclusive( this._keywordDensity, this._config.maximum, this._config.overMaximum );
	}

	/**
	 * Returns the score for the keyword density.
	 *
	 * @returns {number} The calculated score.
	 */
	calculateScore() {
		const {
			wayOverMaximum,
			overMaximum,
			correctDensity,
			underMinimum,
		} = this._config.scores;

		if ( this.hasNoMatches() || this.hasTooFewMatches() ) {
			return underMinimum;
		}

		if ( this.hasGoodNumberOfMatches()  ) {
			return correctDensity;
		}

		if ( this.hasTooManyMatches() ) {
			return overMaximum;
		}

		// Implicitly returns this if the rounded keyword density is higher than overMaximum.
		return wayOverMaximum;
	}

	/**
	 * Translates the keyword density assessment to a message the user can understand.
	 *
	 * @param {object} i18n The object used for translations.
	 *
	 * @returns {string} The translated string.
	 */
	translateScore( i18n ) {
		if( this.hasNoMatches() ) {
			return i18n.sprintf( i18n.dgettext(
					"js-text-analysis",
					/* Translators: %1$d expands to the recommended keyword count. */
					"The focus keyword was found 0 times. That's less than the recommended minimum of %1$d times for a text of this length.",
					this._keywordCount
				), this._minRecommendedKeywordCount );
		}

		if( this.hasTooFewMatches() ) {
			return i18n.sprintf( i18n.dngettext(
					"js-text-analysis",
					/* Translators: Translators: %1$d expands to the keyword count. %2$d expands to the recommended keyword count. */
					"The focus keyword was found %1$d time. That's less than the recommended minimum of %2$d times for a text of this length.",
					"The focus keyword was found %1$d times. That's less than the recommended minimum of %2$d times for a text of this length.",
					this._keywordCount
				), this._keywordCount, this._minRecommendedKeywordCount );
		}

		if ( this.hasGoodNumberOfMatches() ) {
			return i18n.sprintf( i18n.dgettext(
					"js-text-analysis",
					/* Translators: %1$d expands to the keyword count. */
					"The focus keyword was found %1$d times. That's great for a text of this length."
				), this._keywordCount );
		}

		if ( this.hasTooManyMatches() ) {
			return i18n.sprintf( i18n.dgettext(
					"js-text-analysis",
					/* Translators: %1$d expands to the keyword count. %2$d expands to the recommended keyword count. */
					"The focus keyword was found %1$d times." +
					" That's more than the recommended maximum of %2$d times for a text of this length."
				), this._keywordCount, this._maxRecommendedKeywordCount );
		}

		// Implicitly returns this if the rounded keyword density is higher than overMaximum.
		return i18n.sprintf( i18n.dgettext(
				"js-text-analysis",
				/* Translators: %1$d expands to the keyword count. %2$d expands to the recommended keyword count. */
				"The focus keyword was found %1$d times." +
				" That's way more than the recommended maximum of %2$d times for a text of this length."
			), this._keywordCount, this._maxRecommendedKeywordCount );
	}

	/**
	 * Checks whether the paper has a text with at least 100 words and a keyword is set.
	 *
	 * @param {Paper} paper The paper to use for the assessment.
	 *
	 * @returns {boolean} True when there is text with at least 100 words and a keyword is set.
	 */
	isApplicable( paper ) {
		return paper.hasText() && paper.hasKeyword() && countWords( paper.getText() ) >= 100;
	}
}

module.exports = KeywordDensityAssessment;
