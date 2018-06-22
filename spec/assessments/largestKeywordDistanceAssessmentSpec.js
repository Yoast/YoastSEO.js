const largestKeyWordDistanceAssessment = require( "../../js/assessments/seo/largestKeywordDistanceAssessment.js" );
const Paper = require( "../../js/values/Paper.js" );
const Factory = require( "../helpers/factory.js" );
const i18n = Factory.buildJed();
const Mark = require( "../../js/values/Mark.js" );

let keywordDistanceAssessment = new largestKeyWordDistanceAssessment();

describe( "An assessment to check the largest percentage of text in which no keyword occurs", function() {
	it( "returns a bad score when the largest keyword distance is between more than 40%", function() {
		let mockPaper = new Paper( "string with the keyword", { keyword: "keyword" } );
		let assessment = keywordDistanceAssessment.getResult( mockPaper, Factory.buildMockResearcher( 55 ), i18n );

		expect( assessment.getScore() ).toEqual( 1 );
		expect( assessment.getText() ).toEqual( "Large parts of your text do not contain the keyword. Try to distribute the keyword more evenly." );
	} );

	it( "returns an okay score when the largest keyword distance is between 30 and 40%", function() {
		let mockPaper = new Paper( "string with the keyword", { keyword: "keyword" } );
		let assessment = keywordDistanceAssessment.getResult( mockPaper, Factory.buildMockResearcher( 45 ), i18n );

		expect( assessment.getScore() ).toEqual( 6 );
		expect( assessment.getText() ).toEqual( "Some parts of your text do not contain the keyword. Try to distribute the keyword more evenly." );
	} );

	it( "returns an okay score when the largest keyword distance is less than 30%", function() {
		let mockPaper = new Paper( "string with the keyword", { keyword: "keyword" } );
		let assessment = keywordDistanceAssessment.getResult( mockPaper, Factory.buildMockResearcher( 25 ), i18n );

		expect( assessment.getScore() ).toEqual( 9 );
		expect( assessment.getText() ).toEqual( "Your keyword is distributed evenly throughout the text. That's great." );
	} );
} );

describe( "Checks if the assessment is applicable", function() {
	it( "is applicable papers with more than 200 words and 2 keywords", function() {
		let mockPaper = new Paper( "This is a keyword and a keyword. Lorem ipsum dolor sit amet, vim illum aeque" +
			" constituam at. Id latine tritani alterum pro. Ei quod stet affert sed. Usu putent fabellas suavitate id." +
			" Quo ut stet recusabo torquatos. Eum ridens possim expetenda te. Ex per putant comprehensam. At vel utinam" +
			" cotidieque, at erat brute eum, velit percipit ius et. Has vidit accusata deterruisset ea, quod facete te" +
			" vis. Vix ei duis dolor, id eum sonet fabulas. Id vix imperdiet efficiantur. Percipit probatus pertinax te" +
			" sit. Putant intellegebat eu sit. Vix reque tation prompta id, ea quo labore viderer definiebas." +
			" Oratio vocibus offendit an mei, est esse pericula liberavisse. Lorem ipsum dolor sit amet, vim illum aeque" +
			" constituam at. Id latine tritani alterum pro. Ei quod stet affert sed. Usu putent fabellas suavitate id." +
			" Quo ut stet recusabo torquatos. Eum ridens possim expetenda te. Ex per putant comprehensam. At vel utinam" +
			" cotidieque, at erat brute eum, velit percipit ius et. Has vidit accusata deterruisset ea, quod facete te" +
			" vis. Vix ei duis dolor, id eum sonet fabulas. Id vix imperdiet efficiantur. Percipit probatus pertinax te" +
			" sit. Putant intellegebat eu sit. Vix reque tation prompta id, ea quo labore viderer definiebas." +
			" Oratio vocibus offendit an mei, est esse pericula liberavisse.", { keyword: "keyword" } );
		let assessment = keywordDistanceAssessment.isApplicable( mockPaper );

		expect( assessment ).toBe( true );
	} );

	it( "is not applicable papers with more than 200 words and only 1 keyword", function() {
		let mockPaper = new Paper( "This is the keyword. Lorem ipsum dolor sit amet, vim illum aeque" +
			" constituam at. Id latine tritani alterum pro. Ei quod stet affert sed. Usu putent fabellas suavitate id." +
			" Quo ut stet recusabo torquatos. Eum ridens possim expetenda te. Ex per putant comprehensam. At vel utinam" +
			" cotidieque, at erat brute eum, velit percipit ius et. Has vidit accusata deterruisset ea, quod facete te" +
			" vis. Vix ei duis dolor, id eum sonet fabulas. Id vix imperdiet efficiantur. Percipit probatus pertinax te" +
			" sit. Putant intellegebat eu sit. Vix reque tation prompta id, ea quo labore viderer definiebas." +
			" Oratio vocibus offendit an mei, est esse pericula liberavisse. Lorem ipsum dolor sit amet, vim illum aeque" +
			" constituam at. Id latine tritani alterum pro. Ei quod stet affert sed. Usu putent fabellas suavitate id." +
			" Quo ut stet recusabo torquatos. Eum ridens possim expetenda te. Ex per putant comprehensam. At vel utinam" +
			" cotidieque, at erat brute eum, velit percipit ius et. Has vidit accusata deterruisset ea, quod facete te" +
			" vis. Vix ei duis dolor, id eum sonet fabulas. Id vix imperdiet efficiantur. Percipit probatus pertinax te" +
			" sit. Putant intellegebat eu sit. Vix reque tation prompta id, ea quo labore viderer definiebas." +
			" Oratio vocibus offendit an mei, est esse pericula liberavisse.", { keyword: "keyword" } );
		let assessment = keywordDistanceAssessment.isApplicable( mockPaper );

		expect( assessment ).toBe( false );
	} );

	it( "is not applicable papers with less than 100 words that contain the keyword more than once", function() {
		let mockPaper = new Paper( "Keyword and keyword. ", { keyword: "keyword" } );
		let assessment = keywordDistanceAssessment.isApplicable( mockPaper );

		expect( assessment ).toBe( false );
	} );
} );

describe( "A test for marking keywords in the text", function() {
	it( "returns markers for keywords in the text", function() {
		let mockPaper = new Paper( "Text.", { keyword: "keyword" } );
		let assessment = keywordDistanceAssessment;

		let expected = [
			new Mark( { original: "keyword",
				marked: "<yoastmark class='yoast-text-mark'>keyword</yoastmark>" } ),
		];

		expect( assessment.getMarks( mockPaper ) ).toEqual( expected );
	} );
} );
