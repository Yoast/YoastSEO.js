const Assessment = require( "../../assessment.js" );
const AssessmentResult = require( "../../values/AssessmentResult.js" );
const countWords = require( "../../stringProcessing/countWords.js" );
const formatNumber = require( "../../helpers/formatNumber.js" );
const inRange = require( "../../helpers/inRange.js" );
const recommendedKeywordCount = require( "../../assessmentHelpers/recommendedKeywordCount.js" );
const merge = require( "lodash/merge" );

const inRangeEndInclusive = inRange.inRangeEndInclusive;
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
	 * @param {Researcher} researcher The researcher used for calling research.
	 * @param {object} i18n The object used for translations
	 *
	 * @returns {AssessmentResult} The assessment result.
	 */
	getResult( paper, researcher, i18n ) {
		let keywordDensity = researcher.getResearch( "getKeywordDensity" );
		let keywordCount = researcher.getResearch( "keywordCount" );
		let assessmentResult = new AssessmentResult();

		assessmentResult.setScore( this.calculateScore( keywordDensity, keywordCount, paper ) );
		assessmentResult.setText( this.translateScore( keywordDensity, i18n, keywordCount, paper ) );

		return assessmentResult;
	}

	/**
	 * Returns the score for the keyword density.
	 *
	 * @param {number} keywordDensity The keyword density in the text.
	 * @param {number} keywordCount The number of keywords found in the text.
	 * @param {Paper} paper The paper to use for the assessment.
	 *
	 * @returns {number} The calculated score.
	 */
	calculateScore( keywordDensity, keywordCount, paper ) {
		let roundedKeywordDensity = formatNumber( keywordDensity );
		let minRecommendedKeywordCount = recommendedKeywordCount( paper, this._config.minimum, "min" );

		const {
			wayOverMaximum,
			overMaximum,
			correctDensity,
			underMinimum,
		} = this._config.scores;

		// The keyword should at least occur twice in a post, regardless of the density.
		if( keywordCount < 2 ) {
			return underMinimum;
		}

		/*
		 * Two occurrences are correct even if the recommended count according to the formula
		 * would be lower. However if the recommended minimum keyword count is higher than 2,
		 * this does not apply.
		 */
		if( keywordCount === 2 && minRecommendedKeywordCount <= 2  ) {
			return correctDensity;
		}

		if ( roundedKeywordDensity > this._config.overMaximum ) {
			return wayOverMaximum;
		}

		if ( inRangeEndInclusive( roundedKeywordDensity, this._config.maximum, this._config.overMaximum ) ) {
			return overMaximum;
		}

		if ( inRangeStartEndInclusive( roundedKeywordDensity, this._config.minimum, this._config.maximum ) ) {
			return correctDensity;
		}

		// Implicitly returns this if roundedKeywordDensity is between 0 and the recommended minimum.
		return underMinimum;
	}

	/**
	 * Translates the keyword density assessment to a message the user can understand.
	 *
	 * @param {number} keywordDensity The keyword density in the text.
	 * @param {object} i18n The object used for translations.
	 * @param {number} keywordCount The number of keywords found in the text.
	 * @param {Paper} paper The paper to use for the assessment.
	 *
	 * @returns {string} The translated string.
	 */
	translateScore( keywordDensity, i18n, keywordCount, paper ) {
		let roundedKeywordDensity = formatNumber( keywordDensity );
		let maxRecommendedKeywordCount = recommendedKeywordCount( paper, this._config.maximum, "max" );
		let minRecommendedKeywordCount = recommendedKeywordCount( paper, this._config.minimum, "min" );

		// The keyword should at least occur twice in a post, regardless of the density.
		if( keywordCount < 2 ) {
			return i18n.sprintf( i18n.dgettext( "js-text-analysis", "The focus keyphrase was found %1$d time(s)." +
					" That's less than than the advised minimum of %2$d time(s) for a text of this length." ),
				keywordCount, minRecommendedKeywordCount );
		}

		/*
		 * Two occurrences are correct even if the recommended count according to the formula
		 * would be lower. However if the recommended minimum keyword count is higher than 2,
		 * this does not apply.
		 */
		if( keywordCount === 2 && minRecommendedKeywordCount <= 2 ) {
			return i18n.sprintf( i18n.dgettext( "js-text-analysis", "The focus keyphrase was found %1$d time(s)." +
					" That's great for a text of this length." ), keywordCount );
		}

		if ( roundedKeywordDensity > this._config.overMaximum ) {
			return i18n.sprintf( i18n.dgettext( "js-text-analysis", "The focus keyphrase was found %1$d time(s)." +
					" That's way more than the advised maximum of %2$d time(s) for a text of this length." ),
				keywordCount, maxRecommendedKeywordCount );
		}

		if ( inRangeEndInclusive( roundedKeywordDensity, this._config.maximum, this._config.overMaximum ) ) {
			return i18n.sprintf( i18n.dgettext( "js-text-analysis", "The focus keyphrase was found %1$d time(s)." +
					" That's more than the advised maximum of %2$d time(s) for a text of this length." ),
				keywordCount, maxRecommendedKeywordCount );
		}

		if ( inRangeStartEndInclusive( roundedKeywordDensity, this._config.minimum, this._config.maximum ) ) {
			return i18n.sprintf( i18n.dgettext( "js-text-analysis", "The focus keyphrase was found %1$d time(s)." +
				" That's great for a text of this length." ), keywordCount );
		}

		// Implicitly returns this if roundedKeywordDensity is between 0 and the recommended minimum.
		return i18n.sprintf( i18n.dgettext( "js-text-analysis", "The focus keyphrase was found %1$d time(s)." +
				" That's less than than the advised minimum of %2$d time(s) for a text of this length." ),
			keywordCount, minRecommendedKeywordCount );
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
