/*
 * The script collects all the lists of function words per language and returns this collection to a Researcher or a
 * stringProcessing script
 */

/*
Temporary disable:
import germanFunctionWordsFactory from "../researches/german/functionWords.js";
const germanFunctionWords = germanFunctionWordsFactory();
import englishFunctionWordsFactory from "../researches/english/functionWords.js";
const englishFunctionWords = englishFunctionWordsFactory();
import dutchFunctionWordsFactory from "../researches/dutch/functionWords.js";
const dutchFunctionWords = dutchFunctionWordsFactory();
import spanishFunctionWordsFactory from "../researches/spanish/functionWords.js";
const spanishFunctionWords = spanishFunctionWordsFactory();
import italianFunctionWordsFactory from "../researches/italian/functionWords.js";
const italianFunctionWords = italianFunctionWordsFactory();
import frenchFunctionWordsFactory from "../researches/french/functionWords.js";
const frenchFunctionWords = frenchFunctionWordsFactory();
import portugueseFunctionWordsFactory from "../researches/portuguese/functionWords.js";
const portugueseFunctionWords = portugueseFunctionWordsFactory();
import russianFunctionWordsFactory from "../researches/russian/functionWords.js";
const russianFunctionWords = russianFunctionWordsFactory();
import polishFunctionWordsFactory from "../researches/polish/functionWords.js";
const polishFunctionWords = polishFunctionWordsFactory();
import swedishFunctionWordsFactory from "../researches/swedish/functionWords.js";
const swedishFunctionWords = swedishFunctionWordsFactory();
*/

import { get } from "lodash-es";

import loadWordList from "../locale/loadWordList";


// Cached function words.
const functionWords = {};

/**
 * Returns the function words for all languages.
 *
 * @param {string} language The language code of the language to get the function words for.
 *
 * @returns {Object} Function words for all languages.
 */
export default function( language = "en" ) {
	const list = get( functionWords, language, { all: [] } );

	if ( list.all.length === 0 ) {
		// Lets not fix the async issue right now. Load the word list for the next time only.
		const fetchedList = loadWordList( "functionWords", language );
		if ( fetchedList !== null ) {
			functionWords[ language ] = fetchedList;
			return fetchedList;
		}
	}

	return list;
}

/* Was: function() {
	return {
		en: englishFunctionWords,
		de: germanFunctionWords,
		nl: dutchFunctionWords,
		fr: frenchFunctionWords,
		es: spanishFunctionWords,
		it: italianFunctionWords,
		pt: portugueseFunctionWords,
		ru: russianFunctionWords,
		pl: polishFunctionWords,
		sv: swedishFunctionWords,
	};
}*/
