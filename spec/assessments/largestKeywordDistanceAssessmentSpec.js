const largestKeyWordDistanceAssessment = require( "../../js/assessments/seo/largestKeywordDistanceAssessment.js" );
const Paper = require( "../../js/values/Paper.js" );
const Factory = require( "../helpers/factory.js" );
const i18n = Factory.buildJed();

const keywordDistanceAssessment = new largestKeyWordDistanceAssessment();

describe( "An assessment to check the largest percentage of text in which no keyword occurs", function() {
	it( "runs the largest keyword distance assessments on the paper", function() {
		let mockPaper = new Paper( "string with the keyword", { keyword: "keyword" } );
		let assessment = keywordDistanceAssessment.getResult( mockPaper, Factory.buildMockResearcher( 35 ), i18n );

		expect( assessment.getScore() ).toEqual( 1 );
		expect( assessment.getText() ).toEqual ( "There are some parts of your text that do not contain the keyword. Try to distribute the keyword more evenly." );
	} );

	it( "runs the largest keyword distance assessment on the paper", function() {
		let mockPaper = new Paper( "string with the keyword", { keyword: "keyword" } );
		let assessment = keywordDistanceAssessment.getResult( mockPaper, Factory.buildMockResearcher( 25 ), i18n );

		expect( assessment.getScore() ).toEqual( 9 );
		expect( assessment.getText() ).toEqual ( "Your keyword is distributed evenly throughout the text. That's great." );
	} );
} );

describe( "Checks if the assessment is applicable", function() {
	it( "is applicable papers with more than 100 words and 2 keywords", function() {
		let mockPaper = new Paper( "Keyword and keyword. Lorem ipsum dolor sit amet, eum ne novum dictas temporibus, te quodsi nostrum mea. Amet nostrud ut mel, graeco laboramus sit et, sea alia animal an. Probo inciderint ius cu, aperiam fabellas reformidans ei eum. In porro decore neglegentur mel. Ad duo amet causae fuisset, no scripta virtute fuisset nam. Graece inciderint dissentiunt eos te. His ad tritani adolescens honestatis, affert iuvaret cotidieque mea te. Te vis doctus deleniti theophrastus. Ut vim viris delicata assentior, duo ne discere partiendo reformidans, eos solum equidem complectitur in. Ei illum civibus reformidans pro. Te vel senserit elaboraret. Dicta dicam dicant mei ad tale.", { keyword: "keyword" } );
		let assessment = keywordDistanceAssessment.isApplicable( mockPaper );

		expect( assessment ).toBe( true );
	} );

	it( "is not applicable papers with more than 100 words and only 1 keyword", function() {
		let mockPaper = new Paper( "The keyword. Lorem ipsum dolor sit amet, eum ne novum dictas temporibus, te quodsi nostrum mea. Amet nostrud ut mel, graeco laboramus sit et, sea alia animal an. Probo inciderint ius cu, aperiam fabellas reformidans ei eum. In porro decore neglegentur mel. Ad duo amet causae fuisset, no scripta virtute fuisset nam. Graece inciderint dissentiunt eos te. His ad tritani adolescens honestatis, affert iuvaret cotidieque mea te. Te vis doctus deleniti theophrastus. Ut vim viris delicata assentior, duo ne discere partiendo reformidans, eos solum equidem complectitur in. Ei illum civibus reformidans pro. Te vel senserit elaboraret. Dicta dicam dicant mei ad tale.", { keyword: "keyword" } );
		let assessment = keywordDistanceAssessment.isApplicable( mockPaper );

		expect( assessment ).toBe( false );
	} );

	it( "is not applicable papers with less than 100 words that contain the keyword more than once", function() {
		let mockPaper = new Paper( "Keyword and keyword. ", { keyword: "keyword" } );
		let assessment = keywordDistanceAssessment.isApplicable( mockPaper );

		expect( assessment ).toBe( false );
	} );
} );
