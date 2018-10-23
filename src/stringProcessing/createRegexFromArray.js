/** @module stringProcessing/createRegexFromArray */

import addWordBoundary from "../stringProcessing/addWordboundary.js";

/**
 * Creates a regex of combined strings from the input array.
 *
 * @param {array} array The array with strings
 * @param {boolean} [disableWordBoundary] Boolean indicating whether or not to disable word boundaries
 * @returns {RegExp} regex The regex created from the array.
 */
export default function( array, disableWordBoundary = false ) {
	let regexString;

	regexString = array.join( "|" );

	if ( ! disableWordBoundary ) {
		regexString = addWordBoundary( "(" + regexString + ")", true );
	}

	return new RegExp( regexString, "ig" );
}
