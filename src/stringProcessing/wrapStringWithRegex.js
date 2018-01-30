/** @module stringProcessing/wrapStringWithRegex */

/**
 * Replaces all occurrences in a string and wraps them.
 *
 * @param {string} text        The text to look through.
 * @param {string} search      A string to use as regex.
 * @param {string} wrapPrefix  Insert this before the found text.
 * @param {string} wrapSuffix  Insert this after the found text.
 *
 * @returns {string} The text with all the found strings wrapped.
 */
module.exports = function( text, search, wrapPrefix = "", wrapSuffix = "" ) {
	let leftover = text;
	let regex = new RegExp( search, "ig" );
	let result = "";
	let index;

	while ( ( index = leftover.search( regex ) ) !== -1 ) {
		let original = leftover.substr( index, search.length );
		result += leftover.substr( 0, index ) + wrapPrefix + original + wrapSuffix;
		leftover = leftover.substr( index + search.length );
	}

	return result + leftover;
};
