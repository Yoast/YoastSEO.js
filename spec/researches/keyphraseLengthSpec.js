import keyphraseLength from "../../src/researches/keyphraseLength.js";
import Paper from "../../src/values/Paper.js";

describe( "the keyphrase length research", function() {
	it( "should count the words in the input", function() {
		var paper = new Paper( "", { keyword: "word word" } );

		var result = keyphraseLength( paper );

		expect( result ).toBe( 2 );
	} );
} );

describe( "the keyphrase length research", function() {
	it( "should count the words in the input", function() {
		var paper = new Paper( "", { keyword: "" } );

		var result = keyphraseLength( paper );

		expect( result ).toBe( 0 );
	} );
} );
