import changePaperFactory from "../specHelpers/paperChanger";

const Paper = require( "../../js/values/Paper" );
const Researcher = require( "../../js/researcher" );

describe( "A function for getting the syllables per word",  function(){
	const researcher = new Researcher( new Paper( "" ) );
	const changePaper = changePaperFactory( researcher );
	const wordComplexity = researcher.getResearch.bind( researcher, "wordComplexity" );

	it( "returns an array with the number of syllables per word", function(){
		changePaper({ text: "word" });

		expect( wordComplexity()[ 0 ].words[ 0 ].complexity ).toBe( 1 );

		changePaper({ text: "double" });
		expect( wordComplexity()[ 0 ].words[ 0 ].complexity ).toBe( 2 );

		changePaper({ text: "strawberry cake" });
		expect( wordComplexity()[ 0 ].words[ 0 ].complexity ).toBe( 3 );
		expect( wordComplexity()[ 0 ].words[ 1 ].complexity ).toBe( 1 );
	} );
} );
