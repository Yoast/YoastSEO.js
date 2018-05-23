const SubheadingsKeywordAssessment = require( "../../js/assessments/seo/subheadingsKeywordAssessment.js" );
const Paper = require( "../../js/values/Paper.js" );
const Factory = require( "../helpers/factory.js" );
const i18n = Factory.buildJed();

let matchKeywordAssessment = new SubheadingsKeywordAssessment();

describe( "An assessment for matching keywords in subheadings", function() {
	it( "returns the default assessment values for a string without subheadings", function() {
		const mockPaper = new Paper();
		const assessment = matchKeywordAssessment.getResult( mockPaper, Factory.buildMockResearcher( { count: 0 } ), i18n );

		expect( assessment.hasScore() ).toBe( false );
	} );

	it( "returns a bad score and appropriate feedback when none of the subheadings contain the keyword", function() {
		const mockPaper = new Paper();
		const assessment = matchKeywordAssessment.getResult( mockPaper, Factory.buildMockResearcher( { count: 1, matches: 0 } ), i18n );

		expect( assessment.getScore() ).toEqual( 3 );
		expect( assessment.getText() ).toEqual( "You have not used the focus keyword in any subheading (such as an H2)." );
	} );

	it( "returns a bad score and appropriate feedback when there are too few subheadings containing the keyword", function() {
		const mockPaper = new Paper();
		const assessment = matchKeywordAssessment.getResult( mockPaper, Factory.buildMockResearcher( { count: 4, matches: 1 } ), i18n );

		expect( assessment.getScore() ).toEqual( 3 );
		expect( assessment.getText() ).toEqual( "The focus keyword appears only in 1 out of 4 subheadings. Try to use it in more subheadings." );
	} );

	it( "returns a good score and appropriate feedback when there is a sufficient number of subheadings containing the keyword", function() {
		const mockPaper = new Paper();
		const assessment = matchKeywordAssessment.getResult( mockPaper, Factory.buildMockResearcher( { count: 4, matches: 2 } ), i18n );

		expect( assessment.getScore() ).toEqual( 9 );
		expect( assessment.getText() ).toEqual( "The focus keyword appears in 2 out of 4 subheadings. That's great." );
	} );

	it( "returns a good score and appropriate feedback when there is only one subheading and that subheading contains the keyword", function() {
		const mockPaper = new Paper();
		const assessment = matchKeywordAssessment.getResult( mockPaper, Factory.buildMockResearcher( { count: 1, matches: 1 } ), i18n );

		expect( assessment.getScore() ).toEqual( 9 );
		expect( assessment.getText() ).toEqual( "The focus keyword appears in 1 out of 1 subheading. That's great." );
	} );

	it( "returns a bad score and appropriate feedback when there are too many subheadings containing the keyword", function() {
		const mockPaper = new Paper();
		const assessment = matchKeywordAssessment.getResult( mockPaper, Factory.buildMockResearcher( { count: 4, matches: 4 } ), i18n );

		expect( assessment.getScore() ).toEqual( 3 );
		expect( assessment.getText() ).toEqual( "The focus keyword appears in 4 out of 4 subheadings. That might sound a bit repetitive. " +
			"Try to change some of those subheadings to make the flow of your text sound more natural." );
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
