import WordCombination from "../../src/values/WordCombination";
import relevantWords from "../../src/stringProcessing/relevantWords";
import swedishFunctionWordsFactory from "../../src/researches/swedish/functionWords.js";

let getRelevantWords = relevantWords.getRelevantWords;
let swedishFunctionWords = swedishFunctionWordsFactory().all;

describe( "gets Swedish word combinations", function() {
	it( "returns word combinations", function() {
		let input = "Katt, även känd som tamkatt, är ett relativt litet, smygjagande rovdjur i familjen kattdjur och ett" +
			" vanligt sällskapsdjur i stora delar av världen. Katt, även känd som tamkatt, är ett relativt litet, smygjagande " +
			"rovdjur i familjen kattdjur och ett vanligt sällskapsdjur i stora delar av världen. Katt, även känd som tamkatt," +
			" är ett relativt litet, smygjagande rovdjur i familjen kattdjur och ett vanligt sällskapsdjur i stora delar av " +
			"världen. Katt, även känd som tamkatt, är ett relativt litet, smygjagande rovdjur i familjen kattdjur och ett " +
			"vanligt sällskapsdjur i stora delar av världen. Katt, även känd som tamkatt, är ett relativt litet, smygjagande " +
			"rovdjur i familjen kattdjur och ett vanligt sällskapsdjur i stora delar av världen. Katt, även känd som tamkatt," +
			" är ett relativt litet, smygjagande rovdjur i familjen kattdjur och ett vanligt sällskapsdjur i stora delar av " +
			"världen. Katt, även känd som tamkatt, är ett relativt litet, smygjagande rovdjur i familjen kattdjur och ett " +
			"vanligt sällskapsdjur i stora delar av världen. Katt, även känd som tamkatt, är ett relativt litet, smygjagande " +
			"rovdjur i familjen kattdjur och ett vanligt sällskapsdjur i stora delar av världen.";


		let expected = [
			new WordCombination( [ "smygjagande", "rovdjur", "i", "familjen", "kattdjur", "och", "ett", "vanligt",
				"sällskapsdjur" ], 8, swedishFunctionWords ),
			new WordCombination( [ "rovdjur", "i", "familjen", "kattdjur" ], 8, swedishFunctionWords ),
			new WordCombination( [ "känd", "som", "tamkatt" ], 8, swedishFunctionWords ),
			new WordCombination( [ "smygjagande", "rovdjur" ], 8, swedishFunctionWords ),
			new WordCombination( [ "familjen", "kattdjur" ], 8, swedishFunctionWords ),
			new WordCombination( [ "vanligt", "sällskapsdjur" ], 8, swedishFunctionWords ),
			new WordCombination( [ "katt" ], 8, swedishFunctionWords ),
			new WordCombination( [ "känd" ], 8, swedishFunctionWords ),
			new WordCombination( [ "tamkatt" ], 8, swedishFunctionWords ),
			new WordCombination( [ "smygjagande" ], 8, swedishFunctionWords ),
			new WordCombination( [ "rovdjur" ], 8, swedishFunctionWords ),
			new WordCombination( [ "familjen" ], 8, swedishFunctionWords ),
			new WordCombination( [ "kattdjur" ], 8, swedishFunctionWords ),
			new WordCombination( [ "sällskapsdjur" ], 8, swedishFunctionWords ),
			new WordCombination( [ "världen" ], 8, swedishFunctionWords ),
		];

		// Make sure our words aren't filtered by density.
		spyOn( WordCombination.prototype, "getDensity" ).and.returnValue( 0.01 );

		let words = getRelevantWords( input, "sv_SE" );

		words.forEach( function( word ) {
			delete( word._relevantWords );
		} );

		expect( words ).toEqual( expected );
	} );
} );
