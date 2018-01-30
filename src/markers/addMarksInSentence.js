const forEach = require( "lodash/forEach" );

const wrapStringWithRegex = require( "../stringProcessing/wrapStringWithRegex" );
const Mark = require( "../values/Mark" );

/**
 * Marks multiple strings within a sentence with HTML tags
 *
 * @param {string}        sentence The unmarked text.
 * @param {Array<string>} marks    Text to search for and mark.
 *
 * @returns {Mark} A new mark containing the original sentence and one marked with HTML tags.
 */
module.exports = function( sentence, marks ) {
	let markedSentence = sentence;

	forEach( marks, function( mark ) {
		markedSentence = wrapStringWithRegex( markedSentence, mark, "<yoastmark class='yoast-text-mark'>", "</yoastmark>" );
	} );

	return new Mark( {
		original: sentence,
		marked: markedSentence,
	} );
};
