let AssessmentResult = require( "../../values/AssessmentResult.js" );
let Assessment = require( "../../assessment.js" );
let merge = require( "lodash/merge" );

/**
 * Represents the assessment that will look if the images have alt-tags and checks if the keyword is present in one of them.
 */
class TextImagesAssessment extends Assessment {
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
			scores: {
				noImages: 3,
				withAltKeyword: 9,
				withAltNonKeyword: 6,
				withAlt: 6,
				noAlt: 6,
			},
		};

		this.identifier = "textImages";
		this._config = merge( defaultConfig, config );
	}

	/**
	 * Execute the Assessment and return a result.
	 *
	 * @param {Paper} paper The Paper object to assess.
	 * @param {Researcher} researcher The Researcher object containing all available researches.
	 * @param {Object} i18n The object used for translations.
	 *
	 * @returns {AssessmentResult} The result of the assessment, containing both a score and a descriptive text.
	 */
	getResult( paper, researcher, i18n ) {
		let assessmentResult = new AssessmentResult();
		this.imageCount = researcher.getResearch( "imageCount" );
		this.altProperties = researcher.getResearch( "altTagCount" );

		const calculatedResult = this.calculateResult( i18n );
		assessmentResult.setScore( calculatedResult.score );
		assessmentResult.setText( calculatedResult.resultText );

		return assessmentResult;
	}

	/**
	 * Checks whether the paper has text.
	 *
	 * @param {Paper} paper The paper to use for the assessment.
	 *
	 * @returns {boolean} True when there is text.
	 */
	isApplicable( paper ) {
		return paper.hasText();
	}

	/**
	 * Calculate the result based on the current image count and current image alt-tag count.
	 *
	 * @param {Object} i18n The object used for translations.
	 *
	 * @returns {Object} The calculated result.
	 */
	calculateResult( i18n ) {
		if ( this.imageCount === 0 ) {
			return {
				score: this._config.scores.noImages,
				resultText: i18n.dgettext(
					"js-text-analysis",
					"No images appear in this page, consider adding some as appropriate."
				),
			};
		}

		// Has alt-tag and keywords
		if ( this.altProperties.withAltKeyword > 0 ) {
			return {
				score: this._config.scores.withAltKeyword,
				resultText: i18n.dgettext(
					"js-text-analysis",
					"The images on this page contain alt attributes with the focus keyword."
				),
			};
		}

		// Has alt-tag, but no keywords and it's not okay
		if ( this.altProperties.withAltNonKeyword > 0 ) {
			return {
				score: this._config.scores.withAltNonKeyword,
				resultText: i18n.dgettext(
					"js-text-analysis",
					"The images on this page do not have alt attributes containing the focus keyword."
				),
			};
		}

		// Has alt-tag, but no keyword is set
		if ( this.altProperties.withAlt > 0 ) {
			return {
				score: this._config.scores.withAlt,
				resultText: i18n.dgettext(
					"js-text-analysis",
					"The images on this page contain alt attributes."
				),
			};
		}
		return {
			score: this._config.scores.noAlt,
			resultText: i18n.dgettext(
				"js-text-analysis",
				"The images on this page are missing alt attributes."
			),
		};
	}
}

module.exports = TextImagesAssessment;
