var subheadingFunction = require("../../js/analyses/matchKeywordInSubheadings.js");
var valueObject;

describe("a test for matching keywords in subheadings", function(){
	it("returns the number of matches in the subheadings", function(){

		valueObject = {
			text: "<h2>Lorem ipsum</h2> keyword sit amet, consectetur adipiscing elit",
			keyword: "keyword"
		};
		var result = subheadingFunction( valueObject );
		expect( result.count ).toBe(1);
		expect( result.matches).toBe(0);

		valueObject = {
			text:  "Pellentesque sit amet justo ex. Suspendisse feugiat pulvinar leo eu consectetur",
			keyword: "keyword"
		};
		result = subheadingFunction( valueObject );
		expect( result.count ).toBe(0);


	});
});