import changePaperFactory from "../specHelpers/paperChanger";

const Paper = require( "../../js/values/Paper" );
const Researcher = require( "../../js/researcher" );

describe("counts words in sentences from text", function(){
	const researcher = new Researcher( new Paper() );
	const getSentences = researcher.getResearch.bind( researcher, "countSentencesFromText" );
	const changePaper = changePaperFactory( researcher );

	it("returns sentences with question mark", function () {
		changePaper({ text: "Hello. How are you? Bye" });
		expect( getSentences()[0].sentenceLength ).toBe( 1 );
		expect( getSentences()[1].sentenceLength ).toBe( 3 );
		expect( getSentences()[2].sentenceLength ).toBe( 1 );
	});
	it("returns sentences with exclamation mark", function () {
		changePaper({ text: "Hello. How are you! Bye" });
		expect( getSentences()[0].sentenceLength ).toBe( 1 );
		expect( getSentences()[1].sentenceLength ).toBe( 3 );
		expect( getSentences()[2].sentenceLength ).toBe( 1 );
	});
	it("returns sentences with many spaces", function () {
		changePaper({ text: "Hello.        How are you! Bye" });
		expect( getSentences()[0].sentenceLength ).toBe( 1 );
		expect( getSentences()[1].sentenceLength ).toBe( 3 );
		expect( getSentences()[2].sentenceLength ).toBe( 1 );
	});
	it( "returns sentences with html-tags, should only count words", function () {
		changePaper({ text: "This is a text <img src='image.jpg' alt='a bunch of words in an alt-tag' />" });
		expect( getSentences()[0].sentenceLength ).toBe( 4 );
	});
	it( "returns sentences with html-tags, should only count words", function () {
		changePaper({ text: "This is a text <img src='http://domain.com/image.jpg' alt='a bunch of words in an alt-tag' />. Another sentence." });
		expect( getSentences()[0].sentenceLength ).toBe( 4 );
		expect( getSentences()[1].sentenceLength ).toBe( 2 );
	});
});
