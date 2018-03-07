let Assessor = require( "../../js/cornerstone/seoAssessor.js" );
let Paper = require("../../js/values/Paper.js");
let factory = require( "../helpers/factory.js" );
let i18n = factory.buildJed();
let assessor = new Assessor( i18n );

/**
 *
 * @param Results
 * @returns {Array} The list of assessment results.
 */
let getResults = function( Results ) {
	let assessments = [];

	for ( let Result of Results ) {
		assessments.push( Result._identifier );
	}

	return assessments;
};

describe( "running assessments in the assessor", function () {
	it( "runs assessments without any specific requirements", function () {
		assessor.assess( new Paper( "" ) );
		let AssessmentResults = assessor.getValidResults();
		let assessments = getResults( AssessmentResults );

		expect(assessments).toEqual([
			"keyphraseLength",
			"metaDescriptionLength",
			"textLength",
			"titleWidth"
		]);
	} );

	it( "additionally runs assessments that only require a text", function() {
		assessor.assess( new Paper( "text" ) );
		expect( assessor.getValidResults().length ).toBe( 7 );
		let AssessmentResults = assessor.getValidResults();
		let assessments = getResults( AssessmentResults );

		expect( assessments ).toEqual( [
			"keyphraseLength",
			"metaDescriptionLength",
			"textImages",
			"textLength",
			"externalLinks",
			"internalLinks",
			"titleWidth"
		] );
	} );

	it( "runs assessments that only require a keyword", function() {
		assessor.assess( new Paper( "", { keyword: "keyword" } ) );
		let AssessmentResults = assessor.getValidResults();
		let assessments = getResults( AssessmentResults );

		expect( assessments ).toEqual( [
			"introductionKeyword",
			"metaDescriptionKeyword",
			"metaDescriptionLength",
			"textLength",
			"titleKeyword",
			"titleWidth"
		] );
	});

	it( "additionally runs assessments that require a text and a keyword", function() {
		assessor.assess( new Paper( "text", { keyword: "keyword" } ) );
		let AssessmentResults = assessor.getValidResults();
		let assessments = getResults( AssessmentResults );

		expect( assessments ).toEqual( [
			"introductionKeyword",
			"metaDescriptionKeyword",
			"metaDescriptionLength",
			"textImages",
			"textLength",
			"externalLinks",
			"internalLinks",
			"titleKeyword",
			"titleWidth"
		] );
	});

	it( "additionally runs assessments that require a text and a keyword with a stopword ", function() {
		assessor.assess( new Paper( "text", { keyword: "the keyword" } ) );
		let AssessmentResults = assessor.getValidResults();
		let assessments = getResults( AssessmentResults );

		expect( assessments ).toEqual( [
			"introductionKeyword",
			"keywordStopWords",
			"metaDescriptionKeyword",
			"metaDescriptionLength",
			"textImages",
			"textLength",
			"externalLinks",
			"internalLinks",
			"titleKeyword",
			"titleWidth"
		] );
	});

	it( "additionally runs assessments that require a url that is too long", function() {
		assessor.assess( new Paper( "text", { url: "12345678901234567890123456789012345678901" } ) );
		let AssessmentResults = assessor.getValidResults();
		let assessments = getResults( AssessmentResults );

		expect( assessments ).toEqual( [
			"keyphraseLength",
			"metaDescriptionLength",
			"textImages",
			"textLength",
			"externalLinks",
			"internalLinks",
			"titleWidth",
			"urlLength"
		] );
	});

	it( "additionally runs assessments that require a url with a stopword", function() {
		assessor.assess( new Paper( "text", { url: "the url" } ) );
		let AssessmentResults = assessor.getValidResults();
		let assessments = getResults( AssessmentResults );

		expect( assessments ).toEqual( [
			"keyphraseLength",
			"metaDescriptionLength",
			"textImages",
			"textLength",
			"externalLinks",
			"internalLinks",
			"titleWidth",
			"urlStopWords"
		] );
	});

	it( "additionally runs assessments that require a url and a keyword", function() {
		assessor.assess( new Paper( "text", { url: "sample url", keyword: "keyword" } ) );
		let AssessmentResults = assessor.getValidResults();
		let assessments = getResults( AssessmentResults );

		expect( assessments ).toEqual( [
			"introductionKeyword",
			"metaDescriptionKeyword",
			"metaDescriptionLength",
			"textImages",
			"textLength",
			"externalLinks",
			"internalLinks",
			"titleKeyword",
			"titleWidth",
			"urlKeyword"
		] );
	});

	it( "additionally runs assessments that require a text of at least 100 words and a keyword", function() {
		assessor.assess( new Paper( "This is a text about the keyword. Lorem ipsum dolor sit amet, fugit" +
			"munere consulatu an est, ex eruditi gloriatur reformidans vim. At ius falli laboramus, ei" +
			"euripidis dissentiet vix. Pro novum eligendi repudiare no, in vix stet hinc. Mollis qualisque" +
			"iudicabit id mei, legimus aliquando democritum duo cu. Id eripuit omnesque appellantur pro," +
			"vim ne menandri appellantur. Usu omnes timeam tritani et, an falli consectetuer vix. Vel" +
			"ne enim constituam. Et summo mentitum mea. Cu his nusquam civibus officiis, vix tota appellantur" +
			"no, fuisset invenire molestiae pro ne. Ne case essent mei, ut quo ferri malorum albucius. Id nonumes" +
			"inimicus vix. Ei duo prompta electram, iudico.", { keyword: "keyword" } ) );
		let AssessmentResults = assessor.getValidResults();
		let assessments = getResults( AssessmentResults );

		expect( assessments ).toEqual( [
			"introductionKeyword",
			"keywordDensity",
			"metaDescriptionKeyword",
			"metaDescriptionLength",
			"textImages",
			"textLength",
			"externalLinks",
			"internalLinks",
			"titleKeyword",
			"titleWidth"
		] );
	});
} );
