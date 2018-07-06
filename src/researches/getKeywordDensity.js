/** @module analyses/getKeywordDensity */

const countWords = require( "../stringProcessing/countWords.js" );
const keyphraseLength = require( "./keyphraseLength.js" );
const keyphraseLengthFactor = require( "../helpers/keyphraseLengthFactor.js" );

/**
 * Calculates the keyword density.
 *
 * @param {object} paper The paper containing keyword and text.
 * @param {object} researcher The researcher.
 * @returns {number} The keyword density.
 */
module.exports = function( paper, researcher ) {
	const wordCount = countWords( paper.getText() );

	if ( wordCount === 0 ) {
		return 0;
	}

	const lengthKeyphrase = keyphraseLength( paper );
	const lengthKeyphraseFactor = keyphraseLengthFactor( lengthKeyphrase );
	const keywordCount = researcher.getResearch( "keywordCount" ).count;

	/*
	 * This formula consists of the basic keyword density formula
	 * (keywordCount / wordCount) * 100, with an added factor for
	 * keyphrase length.
	 */
	return ( keywordCount / wordCount ) * 100 * lengthKeyphraseFactor;
};
