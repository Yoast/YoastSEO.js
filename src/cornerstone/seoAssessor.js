const Assessor = require( "../assessor.js" );
const SEOAssessor = require( "../seoAssessor" );

const IntroductionKeyword = require( "../assessments/seo/introductionKeywordAssessment.js" );
const KeyphraseLength = require( "../assessments/seo/keyphraseLengthAssessment.js" );
const KeywordDensity = require( "../assessments/seo/keywordDensityAssessment.js" );
const MetaDescriptionKeyword = require( "../assessments/seo/metaDescriptionKeywordAssessment.js" );
const MetaDescriptionLength = require( "../assessments/seo/metaDescriptionLengthAssessment.js" );
const SubheadingsKeyword = require( "../assessments/seo/subheadingsKeywordAssessment.js" );
const TextCompetingLinks = require( "../assessments/seo/textCompetingLinksAssessment.js" );
const TextImages = require( "../assessments/seo/textImagesAssessment.js" );
const TextLength = require( "../assessments/seo/textLengthAssessment.js" );
const OutboundLinks = require( "../assessments/seo/outboundLinksAssessment.js" );
const InternalLinks = require( "../assessments/seo/internalLinksAssessment" );
const TitleKeyword = require( "../assessments/seo/titleKeywordAssessment.js" );
const TitleWidth = require( "../assessments/seo/pageTitleWidthAssessment.js" );
const UrlKeyword = require( "../assessments/seo/urlKeywordAssessment.js" );
const SingleH1Assessment = require( "../assessments/seo/singleH1Assessment.js" );

/**
 * Creates the Assessor
 *
 * @param {Object} i18n The i18n object used for translations.
 * @param {Object} options The options for this assessor.
 * @param {Object} options.marker The marker to pass the list of marks to.
 *
 * @constructor
 */
let CornerstoneSEOAssessor = function( i18n, options ) {
	Assessor.call( this, i18n, options );

	this._assessments = [
		new IntroductionKeyword(),
		new KeyphraseLength(),
		new KeywordDensity(),
		new MetaDescriptionKeyword(),
		new MetaDescriptionLength( {
			scores:	{
				tooLong: 3,
				tooShort: 3,
			},
		} ),
		new SubheadingsKeyword(
			{
				scores: {
					noMatches: 3,
					oneMatch: 6,
					multipleMatches: 9,
				},
			}
		),
		new TextCompetingLinks(),
		new TextImages( {
			scores: {
				noImages: 3,
				withAltNonKeyword: 3,
				withAlt: 3,
				noAlt: 3,
			},
		} ),
		new TextLength( {
			recommendedMinimum: 900,
			slightlyBelowMinimum: 400,
			belowMinimum: 300,
			farBelowMinimum: 0,

			scores: {
				belowMinimum: -20,
				farBelowMinimum: -20,
			},
		} ),
		new OutboundLinks( {
			scores: {
				noLinks: 3,
			},
		} ),
		new InternalLinks(),
		new TitleKeyword(),
		new TitleWidth(
			{
				scores: {
					widthTooShort: 3,
					widthTooLong: 3,
				},
			}
		),
		new UrlKeyword(
			{
				scores: {
					noKeywordInUrl: 3,
				},
			}
		),
		new SingleH1Assessment(),
	];
};

require( "util" ).inherits( CornerstoneSEOAssessor, SEOAssessor );

module.exports = CornerstoneSEOAssessor;
