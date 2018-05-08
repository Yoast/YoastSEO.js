let AssessmentResult = require( "../../values/AssessmentResult.js" );
let Assessment = require( "../../assessment.js" );
let merge = require( "lodash/merge" );
let inRangeStartEndInclusive = require( "../../helpers/inRange.js" ).inRangeStartEndInclusive;

/**
 * Represents the assessment that checks if the keyword is present in one of the subheadings.
 */
class SubHeadingsKeywordAssessment extends Assessment {
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
				noMatches: 3,
				tooFewMatches: 3,
				goodNumberOfMatches: 9,
				tooManyMatches: 3,
			},
			lowerBoundary: 0.3,
			upperBoundary: 0.75,
		};

		this.identifier = "subheadingsKeyword";
		this._config = merge( defaultConfig, config );
	}

	/**
	 * Runs the match keyword in subheadings module, based on this returns an assessment result with score.
	 *
	 * @param {Paper} paper The paper to use for the assessment.
	 * @param {Researcher} researcher The researcher used for calling research.
	 * @param {object} i18n The object used for translations.
	 *
	 * @returns {AssessmentResult} The assessment result.
	 */
	getResult( paper, researcher, i18n ) {
		this._subHeadings = researcher.getResearch( "matchKeywordInSubheadings" );
		this._minNumberOfSubheadings = Math.ceil( this._subHeadings.count * this._config.lowerBoundary );
		this._maxNumberOfSubheadings = Math.floor( this._subHeadings.count * this._config.upperBoundary );

		let assessmentResult = new AssessmentResult();
		let score = this.calculateScore();

		assessmentResult.setScore( score );
		assessmentResult.setText( this.translateScore( this._subHeadings, i18n ) );

		return assessmentResult;
	}

	/**
	 * Checks whether the paper has a text and a keyword.
	 *
	 * @param {Paper} paper The paper to use for the assessment.
	 *
	 * @returns {boolean} True when there is text and a keyword.
	 */
	isApplicable( paper ) {
		return paper.hasText() && paper.hasKeyword();
	}

	/*
	 * Checks whether there are no subheadings with the keyword.
	 *
	 * @returns {boolean} Returns true if there are no subheadings with the keyword.
	 */
	hasNoMatches() {
		return this._subHeadings.matches === 0;
	}

	/*
	 * Checks whether there are too few subheadings with the keyword.
	 *
	 * @returns {boolean} Returns true if there are more than 0 subheadings with the keyword,
	 * but less than the specified recommended minimum.
	 */
	hasTooFewMatches() {
		return this._subHeadings.matches > 0 && this._subHeadings.matches < this._minNumberOfSubheadings;
	}

	/*
	 * Checks whether there is a good number of subheadings with the keyword.
	 *
	 * @returns {boolean} Returns true if there is only one subheading and
	 * that subheading includes the keyword or if the number of subheadings
	 * with the keyword is within the specified recommended range.
	 */
	hasGoodNumberOfMatches() {
		return ( this._subHeadings.count === 1 && this._subHeadings.matches === 1 ) ||
			inRangeStartEndInclusive( this._subHeadings.matches, this._minNumberOfSubheadings, this._maxNumberOfSubheadings );
	}

	/*
	 * Checks whether there are too many subheadings with the keyword.
	 * The upper limit is only applicable if there is more than one subheading.
	 * If there is only one subheading with the keyword this would otherwise
	 * always lead to a 100% match rate.
	 *
	 * @returns {boolean} Returns true if there is more than one subheading and if
	 * the keyword is included in less subheadings than the recommended maximum.
	 */
	hasTooManyMatches() {
		return this._subHeadings.count > 1  && this._subHeadings.matches > this._maxNumberOfSubheadings;
	}

	/**
	 * Returns the score for the subheadings.
	 *
	 * @returns {number|null} The calculated score.
	 */
	calculateScore() {
		if ( this.hasNoMatches() ) {
			return this._config.scores.noMatches;
		}

		if ( this.hasTooFewMatches() ) {
			return this._config.scores.tooFewMatches;
		}

		if ( this.hasGoodNumberOfMatches() ) {
			return this._config.scores.goodNumberOfMatches;
		}

		if ( this.hasTooManyMatches() ) {
			return this._config.scores.tooManyMatches;
		}

		return null;
	}

	/**
	 * Translates the score to a message the user can understand.
	 *
	 * @param {object} subHeadings The object with all subHeadings matches.
	 * @param {object} i18n The object used for translations.
	 *
	 * @returns {string} The translated string.
	 */
	translateScore( subHeadings, i18n ) {
		if ( this.hasNoMatches() ) {
			return i18n.dgettext(
				"js-text-analysis",
				"You have not used the focus keyword in any subheading (such as an H2)."
			);
		}

		if ( this.hasTooFewMatches() ) {
			return i18n.sprintf(
				i18n.dgettext( "js-text-analysis", "The focus keyword appears only in %2$d out of %1$d subheadings. " +
					"Try to use it in more subheadings." ),
					subHeadings.count, subHeadings.matches
			);
		}

		if ( this.hasGoodNumberOfMatches() ) {
			return i18n.sprintf(
				i18n.dngettext( "js-text-analysis", "The focus keyword appears in %2$d out of %1$d subheading. " +
					"That's great.", "The focus keyword appears in %2$d out of %1$d subheadings. " +
					"That's great.", subHeadings.count ),
				subHeadings.count, subHeadings.matches
			);
		}

		if ( this.hasTooManyMatches() ) {
			return i18n.sprintf(
				i18n.dgettext( "js-text-analysis", "The focus keyword appears in %2$d out of %1$d subheadings. " +
					"That might sound a bit repetitive. " +
					"Try to change some of those subheadings to make the flow of your text sound more natural." ),
				subHeadings.count, subHeadings.matches
			);
		}

		return "";
	}
}

module.exports = SubHeadingsKeywordAssessment;
