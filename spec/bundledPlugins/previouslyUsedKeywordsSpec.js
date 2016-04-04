var PreviouslyUsedKeywords = require( "../../js/bundledPlugins/previouslyUsedKeywords.js" );

var usedKeywords = { "keyword": [1], "test": [2,3,4] };
var Paper = require( "../../js/values/Paper.js" );

var Factory = require( "../helpers/factory.js" );
var i18n = Factory.buildJed();

var app = {
	paper: new Paper( "text", { keyword: "keyword"} )
};

var searchUrl =  "http://search?{keyword}";
var postUrl = "http://post?{id}";

var args = {
	usedKeywords: usedKeywords,
	searchUrl: searchUrl,
	postUrl: postUrl
};

describe( "checks for keyword doubles", function(){
	it("returns array with keyword", function(){
		var plugin = new PreviouslyUsedKeywords( app, args, i18n );
		expect( plugin.scoreAssessment( {id: 1, count: 1} ).score ).toBe( 6 );
		expect( plugin.scoreAssessment( {id: 1, count: 1} ).text ).toBe( "You've used this focus keyword <a href='http://post?1'>once before</a>, " +
			"be sure to make very clear which URL on your site is the most important for this keyword." );

		expect( plugin.scoreAssessment( {id: 1, count: 2} ).score ).toBe( 1 );
		expect( plugin.scoreAssessment({id: 1, count: 2 } ).text ).toBe( "You've used this focus keyword <a href='http://search?keyword'>2 times before</a>, it's probably a good idea to read <a href='https://yoast.com/cornerstone-content-rank/' target='new'>this post on cornerstone content</a> and improve your keyword strategy." );

		expect( plugin.scoreAssessment( {id: 0, count: 0} ).score ).toBe( 9 );
		expect( plugin.scoreAssessment( {id: 0, count: 0} ).text ).toBe( "You've never used this focus keyword before, very good." );
	});
});

describe( "checks for keyword doubles", function(){
	it("returns array with keyword", function() {
		var plugin = new PreviouslyUsedKeywords(app, undefined, i18n);
		expect( plugin.searchUrl ).toBe( "" );
	})
});

describe( "replaces keyword usage", function(){
	it("adds keywords", function(){

		usedKeywords = undefined;

		args = {
			usedKeywords: usedKeywords,
			searchUrl: searchUrl,
			postUrl: postUrl
		};

		plugin = new PreviouslyUsedKeywords( app, args, i18n );
		expect( plugin.usedKeywords ).not.toBeDefined();
		plugin.updateKeywordUsage(  { "keyword": [1], "test": [2,3,4] } );
		expect( plugin.usedKeywords[ "keyword" ] ).toContain( 1 );
	});
});