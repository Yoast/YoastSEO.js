const TextCompetingLinksAssessment = require( "../../js/assessments/seo/textCompetingLinksAssessment.js" );
const Paper = require( "../../js/values/Paper.js" );

const factory = require( "../helpers/factory.js" );
const i18n = factory.buildJed();

describe( "An assessment for the text competing links", function() {
	it( "returns a 'bad' score if a paper is referring to another paper with the same keyword", function() {
		const paper = new Paper( "This is a very interesting paper", { keyword: "some keyword" } );
		const result = new TextCompetingLinksAssessment().getResult(
			paper,
			factory.buildMockResearcher(
				{
					total: 0,
					totalNaKeyword: 0,
					keyword: {
						totalKeyword: 1,
						matchedAnchors: [],
					},
					internalTotal: 0,
					internalDofollow: 0,
					internalNofollow: 0,
					externalTotal: 0,
					externalDofollow: 0,
					externalNofollow: 0,
					otherTotal: 0,
					otherDofollow: 0,
					otherNofollow: 0,
				}
			),
			i18n
		);

		expect( result.getScore() ).toBe( 2 );
		expect( result.getText() ).toBe( "You're linking to another page with the focus keyword you want this page to rank for. " +
			"Consider changing that if you truly want this page to rank." );
	} );

	it( "is not applicable for papers without text", function() {
		const paper = new Paper( "", { keyword: "some keyword" } );
		const isApplicableResult = new TextCompetingLinksAssessment().isApplicable( paper );
		const assessmentResult = new TextCompetingLinksAssessment().getResult(
			paper,
			factory.buildMockResearcher(
				{
					total: 0,
					totalNaKeyword: 0,
					keyword: {
						totalKeyword: 1,
						matchedAnchors: [],
					},
					internalTotal: 0,
					internalDofollow: 0,
					internalNofollow: 0,
					externalTotal: 0,
					externalDofollow: 0,
					externalNofollow: 0,
					otherTotal: 0,
					otherDofollow: 0,
					otherNofollow: 0,
				}
			),
			i18n
		);

		expect( isApplicableResult ).toBe( false );
		expect( assessmentResult.hasScore() ).toBe( false );
		expect( assessmentResult.hasMarks() ).toBe( false );
	} );

	it( "is not applicable for papers without keyword", function() {
		const paper = new Paper( "some text", { keyword: "" } );
		const isApplicableResult = new TextCompetingLinksAssessment().isApplicable( paper );
		const assessmentResult = new TextCompetingLinksAssessment().getResult(
			paper,
			factory.buildMockResearcher(
				{
					total: 0,
					totalNaKeyword: 0,
					keyword: {
						totalKeyword: 1,
						matchedAnchors: [],
					},
					internalTotal: 0,
					internalDofollow: 0,
					internalNofollow: 0,
					externalTotal: 0,
					externalDofollow: 0,
					externalNofollow: 0,
					otherTotal: 0,
					otherDofollow: 0,
					otherNofollow: 0,
				}
			),
			i18n
		);

		expect( isApplicableResult ).toBe( false );
		expect( assessmentResult.hasScore() ).toBe( false );
		expect( assessmentResult.hasMarks() ).toBe( false );
	} );

	it( "is not applicable for papers without keyword and text", function() {
		const paper = new Paper( "", { keyword: "" } );
		const isApplicableResult = new TextCompetingLinksAssessment().isApplicable( paper );
		const assessmentResult = new TextCompetingLinksAssessment().getResult(
			paper,
			factory.buildMockResearcher(
				{
					total: 0,
					totalNaKeyword: 0,
					keyword: {
						totalKeyword: 1,
						matchedAnchors: [],
					},
					internalTotal: 0,
					internalDofollow: 0,
					internalNofollow: 0,
					externalTotal: 0,
					externalDofollow: 0,
					externalNofollow: 0,
					otherTotal: 0,
					otherDofollow: 0,
					otherNofollow: 0,
				}
			),
			i18n
		);

		expect( isApplicableResult ).toBe( false );
		expect( assessmentResult.hasScore() ).toBe( false );
		expect( assessmentResult.hasMarks() ).toBe( false );
	} );
} );
