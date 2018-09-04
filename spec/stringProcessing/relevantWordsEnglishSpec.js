let WordCombination = require( "../../src/values/WordCombination" );
let relevantWords = require( "../../src/stringProcessing/relevantWords" );
let getRelevantWords = relevantWords.getRelevantWords;
let englishFunctionWords = require( "../../src/researches/english/functionWords.js" )().all;

describe( "gets English word combinations", function() {
	it( "returns word combinations", function() {
		let input = "Here are a ton of syllables. Here are a ton of syllables. Here are a ton of syllables. Here are a ton of syllables. Here are a ton of syllables." +
			" Here are a ton of syllables. Here are a ton of syllables. Here are a ton of syllables. Here are a ton of syllables. Here are a ton of syllables." +
			" Here are a ton of syllables. Here are a ton of syllables. Here are a ton of syllables. Here are a ton of syllables. Here are a ton of syllables." +
			" Here are a ton of syllables. Here are a ton of syllables. Here are a ton of syllables. Here are a ton of syllables. Here are a ton of syllables." +
			" Here are a ton of syllables. Here are a ton of syllables. Here are a ton of syllables. Here are a ton of syllables. Here are a ton of syllables." +
			" Here are a ton of syllables. Here are a ton of syllables. Here are a ton of syllables. Here are a ton of syllables. Here are a ton of syllables." +
			" Here are a ton of syllables. Here are a ton of syllables. Here are a ton of syllables. Here are a ton of syllables. Here are a ton of syllables." +
			" Here are a ton of syllables. Here are a ton of syllables. ";
		let expected = [
			new WordCombination( [ "syllables" ], 37, englishFunctionWords ),
		];

		// Make sure our words aren't filtered by density.
		spyOn( WordCombination.prototype, "getDensity" ).and.returnValue( 0.01 );

		let words = getRelevantWords( input, "en_US" );

		words.forEach( function( word ) {
			delete( word._relevantWords );
		} );

		expect( words ).toEqual( expected );
	} );
} );

