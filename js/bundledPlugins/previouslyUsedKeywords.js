var AssessmentResult = require( "../values/AssessmentResult.js" );
var isUndefined = require( "lodash/isUndefined" );

/**
 * Constructs the PreviouslyUsedKeywords plugin
 * @param {object} app The app
 * @param {object} usedKeywords An object with keywords and ids where they are used
 * @param {string} searchUrl The url used to link to a search page when multiple usages of the keyword are found
 * @param {string} postUrl The url used to link to a post when 1 usage of the keyword is found
 * @constructor
 */
var PreviouslyUsedKeywords = function( app, usedKeywords, searchUrl, postUrl ) {
	this.app = app;
	this.usedKeywords = usedKeywords;
	this.searchUrl = searchUrl;
	this.postUrl = postUrl;
	this.i18n = this.app.i18n;
};

/**
 * Registers the assessment with the assessor.
 */
PreviouslyUsedKeywords.prototype.registerPlugin = function() {
	this.app.registerAssessment( "usedKeywords", this.assess, "previouslyUsedKeywords" );
};

/**
 * Scores the previously used keyword assessment based on the count.
 * @param {int} count The number of usages found of the keyword.
 * @param {int} id The ID of a post.
 * @param {string} keyword The keyword.
 * @returns {object} the scoreobject with text and score.
 */
PreviouslyUsedKeywords.prototype.scoreAssessment = function( count, id, keyword ) {
	if( count === 0 ) {
		return {
			text: this.i18n.dgettext( "js-text-analysis", "You've never used this focus keyword before, very good." ),
			score: 9
		};
	}
	if( count === 1 ) {
		var url = "<a href='" + this.postUrl.replace( "{id}", id ) + "'>";
		return {
			/* translators: %1$s and %2$s expand to an admin link where the focus keyword is already used */
			text:  this.i18n.sprintf( this.i18n.dgettext( "js-text-analysis", "You've used this focus keyword %1$sonce before%2$s, " +
				"be sure to make very clear which URL on your site is the most important for this keyword." ), url, "</a>" ),
			score: 6
		};
	}
	if( count > 1 ) {
		url = "<a href='" + this.searchUrl.replace( "{keyword}", keyword )+ "'>";
		return {
			/* translators: %1$s and $3$s expand to the admin search page for the focus keyword, %2$d expands to the number of times this focus
			 keyword has been used before, %4$s and %5$s expand to a link to an article on yoast.com about cornerstone content */
			text:  this.i18n.sprintf( this.i18n.dgettext( "js-text-analysis", "You've used this focus keyword %1$s%2$d times before%3$s, " +
				"it's probably a good idea to read %4$sthis post on cornerstone content%5$s and improve your keyword strategy." ),
				url, count, "</a>", "<a href='https://yoast.com/cornerstone-content-rank/' target='new'>", "</a>" ),
			score: 1
		};
	}
};

/**
 * The assessment for the previously used keywords.
 * @returns {AssessmentResult} The assessment result of the assessment
 */
PreviouslyUsedKeywords.prototype.assess = function() {
	var keyword = this.app.paper.getKeyword();
	var count = 0;
	var id = 0;
	if ( !isUndefined( this.usedKeywords[ keyword ] ) ) {
		count = this.usedKeywords[ keyword ].length;
	}
	if ( count === 1 ) {
		id = this.usedKeywords[ keyword ][ 0 ];
	}
	var result = this.scoreAssessment( count, id, keyword );

	var assessmentResult =  new AssessmentResult();
	assessmentResult.setScore( result.score );
	assessmentResult.setText( result.text );

	return assessmentResult;
};

module.exports = PreviouslyUsedKeywords;
