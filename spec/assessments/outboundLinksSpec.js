const LinkStatisticAssessment = require( "../../js/assessments/seo/outboundLinksAssessment.js" );
const Paper = require( "../../js/values/Paper.js" );

const factory = require( "../helpers/factory.js" );
const i18n = factory.buildJed();

describe( "An assessor running the linkStatistics for external links", function() {
	it( "A paper with one external link, which is do-follow", function() {
		const mockPaper = new Paper( "some text" );

		const assessment = new LinkStatisticAssessment().getResult( mockPaper, factory.buildMockResearcher( { externalDofollow: 1, externalNofollow: 0, externalTotal: 1 } ), i18n );

		expect( assessment.getScore() ).toEqual( 9 );
		expect( assessment.getText() ).toEqual( "This page has 1 outbound link(s)." );
	} );

	it( "A paper with one external link which is do-follow, and one external link which is no-follow", function() {
		const mockPaper = new Paper( "some text" );

		const assessment = new LinkStatisticAssessment().getResult( mockPaper, factory.buildMockResearcher( { externalDofollow: 1, externalNofollow: 1, externalTotal: 2 } ), i18n );

		expect( assessment.getScore() ).toEqual( 8 );
		expect( assessment.getText() ).toEqual( "This page has 1 nofollowed outbound link(s) and 1 normal outbound link(s)." );
	} );

	it( "A paper with one external link, which is no-follow", function() {
		const mockPaper = new Paper( "some text" );

		const assessment = new LinkStatisticAssessment().getResult( mockPaper, factory.buildMockResearcher( { externalDofollow: 0, externalNofollow: 1, externalTotal: 1 } ), i18n );

		expect( assessment.getScore() ).toEqual( 7 );
		expect( assessment.getText() ).toEqual( "This page has 1 outbound link(s), all nofollowed." );
	} );

	it( "A paper without external links", function() {
		const mockPaper = new Paper( "some text" );
		const assessment = new LinkStatisticAssessment().getResult( mockPaper, factory.buildMockResearcher( { externalTotal: 0 } ), i18n );

		expect( assessment.getScore() ).toEqual( 3 );
		expect( assessment.getText() ).toEqual( "No outbound links appear in this page, consider adding some as appropriate." );
	} );

	it( "A paper without text", function() {
		const isApplicableResult = new LinkStatisticAssessment().isApplicable( new Paper( "", { keyword: "some keyword" } ) );
		expect( isApplicableResult ).toBe( false );
	} );

	it( "A paper with a broken researcher", function() {
		const mockPaper = new Paper( "some text" );
		const assessment = new LinkStatisticAssessment().getResult( mockPaper, factory.buildMockResearcher( {} ), i18n );

		expect( assessment.hasScore() ).toEqual( false );
	} );
} );

