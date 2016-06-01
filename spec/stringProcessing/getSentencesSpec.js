var getSentences = require( "../../js/stringProcessing/getSentences.js" );
describe("Get sentences from text", function(){
	it("returns sentences", function () {
		var sentence = "Hello. How are you? Bye";
		expect( getSentences( sentence ) ).toEqual( ["Hello.","How are you?","Bye"] );
	});
	it("returns sentences with digits", function () {
		var sentence = "Hello. 123 Bye";
		expect( getSentences( sentence ) ).toEqual( [ "Hello.","123 Bye"] );
	});

	it("returns sentences with abbreviations", function () {
		var sentence = "It was a lot. Approx. two hundred";
		expect( getSentences( sentence ) ).toEqual( ["It was a lot.","Approx. two hundred"] );
	});

	it("returns sentences with a ! in it (should not be converted to . )", function () {
		var sentence = "It was a lot. Approx! two hundred";
		expect( getSentences( sentence ) ).toEqual( [ "It was a lot.","Approx! two hundred" ] );
	});

	it( "returns sentences, with :", function() {
		var sentence = "One. Two. Three: Four! Five."
		expect( getSentences( sentence ).length ).toBe ( 5 );
	});

	it("returns sentences with a text with H2 tags", function() {
		var text = "<h2>Four types of comments</h2>" +
			"The comments people leave on blogs can be divided into four types: " +
			"<h2>Positive feedback</h2>" +
			"First, the positive feedback. ";
		expect( getSentences( text ) ).toEqual( ["<h2>Four types of comments</h2>","The comments people leave on blogs can be divided into four types:","<h2>Positive feedback</h2>","First, the positive feedback. "] );
	});

	it( "returns sentences with a text with a bracket", function() {
		var text = "This is a sentence.)With a bracket on the end";
		expect( getSentences( text ) ).toEqual( ["This is a sentence.", ")With a bracket on the end" ] );
	});
	it( "returns sentences with a text with a bracket", function() {
		var text = "This is a sentence.]With a bracket on the end";
		expect( getSentences( text ) ).toEqual( ["This is a sentence.", "]With a bracket on the end" ] );
	})
	it( "returns sentences with a text with a quote", function() {
		var text = "This is a sentence.'With a bracket on the end";
		expect( getSentences( text ) ).toEqual( ["This is a sentence.", "'With a bracket on the end" ] );
	})
});
