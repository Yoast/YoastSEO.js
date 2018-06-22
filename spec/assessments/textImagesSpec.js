
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
			altTagCount: {
				noAlt: 1,
				withAlt: 0,
				withAltKeyword: 0,
				withAltNonKeyword: 0,
			},
			imageCount: 1,
		}, true ), i18n );

		expect( assessment.getScore() ).toEqual( 6 );
		expect( assessment.getText() ).toEqual( "The images on this page are missing alt attributes." );
	} );

	it( "assesses 5 images without a keyword and alt-tag set", function() {
		const mockPaper = new Paper( "<img src='image.jpg' /><img src='image.jpg' /><img src='image.jpg' /><img src='image.jpg' />" +
			"<img src='image.jpg' />" );

		const assessment = imageCountAssessment.getResult( mockPaper, Factory.buildMockResearcher( {
			altTagCount: {
				noAlt: 5,
				withAlt: 0,
				withAltKeyword: 0,
				withAltNonKeyword: 0,
			},
			imageCount: 5,
		}, true ), i18n );

		expect( assessment.getScore() ).toEqual( 6 );
		expect( assessment.getText() ).toEqual( "The images on this page are missing alt attributes." );
	} );

	it( "assesses a single image, without a keyword, but with an alt-tag set", function() {
		const mockPaper = new Paper( "These are just five words <img src='image.jpg' alt='image' />" );

		const assessment = imageCountAssessment.getResult( mockPaper, Factory.buildMockResearcher( {
			altTagCount: {
				noAlt: 0,
				withAlt: 1,
				withAltKeyword: 0,
				withAltNonKeyword: 0,
			},
			imageCount: 1,
		}, true ), i18n );

		expect( assessment.getScore() ).toEqual( 6 );
		expect( assessment.getText() ).toEqual( "The images on this page contain alt attributes. Once you've set a focus keyword, don't forget to include it in alt attributes, where appropriate." );
	} );

	it( "assesses images with too few keyword matches", function() {
		const mockPaper = new Paper( "These are just five words <img src='image.jpg' alt='image' />" );

		const assessment = imageCountAssessment.getResult( mockPaper, Factory.buildMockResearcher( {
			altTagCount: {
				noAlt: 0,
				withAlt: 0,
				withAltKeyword: 1,
				withAltNonKeyword: 5,
			},
			imageCount: 6,
		}, true ), i18n );

		expect( assessment.getScore() ).toEqual( 6 );
		expect( assessment.getText() ).toEqual( "Only 1 out of 6 images on this page contain alt attributes with the focus keyword. " +
			"Where appropriate, try to include the focus keyword in more alt attributes." );
	} );

	it( "assesses a single image, with a keyword and alt-tag set, but with a non-keyword alt-tag", function() {
		const mockPaper = new Paper( "These are just five words <img src='image.jpg' alt='abc' />", {
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

	it( "assesses >5 images, with a keyword and alt-tag set, but with a non-keyword alt-tag", function() {
		const mockPaper = new Paper( "<img src='image.jpg' alt='abc' /><img src='image.jpg' alt='abc' />" +
			"<img src='image.jpg' alt='abc' /><img src='image.jpg' alt='abc' /><img src='image.jpg' alt='abc' />" +
			"<img src='image.jpg' alt='abc' />", {
			keyword: "Sample",
		} );

		const assessment = imageCountAssessment.getResult( mockPaper, Factory.buildMockResearcher( {
			altTagCount: {
				noAlt: 0,
				withAlt: 0,
				withAltKeyword: 0,
				withAltNonKeyword: 6,
			},
			imageCount: 6,
		}, true ), i18n );

		expect( assessment.getScore() ).toEqual( 6 );
		expect( assessment.getText() ).toEqual( "The images on this page do not have alt attributes containing the focus keyword." );
	} );

	it( "assesses a single image, with a keyword and alt-tag set to keyword for 1 of 2 images", function() {
		const mockPaper = new Paper( "These are just five words <img src='image.jpg' alt='sample' />", {
			keyword: "Sample",
		} );

		const assessment = imageCountAssessment.getResult( mockPaper, Factory.buildMockResearcher( {
			altTagCount: {
				noAlt: 0,
				withAlt: 0,
				withAltKeyword: 1,
				withAltNonKeyword: 1,
			},
			imageCount: 2,
		}, true ), i18n );

		expect( assessment.getScore() ).toEqual( 9 );
	} );

	// Good number of matches.
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
		expect( assessment.getText() ).toEqual( "The image on this page contains an alt attribute with the focus keyword." );
	} );

	// Good number of matches.
	it( "assesses exactly 5 images, with a keyword and alt-tag set to keyword for 2 images", function() {
		const mockPaper = new Paper( "These are just five words <img src='image.jpg' alt='sample' />", {
			keyword: "Sample",
		} );

		const assessment = imageCountAssessment.getResult( mockPaper, Factory.buildMockResearcher( {
			altTagCount: {
				noAlt: 0,
				withAlt: 0,
				withAltKeyword: 2,
				withAltNonKeyword: 3,
			},
			imageCount: 5,
		}, true ), i18n );

		expect( assessment.getScore() ).toEqual( 9 );
		expect( assessment.getText() ).toEqual( "2 out of 5 images on this page contain alt attributes with the focus keyword." );
	} );

	// Good number of matches.
	it( "assesses more than 5 images, with a keyword and alt-tag set to keyword for a sufficient number of imags", function() {
		const mockPaper = new Paper( "These are just five words <img src='image.jpg' alt='sample' />", {
			keyword: "Sample",
		} );

		const assessment = imageCountAssessment.getResult( mockPaper, Factory.buildMockResearcher( {
			altTagCount: {
				noAlt: 0,
				withAlt: 0,
				withAltKeyword: 3,
				withAltNonKeyword: 3,
			},
			imageCount: 6,
		}, true ), i18n );

		expect( assessment.getScore() ).toEqual( 9 );
		expect( assessment.getText() ).toEqual( "3 out of 6 images on this page contain alt attributes with the focus keyword." );
	} );

	// Good number of matches.
	it( "assesses 2 images, with a keyword and alt-tag set to keyword for 1 of 2 images", function() {
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
			imageCount: 2,
		}, true ), i18n );

		expect( assessment.getScore() ).toEqual( 9 );
		expect( assessment.getText() ).toEqual( "1 out of 2 images on this page contain alt attributes with the focus keyword." );
	} );

	// Too many keyword matches.
	it( "assesses 6 images, with a keyword and alt-tag set to keyword  5 matches", function() {
		const mockPaper = new Paper( "These are just five words <img src='image.jpg' alt='sample' />", {
			keyword: "Sample",
		}, true );

		const assessment = imageCountAssessment.getResult( mockPaper, Factory.buildMockResearcher( {
			altTagCount: {
				noAlt: 0,
				withAlt: 0,
				withAltKeyword: 5,
				withAltNonKeyword: 1,
			},
			imageCount: 6,
		}, true ), i18n );

		expect( assessment.getScore() ).toEqual( 6 );
		expect( assessment.getText() ).toEqual( "5 out of 6 images on this page contain alt attributes with the focus keyword. " +
			"That's a bit much. Only include the focus keyword when it really fits the image." );
	} );

	it( "is not applicable when the paper is empty", function() {
		const isApplicableResult = imageCountAssessment.isApplicable( new Paper( "" ) );
		expect( isApplicableResult ).toBe( false );
	} );

	it( "is applicable when there is a paper with a text", function() {
		const isApplicableResult = imageCountAssessment.isApplicable( new Paper( "text" ) );
		expect( isApplicableResult ).toBe( true );
	} );
} );
