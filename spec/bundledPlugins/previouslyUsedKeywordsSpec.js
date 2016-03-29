var PreviouslyUsedKeywords = require( "../../js/bundledPlugins/previouslyUsedKeywords.js" );

var usedKeywords = { "keyword": [1], "test": [2,3,4] };
var Paper = require( "../../js/values/Paper.js" );

var Factory = require( "../helpers/factory.js" );
var i18n = Factory.buildJed();

var app = {
	i18n: i18n,
	paper: new Paper( "text", { keyword: "keyword"} )
};

var searchUrl =  "http://search?{keyword}";
var postUrl = "http://post?{id}";

describe( "checks for keyword doubles", function(){
	it("returns array with keyword", function(){
		var plugin = new PreviouslyUsedKeywords( app, usedKeywords, searchUrl, postUrl );

		expect( plugin.scoreAssessment( 1, 1, "keyword" ).score ).toBe( 6 );
		expect( plugin.scoreAssessment( 1, 1, "keyword" ).text ).toBe( "You've used this focus keyword <a href='http://post?1'>once before</a>, " +
			"be sure to make very clear which URL on your site is the most important for this keyword." );

		expect( plugin.scoreAssessment( 2, 0, "test" ).score ).toBe( 1 );
		expect( plugin.scoreAssessment( 2, 0, "test" ).text ).toBe( "You've used this focus keyword <a href='http://search?test'>2 times before</a>, it's probably a good idea to read <a href='https://yoast.com/cornerstone-content-rank/' target='new'>this post on cornerstone content</a> and improve your keyword strategy." );

		expect( plugin.scoreAssessment( 0, 0, "bla").score ).toBe( 9 );
		expect( plugin.scoreAssessment( 0, 0, "bla").text ).toBe( "You've never used this focus keyword before, very good." );

	});
});