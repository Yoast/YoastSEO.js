var h1s = require( "../../js/researches/h1s.js" );
var Paper = require( "../../js/values/Paper.js" );

describe( "gets all H1s in the text", function() {
	it( "should return empty when there is no H1", function() {
		var mockPaper = new Paper( "some content<h2>content h2</h2>" );
		expect( h1s( mockPaper ) ).toEqual( [] );
	});

	it( "should return all H1s in the text", function() {

		var mockPaper = new Paper( "<h1>content h1</h1>content outside the h1<h2>content h2</h2>" );

		var h1sInText = h1s( mockPaper );
		var expectations = [
			[ "<h1>content h1</h1>", "1", "content h1" ],
		];

		expectations.forEach( function( expectation, i ) {
			expectation.forEach( function( value, j ) {
				expect( h1sInText[ i ][ j ] ).toBe( value );
			})
		});
	});
} );
