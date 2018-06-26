const Assessor = require( "./assessor.js" );

const introductionKeyword = require( "./assessments/seo/introductionKeywordAssessment.js" );
const keyphraseLength = require( "./assessments/seo/keyphraseLengthAssessment.js" );
const keywordDensity = require( "./assessments/seo/keywordDensityAssessment.js" );
const keywordStopWords = require( "./assessments/seo/keywordStopWordsAssessment.js" );
const metaDescriptionKeyword = require( "./assessments/seo/metaDescriptionKeywordAssessment.js" );
const MetaDescriptionLength = require( "./assessments/seo/metaDescriptionLengthAssessment.js" );
const SubheadingsKeyword = require( "./assessments/seo/subheadingsKeywordAssessment.js" );
const textCompetingLinks = require( "./assessments/seo/textCompetingLinksAssessment.js" );
const TextImages = require( "./assessments/seo/textImagesAssessment.js" );
const TextLength = require( "./assessments/seo/textLengthAssessment.js" );
const OutboundLinks = require( "./assessments/seo/outboundLinksAssessment.js" );
const internalLinks = require( "./assessments/seo/internalLinksAssessment" );
const titleKeyword = require( "./assessments/seo/titleKeywordAssessment.js" );
const TitleWidth = require( "./assessments/seo/pageTitleWidthAssessment.js" );
const UrlKeyword = require( "./assessments/seo/urlKeywordAssessment.js" );
const UrlLength = require( "./assessments/seo/urlLengthAssessment.js" );
const urlStopWords = require( "./assessments/seo/urlStopWordsAssessment.js" );
const TopicDensity = require( "./assessments/seo/topicDensityAssessment.js" );
const LargestKeywordDistance = require( "./assessments/seo/largestKeywordDistanceAssessment.js" );

/**
 * Creates the Assessor
 *
 * @param {object} i18n The i18n object used for translations.
 * @param {Object} options The options for this assessor.
 * @param {Object} options.marker The marker to pass the list of marks to.
 *
 * @constructor
 */
const SEOPremiumAssessor = function( i18n, options ) {
	Assessor.call( this, i18n, options );

	this._assessments = [
		introductionKeyword,
		keyphraseLength,
		keywordDensity,
		keywordStopWords,
		metaDescriptionKeyword,
		new MetaDescriptionLength(),
		new SubheadingsKeyword(),
		textCompetingLinks,
		new TextImages(),
		new TextLength(),
		new OutboundLinks(),
		internalLinks,
		titleKeyword,
		new TitleWidth(),
		new UrlKeyword(),
		new UrlLength(),
		urlStopWords,
		new TopicDensity(),
		new LargestKeywordDistance(),
	];
};

require( "util" ).inherits( SEOPremiumAssessor, Assessor );

module.exports = SEOPremiumAssessor;
