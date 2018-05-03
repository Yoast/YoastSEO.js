/** @module analyses/findKeywordInPageTitle */
const functionWords = require( "../helpers/getFunctionWords" )();
const wordMatch = require( "../stringProcessing/matchTextWithWord" );
const escapeRegExp = require( "lodash/escapeRegExp" );
const stripSpaces = require( "../stringProcessing/stripSpaces" );
const removePunctuation = require( "../stringProcessing/removePunctuation" );
const createRegexFromArray = require( "../stringProcessing/createRegexFromArray" );
const getLanguage = require( "../helpers/getLanguage" );
const isUndefined = require( "lodash/isUndefined" );

/**
 * Counts the occurrences of the keyword in the pagetitle. Returns the number of matches
 * and the position of the keyword.
 *
 * @param {object} paper The paper containing title and keyword.
 *
 * @returns {object} result with the matches and position.
 */

module.exports = function( paper ) {
	let title = removePunctuation( paper.getTitle() );
	let keyword = escapeRegExp( paper.getKeyword() );
	const locale = paper.getLocale();

	let result = { matches: 0, position: -1 };
	result.matches = wordMatch( title, keyword, locale );

	title = title.toLocaleLowerCase();
	keyword = keyword.toLocaleLowerCase();
	result.position = title.indexOf( keyword );

	if ( result.matches > 0 && result.position > 0 ) {
		const articles = functionWords[ getLanguage( locale ) ].articles;
		if ( ! isUndefined( articles ) ) {
			const articlesRegex = createRegexFromArray( articles );
			title = stripSpaces( title.replace( articlesRegex, "" ) );
			result.position = title.indexOf( keyword );
		}
	}

	return result;
};
