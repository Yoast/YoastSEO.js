var AssessmentResult = require( "../values/AssessmentResult.js" );
var forEach = require( "lodash/forEach" );

/**
 *
 * @param score
 * @param tooLong
 * @param i18n
 * @returns {*}
 */
var subheadingsLengthScore = function( score, tooLong, recommendedValue, i18n ) {
	if( score >= 7 ) {
		return{
			score: score,
			text: i18n.dgettext( "js-text-analysis", "The length of all subheadings is within the recommended range." )
		};
	}
	return{
		score: score,
		text: i18n.sprintf(
			i18n.dngettext(
				"js-text-analysis",
				"You have %1$d subheading which contain more than the recommended maximum of %2$d characters.",
				"You have %1$d subheadings which contain more than the recommended maximum of %2$d characters.",
				tooLong
			), tooLong, recommendedValue )
	};
};

/**
 * Runs the getSubheadingLength research and checks scores based on length.
 *
 * @param {Paper} paper The paper to use for the assessment.
 * @param {object} researcher The researcher used for calling research.
 * @param {object} i18n The object used for translations
 * @returns {object} the Assessmentresult
 */
var getSubheadingLength = function( paper, researcher, i18n ) {
	var subheadingsLength = researcher.getResearch( "getSubheadingLength" );
	var recommendedValue = 30;
	var tooLong = 0;
	var scores = [];

	forEach( subheadingsLength, function( length ) {
		if( length > recommendedValue ) {
			tooLong++;
		}
		scores.push( 9 - Math.max( Math.min( ( 4 / 9 ) * ( length - 25.5 ), 6 ), 0 ) );
	} );

	var lowestScore = scores.sort(
		function( a, b ) {
			return a - b;
		}
	)[ 0 ];

	var subheadingsLengthResult = subheadingsLengthScore( lowestScore, tooLong, recommendedValue, i18n );

	var assessmentResult = new AssessmentResult();

	assessmentResult.setScore( subheadingsLengthResult.score );
	assessmentResult.setText( subheadingsLengthResult.text );

	return assessmentResult;
};

module.exports = {
	getResult: getSubheadingLength,
	isApplicable: function( paper ) {
		return paper.hasText();
	}
};
