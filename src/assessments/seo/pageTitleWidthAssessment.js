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
	 * Returns the maximum length. The function is needed for the snippet preview, so don't delete it.
	 *
	 * @returns {number} The maximum length.
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
		const pageTitleWidth = researcher.getResearch( "pageTitleWidth" );
		let assessmentResult = new AssessmentResult();

		assessmentResult.setScore( this.calculateScore( pageTitleWidth ) );
		assessmentResult.setText( this.translateScore( pageTitleWidth, i18n ) );

		// Max and actual are used in the snippet editor progress bar.
		assessmentResult.max = this._config.parameters.maxLength;
		assessmentResult.actual = pageTitleWidth;
		return assessmentResult;
	}

	/**
	 * Checks whether the page title is too short.
	 *
	 * @param {number} pageTitleWidth The width of the page title.
	 *
	 * @returns {boolean} Returns true if the page title is too short.
	 */
	tooShort( pageTitleWidth ) {
		return inRange( pageTitleWidth, 1, this._config.parameters.minLength );
	}

	/**
	 * Checks whether the page title has a good length.
	 *
	 * @param {number} pageTitleWidth The width of the page title.
	 *
	 * @returns {boolean} Returns true if the page title has a good length.
	 */
	goodLength( pageTitleWidth ) {
		return inRange( pageTitleWidth, this._config.parameters.minLength, this._config.parameters.maxLength );
	}

	/**
	 * Checks whether the page title is too long.
	 *
	 * @param {number} pageTitleWidth The width of the page title.
	 *
	 * @returns {boolean} Returns true if the page title is too long.
	 */
	tooLong( pageTitleWidth ) {
		return ( pageTitleWidth > this._config.parameters.maxLength );
	}

	/**
	 * Calculates a score based on the page title width. This function is also used in the snippet editor.
	 * When refactoring this function, make sure that compatibility is maintained.
	 *
	 * @param {number} pageTitleWidth The width of the page title.
	 *
	 * @returns {number} The score.
	 */
	calculateScore( pageTitleWidth ) {
		if ( this.tooShort( pageTitleWidth ) ) {
			return this._config.scores.widthTooShort;
		}

		if ( this.goodLength( pageTitleWidth ) ) {
			return this._config.scores.widthCorrect;
		}

		if ( this.tooLong( pageTitleWidth ) ) {
			return this._config.scores.widthTooLong;
		}

		return this._config.scores.noTitle;
	}

	/**
	 * Translates the score into a feedback text.
	 *
	 * @param {number}  pageTitleWidth  The width of the page title.
	 * @param {Object}  i18n            The object used for translations.
	 *
	 * @returns {string} The feedback text.
	 */
	translateScore( pageTitleWidth, i18n ) {
		if ( this.tooShort( pageTitleWidth ) ) {
			return i18n.dgettext(
				"js-text-analysis",
				"The SEO title is too short. Use the space to add keyword variations or create compelling call-to-action copy."
			);
		}

		if ( this.goodLength( pageTitleWidth ) ) {
			return i18n.dgettext(
				"js-text-analysis",
				"The SEO title has a nice length."
			);
		}

		if ( this.tooLong( pageTitleWidth ) ) {
			return i18n.dgettext(
				"js-text-analysis",
				"The SEO title is wider than the viewable limit."
			);
		}

		return i18n.dgettext( "js-text-analysis", "Please create an SEO title." );
	}
}

module.exports = PageTitleWidthAssessment;
