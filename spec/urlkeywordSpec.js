require("../js/config/config.js");
require("../js/config/scoring.js");
require("../js/analyzer.js");
require("../js/preprocessor.js");
require("../js/analyzescorer.js");
require("../js/stringhelper.js");

var urlArgs = {
    keyword: "keyword",
    queue: ["urlKeyword","urlLength","urlStopwords"],
    url: "https://yoast.com/keyword-yoast"
};

describe("a test matching the keywords in the url", function(){
    it("returns a match for the keyword", function(){
        var urlAnalyzer = new Analyzer(urlArgs);
        urlAnalyzer.runQueue();
        var result = urlAnalyzer.__output;
        expect(result[0].result).toBe(1);
        expect(result[1].result.urlTooLong).toBe(false);
        expect(result[2].result).toBe(0);
    });
});

var urlArgs2 = {
    keyword: "sample",
    queue: ["urlKeyword"],
    url: "https://yoast.com/keyword-yoast"
};

describe("a test matching the keywords in the url", function(){
    it("returns no matches for the keyword, since it isn't there", function(){
        var urlAnalyzer = new Analyzer(urlArgs2);
        var result = urlAnalyzer.urlKeyword();
        expect(result[0].result).toBe(0);
    });
});

var urlArgs3 = {
    keyword: "sample",
    queue: ["urlKeyword"]
};

describe("a test matching the keywords in the url", function(){
    it("returns no matches for the keyword, since there is no url defined", function(){
        var urlAnalyzer = new Analyzer(urlArgs3);
        var result = urlAnalyzer.urlKeyword();
        expect(result[0].result).toBe(0);
    });
});
