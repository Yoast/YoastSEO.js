const Assessment = require( "../../assessment.js" );
const AssessmentResult = require( "../../values/AssessmentResult.js" );
const merge = require( "lodash/merge" );
const isEmpty = require( "lodash/isEmpty" );

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
			allInternalFollow: {
				score: 9,
				resultText: "This page has %1$s internal link(s).",
				requiresInternalDofollow: true,
				requiresInternalNofollow: false,
			},
			someInternalFollow: {
				score: 8,
				resultText: "This page has %1$s nofollowed internal link(s) and %2$s normal internal link(s).",
				requiresInternalDofollow: true,
				requiresInternalNofollow: true,
			},
			noneInternalFollow: {
				score: 7,
				resultText: "This page has %1$s internal link(s), all nofollowed.",
				requiresInternalDofollow: false,
				requiresInternalNofollow: true,
			},
			noInternal: {
				score: 3,
				resultText: "No internal links appear in this page, consider adding some as appropriate.",
				requiresInternalDofollow: false,
				requiresInternalNofollow: false,
			},
		};

		this.identifier = "internalLinks";
		this._config = merge( defaultConfig, config );
	}

	/**
	 * Runs the getLinkStatistics module, based on this returns an assessment result with score.
	 *
	 * @param {Paper} paper The paper to use for the assessment.
	 * @param {Object} researcher The researcher used for calling research.
	 * @param {Object} i18n The object used for translations
	 * @returns {Object} the AssessmentResult.
	 */
	getResult( paper, researcher, i18n ) {
		this.linkStatistics = researcher.getResearch( "getLinkStatistics" );
		let assessmentResult = new AssessmentResult();

		if ( ! isEmpty( this.linkStatistics ) ) {
			const calculatedResult = this.calculateResult();
			assessmentResult.setScore( calculatedResult.score );
			assessmentResult.setText( this.translateScore( calculatedResult.resultText, calculatedResult.requiresInternalDofollow,
				calculatedResult.requiresInternalNofollow, i18n ) );
		}

		return assessmentResult;
	}

	/**
	 * Checks if assessment is applicable to the paper.
	 *
	 * @param {Paper} paper The paper to be analysed.
	 *
	 * @returns {boolean} Whether the paper has text.
	 */
	isApplicable( paper ) {
		return paper.hasText();
	}

	/**
	 * Returns a score and text based on the linkStatistics object.
	 *
	 * @returns {object} resultObject with score and text
	 */
	calculateResult() {
		if ( this.linkStatistics.internalTotal === 0 ) {
			return this._config.noInternal;
		}

		if ( this.linkStatistics.internalNofollow === this.linkStatistics.internalTotal ) {
			return this._config.noneInternalFollow;
		}

		if ( this.linkStatistics.internalDofollow === this.linkStatistics.internalTotal ) {
			return this._config.allInternalFollow;
		}

		return this._config.someInternalFollow;
	}

	/**
	 * Translates the score into a specific feedback to the user.
	 *
	 * @param {string} resultText The text string from the config to be returned for this number of occurrences of keyphrase
	 * in the first paragraph.
	 * @param {boolean} requiresInternalDofollow Whether the translated score needs to include the number of follow-links
	 * @param {boolean} requiresInternalNofollow Whether the translated score needs to include the number of no-follow-links
	 * @param {Object} i18n The i18n-object used for parsing translations.
	 *
	 * @returns {string} Text feedback.
	 */
	translateScore( resultText, requiresInternalDofollow, requiresInternalNofollow, i18n ) {
		if ( requiresInternalDofollow === false && requiresInternalNofollow === false ) {
			return i18n.sprintf( i18n.dgettext( "js-text-analysis", resultText ) );
		}

		if ( requiresInternalDofollow === true && requiresInternalNofollow === false ) {
			/* Translators: %1$s expands the number of internal links */
			return i18n.sprintf(
				i18n.dgettext( "js-text-analysis", resultText ),
				this.linkStatistics.internalDofollow );
		}
		if ( requiresInternalDofollow === false && requiresInternalNofollow === true ) {
			/* Translators: %1$s expands the number of internal no-follow links */
			return i18n.sprintf(
				i18n.dgettext( "js-text-analysis", resultText ),
				this.linkStatistics.internalNofollow );
		}
		/* Translators: %1$s expands to the number of nofollow links, %2$s to the number of internal links */
		return i18n.sprintf(
			i18n.dgettext( "js-text-analysis", resultText ),
			this.linkStatistics.internalNofollow, this.linkStatistics.internalDofollow
		);
	}
}

module.exports = TextHasInternalLinksAssessment;
