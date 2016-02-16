var urlKeyword = require("../../js/analyses/countKeywordInUrl.js");
var valueObject;
describe("test to check url for keyword", function(){
	it("returns matches", function(){
		valueObject = {
			url: "url-with-keyword",
			keyword: "keyword"
		};
		expect( urlKeyword( valueObject ) ).toBe(1);
		valueObject = {
			url: "url-with-key-word",
			keyword: "key word"
		};
		expect( urlKeyword( valueObject ) ).toBe(1);
		valueObject = {
			url: "url-with-key-word",
			keyword: "keyword"
		};
		expect( urlKeyword( valueObject ) ).toBe(0);
		valueObject = {
			url: "url-with-key-word",
			keyword: "këyword"
		};
		expect( urlKeyword( valueObject ) ).toBe(0);
		valueObject = {
			url: "url-with-yoast-seo-3",
			keyword: "yoast seo 3"
		};
		expect( urlKeyword( valueObject ) ).toBe(1);
		valueObject = {
			url: "yoasts-analyzer",
			keyword: "Yoast's analyzer"
		};
		expect( urlKeyword( valueObject ) ).toBe( 1 );
	});
});
