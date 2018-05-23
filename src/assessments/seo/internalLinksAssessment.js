const Assessment = require( "../../assessment.js" );
const AssessmentResult = require( "../../values/AssessmentResult.js" );
const merge = require( "lodash/merge" );

/**
 * Assessment to check whether the text has internal links and whether they are followed or no-followed.
 */
class TextHasInternalLinksAssessment extends Assessment {
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
				recommendedMinimum: 1,
			},
			scores: {
				allInternalFollow: 9,
				someInternalFollow: 8,
				noneInternalFollow: 7,
				noInternal: 3,
			},
		};

		this.identifier = "internalLinks";
		this._config = merge( defaultConfig, config );
	}

	/**
	 * Runs the getLinkStatistics module, based on this returns an assessment result with score.
	 *
	 * @param {Paper} paper The paper to use for the assessment.
	 * @param {Researcher} researcher The researcher used for calling research.
	 * @param {Object} i18n The object used for translations.
	 *
	 * @returns {Object} The AssessmentResult.
	 */
	getResult( paper, researcher, i18n ) {
		this.linkStatistics = researcher.getResearch( "getLinkStatistics" );
		let assessmentResult = new AssessmentResult();

		const calculatedResult = this.calculateResult( i18n );
		assessmentResult.setScore( calculatedResult.score );
		assessmentResult.setText( calculatedResult.resultText );

		return assessmentResult;
	}

	/**
	 * Checks if assessment is applicable to the paper.
	 *
	 * @param {Paper} paper The paper to be analyzed.
	 *
	 * @returns {boolean} Whether the paper has text.
	 */
	isApplicable( paper ) {
		return paper.hasText();
	}

	/**
	 * Returns a score and text based on the linkStatistics object.
	 *
	 * @param {Object} i18n The object used for translations.
	 *
	 * @returns {Object} ResultObject with score and text
	 */
	calculateResult( i18n ) {
		if ( this.linkStatistics.internalTotal === 0 ) {
			return {
				score: this._config.scores.noInternal,
				resultText: i18n.sprintf(
					i18n.dgettext(
						"js-text-analysis",
						"No internal links appear in this page, consider adding some as appropriate."
					)
				),
			};
		}

		if ( this.linkStatistics.internalNofollow === this.linkStatistics.internalTotal ) {
			return {
				score: this._config.scores.noneInternalFollow,
				resultText: i18n.sprintf(
					/* Translators: %1$s expands the number of internal nofollowed links */
					i18n.dgettext(
						"js-text-analysis",
						"This page has %1$s internal link(s), all nofollowed."
					),
					this.linkStatistics.internalNofollow
				),
			};
		}

		if ( this.linkStatistics.internalDofollow === this.linkStatistics.internalTotal ) {
			return {
				score: this._config.scores.allInternalFollow,
				resultText: i18n.sprintf(
					/* Translators: %1$s expands the number of internal links */
					i18n.dgettext(
						"js-text-analysis",
						"This page has %1$s internal link(s)."
					),
					this.linkStatistics.internalDofollow
				),
			};
		}
		return {
			score: this._config.scores.someInternalFollow,
			resultText: i18n.sprintf(
				/* Translators: %1$s expands the number of internal nofollowed links, %2$s expands the number of internal followed links */
				i18n.dgettext(
					"js-text-analysis",
					"This page has %1$s nofollowed internal link(s) and %2$s normal internal link(s)."
				),
				this.linkStatistics.internalNofollow,
				this.linkStatistics.internalDofollow
			),
		};
	}
}

module.exports = TextHasInternalLinksAssessment;
