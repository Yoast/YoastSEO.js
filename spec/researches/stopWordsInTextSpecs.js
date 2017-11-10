var stopwordsFunction = require( "../../js/researches/stopWordsInText.js" );

describe("a test for finding stopwords from a string", function(){
	it("returns stopwords found in a string", function(){
		expect( stopwordsFunction( "this is a story about...", "en_US" ) ).toContain( "a" );
		expect( stopwordsFunction( "this is a story about...", "en_US" ) ).toContain( "about" );
		expect( stopwordsFunction( "this is a story about...", "en_US" ) ).toContain( "this" );
		expect( stopwordsFunction( "tell about yourself", "en_US" ) ).toContain( "about" );
		expect( stopwordsFunction( "tell about yourself", "en_US" ) ).toContain( "yourself" );
		expect( stopwordsFunction( "niets bijzonders").length ).toBe( 0 );
	});
});
