var AssessmentResult = require( "../../values/AssessmentResult.js" );
var countWords = require( "../../stringProcessing/countWords.js" );
var matchWords = require( "../../stringProcessing/matchTextWithWord.js" );

var calculateKeywordDistributionResult = function( keywordDistance ) {
	var score, text;

	if ( keywordDistance > 30 ) {
		score = 1;

		text = "There are large parts of your text that do not contain the keyword. Try to distribute the keyword more evenly.";
	}

	if ( keywordDistance <= 30 ) {
		score = 9;

		text = "Your keyword is evenly distributed throughout the text. That's great.";
	}

	return {
		score: score,
		text: text,
	};
};


var keywordDistributionAssessment = function( paper, researcher ) {
	var keywordDistance = researcher.getResearch( "keywordDistribution" );
	var keywordDistributionResult = calculateKeywordDistributionResult( keywordDistance );
	var assessmentResult = new AssessmentResult();

	assessmentResult.setScore( keywordDistributionResult.score );
	assessmentResult.setText( keywordDistributionResult.text );

	return assessmentResult;
};

module.exports = {
	identifier: "keywordDistribution",
	getResult: keywordDistributionAssessment,
	isApplicable: function( paper ) {
		var keywordCount = matchWords( paper.getText(), paper.getKeyword(), paper.getLocale() );
		return paper.hasText() && paper.hasKeyword() && countWords( paper.getText() ) >= 100 && keywordCount > 1;
	},
};
