/** @module analyses/checkUrlForStopwords */

var stopwords = require( "../analyses/checkStringForStopwords.js" );

/**
 * Matches stopwords in the URL. Replaces - and _ with whitespace.
 *
 * @param {string} url The URL to check for stopwords.
 * @returns {array} stopwords found in URL
 */

module.exports = function( valueObject ) {
	var url = valueObject.url;
	url = url.replace( /[-_]/g, " " );
	return stopwords( url );
};
