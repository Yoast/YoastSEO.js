let Assessor = require( "../js/seoAssessor.js" );
let Paper = require("../js/values/Paper.js");
let AssessmentResult = require( "../js/values/AssessmentResult.js" );

let factory = require( "./helpers/factory.js" );
let i18n = factory.buildJed();

let assessor = new Assessor( i18n );

let getResults = function ( Results ) {
    let assessments = [];

    for ( let Result of Results ) {
        assessments.push( Result._identifier );
    }

    return assessments;
};

describe ( "running assessments in the assessor", function() {
    it( "runs assessments without any specific requirements", function() {
        assessor.assess( new Paper( "" ) );
		let AssessmentResults = assessor.getValidResults();
		let assessments = getResults( AssessmentResults );

		expect( assessments ).toEqual( [
			"keyphraseLength",
            "metaDescriptionLength",
			"textLength",
			"titleWidth"
			] );
    });

    it( "additionally runs assessments that only require a text", function() {
        assessor.assess( new Paper( "text" ) );
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

    it( "additionally runs assessments that only require a keyword", function() {
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

    it( "additionally runs assessments that require a keyword and a text", function() {
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

    //
    it( "additionally runs assessments that require a url", function() {
        assessor.assess( new Paper( "text", { url: "sample url" } ) );
        let AssessmentResults = assessor.getValidResults();
        let assessments = getResults( AssessmentResults );

        expect( assessments ).toEqual( [
            "metaDescriptionLength",
            "keyPhraseLength",
            "textImages",
            "textLength",
            "externalLinks",
            "internalLinks",
            "titleWidth"
        ] );
    });


    /*
    it( "runs assessments without any specific requirements", function() {
        assessor.assess( new Paper( "" ) );
        expect( assessor.getValidResults().length ).toBe( 4 );
    });

    it( "additionally runs assessments that only require a text", function() {
        assessor.assess( new Paper( "text" ) );
        expect( assessor.getValidResults().length ).toBe( 7 );
    });

    it( "additionally runs assessments that only require a keyword", function() {
        assessor.assess( new Paper( "text", { keyword: "keyword" } ) );
        expect( assessor.getValidResults().length ).toBe( 8 );
    });

    it( "additionally runs assessments that require text and a keyword", function() {
        assessor.assess( new Paper( "text", { keyword: "keyword" } ) );
        expect( assessor.getValidResults().length ).toBe( 8 );
    });

    it( "additionally runs assessments that require an url", function() {
        assessor.assess( new Paper( "text", { url: "sample url" } ) );
        expect( assessor.getValidResults().length ).toBe( 7 );
    });
    */
});
