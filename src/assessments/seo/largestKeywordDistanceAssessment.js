const AssessmentResult = require( "../../values/AssessmentResult.js" );
const Assessment = require( "../../assessment.js" );
const merge = require( "lodash/merge" );
const countWords = require( "../../stringProcessing/countWords.js" );
const matchWords = require( "../../stringProcessing/matchTextWithWord.js" );

/**
 * Returns a score based on the largest percentage of text in
 * which no keyword occurs.
 */
class largestKeywordDistanceAssessment extends Assessment {
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
			recommendedMaximumKeyWordDistance: 30,
			scores: {
				badDistribution: 1,
				goodDistribution: 9,
			},
		};

		this.identifier = "largestKeywordDistance";
		this._config = merge( defaultConfig, config );
	}

	/**
	 * Runs the largestKeywordDistance module, based on this returns an assessment result with score.
	 *
	 * @param {Paper} paper The paper to use for the assessment.
	 * @param {Researcher} researcher The researcher used for calling research.
	 * @param {object} i18n The object used for translations.
	 *
	 * @returns {AssessmentResult} The assessment result.
	 */
	getResult( paper, researcher, i18n ) {
		let largestKeywordDistance = researcher.getResearch( "largestKeywordDistance" );
		let assessmentResult = new AssessmentResult();

		assessmentResult.setScore( this.calculateScore( largestKeywordDistance ) );
		assessmentResult.setText( this.translateScore( largestKeywordDistance, i18n ) );

		return assessmentResult;
	}

	/**
	 * Returns the score for the largest keyword distance assessment.
	 *
	 * @param {number} largestKeywordDistance The largest distance between two keywords or a keyword and the start/beginning of the text.
	 *
	 * @returns {number} The calculated score.
	 */
	calculateScore( largestKeywordDistance ) {
		if ( largestKeywordDistance > this._config.recommendedMaximumKeyWordDistance ) {
			return this._config.scores.badDistribution;
		}
		return this._config.scores.goodDistribution;
	}

	/**
	 * Translates the largest keyword assessment score to a message the user can understand.
	 *
	 * @param {number} largestKeywordDistance The largest distance between two keywords or a keyword and the start/beginning of the text.
	 * @param {object} i18n The object used for translations.
	 *
	 * @returns {string} The translated string.
	 */
	translateScore( largestKeywordDistance, i18n ) {
		if ( largestKeywordDistance > this._config.recommendedMaximumKeyWordDistance ) {
			return i18n.dgettext( "js-text-analysis", "There are some parts of your text that do not contain the keyword. " +
				"Try to distribute the keyword more evenly." );
		}
		return i18n.dgettext( "js-text-analysis", "Your keyword is distributed evenly throughout the text. " +
				"That's great." );
	}

	/**
	 * Checks whether the paper has a text with at least 100 words, a keyword, and whether
	 * the keyword appears more at least twice in the text (required to calculate a distribution).
	 *
	 * @param {Paper} paper The paper to use for the assessment.
	 *
	 * @returns {boolean} True when there is a keyword and a text with 100 words or more,
	 *                    with the keyword occurring more than one time.
	 */
	isApplicable( paper ) {
		let keywordCount = matchWords( paper.getText(), paper.getKeyword(), paper.getLocale() );
		return paper.hasText() && paper.hasKeyword() && countWords( paper.getText() ) >= 100 && keywordCount > 1;
	}
}

module.exports = largestKeywordDistanceAssessment;
