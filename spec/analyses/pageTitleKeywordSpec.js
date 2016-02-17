var pageTitleKeyword = require( "../../js/analyses/findKeywordInPageTitle.js" );
var result, valueObject;

describe("Match keywords in string", function(){
	it("returns number of matches and position", function(){
		valueObject = {
			text: "keyword in a string",
			keyword: "keyword"
		};
		result = pageTitleKeyword( valueObject );
		expect( result.matches ).toBe( 1 );
		expect( result.position ).toBe( 0 );

		valueObject = {
			text: "a string with a keyword and another keyword",
			keyword: "keyword"
		};
		result = pageTitleKeyword( valueObject );
		expect( result.matches ).toBe( 2 );
		expect( result.position ).toBe( 16 );

		valueObject = {
			text: "a string with words",
			keyword:  ""
		};
		result = pageTitleKeyword( valueObject );
		expect( result.matches).toBe( 0 );

		valueObject = {
			text: "ст, чтобы проверить нечто Test текст, чтобы ",
			keyword: "нечто"
		};
		result = pageTitleKeyword( valueObject );
		expect( result.matches ).toBe( 1 );

		valueObject = {
			text: "äbc",
			keyword: "äbc"
		};
		result = pageTitleKeyword( valueObject );
		expect( result.matches ).toBe( 1 );

		valueObject = {
			text: "focus-keyword",
			keyword: "focus keyword"
		};
		result = pageTitleKeyword( valueObject );
		expect( result.matches ).toBe( 0 );
	});
});

