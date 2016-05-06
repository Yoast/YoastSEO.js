/** @module stringProcessing/matchTextWithWord */

var stringToRegex = require( "../stringProcessing/stringToRegex.js" );
var stripSomeTags = require( "../stringProcessing/stripNonTextTags.js" );
var unifyWhitespace = require( "../stringProcessing/unifyWhitespace.js" );
var replaceDiacritics = require( "../stringProcessing/replaceDiacritics.js" );

/**
 * Returns the number of matches in a given string
 *
 * @param {string} text The text to use for matching the wordToMatch.
 * @param {string} wordToMatch The word to match in the text
 * @param {string} [extraBoundary] An extra string that can be added to the wordboundary regex
 * @returns {number} The amount of matches found.
 */
module.exports = function( text, wordToMatch, extraBoundary ) {
	text = stripSomeTags( text );
	text = unifyWhitespace( text );
	text = replaceDiacritics( text );

	var matches = text.match( stringToRegex( wordToMatch, extraBoundary ) );

	if ( matches === null ) {
		return 0;
	}

	return matches.length;
};
