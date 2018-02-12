const singleH1Assessment = require( "../../js/assessments/seo/singleH1Assessment.js" );
const Paper = require( "../../js/values/Paper.js" );
const Factory = require( "../helpers/factory.js" );
const i18n = Factory.buildJed();

const h1Assessment = new singleH1Assessment();

describe( "An assessment to check whether there is more than one H1 in the text", function() {
	it( "runs the single H1 assessments on the paper", function() {
		let mockPaper = new Paper( "<h1>the title</h1> <h1>not the title</h1> some text" );
		let assessment = h1Assessment.getResult( mockPaper, Factory.buildMockResearcher( [ [ "<h1>the title</h1>", "1", "the title" ],	[ "<h1>not the title</h1>", "1", "not the title" ] ] ), i18n );

		expect( assessment.getScore() ).toEqual( 1 );
		expect( assessment.getText() ).toEqual ( "The body of your text contains more than one H1. Change all H1s in the body of your text to the appropriate heading level." );
	} );

	it( "should not assess a paper with only one H1 in the body", function() {
		let mockPaper = new Paper( "<h1>the title</h1> some text" );
		let assessment = h1Assessment.getResult( mockPaper, Factory.buildMockResearcher( [[ "<h1>the title</h1>", "1", "the title" ] ] ), i18n );

		expect( assessment.getScore() ).toEqual( 0 );
		expect( assessment.getText() ).toEqual( "" );

	} );
} );

describe( "Checks if the assessment is applicable", function() {
	it( "is applicable when there is a paper with a text", function() {
		let mockPaper = new Paper( "text" );
		let assessment = h1Assessment.isApplicable( mockPaper );

		expect( assessment ).toBe( true );
	} );

	it( "is applicable when there is a paper with a text", function() {
		let mockPaper = new Paper( "" );
		let assessment = h1Assessment.isApplicable( mockPaper );

		expect( assessment ).toBe( false );
	} );
} );
