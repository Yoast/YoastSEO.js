import stopwordsFunction from "../../js/researches/stopWordsInText.js";

describe( "a test for finding stopwords from a string", function(){
	it( "returns English stopwords found in a string", function(){
		expect( stopwordsFunction( "this is a story about...", "en_US" ) ).toContain( "a" );
		expect( stopwordsFunction( "this is a story about...", "en_US" ) ).toContain( "about" );
		expect( stopwordsFunction( "this is a story about...", "en_US" ) ).toContain( "this" );
		expect( stopwordsFunction( "this is a story about...", "en_US" ) ).toContain( "is" );
		expect( stopwordsFunction( "this is a story about...", "en_US" ).length ).toBe( 4 );
		expect( stopwordsFunction( "tell about yourself", "en_US" ) ).toContain( "about" );
		expect( stopwordsFunction( "tell about yourself", "en_US" ) ).toContain( "yourself" );
		expect( stopwordsFunction( "tell about yourself", "en_US").length ).toBe( 2 );
		expect( stopwordsFunction( "niets bijzonders", "en_US").length ).toBe( 0 );
	});
	it( "returns Spanish stopwords found in a string", function(){
		expect( stopwordsFunction( "Este paper es un esbozo sobre...", "es_ES", false ) ).toContain( "este" );
		expect( stopwordsFunction( "Este paper es un esbozo sobre...", "es_ES", false ) ).toContain( "un" );
		expect( stopwordsFunction( "Este paper es un esbozo sobre", "es_ES", false ) ).toContain( "sobre" );
		expect( stopwordsFunction( "Este paper es un esbozo sobre", "es_ES", false ).length ).toBe( 3 );
		expect( stopwordsFunction( "Nothing special", "es_ES").length ).toBe( 0 );
	});
	it( "returns Spanish stopwords with diacritics found in a string", function(){
		expect( stopwordsFunction( "Aquí", "es_ES", false ) ).toContain( "aquí" );
		expect( stopwordsFunction( "Aqui", "es_ES", false ) ).not.toContain( "aquí" );
		expect( stopwordsFunction( "Aquí", "es_ES", false ).length ).toBe( 1 );
	});
	it( "returns English stopwords found in a string when no locale is specified", function(){
		expect( stopwordsFunction( "this is a story about..." ) ).toContain( "a" );
		expect( stopwordsFunction( "this is a story about..." ) ).toContain( "about" );
		expect( stopwordsFunction( "this is a story about..." ) ).toContain( "this" );
		expect( stopwordsFunction( "this is a story about..." ) ).toContain( "is" );
		expect( stopwordsFunction( "this is a story about..." ).length ).toBe( 4 );
		expect( stopwordsFunction( "tell about yourself" ) ).toContain( "about" );
		expect( stopwordsFunction( "tell about yourself" ) ).toContain( "yourself" );
		expect( stopwordsFunction( "tell about yourself" ).length ).toBe( 2 );
		expect( stopwordsFunction( "niets bijzonders", ).length ).toBe( 0 );
	});
});
