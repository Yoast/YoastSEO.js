var Participle = require( "../../values/Participle.js" );

var nonVerbsEndingEd = require( "./passivevoice/non-verb-ending-ed.js" )();
var getWordIndices = require( "./passivevoice/getIndicesWithRegex.js" );
var arrayToRegex = require( "../../stringProcessing/createRegexFromArray.js" );
var cannotDirectlyPrecedePassiveParticiple = require( "./functionWords.js" )().cannotDirectlyPrecedePassiveParticiple;

var forEach = require( "lodash/forEach" );
var includes = require( "lodash/includes" );
var isEmpty = require( "lodash/isEmpty" );
var intersection = require( "lodash/intersection" );

var directPrecedenceExceptionRegex = arrayToRegex( cannotDirectlyPrecedePassiveParticiple );
var irregularExclusionArray = [ "get", "gets", "getting", "got", "gotten" ];

/**
 * Checks whether a participle is directly preceded by a given word.
 *
 * @param {Array} precedingWords The array of objects with matches and indices.
 * @param {number} participleIndex The index of the participle.
 *
 * @returns {boolean} Returns true if the participle is preceded by a given word, otherwise returns false.
 */
var includesIndex = function( precedingWords, participleIndex ) {
	if ( isEmpty( precedingWords ) ) {
		return false;
	}

	var precedingWordsEndIndices = [];
	forEach( precedingWords, function( precedingWord ) {
		// + 1 because the end word boundary is not included in the match.
		var precedingWordsEndIndex = precedingWord.index + precedingWord.match.length + 1;
		precedingWordsEndIndices.push( precedingWordsEndIndex );
	} );

	return includes( precedingWordsEndIndices, participleIndex );
};

/**
 * Creates an Participle object for the English language.
 *
 * @param {string} participle The participle.
 * @param {string} sentencePart The sentence part that contains the participle.
 * @param {object} attributes  The attributes object.
 *
 * @constructor
 */
var EnglishParticiple = function( participle, sentencePart, attributes ) {
	Participle.call( this, participle, sentencePart, attributes );
	this.checkException();
};

require( "util" ).inherits( EnglishParticiple, Participle );

/**
 * Sets sentence part passiveness to passive if there is no exception.
 *
 * @returns {void}
 */
EnglishParticiple.prototype.checkException = function() {
	if ( isEmpty( this.getParticiple() ) ) {
		this.setSentencePartPassiveness( false );
		return;
	}

	this.setSentencePartPassiveness( this.isPassive() );
};

/**
 * Checks if any exceptions are applicable to this participle that would result in the sentence part not being passive.
 * If no exceptions are found, the sentence part is passive.
 *
 * @returns {boolean} Returns true if no exception is found.
 */
EnglishParticiple.prototype.isPassive = function() {
	return 	! this.isNonVerbEndingEd() &&
				! this.hasRidException() &&
				! this.directPrecedenceException();
};

/**
 * Checks whether a found participle is in the nonVerbsEndingEd list.
 * If a word is in the nonVerbsEndingEd list, it isn't a participle.
 * Irregular participles do not end in -ed, and therefore cannot be in the nonVerbsEndingEd list.
 *
 * @returns {boolean} Returns true if it is in the nonVerbsEndingEd list, otherwise returns false.
 */
EnglishParticiple.prototype.isNonVerbEndingEd = function() {
	if ( this.getType() === "irregular" ) {
		return false;
	}
	return includes( nonVerbsEndingEd, this.getParticiple() );
};

/**
 * Checks whether the participle is 'rid' in combination with 'get', 'gets', 'getting', 'got' or 'gotten'.
 * If this is true, the participle is not passive.
 *
 * @returns {boolean} Returns true if 'rid' is found in combination with a form of 'get'
 * otherwise returns false.
 */
EnglishParticiple.prototype.hasRidException = function() {
	if ( this.getParticiple() === "rid" ) {
		var auxiliaries = this.getAuxiliaries();
		return ! isEmpty( intersection( irregularExclusionArray, auxiliaries ) );
	}
	return false;
};

/**
 * Checks whether the participle is directly preceded by a word from the direct precedence exception list.
 * If this is the case, the sentence part is not passive.
 *
 * @returns {boolean} Returns true if a word from the direct precedence exception list is directly preceding
 * the participle, otherwise returns false.
 */
EnglishParticiple.prototype.directPrecedenceException = function() {
	var sentencePart = this.getSentencePart();
	var participleIndex = sentencePart.indexOf( this.getParticiple() );
	var exceptionMatch = getWordIndices( sentencePart, directPrecedenceExceptionRegex );
	return includesIndex( exceptionMatch, participleIndex );
};

module.exports = EnglishParticiple;
