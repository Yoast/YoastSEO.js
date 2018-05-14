const Assessment = require( "../../assessment.js" );
const AssessmentResult = require( "../../values/AssessmentResult.js" );

const Mark = require( "../../values/Mark.js" );
const addMark = require( "../../markers/addMark.js" );

const map = require( "lodash/map" );
const merge = require( "lodash/merge" );
const isUndefined = require( "lodash/isUndefined" );

/**
 * Assessment to check whether the keyphrase is encountered in the first paragraph of the article.
 */
class TextCompetingLinksAssessment extends Assessment {
	/**
	 * Sets the identifier and the config.
	 *
	 * @param {Object} config The configuration to use.
	 *
	 * @returns {void}
	 */
	constructor( config = {} ) {
		super();

		let defaultConfig = {
			parameters: {
				recommendedMaximum: 0,
			},
			bad: {
				score: 2,
				resultText: "You're linking to another page with the focus keyword you want this page to rank for. " +
				"Consider changing that if you truly want this page to rank.",
			},
		};

		this.identifier = "textCompetingLinks";
		this._config = merge( defaultConfig, config );
	}

	/**
	 * Runs the linkCount module, based on this returns an assessment result with score.
	 *
	 * @param {object} paper The paper to use for the assessment.
	 * @param {object} researcher The researcher used for calling research.
	 * @param {object} i18n The object used for translations
	 * @returns {object} the AssessmentResult
	 */
	getResult( paper, researcher, i18n ) {
		let assessmentResult = new AssessmentResult();

		this.linkCount = researcher.getResearch( "getLinkStatistics" );

		const calculatedResult = this.calculateResult();
		if ( isUndefined( calculatedResult ) ) {
			return assessmentResult;
		}

		assessmentResult.setScore( calculatedResult.score );
		assessmentResult.setText( this.translateScore( calculatedResult.resultText, i18n ) );
		assessmentResult.setHasMarks( true );
		assessmentResult.setMarker( this.getMarks() );

		return assessmentResult;
	}

	/**
	 * Determines if the assessment is applicable to the paper.
	 *
	 * @param {Paper} paper The paper to check
	 *
	 * @returns {boolean} Whether the paper has text and a keyword
	 */
	isApplicable( paper ) {
		return paper.hasText() && paper.hasKeyword();
	}

	/**
	 * Returns a result based on the number of links.
	 *
	 * @returns {object} resultObject with score and text
	 */
	calculateResult() {
		if ( this.linkCount.keyword.totalKeyword > this._config.parameters.recommendedMaximum ) {
			return this._config.bad;
		}
	}

	/**
	 * Translates the score into a specific feedback to the user.
	 *
	 * @param {string} resultText The text string from the config to be returned for this number of occurrences of keyphrase
	 * in the first paragraph.
	 * @param {Object} i18n The i18n-object used for parsing translations.
	 *
	 * @returns {string} Text feedback.
	 */
	translateScore( resultText, i18n ) {
		return i18n.sprintf( i18n.dgettext( "js-text-analysis", resultText ) );
	}

	/**
	 * Mark the anchors.
	 *
	 * @returns {Array} Array with all the marked anchors.
	 */
	getMarks() {
		return map( this.linkCount.keyword.matchedAnchors, function( matchedAnchor ) {
			return new Mark( {
				original: matchedAnchor,
				marked: addMark( matchedAnchor ),
			} );
		} );
	}
}

module.exports = TextCompetingLinksAssessment;
