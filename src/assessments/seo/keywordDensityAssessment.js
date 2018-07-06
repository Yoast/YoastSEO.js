const Assessment = require( "../../assessment.js" );
const AssessmentResult = require( "../../values/AssessmentResult.js" );
const countWords = require( "../../stringProcessing/countWords.js" );
const inRange = require( "../../helpers/inRange.js" );
const recommendedKeywordCount = require( "../../assessmentHelpers/recommendedKeywordCount.js" );
const topicCount = require( "../../researches/topicCount" );
const merge = require( "lodash/merge" );

const inRangeEndInclusive = inRange.inRangeEndInclusive;
const inRangeStartInclusive = inRange.inRangeStartInclusive;
const inRangeStartEndInclusive = inRange.inRangeStartEndInclusive;

/**
 * Represents the assessment that will look if the keyword density is within the recommended range.
 */
class KeywordDensityAssessment extends Assessment {
	/**
	 * Sets the identifier and the config.
	 *
	 * @param {Object} config The configuration to use.
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
			url: "<a href='https://yoa.st/2pe' target='_blank'>",
		};

		this.identifier = "keywordDensity";
		this._config = merge( defaultConfig, config );
	}

	/**
	 * Runs the keyword density module, based on this returns an assessment result with score.
	 *
	 * @param {Paper} paper The paper to use for the assessment.
	 * @param {Researcher} researcher The researcher used for calling the research.
	 * @param {Object} i18n The object used for translations.
	 *
	 * @returns {AssessmentResult} The assessment result.
	 */
	getResult( paper, researcher, i18n ) {
		let assessmentResult = new AssessmentResult();

		this._keywordCount = researcher.getResearch( "keywordCount" ).count;
		this._keywordDensity = researcher.getResearch( "getKeywordDensity" );
		this._minRecommendedKeywordCount = recommendedKeywordCount( paper, this._config.minimum, "min" );
		this._maxRecommendedKeywordCount = recommendedKeywordCount( paper, this._config.maximum, "max" );

		const calculatedScore = this.calculateResult( i18n );
		assessmentResult.setScore( calculatedScore.score );
		assessmentResult.setText( calculatedScore.resultText );
		assessmentResult.setHasMarks( this._keywordCount > 0 );

		return assessmentResult;
	}

	/**
	 * Checks whether there are no keyword matches in the text.
	 *
	 * @returns {boolean} Returns true if the keyword count is 0.
	 */
	hasNoMatches() {
		return this._keywordCount === 0;
	}

	/**
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

	/**
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

	/**
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
	 * @param {Object} i18n The object used for translations.
	 *
	 * @returns {Object} The object with calculated score and resultText.
	 */
	calculateResult( i18n ) {
		if ( this.hasNoMatches() ) {
			return {
				score: this._config.scores.underMinimum,
				resultText: i18n.sprintf(
					/* Translators:
					%1$d expands to the recommended keyword count,
					%2$s expands to a link on yoast.com,
					%3$s expands to the anchor end tag. */
					i18n.dgettext(
						"js-text-analysis",
						"%2$sThe focus keyword was found 0 times%3$s. " +
						"That's less than the recommended minimum of %1$d times for a text of this length.",
						this._keywordCount
					),
					this._minRecommendedKeywordCount,
					this._config.url,
					"</a>"
				),
			};
		}
		if ( this.hasTooFewMatches() ) {
			return {
				score: this._config.scores.underMinimum,
				resultText: i18n.sprintf(
					/* Translators:
					%1$d expands to the keyword count,
					%2$d expands to the recommended keyword count,
					%3$s expands to a link on yoast.com,
					%4$s expands to the anchor end tag. */
					i18n.dngettext(
						"js-text-analysis",
						"%3$sThe focus keyword was found %1$d time%4$s. " +
						"That's less than the recommended minimum of %2$d times for a text of this length.",
						"%3$sThe focus keyword was found %1$d times%4$s. " +
						"That's less than the recommended minimum of %2$d times for a text of this length.",
						this._keywordCount
					),
					this._keywordCount,
					this._minRecommendedKeywordCount,
					this._config.url,
					"</a>"
				),
			};
		}

		if ( this.hasGoodNumberOfMatches()  ) {
			return {
				score: this._config.scores.correctDensity,
				resultText: i18n.sprintf(
					/* Translators:
					%1$d expands to the keyword count,
					%2$s expands to a link on yoast.com,
					%3$s expands to the anchor end tag. */
					i18n.dgettext(
						"js-text-analysis",
						"%2$sThe focus keyword was found %1$d times%3$s. " +
						"That's great for a text of this length."
					),
					this._keywordCount,
					this._config.url,
					"</a>"
				),
			};
		}

		if ( this.hasTooManyMatches() ) {
			return {
				score: this._config.scores.overMaximum,
				resultText: i18n.sprintf(
					/* Translators:
					%1$d expands to the keyword count,
					%2$d expands to the recommended keyword count,
					%3$s expands to a link on yoast.com,
					%4$s expands to the anchor end tag. */
					i18n.dgettext(
						"js-text-analysis",
						"%3$sThe focus keyword was found %1$d times%4$s." +
						" That's more than the recommended maximum of %2$d times for a text of this length."
					),
					this._keywordCount,
					this._maxRecommendedKeywordCount,
					this._config.url,
					"</a>"
				),
			};
		}

		// Implicitly returns this if the rounded keyword density is higher than overMaximum.
		return {
			score: this._config.scores.wayOverMaximum,
			resultText: i18n.sprintf(
				/* Translators:
				%1$d expands to the keyword count,
				%2$d expands to the recommended keyword count,
				%3$s expands to a link on yoast.com,
				%4$s expands to the anchor end tag. */
				i18n.dgettext(
					"js-text-analysis",
					"%3$sThe focus keyword was found %1$d times%4$s." +
					" That's way more than the recommended maximum of %2$d times for a text of this length."
				),
				this._keywordCount,
				this._maxRecommendedKeywordCount,
				this._config.url,
				"</a>"
			),
		};
	}


	/**
	 * Marks keywords in the text for the keyword density assessment.
	 *
	 * @param {Object} paper The paper to use for the assessment.
	 *
	 * @returns {Array<Mark>} Marks that should be applied.
	 */
	getMarks( paper ) {
		return topicCount( paper ).markings;
	}


	/**
	 * Checks whether the paper has a text with at least 100 words, a keyword is set and there are no synonyms.
	 *
	 * @param {Paper} paper The paper to use for the assessment.
	 *
	 * @returns {boolean} True if applicable.
	 */
	isApplicable( paper ) {
		return paper.hasText() && paper.hasKeyword() && countWords( paper.getText() ) >= 100 && ! ( paper.hasSynonyms() );
	}
}

module.exports = KeywordDensityAssessment;
