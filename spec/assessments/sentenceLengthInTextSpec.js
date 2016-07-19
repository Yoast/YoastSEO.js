var sentenceLengthInTextAssessment = require( "../../js/assessments/sentenceLengthInTextAssessment" );
var Paper = require( "../../js/values/Paper.js" );
var Factory = require( "../helpers/factory.js" );
var i18n = Factory.buildJed();



describe( "An assessment for sentence length", function(){
	it( "returns the score for all short sentences", function(){
		var mockPaper = new Paper();
		var assessment = sentenceLengthInTextAssessment.getResult( mockPaper, Factory.buildMockResearcher( [
			{ sentence: "", sentenceLength: 1 },
			{ sentence: "", sentenceLength: 1 },
			{ sentence: "", sentenceLength: 1 },
			{ sentence: "", sentenceLength: 1 }
		] ), i18n );

		expect( assessment.hasScore()).toBe( true );
		expect( assessment.getScore() ).toEqual( 9 );
		expect( assessment.getText() ).toEqual ( "0% of the sentences contain <a href='https://yoa.st/short-sentences' target='_blank'>more than 20 words</a>, " +
			"which is less than or equal to the recommended maximum of 25%." );
		expect( assessment.hasMarks() ).toBe( false );
	} );
	it( "returns the score for 50% long sentences", function(){
		mockPaper = new Paper();
		assessment = sentenceLengthInTextAssessment.getResult( mockPaper, Factory.buildMockResearcher( [
			{ sentence: "", sentenceLength: 30 },
			{ sentence: "", sentenceLength: 1 }
		] ), i18n );

		expect( assessment.hasScore()).toBe( true );
		expect( assessment.getScore() ).toEqual( 3 );
		expect( assessment.getText() ).toEqual ( "50% of the sentences contain <a href='https://yoa.st/short-sentences' target='_blank'>more than 20 words</a>, " +
			"which is more than the recommended maximum of 25%. Try to shorten the sentences." );
		expect( assessment.hasMarks() ).toBe( true );
	} );

	it( "returns the score for 100% long sentences", function(){
		mockPaper = new Paper();
		assessment = sentenceLengthInTextAssessment.getResult( mockPaper, Factory.buildMockResearcher( [
			{ sentence: "", sentenceLength: 30 }
		] ), i18n );

		expect( assessment.hasScore()).toBe( true );
		expect( assessment.getScore() ).toEqual( 3 );
		expect( assessment.getText() ).toEqual ( "100% of the sentences contain <a href='https://yoa.st/short-sentences' target='_blank'>more than 20 words</a>, " +
			"which is more than the recommended maximum of 25%. Try to shorten the sentences." );
		expect( assessment.hasMarks() ).toBe( true );
	} );
	it( "returns the score for 25% long sentences", function(){
		mockPaper = new Paper();
		assessment = sentenceLengthInTextAssessment.getResult( mockPaper, Factory.buildMockResearcher( [
			{ sentence: "", sentenceLength: 30 },
			{ sentence: "", sentenceLength: 1 },
			{ sentence: "", sentenceLength: 1 },
			{ sentence: "", sentenceLength: 1 }
		] ), i18n );

		expect( assessment.hasScore()).toBe( true );
		expect( assessment.getScore() ).toEqual( 9 );
		expect( assessment.getText() ).toEqual ( "25% of the sentences contain <a href='https://yoa.st/short-sentences' target='_blank'>more than 20 words</a>, " +
			"which is less than or equal to the recommended maximum of 25%." );
		expect( assessment.hasMarks() ).toBe( true );
	} );
	it( "returns the score for 30% long sentences", function(){
		mockPaper = new Paper();
		assessment = sentenceLengthInTextAssessment.getResult( mockPaper, Factory.buildMockResearcher( [
			{ sentence: "", sentenceLength: 30 },
			{ sentence: "", sentenceLength: 30 },
			{ sentence: "", sentenceLength: 30 },
			{ sentence: "", sentenceLength: 1 },
			{ sentence: "", sentenceLength: 1 },
			{ sentence: "", sentenceLength: 1 },
			{ sentence: "", sentenceLength: 1 },
			{ sentence: "", sentenceLength: 1 },
			{ sentence: "", sentenceLength: 1 },
			{ sentence: "", sentenceLength: 1 }
		] ), i18n );

		expect( assessment.hasScore()).toBe( true );
		expect( assessment.getScore() ).toEqual( 6 );
		expect( assessment.getText() ).toEqual ( "30% of the sentences contain <a href='https://yoa.st/short-sentences' target='_blank'>more than 20 words</a>, " +
			"which is more than the recommended maximum of 25%. Try to shorten the sentences." )
		expect( assessment.hasMarks() ).toBe( true );
	} );
	it( "is not applicable for empty papers", function(){
		mockPaper = new Paper();
		assessment = sentenceLengthInTextAssessment.isApplicable( mockPaper );
		expect( assessment ).toBe( false );
	} );
} );
