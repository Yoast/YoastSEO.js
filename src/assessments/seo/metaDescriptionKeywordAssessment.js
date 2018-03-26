var AssessmentResult = require( "../../values/AssessmentResult.js" );
let Assessment = require( "../../assessment.js" );
let merge = require( "lodash/merge" );

/**
 * Assessment for calculating the length of the meta description.
 */
class MetaDescriptionKeywordAssessment extends Assessment
{
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
			recommendedMinimumMatches: 1,
			recommendedMaximumMatches: 2,
			scores: {
				tooFewMatches: 3,
				tooManyMatches: 3,
				correctNumberOfMatches: 9,
			},
		};

		this.identifier = "metaDescriptionKeyword";
		this._config = merge( defaultConfig, config );
	}

	/**
	 * Runs the metaDescriptionKeyword researcher and based on this, returns an assessment result with score.
	 *
	 * @param {Paper} paper The paper to use for the assessment.
	 * @param {Researcher} researcher The researcher used for calling research.
	 * @param {Object} i18n The object used for translations.
	 *
	 * @returns {AssessmentResult} The assessment result.
	 */
	getResult( paper, researcher, i18n ) {
		this._keywordMatches = researcher.getResearch( "metaDescriptionKeyword" );
		var assessmentResult = new AssessmentResult();

		assessmentResult.setScore( this.calculateScore() );
		assessmentResult.setText( this.translateScore( i18n ) );

		return assessmentResult;
	}

	/*
	 * Checks whether there are too few keyword matches in the meta description.
	 *
	 * @returns {boolean} Returns true if there is less than 1 keyword match in the meta description.
	 */
	hasTooFewMatches() {
		return this._keywordMatches < this._config.recommendedMinimumMatches;
	}

	/*
	 * Checks whether there is a good number of keyword matches in the meta description.
	 *
	 * @returns {boolean} Returns true if the number of keyword matches is within the recommended range.
	 */
	hasGoodNumberOfMatches() {
		return ( this._keywordMatches >= this._config.recommendedMinimumMatches &&
		this._keywordMatches <= this._config.recommendedMaximumMatches );
	}

	/**
	 * Returns the score for the descriptionLength.
	 *
	 * @returns {number} The calculated score.
	 */
	calculateScore() {
		if ( this.hasTooFewMatches() ) {
			return this._config.scores.tooFewMatches;
		}

		if ( this.hasGoodNumberOfMatches() ) {
			return this._config.scores.correctNumberOfMatches;
		}

		// Implicitly return this if the number of matches is more than the recommended maximum.
		return this._config.scores.tooManyMatches;
	}

	/**
	 * Translates the score to a message the user can understand.
	 *
	 * @param {Object} i18n The object used for translations.
	 *
	 * @returns {string} The translated string.
	 */
	translateScore( i18n ) {
		if ( this.hasTooFewMatches() ) {
			return i18n.dgettext( "js-text-analysis", "A meta description has been specified, but it does not contain the focus keyword." );
		}

		if ( this.hasGoodNumberOfMatches() ) {
			return i18n.sprintf( i18n.dngettext( "js-text-analysis", "The meta description contains the focus keyword. That's great.",
				"The meta description contains the focus keyword %1$d times. That's great.", this._keywordMatches ), this._keywordMatches );
		}

		// Implicitly returns this if the number of matches is more than the recommended maximum.
		return i18n.sprintf( i18n.dgettext( "js-text-analysis", "The meta description contains the focus keyword %1$d times, " +
			"which is over the advised maximum of %2$d times." ), this._keywordMatches, this._config.recommendedMaximumMatches );
	}

	/**
	 * Checks whether the paper has a keyword.
	 *
	 * @param {Paper} paper The paper to use for the assessment.
	 *
	 * @returns {boolean} True when the paper has a keyword.
	 */
	isApplicable( paper ) {
		return paper.hasKeyword();
	}
}

module.exports =  MetaDescriptionKeywordAssessment;
