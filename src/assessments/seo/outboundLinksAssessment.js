let AssessmentResult = require( "../../values/AssessmentResult.js" );
let Assessment = require( "../../assessment.js" );
let merge = require( "lodash/merge" );

/**
 * Assessment for calculating the outbound links in the text.
 */
class OutboundLinksAssessment extends Assessment {
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
			scores: {
				allExternalFollow: 9,
				someExternalFollow: 8,
				noneExternalFollow: 7,
				noExternal: 3,
			},
			url: "<a href='https://yoa.st/2pl' target='_blank'>",
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

		const calculatedResult = this.calculateResult( i18n );
		assessmentResult.setScore( calculatedResult.score );
		assessmentResult.setText( calculatedResult.resultText );

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
	 * Returns a score and a result text based on the linkStatistics.
	 *
	 * @param {Object} i18n The object used for translations.
	 *
	 * @returns {Object} The calculated result.
	 */
	calculateResult( i18n ) {
		if ( this.linkStatistics.externalTotal === 0 ) {
			return {
				score: this._config.scores.noExternal,
				resultText: i18n.sprintf(
					/* Translators: %1$s expands to a link on yoast.com, %2$s expands to the anchor end tag. */
					i18n.dgettext(
						"js-text-analysis",
						"No %1$soutbound links%2$s appear in this page, consider adding some as appropriate."
					),
					this._config.url,
					"</a>"
				),
			};
		}

		if ( this.linkStatistics.externalNofollow === this.linkStatistics.externalTotal ) {
			return {
				score: this._config.scores.noneExternalFollow,
				resultText: i18n.sprintf(
					/* Translators: %1$d expands the number of external nofollowed links,
					 * %2$s expands to a link on yoast.com, %3$s expands to the anchor end tag. */
					i18n.dgettext(
						"js-text-analysis",
						"This page has %1$d %2$soutbound link(s)%3$s, all nofollowed."
					),
					this.linkStatistics.externalNofollow,
					this._config.url,
					"</a>"
				),
			};
		}

		if ( this.linkStatistics.externalDofollow === this.linkStatistics.externalTotal ) {
			return {
				score: this._config.scores.allExternalFollow,
				resultText: i18n.sprintf(
					/* Translators: %1$s expands the number of external links,
					 * %2$s expands to a link on yoast.com, %3$s expands to the anchor end tag. */
					i18n.dgettext(
						"js-text-analysis",
						"This page has %1$s %2$soutbound link(s)%3$s."
					),
					this.linkStatistics.externalDofollow,
					this._config.url,
					"</a>"
				),
			};
		}

		return {
			score: this._config.scores.someExternalFollow,
			resultText: i18n.sprintf(
				/* Translators: %1$d expands the number of external nofollowed links,
				%2$s expands the number of external followed links,
				%3$s expands to a link on yoast.com, %4$s expands to the anchor end tag.*/
				i18n.dgettext(
					"js-text-analysis",
					"This page has %1$d nofollowed %3$soutbound link(s)%4$s and %2$d normal outbound link(s)."
				),
				this.linkStatistics.externalNofollow,
				this.linkStatistics.externalDofollow,
				this._config.url,
				"</a>"
			),
		};
	}
}

module.exports = OutboundLinksAssessment;
