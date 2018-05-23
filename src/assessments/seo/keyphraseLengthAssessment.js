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

		const calculatedResult = this.calculateResult( i18n );
		assessmentResult.setScore( calculatedResult.score );
		assessmentResult.setText( calculatedResult.resultText );

		return assessmentResult;
	}

	/**
	 * Calculates the result based on the keyphraseLength research.
	 *
	 * @param {Jed} i18n The object used for translations.
	 *
	 * @returns {Object} Object with score and text.
	 */
	calculateResult( i18n ) {
		if ( this._keyphraseLength < this._config.parameters.recommendedMinimum ) {
			return {
				score: -999,
				resultText: i18n.sprintf(
					i18n.dgettext(
						"js-text-analysis",
						"No focus keyword was set for this page. If you do not set a focus keyword, no score can be calculated."
					)
				),
			};
		}

		if ( inRange( this._keyphraseLength, this._config.parameters.recommendedMinimum, this._config.parameters.recommendedMaximum + 1 ) ) {
			return {
				score: 9,
				resultText: i18n.sprintf(
					i18n.dgettext(
						"js-text-analysis",
						"Your keyphrase has a nice length."
					)
				),
			};
		}

		if ( inRange( this._keyphraseLength, this._config.parameters.recommendedMaximum + 1, this._config.parameters.acceptableMaximum + 1 ) ) {
			return {
				score: 6,
				resultText: i18n.sprintf(
					/* Translators: %1$d expands to the number of words in the keyphrase,
					%2$d expands to the recommended maximum of words in the keyphrase. */
					i18n.dgettext(
						"js-text-analysis",
						"Your keyphrase is %1$d words long. That's more than the recommended maximum of %2$d words. " +
							"You might want to make the keyphrase a bit shorter."
					),
					this._keyphraseLength,
					this._config.parameters.recommendedMaximum
				),
			};
		}

		return {
			score: 3,
			resultText: i18n.sprintf(
				/* Translators: %1$d expands to the number of words in the keyphrase,
				%2$d expands to the recommended maximum of words in the keyphrase. */
				i18n.dgettext(
					"js-text-analysis",
					"Your keyphrase is %1$d words long. That's way more than the recommended maximum of %2$d " +
					"words. Make the keyphrase shorter."
				),
				this._keyphraseLength,
				this._config.parameters.recommendedMaximum
			),
		};
	}
}

module.exports = KeyphraseLengthAssessment;
