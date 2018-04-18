// We use an external library, which can be found here: https://github.com/fb55/htmlparser2.
const htmlparser = require( "htmlparser2" );
const isEmpty = require( "lodash/isEmpty" );

/**
 * Gets all H1s in a text, including their content and their position with regards to other HTML blocks.
 *
 * @param {Paper} paper The paper for which to get the H1s.
 *
 * @returns {Array} An array with all H1s, their content and position.
 */
module.exports = function( paper ) {
	let text = paper.getText();
	let allHTMLBlocks = [];
	let isH1 = false;
	let htmlBlock = {};

	/*
	 * Gets the tag names for all HTML blocks. In case an HTML block is an H1, also the content is included.
	 * The content is required for marking.
	 */
	let parser = new htmlparser.Parser( {
		onopentag: function( tagName ) {
			htmlBlock.tag = tagName;
			if ( tagName === "h1" ) {
				isH1 = true;
			}
		},
		ontext: function( text ) {
			if ( isH1 === true ) {
				htmlBlock.content = text;
			}
			if( ! isEmpty( htmlBlock ) ) {
				allHTMLBlocks.push( htmlBlock );
			}
			htmlBlock = {};
		},
		onclosetag: function( tagName ) {
			if ( tagName === "h1" ) {
				isH1 = false;
			}
		},
	}, { decodeEntities: true } );

	parser.write( text );

	let h1s = [];

	// Pushes all H1s into an array and adds their position with regards to the other HTML blocks in the body.
	for ( let i = 0; i < allHTMLBlocks.length; i++ ) {
		if( allHTMLBlocks[ i ].tag === "h1" ) {
			allHTMLBlocks[ i ].position = i;
			h1s.push( allHTMLBlocks[ i ] );
		}
	}

	return h1s;
};
