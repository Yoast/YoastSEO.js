/** @module stringProcessing/cleanText */

var stripSpaces = require( "../stringProcessing/stripSpaces.js" );
var replaceDiacritics = require( "../stringProcessing/replaceDiacritics.js" );
var unifyWhitespace = require( "../stringProcessing/unifyWhitespace.js" );

/**
 * Removes words, duplicate spaces and sentence terminators, and words consisting of only digits
 * from the text. This is used for the flesh reading ease test.
 *
 * @param {String} text The cleaned text
 * @returns {String} The text
 */
module.exports = function( text ) {
	if ( text === "" ) {
		return text;
	}

	text = replaceDiacritics( text );
	text = text.toLocaleLowerCase();

	text = unifyWhitespace( text );

	// Replace commas, hyphens etc with spaces
	text = text.replace( /[\-\;\:\,\(\)\"\'\|\“\”]/g, " " );

	// Remove apostrophe
	text = text.replace( /[\’]/g, "" );

	// Unify all terminators
	text = text.replace( /[.?!]/g, "." );

	// Remove double spaces
	text = stripSpaces( text );

	// Add period in case it is missing
	text += ".";

	// Replace newlines with spaces
	text = text.replace( /[ ]*(\n|\r\n|\r)[ ]*/g, " " );

	// Remove duplicate terminators
	text = text.replace( /([\.])[\. ]+/g, "$1" );

	// Pad sentence terminators
	text = text.replace( /[ ]*([\.])+/g, "$1 " );

	// Remove double spaces
	text = stripSpaces( text );

	if ( text === "." ) {
		return "";
	}

	return text;
};
