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
			scores: {
				good: 9,
				okay: 6,
				bad: 2,
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
	 * @param {Object} i18n The object used for translations.
	 *
	 * @returns {AssessmentResult} The result of the assessment with text and score.
	 */
	getResult( paper, researcher, i18n ) {
		this._keywordMatches = researcher.getResearch( "findKeywordInPageTitle" );
		this._keyword = escape( paper.getKeyword() );

		let assessmentResult = new AssessmentResult();

		const calculatedResult = this.calculateResult( i18n );
		assessmentResult.setScore( calculatedResult.score );
		assessmentResult.setText( calculatedResult.resultText );

		return assessmentResult;
	}

	/**
	 * Checks whether the assessment is applicable to the paper
	 *
	 * @param {Paper} paper The Paper object to assess.
	 *
	 * @returns {boolean} Whether the paper has a keyword and a title.
	 */
	isApplicable( paper ) {
		return paper.hasKeyword() && paper.hasTitle();
	}

	/**
	 * Calculates the result based on the keyphraseLength research.
	 *
	 * @param {Object} i18n The object used for translations.
	 *
	 * @returns {Object} Object with score and text.
	 */
	calculateResult( i18n ) {
		const matches = this._keywordMatches.matches;
		const position = this._keywordMatches.position;

		if ( matches < this._config.parameters.recommendedMinimum ) {
			return {
				score: this._config.scores.bad,
				resultText: i18n.sprintf(
					/* Translators: %1$d expands to the keyphrase. */
					i18n.dgettext(
						"js-text-analysis",
						"The focus keyword '%1$s' does not appear in the SEO title."
					),
					this._keyword
				),
			};
		}
		if ( matches >= this._config.parameters.recommendedMinimum && position === this._config.parameters.position ) {
			return {
				score: this._config.scores.good,
				resultText: i18n.sprintf(
					i18n.dgettext(
						"js-text-analysis",
						"The SEO title contains the focus keyword, at the beginning which is considered to improve rankings."
					)
				),
			};

		}
		return {
			score: this._config.scores.okay,
			resultText: i18n.sprintf(
				i18n.dgettext(
					"js-text-analysis",
					"The SEO title contains the focus keyword, but it does not appear at the beginning; " +
					"try and move it to the beginning."
				)
			),
		};
	}
}

module.exports = TitleKeywordAssessment;
