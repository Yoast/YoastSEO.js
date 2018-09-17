import ContentAssessor from "../src/contentAssessor.js";
import AssessmentResult from "../src/values/AssessmentResult.js";
import Factory from "./specHelpers/factory.js";
import Paper from "../src/values/Paper.js";

import { forEach } from "lodash-es";

var i18n = Factory.buildJed();

describe( "A content assesor", function() {
	var contentAssessor;

	beforeEach( function() {
		contentAssessor = new ContentAssessor( i18n );
	} );

	describe( "calculatePenaltyPoints", function() {
		var results;
		var paper = new Paper();
		beforeEach( function() {
			contentAssessor.getValidResults = function() {
				return results;
			};
			contentAssessor.getPaper = function() {
				return paper;
			};
		} );

		it( "should have no points for an empty result set", function() {
			results = [];
			var expected = 0;

			var actual = contentAssessor.calculatePenaltyPoints();

			expect( actual ).toBe( expected );
		} );

		it( "should return 0 for all green assessment results", function() {
			results = [
				new AssessmentResult( { score: 9 } ),
				new AssessmentResult( { score: 9 } ),
				new AssessmentResult( { score: 9 } ),
				new AssessmentResult( { score: 9 } ),
				new AssessmentResult( { score: 9 } ),
			];
			var expected = 0;

			var actual = contentAssessor.calculatePenaltyPoints();

			expect( actual ).toBe( expected );
		} );

		it( "should return 3 for a red assessment result", function() {
			contentAssessor._allAssessmentsSupported = function() {
				return true;
			};

			results = [
				new AssessmentResult( { score: 3 } ),
			];
			var expected = 3;

			var actual = contentAssessor.calculatePenaltyPoints();

			expect( actual ).toBe( expected );
		} );

		it( "should return 2 for an orange assessment result", function() {
			results = [
				new AssessmentResult( { score: 6 } ),
			];
			var expected = 2;

			var actual = contentAssessor.calculatePenaltyPoints();

			expect( actual ).toBe( expected );
		} );

		it( "should return an aggregate for a mixed resultset", function() {
			contentAssessor._allAssessmentsSupported = function() {
				return true;
			};
			results = [
				new AssessmentResult( { score: 9 } ),
				new AssessmentResult( { score: 6 } ),
				new AssessmentResult( { score: 3 } ),
				new AssessmentResult( { score: 9 } ),
				new AssessmentResult( { score: 6 } ),
				new AssessmentResult( { score: 3 } ),
				new AssessmentResult( { score: 6 } ),
				new AssessmentResult( { score: 9 } ),
				new AssessmentResult( { text: "A piece of feedback" } ),
			];
			var expected = 6 + 6;

			var actual = contentAssessor.calculatePenaltyPoints();

			expect( actual ).toBe( expected );
		} );
	} );

	describe( "calculateOverallScore", function() {
		var points, results;

		beforeEach( function() {
			contentAssessor.getValidResults = function() {
				return results;
			};
			contentAssessor.calculatePenaltyPoints = function() {
				return points;
			};
			contentAssessor.getPaper = function() {
				return new Paper();
			};
		} );

		it( "should default to a bad indicator", function() {
			var expected = 30;
			results = [];

			var actual = contentAssessor.calculateOverallScore();

			expect( actual ).toBe( expected );
		} );

		it( "should give worse results based on the negative points", function() {
			results = [
				new AssessmentResult(),
				new AssessmentResult(),
			];
			var testCases = [
				{ points: 7, expected: 30 },
				{ points: 6, expected: 60 },
				{ points: 9, expected: 30 },
				{ points: 4, expected: 90 },
				{ points: 2, expected: 90 },
				{ points: 1.9, expected: 90 },
				{ points: 1, expected: 90 },
			];

			forEach( testCases, function( testCase ) {
				points = testCase.points;

				contentAssessor._allAssessmentsSupported = function() {
					return true;
				};

				var actual = contentAssessor.calculateOverallScore();

				expect( actual ).toBe( testCase.expected );
			} );
		} );

		describe( "calculateOverallScore for non English", function() {
			var points, results;

			beforeEach( function() {
				contentAssessor.getValidResults = function() {
					return results;
				};
				contentAssessor.calculatePenaltyPoints = function() {
					return points;
				};
				contentAssessor.getPaper = function() {
					return new Paper( "", { locale: "nl_NL" } );
				};
			} );

			it( "should give worse results based on the negative points", function() {
				results = [
					new AssessmentResult(),
					new AssessmentResult(),
				];
				var testCases = [
					{ points: 6, expected: 30 },
					{ points: 4, expected: 60 },
					{ points: 3, expected: 60 },
					{ points: 2, expected: 90 },
				];

				forEach( testCases, function( testCase ) {
					points = testCase.points;

					var actual = contentAssessor.calculateOverallScore();

					expect( actual ).toBe( testCase.expected );
				} );
			} );
		} );
	} );
	describe( "Checks the applicable assessments", function() {
		var contentAssessor = new ContentAssessor( i18n );
		it( "Should have 8 available assessments for a fully supported language", function() {
			contentAssessor.getPaper = function() {
				return new Paper( "test", { locale: "en_EN" } );
			};

			var actual = contentAssessor.getApplicableAssessments().length;
			var expected = 8;
			expect( actual ).toBe( expected );
		} );

		it( "Should have 4 available assessments for a basic supported language", function() {
			contentAssessor.getPaper = function() {
				return new Paper( "test", { locale: "xx_XX" } );
			};

			var actual = contentAssessor.getApplicableAssessments().length;
			var expected = 4;
			expect( actual ).toBe( expected );
		} );
	} );
} );
