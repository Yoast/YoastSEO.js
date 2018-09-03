let AssessmentResult = require( "../../values/AssessmentResult.js" );
let formatNumber = require( "../../helpers/formatNumber.js" );
import { map } from "lodash-es";
let inRange = require( "../../helpers/inRange.js" ).inRangeStartInclusive;
let stripTags = require( "../../stringProcessing/stripHTMLTags" ).stripIncompleteTags;

let Mark = require( "../../values/Mark.js" );
let marker = require( "../../markers/addMark.js" );

let getLanguageAvailability = require( "../../helpers/getLanguageAvailability.js" );
let availableLanguages = [ "en", "de", "es", "fr", "nl", "it", "pt", "ru", "ca", "pl" ];

/**
 * Calculates the actual percentage of transition words in the sentences.
 *
 * @param {object} sentences The object containing the total number of sentences and the number of sentences containing
 * a transition word.
 * @returns {number} The percentage of sentences containing a transition word.
 */
let calculateTransitionWordPercentage = function( sentences ) {
	if ( sentences.transitionWordSentences === 0 || sentences.totalSentences === 0 ) {
		return 0;
	}

	return formatNumber( ( sentences.transitionWordSentences / sentences.totalSentences ) * 100 );
};

/**
 * Calculates transition word result
 * @param {object} transitionWordSentences The object containing the total number of sentences and the number of sentences containing
 * a transition word.
 * @param {object} i18n The object used for translations.
 * @returns {object} Object containing score and text.
 */
let calculateTransitionWordResult = function( transitionWordSentences, i18n ) {
	let score;
	let percentage = calculateTransitionWordPercentage( transitionWordSentences );
	let hasMarks   = ( percentage > 0 );
	let transitionWordsURL = "<a href='https://yoa.st/transition-words' target='_blank'>";

	if ( percentage < 20 ) {
		// Red indicator.
		score = 3;
	}

	if ( inRange( percentage, 20, 30 ) ) {
		// Orange indicator.
		score = 6;
	}

	if ( percentage >= 30 ) {
		// Green indicator.
		score = 9;
	}

	if ( score < 7 ) {
		let recommendedMinimum = 30;
		return {
			score: formatNumber( score ),
			hasMarks: hasMarks,
			text: i18n.sprintf(
				i18n.dgettext( "js-text-analysis",

					// Translators: %1$s expands to the number of sentences containing transition words, %2$s expands to a link on yoast.com,
					// %3$s expands to the anchor end tag, %4$s expands to the recommended value.
					"%1$s of the sentences contain a %2$stransition word%3$s or phrase, " +
					"which is less than the recommended minimum of %4$s."
				), percentage + "%", transitionWordsURL, "</a>", recommendedMinimum + "%" ),
		};
	}

	return {
		score: formatNumber( score ),
		hasMarks: hasMarks,
		text: i18n.sprintf( i18n.dgettext( "js-text-analysis",

			// Translators: %1$s expands to the number of sentences containing transition words, %2$s expands to a link on yoast.com,
			// %3$s expands to the anchor end tag.
			"%1$s of the sentences contain a %2$stransition word%3$s or phrase, " +
			"which is great."
		), percentage + "%", transitionWordsURL, "</a>" ),
	};
};

/**
 * Scores the percentage of sentences including one or more transition words.
 * @param {object} paper The paper to use for the assessment.
 * @param {object} researcher The researcher used for calling research.
 * @param {object} i18n The object used for translations.
 * @returns {object} The Assessment result.
 */
let transitionWordsAssessment = function( paper, researcher, i18n ) {
	let transitionWordSentences = researcher.getResearch( "findTransitionWords" );
	let transitionWordResult = calculateTransitionWordResult( transitionWordSentences, i18n );
	let assessmentResult = new AssessmentResult();

	assessmentResult.setScore( transitionWordResult.score );
	assessmentResult.setText( transitionWordResult.text );
	assessmentResult.setHasMarks( transitionWordResult.hasMarks );

	return assessmentResult;
};

/**
 * Marks text for the transition words assessment.
 * @param {Paper} paper The paper to use for the marking.
 * @param {Researcher} researcher The researcher containing the necessary research.
 * @returns {Array<Mark>} A list of marks that should be applied.
 */
let transitionWordsMarker = function( paper, researcher ) {
	let transitionWordSentences = researcher.getResearch( "findTransitionWords" );

	return map( transitionWordSentences.sentenceResults, function( sentenceResult ) {
		let sentence = sentenceResult.sentence;
		sentence = stripTags( sentence );
		return new Mark( {
			original: sentence,
			marked: marker( sentence ),
		} );
	} );
};

module.exports = {
	identifier: "textTransitionWords",
	getResult: transitionWordsAssessment,
	isApplicable: function( paper ) {
		let isLanguageAvailable = getLanguageAvailability( paper.getLocale(), availableLanguages );
		return ( isLanguageAvailable && paper.hasText() );
	},
	getMarks: transitionWordsMarker,
};
