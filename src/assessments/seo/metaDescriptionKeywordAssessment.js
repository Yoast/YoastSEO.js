const AssessmentResult = require( "../../values/AssessmentResult.js" );
const Assessment = require( "../../assessment.js" );
const merge = require( "lodash/merge" );

/**
 * Assessment for checking the keyword matches in the meta description.
 */
class MetaDescriptionKeywordAssessment extends Assessment {
	/**
	 * Sets the identifier and the config.
	 *
	 * @param {Object} config The configuration to use.
	 *
	 * @returns {void}
	 */
	constructor( config = {} ) {
		super();

		const defaultConfig = {
			parameters: {
				recommendedMinimumMatches: 1,
				recommendedMaximumMatches: 2,
			},
			tooFewMatches: {
				score: 3,
				resultText: "A meta description has been specified, but it does not contain the focus keyword.",
				requiresMatches: false,
				requiresMax: false,
			},
			tooManyMatches: {
				score: 3,
				resultText: "The meta description contains the focus keyword %1$d times, " +
				"which is over the advised maximum of %2$d times.",
				requiresMatches: true,
				requiresMax: true,
			},
			correctNumberOfMatches: {
				score: 9,
				resultText: "The meta description contains the focus keyword. That's great.",
				resultTextPlural: "The meta description contains the focus keyword %1$d times. That's great.",
				requiresMatches: true,
				requiresMax: false,
			},
		};

		this.identifier = "metaDescriptionKeyword";
		this._config = merge( defaultConfig, config );
	}

	/**
	 * Runs the metaDescriptionKeyword researcher and based on this, returns an assessment result with score.
	 *
	 * @param {Paper} paper             The paper to use for the assessment.
	 * @param {Researcher} researcher   The researcher used for calling research.
	 * @param {Object} i18n             The object used for translations.
	 *
	 * @returns {AssessmentResult} The assessment result.
	 */
	getResult( paper, researcher, i18n ) {
		this._keywordMatches = researcher.getResearch( "metaDescriptionKeyword" );
		let assessmentResult = new AssessmentResult();
		const calculatedResult = this.calculateResult();

		assessmentResult.setScore( calculatedResult.score );
		assessmentResult.setText( this.translateScore(
			calculatedResult.resultText, calculatedResult.resultTextPlural, calculatedResult.requiresMatches, calculatedResult.requiresMax, i18n )
		);

		return assessmentResult;
	}

	/**
	 * Returns the result object based on the number of keyword matches in the meta description.
	 *
	 * @returns {Object} Result object with score and text.
	 */
	calculateResult() {
		if ( this._keywordMatches < this._config.parameters.recommendedMinimumMatches ) {
			return this._config.tooFewMatches;
		}

		if ( this._keywordMatches >= this._config.parameters.recommendedMinimumMatches &&
			this._keywordMatches <= this._config.parameters.recommendedMaximumMatches ) {
			return this._config.correctNumberOfMatches;
		}

		// Implicitly return this if the number of matches is more than the recommended maximum.
		return this._config.tooManyMatches;
	}

	/**
	 * Translates the score to a message the user can understand.
	 *
	 * @param {string} resultText        The feedback string.
	 * @param {string} resultTextPlural  The feedback string for the plural.
	 * @param {boolean} requiresMatches  Whether the feedback string contains keyword matches.
	 * @param {boolean} requiresMax      Whether the feedback string contains the recommended maximum of feedback matches.
	 * @param {Object} i18n              The object used for translations.
	 *
	 * @returns {string} The translated string.
	 */
	translateScore( resultText, resultTextPlural, requiresMatches, requiresMax, i18n ) {
		if ( requiresMatches === true && requiresMax === false ) {
			return i18n.sprintf( i18n.dngettext(
				"js-text-analysis",
				/* Translators: %1$s expands to the number of keyword matches in the meta description */
				resultText,
				resultTextPlural,
				this._keywordMatches
			), this._keywordMatches );
		}

		if ( requiresMatches === true && requiresMax === true ) {
			return i18n.sprintf( i18n.dngettext(
				"js-text-analysis",
				/* Translators: %1$s expands to the number of keyword matches in the meta description,
				 * 2$s expands to the maximum recommended number of matches. */
				resultText
				), this._keywordMatches, this._config.parameters.recommendedMaximumMatches );
		}

		return i18n.sprintf( i18n.dgettext( "js-text-analysis", resultText ) );
	}

	/**
	 * Checks whether the paper has a keyword and a meta description.
	 *
	 * @param {Paper} paper The paper to use for the assessment.
	 *
	 * @returns {boolean} True if the paper has a keyword and a meta description.
	 */
	isApplicable( paper ) {
		return paper.hasKeyword() && paper.hasDescription();
	}
}

module.exports =  MetaDescriptionKeywordAssessment;
