const Assessor = require( "./assessor.js" );

const IntroductionKeyword = require( "./assessments/seo/introductionKeywordAssessment.js" );
const KeyphraseLength = require( "./assessments/seo/keyphraseLengthAssessment.js" );
const KeywordDensity = require( "./assessments/seo/keywordDensityAssessment.js" );
const MetaDescriptionKeyword = require( "./assessments/seo/metaDescriptionKeywordAssessment.js" );
const MetaDescriptionLength = require( "./assessments/seo/metaDescriptionLengthAssessment.js" );
const SubheadingsKeyword = require( "./assessments/seo/subheadingsKeywordAssessment.js" );
const TextCompetingLinks = require( "./assessments/seo/textCompetingLinksAssessment.js" );
const TextImages = require( "./assessments/seo/textImagesAssessment.js" );
const TextLength = require( "./assessments/seo/textLengthAssessment.js" );
const OutboundLinks = require( "./assessments/seo/outboundLinksAssessment.js" );
const InternalLinks = require( "./assessments/seo/internalLinksAssessment" );
const TitleKeyword = require( "./assessments/seo/titleKeywordAssessment.js" );
const TitleWidth = require( "./assessments/seo/pageTitleWidthAssessment.js" );
const UrlKeyword = require( "./assessments/seo/urlKeywordAssessment.js" );
const SingleH1Assessment = require( "./assessments/seo/singleH1Assessment.js" );

/**
 * Creates the Assessor
 *
 * @param {object} i18n The i18n object used for translations.
 * @param {Object} options The options for this assessor.
 * @param {Object} options.marker The marker to pass the list of marks to.
 *
 * @constructor
 */
let SEOAssessor = function( i18n, options ) {
	Assessor.call( this, i18n, options );

	this._assessments = [
		new IntroductionKeyword(),
		new KeyphraseLength(),
		new KeywordDensity(),
		new MetaDescriptionKeyword(),
		new MetaDescriptionLength(),
		new SubheadingsKeyword(),
		new TextCompetingLinks(),
		new TextImages(),
		new TextLength(),
		new OutboundLinks(),
		new InternalLinks(),
		new TitleKeyword(),
		new TitleWidth(),
		new UrlKeyword(),
		new SingleH1Assessment(),
	];
};

require( "util" ).inherits( SEOAssessor, Assessor );

module.exports = SEOAssessor;
