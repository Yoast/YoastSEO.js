const keywordDistributionAssessment = require( "../../js/assessments/seo/keywordDistributionAssessment.js" );
const Paper = require( "../../js/values/Paper.js" );
const Factory = require( "../helpers/factory.js" );
const i18n = Factory.buildJed();

const distributionAssessment = new keywordDistributionAssessment();

describe( "An assessment for the keyword distribution", function(){
	it( "runs the keyword distribution assessment on the paper", function(){
		let mockPaper = new Paper( "string with the keyword", {keyword: "keyword"} );
		let assessment = distributionAssessment.getResult( mockPaper, Factory.buildMockResearcher( 35 ), i18n );

		expect( assessment.getScore() ).toEqual( 1 );
		expect( assessment.getText() ).toEqual ( "There are some parts of your text that do not contain the keyword. Try to distribute the keyword more evenly." );
	} );
	it( "runs the keyword distribution assessment on the paper", function(){
		let mockPaper = new Paper( "string with the keyword", {keyword: "keyword"} );
		let assessment = distributionAssessment.getResult( mockPaper, Factory.buildMockResearcher( 25 ), i18n );

		expect( assessment.getScore() ).toEqual( 9 );
		expect( assessment.getText() ).toEqual ( "Your keyword is distributed evenly throughout the text. That's great." );
	} );
} );
