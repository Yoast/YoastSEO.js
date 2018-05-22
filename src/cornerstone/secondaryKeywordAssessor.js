const Assessor = require( "../assessor.js" );

const introductionKeyword = require( "../assessments/seo/introductionKeywordAssessment.js" );
const KeyphraseLength = require( "../assessments/seo/keyphraseLengthAssessment.js" );
const KeywordDensity = require( "../assessments/seo/keywordDensityAssessment.js" );
const MetaDescriptionKeyword = require( "../assessments/seo/metaDescriptionKeywordAssessment.js" );
const TextImages = require( "../assessments/seo/textImagesAssessment.js" );
const textCompetingLinks = require( "../assessments/seo/textCompetingLinksAssessment.js" );

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
		introductionKeyword,
		new KeyphraseLength(),
		new KeywordDensity(),
		new MetaDescriptionKeyword(),
		textCompetingLinks,
		new TextImages( {
			scores: {
				noImages: 3,
				withAltNonKeyword: 3,
				withAlt: 3,
				noAlt: 3,
			},
		} ),
	];
};

require( "util" ).inherits( secondaryKeywordAssessor, Assessor );

module.exports = secondaryKeywordAssessor;
