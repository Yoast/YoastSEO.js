let AssessmentResult = require( "../../values/AssessmentResult.js" );
let Assessment = require( "../../assessment.js" );
let merge = require( "lodash/merge" );

/**
 * Represents the URL keyword assessments. This assessments will check if the keyword is present in the url.
 */
class UrlKeywordAssessment extends Assessment {
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
			scores: {
				noKeywordInUrl: 6,
				good: 9,
			},
		};

		this.identifier = "urlKeyword";
		this._config = merge( defaultConfig, config );
	}

	/**
	 * Executes the Assessment and returns a result.
	 *
	 * @param {Paper} paper The Paper object to assess.
	 * @param {Researcher} researcher The Researcher object containing all available researches.
	 * @param {Object} i18n The object used for translations.
	 *
	 * @returns {AssessmentResult} The result of the assessment, containing both a score and a descriptive text.
	 */
	getResult( paper, researcher, i18n ) {
		this._totalKeywords = researcher.getResearch( "keywordCountInUrl" );

		let assessmentResult = new AssessmentResult();

		const calculatedResult = this.calculateResult( i18n );
		assessmentResult.setScore( calculatedResult.score );
		assessmentResult.setText( calculatedResult.resultText );

		return assessmentResult;
	}

	/**
	 * Checks whether the paper has a keyword and a url.
	 *
	 * @param {Paper} paper The paper to use for the assessment.
	 *
	 * @returns {boolean} True when there is a keyword and an url.
	 */
	isApplicable( paper ) {
		return paper.hasKeyword() && paper.hasUrl();
	}

	/**
	 * Determines the score  and the result text based on whether or not there's a keyword in the url.
	 *
	 * @param {Object} i18n The object used for translations.
	 *
	 * @returns {Object} The object with calculated score and resultText.
	 */
	calculateResult( i18n ) {
		if ( this._totalKeywords === 0 ) {
			return {
				score: this._config.scores.noKeywordInUrl,
				resultText: i18n.dgettext(
					"js-text-analysis",
					"The focus keyword does not appear in the URL for this page. " +
					"If you decide to rename the URL be sure to check the old URL 301 redirects to the new one!"
				),
			};
		}

		return {
			score: this._config.scores.good,
			resultText: i18n.dgettext(
				"js-text-analysis",
				"The focus keyword appears in the URL for this page."
			),
		};
	}
}

module.exports = UrlKeywordAssessment;
