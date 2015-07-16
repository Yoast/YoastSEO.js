require("../js/config/config.js");
require("../js/config/scoring.js");
require("../js/analyzer.js");
require("../js/preprocessor.js");
require("../js/analyzescorer.js");
require("../js/stringhelper.js");

var doubleArgs = {
    text: "This is the year that Yoast turns 5 years old. A natural time to reflect upon how the company is doing and what it should and should not be doing and what we want for the future. Today we’re proud to announce that we’ve been acquired by CrowdFavorite",
    keyword: "test",
    queue: ["keywordDoubles"],
    usedKeywords: {}
};

describe("Test for the focus keyword doubles", function(){
    it("returns no double keywords", function(){
        var analyzer = new YoastSEO_Analyzer(doubleArgs);
        var result = analyzer.keywordDoubles();
        expect(result[0].result).toBe(0);
    });
});

var doubleArgs2 = {
    text: "This is the year that Yoast turns 5 years old. A natural time to reflect upon how the company is doing and what it should and should not be doing and what we want for the future. Today we’re proud to announce that we’ve been acquired by CrowdFavorite",
    keyword: "yoast",
    queue: ["keywordDoubles"],
    usedKeywords: {yoast: 1, test: 2, keyword: 5}
};

describe("Test for the focus keyword doubles", function(){
    it("returns a keyword double", function(){
        var analyzer = new YoastSEO_Analyzer(doubleArgs2);
        var result = analyzer.keywordDoubles();
        expect(result[0].result).toBe(1);
    });
});

var doubleArgs3 = {
    text: "This is the year that Yoast turns 5 years old. A natural time to reflect upon how the company is doing and what it should and should not be doing and what we want for the future. Today we’re proud to announce that we’ve been acquired by CrowdFavorite",
    keyword: "yoast",
    queue: ["keywordDoubles"],
    usedKeywords: {yoast: 3}
};

describe("Test for the focus keyword doubles", function(){
    it("returns 3 keyword doubles", function(){
        var analyzer = new YoastSEO_Analyzer(doubleArgs3);
        var result = analyzer.keywordDoubles();
        expect(result[0].result).toBe(3);
    });
});