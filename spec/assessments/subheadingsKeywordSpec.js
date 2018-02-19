var SubheadingsKeywordAssessment = require( "../../js/assessments/seo/subheadingsKeywordAssessment.js" );
var Paper = require( "../../js/values/Paper.js" );
var Factory = require( "../helpers/factory.js" );
var i18n = Factory.buildJed();

let matchKeywordAssessment = new SubheadingsKeywordAssessment();

describe( "An assessment for matching keywords in subheadings", function(){
	it( "assesses a string without subheadings", function(){
		var mockPaper = new Paper();
		var assessment = matchKeywordAssessment.getResult( mockPaper, Factory.buildMockResearcher( { count: 0 } ), i18n );

		expect( assessment.hasScore()).toBe( false );
		expect( assessment.getScore() ).toEqual( 0 );
		expect( assessment.getText() ).toEqual ( "" );
	} );

	it( "assesses a string with subheadings without keywords", function(){
		var mockPaper = new Paper();
		var assessment = matchKeywordAssessment.getResult( mockPaper, Factory.buildMockResearcher( { count: 1, matches: 0 } ), i18n );

		expect( assessment.getScore() ).toEqual( 3 );
		expect( assessment.getText() ).toEqual ( "You have not used the focus keyword in any subheading (such as an H2) in your copy." );
	} );

	it( "assesses a string with a too few subheadings containing the keyword", function(){
		var mockPaper = new Paper();
		var assessment = matchKeywordAssessment.getResult( mockPaper, Factory.buildMockResearcher( { count: 4, matches: 1 } ), i18n );

		expect( assessment.getScore() ).toEqual( 3 );
		expect( assessment.getText() ).toEqual ( "The focus keyword appears only in 1 (out of 4) subheadings in your copy. Try to use it in more subheadings." );
	} );

	it( "assesses a string with a sufficient amount nof subheadings containing the keyword", function(){
		var mockPaper = new Paper();
		var assessment = matchKeywordAssessment.getResult( mockPaper, Factory.buildMockResearcher( { count: 4, matches: 2 } ), i18n );

		expect( assessment.getScore() ).toEqual( 9 );
		expect( assessment.getText() ).toEqual ( "The focus keyword appears in 2 (out of 4) subheadings in your copy. That's great." );
	} );

	it( "assesses a string with too many subheadings containing the keyword", function(){
		var mockPaper = new Paper();
		var assessment = matchKeywordAssessment.getResult( mockPaper, Factory.buildMockResearcher( { count: 4, matches: 4 } ), i18n );

		expect( assessment.getScore() ).toEqual( 3 );
		expect( assessment.getText() ).toEqual ( "The focus keyword appears in 4 (out of 4) subheadings in your copy. That might sound a bit repetitive. Try to change some of those subheadings to make your text sound more natural." );
	} );
} );
