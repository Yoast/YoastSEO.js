import { flatten, isUndefined, uniq } from "lodash-es";
import { getRegexGroupMatches } from "./matchStringWithRegex";

/**
 * Checks the text for images and returns all their unique sources.
 *
 * Note: only supports " and ' as source attribute delimiters.
 *
 * @param {string} text The textstring to check for images.
 *
 * @returns {string[]} Array containing all sources of the found images.
 */
export default function( text ) {
	let imageSources = getRegexGroupMatches( text, "<img [^>]*src=(?:\"([^\"]*)\"|'([^']*)')[^>]*[/]?>" );
	// We have two groups, one for " and one for ', only one of them is filled, the other will be undefined.
	imageSources = flatten( imageSources ).filter( match => ! isUndefined( match ) );
	// Remove all empty sources.
	imageSources = imageSources.filter( match => match.trim().length > 0 );
	return uniq( imageSources );
}
