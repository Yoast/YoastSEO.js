import { merge } from "lodash-es";

import Assessment from "../../assessment";
import AssessmentResult from "../../values/AssessmentResult";

/**
 * Represents the URL keyword assessments. This assessments will check if the keyword is present in the url.
 */
class UrlKeywordAssessment extends Assessment {
	/**
	 * Sets the identifier and the config.
	 *
	 * @param {Object} config The configuration to use.
	 * @param {number} [config.scores.noKeywordInUrl] The score to return if the keyword is not in the URL.
	 * @param {number} [config.scores.good] The score to return if the keyword is in the URL.
	 * @param {string} [config.url] The URL to the relevant KB article.
	 *
	 * @returns {void}
	 */
	constructor( config = {} ) {
		super();

		const defaultConfig = {
			scores: {
				okay: 6,
				good: 9,
			},
			url: "<a href='https://yoa.st/2pp' target='_blank'>",
		};

		this.identifier = "urlKeyword";
		this._config = merge( defaultConfig, config );
	}

	/**
	 * Executes the Assessment and returns a result.
	 *
	 * @param {Paper} paper The Paper object to assess.
	 * @param {Researcher} researcher The Researcher object containing all available researches.
	 * @param {Jed} i18n The object used for translations.
	 *
	 * @returns {AssessmentResult} The result of the assessment, containing both a score and a descriptive text.
	 */
	getResult( paper, researcher, i18n ) {
		this._result = researcher.getResearch( "keywordCountInUrl" );

		const assessmentResult = new AssessmentResult();

		const calculatedResult = this.calculateResult( i18n );
		assessmentResult.setScore( calculatedResult.score );
		assessmentResult.setText( calculatedResult.resultText );

		return assessmentResult;
	}

	/**
	 * Checks whether the paper has a keyword and a url.
	 *
	 * @param {Paper} paper The paper to use for the assessment.
	 *
	 * @returns {boolean} True when there is a keyword and an url.
	 */
	isApplicable( paper ) {
		return paper.hasKeyword() && paper.hasUrl();
	}

	/**
	 * Determines the score and the result text based on whether or not there's a keyword in the url.
	 *
	 * @param {Jed} i18n The object used for translations.
	 *
	 * @returns {Object} The object with calculated score and resultText.
	 */
	calculateResult( i18n ) {
		if ( (this._numberOfWords === 1 || this._numberOfWords === 2 && this._matches.percentWordMatches !== 100)
		|| this._numberOfWords > 2 && this._matches.percentWordMatches <= 50) {
			return {
				score: this._config.scores.okay,
				resultText: i18n.sprintf(
					/* Translators:  %1$s expands to a link on yoast.com, %2$s expands to the anchor end tag */
					i18n.dgettext(
						"js-text-analysis",
						"Not enough words from your keyphrase appear in the %1$sURL%2$s for this page. " +
						"If you decide to rename the URL be sure to check the old URL 301 redirects to the new one!"
					),
					this._config.url,
					"</a>"
				),
			};
		}

		return {
			score: this._config.scores.good,
			resultText: i18n.sprintf(
				/* Translators:  %1$s expands to a link on yoast.com, %2$s expands to the anchor end tag */
				i18n.dgettext( "js-text-analysis", "All or most of the words from your keyphrase appear in the %1$sURL%2$s for this page." ),
				this._config.url,
				"</a>"
			),
		};
	}
}

export default UrlKeywordAssessment;
