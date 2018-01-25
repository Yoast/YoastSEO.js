const addMarksInSentence = require( "../../js/markers/addMarksInSentence" );
const Mark = require( "../../js/values/Mark" );

describe( 'addMarksInSentence', function() {
	it( "should have the same marked sentence as the original", function() {
		let expected = new Mark( {
			original: "A piece of text.",
			marked: "A piece of text.",
		} );
		expect( addMarksInSentence( "A piece of text.", [] ) ).toEqual( expected );
	});

	it( "should mark a part of the text", function() {
		let expected = new Mark( {
			original: "A piece of text.",
			marked: "A piece <yoastmark class='yoast-text-mark'>of</yoastmark> text.",
		} );
		expect( addMarksInSentence( "A piece of text.", ["of"] ) ).toEqual( expected );
	});

	it( "should mark multiple parts of the text", function() {
		let expected = new Mark( {
			original: "A piece of text, with some more added.",
			marked: "A piece <yoastmark class='yoast-text-mark'>of</yoastmark> text, <yoastmark class='yoast-text-mark'>with</yoastmark> some more added.",
		} );
		expect( addMarksInSentence( "A piece of text, with some more added.", ["with", "of"] ) ).toEqual( expected );
	});

	it( "should mark multiple parts of the text, ignoring case for searching but using the original case in the result", function() {
		let expected = new Mark( {
			original: "Of course this is still a piece of text, with some more added.",
			marked: "<yoastmark class='yoast-text-mark'>Of</yoastmark> course this is still a piece <yoastmark class='yoast-text-mark'>of</yoastmark> text, <yoastmark class='yoast-text-mark'>with</yoastmark> some more added.",
		} );
		expect( addMarksInSentence( "Of course this is still a piece of text, with some more added.", ["with", "of"] ) ).toEqual( expected );
	});
});
