import stopwords from "../config/stopwords.js";
import toRegex from "../stringProcessing/createWordRegex.js";

/**
 * Checks a text to see if there are any stopwords, that are defined in the stopwords config.
 *
 * @param {string} text The input text to match stopwords.
 * @param {string} locale The text's locale.
 * @param {boolean} replaceDiacritics True if diacritics should be replaced.
 * @returns {Array} An array with all stopwords found in the text.
 */
module.exports = function( text, locale, replaceDiacritics ) {
	let stopwordList = stopwords( locale );
	let i, matches = [];

	for ( i = 0; i < stopwordList.length; i++ ) {
		if ( text.match( toRegex( stopwordList[ i ], "", replaceDiacritics ) ) !== null ) {
			matches.push( stopwordList[ i ] );
		}
	}
	return matches;
};
