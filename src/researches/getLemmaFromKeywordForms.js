/**
 * Compares the length between the two given strings.
 *
 * @param {string} string1 first string to compare.
 * @param {string} string2 second string to compare.
 * @returns {number} 1 iff string1 is longer than string2, -1 if it is the other way around, 0 iff string1 is as big as string2.
 */
const compareLength = function( string1, string2 ) {
	if ( string1.length > string2.length ) {
		return 1;
	}
	else if ( string1.length < string2.length ) {
		return -1;
	}
	return 0;
};

/**
 * Returns the lemma forms of the given keyphrase forms.
 * (Lemma is defined here as the shortest word form of a lexeme (list of known word forms) ).
 *
 * @param {array<string>[]} keyphraseForms the keyphrase list, where each entry is a list of keyword forms.
 * @returns {string[]} the lemma for each keyword in the keyphrase.
 */
const getLemmaForms = function( keyphraseForms ) {
	return keyphraseForms.map(
		keywordForms => {
			keywordForms.sort( compareLength );
			return keywordForms[ 0 ];
		}
	);
};

export default function( paper, researcher ) {
	const topicForms = researcher.getResearch( "morphology" );
	return getLemmaForms( topicForms.keyphraseForms );
}
