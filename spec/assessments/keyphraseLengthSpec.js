var keyphraseLengthAssessment = require( "../../js/assessments/seo/keyphraseLengthAssessment.js" );
var Paper = require( "../../js/values/Paper.js" );

var factory = require( "../helpers/factory.js" );
var i18n = factory.buildJed();

const keyphraseAssessment = new keyphraseLengthAssessment();

describe( "the keyphrase length assessment", function() {
	it( "should assess a paper without a keyword as extremely bad", function() {
		var paper = new Paper();
		var researcher = factory.buildMockResearcher( 0 );

		var result = keyphraseAssessment.getResult( paper, researcher, i18n );

		expect( result.getScore() ).toEqual( -999 );
		expect( result.getText() ).toEqual( "No focus keyword was set for this page. " +
			"If you do not set a focus keyword, no score can be calculated." );
	} );

	it( "should assess a paper with a keyphrase that's too long (11 words) as bad", function() {
		var paper = new Paper( "", { keyword: "keyword" } );
		var researcher = factory.buildMockResearcher( 11 );

		var result = keyphraseAssessment.getResult( paper, researcher, i18n );

		expect( result.getScore() ).toEqual( 3 );
		expect( result.getText() ).toEqual( "Your keyphrase is 11 words long. That's way more than the recommended maximum of 4 words. " +
			"Make the keyphrase shorter." );
	} );

	it( "should assess a paper with a keyphrase that's a little too long (6 words) as 'can be improved' ", function() {
		var paper = new Paper( "", { keyword: "keyword" } );
		var researcher = factory.buildMockResearcher( 6 );

		var result = keyphraseAssessment.getResult( paper, researcher, i18n );

		expect( result.getScore() ).toEqual( 6 );
		expect( result.getText() ).toEqual( "Your keyphrase is 6 words long. That's more than the recommended maximum of 4 words. " +
			"You might want to make the keyphrase a bit shorter." );
	} );

	it( "should assess a paper with a keyphrase that's just the right length (3 words) as 'OK' ", function() {
		var paper = new Paper( "", { keyword: "keyword" } );
		var researcher = factory.buildMockResearcher( 3 );

		var result = keyphraseAssessment.getResult( paper, researcher, i18n );

		expect( result.getScore() ).toEqual( 9 );
		expect( result.getText() ).toEqual( "Your keyphrase has a nice length." );
	} );
} );
