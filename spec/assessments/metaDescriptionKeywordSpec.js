var MetaDescriptionKeywordAssessment = require( "../../js/assessments/seo/metaDescriptionKeywordAssessment.js" );
var Paper = require( "../../js/values/Paper.js" );

var factory = require( "../helpers/factory.js" );
var i18n = factory.buildJed();

let descriptionKeywordAssessment = new MetaDescriptionKeywordAssessment();

describe( "the metadescription keyword assessment", function() {
    it( "returns a bad result when the meta description doesn't contain the keyword", function() {
        var mockPaper = new Paper();
        var assessment = descriptionKeywordAssessment.getResult( mockPaper, factory.buildMockResearcher( 0 ), i18n );

        expect( assessment.getScore() ).toBe( 3 );
        expect( assessment.getText() ).toBe( "A meta description has been specified, but it does not contain the focus keyword." );
    } );

    it( "returns a good result and an appropriate feedback message when the meta description contains the keyword once", function() {
        var mockPaper = new Paper();
        var assessment = descriptionKeywordAssessment.getResult( mockPaper, factory.buildMockResearcher( 1 ), i18n );

        expect( assessment.getScore() ).toBe( 9 );
        expect( assessment.getText() ).toBe( "The meta description contains the focus keyword. That's great." );
    } );

    it( "returns a good result and an appropriate feedback message when the meta description contains the keyword two times", function() {
        var mockPaper = new Paper();
        var assessment = descriptionKeywordAssessment.getResult( mockPaper, factory.buildMockResearcher( 2 ), i18n );

        expect( assessment.getScore() ).toBe( 9 );
        expect( assessment.getText() ).toBe( "The meta description contains the focus keyword 2 times. That's great." );
    } );

    it( "returns a bad result when the meta description contains the keyword too often", function() {
        var mockPaper = new Paper();
        var assessment = descriptionKeywordAssessment.getResult( mockPaper, factory.buildMockResearcher( 3 ), i18n );

        expect( assessment.getScore() ).toBe( 3 );
        expect( assessment.getText() ).toBe( "The meta description contains the focus keyword 3 times, which is over the advised maximum of 2 times." );
    } );
} );

