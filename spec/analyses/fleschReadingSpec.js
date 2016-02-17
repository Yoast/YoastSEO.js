var fleschFunction = require( "../../js/analyses/calculateFleschReading.js" );
var valueObject = {};

describe("a test to calculate the fleschReading score", function(){
	it("returns a score", function(){
		valueObject.text = "A piece of text to calculate scores.";
		expect( fleschFunction( valueObject ) ).toBe( "78.9" );

		valueObject.text = "One question we get quite often in our website reviews is whether we can help people recover from the drop they noticed in their rankings or traffic. A lot of the times, this is a legitimate drop and people were actually in a bit of trouble";
		expect( fleschFunction( valueObject ) ).toBe( "63.9" );

		valueObject.text = "";
		expect( fleschFunction( valueObject ) ).toBe( 0 );
	});
});
