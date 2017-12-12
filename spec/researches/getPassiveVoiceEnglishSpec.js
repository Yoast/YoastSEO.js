import changePaperFactory from "../specHelpers/paperChanger";

const Paper = require( "../../js/values/Paper.js" );
const Researcher = require( "../../js/researcher" );

// Tests inspired by the examples on http://www.englishpage.com/verbpage/activepassive.html
describe( "detecting passive voice in sentences", function() {
	const researcher = new Researcher( new Paper() );
	const changePaper = changePaperFactory( researcher );
	const passiveVoice = researcher.getResearch.bind( researcher, "passiveVoice" );

	it( "returns active voice (Simple Present)", function () {
		changePaper({ text: "Once a week, Tom cleans the house." });
		expect( passiveVoice().passives.length ).toBe( 0 );
	});

	it( "returns passive voice (Simple Present)", function () {
		// Passive: is cleaned.
		changePaper({ text: "Once a week, the house is cleaned by Tom." });
		expect( passiveVoice().passives.length).toBe( 1 );
	});

	it( "returns active voice (Present Continuous)", function () {
		changePaper({ text: "Right now, Sarah is writing the letter." });
		expect(passiveVoice().passives.length).toBe( 0 );
	});

	it( "returns passive voice (Present Continuous)", function () {
		// Passive: (is) being written.
		changePaper({ text: "Right now, the letter is being written by Sarah." });
		expect(passiveVoice().passives.length).toBe( 1 );
	});

	it( "returns active voice (Simple Past)", function() {
		changePaper({ text: "Sam repaired the car." });
		expect( passiveVoice().passives.length ).toBe( 0 );
	} );

	it( "returns passive voice (Simple Past)", function() {
		// Passive: was repaired.
		changePaper({ text: "The car was repaired by Sam." });
		expect( passiveVoice().passives.length ).toBe( 1 );
	} );

	it( "returns active voice (Past Continuous)", function() {
		changePaper({ text: "The salesman was helping the customer when the thief came into the store." });
		expect( passiveVoice().passives.length ).toBe( 0 );
	} );

	it( "returns passive voice (Past Continuous)", function() {
		// Passive: (was) being helped.
		changePaper({ text: "The customer was being helped by the salesman when the thief came into the store." });
		expect( passiveVoice().passives.length ).toBe( 1 );
	} );

	it( "returns active voice (Present Perfect)", function() {
		changePaper({ text: "Many tourists have visited that castle." });
		expect( passiveVoice().passives.length ).toBe( 0 );
	} );

	it( "returns passive voice (Present Perfect)", function() {
		// Passive: (has) been visited.
		changePaper({ text: "That castle has been visited by many tourists." });
		expect( passiveVoice().passives.length ).toBe( 1 );
	} );

	it( "returns active voice (Present Perfect Continuous)", function() {
		changePaper({ text: "Recently, John has been doing the work." });
		expect( passiveVoice().passives.length ).toBe( 0 );
	} );

	it( "returns passive voice (Present Perfect Continuous)", function() {
		// Passive: (has been) being done.
		changePaper({ text: "Recently, the work has been being done by John." });
		expect( passiveVoice().passives.length ).toBe( 1 );
	} );

	it( "returns active voice (Past Perfect)", function() {
		changePaper({ text: "George had repaired many cars before he received his mechanic's license." });
		expect( passiveVoice().passives.length ).toBe( 0 );
	} );

	it( "returns passive voice (Past Perfect)", function() {
		// Passive: (had) been repaired.
		changePaper({ text: "Many cars had been repaired by George before he received his mechanic's license." });
		expect( passiveVoice().passives.length ).toBe( 1 );
	} );

	it( "returns active voice (Past Perfect Continuous)", function() {
		changePaper({ text: "Chef Jones had been preparing the restaurant's fantastic dinners for two years before he moved to Paris." });
		expect( passiveVoice().passives.length ).toBe( 0 );
	} );

	it( "returns passive voice (Past Perfect Continuous)", function() {
		// Passive: (had been) being prepared.
		changePaper({ text: "The restaurant's fantastic dinners had been being prepared by Chef Jones for two years before he moved to Paris." });
		expect( passiveVoice().passives.length ).toBe( 1 );
	} );

	it( "returns active voice (Simple Future - will)", function() {
		changePaper({ text: "Someone will finish the work by 5:00 PM." });
		expect( passiveVoice().passives.length ).toBe( 0 );
	} );

	it( "returns passive voice (Simple Future - will)", function() {
		// Passive: (will) be finished.
		changePaper({ text: "The work will be finished by 5:00 PM." });
		expect( passiveVoice().passives.length ).toBe( 1 );
	} );

	it( "returns active voice (Simple Future - be going to)", function() {
		changePaper({ text: "Sally is going to make a beautiful dinner tonight." });
		expect( passiveVoice().passives.length ).toBe( 0 );
	} );

	it( "returns passive voice (Simple Future - be going to)", function() {
		// Passive: (to) be made.
		changePaper({ text: "A beautiful dinner is going to be made by Sally tonight." });
		expect( passiveVoice().passives.length ).toBe( 1 );
	} );

	it( "returns active voice (Future Continuous - will)", function() {
		changePaper({ text: "At 8:00 PM tonight, John will be washing the dishes." });
		expect( passiveVoice().passives.length ).toBe( 0 );
	} );

	it( "returns passive voice (Future Continuous - will)", function() {
		// Passive: (will be) being washed.
		changePaper({ text: "At 8:00 PM tonight, the dishes will be being washed by John." });
		expect( passiveVoice().passives.length ).toBe( 1 );
	} );

	it( "returns active voice (Future Continuous - be going to)", function() {
		changePaper({ text: "At 8:00 PM tonight, John is going to be washing the dishes." });
		expect( passiveVoice().passives.length ).toBe( 0 );
	} );

	it( "returns passive voice (Future Continuous - be going to)", function() {
		// Passive: (to be) being washed.
		changePaper({ text: "At 8:00 PM tonight, the dishes are going to be being washed by John." });
		expect( passiveVoice().passives.length ).toBe( 1 );
	} );

	it( "returns active voice (Future Perfect - will)", function() {
		changePaper({ text: "They will have completed the project before the deadline." });
		expect( passiveVoice().passives.length ).toBe( 0 );
	} );

	it( "returns passive voice (Future Perfect - will)", function() {
		// Passive: (will have) been completed.
		changePaper({ text: "The project will have been completed before the deadline." });
		expect( passiveVoice().passives.length ).toBe( 1 );
	} );

	it( "returns active voice (Future Perfect - be going to)", function() {
		changePaper({ text: "They are going to have completed the project before the deadline." });
		expect( passiveVoice().passives.length ).toBe( 0 );
	} );

	it( "returns passive voice (Future Perfect - be going to)", function() {
		// Passive:  (have) been completed.
		changePaper({ text: "The project is going to have been completed before the deadline." });
		expect( passiveVoice().passives.length ).toBe( 1 );
	} );

	it( "returns active voice (Future Perfect Continuous- will)", function() {
		changePaper({ text: "The famous artist will have been painting the mural for over six months." });
		expect( passiveVoice().passives.length ).toBe( 0 );
	} );

	it( "returns passive voice (Future Perfect Continuous- will)", function() {
		// Passive: (will have been) being painted.
		changePaper({ text: "The mural will have been being painted by the famous artist for over six months." });
		expect( passiveVoice().passives.length ).toBe( 1 );
	} );

	it( "returns active voice (Future Perfect Continuous- be going to)", function() {
		changePaper({ text: "The famous artist is going to have been painting the mural for over six months." });
		expect( passiveVoice().passives.length ).toBe( 0 );
	} );

	it( "returns passive voice (Future Perfect Continuous- be going to)", function() {
		// Passive: (have been) being painted.
		changePaper({ text: "The mural is going to have been being painted by the famous artist for over six months." });
		expect( passiveVoice().passives.length ).toBe( 1 );
	} );

	it( "returns active voice (Used to)", function() {
		changePaper({ text: "Jerry used to pay the bills." });
		expect( passiveVoice().passives.length ).toBe( 0 );
	} );

	it( "returns passive voice (Used to)", function() {
		// Passive: (to) be paid.
		changePaper({ text: "The bills used to be paid by Jerry." });
		expect( passiveVoice().passives.length ).toBe( 1 );
	} );

	it( "returns active voice (Would Always)", function() {
		changePaper({ text: "My mother would always make the pies." });
		expect( passiveVoice().passives.length ).toBe( 0 );
	} );

	it( "returns passive voice (Would Always)", function() {
		// Passive: (would) be made.
		changePaper({ text: "The pies would always be made by my mother." });
		expect( passiveVoice().passives.length ).toBe( 1 );

	} );
	it( "returns active voice (Future in the Past - would)", function() {
		changePaper({ text: "I knew John would finish the work by 5:00 PM." });
		expect( passiveVoice().passives.length ).toBe( 0 );
	} );

	it( "returns passive voice (Future in the Past - would)", function() {
		// Passive: (would) be finished.
		changePaper({ text: "I knew the work would be finished by 5:00 PM." });
		expect( passiveVoice().passives.length ).toBe( 1 );
	} );

	it( "returns active voice (Future in the Past - was going to)", function() {
		changePaper({ text: "I thought Sally was going to make a beautiful dinner tonight." });
		expect( passiveVoice().passives.length ).toBe( 0 );
	} );

	it( "returns passive voice (Future in the Past - was going to)", function() {
		// Passive: (to) be made.
		changePaper({ text: "I thought a beautiful dinner was going to be made by Sally tonight." });
		expect( passiveVoice().passives.length ).toBe( 1 );
	} );

	it( "returns active voice ( verb with -ing )", function() {
		changePaper({ text: "He was walking and jumped" });
		expect( passiveVoice().passives.length ).toBe( 0 );
	} );

	it( "returns active voice ( nonverb with -ing )", function() {
		changePaper({ text: "It was a ceiling and painted" });
		expect( passiveVoice().passives.length ).toBe( 0 );
	} );

	it( "returns passive voice ( text between having and verb )", function() {
		// Passive: having painted.
		changePaper({ text: "He is having the house painted" });
		expect( passiveVoice().passives.length ).toBe( 1 );
	});

	it( "returns active voice ( no text between having and verb )", function() {
		changePaper({ text: "He is most notable, having contributed a lot" });
		expect( passiveVoice().passives.length ).toBe( 0 );
	});

	it( "returns active voice ( combination with left )", function() {
		changePaper({ text: "The right way is to the left" });
		expect( passiveVoice().passives.length ).toBe( 0 );
	});

	it( "returns passive voice ( combination with left )", function() {
		// Passive: was left.
		changePaper({ text: "She was left at home" });
		expect( passiveVoice().passives.length ).toBe( 1 );
	});

	it( "returns passive voice ( combination with left )", function() {
		// Passive: was hit.
		changePaper({ text: "He was hit on the left leg" });
		expect( passiveVoice().passives.length ).toBe( 1 );
	});

	/* Currently, the only time we verify that 'fit' is a noun, is when it is directly preceded by a determiner.
	 However, 'fit' can also be a noun when it is preceded by an adjective, like in "It was the *right* fit",
	 or by much longer adjectival constructions, like in "It was the *right, but slightly disappointing* fit."
	 We cannot detect adjectives/adjectival constructions yet. Randomly looking for a determiner in the string
	 preceding 'fit' is not an option, because in that case 'fit' would be seen as a noun in sentences
	 like "The model was fit by with the formula method" as well.
	 */
	xit( "returns active voice ( combination with fit )", function() {
	 	changePaper({ text: "It was the right fit" });
	 	expect( passiveVoice().passives.length ).toBe( 0 );
	});

	it( "returns passive voice ( combination with fit )", function() {
		// Passive: was fit.
		changePaper({ text: "He was fit with hearing aids" });
		expect( passiveVoice().passives.length ).toBe( 1 );
	});

	it( "returns active voice ( combination with ing-verbs )", function() {
		changePaper({ text: "They had apps that are constantly improving, with regular updates based on customer feedback." });
		expect( passiveVoice().passives.length ).toBe( 0 );
	});

	it( "returns passive voice ( combination with cling )", function() {
		// Passive: get (cling) wrapped.
		changePaper({ text: "They had apps that get constantly cling wrapped" });
		expect( passiveVoice().passives.length ).toBe( 1 );
	});

	it( "returns passive voice ( combination with cling  )", function() {
		// Passive: are (cling) wrapped.
		changePaper({ text: "They had apps that are constantly cling wrapped." });
		expect( passiveVoice().passives.length ).toBe( 1 );
	});

	it( "returns passive voice with quotation marks", function() {
		// Passive: get lost.
		changePaper({ text: "As a result of that, a lot of blog posts will 'get lost' in a structure that is too flat." });
		expect( passiveVoice().passives.length ).toBe( 1 );
	});

	it( "returns passive voice with multiple subsentence, where the passive is not in the last part", function() {
		// Passive: get lost.
		changePaper({ text: "As a result of that, a lot of blog posts will get lost in a structure that is too flat." });
		expect( passiveVoice().passives.length ).toBe( 1 );
	});

	it( "returns passive voice in a sentence where the indicator is in caps.", function() {
		// Passive: get lost.
		changePaper({ text: "As a result of that, a lot of blog posts will GET LOST in a structure that is too flat." });
		expect( passiveVoice().passives.length ).toBe( 1 );
	});

	it( "returns the passive sentences with multiple passive subsentences", function () {
		// Passive: is cleaned, is cleaned (2 times).
		changePaper({ text: "Once a week, the house is cleaned by Tom where the house is cleaned by Jane." });
		expect( passiveVoice().passives.length ).toBe( 1 );
	});

	it( "returns the passive sentences with more subsentences and only the first subsentence is passive", function () {
		// Passive: is cleaned.
		changePaper({ text: "Once a week, the house is cleaned by Tom where the house is Jane." });
		expect( passiveVoice().passives.length ).toBe( 1 );
	});

	it( "returns the passive sentences with an -ed word", function() {
		changePaper({ text: "Even though the house is cleaned" });
		expect( passiveVoice().passives.length ).toBe( 1 );
	});

	it( "supports different types of quotes", function() {
		changePaper({ text: "you're done." });
		expect( passiveVoice() ).toEqual( {
			total: 1,
			passives: [ "you're done." ]
		} );

		changePaper({ text: "you’re done." });
		expect( passiveVoice() ).toEqual( {
			total: 1,
			passives: [ "you’re done." ]
		} );

		changePaper({ text: "you‘re done." });
		expect( passiveVoice() ).toEqual( {
			total: 1,
			passives: [ "you‘re done." ]
		} );

		changePaper({ text: "you‛re done." });
		expect( passiveVoice() ).toEqual( {
			total: 1,
			passives: [ "you‛re done." ]
		} );
	});

	it( "strips HTMLtags", function() {
		changePaper({ text: "<a href='get lost'>No passive</a>" });
		expect( passiveVoice() ).toEqual( {
			total: 1,
			passives: []
		} );
	});

	it( "returns no passive sentence when the subsentence has no auxiliary, when the auxiliary is used multiple times", function () {
		// Passive: no passive, auxiliary: was
		changePaper({ text: "He thought she was the one who knew about the six buried in his back yard, but he was wrong." });
		expect( passiveVoice().passives.length ).toBe( 0 );
	});

	it( "returns no passive sentence when there is an exception with 'rid'", function () {
		// Passive: no passive, auxiliary: got
		changePaper({ text: "He got rid of it" });
		expect( passiveVoice() ).toEqual( {
			total: 1,
			passives: []
		} );
	});

} );
