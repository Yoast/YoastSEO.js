let WordCombination = require( "../../src/values/WordCombination" );
let relevantWords = require( "../../src/stringProcessing/relevantWords" );
let getRelevantWords = relevantWords.getRelevantWords;
let germanFunctionWords = require( "../../src/researches/german/functionWords.js" )().all;

describe( "gets German word combinations", function() {
	it( "returns word combinations", function() {
		let input = "Probieren geht über Studieren. Probieren geht über Studieren. Probieren geht über Studieren. Probieren geht über Studieren." +
			" Probieren geht über Studieren. Probieren geht über Studieren. Probieren geht über Studieren. Probieren geht über Studieren." +
			" Probieren geht über Studieren. Probieren geht über Studieren. Probieren geht über Studieren. Probieren geht über Studieren." +
			" Probieren geht über Studieren. Probieren geht über Studieren. Probieren geht über Studieren. Probieren geht über Studieren." +
			" Probieren geht über Studieren. Probieren geht über Studieren. Probieren geht über Studieren. Probieren geht über Studieren." +
			" Probieren geht über Studieren. Probieren geht über Studieren. Probieren geht über Studieren. Probieren geht über Studieren." +
			" Probieren geht über Studieren. Probieren geht über Studieren. Probieren geht über Studieren. Probieren geht über Studieren." +
			" Probieren geht über Studieren. Probieren geht über Studieren. Probieren geht über Studieren. Probieren geht über Studieren." +
			" Probieren geht über Studieren. Probieren geht über Studieren. Probieren geht über Studieren. Probieren geht über Studieren." +
			" Probieren geht über Studieren. Probieren geht über Studieren. Probieren geht über Studieren. Probieren geht über Studieren." +
			" Probieren geht über Studieren. Probieren geht über Studieren. Probieren geht über Studieren. Probieren geht über Studieren." +
			" Probieren geht über Studieren. Probieren geht über Studieren. Probieren geht über Studieren.  Probieren geht über Studieren.";
		let expected = [
			new WordCombination( [ "probieren" ], 48, germanFunctionWords ),
			new WordCombination( [ "studieren" ], 48, germanFunctionWords ),
		];

		// Make sure our words aren't filtered by density.
		spyOn( WordCombination.prototype, "getDensity" ).and.returnValue( 0.01 );

		let words = getRelevantWords( input, "de_DE" );

		words.forEach( function( word ) {
			delete( word._relevantWords );
		} );

		expect( words ).toEqual( expected );
	} );
} );

