let Assessment = require( "../../assessment" );
let AssessmentResult = require( "../../values/AssessmentResult" );
const escape = require( "lodash/escape" );
const merge = require( "lodash/merge" );

/**
 * Assessment to check whether the keyword is included in (the beginning of) the SEO title.
 */
class TitleKeywordAssessment extends Assessment {
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
				position: 0,
			},
			good: {
				score: 9,
				resultText: "The SEO title contains the focus keyword, at the beginning which is considered to " +
				"improve rankings.",
				requiresKeyword: false,
			},
			okay: {
				score: 6,
				resultText: "The SEO title contains the focus keyword, but it does not appear at the beginning; " +
				"try and move it to the beginning.",
				requiresKeyword: false,
			},
			bad: {
				score: 2,
				resultText: "The focus keyword '%1$s' does not appear in the SEO title.",
				requiresKeyword: true,
			},
		};

		this.identifier = "titleKeyword";
		this._config = merge( defaultConfig, config );
	}

	/**
	 * Executes the pagetitle keyword assessment and returns an assessment result.
	 *
	 * @param {Paper} paper The Paper object to assess.
	 * @param {Researcher} researcher The Researcher object containing all available researches.
	 * @param {object} i18n The locale object.
	 *
	 * @returns {AssessmentResult} The result of the assessment with text and score
	 */
	getResult( paper, researcher, i18n ) {

		this._keywordMatches = researcher.getResearch( "findKeywordInPageTitle" );

		let assessmentResult = new AssessmentResult();

		if ( paper.hasKeyword() && paper.hasTitle() ) {

			const calculatedScore = this.calculateScore();
			assessmentResult.setScore( calculatedScore.score );
			assessmentResult.setText( this.translateScore( calculatedScore.resultText, calculatedScore.requiresKeyword,
				escape( paper.getKeyword() ), i18n ) );
		}

		return assessmentResult;
	}

	/**
	 * Calculates the score result based on the keyphraseLength research.
	 *
	 * @returns {Object} object with score and text.
	 */
	calculateScore() {
		const matches = this._keywordMatches.matches;
		const position = this._keywordMatches.position;

		if ( matches < this._config.parameters.recommendedMinimum ) {
			return this._config.bad;
		}
		if ( matches >= this._config.parameters.recommendedMinimum && position === this._config.parameters.position ) {
			return this._config.good;
		}
		if ( matches >= this._config.parameters.recommendedMinimum && position > 0 ) {
			return this._config.okay;
		}
	}

	/**
	 * Translates the score result based into specific feedback to the user.
	 *
	 * @param {text} resultText The text of feedback for a given value of the assessment result.
	 * @param {boolean} requiresKeyword Whether feedback text needs to include keyword.
	 * @param {string} keyword The keyword of the paper
	 * @param {Object} i18n The i18n-object used for parsing translations.
	 *
	 * @returns {string} Text feedback.
	 */
	translateScore( resultText, requiresKeyword, keyword, i18n ) {
		if ( requiresKeyword ) {
			return i18n.sprintf( i18n.dgettext( "js-text-analysis", resultText ), keyword );
		}

		return i18n.dgettext( "js-text-analysis", resultText );
	}
}

module.exports = TitleKeywordAssessment;
