/** @module analyses/findKeywordInFirstParagraph */

const matchParagraphs = require( "../stringProcessing/matchParagraphs.js" );
const getSentences = require( "../stringProcessing/getSentences.js" );
const findTopicFormsInString = require( "./findKeywordFormsInString.js" ).findTopicFormsInString;
const imageInText = require( "../stringProcessing/imageInText" );

const reject = require( "lodash/reject" );
const isEmpty = require( "lodash/isEmpty" );

/**
 * Checks if the paragraph consists only of images.
 *
 * @param {string} text The text string to analyze.
 *
 * @returns {boolean} True if the text consists only of images, false otherwise.
 */
function paragraphConsistsOfImagesOnly( text ) {
	const images = imageInText( text );
	if ( images.length < 1 ) {
		return false;
	}

	images.forEach( function( image ) {
		text = text.replace( image, "" );
	} );

	return text === "";
}

/**
 * Checks if the introductory paragraph contains keyphrase or synonyms.
 * First splits the first paragraph by sentences. Finds the first paragraph which contains sentences e.g., not an image).
 * (1) Tries to find all (content) words from the keyphrase or a synonym phrase within one sentence.
 * If found all words within one sentence, returns an object with foundInOneSentence = true and keyphraseOrSynonym = "keyphrase"
 * or "synonym".
 * If it did not find all words within one sentence, goes ahead with matching the keyphrase with the entire first paragraph.
 * (2) Tries to find all (content) words from the keyphrase or a synonym phrase within the paragraph.
 * If found all words within the paragraph, returns an object with foundInOneSentence = false, foundInParagraph = true,
 * and keyphraseOrSynonym = "keyphrase" or "synonym".
 * If found not all words within the paragraph of nothing at all, returns an object with foundInOneSentence = false,
 * foundInParagraph = false, and keyphraseOrSynonym = "".
 *
 * @param {Paper} paper The text to check for paragraphs.
 * @param {Researcher} researcher The researcher to use for analysis.
 *
 * @returns {Object} Whether the keyphrase words were found in one sentence, whether the keyphrase words were found in
 * the paragraph, whether a keyphrase or a synonym phrase was matched.
 */
export default function( paper, researcher ) {
	const topicForms = researcher.getResearch( "morphology" );
	const locale = paper.getLocale();

	let paragraphs = matchParagraphs( paper.getText() );
	paragraphs = reject( paragraphs, isEmpty );

	paragraphs = reject( paragraphs, paragraphConsistsOfImagesOnly )[ 0 ] || "";

	const result = {
		foundInOneSentence: false,
		foundInParagraph: false,
		keyphraseOrSynonym: "",
	};

	const sentences = getSentences( paragraphs );
	// Use both keyphrase and synonyms to match topic words in the first paragraph.
	const useSynonyms = true;

	if ( ! isEmpty( sentences ) ) {
		sentences.forEach( function( sentence ) {
			const resultSentence = findTopicFormsInString( topicForms, sentence, useSynonyms, locale );
			if ( resultSentence.percentWordMatches === 100 ) {
				result.foundInOneSentence = true;
				result.foundInParagraph = true;
				result.keyphraseOrSynonym = resultSentence.keyphraseOrSynonym;
				return result;
			}
		} );

		const resultParagraph = findTopicFormsInString( topicForms, paragraphs, useSynonyms, locale );
		if ( resultParagraph.percentWordMatches === 100 ) {
			result.foundInParagraph = true;
			result.keyphraseOrSynonym = resultParagraph.keyphraseOrSynonym;
			return result;
		}
	}

	return result;
}
