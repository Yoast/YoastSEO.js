var AssessorPresenter = require( "../../js/renderers/AssessorPresenter.js" );
var Factory = require( "../helpers/factory.js" );

describe("A function to transform a textual score into a description", function() {
	AssessorPresenter.prototype.outputScore = function() {};
	AssessorPresenter.prototype.outputOverallScore = function() {};

	var i18n = Factory.buildJed();

	var assessorPresenter = new AssessorPresenter({
		scorer: { __score: [], __totalScore: 0 },
		targets: { output: "", overall: "" },
		keyword: "",
		assessor: {},
		i18n: i18n
	});

	it("should know how to transform the score", function() {
		expect( assessorPresenter.resultToRating( { score: 0 } ).rating ).toBe( "feedback" );
		expect( assessorPresenter.resultToRating( { score: 1 } ).rating ).toBe( "bad" );
		expect( assessorPresenter.resultToRating( { score: 5 } ).rating ).toBe( "ok" );
		expect( assessorPresenter.resultToRating( { score: 8 } ).rating ).toBe( "good" );
	});

	it("should return an empty string with invalid scores", function() {
		expect( assessorPresenter.resultToRating( "" ) ).toEqual( "" );
		expect( assessorPresenter.resultToRating( "some invalid string" ) ).toEqual( "" );
	})
});

describe("A function to transform a numeric overall score into a textual score", function() {
	var i18n = Factory.buildJed();

	var assessorPresenter = new AssessorPresenter({
		scorer: { __score: [], __totalScore: 0 },
		targets: { output: "", overall: "" },
		keyword: "Keyword",
		i18n: i18n,
		assessor: {}
	});

	var expectations = [
		[ 0, 'feedback', "Feedback" ],
		[ 1, 'bad', "Bad SEO score" ],
		[ 23, 'bad', "Bad SEO score" ],
		[ 40, 'bad', "Bad SEO score" ],
		[ 41, 'ok', "Ok SEO score" ],
		[ 55, 'ok', "Ok SEO score" ],
		[ 70, 'ok', "Ok SEO score" ],
		[ 71, 'good', "Good SEO score" ],
		[ 83, 'good', "Good SEO score" ],
		[ 100, 'good', "Good SEO score" ]
	];

	it("should know how to transform the score", function() {
		expectations.forEach( function( item ) {
			expect( assessorPresenter.getOverallRating( item[0] ).rating ).toBe( item[1] );
		});
	})

	it("should know how to transform the score and retrieve the proper translation from config", function() {
		expectations.forEach( function( item ) {
			expect( assessorPresenter.getIndicatorScreenReaderText( assessorPresenter.getOverallRating( item[0] ).rating ) ).toBe( item[ 2 ] );
		});
	})
});
