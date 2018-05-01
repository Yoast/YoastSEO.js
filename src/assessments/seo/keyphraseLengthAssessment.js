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
			scores: {
				keyphraseLength: 0,
			},
			assessment: {
				recommendedMaximum: 5,
				acceptableMaximum: 9,
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

		if ( paper.hasKeyword() ) {
			assessmentResult.setScore( this.calculateScore() );
			assessmentResult.setText( this.translateScore( i18n ) );
		} else  {
			assessmentResult.setScore( -999 );
			assessmentResult.setText( i18n.dgettext( "js-text-analysis", "No focus keyword was set for this page. " +
				"If you do not set a focus keyword, no score can be calculated." ) );
		}
		return assessmentResult;
	}

	/**
	 * Calculates the score result based on the keyphraseLength research.
	 *
	 * @returns {Object} object with score and text.
	 */
	calculateScore() {

		if ( inRange( this._keyphraseLength, 1, this._config.assessment.recommendedMaximum ) ) {
			return 9;
		}

		if ( inRange( this._keyphraseLength, this._config.assessment.recommendedMaximum, this._config.assessment.acceptableMaximum ) ) {
			return 6;
		}

		if ( this._keyphraseLength >= this._config.assessment.acceptableMaximum ) {
			return 3;
		}
	}

	/**
	 * Translates the score result based into specific feedback to the user.
	 * @param {object} i18n The i18n-object used for parsing translations.
	 *
	 * @returns {Object} object with score and text.
	 */
	translateScore( i18n ) {
		if ( inRange( this._keyphraseLength, 1, this._config.assessment.recommendedMaximum ) ) {
			return i18n.dgettext( "js-text-analysis", "Your keyphrase has a nice length." );
		}

		if ( inRange( this._keyphraseLength, this._config.assessment.recommendedMaximum, this._config.assessment.acceptableMaximum ) ) {
			return i18n.sprintf( i18n.dgettext( "js-text-analysis", "Your keyphrase is %1$d words long. That's more " +
					"than the recommended maximum of %2$d words. You might want to make the keyphrase a bit " +
					"shorter." ), this._keyphraseLength, this._config.assessment.recommendedMaximum - 1 );
		}

		if ( this._keyphraseLength >= this._config.assessment.acceptableMaximum ) {
			return i18n.sprintf( i18n.dgettext( "js-text-analysis", "Your keyphrase is %1$d words long. That's way " +
					"more than the recommended maximum of %2$d words. Make the keyphrase " +
					"shorter." ), this._keyphraseLength, this._config.assessment.recommendedMaximum - 1 );
		}
	}
}

module.exports = KeyphraseLengthAssessment;
