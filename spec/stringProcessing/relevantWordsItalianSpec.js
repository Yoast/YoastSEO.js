import WordCombination from "../../src/values/WordCombination";
import relevantWords from "../../src/stringProcessing/relevantWords";
import italianFunctionWordsFactory from "../../src/researches/italian/functionWords.js";

let getRelevantWords = relevantWords.getRelevantWords;
let italianFunctionWords = italianFunctionWordsFactory().all;

describe( "gets Italian word combinations", function() {
	it( "returns word combinations", function() {
		let input = "Le ultime elezioni sono oggetto dell’inchiesta della procura di Caltanissetta." +
			" Le ultime elezioni sono oggetto dell’inchiesta della procura di Caltanissetta." +
			" Le ultime elezioni sono oggetto dell’inchiesta della procura di Caltanissetta." +
			" Le ultime elezioni sono oggetto dell’inchiesta della procura di Caltanissetta." +
			" Le ultime elezioni sono oggetto dell’inchiesta della procura di Caltanissetta." +
			" Le ultime elezioni sono oggetto dell’inchiesta della procura di Caltanissetta." +
			" Le ultime elezioni sono oggetto dell’inchiesta della procura di Caltanissetta." +
			" Le ultime elezioni sono oggetto dell’inchiesta della procura di Caltanissetta." +
			" Le ultime elezioni sono oggetto dell’inchiesta della procura di Caltanissetta." +
			" Le ultime elezioni sono oggetto dell’inchiesta della procura di Caltanissetta." +
			" Le ultime elezioni sono oggetto dell’inchiesta della procura di Caltanissetta.";
		let expected = [
			new WordCombination( [ "dell'inchiesta", "della", "procura", "di", "caltanissetta" ], 11, italianFunctionWords ),
			new WordCombination( [ "dell'inchiesta", "della", "procura" ], 11, italianFunctionWords ),
			new WordCombination( [ "procura", "di", "caltanissetta" ], 11, italianFunctionWords ),
			new WordCombination( [ "elezioni" ], 11, italianFunctionWords ),
			new WordCombination( [ "dell'inchiesta" ], 11, italianFunctionWords ),
			new WordCombination( [ "procura" ], 11, italianFunctionWords ),
			new WordCombination( [ "caltanissetta" ], 11, italianFunctionWords ),
		];

		// Make sure our words aren't filtered by density.
		spyOn( WordCombination.prototype, "getDensity" ).and.returnValue( 0.01 );

		let words = getRelevantWords( input, "it_IT" );

		words.forEach( function( word ) {
			delete( word._relevantWords );
		} );

		expect( words ).toEqual( expected );
	} );
} );

