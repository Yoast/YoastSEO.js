const SubheadingsKeywordAssessment = require( "../../js/assessments/seo/subheadingsKeywordAssessment.js" );
const Paper = require( "../../js/values/Paper.js" );
const Factory = require( "../helpers/factory.js" );
const i18n = Factory.buildJed();

let matchKeywordAssessment = new SubheadingsKeywordAssessment();

describe( "An assessment for matching keywords in subheadings", function() {
	it( "assesses a string without subheadings", function() {
		const mockPaper = new Paper( "some text without subheadings" );
		const assessment = matchKeywordAssessment.getResult( mockPaper, Factory.buildMockResearcher( { count: 0 } ), i18n );

		expect( assessment.hasScore() ).toBe( false );
	} );
	it( "assesses a string with subheadings without keywords", function() {
		const mockPaper = new Paper( "some text without subheadings" );
		const assessment = matchKeywordAssessment.getResult( mockPaper, Factory.buildMockResearcher( { count: 1, matches: 0 } ), i18n );

		expect( assessment.getScore() ).toEqual( 6 );
		expect( assessment.getText() ).toEqual( "You have not used the focus keyword in any subheading (such as an H2) in your copy." );
	} );
	it( "assesses a string with subheadings and keywords", function() {
		const mockPaper = new Paper( "some text without subheadings" );
		const assessment = matchKeywordAssessment.getResult( mockPaper, Factory.buildMockResearcher( { count: 1, matches: 1 } ), i18n );

		expect( assessment.getScore() ).toEqual( 9 );
		expect( assessment.getText() ).toEqual( "The focus keyword appears in 1 (out of 1) subheadings in your copy." );
	} );
	it( "assesses a string with subheadings and keywords", function() {
		const mockPaper = new Paper( "some text without subheadings" );
		const assessment = matchKeywordAssessment.getResult( mockPaper, Factory.buildMockResearcher( { count: 10, matches: 1 } ), i18n );

		expect( assessment.getScore() ).toEqual( 9 );
		expect( assessment.getText() ).toEqual( "The focus keyword appears in 1 (out of 10) subheadings in your copy." );
	} );
	it( "checks isApplicable for a paper without text", function() {
		const isApplicableResult = new SubheadingsKeywordAssessment().isApplicable( new Paper( "", { keyword: "some keyword" } ) );
		expect( isApplicableResult ).toBe( false );
	} );
	it( "checks isApplicable for a paper without keyword", function() {
		const isApplicableResult = new SubheadingsKeywordAssessment().isApplicable( new Paper( "some text", { keyword: "" } ) );
		expect( isApplicableResult ).toBe( false );
	} );
	it( "checks isApplicable for a paper with text and keyword", function() {
		const isApplicableResult = new SubheadingsKeywordAssessment().isApplicable( new Paper( "some text", { keyword: "some keyword" } ) );
		expect( isApplicableResult ).toBe( true );
	} );
} );
