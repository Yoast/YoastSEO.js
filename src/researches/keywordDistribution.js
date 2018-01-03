var getIndicesByWord = require( "../stringProcessing/indices" ).getIndicesByWord;
var forEach = require( "lodash/forEach" );
var sortBy = require( "lodash/sortBy" );

module.exports = function( paper ) {
	var text = paper.getText();
	var textLength = text.length;
	var keyword = paper.getKeyword();

	var keywordIndices = getIndicesByWord( keyword, text );

	var keywordDistances = [];

	forEach ( keywordIndices, function( keywordIndex ) {
		var currentIndexWithinArray = keywordIndices.indexOf( keywordIndex );
		var indexOfPreviousKeyword;

		if ( keywordIndices.indexOf( keywordIndex ) === 0 && keywordIndices.length === 1 ) {
			// If there's only 1 keyword
			return;
		} else if ( keywordIndices.indexOf( keywordIndex ) === 0 && keywordIndices.length > 1 ) {
			// First instance of they keyword
			keywordDistances.push( keywordIndex.index );
		} else if ( keywordIndices.indexOf( keywordIndex ) > 0 && keywordIndices.indexOf( keywordIndex ) === keywordIndices.length - 1 ) {
			// Last instance of the keyword
			indexOfPreviousKeyword = ( keywordIndices[ currentIndexWithinArray - 1 ].index );

			keywordDistances.push( keywordIndex.index - indexOfPreviousKeyword );
			keywordDistances.push( text.length - keywordIndex.index );
		} else {
			// All instances in between first and last
			indexOfPreviousKeyword = ( keywordIndices[ currentIndexWithinArray - 1 ].index );
			keywordDistances.push( keywordIndex.index - indexOfPreviousKeyword );
		}
	} );
	keywordDistances = sortBy( keywordDistances );
	keywordDistances = keywordDistances.reverse();

	var largestKeywordDistance = keywordDistances[ 0 ];
	var largestProportion = ( largestKeywordDistance / textLength ) * 100;

	return Math.round( largestProportion );
};
