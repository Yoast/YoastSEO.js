const wrapStringWithRegex = require( "../../js/stringProcessing/wrapStringWithRegex" );

describe( 'wrapStringWithRegex', function() {
	it( "should not find anything to wrap", function() {
		expect( wrapStringWithRegex( "Nothing will be wrapped.", "non-existing", "<span>", "</span>" ) )
			.toEqual( "Nothing will be wrapped." );
	});

	it( "should wrap with nothing", function() {
		expect( wrapStringWithRegex( "Nothing will be wrapped.", "will" ) )
			.toEqual( "Nothing will be wrapped." );
	});

	it( "should wrap a single occurence", function() {
		expect( wrapStringWithRegex( "Something will be wrapped.", "something", "<span>", "</span>" ) )
			.toEqual( "<span>Something</span> will be wrapped." );
	});

	it( "should wrap multiple occurences", function() {
		expect( wrapStringWithRegex( "Something will be wrapped, something again.", "something", "<span>", "</span>" ) )
			.toEqual( "<span>Something</span> will be wrapped, <span>something</span> again." );
	});

	it( "should only prefix the occurences", function() {
		expect( wrapStringWithRegex( "This will be prefixed, and this again.", "this", "prefix-", "" ) )
			.toEqual( "prefix-This will be prefixed, and prefix-this again." );
	});

	it( "should only suffix the occurences", function() {
		expect( wrapStringWithRegex( "This will be prefixed, and this again.", "this", "", "-suffix" ) )
			.toEqual( "This-suffix will be prefixed, and this-suffix again." );
	});
});
