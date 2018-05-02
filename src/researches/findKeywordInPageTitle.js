/** @module analyses/findKeywordInPageTitle */

var wordMatch = require( "../stringProcessing/matchTextWithWord.js" );

var escapeRegExp = require( "lodash/escapeRegExp" );

/**
 * Counts the occurrences of the keyword in the pagetitle. Returns the number of matches
 * and the position of the keyword.
 *
 * @param {object} paper The paper containing title and keyword.
 * @returns {object} result with the matches and position.
 */

module.exports = function( paper ) {
	var title = paper.getTitle();
	var keyword = escapeRegExp( paper.getKeyword() );
	var locale = paper.getLocale();

	var result = { matches: 0, position: -1 };
	result.matches = wordMatch( title, keyword, locale );
	result.position = title.toLocaleLowerCase().indexOf( keyword );

	return result;
};


/** @module analyses/findKeywordInPageTitle */
/* const functionWords = [];
const wordMatch = require( "../stringProcessing/matchTextWithWord.js" );

const escapeRegExp = require( "lodash/escapeRegExp" );

module.exports = function( paper ) {
	const title = paper.getTitle();
	const keyword = escapeRegExp( paper.getKeyword() );
	const locale = paper.getLocale();
	 const firstWordTitle = title.replace( / .star/, "" );

	let result = { matches: 0, position: -1 };
	result.matches = wordMatch( title, keyword, locale );
	result.position = title.toLocaleLowerCase().indexOf( keyword );

	 if ( functionWords.includes( firstWordTitle ) && result.position === 1 ) {
		result.position = 0;
	}

	return result;
};

*/
