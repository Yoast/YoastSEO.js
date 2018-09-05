import Assessor from "../src/taxonomyAssessor.js";
import Paper from "../src/values/Paper.js";
import factory from "./helpers/factory.js";
const i18n = factory.buildJed();
const assessor = new Assessor( i18n );
import getResults from "./specHelpers/getAssessorResults";

describe( "running assessments in the assessor", function() {
	it( "runs assessments without any specific requirements", function() {
		assessor.assess( new Paper( "" ) );
		const AssessmentResults = assessor.getValidResults();
		const assessments = getResults( AssessmentResults );

		expect( assessments ).toEqual( [
			"keyphraseLength",
			"metaDescriptionLength",
			"taxonomyTextLength",
			"titleWidth",
		] );
	} );

	it( "additionally runs assessments that only require a text", function() {
		assessor.assess( new Paper( "text" ) );
		const AssessmentResults = assessor.getValidResults();
		const assessments = getResults( AssessmentResults );

		expect( assessments ).toEqual( [
			"keyphraseLength",
			"metaDescriptionLength",
			"taxonomyTextLength",
			"titleWidth",
		] );
	} );

	it( "additionally runs assessments that require a text and a keyword", function() {
		assessor.assess( new Paper( "text", { keyword: "keyword" } ) );
		const AssessmentResults = assessor.getValidResults();
		const assessments = getResults( AssessmentResults );

		expect( assessments ).toEqual( [
			"introductionKeyword",
			"metaDescriptionLength",
			"taxonomyTextLength",
			"titleWidth",
		] );
	} );

	it( "additionally runs assessments that require a text, a keyword and a title", function() {
		assessor.assess( new Paper( "text", { keyword: "keyword", title: "title" } ) );
		const AssessmentResults = assessor.getValidResults();
		const assessments = getResults( AssessmentResults );

		expect( assessments ).toEqual( [
			"introductionKeyword",
			"metaDescriptionLength",
			"taxonomyTextLength",
			"titleKeyword",
			"titleWidth",
		] );
	} );

	it( "additionally runs assessments that require a text and a url", function() {
		assessor.assess( new Paper( "text", { url: "www.website.com" } ) );
		const AssessmentResults = assessor.getValidResults();
		const assessments = getResults( AssessmentResults );

		expect( assessments ).toEqual( [
			"keyphraseLength",
			"metaDescriptionLength",
			"taxonomyTextLength",
			"titleWidth",
		] );
	} );

	it( "additionally runs assessments that require a text, a url and a keyword", function() {
		assessor.assess( new Paper( "text", { url: "sample url", keyword: "keyword" } ) );
		const AssessmentResults = assessor.getValidResults();
		const assessments = getResults( AssessmentResults );

		expect( assessments ).toEqual( [
			"introductionKeyword",
			"metaDescriptionLength",
			"taxonomyTextLength",
			"titleWidth",
			"urlKeyword",
		] );
	} );

	it( "additionally runs assessments that require a text of at least 100 words and a keyword", function() {
		assessor.assess( new Paper( "This is a keyword. Lorem ipsum dolor sit amet, vim illum aeque constituam at. Id latine tritani alterum pro. Ei quod stet affert sed. Usu putent fabellas suavitate id. Quo ut stet recusabo torquatos. Eum ridens possim expetenda te. Ex per putant comprehensam. At vel utinam cotidieque, at erat brute eum, velit percipit ius et. Has vidit accusata deterruisset ea, quod facete te vis. Vix ei duis dolor, id eum sonet fabulas. Id vix imperdiet efficiantur. Percipit probatus pertinax te sit. Putant intellegebat eu sit. Vix reque tation prompta id, ea quo labore viderer definiebas. Oratio vocibus offendit an mei, est esse pericula liberavisse.", { keyword: "keyword" } ) );
		const AssessmentResults = assessor.getValidResults();
		const assessments = getResults( AssessmentResults );

		expect( assessments ).toEqual( [
			"introductionKeyword",
			"keywordDensity",
			"metaDescriptionLength",
			"taxonomyTextLength",
			"titleWidth",
		] );
	} );

	it( "additionally runs assessments that require a text, a keyword and a meta description", function() {
		assessor.assess( new Paper( "text", { keyword: "keyword", description: "description" } ) );
		const AssessmentResults = assessor.getValidResults();
		const assessments = getResults( AssessmentResults );

		expect( assessments ).toEqual( [
			"introductionKeyword",
			"metaDescriptionKeyword",
			"metaDescriptionLength",
			"taxonomyTextLength",
			"titleWidth",
		] );
	} );
} );
