import addWordBoundary from "../../js/stringProcessing/addWordboundary";

describe("a test adding wordboundaries to a string", function(){
	it("adds start and end boundaries", function(){
		expect( addWordBoundary( "keyword" ) ).toBe( "(^|[ \\u00a0 \\n\\r\\t\.,'\(\)\"\+\-;!?:\/»«‹›<>])keyword($|[ \\u00a0 \\n\\r\\t\.,'\(\)\"\+\-;!?:\/»«‹›<>])" );
	});
	it("adds start and end boundaries and an extra boundary", function(){
		expect( addWordBoundary( "keyword", false, "extra" ) ).toBe( "(^|[ \\u00a0 \\n\\r\\t\.,'\(\)\"\+\-;!?:\/»«‹›extra<>])keyword($|[ \\u00a0 \\n\\r\\t\.,'\(\)\"\+\-;!?:\/»«‹›extra<>])" );
	});
	it("adds start boundaries, and end boundaries with positive lookahead", function(){
		expect( addWordBoundary( "keyword", true, "" ) ).toBe( "(^|[ \\u00a0 \\n\\r\\t\.,'\(\)\"\+\-;!?:\/»«‹›<>])keyword($|(?=[ \\u00a0 \\n\\r\\t\.,'\(\)\"\+\-;!?:\/»«‹›<>]))" );
	});
	it("adds start boundaries with an extra boundary, and end boundaries with positive lookahead and an extra boundary", function(){
		expect( addWordBoundary( "keyword", true, "extra" ) ).toBe( "(^|[ \\u00a0 \\n\\r\\t\.,'\(\)\"\+\-;!?:\/»«‹›extra<>])keyword($|(?=[ \\u00a0 \\n\\r\\t\.,'\(\)\"\+\-;!?:\/»«‹›extra<>]))" );
	});
});
