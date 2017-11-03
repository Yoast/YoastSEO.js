import changePaperFactory from "../specHelpers/paperChanger";

let Paper = require( "../../js/values/Paper.js" );
let Researcher = require( "../../js/Researcher" );

describe("a test for finding transition words from a string", function() {
	let result, researcher;

	researcher = new Researcher( new Paper() );
	const changePaper = changePaperFactory( researcher );
	let transitionWordsResearch = researcher.getResearch.bind( researcher, "findTransitionWords" );

	it("returns 1 when a transition word is found in the middle of a sentence (English)", function () {
		// Transition word: above all.
		changePaper({ text: "this story is, above all, about a boy", locale: 'en_US' })
		result = transitionWordsResearch();
		expect(result.totalSentences).toBe(1);
		expect(result.transitionWordSentences).toBe(1);
	});

	it("returns 1 when a transition word with capital is found at the beginning of a sentence (English)", function () {
		// Transition word: firstly.
		changePaper({ text: "Firstly, I'd like to say", locale: 'en_US' })
		result = transitionWordsResearch();
		expect(result.totalSentences).toBe(1);
		expect(result.transitionWordSentences).toBe(1);
	});

	it("returns 1 when a transition word combination is found in the middle of a sentence (English)", function () {
		// Transition word: different from.
		changePaper({ text: "that is different from something else", locale: 'en_US' })
		result = transitionWordsResearch();
		expect(result.totalSentences).toBe(1);
		expect(result.transitionWordSentences).toBe(1);
	});

	it("returns 1 when a transition word combination is found at the end of a sentence (English)", function () {
		// Transition word: for example.
		changePaper({ text: "A story, for example", locale: 'en_US' })
		result = transitionWordsResearch();
		expect(result.totalSentences).toBe(1);
		expect(result.transitionWordSentences).toBe(1);
	});

	it("returns 1 when a two-part transition word  is found in a sentence (English)", function () {
		// Transition word: either...or.
		changePaper({ text: "I will either tell you a story, or read you a novel.", locale: 'en_US' })
		result = transitionWordsResearch();
		expect(result.totalSentences).toBe(1);
		expect(result.transitionWordSentences).toBe(1);
	});

	it("returns 1 when a two-part transition word  is found in a sentence, and no transition word in another sentence. (English)", function () {
		// Transition word: either...or.
		changePaper({ text: "I will either tell you a story, or read you a novel. Okay?", locale: 'en_US' })
		result = transitionWordsResearch();
		expect(result.totalSentences).toBe(2);
		expect(result.transitionWordSentences).toBe(1);
	});

	it("returns 2 when a two-part transition word  is found in a sentence, and a transition word in another sentence. (English)", function () {
		// Transition words: either...or, unless.
		changePaper({ text: "I will either tell you a story, or read you a novel. Unless it is about a boy.", locale: 'en_US' })
		result = transitionWordsResearch();
		expect(result.totalSentences).toBe(2);
		expect(result.transitionWordSentences).toBe(2);
	});

	it("returns 2 when a two-part transition word is found in two sentences. (English)", function () {
		// Transition words: either...or, if...then.
		changePaper({ text: "I will either tell you a story, or read you a novel. If you want, then I will.", locale: 'en_US' })
		result = transitionWordsResearch();
		expect(result.totalSentences).toBe(2);
		expect(result.transitionWordSentences).toBe(2);
	});

	it("returns 2 when a two-part transition word is found in two sentences, and an additional transition word is found in one of them. (English)", function () {
		// Transition words: either...or, if ...then, as soon as.
		changePaper({ text: "I will either tell you a story about a boy, or read you a novel. If you want, then I will start as soon as you're ready.", locale: 'en_US' })
		result = transitionWordsResearch();
		expect(result.totalSentences).toBe(2);
		expect(result.transitionWordSentences).toBe(2);
	});

	it("returns 1 when a transition word abbreviation found in a sentence (English)", function () {
		// Transition word: e.g..
		changePaper({ text: "That is e.g. a story...", locale: 'en_US' })
		 result = transitionWordsResearch();
		 expect(result.totalSentences).toBe(1);
		 expect(result.transitionWordSentences).toBe(1);
	 });

	it("returns 1 when 2 transition words are found in the same sentence (English)", function () {
		// Transition words: firstly, for example.
		changePaper({ text: "Firstly, I'd like to tell a story, for example", locale: 'en_US' })
		result = transitionWordsResearch();
		expect(result.totalSentences).toBe(1);
		expect(result.transitionWordSentences).toBe(1);
	});

	it("returns 2 when 2 transition words are found in two sentences (1 transition word each) (English)", function () {
		// Transition words: firstly, for example.
		changePaper({ text: "Firstly, I'd like to tell a story. For example.", locale: 'en_US' })
		result = transitionWordsResearch();
		expect(result.totalSentences).toBe(2);
		expect(result.transitionWordSentences).toBe(2);
	});

	it("returns 2 in the case of a sentence with 1 transition word and a sentence with 2 transition words) (English)", function () {
		// Transition words: firstly, for example, as I have said.
		changePaper({ text: "Firstly, I'd like to tell a story. For example, about you, as I have said.", locale: 'en_US' })
		result = transitionWordsResearch();
		expect(result.totalSentences).toBe(2);
		expect(result.transitionWordSentences).toBe(2);
	});

	it("returns 1 in the case of a sentence with 1 transition word and a sentence without transition words) (English)", function () {
		// Transition word: firstly.
		changePaper({ text: "Firstly, I'd like to tell a story. Haha.", locale: 'en_US' })
		result = transitionWordsResearch();
		expect(result.totalSentences).toBe(2);
		expect(result.transitionWordSentences).toBe(1);
	});

	it("returns 1 when a two-part transition word  is found in a sentence (English)", function () {
		// Transition word: either...or.
		changePaper({ text: "I will either tell you a story, or read you a novel.", locale: 'en_US' })
		result = transitionWordsResearch();
		expect(result.totalSentences).toBe(1);
		expect(result.transitionWordSentences).toBe(1);
	});

	it("returns 0 when no transition words are present in a sentence (English)", function () {
		changePaper({ text: "nothing special", locale: 'en_US' })
		result = transitionWordsResearch();
		expect(result.totalSentences).toBe(1);
		expect(result.transitionWordSentences).toBe(0);
	});

	it("returns 0 when no transition words are present in multiple sentences (English)", function () {
		changePaper({ text: "nothing special. Nothing special Either. Boring!", locale: 'en_US' })
		result = transitionWordsResearch();
		expect(result.totalSentences).toBe(3);
		expect(result.transitionWordSentences).toBe(0);
	});

	it("returns 1 when a transition word is found in a sentence (German)", function () {
		// Transition word: zuerst.
		changePaper({ text: "Zuerst werde ich versuchen zu verstehen, warum er so denkt.", locale: 'de_DE' })
		result = transitionWordsResearch();
		expect(result.totalSentences).toBe(1);
		expect(result.transitionWordSentences).toBe(1);
	});

	it("returns 1 when a transition abbreviation is found in a sentence (German)", function () {
		// Transition word: z.b.
		changePaper({ text: "Ich werde z.b. versuchen zu verstehen, warum er so denkt.", locale: 'de_DE' })
		result = transitionWordsResearch();
		expect(result.totalSentences).toBe(1);
		expect(result.transitionWordSentences).toBe(1);
	});

	it("returns 1 when a two-part transition word is found in a sentence (German)", function () {
		// Transition word: nicht nur...sondern.
		changePaper({ text: "Man soll nicht nur in seinen Liebesbeziehungen, sondern in sämtlichen Lebensbereichen um das Glück kämpfen.", locale: 'de_DE' })
		result = transitionWordsResearch();
		expect(result.totalSentences).toBe(1);
		expect(result.transitionWordSentences).toBe(1);
	});

	it("returns 0 when no transition words are present in a sentence (German)", function () {
		changePaper({ text: "Eins, zwei, drei.", locale: 'de_DE' })
		result = transitionWordsResearch();
		expect(result.totalSentences).toBe(1);
		expect(result.transitionWordSentences).toBe(0);
	});

	it("returns 1 when a transition word is found in a sentence (French)", function () {
		// Transition word: deuxièmement.
		changePaper({ text: "Deuxièmement, il convient de reconnaître la complexité des tâches à entreprendre.", locale: 'fr_FR' })
		result = transitionWordsResearch();
		expect(result.totalSentences).toBe(1);
		expect(result.transitionWordSentences).toBe(1);
	});

	it("returns 1 when a two-part transition word is found in a sentence (French)", function () {
		// Transition word: non seulement, mais encore.
		changePaper({ text: "Non seulement on l’estime, mais encore on l’aime.", locale: 'fr_FR' })
		result = transitionWordsResearch();
		expect(result.totalSentences).toBe(1);
		expect(result.transitionWordSentences).toBe(1);
	});

	it("returns 1 when a transition word with an apostrophe is found in a sentence (French)", function () {
		// Transition word: quoi qu’il en soit.
		changePaper({ text: "Quoi qu’il en soit, le gouvernement du Mali a perdu sa légitimité.", locale: 'fr_FR' })
		result = transitionWordsResearch();
		expect(result.totalSentences).toBe(1);
		expect(result.transitionWordSentences).toBe(1);
	});

	it("returns 0 when no transition words are present in a sentence (French)", function () {
		changePaper({ text: "Une, deux, trois.", locale: 'fr_FR' })
		result = transitionWordsResearch();
		expect(result.totalSentences).toBe(1);
		expect(result.transitionWordSentences).toBe(0);
	});

	it("returns 1 when a transition word is found in a sentence (Dutch)", function () {
		// Transition word: want.
		changePaper({ text: "Want daar brandt nog licht.", locale: 'nl_NL' })
		result = transitionWordsResearch();
		expect(result.totalSentences).toBe(1);
		expect(result.transitionWordSentences).toBe(1);
	});

	it("returns 1 when a two-part transition word is found in a sentence (Dutch)", function () {
		// Transition word: zowel, als.
		changePaper({ text: "Zowel 'deze' als 'zin' staat in deze zin.", locale: 'nl_NL' })
		result = transitionWordsResearch();
		expect(result.totalSentences).toBe(1);
		expect(result.transitionWordSentences).toBe(1);
	});

	it("returns 0 when no transition words are present in a sentence (Dutch)", function () {
		changePaper({ text: "Een, twee, drie.", locale: 'nl_NL' })
		result = transitionWordsResearch();
		expect(result.totalSentences).toBe(1);
		expect(result.transitionWordSentences).toBe(0);
	});

	it("returns 1 when a transition word is found in a sentence (Spanish)", function () {
		// Transition word: por el contrario.
		changePaper({ text: "Por el contrario, desea que se inicien cambios beneficiosos en Europa.", locale: 'es_ES' })
		result = transitionWordsResearch();
		expect(result.totalSentences).toBe(1);
		expect(result.transitionWordSentences).toBe(1);
	});

	it("returns 1 when a two-part transition word is found in a sentence (Spanish)", function () {
		// Transition word: de un lado...de otra parte.
		changePaper({ text: "Se trata además, de una restauración que ha pretendido de un lado ser reversible y que de otra parte ha intentado minimizar al máximo el impacto material.", locale: 'es_ES' })
		result = transitionWordsResearch();
		expect(result.totalSentences).toBe(1);
		expect(result.transitionWordSentences).toBe(1);
	});

	it("returns 0 when no transition words are present in a sentence (Spanish)", function () {
		changePaper({ text: "Uno, dos, tres.", locale: 'es_ES' })
		result = transitionWordsResearch();
		expect(result.totalSentences).toBe(1);
		expect(result.transitionWordSentences).toBe(0);
	});

	it("returns 1 when a transition word is found in a sentence (Italian)", function () {
		// Transition word: in conclusione.
		changePaper({ text: "In conclusione, possiamo dire che il risultato è ottimo.", locale: 'it_IT' })
		result = transitionWordsResearch();
		expect(result.totalSentences).toBe(1);
		expect(result.transitionWordSentences).toBe(1);
	});

	it("returns 1 when a two-part transition word is found in a sentence (Italian)", function () {
		// Transition word: no ... ma.
		changePaper({ text: "No, non credo che sia una buona idea ma possiamo sempre verificare caso per caso.", locale: 'it_IT' })
		result = transitionWordsResearch();
		expect(result.totalSentences).toBe(1);
		expect(result.transitionWordSentences).toBe(1);
	});

	it("returns 0 when no transition words are present in a sentence (Italian)", function () {
		changePaper({ text: "Uno, due, tre.", locale: 'it_IT' })
		result = transitionWordsResearch();
		expect(result.totalSentences).toBe(1);
		expect(result.transitionWordSentences).toBe(0);
	});

	it("defaults to English in case of a bogus locale", function () {
		// Transition word: because.
		changePaper({ text: "Because of a bogus locale.", locale: 'xx_YY' })
		result = transitionWordsResearch();
		expect(result.totalSentences).toBe(1);
		expect(result.transitionWordSentences).toBe(1);
	});

	it("defaults to English in case of a bogus locale", function () {
		// Transition word: none in English (but zuerst is a German transition word).
		changePaper({ text: "Zuerst eine bogus locale.", locale: 'xx_YY' })
		result = transitionWordsResearch();
		expect(result.totalSentences).toBe(1);
		expect(result.transitionWordSentences).toBe(0);
	});

	it( "works with normalizes quotes", function() {
		// Transition word: what’s more.
		changePaper({ text: "what’s more" });
		result = transitionWordsResearch();

		expect( result ).toEqual( {
			totalSentences: 1,
			sentenceResults: [
				{
					sentence: "what’s more",
					transitionWords: [ "what's more" ]
				}
			],
			transitionWordSentences: 1
		} );
	});

	it( "works with the no-break space character", function() {
		changePaper({ text: "and\u00a0then" });

		// Transition word: then.
		let expected = {
			totalSentences: 1,
			sentenceResults: [{
				sentence: "and\u00a0then",
				transitionWords: [ "then" ]
			}],
			transitionWordSentences: 1
		};

		let result = transitionWordsResearch();

		expect( result ).toEqual( expected );
	});
} );
