let Assessment = require( "../../assessment.js" );
let AssessmentResult = require( "../../values/AssessmentResult.js" );
const inRange = require( "lodash/inRange" );
const merge = require( "lodash/merge" );

/**
 * Assessment to check whether the keyphrase has a good length.
 */
class KeyphraseLengthAssessment extends Assessment {
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
				recommendedMinimum: 1,
				recommendedMaximum: 4,
				acceptableMaximum: 8,
			},
			good: {
				score: 9,
				resultText: "Your keyphrase has a nice length.",
				requiresLengthAndMax: false,
			},
			okay: {
				score: 6,
				resultText: "Your keyphrase is %1$d words long. That's more than the recommended maximum of %2$d words. " +
				"You might want to make the keyphrase a bit shorter.",
				requiresLengthAndMax: true,
			},
			bad: {
				score: 3,
				resultText: "Your keyphrase is %1$d words long. That's way more than the recommended maximum of %2$d " +
				"words. Make the keyphrase shorter.",
				requiresLengthAndMax: true,
			},
			veryBad: {
				score: -999,
				resultText: "No focus keyword was set for this page. If you do not set a focus keyword, no score can " +
				"be calculated.",
				requiresLengthAndMax: false,
			},
		};

		this.identifier = "keyphraseLength";
		this._config = merge( defaultConfig, config );
	}

	/**
	 * Assesses the keyphrase presence and length.
	 *
	 * @param {Paper} paper The paper to use for the assessment.
	 * @param {Researcher} researcher The researcher used for calling research.
	 * @param {Jed} i18n The object used for translations.
	 *
	 * @returns {AssessmentResult} The result of this assessment.
	 */
	getResult( paper, researcher, i18n ) {
		this._keyphraseLength = researcher.getResearch( "keyphraseLength" );
		let assessmentResult =  new AssessmentResult();

		const calculatedResult = this.calculateResult();
		assessmentResult.setScore( calculatedResult.score );
		assessmentResult.setText( this.translateScore( calculatedResult.resultText, calculatedResult.requiresLengthAndMax, i18n ) );

		return assessmentResult;
	}

	/**
	 * Calculates the result based on the keyphraseLength research.
	 *
	 * @returns {Object} Object with score and text.
	 */
	calculateResult() {
		if ( this._keyphraseLength < this._config.parameters.recommendedMinimum ) {
			return this._config.veryBad;
		}

		if ( inRange( this._keyphraseLength, this._config.parameters.recommendedMinimum, this._config.parameters.recommendedMaximum + 1 ) ) {
			return this._config.good;
		}

		if ( inRange( this._keyphraseLength, this._config.parameters.recommendedMaximum + 1, this._config.parameters.acceptableMaximum + 1 ) ) {
			return this._config.okay;
		}

		return this._config.bad;
	}

	/**
	 * Translates the score into a specific feedback to the user.
	 *
	 * @param {text} resultText The text of feedback for a given range of values of the assessment result.
	 * @param {boolean} requiresLengthAndMax Whether feedback needs to include keyphraseLength and recommendedMaximum.
	 * @param {Object} i18n The i18n-object used for parsing translations.
	 *
	 * @returns {string} Text feedback.
	 */
	translateScore( resultText, requiresLengthAndMax, i18n ) {
		if ( requiresLengthAndMax ) {
			return i18n.sprintf(
				i18n.dgettext(
					"js-text-analysis",
					/* Translators: %1$d expands to the number of words in the keyphrase,
					%2$d expands to the recommended maximum of words in the keyphrase. */
					resultText
				), this._keyphraseLength, this._config.parameters.recommendedMaximum
			);
		}
		return i18n.dgettext( "js-text-analysis", resultText );
	}
}

module.exports = KeyphraseLengthAssessment;
