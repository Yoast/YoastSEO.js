import Researcher from "../../src/researcher";
import morphologyData from "../../premium-configuration/data/morphologyData.json";
import keyphraseLength from "../../src/researches/keyphraseLength.js";
import Paper from "../../src/values/Paper.js";

describe( "the keyphrase length research", function() {
	it( "should count the words in the input", function() {
		const paper = new Paper( "", { keyword: "word word" } );
		const researcher = new Researcher( paper );
		researcher.addResearchData( "morphology", morphologyData );

		const result = keyphraseLength( paper, researcher );

		expect( result ).toBe( 2 );
	} );
} );

describe( "the keyphrase length research", function() {
	it( "should count the words in the input and filters function words", function() {
		const paper = new Paper( "", { keyword: "word word the word" } );
		const researcher = new Researcher( paper );
		researcher.addResearchData( "morphology", morphologyData );

		const result = keyphraseLength( paper, researcher );

		expect( result ).toBe( 3 );
	} );
} );

describe( "the keyphrase length research", function() {
	it( "should count the words in the input and filters function words", function() {
		const paper = new Paper( "", { keyword: "mot mot le mot", locale: "fr_FR" } );
		const researcher = new Researcher( paper );
		researcher.addResearchData( "morphology", morphologyData );

		const result = keyphraseLength( paper, researcher );

		expect( result ).toBe( 3 );
	} );
} );

describe( "the keyphrase length research for empty keyword", function() {
	it( "should count the words in the input", function() {
		const paper = new Paper( "", { keyword: "" } );
		const researcher = new Researcher( paper );
		researcher.addResearchData( "morphology", morphologyData );

		const result = keyphraseLength( paper, researcher );

		expect( result ).toBe( 0 );
	} );
} );
