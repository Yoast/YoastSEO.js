const getIndicesByWord = require( "../stringProcessing/indices" ).getIndicesByWord;
const forEach = require( "lodash/forEach" );
const sortBy = require( "lodash/sortBy" );
const normalizeQuotes = require( "../stringProcessing/quotes.js" ).normalize;

/**
 * Calculates the largest proportion of text between two keywords and between the first/last keyword and the
 * beginning/end of a text.
 *
 * @param {Paper} paper The paper to check the keyword distribution for.
 * @returns {number} Returns the largest distance between two keywords or a keyword and the start/end of the text.
 */
module.exports = function( paper ) {
	let text = paper.getText();
	text = text.toLowerCase();
	text = normalizeQuotes( text );
	let textLength = text.length;
	let keyword = paper.getKeyword();
	keyword = keyword.toLowerCase();
	keyword = normalizeQuotes( keyword );

	let keywordIndices = getIndicesByWord( keyword, text );
	let keywordDistances = [];

	/*
	 * Find the distance between two keywords, between the beginning of the text and the first keyword
	 * and the last keyword and the end of the text.
	 */
	forEach( keywordIndices, function( keywordIndex ) {
		let currentIndexWithinArray = keywordIndices.indexOf( keywordIndex );
		let indexOfPreviousKeyword;

		if ( currentIndexWithinArray === 0 && keywordIndices.length === 1 ) {
			// If there's only one keyword no distribution can be calculated.
			return null;
		} else if ( currentIndexWithinArray === 0 && keywordIndices.length > 1 ) {
			/*
			 * For the first instance of they keyword calculate the distance between
			 * the beginning of the text and that keyword.
			 */
			keywordDistances.push( keywordIndex.index );
		} else if ( currentIndexWithinArray > 0 && currentIndexWithinArray === keywordIndices.length - 1 ) {
			/*
			 * For the last instance of the keyword calculate the distance between that keyword
			 * and the previous keyword and also the distance between that keyword and the end
			 * of the text.
			 */
			indexOfPreviousKeyword = ( keywordIndices[ currentIndexWithinArray - 1 ].index );

			keywordDistances.push( keywordIndex.index - indexOfPreviousKeyword );
			keywordDistances.push( text.length - keywordIndex.index );
		} else {
			/*
			 * For all instances in between first and last calculate the distance between
			 * each of these keywords the preceding keyword.
			 */
			indexOfPreviousKeyword = ( keywordIndices[ currentIndexWithinArray - 1 ].index );
			keywordDistances.push( keywordIndex.index - indexOfPreviousKeyword );
		}
	} );
	keywordDistances = sortBy( keywordDistances );
	keywordDistances = keywordDistances.reverse();
	let largestKeywordDistance = keywordDistances[ 0 ];

	return ( largestKeywordDistance / textLength ) * 100;
};
