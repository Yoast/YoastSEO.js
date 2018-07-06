const Assessor = require( "./assessor.js" );

const IntroductionKeyword = require( "./assessments/seo/introductionKeywordAssessment.js" );
const KeyphraseLength = require( "./assessments/seo/keyphraseLengthAssessment.js" );
const KeywordDensity = require( "./assessments/seo/keywordDensityAssessment.js" );
const MetaDescriptionKeyword = require( "./assessments/seo/metaDescriptionKeywordAssessment.js" );
const TextImages = require( "./assessments/seo/textImagesAssessment.js" );
const TextCompetingLinks = require( "./assessments/seo/textCompetingLinksAssessment.js" );

/**
 * Creates the Assessor
 *
 * @param {object} i18n The i18n object used for translations.
 * @param {Object} options The options for this assessor.
 * @param {Object} options.marker The marker to pass the list of marks to.
 *
 * @constructor
 */
const secondaryKeywordAssessor = function( i18n, options ) {
	Assessor.call( this, i18n, options );

	this._assessments = [
		new IntroductionKeyword(),
		new KeyphraseLength(),
		new KeywordDensity(),
		new MetaDescriptionKeyword(),
		new TextCompetingLinks(),
		new TextImages(),
	];
};

require( "util" ).inherits( secondaryKeywordAssessor, Assessor );

module.exports = secondaryKeywordAssessor;
