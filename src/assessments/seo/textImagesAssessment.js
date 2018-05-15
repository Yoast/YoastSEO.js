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
	 * @param {object} config The configuration to use.
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
			noImages: {
				score: 3,
				resultText: "No images appear in this page, consider adding some as appropriate.",
			},
			withAltKeyword: {
				score: 9,
				resultText: "The images on this page contain alt attributes with the focus keyword.",
			},
			withAltNonKeyword: {
				score: 6,
				resultText: "The images on this page do not have alt attributes containing the focus keyword.",
			},
			withAlt: {
				score: 6,
				resultText: "The images on this page contain alt attributes.",
			},
			noAlt: {
				score: 6,
				resultText: "The images on this page are missing alt attributes.",
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
	 * @param {object} i18n The locale object.
	 *
	 * @returns {AssessmentResult} The result of the assessment, containing both a score and a descriptive text.
	 */
	getResult( paper, researcher, i18n ) {
		let assessmentResult = new AssessmentResult();
		this.imageCount = researcher.getResearch( "imageCount" );
		this.altProperties = researcher.getResearch( "altTagCount" );

		const calculatedResult = this.calculateResult();
		assessmentResult.setScore( calculatedResult.score );
		assessmentResult.setText( this.translateScore( calculatedResult.resultText, i18n ) );

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
	 * @returns {Object} The calculated result.
	 */
	calculateResult() {
		if ( this.imageCount === 0 ) {
			return this._config.noImages;
		}

		// Has alt-tag and keywords
		if ( this.altProperties.withAltKeyword > 0 ) {
			return this._config.withAltKeyword;
		}

		// Has alt-tag, but no keywords and it's not okay
		if ( this.altProperties.withAltNonKeyword > 0 ) {
			return this._config.withAltNonKeyword;
		}

		// Has alt-tag, but no keyword is set
		if ( this.altProperties.withAlt > 0 ) {
			return this._config.withAlt;
		}

		return this._config.noAlt;
	}

	/**
	 * Translates the score to a message the user can understand.
	 *
	 * @param {string} resultText The feedback to give to the user.
	 * @param {Object} i18n The object used for translations.
	 *
	 * @returns {string} The translated string.
	 */
	translateScore( resultText, i18n ) {
		return i18n.dgettext( "js-text-analysis", resultText );
	}
}

module.exports = TextImagesAssessment;
