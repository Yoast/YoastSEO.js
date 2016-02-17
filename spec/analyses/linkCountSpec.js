var linkCount = require( "../../js/analyses/getLinkStatistics.js" );
var foundLinks;
var valueObject;

describe("Tests a string for anchors and analyzes these", function(){
	it("returns an object with all linktypes found", function(){
		valueObject = {
			text: "string <a href='http://yoast.com'>link</a>",
			keyword: "test",
			baseUrl: "http://yoast.com"
		};

		foundLinks = linkCount( valueObject );
		expect( foundLinks.total ).toBe( 1 );
		expect( foundLinks.internalTotal ).toBe( 1 );
		expect( foundLinks.externalTotal ).toBe( 0 );
		expect( foundLinks.totalKeyword ).toBe( 0 );

		valueObject = {
			text: "string <a href='http://yoast.com'>link</a>, <a href='http://example.com'>link</a>",
			keyword: "link",
			baseUrl: "http://yoast.com"
		};

		foundLinks = linkCount( valueObject );
		expect( foundLinks.total ).toBe( 2 );
		expect( foundLinks.internalTotal ).toBe( 1 );
		expect( foundLinks.externalTotal ).toBe( 1 );
		expect( foundLinks.totalKeyword ).toBe( 2 );

		valueObject = {
			text:  "string <a href='ftp://yoast.com'>link</a>, <a href='http://example.com' rel='nofollow'>link</a>",
			keyword: "link",
			baseUrl: "http://yoast.com"
		};

		foundLinks = linkCount( valueObject );
		expect( foundLinks.total ).toBe( 2 );
		expect( foundLinks.otherTotal ).toBe( 1 );
		expect( foundLinks.externalNofollow ).toBe( 1 );
	});

	it( "should return all special types", function() {
		valueObject = {
			text: "hello",
			keyword: "test",
			baseUrl: "http://example.org"
		};

		foundLinks = linkCount( valueObject );

		expect( foundLinks ).toEqual({
			total: 0,
			totalNaKeyword: 0,
			totalKeyword: 0,
			internalTotal: 0,
			internalDofollow: 0,
			internalNofollow: 0,
			externalTotal: 0,
			externalDofollow: 0,
			externalNofollow: 0,
			otherTotal: 0,
			otherDofollow: 0,
			otherNofollow: 0
		});

		valueObject = {
			text: "<a href='http://example.org/test123'>test123</a>" +
			"<a href='http://example.org/test123' rel='nofollow'>test123</a>" +
			"<a href='http://example.org/test123'>keyword</a>" +
			"<a href='http://yoast.com' rel='nofollow'>test123</a>" +
			"<a href='http://yoast.com'>test123</a>" +
			"<a href='http://yoast.com'>keyword</a>" +
			"<a href='#blaat'>blaat</a>" +
			"<a href='#bar' rel='nofollow'>bar</a>'" +
			"" +
			"" +
			"",
			keyword: "keyword",
			baseUrl: "http://example.org"
		};

		var foundLinks = linkCount( valueObject );

		expect( foundLinks ).toEqual({
			total: 8,
			totalNaKeyword: 0,
			totalKeyword: 2,
			internalTotal: 3,
			internalDofollow: 2,
			internalNofollow: 1,
			externalTotal: 3,
			externalDofollow: 2,
			externalNofollow: 1,
			otherTotal: 2,
			otherDofollow: 1,
			otherNofollow: 1
		});
	});
});
