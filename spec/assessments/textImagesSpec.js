const ImageCountAssessment = require( "../../js/assessments/seo/textImagesAssessment" );
const Paper = require( "../../js/values/Paper.js" );
const Factory = require( "../helpers/factory.js" );
const i18n = Factory.buildJed();

let imageCountAssessment = new ImageCountAssessment();

describe( "An image count assessment", function() {
	it( "assesses no images", function() {
		const mockPaper = new Paper( "sample" );

		const assessment = imageCountAssessment.getResult( mockPaper, Factory.buildMockResearcher( 0 ), i18n );

		expect( assessment.getScore() ).toEqual( 3 );
		expect( assessment.getText() ).toEqual( "No images appear in this page, consider adding some as appropriate." );
	} );

	it( "assesses a single image, without a keyword and alt-tag set", function() {
		const mockPaper = new Paper( "These are just five words <img src='image.jpg' />" );

		const assessment = imageCountAssessment.getResult( mockPaper, Factory.buildMockResearcher( {
			noAlt: 1,
			withAlt: 0,
			withAltKeyword: 0,
			withAltNonKeyword: 0,
		} ), i18n );

		expect( assessment.getScore() ).toEqual( 6 );
		expect( assessment.getText() ).toEqual( "The images on this page are missing alt attributes." );
	} );

	it( "assesses a single image, without a keyword, but with an alt-tag set", function() {
		const mockPaper = new Paper( "These are just five words <img src='image.jpg' alt='image' />" );

		const assessment = imageCountAssessment.getResult( mockPaper, Factory.buildMockResearcher( {
			noAlt: 0,
			withAlt: 1,
			withAltKeyword: 0,
			withAltNonKeyword: 0,
		} ), i18n );

		expect( assessment.getScore() ).toEqual( 6 );
		expect( assessment.getText() ).toEqual( "The images on this page contain alt attributes. Once you've set a focus keyword, also include the keyword where appropriate." );
	} );

	it( "assesses a single image, with a keyword and alt-tag set, but with a non-keyword alt-tag", function() {
		const mockPaper = new Paper( "These are just five words <img src='image.jpg' alt='keyword' />", {
			keyword: "Sample",
		} );

		const assessment = imageCountAssessment.getResult( mockPaper, Factory.buildMockResearcher( {
			altTagCount: {
				noAlt: 0,
				withAlt: 0,
				withAltKeyword: 0,
				withAltNonKeyword: 1,
			},
			imageCount: 1,
		}, true ), i18n );

		expect( assessment.getScore() ).toEqual( 6 );
		expect( assessment.getText() ).toEqual( "The images on this page do not have alt attributes containing the focus keyword." );
	} );

	it( "assesses a single image, with a keyword and alt-tag set to keyword", function() {
		const mockPaper = new Paper( "These are just five words <img src='image.jpg' alt='sample' />", {
			keyword: "Sample",
		} );

		const assessment = imageCountAssessment.getResult( mockPaper, Factory.buildMockResearcher( {
			altTagCount: {
				noAlt: 0,
				withAlt: 0,
				withAltKeyword: 1,
				withAltNonKeyword: 0,
			},
			imageCount: 1,
		}, true ), i18n );

		expect( assessment.getScore() ).toEqual( 9 );
	} );

	it( "assesses a single image, with a keyword and alt-tag set to keyword for 1 of 2 images", function() {
		const mockPaper = new Paper( "These are just five words <img src='image.jpg' alt='sample' />", {
			keyword: "Sample",
		}, true );

		const assessment = imageCountAssessment.getResult( mockPaper, Factory.buildMockResearcher( {
			altTagCount: {
				noAlt: 0,
				withAlt: 0,
				withAltKeyword: 1,
				withAltNonKeyword: 1,
			},
			imageCount: 1,
		}, true ), i18n );

		expect( assessment.getScore() ).toEqual( 9 );
	} );

	it( "assesses a single image, with a keyword and alt-tag set to keyword for 1 of 2 images", function() {
		const mockPaper = new Paper( "These are just five words <img src='image.jpg' alt='sample' />", {
			keyword: "Sample",
		} );

		const assessment = imageCountAssessment.getResult( mockPaper, Factory.buildMockResearcher( {
			altTagCount: {
				noAlt: 4,
				withAlt: 0,
				withAltKeyword: 1,
				withAltNonKeyword: 1,
			},
			imageCount: 1,
		}, true ), i18n );

		expect( assessment.getScore() ).toEqual( 9 );
	} );
} );
