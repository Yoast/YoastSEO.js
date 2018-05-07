let Assessor = require( "../../js/cornerstone/seoAssessor.js" );
let Paper = require( "../../js/values/Paper.js" );
let factory = require( "../helpers/factory.js" );
let getResults = require( "../specHelpers/getListOfAssessmentResults" );
let i18n = factory.buildJed();
let assessor = new Assessor( i18n );

describe( "running assessments in the assessor", function() {
	it( "runs assessments without any specific requirements", function() {
		assessor.assess( new Paper( "" ) );
		let assessments = getResults( assessor.getValidResults() );

		expect( assessments ).toEqual( [
			"keyphraseLength",
			"metaDescriptionLength",
			"textLength",
			"titleWidth",
		] );
	} );

	it( "runs assessments that only require a keyword", function() {
		assessor.assess( new Paper( "", { keyword: "keyword" } ) );
		let assessments = getResults( assessor.getValidResults() );

		expect( assessments ).toEqual( [
			"introductionKeyword",
			"keyphraseLength",
			"metaDescriptionKeyword",
			"metaDescriptionLength",
			"textLength",
			"titleWidth",
		] );
	} );

	it( "runs assessments that only require a keyword and a title", function() {
		assessor.assess( new Paper( "", { keyword: "keyword", title: "title with or without a keyword" } ) );
		let assessments = getResults( assessor.getValidResults() );

		expect( assessments ).toEqual( [
			"introductionKeyword",
			"keyphraseLength",
			"metaDescriptionKeyword",
			"metaDescriptionLength",
			"textLength",
			"titleKeyword",
			"titleWidth",
		] );
	} );

	it( "runs assessments that only require a text", function() {
		assessor.assess( new Paper( "text" ) );
		let assessments = getResults( assessor.getValidResults() );

		expect( assessments ).toEqual( [
			"keyphraseLength",
			"metaDescriptionLength",
			"textImages",
			"textLength",
			"externalLinks",
			"internalLinks",
			"titleWidth",
		] );
	} );

	it( "additionally runs assessments that require a keyword", function() {
		assessor.assess( new Paper( "text", { keyword: "keyword" } ) );
		let assessments = getResults( assessor.getValidResults() );

		expect( assessments ).toEqual( [
			"introductionKeyword",
			"keyphraseLength",
			"metaDescriptionKeyword",
			"metaDescriptionLength",
			"textImages",
			"textLength",
			"externalLinks",
			"internalLinks",
			"titleWidth",
		] );
	} );
	
	it( "additionally runs assessments that require a url and a keyword", function() {
		assessor.assess( new Paper( "text", { url: "https://www.website.com", keyword: "keyword" } ) );
		let assessments = getResults( assessor.getValidResults() );

		expect( assessments ).toEqual( [
			"introductionKeyword",
			"keyphraseLength",
			"metaDescriptionKeyword",
			"metaDescriptionLength",
			"textImages",
			"textLength",
			"externalLinks",
			"internalLinks",
			"titleWidth",
			"urlKeyword",
		] );
	} );

	it( "additionally runs assessments that require a text of at least 100 words and a keyword", function() {
		assessor.assess( new Paper( "This is a text about the keyword. Lorem ipsum dolor sit amet, fugit" +
			"munere consulatu an est, ex eruditi gloriatur reformidans vim. At ius falli laboramus, ei" +
			"euripidis dissentiet vix. Pro novum eligendi repudiare no, in vix stet hinc. Mollis qualisque" +
			"iudicabit id mei, legimus aliquando democritum duo cu. Id eripuit omnesque appellantur pro," +
			"vim ne menandri appellantur. Usu omnes timeam tritani et, an falli consectetuer vix. Vel" +
			"ne enim constituam. Et summo mentitum mea. Cu his nusquam civibus officiis, vix tota appellantur" +
			"no, fuisset invenire molestiae pro ne. Ne case essent mei, ut quo ferri malorum albucius. Id nonumes" +
			"inimicus vix. Ei duo prompta electram, iudico.", { keyword: "keyword" } ) );
		let assessments = getResults( assessor.getValidResults() );

		expect( assessments ).toEqual( [
			"introductionKeyword",
			"keyphraseLength",
			"keywordDensity",
			"metaDescriptionKeyword",
			"metaDescriptionLength",
			"textImages",
			"textLength",
			"externalLinks",
			"internalLinks",
			"titleWidth",
		] );
	} );
} );
