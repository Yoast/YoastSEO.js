var urlLength = require( "../../js/analyses/isUrlTooLong.js" );
var valueObject;
describe("Checks length of Url", function(){
	it("returns boolean", function(){
		valueObject = {
			url: "new-very-very-very-very-very-very-lengthy-url",
			keyword: "keyword"
		};
		expect( urlLength( valueObject)).toBe(true);
		valueObject = {
			url: "url",
			keyword: "keyword"
		};
		expect( urlLength( valueObject )).toBe(false);
	});
});
