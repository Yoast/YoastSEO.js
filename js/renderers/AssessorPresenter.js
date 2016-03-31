/* jshint browser: true */

var forEach = require( "lodash/forEach" );
var isNumber = require( "lodash/isNumber" );
var isUndefined = require( "lodash/isUndefined" );
var difference = require( "lodash/difference" );
var template = require( "../templates.js" ).assessmentPresenterResult;

var presenterConfig = {
	feedback: {
		class: "na",
		screenReaderText: "Feedback"
	},
	bad: {
		class: "bad",
		screenReaderText: "Bad SEO score"
	},
	ok: {
		class: "ok",
		screenReaderText: "Ok SEO score"
	},
	good: {
		class: "good",
		screenReaderText: "Good SEO score"
	}
};

/**
 * Constructs the AssessorPresenter.
 *
 * @param {App} args
 * @param {object} args.targets
 * @param {string} args.targets.output
 * @param {string} args.targets.overall
 * @param {string} args.keyword
 * @param {Assessor} args.assessor
 * @param {Jed} args.i18n
 * @constructor
 */
var AssessorPresenter = function( args ) {
	this.keyword = args.keyword;
	this.assessor = args.assessor;
	this.i18n = args.i18n;
	this.output = args.targets.output;
	this.overall = args.targets.overall || "overallScore";
};

/**
 * Checks whether or not a specific property exists in the presenter configuration.
 * @param {string} property The property name to search for.
 * @returns {boolean} Whether or not the property exists.
 */
AssessorPresenter.prototype.configHasProperty = function( property ) {
	return presenterConfig.hasOwnProperty( property );
};

/**
 * Gets a fully formatted indicator object that can be used.
 * @param {string} rating The rating to use.
 * @returns {Object} An object containing the class and screen reader text.
 */
AssessorPresenter.prototype.getIndicator = function( rating ) {
	return {
		class: this.getIndicatorColorClass( rating ),
		screenReaderText: this.getIndicatorScreenReaderText( rating )
	};
};

/**
 * Gets the indicator color class from the presenter configuration, if it exists.
 * @param {string} rating The rating to check against the config.
 * @returns {string} String containing the CSS class to be used.
 */
AssessorPresenter.prototype.getIndicatorColorClass = function( rating ) {
	if ( !this.configHasProperty( rating ) ) {
		return "";
	}

	return presenterConfig[ rating ].class;
};

/**
 * Get the indicator screen reader text from the presenter configuration, if it exists.
 * @param {string} rating The rating to check against the config.
 * @returns {string} Translated string containing the screen reader text to be used.
 */
AssessorPresenter.prototype.getIndicatorScreenReaderText = function( rating ) {
	if ( !this.configHasProperty( rating ) ) {
		return "";
	}

	return this.i18n.dgettext( "js-text-analysis", presenterConfig[ rating ].screenReaderText );
};

/**
 * Adds a rating based on the numeric score.
 * @param {Object} result Object based on the Assessment result. Requires a score property to work.
 * @returns {Object} The Assessment result object with the rating added.
 */
AssessorPresenter.prototype.resultToRating = function( result ) {
	result.rating = "";

	if ( result.score === 0 ) {
		result.rating = "feedback";

		return result;
	}

	if ( result.score <= 4 ) {
		result.rating = "bad";

		return result;
	}

	if ( result.score > 4 && result.score <= 7 ) {
		result.rating = "ok";

		return result;
	}

	if ( result.score > 7 ) {
		result.rating = "good";

		return result;
	}

	return result;
};

/**
 *
 * @returns {{}}
 */
AssessorPresenter.prototype.getIndividualRatings = function() {
	var ratings = {};
	var validResults = this.sort( this.assessor.getValidResults() );
	var mappedResults = validResults.map( this.resultToRating );

	forEach( mappedResults, function( item, key ) {
		ratings[ key ] = this.addRating( item );
	}.bind( this ) );

	return ratings;
};

AssessorPresenter.prototype.sort = function ( results ) {
	var unsortables = this.getUndefinedScores( results );
	var sortables = difference( results, unsortables );

	sortables.sort( function( a, b ) {
		return a.score - b.score;
	} );

	return unsortables.concat( sortables );
};

AssessorPresenter.prototype.getUndefinedScores = function ( results ) {
	var undefinedScores = results.filter( function( result ) {
		return isUndefined( result.score ) || result.score === 0;
	} );

	return undefinedScores;
};

AssessorPresenter.prototype.addRating = function( item ) {
	var indicator = this.getIndicator( item.rating );
	indicator.text = item.text;

	return indicator;
};

AssessorPresenter.prototype.getOverallRating = function( overallScore ) {
	var rating = 0;

	if ( this.keyword === "" ) {
		return rating;
	}

	if ( isNumber( overallScore ) ) {
		rating = ( overallScore / 10 );
	}

	return rating;
};

AssessorPresenter.prototype.render = function() {
	this.renderIndividualRatings();
	this.renderOverallRating();
};

AssessorPresenter.prototype.renderIndividualRatings = function() {
	var outputTarget = document.getElementById( this.output );

	outputTarget.innerHTML = template( {
		scores: this.getIndividualRatings()
	} );
};

AssessorPresenter.prototype.renderOverallRating = function() {
	var overallScore = this.getOverallRating( this.assessor.calculateOverallScore() );
	var rating = this.resultToRating( { score: overallScore } );
	var overallRatingElement = document.getElementById( this.overall );

	if ( !overallRatingElement ) {
		return;
	}

	overallRatingElement.className = "overallScore " + this.getIndicatorColorClass( rating.rating );
};

module.exports = AssessorPresenter;
