const wrapStringWithRegex = require( "../../js/stringProcessing/wrapStringWithRegex" );

describe( 'wrapStringWithRegex', function() {
	it( "should wrap nothing", function() {
		expect( wrapStringWithRegex( "Nothing will be wrapped.", "non-existing", "<span>", "</span>" ) )
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
});
