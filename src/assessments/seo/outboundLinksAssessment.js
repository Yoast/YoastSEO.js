let AssessmentResult = require( "../../values/AssessmentResult.js" );
let Assessment = require( "../../assessment.js" );
let isEmpty = require( "lodash/isEmpty" );
let merge = require( "lodash/merge" );

/**
 * Assessment for calculating the outbound links in the text.
 */
class OutboundLinksAssessment extends Assessment {
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
			noLinks: {
				score: 3,
				resultText: "No outbound links appear in this page, consider adding some as appropriate.",
				requiresExternalDofollow: false,
				requiresExternalNofollow: false,
			},
			allNoFollowed: {
				score: 7,
				resultText: "This page has %1$s outbound link(s), all nofollowed.",
				requiresExternalDofollow: false,
				requiresExternalNofollow: true,
			},
			someNoFollowed: {
				score: 8,
				resultText: "This page has %1$s nofollowed outbound link(s) and %2$s normal outbound link(s).",
				requiresExternalDofollow: true,
				requiresExternalNofollow: true,
			},
			allFollowed: {
				score: 9,
				resultText: "This page has %1$s outbound link(s).",
				requiresExternalDofollow: true,
				requiresExternalNofollow: false,
			},
		};

		this.identifier = "externalLinks";
		this._config = merge( defaultConfig, config );
	}

	/**
	 * Runs the getLinkStatistics module, based on this returns an assessment result with score.
	 *
	 * @param {Paper} paper The paper to use for the assessment.
	 * @param {Researcher} researcher The researcher used for calling research.
	 * @param {Object} i18n The object used for translations.
	 *
	 * @returns {AssessmentResult} The assessment result.
	 */
	getResult( paper, researcher, i18n ) {
		this.linkStatistics = researcher.getResearch( "getLinkStatistics" );
		let assessmentResult = new AssessmentResult();

		if ( ! isEmpty( this.linkStatistics ) ) {
			const calculatedResult = this.calculateResult();
			assessmentResult.setScore( calculatedResult.score );
			assessmentResult.setText( this.translateScore( calculatedResult.resultText, calculatedResult.requiresExternalDofollow,
				calculatedResult.requiresExternalNofollow, i18n ) );
		}
		return assessmentResult;
	}

	/**
	 * Checks whether paper has text.
	 *
	 * @param {Paper} paper The paper to use for the assessment.
	 *
	 * @returns {boolean} True when there is text.
	 */
	isApplicable( paper ) {
		return paper.hasText();
	}

	/**
	 * Returns a score based on the linkStatistics.
	 *
	 * @returns {Object} The calculated result.
	 */
	calculateResult() {
		if ( this.linkStatistics.externalTotal === 0 ) {
			return this._config.noLinks;
		}

		if ( this.linkStatistics.externalNofollow === this.linkStatistics.externalTotal ) {
			return this._config.allNoFollowed;
		}

		if ( this.linkStatistics.externalDofollow === this.linkStatistics.externalTotal ) {
			return this._config.allFollowed;
		}

		return this._config.someNoFollowed;
	}

	/**
	 * Translates the score to a message the user can understand.
	 *
	 * @param {string} resultText The text of the result from the configuration.
	 * @param {boolean} requiresExternalDofollow Whether the translation requires the number of do-follow external links.
	 * @param {boolean} requiresExternalNofollow Whether the translation requires the number of no-follow external links.
	 * @param {Object} i18n The object used for translations.
	 *
	 * @returns {string} The translated string.
	 */
	translateScore( resultText, requiresExternalDofollow, requiresExternalNofollow, i18n ) {
		if ( ! requiresExternalDofollow && ! requiresExternalNofollow ) {
			return i18n.dgettext( "js-text-analysis", resultText );
		}

		if ( requiresExternalDofollow && ! requiresExternalNofollow ) {
			return i18n.sprintf(
				i18n.dgettext(
					/* Translators: %1$s expands the number of outbound links */
					"js-text-analysis",
					resultText
				),
				this.linkStatistics.externalDofollow );
		}

		if ( ! requiresExternalDofollow && requiresExternalNofollow ) {
			return i18n.sprintf(
				i18n.dgettext(
					/* Translators: %1$s expands the number of outbound links */
					"js-text-analysis",
					resultText
				),
				this.linkStatistics.externalNofollow );
		}

		return i18n.sprintf(
			i18n.dgettext(
				"js-text-analysis",
				/* Translators: %1$s expands to the number of nofollow links, %2$s to the number of outbound links */
				resultText
			),
			this.linkStatistics.externalNofollow,
			this.linkStatistics.externalDofollow
		);
	}
}

module.exports = OutboundLinksAssessment;
