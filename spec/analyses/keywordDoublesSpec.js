var keywordDoubles = require( "../../js/analyses/checkForKeywordDoubles.js" );

var usedKeywords = { "keyword": [1], "test": [2,3,4] };
var valueObject = {usedKeywords: usedKeywords};
describe( "checks for keyword doubles", function(){
	it("returns array with keyword", function(){
		valueObject.keyword = "keyword";
		expect( keywordDoubles( valueObject ).count).toBe(1);
		expect( keywordDoubles( valueObject ).id).toBe(1);
		valueObject.keyword = "test";
		expect( keywordDoubles( valueObject ).count).toBe(3);
		expect( keywordDoubles( valueObject ).id).toBe(0);
		valueObject.usedKeywords = [];
		valueObject.keyword = "not-used";
		expect( keywordDoubles( valueObject ).count ).toBe( 0 )
	});
});
