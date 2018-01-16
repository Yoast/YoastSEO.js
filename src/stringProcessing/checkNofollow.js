/** @module stringProcessing/checkNofollow */

// We use an external library, which can be found here: https://github.com/fb55/htmlparser2.
const htmlparser = require( "parse5" );

/**
 * Retrieves the `rel` attribute from the list.
 *
 * @param object List of node attributes.
 * @return {string} The content of the rel attribute.
 */
function getRelAttribute( object ) {
	for ( let index in object ) {
		if ( object[ index ].name === "rel" ) {
			return object[ index ].value;
		}
	}

	return "";
}

/**
 * Checks if a links has a nofollow attribute value. If it has, returns Nofollow, otherwise Dofollow.
 *
 * @param {string} anchorHTML The anchor HTML to check against.
 * @returns {string} Returns Dofollow or Nofollow.
 */
module.exports = function( anchorHTML ) {
	let linkFollow = "Dofollow";

	const document = htmlparser.parseFragment( anchorHTML );

	if ( ! document.childNodes[ 0 ] || ! document.childNodes[ 0 ].attrs ) {
		return linkFollow;
	}

	if ( document.childNodes[ 0 ].nodeName !== "a" ) {
		return linkFollow;
	}

	const rel = getRelAttribute( document.childNodes[ 0 ].attrs );
	if ( rel.toLowerCase().split( /\s/ ).includes( "nofollow" ) ) {
		linkFollow = "Nofollow";
	}

	return linkFollow;
};
