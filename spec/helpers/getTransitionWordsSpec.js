let getTransitionWords = require( "../../js/helpers/getTransitionWords.js" );

describe( "gets transition words, based on language", function() {
	let properties = [ "transitionWords", "twoPartTransitionWords" ];
	it( "checks if all properties are set for English", function() {
		let transitionWords = getTransitionWords( "en_US" );
		expect( Object.keys( transitionWords ) ).toEqual( properties );
	} );

	it( "checks if all properties are set for Spanish", function() {
		let transitionWords = getTransitionWords( "es_ES" );
		expect( Object.keys( transitionWords ) ).toEqual( properties );
	} );

	it( "checks if all properties are set for French", function() {
		let transitionWords = getTransitionWords( "fr_FR" );
		expect( Object.keys( transitionWords ) ).toEqual( properties );
	} );

	it( "checks if all properties are set for German", function() {
		let transitionWords = getTransitionWords( "de_DE" );
		expect( Object.keys( transitionWords ) ).toEqual( properties );
	} );

	it( "checks if all properties are set for Italian", function() {
		let transitionWords = getTransitionWords( "it_IT" );
		expect( Object.keys( transitionWords ) ).toEqual( properties );
	} );

	it( "checks if all properties are set for Portuguese", function() {
		let transitionWords = getTransitionWords( "pt_PT" );
		expect( Object.keys( transitionWords ) ).toEqual( properties );
	} );

	it( "checks if all properties are set for Russian", function() {
		let transitionWords = getTransitionWords( "ru_RU" );
		expect( Object.keys( transitionWords ) ).toEqual( properties );
	} );

	it( "checks if all properties are set for Catalan", function() {
		let transitionWords = getTransitionWords( "ca_ES" );
		expect( Object.keys( transitionWords ) ).toEqual( properties );
	} );

	it( "checks if all properties are set for Polish", function() {
		let transitionWords = getTransitionWords( "pl_PL" );
		expect( Object.keys( transitionWords ) ).toEqual( properties );
	} );

	it( "checks if all properties are set for Swedish", function() {
		let transitionWords = getTransitionWords( "sv_SE" );
		expect( Object.keys( transitionWords ) ).toEqual( properties );
	} );

	it( "checks if all properties are set if no locale is given", function() {
		let transitionWords = getTransitionWords( "" );
		expect( Object.keys( transitionWords ) ).toEqual( properties );
	} );
} );
