let AssessmentResult = require( "../../values/AssessmentResult.js" );
let Assessment = require( "../../assessment.js" );
let countTooLongSentences = require( "../../assessmentHelpers/checkForTooLongSentences.js" );
let formatNumber = require( "../../helpers/formatNumber.js" );
let inRange = require( "../../helpers/inRange.js" ).inRangeEndInclusive;
let stripTags = require( "../../stringProcessing/stripHTMLTags" ).stripIncompleteTags;

let Mark = require( "../../values/Mark.js" );
let addMark = require( "../../markers/addMark.js" );

import { map } from "lodash-es";
import { merge } from "lodash-es";

/**
 * Represents the assessment that will calculate the length of sentences in the text.
 */
class SentenceLengthInTextAssessment extends Assessment {
	/**
	 * Sets the identifier and the config.
	 *
	 * @param {object} config The configuration to use.
	 * @returns {void}
	 */
	constructor( config = {} ) {
		super();

		let defaultConfig = {
			recommendedWordCount: 20,
			slightlyTooMany: 25,
			farTooMany: 30,
		};

		this.identifier = "textSentenceLength";
		this._config = merge( defaultConfig, config );
	}

	/**
	 * Scores the percentage of sentences including more than the recommended number of words.
	 *
	 * @param {Paper} paper The paper to use for the assessment.
	 * @param {Researcher} researcher The researcher used for calling research.
	 * @param {object} i18n The object used for translations.
	 * @returns {AssessmentResult} The Assessment result.
	 */
	getResult( paper, researcher, i18n ) {
		let sentences = researcher.getResearch( "countSentencesFromText" );
		let percentage = this.calculatePercentage( sentences );
		let score = this.calculateScore( percentage );

		let assessmentResult = new AssessmentResult();

		assessmentResult.setScore( score );
		assessmentResult.setText( this.translateScore( score, percentage, i18n ) );
		assessmentResult.setHasMarks( ( percentage > 0 ) );

		return assessmentResult;
	}

	/**
	 * Checks whether the paper has text.
	 *
	 * @param {Paper} paper The paper to use for the assessment.
	 *
	 * @returns {boolean} True when there is text.
	 */
	isApplicable( paper ) {
		return paper.hasText();
	}

	/**
	 * Mark the sentences.
	 *
	 * @param {Paper} paper The paper to use for the marking.
	 * @param {Researcher} researcher The researcher to use.
	 *
	 * @returns {Array} Array with all the marked sentences.
	 */
	getMarks( paper, researcher ) {
		let sentenceCount = researcher.getResearch( "countSentencesFromText" );
		let sentenceObjects = this.getTooLongSentences( sentenceCount );

		return map( sentenceObjects, function( sentenceObject ) {
			let sentence = stripTags( sentenceObject.sentence );
			return new Mark( {
				original: sentence,
				marked: addMark( sentence ),
			} );
		} );
	}

	/**
	 * Translates the score to a message the user can understand.
	 *
	 * @param {number} score The score.
	 * @param {number} percentage The percentage.
	 * @param {object} i18n The object used for translations.
	 *
	 * @returns {string} A string.
	 */
	translateScore( score, percentage,  i18n ) {
		let sentenceLengthURL = "<a href='https://yoa.st/short-sentences' target='_blank'>";
		if ( score >= 7 ) {
			return i18n.sprintf( i18n.dgettext( "js-text-analysis",
				// Translators: %1$d expands to percentage of sentences, %2$s expands to a link on yoast.com,
				// %3$s expands to the recommended maximum sentence length, %4$s expands to the anchor end tag,
				// %5$s expands to the recommended maximum percentage.
				"%1$s of the sentences contain %2$smore than %3$s words%4$s, which is less than or equal to the recommended maximum of %5$s."
			), percentage + "%", sentenceLengthURL, this._config.recommendedWordCount, "</a>", this._config.slightlyTooMany + "%"
			);
		}

		return i18n.sprintf( i18n.dgettext( "js-text-analysis",
			// Translators: %1$d expands to percentage of sentences, %2$s expands to a link on yoast.com,
			// %3$s expands to the recommended maximum sentence length, %4$s expands to the anchor end tag,
			// %5$s expands to the recommended maximum percentage.
			"%1$s of the sentences contain %2$smore than %3$s words%4$s, which is more than the recommended maximum of %5$s. " +
			"Try to shorten the sentences."
		), percentage + "%", sentenceLengthURL, this._config.recommendedWordCount, "</a>", this._config.slightlyTooMany + "%" );
	}

	/**
	 * Calculates the percentage of sentences that are too long.
	 *
	 * @param {Array} sentences The sentences to calculate the percentage for.
	 * @returns {number} The calculates percentage of too long sentences.
	 */
	calculatePercentage( sentences ) {
		let percentage = 0;

		if ( sentences.length !== 0 ) {
			let tooLongTotal = this.countTooLongSentences( sentences );

			percentage = formatNumber( ( tooLongTotal / sentences.length ) * 100 );
		}

		return percentage;
	}

	/**
	 * Calculates the score for the given percentage.
	 *
	 * @param {number} percentage The percentage to calculate the score for.
	 * @returns {number} The calculated score.
	 */
	calculateScore( percentage ) {
		let score;

		// Green indicator.
		if ( percentage <= this._config.slightlyTooMany ) {
			score = 9;
		}

		// Orange indicator.
		if ( inRange( percentage, this._config.slightlyTooMany, this._config.farTooMany ) ) {
			score = 6;
		}

		// Red indicator.
		if ( percentage > this._config.farTooMany ) {
			score = 3;
		}

		return score;
	}

	/**
	 * Gets the sentences that are qualified as being too long.
	 *
	 * @param {array} sentences The sentences to filter through.
	 * @returns {array} Array with all the sentences considered to be too long.
	 */
	getTooLongSentences( sentences ) {
		return countTooLongSentences( sentences, this._config.recommendedWordCount );
	}

	/**
	 * Get the total amount of sentences that are qualified as being too long.
	 *
	 * @param {Array} sentences The sentences to filter through.
	 * @returns {Number} The amount of sentences that are considered too long.
	 */
	countTooLongSentences( sentences ) {
		return this.getTooLongSentences( sentences ).length;
	}
}

module.exports = SentenceLengthInTextAssessment;
