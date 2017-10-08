var createRegexFromDoubleArray = require( "../stringProcessing/createRegexFromDoubleArray.js" );
var getSentences = require( "../stringProcessing/getSentences.js" );
var normalizeSingleQuotes = require( "../stringProcessing/quotes.js" ).normalizeSingle;
var getTransitionWords = require( "../helpers/getTransitionWords.js" );
var addWordBoundary = require( "../stringProcessing/addWordboundary.js" );
var memoize = require( "lodash/memoize" );

var createRegexFromDoubleArrayCached = memoize( createRegexFromDoubleArray );
/**
 * Matches the sentence against two part transition words.
 *
 * @param {string} sentence The sentence to match against.
 * @param {Array} twoPartTransitionWords The array containing two-part transition words.
 * @returns {Array} The found transitional words.
 */
var matchTwoPartTransitionWords = function( sentence, twoPartTransitionWords ) {
	sentence = normalizeSingleQuotes( sentence );
	var twoPartTransitionWordsRegex = createRegexFromDoubleArrayCached( twoPartTransitionWords );
	// Console.log( twoPartTransitionWordsRegex );
	return sentence.match( twoPartTransitionWordsRegex );

	// Var matchedTransitionWords = [];
	//
	// For( var i = 0; i < twoPartTransitionWords.length; i++ ) {
	// 	If( includes( sentence, twoPartTransitionWords[ i ][ 0 ] ) ) {
	// 	    If( includes( sentence, twoPartTransitionWords[ i ][ 1 ] ) ) {
	// 		Var transitionWords = [];
	// 		TransitionWords.push( twoPartTransitionWords[ i ][ 0 ] );
	// 		TransitionWords.push( twoPartTransitionWords[ i ][ 1 ] );
	// 		MatchedTransitionWords.push( [ sentence, transitionWords ] );
	// 	}
	// 	}
	// 	Return;
	// }
	// Return matchedTransitionWords;
};

/**
 * Matches the sentence against transition words.
 *
 * @param {string} sentence The sentence to match against.
 * @param {Array} transitionWords The array containing transition words.
 * @returns {Array} The found transitional words.
 */
var matchTransitionWords = function( sentence, transitionWords ) {
	var normalizedSentence = normalizeSingleQuotes( sentence );
	var matchedTransitionWords = [];


	for( var i = 0; i < transitionWords.length; i++ ) {
		if( transitionWords[ i ].regex.test( normalizedSentence ) ) {
			matchedTransitionWords.push( transitionWords[ i ].word );
		}
	}

	if ( matchedTransitionWords.length > 0 ) {
		return [ sentence, matchedTransitionWords ];
	}
	return [];
};


/**
 * Checks the passed sentences to see if they contain transition words.
 *
 * @param {Array} sentences The sentences to match against.
 * @param {Object} transitionWords The object containing both transition words and two part transition words.
 * @returns {Array} Array of sentence objects containing the complete sentence and the transition words.
 */
var checkSentencesForTransitionWords = function( sentences, transitionWords ) {
	var results = [];

	var singleTransitionWords = [];
	for( var i = 0; i < transitionWords.transitionWords.length; i++ ) {
		var reg = new RegExp( addWordBoundary( transitionWords.transitionWords[ i ] ), "i" );
		singleTransitionWords.push( { regex: reg, word: transitionWords.transitionWords[ i ] } );
	}

	// forEach( sentences, function( sentence ) {
	for( let i = 0; i < sentences.length; i++ ) {
		var twoPartMatches = matchTwoPartTransitionWords( sentences[ i ], transitionWords.twoPartTransitionWords() );

		if ( twoPartMatches !== null ) {
			results.push( {
				sentence: sentences[ i ],
				transitionWords: twoPartMatches,
			} );

			continue;
		}

		var transitionWordMatches = matchTransitionWords( sentences[ i ], singleTransitionWords );

		if ( transitionWordMatches.length > 0 ) {
			results.push( {
				sentence: transitionWordMatches[ 0 ],
				transitionWords: transitionWordMatches[ 1 ],
			} );
		}
	}

	return results;
};

/**
 * Checks how many sentences from a text contain at least one transition word or two-part transition word
 * that are defined in the transition words config and two part transition words config.
 *
 * @param {Paper} paper The Paper object to get text from.
 * @returns {object} An object with the total number of sentences in the text
 * and the total number of sentences containing one or more transition words.
 */
module.exports = function( paper ) {
	var locale = paper.getLocale();
	var transitionWords = getTransitionWords( locale );
	var sentences = getSentences( paper.getText() );
	var sentenceResults = checkSentencesForTransitionWords( sentences, transitionWords );

	return {
		totalSentences: sentences.length,
		sentenceResults: sentenceResults,
		transitionWordSentences: sentenceResults.length,
	};
};
