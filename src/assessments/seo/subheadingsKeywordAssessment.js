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
		let subHeadings = researcher.getResearch( "matchKeywordInSubheadings" );
		let assessmentResult = new AssessmentResult();
		let score = this.calculateScore( subHeadings );

		assessmentResult.setScore( score );
		assessmentResult.setText( this.translateScore( score, subHeadings, i18n ) );

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

	/**
	 * Returns the score for the subheadings.
	 *
	 * @param {object} subHeadings The object with all subHeadings matches.
	 *
	 * @returns {number|null} The calculated score.
	 */
	calculateScore( subHeadings ) {
		let minNumberOfSubheadings = subHeadings.count * this._config.lowerBoundary;
		let maxNumberOfSubheadings = subHeadings.count * this._config.upperBoundary;

		if ( subHeadings.matches === 0 ) {
			return this._config.scores.noMatches;
		}

		if ( subHeadings.matches > 0 && subHeadings.matches < minNumberOfSubheadings ) {
			return this._config.scores.tooFewMatches;
		}

		/*
		 * Return a good result if the number of matches is within the specified range or
		 * if there is only one subheading and that subheading includes the keyword.
		 */
		if ( ( subHeadings.count === 1 && subHeadings.matches === 1 ) ||
		inRangeStartEndInclusive( subHeadings.matches, minNumberOfSubheadings, maxNumberOfSubheadings ) ) {
			return this._config.scores.goodNumberOfMatches;
		}

		/*
		 * The upper limit is only applicable if there is more than one subheading.
		 * If there is only one subheading that includes keyword this would otherwise
		 * always lead a 100% match rate.
		 */
		if ( subHeadings.count > 1  && subHeadings.matches > maxNumberOfSubheadings ) {
			return this._config.scores.tooManyMatches;
		}

		return null;
	}

	/**
	 * Translates the score to a message the user can understand.
	 *
	 * @param {number} score The score for this assessment.
	 * @param {object} subHeadings The object with all subHeadings matches.
	 * @param {object} i18n The object used for translations.
	 *
	 * @returns {string} The translated string.
	 */
	translateScore( score, subHeadings, i18n ) {
		let minNumberOfSubheadings = subHeadings.count * this._config.lowerBoundary;
		let maxNumberOfSubheadings = subHeadings.count * this._config.upperBoundary;

		if ( subHeadings.matches === 0 ) {
			return i18n.dgettext(
				"js-text-analysis",
				"You have not used the focus keyword in any subheading (such as an H2)."
			);
		}

		if ( subHeadings.matches > 0 && subHeadings.matches < minNumberOfSubheadings ) {
			return i18n.sprintf(
				i18n.dgettext( "js-text-analysis", "The focus keyword appears only in %2$d out of %1$d subheadings. " +
					"Try to use it in more subheadings." ),
					subHeadings.count, subHeadings.matches
			);
		}

		/*
		 * Return positive feedback if the number of matches is within the specified range or
		 * if there is only one subheading and that subheading includes the keyword.
		 */
		if ( ( subHeadings.count === 1 && subHeadings.matches === 1 ) ||
			inRangeStartEndInclusive( subHeadings.matches, minNumberOfSubheadings, maxNumberOfSubheadings ) ) {
			return i18n.sprintf(
				i18n.dngettext( "js-text-analysis", "The focus keyword appears in %2$d out of %1$d subheading. " +
					"That's great.", "The focus keyword appears in %2$d out of %1$d subheadings. " +
					"That's great.", subHeadings.count ),
				subHeadings.count, subHeadings.matches
			);
		}

		/*
		 * The upper limit is only applicable if there is more than one subheading.
		 * If there is only one subheading that includes keyword this would otherwise
		 * always lead a 100% match rate.
		 */
		if ( subHeadings.count > 1 && subHeadings.matches > maxNumberOfSubheadings ) {
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
