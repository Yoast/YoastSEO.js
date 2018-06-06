let AssessmentResult = require( "../../values/AssessmentResult.js" );
let Assessment = require( "../../assessment.js" );
const inRangeStartEndInclusive = require( "../../helpers/inRange.js" ).inRangeStartEndInclusive;
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
			parameters: {
				lowerBoundary: 0.3,
				upperBoundary: 0.75,
			},
			scores: {
				noImages: 3,
				withAltGoodNumberOfKeywordMatches: 9,
				withAltTooFewKeywordMatches: 6,
				withAltTooManyKeywordMatches: 6,
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
		this._minNumberOfKeywordMatches = Math.ceil( this.imageCount * this._config.parameters.lowerBoundary );
		this._maxNumberOfKeywordMatches = Math.floor( this.imageCount * this._config.parameters.upperBoundary );

		const calculatedResult = this.calculateResult( i18n );
		assessmentResult.setScore( calculatedResult.score );
		assessmentResult.setText( calculatedResult.resultText );

		return assessmentResult;
	}

	hasTooFewMatches() {
		return this.imageCount > 4 && this.altProperties.withAltKeyword < this._minNumberOfKeywordMatches;
	}

	hasGoodNumberOfMatches() {
		return ( ( this.imageCount < 5 && this.altProperties.withAltKeyword > 0 ) ||
			( this.imageCount > 4 &&
				inRangeStartEndInclusive( this.altProperties.withAltKeyword, this._minNumberOfKeywordMatches, this._maxNumberOfKeywordMatches ) ) );
	}

	hasTooManyMatches() {
		return this.imageCount > 4 && this.altProperties.withAltKeyword > this._maxNumberOfKeywordMatches;
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

		// Has alt-tag, but no keyword is set.
		if ( this.altProperties.withAlt > 0 ) {
			return {
				score: this._config.scores.withAlt,
				resultText: i18n.dgettext(
					"js-text-analysis",
					"The images on this page contain alt attributes. " +
					"Once you've set a focus keyword, also include the keyword where appropriate."
				),
			};
		}

		// Image count < 5, Has alt-tag, but no keywords and it's not okay.
		if ( this.imageCount < 5 && this.altProperties.withAltNonKeyword > 0 && this.altProperties.withAltKeyword === 0 ) {
			return {
				score: this._config.scores.withAltNonKeyword,
				resultText: i18n.dgettext(
					"js-text-analysis",
					"The images on this page do not have alt attributes containing the focus keyword."
				),
			};
		}

		// Has alt-tag and keywords
		if ( this.hasTooFewMatches() ) {
			return {
				score: this._config.scores.withAltTooFewKeywordMatches,
				resultText: i18n.sprintf( i18n.dgettext(
					"js-text-analysis",
					"Only in %1$d out of %2$d images on this page contain alt attributes with the focus keyword. " +
					"Where appropriate, try to include the focus keyword in more alt attributes."
					),
					this.altProperties.withAltKeyword,
					this.imageCount
				),
			};
		}

		if ( this.hasGoodNumberOfMatches() ) {
			return {
				score: this._config.scores.withAltGoodNumberOfKeywordMatches,
				resultText: i18n.sprintf( i18n.dngettext(
					"js-text-analysis",
					"The image on this page contains an alt attribute with the focus keyword.",
					"%1$d out of %2$d images on this page contain alt attributes with the focus keyword.",
					this.imageCount
					),
					this.altProperties.withAltKeyword,
					this.imageCount
				),
			};
		}

		if ( this.hasTooManyMatches() ) {
			return {
				score: this._config.scores.withAltTooFewKeywordMatches,
				resultText: i18n.sprintf( i18n.dgettext(
					"js-text-analysis",
					"%1$d out of %2$d images on this page contain alt attributes with the focus keyword. " +
					"That's a bit much. Only include the focus keyword when it really fits the image."
					),
					this.altProperties.withAltKeyword,
					this.imageCount
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
