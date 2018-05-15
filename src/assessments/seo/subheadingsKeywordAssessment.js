let AssessmentResult = require( "../../values/AssessmentResult.js" );
let Assessment = require( "../../assessment.js" );
let merge = require( "lodash/merge" );

/**
 * Represents the assessment that checks if the keyword is present in one of the subheadings.
 */
class SubHeadingsKeywordAssessment extends Assessment {
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
			parameters: {
				recommendedMinimum: 1,
			},
			good: {
				score: 9,
				resultText: "The focus keyword appears in %1$d (out of %2$d) subheadings in your copy.",
				requiresMatchesAndSubheadings: true,
			},
			bad: {
				score: 6,
				resultText: "You have not used the focus keyword in any subheading (such as an H2) in your copy.",
				requiresMatchesAndSubheadings: false,
			},
		};

		this.identifier = "subheadingsKeyword";
		this._config = merge( defaultConfig, config );
	}

	/**
	 * Runs the match keyword in subheadings module, based on this returns an assessment result with score.
	 *
	 * @param {Paper} paper The paper to use for the assessment.
	 * @param {Researcher} researcher The researcher used for calling research.
	 * @param {object} i18n The object used for translations.
	 *
	 * @returns {AssessmentResult} The assessment result.
	 */
	getResult( paper, researcher, i18n ) {
		this.subHeadings = researcher.getResearch( "matchKeywordInSubheadings" );
		let assessmentResult = new AssessmentResult();

		if ( this.subHeadings.count > 0 ) {
			const calculatedResult = this.calculateResult();

			assessmentResult.setScore( calculatedResult.score );
			assessmentResult.setText( this.translateScore( calculatedResult.resultText, calculatedResult.requiresMatchesAndSubheadings, i18n ) );
		}

		return assessmentResult;
	}

	/**
	 * Checks whether the paper has a text and a keyword.
	 *
	 * @param {Paper} paper The paper to use for the assessment.
	 *
	 * @returns {boolean} True when there is text and a keyword.
	 */
	isApplicable( paper ) {
		return paper.hasText() && paper.hasKeyword();
	}

	/**
	 * Returns the result for the subheadings.
	 *
	 * @returns {Object} The calculated result.
	 */
	calculateResult() {
		if ( this.subHeadings.matches < this._config.parameters.recommendedMinimum ) {
			return this._config.bad;
		}

		return this._config.good;
	}

	/**
	 * Translates the score to a message the user can understand.
	 *
	 * @param {string} resultText The text of the result to be displayed.
	 * @param {boolean} requiresMatchesAndSubheadings Whether the translation requires the number of matches and subheadings in the text.
	 * @param {Object} i18n The object used for translations.
	 *
	 * @returns {string} The translated string.
	 */
	translateScore( resultText, requiresMatchesAndSubheadings, i18n ) {
		if ( requiresMatchesAndSubheadings ) {
			return i18n.sprintf(
				i18n.dgettext(
					"js-text-analysis",
					/**
					 * Translators: %1$d expands the number of subheadings that contain the keyword,
					 * %2$d expands to the total number of subheadings in the text*/
					 resultText
				),
				this.subHeadings.matches, this.subHeadings.count
			);
		}

		return i18n.dgettext( "js-text-analysis", resultText );
	}
}

module.exports = SubHeadingsKeywordAssessment;
