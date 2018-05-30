let AssessmentResult = require( "../../values/AssessmentResult.js" );
let Assessment = require( "../../assessment.js" );
let merge = require( "lodash/merge" );

import Config from "../../config/config";
const maximumMetaDescriptionLength = Config.maxMeta;

/**
 * Assessment for calculating the length of the meta description.
 */
class MetaDescriptionLengthAssessment extends Assessment {
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
				recommendedMaximumLength: 120,
				maximumLength: maximumMetaDescriptionLength,
			},
			scores: {
				noMetaDescription: 1,
				tooLong: 6,
				tooShort: 6,
				good: 9,
			},
		};

		this.identifier = "metaDescriptionLength";
		this._config = merge( defaultConfig, config );
	}

	/**
	 * Returns the maximum length. The function is needed for the snippet preview, so don't delete it.
	 *
	 * @returns {number} The maximum length.
	 */
	getMaximumLength() {
		return this._config.parameters.maximumLength;
	}

	/**
	 * Runs the metaDescriptionLength module, based on this returns an assessment result with score.
	 *
	 * @param {Paper} paper The paper to use for the assessment.
	 * @param {Researcher} researcher The researcher used for calling research.
	 * @param {Object} i18n The object used for translations.
	 *
	 * @returns {AssessmentResult} The assessment result.
	 */
	getResult( paper, researcher, i18n ) {
		const descriptionLength = researcher.getResearch( "metaDescriptionLength" );
		let assessmentResult = new AssessmentResult();

		assessmentResult.setScore( this.calculateScore( descriptionLength ) );
		assessmentResult.setText( this.translateScore( descriptionLength, i18n ) );

		// Max and actual are used in the snippet editor progress bar.
		assessmentResult.max = this._config.maximumLength;
		assessmentResult.actual = this.descriptionLength;

		return assessmentResult;
	}

	/**
	 * Checks whether there is no meta description.
	 *
	 * @param {number} descriptionLength The length of the meta description.
	 *
	 * @returns {boolean} Returns true if there is no meta description.
	 */
	noDescription( descriptionLength ) {
		return descriptionLength === 0;
	}

	/**
	 * Checks whether the meta description is too short.
	 *
	 * @param {number} descriptionLength The length of the meta description.
	 *
	 * @returns {boolean} Returns true if the meta description is too short.
	 */
	tooShort( descriptionLength ) {
		return descriptionLength <= this._config.parameters.recommendedMaximumLength;
	}

	/**
	 * Checks whether the meta description is too long.
	 *
	 * @param {number} descriptionLength The length of the meta description.
	 *
	 * @returns {boolean} Returns true if the meta description is too long.
	 */
	tooLong( descriptionLength ) {
		return ( descriptionLength > this._config.parameters.maximumLength );
	}

	/**
	 * Calculates a score based on meta description length. This function is also used in the snippet editor.
	 * When refactoring this function, make sure that compatibility is maintained.
	 *
	 * @param {number} descriptionLength The length of the meta description.
	 *
	 * @returns {number} The score.
	 */
	calculateScore( descriptionLength ) {
		if( this.noDescription( descriptionLength ) ) {
			return this._config.scores.noMetaDescription;
		}

		if( this.tooShort( descriptionLength ) ) {
			return this._config.scores.tooShort;
		}

		if( this.tooLong( descriptionLength ) ) {
			return this._config.scores.tooLong;
		}

		return this._config.scores.good;
	}

	/**
	 * Translates the score into a feedback text.
	 *
	 * @param {number}  descriptionLength   The length of the meta description.
	 * @param {Object}  i18n                The object used for translations.
	 *
	 * @returns {string} The feedback text.
	 */
	translateScore( descriptionLength, i18n ) {
		if( this.noDescription( descriptionLength ) ) {
			return i18n.sprintf(
				i18n.dgettext(
					"js-text-analysis",
					"No meta description has been specified. Search engines will display copy from the page instead."
				)
			);
		}

		if( this.tooShort( descriptionLength ) ) {
			return i18n.sprintf(
				/* Translators: %1$d expands to the recommended maximum length of the metadescription in words,
				%2$d expands to the maximum length of the metadescription in words. */
				i18n.dgettext(
					"js-text-analysis",
					"The meta description is under %1$d characters long. However, up to %2$d characters are available."
				),
				this._config.parameters.recommendedMaximumLength,
				this._config.parameters.maximumLength
			);
		}

		if( this.tooLong( descriptionLength ) ) {
			return i18n.sprintf(
				/* Translators: %1$d expands to the maximum length of the metadescription in words. */
				i18n.dgettext(
					"js-text-analysis",
					"The meta description is over %1$d characters. " +
					"Reducing the length will ensure the entire description will be visible."
				),
				this._config.parameters.maximumLength
			);
		}

		return i18n.sprintf(
			i18n.dgettext(
				"js-text-analysis",
				"The meta description has a nice length."
			)
		);
	}
}
module.exports = MetaDescriptionLengthAssessment;
