/** @module researches/countKeywordInUrl */

import { findTopicFormsInString } from "./findKeywordFormsInString.js";

/**
 * Trims the modifier from compound words and makes it a separate keyphrase entry.
 * E.g., for a keyphrase "modern pop-art" the current version of the morphological research generates forms
 * [ [ modern, moderner, ...], [ pop-art, pop-arts, ...] ]. This is problematic for the research that searches for
 * keyphrase in slug, because it treats compound words as 2 words. I.e., the research is looking for forms `pop` and `art`.
 * This function takes the default-generated morphological forms and splits the compound words into two, such that
 * the forms that serve input to the keyphraseCountInUrl researcher are
 * [ [ modern, moderner, ...], [ pop ], [ art, arts, ...] ].
 *
 * @param {Array} topicForms The keyphraseForms and synonymsForms of the paper.
 *
 * @returns {Array} topicForms with split compounds.
 */
function dehyphenateKeyphraseForms( topicForms ) {
	const dehyphenatedKeyphraseForms = [];

	topicForms.keyphraseForms.forEach( function( lemma ) {
		const firstWord = lemma[ 0 ];

		if ( firstWord.indexOf( "-" ) === -1 ) {
			dehyphenatedKeyphraseForms.push( lemma );
			return;
		}

		const unchangedPart = firstWord.split( "-" )[ 0 ];

		dehyphenatedKeyphraseForms.push( [ unchangedPart ] );

		const dehyphenatedLemma = [];
		lemma.forEach( function( wordInLemma ) {
			if ( wordInLemma.indexOf( unchangedPart ) === 0 ) {
				const trimmedWordInLemma = wordInLemma.slice( unchangedPart.length + 1, wordInLemma.length );
				dehyphenatedLemma.push( trimmedWordInLemma );
			}
		} );

		dehyphenatedKeyphraseForms.push( dehyphenatedLemma );
	} );

	topicForms.keyphraseForms = dehyphenatedKeyphraseForms;

	return topicForms;
}


/**
 * Matches the keyword in the URL. Replaces dashes and underscores with whitespaces and uses whitespace as wordboundary.
 *
 * @param {Paper} paper the Paper object to use in this count.
 * @param {Researcher} researcher The Researcher object containing all available researches.
 *
 * @returns {int} Number of times the keyword is found.
 */
export default function( paper, researcher ) {
	const topicForms = dehyphenateKeyphraseForms( researcher.getResearch( "morphology" ) );
	const slug = paper.getUrl().replace( /[-_]/ig, " " );

	const keyphraseInSlug = findTopicFormsInString( topicForms, slug, false, paper.getLocale() );

	return {
		keyphraseLength: topicForms.keyphraseForms.length,
		percentWordMatches: keyphraseInSlug.percentWordMatches,
	};
}
