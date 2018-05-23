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
			good: {
				score: 9,
				resultText: "The text contains %1$d word. This is more than or equal to the recommended minimum of %2$d words.",
				resultTextPlural: "The text contains %1$d words. This is more than or equal to the recommended minimum of %2$d words.",
			},
			okay: {
				score: 6,
				resultText: "The text contains %1$d word. This is slightly below the recommended minimum of %2$d words. " +
				"Add a bit more copy.",
				resultTextPlural: "The text contains %1$d words. This is slightly below the recommended minimum of %2$d words. " +
				"Add a bit more copy.",
			},
			bad: {
				score: 3,
				resultText: "The text contains %1$d word. This is below the recommended minimum of %2$d words. " +
				"Add more content that is relevant for the topic.",
				resultTextPlural: "The text contains %1$d words. This is below the recommended minimum of %2$d words. " +
				"Add more content that is relevant for the topic.",
			},
			veryBad: {
				score: -10,
				resultText: "The text contains %1$d word. This is far below the recommended minimum of %2$d words. " +
				"Add more content that is relevant for the topic.",
				resultTextPlural: "The text contains %1$d words. This is far below the recommended minimum of %2$d words. " +
				"Add more content that is relevant for the topic.",
			},
			veryVeryBad: {
				score: -20,
				resultText: "The text contains %1$d word. This is far below the recommended minimum of %2$d words. " +
				"Add more content that is relevant for the topic.",
				resultTextPlural: "The text contains %1$d words. This is far below the recommended minimum of %2$d words. " +
				"Add more content that is relevant for the topic.",
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
	 * @param {Object} i18n The locale object.
	 *
	 * @returns {AssessmentResult} The result of the assessment, containing both a score and a descriptive text.
	 */
	getResult( paper, researcher, i18n ) {
		this.wordCount = researcher.getResearch( "wordCountInText" );
		let assessmentResult = new AssessmentResult();
		const calculatedResult = this.calculateResult();

		assessmentResult.setScore( calculatedResult.score );
		assessmentResult.setText(
			this.translateScore(
				calculatedResult.resultText,
				calculatedResult.resultTextPlural,
				i18n
			)
		);

		return assessmentResult;
	}

	/**
	 * Calculates the result based on the current word count.
	 *
	 * @returns {Object} The result.
	 */
	calculateResult() {
		if ( this.wordCount >= this._config.parameters.recommendedMinimum ) {
			return this._config.good;
		}

		if ( inRange( this.wordCount, this._config.parameters.slightlyBelowMinimum, this._config.parameters.recommendedMinimum ) ) {
			return this._config.okay;
		}

		if ( inRange( this.wordCount, this._config.parameters.belowMinimum, this._config.parameters.slightlyBelowMinimum ) ) {
			return this._config.bad;
		}

		if ( inRange( this.wordCount, this._config.parameters.veryFarBelowMinimum, this._config.parameters.belowMinimum ) ) {
			return this._config.veryBad;
		}

		return this._config.veryVeryBad;
	}

	/**
	 * Translates the score to a message the user can understand.
	 *
	 * @param {string} resultText The text of the feedback from the configuration.
	 * @param {string} resultTextPlural The text of the feedback from the configuration (for the plural).
	 * @param {Object} i18n The object used for translations.
	 *
	 * @returns {string} The translated string.
	 */
	translateScore( resultText, resultTextPlural, i18n ) {
		return i18n.sprintf(
			i18n.dngettext(
				"js-text-analysis",
				/* Translators: %1$d expands to the number of words in the text, %2$s expands to the recommended minimum of words. */
				resultText,
				resultTextPlural,
				this.wordCount
			),
			this.wordCount,
			this._config.parameters.recommendedMinimum
		);
	}
}

module.exports = TextLengthAssessment;
