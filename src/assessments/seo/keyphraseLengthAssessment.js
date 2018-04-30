let Assessment = require( "../../assessment.js" );
let AssessmentResult = require( "../../values/AssessmentResult.js" );
const inRange = require( "lodash/inRange" );
const merge = require( "lodash/merge" );
/**
 * Assessment to check whether the keyphrase has a good length.
 * 1-4 words: green; 5-8 words: orange; 9+ words: red
 */
class keyphraseLengthAssessment extends Assessment {
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
				keyphraseLength: 0,
			},
		};

		this.identifier = "keyphraseLength";
		this._config = merge( defaultConfig, config );
	}

	/**
	 * Assesses the keyphrase presence and length
	 *
	 * @param {Paper} paper The paper to use for the assessment.
	 * @param {Researcher} researcher The researcher used for calling research.
	 * @param {Jed} i18n The object used for translations
	 * @returns {AssessmentResult} The result of this assessment
	 */
	getResult( paper, researcher, i18n ) {
		this._keyphraseLength = researcher.getResearch( "keyphraseLength" );
		let assessmentResult =  new AssessmentResult();

		if ( paper.hasKeyword() ) {
			const calculatedResult = this.calculateKeywordLengthResult( i18n );
			assessmentResult.setScore( calculatedResult.score );
			assessmentResult.setText( calculatedResult.text );
		} else  {
			assessmentResult.setScore( -999 );
			assessmentResult.setText( i18n.dgettext( "js-text-analysis", "No focus keyword was set for this page. " +
				"If you do not set a focus keyword, no score can be calculated." ) );
		}
		return assessmentResult;
	}

	/**
	 * Calculates the assessment result based on the keyphraseLength research
	 * @param {object} i18n The i18n-object used for parsing translations
	 * @returns {object} object with score and text
	 */
	calculateKeywordLengthResult( i18n ) {
		const recommendedMaximum = 5;
		const acceptableMaximum = 9;

		if ( inRange( this._keyphraseLength, 1, recommendedMaximum ) ) {
			return {
				score: 9,
				text: i18n.dgettext( "js-text-analysis", "Your keyphrase has a nice length." ),
			};
		}

		if ( inRange( this._keyphraseLength, recommendedMaximum, acceptableMaximum ) ) {
			return {
				score: 6,
				text: i18n.sprintf( i18n.dgettext( "js-text-analysis", "Your keyphrase is %1$d words long. That's more " +
					"than the recommended maximum of %2$d words. You might want to make the keyphrase a bit " +
					"shorter." ), this._keyphraseLength, recommendedMaximum - 1 ),
			};
		}

		if ( this._keyphraseLength >= acceptableMaximum ) {
			return {
				score: 3,
				text: i18n.sprintf( i18n.dgettext( "js-text-analysis", "Your keyphrase is %1$d words long. That's way " +
					"more than the recommended maximum of %2$d words. Make the keyphrase " +
					"shorter." ), this._keyphraseLength, recommendedMaximum - 1 ),
			};
		}
	}
}


module.exports = keyphraseLengthAssessment;
