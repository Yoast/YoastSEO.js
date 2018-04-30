let AssessmentResult = require( "../../values/AssessmentResult.js" );
let Assessment = require( "../../assessment.js" );
let merge = require( "lodash/merge" );
let map = require( "lodash/map" );
let Mark = require( "../../values/Mark.js" );
let marker = require( "../../markers/addMark.js" );

/**
 * Assessment to check whether the body of the text contains H1s in the body (except at the very beginning,
 * where they are acceptable).
 */
class singleH1Assessment extends Assessment {
	/**
	 * Sets the identifier and the config.
	 *
	 * @param {object} config The configuration to use.
	 *
	 * @returns {void}
	 */
	constructor( config = {} ) {
		super();

		let defaultConfig = {
			scores: {
				textContainsH1: 1,
			},
		};

		this.identifier = "singleH1Assessment";
		this._config = merge( defaultConfig, config );
	}

	/**
	 * Runs the h1 research and based on this returns an assessment result with a score.
	 *
	 * @param {Paper} paper The paper to use for the assessment.
	 * @param {Researcher} researcher The researcher used for calling the research.
	 * @param {Object} i18n The object used for translations
	 *
	 * @returns {AssessmentResult} The assessment result.
	 */
	getResult( paper, researcher, i18n ) {
		this._h1s = researcher.getResearch( "h1s" );

		let assessmentResult = new AssessmentResult();

		// Returns the default assessment result if there are no H1s in the body.
		if ( this._h1s.length === 0 ) {
			return assessmentResult;
		}

		/*
		 * Removes the first H1 from the array if that H1 is in the first position of the body.
		 * The very beginning of the body is the only position where an H1 is deemed acceptable.
		 */
		if ( this.firstH1AtBeginning() ) {
			this._h1s.shift();
		}

		assessmentResult.setScore( this.calculateScore() );
		assessmentResult.setText( this.translateScore( i18n ) );
		assessmentResult.setHasMarks( ( this.calculateScore() < 2 ) );

		return assessmentResult;
	}

	/**
	 * Checks whether an H1 is in the first position of the body.
	 *
	 * @returns {boolean} Returns true if there is an H1 in the first position of the body.
	 */
	firstH1AtBeginning() {
		return ( this._h1s[ 0 ].position === 0 );
	}

	/**
	 * Checks whether there is a single H1 in the body.
	 *
	 * @returns {boolean} Returns true if there is exactly one H1 in the body.
	 */
	bodyContainsOneH1() {
		return ( this._h1s.length === 1 );
	}

	/**
	 * Checks whether there are multiple H1s in the body.
	 *
	 * @returns {boolean} Returns true if the number of H1s in the body exceeds 1.
	 */
	bodyContainsMultipleH1s() {
		return ( this._h1s.length > 1 );
	}

	/**
	 * Returns the score for the single H1 assessment.
	 *
	 * @returns {number} The calculated score.
	 */
	calculateScore() {
		if ( this.bodyContainsOneH1() || this.bodyContainsMultipleH1s() ) {
			return this._config.scores.textContainsH1;
		}
	}

	/**
	 * Translates the score of the single H1 assessment to a message the user can understand.
	 *
	 * @param {object} i18n The object used for translations.
	 *
	 * @returns {string} The translated string.
	 */
	translateScore( i18n ) {
		if ( this.bodyContainsOneH1() ) {
			return i18n.dgettext( "js-text-analysis", "The body of your text contains an H1. " +
				"Change it to the appropriate heading level."
			);
		}


		if ( this.bodyContainsMultipleH1s() ) {
			return i18n.dgettext( "js-text-analysis", "The body of your text contains multiple H1s. " +
				"Change them to the appropriate heading level."
			);
		}
	}

	/**
	 * Marks all H1s in the body of the text (except at the very beginning,
	 * where they are acceptable and don't need to be changed).
	 *
	 * @returns {Array} Array with all the marked H1s.
	 */
	getMarks() {
		let h1s = this._h1s;

		return map( h1s, function( h1 ) {
			let marked = "<h1>" + marker( h1.content ) + "</h1>";
			return new Mark( {
				original: "<h1>" + h1.content + "</h1>",
				marked: marked,
			} );
		} );
	}

	/**
	 * Checks whether the paper has a text.
	 *
	 * @param {Paper} paper The paper to use for the assessment.
	 *
	 * @returns {boolean} True when there is text.
	 */
	isApplicable( paper ) {
		return paper.hasText();
	}
}

module.exports = singleH1Assessment;
