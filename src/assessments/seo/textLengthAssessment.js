let AssessmentResult = require( "../../values/AssessmentResult.js" );
let Assessment = require( "../../assessment.js" );
let inRange = require( "lodash/inRange" );
let merge = require( "lodash/merge" );

/**
 * Assessment that will test if the text is long enough.
 */
class TextLengthAssessment extends Assessment {
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
				recommendedMinimum: 300,
				slightlyBelowMinimum: 250,
				belowMinimum: 200,
				veryFarBelowMinimum: 100,
			},
			scores: {
				good: 9,
				okay: 6,
				bad: 3,
				veryBad: -10,
				veryVeryBad: -20,
			},
		};

		this.identifier = "textLength";
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
		this.wordCount = researcher.getResearch( "wordCountInText" );
		let assessmentResult = new AssessmentResult();

		const calculatedResult = this.calculateResult( i18n );
		assessmentResult.setScore( calculatedResult.score );
		assessmentResult.setText( calculatedResult.resultText );

		return assessmentResult;
	}

	/**
	 * Calculates the result based on the current word count.
	 *
	 * 	@param {Object} i18n The object used for translations.
	 *
	 * @returns {Object} The result object with score and resultText.
	 */
	calculateResult( i18n ) {
		if ( this.wordCount >= this._config.parameters.recommendedMinimum ) {
			return {
				score: this._config.scores.good,
				resultText: i18n.sprintf(
					/* Translators: %1$d expands to the number of words in the text, %2$s expands to the recommended minimum of words. */
					i18n.dngettext(
						"js-text-analysis",
						"The text contains %1$d word. This is more than or equal to the recommended minimum of %2$d words.",
						"The text contains %1$d words. This is more than or equal to the recommended minimum of %2$d words.",
						this.wordCount
					),
					this.wordCount,
					this._config.parameters.recommendedMinimum
				),
			};
		}

		if ( inRange( this.wordCount, this._config.parameters.slightlyBelowMinimum, this._config.parameters.recommendedMinimum ) ) {
			return {
				score: this._config.scores.okay,
				resultText: i18n.sprintf(
					/* Translators: %1$d expands to the number of words in the text, %2$s expands to the recommended minimum of words. */
					i18n.dngettext(
						"js-text-analysis",
						"The text contains %1$d word. This is slightly below the recommended minimum of %2$d words. Add a bit more copy.",
						"The text contains %1$d words. This is slightly below the recommended minimum of %2$d words. Add a bit more copy.",
						this.wordCount
					),
					this.wordCount,
					this._config.parameters.recommendedMinimum
				),
			};
		}

		if ( inRange( this.wordCount, this._config.parameters.belowMinimum, this._config.parameters.slightlyBelowMinimum ) ) {
			return {
				score: this._config.scores.bad,
				resultText: i18n.sprintf(
					/* Translators: %1$d expands to the number of words in the text, %2$s expands to the recommended minimum of words. */
					i18n.dngettext(
						"js-text-analysis",
						"The text contains %1$d word. This is below the recommended minimum of %2$d words. " +
							"Add more content that is relevant for the topic.",
						"The text contains %1$d words. This is below the recommended minimum of %2$d words. " +
							"Add more content that is relevant for the topic.",
						this.wordCount
					),
					this.wordCount,
					this._config.parameters.recommendedMinimum
				),
			};
		}

		if ( inRange( this.wordCount, this._config.parameters.veryFarBelowMinimum, this._config.parameters.belowMinimum ) ) {
			return {
				score: this._config.scores.veryBad,
				resultText: i18n.sprintf(
					/* Translators: %1$d expands to the number of words in the text, %2$s expands to the recommended minimum of words. */
					i18n.dngettext(
						"js-text-analysis",
						"The text contains %1$d word. This is far below the recommended minimum of %2$d words. " +
							"Add more content that is relevant for the topic.",
						"The text contains %1$d words. This is far below the recommended minimum of %2$d words. " +
							"Add more content that is relevant for the topic.",
						this.wordCount
					),
					this.wordCount,
					this._config.parameters.recommendedMinimum
				),
			};
		}

		return {
			score: this._config.scores.veryVeryBad,
			resultText: i18n.sprintf(
				/* Translators: %1$d expands to the number of words in the text, %2$s expands to the recommended minimum of words. */
				i18n.dngettext(
					"js-text-analysis",
					"The text contains %1$d word. This is far below the recommended minimum of %2$d words. " +
						"Add more content that is relevant for the topic.",
					"The text contains %1$d words. This is far below the recommended minimum of %2$d words. " +
						"Add more content that is relevant for the topic.",
					this.wordCount
				),
				this.wordCount,
				this._config.parameters.recommendedMinimum
			),
		};
	}
}

module.exports = TextLengthAssessment;
