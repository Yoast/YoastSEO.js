const getSubheadings = require( "../stringProcessing/getSubheadings.js" ).getSubheadings;
const forEach = require( "lodash/forEach.js" );

/**
 * Gets all H1s from the text.
 *
 * @param {Paper} paper The Paper object to get text from.
 * @returns {Array} An array with all found H1s.
 */
module.exports = function( paper ) {
	let text = paper.getText();

	let subheadings = getSubheadings( text );
	let h1s = [];

	forEach( subheadings, function( subheading ) {
		if ( subheading[ 1 ] === "1" ) {
			h1s.push( subheading );
		}
	} );

	return h1s;
};
