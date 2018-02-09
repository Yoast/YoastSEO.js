let AssessmentResult = require( "../../values/AssessmentResult.js" );
let Assessment = require( "../../assessment.js" );
let merge = require( "lodash/merge" );

/**
 * Assessment to check whether the body of the text contains more than one H1.
 */
class singleH1Assessment extends Assessment {

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
			scores: {
				textContainsH1: 1,
			},
		};

		this.identifier = "singleH1Assessment";
		this._config = merge( defaultConfig, config );
	}

	/**
	 * Runs the singleH1Assessment module, based on this returns an assessment result with score.
	 *
	 * @param {Paper} paper The paper to use for the assessment.
	 * @param {Researcher} researcher The researcher used for calling research.
	 * @param {object} i18n The object used for translations
	 *
	 * @returns {AssessmentResult} The assessment result.
	 */
	getResult( paper, researcher, i18n ) {
		let h1s = researcher.getResearch( "h1s" );
		let assessmentResult = new AssessmentResult();

		assessmentResult.setScore( this.calculateScore( h1s ) );
		assessmentResult.setText( this.translateScore( h1s, i18n ) );

		return assessmentResult;
	}

	/**
	 * Returns the score for the single H1 assessment.
	 *
	 * @param {Array} h1s An array with all H1s found in the text.
	 *
	 * @returns {number} The calculated score.
	 */
	calculateScore( h1s ) {
		if ( h1s.length > 1 ) {
			return this._config.scores.textContainsH1;
		}
	}

	/**
	 * Translates the score of the H1 assessment to a message the user can understand.
	 *
	 * @param {Array} h1s An array with all H1s found in the text.
	 * @param {object} i18n The object used for translations.
	 *
	 * @returns {string} The translated string.
	 */
	translateScore( h1s, i18n ) {
		if ( h1s.length > 1 ) {
			return i18n.dgettext( "js-text-analysis", "The body of your text contains more than one H1. " +
				"Change all H1s in the body of your text to the appropriate heading level."
			);
		}
	}

	/**
	 * Checks whether the paper has a text.
	 *
	 * @param {Paper} paper The paper to use for the assessment.
	 *
	 * @returns {boolean} True when there is text.
	 */
	isApplicable( paper ) {
		return paper.hasText();
	}
}

module.exports = singleH1Assessment;
