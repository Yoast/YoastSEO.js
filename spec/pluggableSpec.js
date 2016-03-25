var Pluggable = require( "../js/pluggable" );

describe( "the pluggable interface", function() {
	var app, pluggable;

	describe( "adding an assessment", function() {
		beforeEach( function() {
			app = {
				updateLoadingDialog: function() {}
			};
			pluggable = new Pluggable( app );
			pluggable._registerPlugin( "test-plugin" );
		});

		it( "should throw an error on adding an invalid assessment", function() {
			expect( pluggable._registerAssessment( false ) ).toEqual( false );
			expect( pluggable._registerAssessment( "name", false ) ).toEqual( false );
			expect( pluggable._registerAssessment( "name", function() {}, false ) ).toEqual( false );
		});

		it( "should be able to add an assessment", function() {
			expect( pluggable._registerAssessment( "name", function() {}, "test-plugin" ) ).toEqual( true );
		})
	});
});
