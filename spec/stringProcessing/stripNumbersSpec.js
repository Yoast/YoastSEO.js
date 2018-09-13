import stripNumbers from "../../src/stringProcessing/stripNumbers.js";

describe( "function to remove words with only numbers", function() {
	it( "returns a string with only numberonly words removed", function() {
		expect( stripNumbers( "this is a text" ) ).toBe( "this is a text" );
		expect( stripNumbers( "this is a text 1983" ) ).toBe( "this is a text" );
		expect( stripNumbers( "this is a text1234" ) ).toBe( "this is a text1234" );
	} );

	it( "doesn't return a single full stop", function() {
		expect( stripNumbers( "1234." ) ).toBe( "" );
	} );
} );
