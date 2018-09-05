import KeyphraseLengthAssessment from "../../src/assessments/seo/KeyphraseLengthAssessment";
const Paper = require( "../../src/values/Paper.js" );

const factory = require( "../helpers/factory.js" );
const i18n = factory.buildJed();

describe( "the keyphrase length assessment", function() {
	it( "should assess a paper without a keyword as extremely bad", function() {
		const paper = new Paper();
		const researcher = factory.buildMockResearcher( 0 );

		const result = new KeyphraseLengthAssessment().getResult( paper, researcher, i18n );

		expect( result.getScore() ).toEqual( -999 );
		expect( result.getText() ).toEqual( "No <a href='https://yoa.st/2pdd' target='_blank'>focus keyword</a> was set for this page. " +
		   "If you do not set a focus keyword, no score can be calculated." );
	} );

	it( "should assess a paper with a keyphrase that's too long as bad", function() {
		const paper = new Paper( "", { keyword: "keyword" } );
		const researcher = factory.buildMockResearcher( 11 );

		const result = new KeyphraseLengthAssessment().getResult( paper, researcher, i18n );

		expect( result.getScore() ).toEqual( 3 );
		expect( result.getText() ).toEqual( "Your <a href='https://yoa.st/2pd' target='_blank'>keyphrase</a> is 11 " +
			"words long. That's way more than the recommended maximum of 4 words. Make the keyphrase shorter." );
	} );

	it( "should assess a paper with a keyphrase that's the correct length", function() {
		const paper = new Paper( "", { keyword: "keyword" } );
		const researcher = factory.buildMockResearcher( 3 );

		const result = new KeyphraseLengthAssessment().getResult( paper, researcher, i18n );

		expect( result.getScore() ).toEqual( 9 );
		expect( result.getText() ).toEqual( "Your <a href='https://yoa.st/2pdd' target='_blank'>keyphrase</a> has a nice length." );
	} );

	it( "should assess a paper with a keyphrase that's a little longer than the correct length", function() {
		const paper = new Paper( "", { keyword: "keyword keyword keyword keyword keyword" } );
		const researcher = factory.buildMockResearcher( 5 );

		const result = new KeyphraseLengthAssessment().getResult( paper, researcher, i18n );

		expect( result.getScore() ).toEqual( 6 );
		expect( result.getText() ).toEqual( "Your <a href='https://yoa.st/2pd' target='_blank'>keyphrase</a> is " +
			"5 words long. That's more than the recommended maximum of 4 words. You might want to make the keyphrase a bit shorter." );
	} );
} );
