require('../js/config/config.js');
require('../js/analyzer.js');

preprocArgs = {
    testString: "<h1>Dit is een</h1> <h2>standaard</h2>- TEKST <ul><li>test1</li><li>test2</li><li>test3</li><li>test4</li></ul>met VEEL caps, spaties, <h6>tekens</h6> en andere overbodige meuk!?'...; <img src='http://linknaarplaatje' alt='mooiplaatje' />Het aantal Woorden<br><br> is negentien"
};

expectedOutput = {
    cleanText: "<h1>dit is een</h1> <h2>standaard</h2> tekst <ul><li>test1</li><li>test2</li><li>test3</li><li>test4</li></ul>met veel caps spaties <h6>tekens</h6> en andere overbodige meuk. <img src= http //linknaarplaatje alt= mooiplaatje />het aantal woorden<br><br> is negentien.",
    cleanTextSomeTags: "<h1>dit is een</h1> <h2>standaard</h2> tekst <li>test1</li><li>test2</li><li>test3</li><li>test4</li> met veel caps spaties <h6>tekens</h6> en andere overbodige meuk. het aantal woorden is negentien.",
    cleanTextNoTags: "dit is een standaard tekst test1 test2 test3 test4 met veel caps spaties tekens en andere overbodige meuk. het aantal woorden is negentien."
};

describe("Test for the preprocessor that formats text for the analyzer", function(){
    preproc = new PreProcessor(preprocArgs.testString);
    it("returns processed clean text", function(){
        expect(preproc._store.cleanText).toBe(expectedOutput.cleanText);
    });
    it("returns processed notags text", function(){
        expect(preproc._store.cleanTextNoTags).toBe(expectedOutput.cleanTextNoTags);
    });
    it("returns processed sometags text", function(){
        expect(preproc._store.cleanTextSomeTags).toBe(expectedOutput.cleanTextSomeTags);
    });
});


preprocArgs2 = {
    testString: "This is the year that Yoast turns 5 years old. A natural time to reflect upon how the company is doing and what it should and should not be doing and what we want for the future. Today we’re proud to announce that we’ve been acquired by CrowdFavorite"
}

describe("Test for the syllablecount", function(){
    preproc2 = new PreProcessor(preprocArgs2.testString);
    it("returns syllable count", function(){
        expect(preproc2._store.syllablecount).toBe(73);
    })
})
