/** @module researches/stopWordsInUrl */

var stopWordsInText = require( "./stopWordsInText.js" );

/**
 * Matches stopwords in the URL. Replaces - and _ with whitespace.
 * @param {Paper} paper The Paper object to get the url from.
 * @returns {Array} stopwords found in URL
 */
module.exports = function( paper ) {
	let locale = paper.getLocale();
	return stopWordsInText( paper.getUrl().replace( /[-_]/g, " " ), locale, true );
};
