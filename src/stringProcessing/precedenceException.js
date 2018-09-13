import getWordIndices from "../researches/passiveVoice/periphrastic/getIndicesWithRegex.js";
import precedesIndex from "./precedesIndex";
import arrayToRegex from "./createRegexFromArray.js";

import cannotBeBetweenAuxiliaryAndParticipleFrenchFactory from "../researches/french/functionWords.js";
const cannotBeBetweenAuxiliaryAndParticipleFrench =
	cannotBeBetweenAuxiliaryAndParticipleFrenchFactory().cannotBeBetweenPassiveAuxiliaryAndParticiple;
import cannotBeBetweenAuxiliaryAndParticipleEnglishFactory from "../researches/english/functionWords.js";
const cannotBeBetweenAuxiliaryAndParticipleEnglish =
	cannotBeBetweenAuxiliaryAndParticipleEnglishFactory().cannotBeBetweenPassiveAuxiliaryAndParticiple;
import cannotBeBetweenAuxiliaryAndParticipleSpanishFactory from "../researches/spanish/functionWords.js";
const cannotBeBetweenAuxiliaryAndParticipleSpanish =
	cannotBeBetweenAuxiliaryAndParticipleSpanishFactory().cannotBeBetweenPassiveAuxiliaryAndParticiple;
import cannotBeBetweenAuxiliaryAndParticipleItalianFactory from "../researches/italian/functionWords.js";
const cannotBeBetweenAuxiliaryAndParticipleItalian =
	cannotBeBetweenAuxiliaryAndParticipleItalianFactory().cannotBeBetweenPassiveAuxiliaryAndParticiple;

/**
 * Checks whether a word from the precedence exception list occurs anywhere in the sentence part before the participle.
 * If this is the case, the sentence part is not passive.
 *
 * @param {string} sentencePart The sentence part that contains the participle.
 * @param {number} participleIndex The index of the participle.
 * @param {string} language The language of the participle.
 *
 * @returns {boolean} Returns true if a word from the precedence exception list occurs anywhere in the
 * sentence part before the participle, otherwise returns false.
 */
export default function( sentencePart, participleIndex, language ) {
	let precedenceExceptionRegex;
	switch ( language ) {
		case "fr":
			precedenceExceptionRegex = arrayToRegex( cannotBeBetweenAuxiliaryAndParticipleFrench );
			break;
		case "es":
			precedenceExceptionRegex = arrayToRegex( cannotBeBetweenAuxiliaryAndParticipleSpanish );
			break;
		case "it":
			precedenceExceptionRegex = arrayToRegex( cannotBeBetweenAuxiliaryAndParticipleItalian );
			break;
		case "en":
		default:
			precedenceExceptionRegex = arrayToRegex( cannotBeBetweenAuxiliaryAndParticipleEnglish );
			break;
	}

	const precedenceExceptionMatch = getWordIndices( sentencePart, precedenceExceptionRegex );
	return precedesIndex( precedenceExceptionMatch, participleIndex );
}
