// Replace all other punctuation characters at the beginning or at the end of a word.
/* eslint-disable no-useless-escape */
const punctuationRegexString = "[\\–\\-\\(\\)_\\[\\]’'.?!:;,¿¡«»‹›\u2014\u00d7\u002b\u0026\<\>]+";
/* eslint-enable no-useless-escape */
const punctuationRegexStart = new RegExp( "^" + punctuationRegexString );
const punctuationRegexEnd = new RegExp( punctuationRegexString + "$" );

/**
 * Replaces punctuation characters at the beginning and end of a given text string.
 *
 * @param {String} text The text to remove the punctuation characters for.
 *
 * @returns {String} The sanitized text.
 */
export default function( text ) {
	text = text.replace( punctuationRegexStart, "" );
	text = text.replace( punctuationRegexEnd, "" );

	return text;
}
