var keywordDistribution = require("../../js/researches/keywordDistribution.js");
var Paper = require( "../../js/values/Paper.js" );

describe("Test for checking the keyword distribution in a text in terms of text percentage", function(){
	it("returns the largest distance when this is the distance between two keywords", function(){
		var mockPaper = new Paper( "a text with the keyword in it and then the keyword appears again", {keyword: "keyword"} );
		expect( keywordDistribution( mockPaper ) ).toBe( 42 );
	});
	it("returns the largest distance when this is the distance between the beginning of the text and the first keyword", function(){
		var mockPaper = new Paper( "a lot of text before the first keyword and again the keyword", {keyword: "keyword"} );
		expect( keywordDistribution( mockPaper ) ).toBe( 52 );
	});
	it("returns the largest distance when this is the distance between the last keyword and the end of the text", function(){
		var mockPaper = new Paper( "a keyword and again the keyword and then there's a lot of text after that", {keyword: "keyword"} );
		expect( keywordDistribution( mockPaper ) ).toBe( 67 );
	});
});