/**
 * Checks a string with a regex, return all matches found with that regex.
 *
 * @param {string} text The text to match.
 * @param {string} regexString A string to use as regex.
 * @returns {string[]} Array with matches, empty array if no matches found.
 */
export default function( text, regexString ) {
	var regex = new RegExp( regexString, "ig" );
	var matches = text.match( regex );

	if ( matches === null ) {
		matches = [];
	}

	return matches;
}

/**
 * Matches the regex with the text and returns for each match the captured groups.
 *
 * @param {string} text The text to match.
 * @param {string} regexString The string to be transformed into a regex.
 *
 * @returns {array<string[]>} The array with matches.
 */
export function getRegexGroupMatches( text, regexString ) {
	const regex = new RegExp( regexString, "ig" );
	const matches = [];
	let match;

	while ( ( match = regex.exec( text ) ) !== null ) {
		matches.push( match.slice( 1 ) );
	}
	return matches;
}
