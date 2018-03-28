const countWords = require( "../stringProcessing/countWords.js" );
const keyphraseLength = require( "../researches/keyphraseLength" );
const keyphraseLengthFactor = require( "../helpers/keyphraseLengthFactor.js" );

/**
 * Calculates a recommended keyword count for a text. The formula to calculate this number is based on the
 * keyword density formula.
 *
 * @param {object} paper The paper containing keyword and text.
 * @param {number} recommendedKeywordDensity The recommended keyword density (either maximum or minimum).
 * @param {string} maxOrMin Whether it's a maximum or minimum recommended keyword density.
 *
 * @returns {number} The recommended keyword count.
 */
module.exports = function( paper, recommendedKeywordDensity, maxOrMin ) {
	const wordCount = countWords( paper.getText() );

	if ( wordCount === 0 ) {
		return 0;
	}

	const lengthKeyphrase = keyphraseLength( paper );
	const lengthKeyphraseFactor = keyphraseLengthFactor( lengthKeyphrase );
	let recommendedKeywordCount = ( recommendedKeywordDensity * wordCount ) / ( 100 * lengthKeyphraseFactor );

	/*
	 * The recommended keyword count should always be at least 2,
	 * regardless of the keyword density, the word count, or the keyphrase length.
	 */
	if ( recommendedKeywordCount < 2 ) {
		return 2;
	}

	switch( maxOrMin ) {
		case "min":
			// Round up for the recommended minimum count.
			return Math.ceil( recommendedKeywordCount );
		default:
		case "max":
			// Round down for the recommended maximum count.
			return Math.floor( recommendedKeywordCount );
	}
};
