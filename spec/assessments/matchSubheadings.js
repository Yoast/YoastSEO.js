var matchKeywordAssessment = require( "../../js/assessments/matchSubheadings.js" );
var Paper = require( "../../js/values/Paper.js" );
var Factory = require( "../helpers/factory.js" );
var i18n = Factory.buildJed();

describe( "An assessment for matching keywords in subheadings", function(){
	it( "assesses a string without subheadings", function(){
		var mockPaper = new Paper();
		var assessment = matchKeywordAssessment.getResult( mockPaper, Factory.buildMockResearcher( { count: 0 } ), i18n );

		expect( assessment.getScore() ).toEqual( 7 );
		expect( assessment.getText() ).toEqual ( "No subheading tags (like an H2) appear in the copy." );
	} );
	it( "assesses a string with subheadings without keywords", function(){
		var mockPaper = new Paper();
		var assessment = matchKeywordAssessment.getResult( mockPaper, Factory.buildMockResearcher( { count: 1 } ), i18n );

		expect( assessment.hasScore() ).toEqual( false );
	} );
} );

