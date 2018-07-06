/** @module analyses/findKeywordInPageTitle */
const functionWords = require( "../helpers/getFunctionWords" )();
const wordMatch = require( "../stringProcessing/matchTextWithWord" );
const escapeRegExp = require( "lodash/escapeRegExp" );
const stripSpaces = require( "../stringProcessing/stripSpaces" );
const createRegexFromArray = require( "../stringProcessing/createRegexFromArray" );
const getLanguage = require( "../helpers/getLanguage" );
const isUndefined = require( "lodash/isUndefined" );
const normalizeQuotes = require( "../stringProcessing/quotes.js" ).normalize;

/**
 * Counts the occurrences of the keyword in the pagetitle. Returns the number of matches
 * and the position of the keyword.
 *
 * @param {Object} paper The paper containing title and keyword.
 *
 * @returns {Object} Result with the matches and position.
 */

module.exports = function( paper ) {
	let title = normalizeQuotes( paper.getTitle() );
	let keyword = escapeRegExp( normalizeQuotes( paper.getKeyword() ).toLocaleLowerCase() );
	const locale = paper.getLocale();

	let result = { matches: 0, position: -1 };
	result.matches = wordMatch( title, keyword, locale ).count;

	title = title.toLocaleLowerCase();
	keyword = keyword.toLocaleLowerCase();
	result.position = title.indexOf( keyword );

	// Return if no matches were found
	if  ( result.matches === 0 || result.position <= 0 ) {
		return result;
	}

	/*
	 * If some matches were found, we need to return their position in the title.
	 * If the keyword is in the beginning of the title, but it is used with an article, we still want to return
	 * a position 0, not 1.
	 * Here we trim away all articles and calculate the position of the keyword after that.
	 */
	const articles = functionWords[ getLanguage( locale ) ].articles;
	if ( ! isUndefined( articles ) ) {
		const articlesRegex = createRegexFromArray( articles );
		title = stripSpaces( title.replace( articlesRegex, "" ) );
		result.position = title.indexOf( keyword );
	}
	return result;
};
