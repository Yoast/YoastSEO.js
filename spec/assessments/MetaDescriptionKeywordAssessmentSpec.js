import MetaDescriptionKeywordAssessment from "../../src/assessments/seo/MetaDescriptionKeywordAssessment";
import Paper from "../../src/values/Paper";
import Factory from "../specHelpers/factory";

const i18n = Factory.buildJed();

const mockResearcherNoMatches = Factory.buildMockResearcher( { fullDescription: 0, perSentence: [ 0 ] } );
const mockResearcherOneMatch = Factory.buildMockResearcher( { fullDescription: 100, perSentence: [ 100, 0, 0 ] } );
const mockResearcherTwoMatches = Factory.buildMockResearcher( { fullDescription: 100, perSentence: [ 100, 100, 50 ] } );
const mockResearcherThreeMatches = Factory.buildMockResearcher( { fullDescription: 100, perSentence: [ 100, 100, 100 ] } );
const mockResearcherMatchesDescription = Factory.buildMockResearcher( { fullDescription: 100, perSentence: [ 50, 50 ] } );

describe( "the metadescription keyword assessment", function() {
	it( "returns a bad result when the meta description doesn't contain the keyword", function() {
		const mockPaper = new Paper();
		const assessment = new MetaDescriptionKeywordAssessment().getResult( mockPaper, mockResearcherNoMatches, i18n );

		expect( assessment.getScore() ).toBe( 3 );
		expect( assessment.getText() ).toBe( "<a href='https://yoa.st/33k' target='_blank'>Key phrase in meta description</a>: The meta description has been specified, but it does not contain the focus key phrase. <a href='https://yoa.st/33l' target='_blank'>Fix that!</a>" );
	} );

	it( "returns a good result and an appropriate feedback message when at least one sentence contains every keyword term at least once in the same sentence.", function() {
		const mockPaper = new Paper();
		const assessment = new MetaDescriptionKeywordAssessment().getResult( mockPaper, mockResearcherOneMatch, i18n );

		expect( assessment.getScore() ).toBe( 9 );
		expect( assessment.getText() ).toBe( "<a href='https://yoa.st/33k' target='_blank'>Key phrase in meta description</a>: Focus key phrase or synonym appear in the meta description. Well done!" );
	} );

	it( "returns a good result and an appropriate feedback message when the meta description contains the keyword two times in the same sentence", function() {
		const mockPaper = new Paper();
		const assessment = new MetaDescriptionKeywordAssessment().getResult( mockPaper, mockResearcherTwoMatches, i18n );

		expect( assessment.getScore() ).toBe( 9 );
		expect( assessment.getText() ).toBe( "<a href='https://yoa.st/33k' target='_blank'>Key phrase in meta description</a>: Focus key phrase or synonym appear in the meta description. Well done!" );
	} );

	it( "returns a bad result when the meta description contains the keyword three times in the same sentence", function() {
		const mockPaper = new Paper();
		const assessment = new MetaDescriptionKeywordAssessment().getResult( mockPaper, mockResearcherThreeMatches, i18n );

		expect( assessment.getScore() ).toBe( 3 );
		expect( assessment.getText() ).toBe( "<a href='https://yoa.st/33k' target='_blank'>Key phrase in meta description</a>: The meta description contains the focus keyword 3 times, which is over the advised maximum of 2 times. <a href='https://yoa.st/33l' target='_blank'>Limit that!</a>" );
	} );

	it( "returns an okay result when the meta description contains the keyword one time, but not in the same sentence", function() {
		const mockPaper = new Paper();
		const assessment = new MetaDescriptionKeywordAssessment().getResult( mockPaper, mockResearcherMatchesDescription, i18n );

		expect( assessment.getScore() ).toBe( 6 );
		expect( assessment.getText() ).toBe( "<a href='https://yoa.st/33k' target='_blank'>Key phrase in meta description</a>: All words of focus key phrase or synonym appear in the meta description, but not within one sentence. <a href='https://yoa.st/33l' target='_blank'>Try to use them in one sentence.</a>" );
	} );

	it( "is not applicable when the paper doesn't have a keyword", function() {
		const isApplicableResult = new MetaDescriptionKeywordAssessment().isApplicable( new Paper( "text", { description: "description" } ) );
		expect( isApplicableResult ).toBe( false );
	} );

	it( "is not applicable when the paper doesn't have a meta description", function() {
		const isApplicableResult = new MetaDescriptionKeywordAssessment().isApplicable( new Paper( "text", { keyword: "keyword" } ) );
		expect( isApplicableResult ).toBe( false );
	} );

	it( "is  applicable when the paper has a meta description and a keyword", function() {
		const isApplicableResult = new MetaDescriptionKeywordAssessment().isApplicable( new Paper( "text", { keyword: "keyword", description: "description" } ) );
		expect( isApplicableResult ).toBe( true );
	} );
} );

