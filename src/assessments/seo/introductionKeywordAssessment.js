const Assessment = require( "../../assessment.js" );
const AssessmentResult = require( "../../values/AssessmentResult.js" );
const merge = require( "lodash/merge" );

/**
 * Assessment to check whether the keyphrase is encountered in the first paragraph of the article.
 */
class IntroductionHasKeywordAssessment extends Assessment {
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
			parameters: {
				recommendedMinimum: 1,
			},
			good: {
				score: 9,
				resultText: "The focus keyword appears in the first paragraph of the copy.",
			},
			bad: {
				score: 3,
				resultText: "The focus keyword doesn't appear in the first paragraph of the copy. " +
				"Make sure the topic is clear immediately.",
			},
		};

		this.identifier = "introductionKeyword";
		this._config = merge( defaultConfig, config );
	}

	/**
	 * Assesses the presence of keyphrase in the first paragraph.
	 *
	 * @param {Paper} paper The paper to use for the assessment.
	 * @param {Researcher} researcher The researcher used for calling research.
	 * @param {Jed} i18n The object used for translations.
	 *
	 * @returns {AssessmentResult} The result of this assessment.
	 */
	getResult( paper, researcher, i18n ) {
		let assessmentResult = new AssessmentResult();

		this._firstParagraphMatches = researcher.getResearch( "firstParagraph" );
		const calculatedResult = this.calculateResult();

		assessmentResult.setScore( calculatedResult.score );
		assessmentResult.setText( this.translateScore( calculatedResult.resultText, i18n ) );

		return assessmentResult;
	}

	/**
	 * Checks if assessment is applicable to the paper.
	 *
	 * @param {Paper} paper The paper to be analyzed.
	 *
	 * @returns {boolean} Whether the paper has both keyword and text.
	 */
	isApplicable( paper ) {
		return paper.hasKeyword() && paper.hasText();
	}

	/**
	 * Returns a result based on the number of occurrences of keyphrase in the first paragraph.
	 *
	 * @returns {Object} ResultObject with a score and translation text.
	 */
	calculateResult() {
		if ( this._firstParagraphMatches >= this._config.parameters.recommendedMinimum ) {
			return this._config.good;
		}
		return this._config.bad;
	}

	/**
	 * Translates the score into a specific feedback to the user.
	 *
	 * @param {string} resultText The feedback string.
	 * @param {Object} i18n The i18n-object used for parsing translations.
	 *
	 * @returns {string} Text feedback.
	 */
	translateScore( resultText, i18n ) {
		return i18n.sprintf( i18n.dgettext( "js-text-analysis", resultText ) );
	}
}

module.exports = IntroductionHasKeywordAssessment;
