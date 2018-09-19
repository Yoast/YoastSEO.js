import wordComplexity from "../../src/researches/getWordComplexity.js";
import Paper from "../../src/values/Paper";

describe( "A function for getting the syllables per word",  function() {
	it( "returns an array with the number of syllables per word", function() {
		var mockPaper = new Paper( "word" );

		expect( wordComplexity( mockPaper )[ 0 ].words[ 0 ].complexity ).toBe( 1 );

		mockPaper = new Paper( "double" );
		expect( wordComplexity( mockPaper )[ 0 ].words[ 0 ].complexity ).toBe( 2 );

		mockPaper = new Paper( "strawberry cake" );
		expect( wordComplexity( mockPaper )[ 0 ].words[ 0 ].complexity ).toBe( 3 );
		expect( wordComplexity( mockPaper )[ 0 ].words[ 1 ].complexity ).toBe( 1 );
	} );
} );
