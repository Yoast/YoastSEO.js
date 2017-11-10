import stopwordsFunction from "../../js/researches/stopWordsInText.js";

describe("a test for finding stopwords from a string", function(){
	it("returns English stopwords found in a string", function(){
		expect( stopwordsFunction( "this is a story about...", "en_US" ) ).toContain( "a" );
		expect( stopwordsFunction( "this is a story about...", "en_US" ) ).toContain( "about" );
		expect( stopwordsFunction( "this is a story about...", "en_US" ) ).toContain( "this" );
		expect( stopwordsFunction( "tell about yourself", "en_US" ) ).toContain( "about" );
		expect( stopwordsFunction( "tell about yourself", "en_US" ) ).toContain( "yourself" );
		expect( stopwordsFunction( "niets bijzonders").length ).toBe( 0 );
	});
	it("returns Spanish stopwords found in a string", function(){
		expect( stopwordsFunction( "Este paper es un esbozo sobre...", "es_ES" ) ).toContain( "este" );
		expect( stopwordsFunction( "Este paper es un esbozo sobre...", "es_ES" ) ).toContain( "un" );
		expect( stopwordsFunction( "Este paper es un esbozo sobre", "es_ES" ) ).toContain( "sobre" );
		expect( stopwordsFunction( "nada especial").length ).toBe( 0 );
	});
	it("returns English stopwords found in a string when no locale is specified", function(){
		expect( stopwordsFunction( "this is a story about..." ) ).toContain( "a" );
		expect( stopwordsFunction( "this is a story about...", "en_US" ) ).toContain( "about" );
		expect( stopwordsFunction( "this is a story about...", "en_US" ) ).toContain( "this" );
		expect( stopwordsFunction( "tell about yourself", "en_US" ) ).toContain( "about" );
		expect( stopwordsFunction( "tell about yourself", "en_US" ) ).toContain( "yourself" );
		expect( stopwordsFunction( "niets bijzonders").length ).toBe( 0 );
	});
});
