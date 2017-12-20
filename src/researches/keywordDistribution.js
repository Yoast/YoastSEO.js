var getIndicesByWord = require("../stringProcessing/indices").getIndicesByWord;
var forEach = require( "lodash/forEach" );
var sortBy = require( "lodash/sortBy" );

module.exports = function ( paper ) {
	var text = paper.getText();
	var textLength = text.length;
	var keyword = paper.getKeyword();

	var keywordIndices = getIndicesByWord( keyword, text );

	var keywordDistances = [];

	forEach ( keywordIndices, function( keywordIndex ) {
		var currentIndexWithinArray = keywordIndices.indexOf( keywordIndex );

		// If there's only 1 keyword
		if ( keywordIndices.indexOf( keywordIndex ) == 0 && keywordIndices.length == 1 ) {
			return;
		}
		// First instance of they keyword
		else if ( keywordIndices.indexOf( keywordIndex ) == 0 && keywordIndices.length > 1 ) {
			keywordDistances.push( keywordIndex.index );
		}
		// Last instance of the keyword
		 else if ( keywordIndices.indexOf( keywordIndex ) > 0 && keywordIndices.indexOf( keywordIndex ) == keywordIndices.length - 1 ) {
			var indexOfPreviousKeyword = ( keywordIndices[currentIndexWithinArray - 1 ].index );

			keywordDistances.push( keywordIndex.index - indexOfPreviousKeyword );
			keywordDistances.push( text.length - keywordIndex.index );
		}
		// In between first and last instance
		else {
			var indexOfPreviousKeyword = ( keywordIndices[currentIndexWithinArray - 1 ].index );
		 	keywordDistances.push( keywordIndex.index - indexOfPreviousKeyword );
		}
	} );
	keywordDistances = sortBy( keywordDistances );
	keywordDistances = keywordDistances.reverse();

	var largestKeywordDistance = keywordDistances[0];
	var largestProportion = ( largestKeywordDistance / textLength ) * 100;

	return Math.round( largestProportion );
};
