var urlStopwords = require( "../../js/analyses/checkUrlForStopwords.js" );
var valueObject = {};
describe( "Checks the URL for stopwords", function(){
	it("returns any stopwords found", function(){
		valueObject.url = "before-and-after";
		expect( urlStopwords( valueObject ) ).toEqual( [ "after", "and", "before" ] );
		valueObject.url = "before-after";
		expect( urlStopwords(valueObject ) ).toEqual( [ "after", "before" ] );
		valueObject.url = "stopword-after";
		expect( urlStopwords( valueObject ) ).toEqual( [ "after" ] );
		valueObject.url = "stopword";
		expect( urlStopwords( valueObject ) ).toEqual( [  ] );
		valueObject.url = "";
		expect( urlStopwords( valueObject ) ).toEqual( [  ] );
	});
});
