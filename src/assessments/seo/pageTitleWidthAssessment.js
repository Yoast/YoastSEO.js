let AssessmentResult = require( "../../values/AssessmentResult.js" );
let Assessment = require( "../../assessment.js" );
let inRange = require( "../../helpers/inRange" ).inRangeEndInclusive;
let merge = require( "lodash/merge" );

const maximumLength = 600;

/**
 * Represents the assessment that will calculate if the width of the page title is correct.
 */
class PageTitleWidthAssessment extends Assessment {
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
				minLength: 400,
				maxLength: maximumLength,
			},
			scores: {
				noTitle: 1,
				widthTooShort: 6,
				widthTooLong: 3,
				widthCorrect: 9,
			},
		};

		this.identifier = "titleWidth";
		this._config = merge( defaultConfig, config );
	}

	/**
	 * Returns the maximum length.
	 *
	 * @returns {number} The maximum length. The function is needed for the snippet preview, so don't delete it.
	 */
	getMaximumLength() {
		return maximumLength;
	}

	/**
	 * Runs the pageTitleWidth module, based on this returns an assessment result with score.
	 *
	 * @param {Paper} paper The paper to use for the assessment.
	 * @param {Researcher} researcher The researcher used for calling research.
	 * @param {object} i18n The object used for translations
	 *
	 * @returns {AssessmentResult} The assessment result.
	 */
	getResult( paper, researcher, i18n ) {
		let pageTitleWidth = researcher.getResearch( "pageTitleWidth" );
		let assessmentResult = new AssessmentResult();

		const calculatedResult = this.calculateResult( pageTitleWidth, i18n  );
		assessmentResult.setScore( calculatedResult.score );
		assessmentResult.setText( calculatedResult.resultText );

		// Max and actual are used in the snippet editor progress bar.
		assessmentResult.max = this._config.parameters.maxLength;
		assessmentResult.actual = pageTitleWidth;
		return assessmentResult;
	}

	/**
	 * Returns the score and the result text for the pageTitleWidth
	 *
	 * @param {number} pageTitleWidth The width of the pageTitle.
	 * @param {object} i18n The object used for translations
	 *
	 * @returns {Object} The object that contains a calculated score and result text.
	 */
	calculateResult( pageTitleWidth, i18n ) {
		if ( inRange( pageTitleWidth, 1, this._config.parameters.minLength ) ) {
			return {
				score: this._config.scores.widthTooShort,
				resultText: i18n.dgettext(
					"js-text-analysis",
					"The SEO title is too short. Use the space to add keyword variations or create compelling call-to-action copy."
				),
			};
		}

		if ( inRange( pageTitleWidth, this._config.parameters.minLength, this._config.parameters.maxLength ) ) {
			return {
				score: this._config.scores.widthCorrect,
				resultText: i18n.dgettext(
					"js-text-analysis",
					"The SEO title has a nice length."
				),
			};
		}

		if ( pageTitleWidth > this._config.parameters.maxLength ) {
			return {
				score: this._config.scores.widthTooLong,
				resultText: i18n.dgettext(
					"js-text-analysis",
					"The SEO title is wider than the viewable limit."
				),
			};
		}

		return {
			score: this._config.scores.noTitle,
			resultText: i18n.dgettext( "js-text-analysis", "Please create an SEO title." ),
		};
	}
}

module.exports = PageTitleWidthAssessment;
