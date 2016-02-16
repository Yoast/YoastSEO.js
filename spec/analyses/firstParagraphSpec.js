var firstParagraph = require( "../../js/analyses/findKeywordInFirstParagraph.js" );
var valueObject;

describe( "checks for the keyword in the first paragraph", function(){
	it( "returns the number of matches", function(){
		valueObject = {
			text: "<p>keyword</p>",
			keyword: "keyword"
		};
		expect( firstParagraph( valueObject ) ).toBe( 1 );

		valueObject = {
			text:  "<p>text</p> keyword",
			keyword: "keyword"
		};
		expect( firstParagraph( valueObject ) ).toBe( 0 );
		valueObject = {
			text:  "<p>test</p><p>keyword</p>",
			keyword: "keyword"
		};
		expect( firstParagraph( valueObject ) ).toBe( 0 );
		valueObject = {
			text: "dit is een keyword test \n\n ",
			keyword: "keyword"
		};
		expect( firstParagraph( valueObject ) ).toBe( 1 );
		valueObject = {
			text:  "keyword\n\ntext",
			keyword: "keyword"
		};
		expect( firstParagraph( valueObject ) ).toBe( 1 );
		valueObject = {
			text: "dit is een test \n\n keyword",
			keyword: "keyword"
		};
		expect( firstParagraph( valueObject ) ).toBe( 0 );
		valueObject = {
			text: "<p>keyword</p>",
			keyword: "keyword"
		};
		expect( firstParagraph( valueObject ) ).toBe( 1 );
		valueObject = {
			text: "dit is een test keyword",
			keyword: "keyword"
		};
		expect( firstParagraph( valueObject ) ).toBe( 1 );
		valueObject = {
			text: "<p class='p'>keyword</p>",
			keyword: "keyword"
		};
		expect( firstParagraph( valueObject ) ).toBe( 1 );
	});
});
