var getSubheadingContents = require( "../stringProcessing/getSubheadings.js" ).getSubheadingContents;
var stripTags = require( "../stringProcessing/stripHTMLTags.js" ).stripFullTags;
var forEach = require( "lodash/forEach" );

/**
 * Gets the subheadings from the text and returns the length of these subheading in an array.
 * @param {Paper} paper The Paper object to get the text from.
 * @returns {Array} The array with the length of each subheading.
 */
module.exports = function( paper ) {
	var text = paper.getText();
	var matches = getSubheadingContents( text );

	var subHeadings = [];
	forEach( matches, function( subHeading ) {
		subHeading = stripTags( subHeading ).length;
		if ( subHeading > 0 ) {
			subHeadings.push( subHeading );
		}
	} );

	return subHeadings;
};
