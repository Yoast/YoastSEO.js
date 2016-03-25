var filter = require( "lodash/filter" );
var isEmpty = require( "lodash/isEmpty" );
var isUndefined = require( "lodash/isUndefined" );
var inRange = require( "lodash/inRange" );
var escapeHTML = require( "lodash/escape" );
var forEach = require( "lodash/forEach" );

var AssessmentResult = require( "../values/AssessmentResult" );

/**
 * Scores an analysis based on the value and a score array
 *
 * @param {*} analysisResult
 * @param {Array} scoreArray
 * @returns {Object}
 */
function scoreAnalysis( analysisResult, scoreArray ) {
	var matchedScores = filter( scoreArray, function( scoreMatcher ) {

		if ( isUndefined( scoreMatcher.min ) && analysisResult < scoreMatcher.max ) {
			return true;
		}

		if ( isUndefined( scoreMatcher.max ) && analysisResult > scoreMatcher.min ) {
			return true;
		}

		return inRange( analysisResult, scoreMatcher.min, ( scoreMatcher.max + 1 ) );
	} );

	if ( 0 !== matchedScores.length ) {
		return matchedScores[0];
	}

	return {};
}

/**
 * Replaces placeholders inside a matched score based on a replace array
 *
 * @param {string} text
 * @param {Array} replaceArray
 */
function replacePlaceholders( text, replaceArray ) {
	text = escapeHTML( text );

	forEach( replaceArray, function( replacement ) {
		var replacementText;

		if ( ! isUndefined( replacement.value ) ) {
			replacementText = replacement.value;
		}

		if ( ! isEmpty( replacementText ) ) {
			text.replace( replacement.position, replacementText );
		}
	} );
}

/**
 * Turns a scoring array into an assessment. Only used for backwards compatibility
 *
 * @param {Function} analysis A function that generates an analysis that can be used by the score array to score the
 * text.
 * @param {Object} scoreMatcher
 */
function assessify( analysis, scoreMatcher ) {
	return function() {
		var assessmentResult = new AssessmentResult();

		var analysisResult = analysis();

		var matchedScore = scoreAnalysis( analysisResult, scoreMatcher.scoreArray );

		if ( ! isEmpty( matchedScore ) ) {
			var text = matchedScore.text;

			if ( ! isUndefined( scoreMatcher.replaceArray ) ) {
				( replacePlaceholders( text, scoreMatcher.replaceArray ) );
			}

			assessmentResult.setScore( matchedScore.score );
			assessmentResult.setText( text );
		}

		return assessmentResult;
	};
}

module.exports = assessify;
