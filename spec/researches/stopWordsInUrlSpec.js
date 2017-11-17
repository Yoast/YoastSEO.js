var urlStopwords = require( "../../js/researches/stopWordsInUrl.js" );
var Paper = require( "../../js/values/Paper.js" );

describe( "Checks the URL for stopwords", function() {
	it("returns any English stopwords found", function() {
		expect( urlStopwords( new Paper("Sample", { url: "before-and-after" }) ) ).toEqual( [ "after", "and", "before" ] );
		expect( urlStopwords( new Paper("Sample", { url: "before-after" }) ) ).toEqual( [ "after", "before" ] );
		expect( urlStopwords( new Paper("Sample", { url: "stopword-after" }) ) ).toEqual( [ "after" ] );
		expect( urlStopwords( new Paper("Sample", { url: "stopword" }) ) ).toEqual( [  ] );
		expect( urlStopwords( new Paper("Sample", { url: "" }) ) ).toEqual( [  ] );
	});
	it("returns any Spanish stopwords found", function() {
		expect( urlStopwords( new Paper("Sample", { url: "una-nos-poco", locale: "es_ES" } ) ) ).toEqual( [ "una", "nos", "poco" ] );
		expect( urlStopwords( new Paper("Sample", { url: "una-habra", locale: "es_ES" }) ) ).toEqual( [ "una", "habrá" ] );
		expect( urlStopwords( new Paper("Sample", { url: "una", locale: "es_ES" }) ) ).toEqual( [ "una" ] );
		expect( urlStopwords( new Paper("Sample", { url: "stopword", locale: "es_ES" }) ) ).toEqual( [  ] );
		expect( urlStopwords( new Paper("Sample", { url: "", locale: "es_ES" }) ) ).toEqual( [  ] );
	});
});
