/** @module analyses/getKeywordDensity */

const countWords = require( "../stringProcessing/countWords.js" );
const keyphraseLength = require( "./keyphraseLength" );

/**
 * Calculates the keyword density.
 *
 * @param {object} paper The paper containing keyword and text.
 * @param {object} researcher The researcher.
 * @returns {number} The keyword density.
 */
module.exports = function( paper, researcher ) {
	const wordCount = countWords( paper.getText() );
	const lengthKeyphrase = keyphraseLength( paper );

	if ( wordCount === 0 ) {
		return 0;
	}
	const keywordCount = researcher.getResearch( "keywordCount" );

	/*
	 * This formula consists of the basic keyword density formula
	 * (keywordCount / wordCount) * 100, with an added factor for
	 * keyphrase length. Keyphrase length gets a base weight of 0.7, plus a
	 * specific weight for the keyphrase length (lengthKeyphrase / 3).
	 */
	return ( keywordCount / wordCount ) * 100 * ( 0.7 + lengthKeyphrase / 3 );
};
