var sentenceLengthInDescriptionAssessment = require( "../../js/assessments/sentenceLengthInDescriptionAssessment" );
var Paper = require( "../../js/values/Paper.js" );
var Factory = require( "../helpers/factory.js" );
var i18n = Factory.buildJed();

describe( "An assessment for sentence length", function(){
	it( "returns the score for all short sentences", function(){
		var mockPaper = new Paper();
		var assessment = sentenceLengthInDescriptionAssessment.getResult( mockPaper, Factory.buildMockResearcher( [ 1,1,1,1 ] ), i18n );

		expect( assessment.hasScore()).toBe( true );
		expect( assessment.getScore() ).toEqual( 9 );
		expect( assessment.getText() ).toEqual ( "The meta description contains no sentences over 20 words." );
	} );
	it( "returns the score for 50% long sentences", function(){
		mockPaper = new Paper();
		assessment = sentenceLengthInDescriptionAssessment.getResult( mockPaper, Factory.buildMockResearcher( [ 30, 1 ] ), i18n );

		expect( assessment.hasScore()).toBe( true );
		expect( assessment.getScore() ).toEqual( 3 );
		expect( assessment.getText() ).toEqual ( "The meta description contains 1 sentence over 20 words. Try to shorten this sentence." );
	} );
	it( "returns the score for 100% long sentences", function(){
		mockPaper = new Paper();
		assessment = sentenceLengthInDescriptionAssessment.getResult( mockPaper, Factory.buildMockResearcher( [ 30, 30 ] ), i18n );

		expect( assessment.hasScore()).toBe( true );
		expect( assessment.getScore() ).toEqual( 3 );
		expect( assessment.getText() ).toEqual ( "The meta description contains 2 sentences over 20 words. Try to shorten these sentences." );
	} );
	it( "returns the score for 100% long sentences", function(){
		mockPaper = new Paper();
		assessment = sentenceLengthInDescriptionAssessment.isApplicable( mockPaper );
		expect( assessment ).toBe( false );
	} );
} );
