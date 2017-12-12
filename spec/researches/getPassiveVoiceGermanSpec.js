import changePaperFactory from "../specHelpers/paperChanger";

const Paper = require( "../../js/values/Paper.js" );
const Researcher = require( "../../js/researcher" );

const researcher = new Researcher( new Paper() );
const changePaper = changePaperFactory( researcher );
const passiveVoice = researcher.getResearch.bind( researcher, "passiveVoice" );


describe( "detecting passive voice in sentences with irregularParticiples", function() {
	it( "does not return passive for an irregular directly followed by 'sein'", function () {
		changePaper( { text: "Ich werde geschwommen sein.", locale: "de_DE" } );
		expect( passiveVoice().passives.length ).toBe( 0 );
	});
	it( "returns passive voice for an irregular not directly followed by 'sein'", function () {
		changePaper( { text: "Es wird geschwommen worden sein.", locale: "de_DE" } );
		expect( passiveVoice().passives.length ).toBe( 1 );
	});

	it( "does not return passive voice for an irregular directly followed by 'haben'", function () {
		changePaper( { text: "Wir werden geschlossen haben.", locale: "de_DE" } );
		expect( passiveVoice().passives.length ).toBe( 0 );
	});

	it( "returns passive voice for an irregular not directly followed by 'haben'", function () {
		changePaper( { text: "Es wird geschlossen worden sein.", locale: "de_DE" } );
		expect( passiveVoice().passives.length ).toBe( 1 );
	});

	it( "returns passive voice for an irregular without 'haben' or 'sein'", function () {
		changePaper( { text: "Es wird geschlossen.", locale: "de_DE" } );
		expect( passiveVoice().passives.length ).toBe( 1 );
	});
} );

describe( "detecting passive voice in sentences with regular participles", function() {
	it( "returns passive voice for a participle with 'ge' without 'haben' or 'sein'", function () {
		changePaper( { text: "Es wird gekauft.", locale: "de_DE" } );
		expect( passiveVoice().passives.length ).toBe( 1 );
	});

	it( "returns passive voice for a participle with 'ge' directly followed by 'haben'", function () {
		changePaper( { text: "Es wird gekauft haben.", locale: "de_DE" } );
		expect( passiveVoice().passives.length ).toBe( 0 );
	});
} );

describe( "not detecting passive voice in active sentences", function() {
	it( "does not return passive for a sentence without a passive auxiliary", function () {
		changePaper( { text: "Es ist geschlossen.", locale: "de_DE" } );
		expect( passiveVoice().passives.length ).toBe( 0 );
	});

	it( "filters out non-participles if they are followed by a punctuation mark", function () {
		changePaper( { text: "Es wird geburtsakt.", locale: "de_DE" } );
		expect( passiveVoice().passives.length ).toBe( 0 );
	});
} );

describe( "detecting passive voice in all passive verb tenses and moods", function() {
	it( "does return passive for Präsens Indikativ", function () {
		changePaper( { text: "Es wird gekauft.", locale: "de_DE" } );
		expect( passiveVoice().passives.length ).toBe( 1 );
	});

	it( "does return passive for Präsens Konjunktiv I", function () {
		changePaper( { text: "Es wird werde gekauft.", locale: "de_DE" } );
		expect( passiveVoice().passives.length ).toBe( 1 );
	});

	it( "does return passive for Präteritum Indikativ", function () {
		changePaper( { text: "Es wurde gekauft.", locale: "de_DE" } );
		expect( passiveVoice().passives.length ).toBe( 1 );
	});

	it( "does return passive for Präteritum Konjunktiv II", function () {
		changePaper( { text: "Es würde gekauft.", locale: "de_DE" } );
		expect( passiveVoice().passives.length ).toBe( 1 );
	});

	it( "does return passive for Perfekt Indikativ", function () {
		changePaper( { text: "Es ist gekauft worden.", locale: "de_DE" } );
		expect( passiveVoice().passives.length ).toBe( 1 );
	});

	it( "does return passive for Perfekt Konjunktiv I", function () {
		changePaper( { text: "Es sei gekauft worden.", locale: "de_DE" } );
		expect( passiveVoice().passives.length ).toBe( 1 );
	});

	it( "does return passive for Plusquamperfekt Indikativ", function () {
		changePaper( { text: "Es war gekauft worden.", locale: "de_DE" } );
		expect( passiveVoice().passives.length ).toBe( 1 );
	});

	it( "does return passive for Plusquamperfekt Konjunktiv II", function () {
		changePaper( { text: "Es wäre gekauft worden.", locale: "de_DE" } );
		expect( passiveVoice().passives.length ).toBe( 1 );
	});

	it( "does return passive for Futur I Indikativ", function () {
		changePaper( { text: "Es wirst gekauft werden.", locale: "de_DE" } );
		expect( passiveVoice().passives.length ).toBe( 1 );
	});

	it( "does return passive for Futur I Konjunktiv I", function () {
		changePaper( { text: "Es werdest gekauft werden.", locale: "de_DE" } );
		expect( passiveVoice().passives.length ).toBe( 1 );
	});

	it( "does return passive for Futur I Konjunktiv II", function () {
		changePaper( { text: "Es würdest gekauft werden.", locale: "de_DE" } );
		expect( passiveVoice().passives.length ).toBe( 1 );
	});

	it( "does return passive for Futur II Indikativ", function () {
		changePaper( { text: "Es wird gekauft worden sein.", locale: "de_DE" } );
		expect( passiveVoice().passives.length ).toBe( 1 );
	});

	it( "does return passive for Futur II Konjunktiv I", function () {
		changePaper( { text: "Es werde gekauft worden sein.", locale: "de_DE" } );
		expect( passiveVoice().passives.length ).toBe( 1 );
	});

	it( "does return passive for Futur II Konjunktiv II", function () {
		changePaper( { text: "Es würde gekauft worden sein.", locale: "de_DE" } );
		expect( passiveVoice().passives.length ).toBe( 1 );
	});
} );

describe( "not detecting passive voice in all active verb tenses and moods", function() {
	it( "does not return passive for Präsens Indikativ", function () {
		changePaper( { text: "Er kauft.", locale: "de_DE" } );
		expect( passiveVoice().passives.length ).toBe( 0 );
	});

	it( "does not return passive for Präsens Konjunktiv I", function () {
		changePaper( { text: "Er kaufe.", locale: "de_DE" } );
		expect( passiveVoice().passives.length ).toBe( 0 );
	});

	it( "does not return passive for Präteritum Indikativ", function () {
		changePaper( { text: "Er kaufte.", locale: "de_DE" } );
		expect( passiveVoice().passives.length ).toBe( 0 );
	});

	it( "does not return passive for Präteritum Konjunktiv II", function () {
		changePaper( { text: "Er kaufte.", locale: "de_DE" } );
		expect( passiveVoice().passives.length ).toBe( 0 );
	});

	it( "does not return passive for Perfekt Indikativ", function () {
		changePaper( { text: "Er hat gekauft.", locale: "de_DE" } );
		expect( passiveVoice().passives.length ).toBe( 0 );
	});

	it( "does not return passive for Perfekt Konjunktiv I", function () {
		changePaper( { text: "Er habe gekauft.", locale: "de_DE" } );
		expect( passiveVoice().passives.length ).toBe( 0 );
	});

	it( "does not return passive for Plusquamperfekt Indikativ", function () {
		changePaper( { text: "Er hatte gekauft.", locale: "de_DE" } );
		expect( passiveVoice().passives.length ).toBe( 0 );
	});

	it( "does not return passive for Plusquamperfekt Konjunktiv II", function () {
		changePaper( { text: "Er hätte gekauft.", locale: "de_DE" } );
		expect( passiveVoice().passives.length ).toBe( 0 );
	});

	it( "does not return passive for Futur I Indikativ", function () {
		changePaper( { text: "Er wird kaufen.", locale: "de_DE" } );
		expect( passiveVoice().passives.length ).toBe( 0 );
	});

	it( "does not return passive for Futur I Konjunktiv I", function () {
		changePaper( { text: "Er werde kaufen.", locale: "de_DE" } );
		expect( passiveVoice().passives.length ).toBe( 0 );
	});

	it( "does not return passive for Futur I Konjunktiv II", function () {
		changePaper( { text: "Er würde kaufen.", locale: "de_DE" } );
		expect( passiveVoice().passives.length ).toBe( 0 );
	});

	it( "does not return passive for Futur II Indikativ", function () {
		changePaper( { text: "Er wird gekauft haben.", locale: "de_DE" } );
		expect( passiveVoice().passives.length ).toBe( 0 );
	});

	it( "does not return passive for Futur II Konjunktiv I", function () {
		changePaper( { text: "Er werde gekauft haben.", locale: "de_DE" } );
		expect( passiveVoice().passives.length ).toBe( 0 );
	});

	it( "does not return passive for Futur II Konjunktiv II", function () {
		changePaper( { text: "Er würde gekauft haben.", locale: "de_DE" } );
		expect( passiveVoice().passives.length ).toBe( 0 );
	});
} );
