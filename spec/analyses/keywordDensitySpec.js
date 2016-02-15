var keywordDensity = require("../../js/analyses/getKeywordDensity.js");
var valueObject = {};

describe("Test for counting the keywordDensity in a text", function(){
	it("returns keywordDensity", function(){
		valueObject.text = "a string of text with the keyword in it, density should be 7.7%";
		valueObject.keyword =  "keyword";
		expect( keywordDensity( valueObject ) ).toBe( "7.7" );

		valueObject.text = "a string of text without the keyword in it, density should be 0%";
		valueObject.keyword =  "empty";
		expect( keywordDensity( valueObject ) ).toBe( "0.0" );

		valueObject.text = "Waltz keepin auf mitz auf keepin äöüß weiner blitz deutsch spitzen. ";
		valueObject.keyword =  "äöüß";
		expect( keywordDensity( valueObject ) ).toBe("9.1");

		valueObject.text = "Lorem ipsum dolor sit amet, key word consectetur key-word adipiscing elit";
		valueObject.keyword =  "key-word";
		expect( keywordDensity( valueObject ) ).toBe("9.1");
	});
});
