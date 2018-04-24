var AssessmentResult = require( "../../values/AssessmentResult.js" );
var inRange = require( "lodash/inRange" );
/**
 * Calculates the assessment result based on the keyphraseLength research
 * @param {int} keyphraseLength The length of keyphrase in words
 * @param {object} i18n The i18n-object used for parsing translations
 * @returns {object} object with score and text
 */
var calculateKeywordLengthResult = function( keyphraseLength, i18n ) {
	const recommendedMaximum = 5;
	const acceptableMaximum = 9;

	if ( inRange( keyphraseLength, 1, recommendedMaximum ) ) {
		return {
			score: 9,
			text: i18n.dgettext( "js-text-analysis", "Your keyphrase has a nice length." ),
		};
	}

	if ( inRange( keyphraseLength, recommendedMaximum, acceptableMaximum ) ) {
		return {
			score: 6,
			text: i18n.sprintf( i18n.dgettext( "js-text-analysis", "Your keyphrase is %1$d words long. That's more than the " +
				"recommended maximum of %2$d words. You might want to make the keyphrase a bit shorter." ), keyphraseLength, recommendedMaximum - 1 ),
		};
	}

	if ( keyphraseLength >= acceptableMaximum ) {
		return {
			score: 3,
			text: i18n.sprintf( i18n.dgettext( "js-text-analysis", "Your keyphrase is %1$d words long. That's way more than " +
				"the recommended maximum of %2$d words. Make the keyphrase shorter." ), keyphraseLength, recommendedMaximum - 1 ),
		};
	}
};
/**
 * Assesses the keyphrase presence and length
 *
 * @param {Paper} paper The paper to use for the assessment.
 * @param {Researcher} researcher The researcher used for calling research.
 * @param {Jed} i18n The object used for translations
 * @returns {AssessmentResult} The result of this assessment
 */
function keyphraseAssessment( paper, researcher, i18n ) {
	const keyphraseLength = researcher.getResearch( "keyphraseLength" );

	let keyphraseLengthResult =  new AssessmentResult();

	if ( paper.hasKeyword() ) {
		const calculatedResult = calculateKeywordLengthResult( keyphraseLength, i18n );
		keyphraseLengthResult.setScore( calculatedResult.score );
		keyphraseLengthResult.setText( calculatedResult.text );
	} else  {
		keyphraseLengthResult.setScore( -999 );
		keyphraseLengthResult.setText( i18n.dgettext( "js-text-analysis", "No focus keyword was set for this page. " +
			"If you do not set a focus keyword, no score can be calculated." ) );
	}
	return keyphraseLengthResult;
}

module.exports = {
	identifier: "keyphraseLength",
	getResult: keyphraseAssessment,
};
