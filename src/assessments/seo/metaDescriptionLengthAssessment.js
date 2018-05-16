let AssessmentResult = require( "../../values/AssessmentResult.js" );
let Assessment = require( "../../assessment.js" );
let merge = require( "lodash/merge" );

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
				maximumLength: 320,
			},
			noMetaDescription: {
				score: 1,
				resultText: "No meta description has been specified. Search engines will display copy from the page instead.",
				requiresRecommendedMax: false,
				requiresMax: false,
			},
			tooLong: {
				score: 6,
				resultText: "The meta description is over %1$d characters. " +
				"Reducing the length will ensure the entire description will be visible.",
				requiresRecommendedMax: false,
				requiresMax: true,
			},
			tooShort: {
				score: 6,
				resultText: "The meta description is under %1$d characters long. However, up to %2$d characters are available.",
				requiresRecommendedMax: true,
				requiresMax: true,
			},
			good: {
				score: 9,
				resultText: "The meta description has a nice length.",
				requiresRecommendedMax: false,
				requiresMax: false,
			},
		};

		this.identifier = "metaDescriptionLength";
		this._config = merge( defaultConfig, config );
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
		this.descriptionLength = researcher.getResearch( "metaDescriptionLength" );
		let assessmentResult = new AssessmentResult();

		const calculatedResult = this.calculateResult();

		assessmentResult.setScore( calculatedResult.score );
		assessmentResult.setText( this.translateScore( calculatedResult.resultText, calculatedResult.requiresRecommendedMax,
			calculatedResult.requiresMax, i18n ) );

		return assessmentResult;
	}

	/**
	 * Returns the result based on the descriptionLength.
	 *
	 * @returns {number} The calculated score.
	 */
	calculateResult() {
		if ( this.descriptionLength === 0 ) {
			return this._config.noMetaDescription;
		}

		if ( this.descriptionLength <= this._config.parameters.recommendedMaximumLength ) {
			return this._config.tooShort;
		}

		if ( this.descriptionLength > this._config.parameters.maximumLength ) {
			return this._config.tooLong;
		}

		return this._config.good;
	}

	/**
	 * Translates the descriptionLength to a message the user can understand.
	 *
	 * @param {string} resultText The text of the result from the configuration.
	 * @param {boolean} requiresRecommendedMax Whether the translation requires the recommended maximum length of the metadescription.
	 * @param {boolean} requiresMax Whether the translation requires the maximum length of the metadescription.
	 * @param {Object} i18n The object used for translations.
	 *
	 * @returns {string} The translated string.
	 */
	translateScore( resultText, requiresRecommendedMax, requiresMax, i18n ) {
		if ( requiresRecommendedMax === true && requiresMax === true ) {
			return i18n.sprintf(
				i18n.dgettext(
					"js-text-analysis",
					/**
					  * Translators: %1$d expands to the recommended maximum length of the metadescription in words,
					  * %2$d expands to the maximum length of the metadescription in words.
					  */
					resultText ),
				this._config.parameters.recommendedMaximumLength,
				this._config.parameters.maximumLength
			);
		}

		if ( requiresMax === true ) {
			return i18n.sprintf(
				i18n.dgettext(
					"js-text-analysis",
					// Translators: %1$d expands to the maximum length of the metadescription in words.
					resultText ),
				this._config.parameters.maximumLength
			);
		}

		return i18n.dgettext( "js-text-analysis", resultText );
	}
}

module.exports = MetaDescriptionLengthAssessment;
