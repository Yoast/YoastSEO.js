var plugins = {
	usedKeywords: require( "./js/bundledPlugins/previouslyUsedKeywords" )
};

var helpers = {
	scoreToRating: require( "./js/interpreters/scoreToRating" )
};

module.exports = {
	Assessor: require( "./js/assessor" ),
	SEOAssessor: require( "./js/seoAssessor" ),
	SEOPremiumAssessor: require( "./js/SEOPremiumAssessor" ),
	SEOPremiumCornerstoneAssessor: require( "./js/cornerstone/seoPremiumAssessor" ),
	ContentAssessor: require( "./js/contentAssessor" ),
	App: require( "./js/app" ),
	Pluggable: require( "./js/pluggable" ),
	Researcher: require( "./js/researcher" ),
	SnippetPreview: require( "./js/snippetPreview.js" ),

	Paper: require( "./js/values/Paper" ),
	AssessmentResult: require( "./js/values/AssessmentResult" ),

	bundledPlugins: plugins,
	helpers: helpers
};
