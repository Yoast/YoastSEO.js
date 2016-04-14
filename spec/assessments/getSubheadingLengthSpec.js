var subHeadingLengthAssessment = require( "../../js/assessments/getSubheadingLengthAssessment.js" );
var Paper = require( "../../js/values/Paper.js" );
var Factory = require( "../helpers/factory.js" );
var i18n = Factory.buildJed();

var paper = new Paper();
describe( "An assessment for finding the lenght of the subheadings.", function() {
	it( "returns headings < 30 chars. ", function() {
		var assessment = subHeadingLengthAssessment.getResult( paper, Factory.buildMockResearcher( [5, 5, 20 ] ), i18n );
		expect( assessment.getScore() ).toBe( 9 );
		expect( assessment.getText() ).toBe( "The length of all subheadings is within the recommended range." );
	} );

	it( "returns headings < 30 chars. ", function() {
		assessment = subHeadingLengthAssessment.getResult( paper, Factory.buildMockResearcher( [5, 5, 28 ] ), i18n );
		expect( assessment.getScore() ).toBe( 7.888888888888889 );
		expect( assessment.getText() ).toBe( "The length of all subheadings is within the recommended range." );
	} );
	it( "returns headings > 30 chars, 1 too long heading. ", function() {
		assessment = subHeadingLengthAssessment.getResult( paper, Factory.buildMockResearcher( [5, 5, 35 ] ), i18n );
		expect( assessment.getScore() ).toBe(  4.777777777777778 );
		expect( assessment.getText() ).toBe( "You have 1 subheading which contain more than the recommended maximum of 30 characters." );
	} );
	it( "returns headings > 30 chars. 2 too long headings. ", function() {
		assessment = subHeadingLengthAssessment.getResult( paper, Factory.buildMockResearcher( [5, 34, 35 ] ), i18n );
		expect( assessment.getScore() ).toBe( 4.777777777777778 );
		expect( assessment.getText() ).toBe( "You have 2 subheadings which contain more than the recommended maximum of 30 characters." );
	} );
});
