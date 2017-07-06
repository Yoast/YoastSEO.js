let getWords = require( "../stringProcessing/getWords.js" );
let getSentences = require( "../stringProcessing/getSentences.js" );
let WordCombination = require( "../values/WordCombination.js" );
let normalizeQuotes = require( "../stringProcessing/quotes.js" ).normalize;
let germanFunctionWords = require( "../researches/german/functionWords.js" );
let englishFunctionWords = require( "../researches/english/functionWords.js" );
let dutchFunctionWords = require( "../researches/dutch/functionWords.js" );
let spanishFunctionWords = require( "../researches/spanish/functionWords.js" );
let italianFunctionWords = require( "../researches/italian/functionWords.js" );
let frenchFunctionWords = require( "../researches/french/functionWords.js" );
let countSyllables = require( "../stringProcessing/syllables/count.js" );
let getLanguage = require( "../helpers/getLanguage.js" );

let filter = require( "lodash/filter" );
let map = require( "lodash/map" );
let forEach = require( "lodash/forEach" );
let has = require( "lodash/has" );
let flatMap = require( "lodash/flatMap" );
let values = require( "lodash/values" );
let take = require( "lodash/take" );
let includes = require( "lodash/includes" );
let intersection = require( "lodash/intersection" );
let isEmpty = require( "lodash/isEmpty" );

let densityLowerLimit = 0;
let densityUpperLimit = 0.03;
let relevantWordLimit = 100;
let wordCountLowerLimit = 200;

// First four characters: en dash, em dash, hyphen-minus, and copyright sign.
let specialCharacters = [ "–", "—", "-", "\u00a9", "#", "%", "/", "\\", "$", "€", "£", "*", "•", "|", "→", "←", "}", "{", "//", "||" ];

/**
 * Returns the word combinations for the given text based on the combination size.
 *
 * @param {string} text The text to retrieve combinations for.
 * @param {number} combinationSize The size of the combinations to retrieve.
 * @param {Function} functionWords The function containing the lists of function words.
 * @returns {WordCombination[]} All word combinations for the given text.
 */
function getWordCombinations( text, combinationSize, functionWords ) {
	let sentences = getSentences( text );

	let words, combination;

	return flatMap( sentences, function( sentence ) {
		sentence = sentence.toLocaleLowerCase();
		sentence = normalizeQuotes( sentence );
		words = getWords( sentence );

		return filter( map( words, function( word, i ) {
			// If there are still enough words in the sentence to slice of.
			if ( i + combinationSize - 1 < words.length ) {
				combination = words.slice( i, i + combinationSize );
				return new WordCombination( combination, 0, functionWords );
			}

			return false;
		} ) );
	} );
}

/**
 * Calculates occurrences for a list of word combinations.
 *
 * @param {WordCombination[]} wordCombinations The word combinations to calculate occurrences for.
 * @returns {WordCombination[]} Word combinations with their respective occurrences.
 */
function calculateOccurrences( wordCombinations ) {
	let occurrences = {};

	forEach( wordCombinations, function( wordCombination ) {
		let combination = wordCombination.getCombination();

		if ( ! has( occurrences, combination ) ) {
			occurrences[ combination ] = wordCombination;
		}

		occurrences[ combination ].incrementOccurrences();
	} );

	return values( occurrences );
}

/**
 * Returns only the relevant combinations from a list of word combinations. Assumes
 * occurrences have already been calculated.
 *
 * @param {WordCombination[]} wordCombinations A list of word combinations.
 * @returns {WordCombination[]} Only relevant word combinations.
 */
function getRelevantCombinations( wordCombinations ) {
	wordCombinations = wordCombinations.filter( function( combination ) {
		return combination.getOccurrences() !== 1 &&
			combination.getRelevance() !== 0;
	} );
	return wordCombinations;
}

/**
 * Sorts combinations based on their relevance and length.
 *
 * @param {WordCombination[]} wordCombinations The combinations to sort.
 * @returns {void}
 */
function sortCombinations( wordCombinations ) {
	wordCombinations.sort( function( combinationA, combinationB ) {
		let difference = combinationB.getRelevance() - combinationA.getRelevance();
		// The combination with the highest relevance comes first.
		if ( difference !== 0 ) {
			return difference;
		}
		// In case of a tie on relevance, the longest combination comes first.
		return combinationB.getLength() - combinationA.getLength();
	} );
}

/**
 * Filters word combinations containing certain function words at any position.
 *
 * @param {WordCombination[]} wordCombinations The word combinations to filter.
 * @param {array} functionWords The list of function words.
 * @returns {WordCombination[]} Filtered word combinations.
 */
function filterFunctionWordsAnywhere( wordCombinations, functionWords ) {
	return wordCombinations.filter( function( combination ) {
		return isEmpty(
			intersection( functionWords, combination.getWords() )
		);
	} );
}

/**
 * Filters word combinations beginning with certain function words.
 *
 * @param {WordCombination[]} wordCombinations The word combinations to filter.
 * @param {array} functionWords The list of function words.
 * @returns {WordCombination[]} Filtered word combinations.
 */
function filterFunctionWordsAtBeginning( wordCombinations, functionWords ) {
	return wordCombinations.filter( function( combination ) {
		return ! includes( functionWords, combination.getWords()[ 0 ] );
	} );
}

/**
 * Filters word combinations ending with certain function words.
 *
 * @param {WordCombination[]} wordCombinations The word combinations to filter.
 * @param {array} functionWords The list of function words.
 * @returns {WordCombination[]} Filtered word combinations.
 */
function filterFunctionWordsAtEnding( wordCombinations, functionWords ) {
	return wordCombinations.filter( function( combination ) {
		let words = combination.getWords();
		let lastWordIndex = words.length - 1;
		return ! includes( functionWords, words[ lastWordIndex ] );
	} );
}

/**
 * Filters word combinations beginning and ending with certain function words.
 *
 * @param {WordCombination[]} wordCombinations The word combinations to filter.
 * @param {Array} functionWords The list of function words.
 * @returns {WordCombination[]} Filtered word combinations.
 */
function filterFunctionWords( wordCombinations, functionWords ) {
	wordCombinations = filterFunctionWordsAtBeginning( wordCombinations, functionWords );
	wordCombinations = filterFunctionWordsAtEnding( wordCombinations, functionWords );
	return wordCombinations;
}

/**
 * Filters word combinations with a length of one and a given syllable count.
 *
 * @param {WordCombination[]} wordCombinations The word combinations to filter.
 * @param {number} syllableCount The number of syllables to use for filtering.
 * @param {string} locale The paper's locale.
 * @returns {WordCombination[]} Filtered word combinations.
 */
function filterOnSyllableCount( wordCombinations, syllableCount, locale ) {
	return wordCombinations.filter( function( combination )  {
		return ! ( combination.getLength() === 1 && countSyllables( combination.getWords()[ 0 ], locale ) <= syllableCount );
	} );
}

/**
 * Filters word combinations based on keyword density if the word count is 200 or over.
 *
 * @param {WordCombination[]} wordCombinations The word combinations to filter.
 * @param {number} wordCount The number of words in the total text.
 * @param {number} densityLowerLimit The lower limit of keyword density.
 * @param {number} densityUpperLimit The upper limit of keyword density.
 * @returns {WordCombination[]} Filtered word combinations.
 */
function filterOnDensity( wordCombinations, wordCount, densityLowerLimit, densityUpperLimit ) {
	return wordCombinations.filter( function( combination ) {
		return ( combination.getDensity( wordCount ) >= densityLowerLimit && combination.getDensity( wordCount ) < densityUpperLimit
		);
	} );
}

/**
 * Filters combinations based on whether they start with a specified string or not.
 *
 * @param {WordCombination[]} wordCombinations The array of WordCombinations to filter.
 * @param {string} str The string the WordCombinations that need to be filtered out start with.
 * @param {string[]} exceptions The array of strings containing exceptions to not filter.
 * @returns {WordCombination[]} The filtered array of WordCombinations.
 */
function filterStartingWith( wordCombinations, str, exceptions ) {
	wordCombinations = wordCombinations.filter( function( combination ) {
		let combinationstr = combination.getCombination();
		for ( let i = 0; i < exceptions.length; i++ ) {
			if ( combinationstr.startsWith( exceptions[ i ] ) ) {
				return true;
			}
		}
		if ( combinationstr.startsWith( str ) ) {
			return false;
		}
		return true;
	} );
	return wordCombinations;
}

/**
 * Filters combinations based on whether they end with a specified string or not.
 *
 * @param {WordCombination[]} wordCombinations The array of WordCombinations to filter.
 * @param {string} str The string the WordCombinations that need to be filtered out end with.
 * @param {string[]} exceptions The array of strings containing exceptions to not filter.
 * @returns {WordCombination[]} The filtered array of WordCombinations.
 */
function filterEndingWith( wordCombinations, str, exceptions ) {
	wordCombinations = wordCombinations.filter( function( combination ) {
		let combinationstr = combination.getCombination();
		for ( let i = 0; i < exceptions.length; i++ ) {
			if ( combinationstr.endsWith( exceptions[ i ] ) ) {
				return true;
			}
		}
		if ( combinationstr.endsWith( str ) ) {
			return false;
		}
		return true;
	} );
	return wordCombinations;
}

/**
 * Filters the list of word combination objects.
 * Word combinations with specific parts of speech at the beginning and/or end, as well as one-syllable single words, are removed.
 *
 * @param {Array} combinations The list of word combination objects.
 * @param {Function} functionWords The function containing the lists of function words.
 * @param {string} locale The paper's locale.
 * @returns {Array} The filtered list of word combination objects.
 */
function filterCombinations( combinations, functionWords, locale ) {
	combinations = filterFunctionWordsAnywhere( combinations, specialCharacters );
	combinations = filterFunctionWords( combinations, functionWords().articles );
	combinations = filterFunctionWords( combinations, functionWords().personalPronouns );
	combinations = filterFunctionWords( combinations, functionWords().prepositions );
	combinations = filterFunctionWords( combinations, functionWords().conjunctions );
	combinations = filterFunctionWords( combinations, functionWords().quantifiers );
	combinations = filterFunctionWords( combinations, functionWords().demonstrativePronouns );
	combinations = filterFunctionWords( combinations, functionWords().transitionWords );
	combinations = filterFunctionWords( combinations, functionWords().interjections );
	combinations = filterFunctionWordsAtEnding( combinations, functionWords().relativePronouns );
	combinations = filterFunctionWords( combinations, functionWords().pronominalAdverbs );
	combinations = filterFunctionWordsAtEnding( combinations, functionWords().miscellaneous );
	combinations = filterOnSyllableCount( combinations, 1, locale );
	switch( getLanguage( locale ) ) {
		case "en":
			combinations = filterFunctionWordsAtBeginning( combinations, functionWords().passiveAuxiliaries );
			combinations = filterFunctionWordsAtBeginning( combinations, functionWords().reflexivePronouns );
			combinations = filterFunctionWordsAtEnding( combinations, functionWords().verbs );
			combinations = filterEndingWith( combinations, "'s", [] );
			break;
		case "es":
		case "it":
			combinations = filterFunctionWords( combinations, functionWords().verbs );
			combinations = filterFunctionWordsAtEnding( combinations, functionWords().infinitives );
			combinations = filterFunctionWordsAtEnding( combinations, functionWords().reflexivePronouns );
			break;
		case "fr":
			combinations = filterFunctionWordsAtEnding( combinations, functionWords().verbs );
			combinations = filterFunctionWordsAtEnding( combinations, functionWords().infinitives );
			combinations = filterFunctionWordsAtEnding( combinations, functionWords().reflexivePronouns );
			break;
		case "de":
		case "nl":
			combinations = filterFunctionWords( combinations, functionWords().verbs );
			combinations = filterFunctionWordsAtBeginning( combinations, functionWords().beginningVerbs );
			combinations = filterFunctionWordsAtEnding( combinations, functionWords().reflexivePronouns );
			combinations = filterFunctionWordsAtEnding( combinations, functionWords().interrogativeProAdverbs );
			break;
	}
	return combinations;
}
/**
 * Returns the relevant words in a given text.
 *
 * @param {string} text The text to retrieve the relevant words of.
 * @param {string} locale The paper's locale.
 * @returns {WordCombination[]} All relevant words sorted and filtered for this text.
 */
function getRelevantWords( text, locale ) {
	let functionWords;
	switch( getLanguage( locale ) ) {
		case "de":
			functionWords = germanFunctionWords;
			break;
		case "nl":
			functionWords = dutchFunctionWords;
			break;
		case "fr":
			functionWords = frenchFunctionWords;
			break;
		case "es":
			functionWords = spanishFunctionWords;
			break;
		case "it":
			functionWords = italianFunctionWords;
			break;
		default:
		case "en":
			functionWords = englishFunctionWords;
			break;
	}

	let words = getWordCombinations( text, 1, functionWords().all );
	let wordCount = words.length;

	let oneWordCombinations = getRelevantCombinations(
		calculateOccurrences( words )
	);

	sortCombinations( oneWordCombinations );
	oneWordCombinations = take( oneWordCombinations, 100 );

	let oneWordRelevanceMap = {};

	forEach( oneWordCombinations, function( combination ) {
		oneWordRelevanceMap[ combination.getCombination() ] = combination.getRelevance( functionWords );
	} );

	let twoWordCombinations = calculateOccurrences( getWordCombinations( text, 2, functionWords().all ) );
	let threeWordCombinations = calculateOccurrences( getWordCombinations( text, 3, functionWords().all ) );
	let fourWordCombinations = calculateOccurrences( getWordCombinations( text, 4, functionWords().all ) );
	let fiveWordCombinations = calculateOccurrences( getWordCombinations( text, 5, functionWords().all ) );

	let combinations = oneWordCombinations.concat(
		twoWordCombinations,
		threeWordCombinations,
		fourWordCombinations,
		fiveWordCombinations
	);

	combinations = filterCombinations( combinations, functionWords, locale );

	forEach( combinations, function( combination ) {
		combination.setRelevantWords( oneWordRelevanceMap );
	} );

	combinations = getRelevantCombinations( combinations, wordCount );
	sortCombinations( combinations );

	if ( wordCount >= wordCountLowerLimit ) {
		combinations = filterOnDensity( combinations, wordCount, densityLowerLimit, densityUpperLimit );
	}

	return take( combinations, relevantWordLimit );
}

module.exports = {
	getWordCombinations: getWordCombinations,
	getRelevantWords: getRelevantWords,
	calculateOccurrences: calculateOccurrences,
	getRelevantCombinations: getRelevantCombinations,
	sortCombinations: sortCombinations,
	filterFunctionWordsAtEnding: filterFunctionWordsAtEnding,
	filterFunctionWordsAtBeginning: filterFunctionWordsAtBeginning,
	filterFunctionWords: filterFunctionWords,
	filterFunctionWordsAnywhere: filterFunctionWordsAnywhere,
	filterOnSyllableCount: filterOnSyllableCount,
	filterOnDensity: filterOnDensity,
	filterStartingWith: filterStartingWith,
	filterEndingWith: filterEndingWith
};
