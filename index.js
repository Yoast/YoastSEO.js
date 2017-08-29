var plugins = {
	usedKeywords: require( "./build/bundledPlugins/previouslyUsedKeywords" ),
};

var helpers = {
	scoreToRating: require( "./build/interpreters/scoreToRating" ),
};

module.exports = {
	Assessor: require( "./build/assessor" ),
	SEOAssessor: require( "./build/seoAssessor" ),
	ContentAssessor: require( "./build/contentAssessor" ),
	App: require( "./build/app" ),
	Pluggable: require( "./build/pluggable" ),
	Researcher: require( "./build/researcher" ),
	SnippetPreview: require( "./build/snippetPreview.js" ),

	Paper: require( "./build/values/Paper" ),
	AssessmentResult: require( "./build/values/AssessmentResult" ),

	bundledPlugins: plugins,
	helpers: helpers,
};
