const countWords = require( "../stringProcessing/countWords.js" );
const keyphraseLength = require( "../researches/keyphraseLength" );

/**
 * Calculates a recommended keyword count for a text.
 * The formula to calculate this number is based on the
 * keyword density formula.
 *
 * @param {object} paper The paper containing keyword and text.
 * @param {number} maxKeywordDensity The maximum recommended keyword density.
 * @param {string} maxOrMin Whether it's a maximum or minimum recommended keyword density.
 *
 * @returns {number} The recommended keyword count.
 */
module.exports = function( paper, maxKeywordDensity, maxOrMin ) {
	const wordCount = countWords( paper.getText() );
	const lengthKeyphrase = keyphraseLength( paper );

	let recommendedKeywordCount = ( maxKeywordDensity * wordCount ) / ( 100 * ( 0.7 + lengthKeyphrase / 3 ) );

	if ( wordCount === 0 ) {
		return 0;
	}

	/*
	 * Make sure that the recommended keyword count is always at least 2,
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
