const singleH1Assessment = require( "../../js/assessments/seo/singleH1Assessment.js" );
const Paper = require( "../../js/values/Paper.js" );
const Factory = require( "../helpers/factory.js" );
const i18n = Factory.buildJed();
const Mark = require( "../../js/values/Mark.js" );

const h1Assessment = new singleH1Assessment();

describe( "An assessment to check whether there is more than one H1 in the text", function() {
	it( "returns the default result when the paper doesn't contain an H1", function() {
		let mockPaper = new Paper( "<p>a paragraph</p>" );
		let assessment = h1Assessment.getResult( mockPaper, Factory.buildMockResearcher( [] ), i18n );

		expect( assessment.getScore() ).toEqual( 0 );
		expect( assessment.getText() ).toEqual ( "" );
		expect( assessment.hasScore() ).toEqual ( false );
	} );

	it( "returns the default result when there's an H1 at the beginning of the body", function() {
		let mockPaper = new Paper( "<h1>heading</h1><p>a paragraph</p>" );
		let assessment = h1Assessment.getResult( mockPaper, Factory.buildMockResearcher( [ { tag: "h1", content: "heading", position: 0 } ] ), i18n );

		expect( assessment.getScore() ).toEqual( 0 );
		expect( assessment.getText() ).toEqual ( "" );
		expect( assessment.hasScore() ).toEqual ( false );
	} );

	it( "returns a bad score and appropriate feedback when there is one superfluous (i.e., non-title) H1s in the body of the text", function() {
		let mockPaper = new Paper( "<p>a paragraph</p><h1>heading</h1>" );
		let assessment = h1Assessment.getResult( mockPaper, Factory.buildMockResearcher( [ { tag: "h1", content: "heading", position: 2 } ] ), i18n );

		expect( assessment.getScore() ).toEqual( 1 );
		expect( assessment.getText() ).toEqual ( "Your text should only have one title. " +
			"Change all H1s in your text that aren't your main title to a lower heading level." );
	} );

	it( "returns a bad score and appropriate feedback when there are multiple one superfluous (i.e., non-title) H1s in the body of the text", function() {
		let mockPaper = new Paper( "<p>a paragraph</p><h1>heading 1</h1><p>a paragraph</p><h1>heading 2</h1>" );
		let assessment = h1Assessment.getResult( mockPaper, Factory.buildMockResearcher( [
			{ tag: "h1", content: "heading 1", position: 2 },
			{ tag: "h1", content: "heading 2", position: 4 },
		] ), i18n );

		expect( assessment.getScore() ).toEqual( 1 );
		expect( assessment.getText() ).toEqual ( "Your text should only have one title. " +
			"Change all H1s in your text that aren't your main title to a lower heading level." );
	} );
} );

describe( "A test for marking incorrect H1s in the body", function() {
	it ( "returns markers for incorrect H1s in the body", function() {
		let mockPaper = new Paper( "<p>a paragraph</p><h1>heading</h1>" );
		let assessment = h1Assessment;
		assessment.getResult( mockPaper, Factory.buildMockResearcher( [ { tag: "h1", content: "heading", position: 2 } ] ), i18n );

		let expected = [
			new Mark( { original: "<h1>heading</h1>",
				marked: "<h1><yoastmark class='yoast-text-mark'>heading</yoastmark></h1>" } ),
		];

		expect( assessment.getMarks() ).toEqual( expected );
	} );

	it ( "doesn't return markers for H1s in the first position of the body", function() {
		let mockPaper = new Paper( "<h1>heading</h1><p>a paragraph</p>" );
		let assessment = h1Assessment;
		assessment.getResult( mockPaper, Factory.buildMockResearcher( [ { tag: "h1", content: "heading", position: 0 } ] ), i18n );
		let expected = [];

		expect( assessment.getMarks() ).toEqual( expected );
	} );

	it ( "doesn't return markers when there are no H1s in the body", function() {
		let mockPaper = new Paper( "<p>a paragraph</p>" );
		let assessment = h1Assessment;
		assessment.getResult( mockPaper, Factory.buildMockResearcher( [] ), i18n );
		let expected = [];

		expect( assessment.getMarks() ).toEqual( expected );
	} );
} );

describe( "Checks if the assessment is applicable", function() {
	it( "is applicable when there is a paper with a text", function() {
		let mockPaper = new Paper( "text" );
		let assessment = h1Assessment.isApplicable( mockPaper );

		expect( assessment ).toBe( true );
	} );

	it( "is not applicable when there there is no text", function() {
		let mockPaper = new Paper( "" );
		let assessment = h1Assessment.isApplicable( mockPaper );

		expect( assessment ).toBe( false );
	} );
} );
