var sentencesLength = require( "./../stringProcessing/sentencesLength.js" );

/**
 * Count sentences in the text.
 * @param {Paper} paper The Paper object to get text from.
 * @param {Researcher} researcher The researcher this research is a part of.
 * @returns {Array} The sentences from the text.
 */
module.exports = function( paper, researcher ) {
	const sentences = researcher.getResearch( "sentences" );

	return sentencesLength( sentences );
};
