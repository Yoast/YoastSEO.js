/** @module stringProcessing/createRegexFromDoubleArray */

import addWordBoundary from "../stringProcessing/addWordboundary.js";
import { forEach } from "lodash-es";

/**
 * Creates a regex of combined strings from the input array, containing arrays with two entries.
 * @param {array} array The array containing arrays.
 * @returns {RegExp} The regex created from the array.
 */
export default function( array ) {
	const first = [];
	const second = [];
	forEach( array, ( [ a, b ] ) => {
		first.push( a );
		second.push( b );
	} );
	const regexString = addWordBoundary( "(" + first.join( "|" ) + ")" ) +
		".*?" + addWordBoundary( "(" + second.join( "|" ) + ")" );
	return new RegExp( regexString, "ig" );
}
