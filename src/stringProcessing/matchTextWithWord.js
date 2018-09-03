/** @module stringProcessing/matchTextWithWord */

const stripSomeTags = require( "../stringProcessing/stripNonTextTags.js" );
const stripSpaces = require( "../stringProcessing/stripSpaces.js" );
const removePunctuation = require( "../stringProcessing/removePunctuation.js" );
const unifyWhitespace = require( "../stringProcessing/unifyWhitespace.js" ).unifyAllSpaces;
const matchStringWithTransliteration = require( "../stringProcessing/matchTextWithTransliteration.js" );
const normalizeQuotes = require( "../stringProcessing/quotes.js" ).normalize;
import { map } from "lodash-es";

/**
 * Returns the number of matches in a given string
 *
 * @param {string} text The text to use for matching the wordToMatch.
 * @param {string} wordToMatch The word to match in the text
 * @param {string} locale The locale used for transliteration.
 * @param {string} [extraBoundary] An extra string that can be added to the wordboundary regex
 * @returns {Object} The matches found and the number of matches.
 */
module.exports = function( text, wordToMatch, locale, extraBoundary ) {
	text = stripSomeTags( text );
	text = unifyWhitespace( text );
	text = normalizeQuotes( text );
	wordToMatch = normalizeQuotes( wordToMatch );
	let matches = matchStringWithTransliteration( text, wordToMatch, locale, extraBoundary );
	matches = map( matches, function( keyword ) {
		return stripSpaces( removePunctuation( keyword ) );
	} );

	return {
		count: matches.length,
		matches: matches,
	};
};
