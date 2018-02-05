const AssessmentResult = require( "../../values/AssessmentResult.js" );
const Assessment = require( "../../assessment.js" );
const merge = require( "lodash/merge" );
const countWords = require( "../../stringProcessing/countWords.js" );
const matchWords = require( "../../stringProcessing/matchTextWithWord.js" );

/**
 * Assessment for checking the keyword distribution.
 */
class keywordDistributionAssessment extends Assessment {

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

		this.identifier = "keywordDistribution";
		this._config = merge( defaultConfig, config );
	}

	/**
	 * Runs the keywordDistribution module, based on this returns an assessment result with score.
	 *
	 * @param {Paper} paper The paper to use for the assessment.
	 * @param {Researcher} researcher The researcher used for calling research.
	 * @param {object} i18n The object used for translations
	 *
	 * @returns {AssessmentResult} The assessment result.
	 */
	getResult( paper, researcher, i18n ) {
		let keywordDistribution = researcher.getResearch( "keywordDistribution" );
		let assessmentResult = new AssessmentResult();

		assessmentResult.setScore( this.calculateScore( keywordDistribution ) );
		assessmentResult.setText( this.translateScore( keywordDistribution, i18n ) );

		return assessmentResult;
	}

	/**
	 * Returns the score for the keyword distribution.
	 *
	 * @param {number} keywordDistribution The largest distance between two keywords or a keyword and the start/beginning of the text.
	 *
	 * @returns {number} The calculated score.
	 */
	calculateScore( keywordDistribution ) {
		if ( keywordDistribution > this._config.recommendedMaximumKeyWordDistance ) {
			return this._config.scores.badDistribution;
		}

		if ( keywordDistribution <= this._config.recommendedMaximumKeyWordDistance ) {
			return this._config.scores.goodDistribution;
		}

		return 0;
	}

	/**
	 * Translates the keyword distribution to a message the user can understand.
	 *
	 * @param {number} keywordDistribution The largest distance between two keywords or a keyword and the start/beginning of the text.
	 * @param {object} i18n The object used for translations.
	 *
	 * @returns {string} The translated string.
	 */
	translateScore( keywordDistribution, i18n ) {
		if ( keywordDistribution > this._config.recommendedMaximumKeyWordDistance ) {
			return i18n.dgettext( "js-text-analysis", "There are some parts of your text that do not contain the keyword. " +
				"Try to distribute the keyword more evenly." );
		}

		if ( keywordDistribution <= this._config.recommendedMaximumKeyWordDistance ) {
			return i18n.dgettext( "js-text-analysis", "Your keyword is distributed evenly throughout the text. " +
				"That's great." );
		}
	}

	/**
	 * Checks whether the paper has a text with at least 100 words, a keyword, and whether
	 * the keyword appears more at least twice in the text (required to calculate a distribution).
	 *
	 * @param {Paper} paper The paper to use for the assessment.
	 *
	 * @returns {boolean} True when there is a keyword and an url.
	 */
	isApplicable( paper ) {
		let keywordCount = matchWords( paper.getText(), paper.getKeyword(), paper.getLocale() );
		return paper.hasText() && paper.hasKeyword() && countWords( paper.getText() ) >= 100 && keywordCount > 1;
	}
}

module.exports = keywordDistributionAssessment;
