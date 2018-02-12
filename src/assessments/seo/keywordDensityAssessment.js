const Assessment = require( "../../assessment.js" );
const AssessmentResult = require( "../../values/AssessmentResult.js" );
const countWords = require( "../../stringProcessing/countWords.js" );
const formatNumber = require( "../../helpers/formatNumber.js" );
const inRange = require( "../../helpers/inRange.js" );
const merge = require( "lodash/merge" );

const inRangeEndInclusive = inRange.inRangeEndInclusive;
const inRangeStartInclusive = inRange.inRangeStartInclusive;
const inRangeStartEndInclusive = inRange.inRangeStartEndInclusive;

class KeywordDensityAssessment extends Assessment {

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
			overMaximum: 4,
			maximum: 3,
			minimum: 0.5,
			scores: {
				wayOverMaximum: -50,
				overMaximum: -10,
				correctDensity: 9,
				underMinimum: 4,
			},
		};

		this.identifier = "keywordDensity";
		this._config = merge( defaultConfig, config );
	}

	/**
	 * Runs the keyword density module, based on this returns an assessment result with score.
	 *
	 * @param {Paper} paper The paper to use for the assessment.
	 * @param {Researcher} researcher The researcher used for calling research.
	 * @param {object} i18n The object used for translations
	 *
	 * @returns {AssessmentResult} The assessment result.
	 */
	getResult( paper, researcher, i18n ) {
		let keywordDensity = researcher.getResearch( "getKeywordDensity" );
		let keywordCount = researcher.getResearch( "keywordCount" );
		let assessmentResult = new AssessmentResult();

		assessmentResult.setScore( this.calculateScore( keywordDensity ) );
		assessmentResult.setText( this.translateScore( keywordDensity, i18n, keywordCount ) );

		return assessmentResult;
	}

	/**
	 * Returns the score for the keyword density.
	 *
	 * @param {number} keywordDensity The keyword density in the text.
	 *
	 * @returns {number} The calculated score.
	 */
	calculateScore( keywordDensity ) {
		let roundedKeywordDensity = formatNumber( keywordDensity );

		if ( roundedKeywordDensity > this._config.overMaximum ) {
			return this._config.scores.wayOverMaximum;
		}

		if ( inRangeEndInclusive( roundedKeywordDensity, this._config.maximum, this._config.overMaximum ) ) {
			return this._config.scores.overMaximum;
		}

		if ( inRangeStartEndInclusive( roundedKeywordDensity, this._config.minimum, this._config.maximum ) ) {
			return this._config.scores.correctDensity;
		}

		if ( inRangeStartInclusive( roundedKeywordDensity, 0, this._config.minimum ) ) {
			return this._config.scores.underMinimum;
		}

		return 0;
	}

	/**
	 * Translates the keyword density assessment to a message the user can understand.
	 *
	 * @param {number} keywordDensity The keyword density in the text.
	 * @param {object} i18n The object used for translations.
	 * @param {number} keywordCount The number of keywords found in the text.
	 *
	 * @returns {string} The translated string.
	 */
	translateScore( keywordDensity, i18n, keywordCount ) {
		let roundedKeywordDensity = formatNumber( keywordDensity );
		let keywordDensityPercentage = roundedKeywordDensity + "%";

		if ( roundedKeywordDensity > this._config.overMaximum ) {
			return i18n.sprintf( i18n.dgettext( "js-text-analysis", "The keyword density is %1$s," +
				" which is way over the advised %3$s maximum;" +
				" the focus keyword was found %2$d times." ), keywordDensityPercentage, keywordCount, this._config.maximum + "%" );
		}

		if ( inRangeEndInclusive( roundedKeywordDensity, this._config.maximum, this._config.overMaximum ) ) {
			return i18n.sprintf( i18n.dgettext( "js-text-analysis", "The keyword density is %1$s," +
				" which is over the advised %3$s maximum;" +
				" the focus keyword was found %2$d times." ), keywordDensityPercentage, keywordCount, this._config.maximum + "%" );
		}

		if ( inRangeStartEndInclusive( roundedKeywordDensity, this._config.minimum, this._config.maximum ) ) {
			return i18n.sprintf( i18n.dgettext( "js-text-analysis", "The keyword density is %1$s, which is great;" +
				" the focus keyword was found %2$d times." ), keywordDensityPercentage, keywordCount );
		}

		if ( inRangeStartInclusive( roundedKeywordDensity, 0, this._config.minimum ) ) {
			return i18n.sprintf( i18n.dgettext( "js-text-analysis", "The keyword density is %1$s, which is too low;" +
				" the focus keyword was found %2$d times." ), keywordDensityPercentage, keywordCount );
		}
	}

	/**
	 * Checks whether the paper has a text with at least 100 words and a keyword is set.
	 *
	 * @param {Paper} paper The paper to use for the assessment.
	 *
	 * @returns {boolean} True when there is text with at least 100 words and a keyword is set.
	 */
	isApplicable( paper ) {
		return paper.hasText() && paper.hasKeyword() && countWords( paper.getText() ) >= 100;
	}
}

module.exports = KeywordDensityAssessment;
