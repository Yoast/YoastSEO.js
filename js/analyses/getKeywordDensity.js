/** @module analyses/getKeywordDensity */

var countWords = require( "../stringProcessing/countWords.js" );
var matchWords = require( "../stringProcessing/matchTextWithWord.js" );
/**
 * Calculates the keyword density .
 *
 * @param {string} text The text to count the keywords in.
 * @param {string} keyword The keyword to match.
 * @returns {number} The keyword density.
 */
module.exports = function( valueObject ) {
	var wordCount = countWords( valueObject.text );
	var keywordCount = matchWords ( valueObject.text, valueObject.keyword );
	var keywordDensity = ( keywordCount / wordCount ) * 100;
	return keywordDensity.toFixed( 1 );
};
