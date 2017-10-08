//execute the following command in the terminal while in the PerformanceAnalyses folder:
//node index "input.txt" "en_US" 10

require( "console.table" );
var Paper = require( "../../js/values/Paper" );
var Researcher = require( "../../js/researcher" );
var researches = [ "urlLength", "wordCountInText", "findKeywordInPageTitle", "calculateFleschReading", "getLinkStatistics", "getLinks", "linkCount", "imageCount", "altTagCount", "matchKeywordInSubheadings", "getKeywordDensity", "stopWordsInKeyword", "metaDescriptionLength", "getKeywordDensity", "stopWordsInKeyword", "stopWordsInUrl", "metaDescriptionLength", "keyphraseLength", "keywordCountInUrl", "firstParagraph", "metaDescriptionKeyword", "pageTitleWidth", "getParagraphLength", "countSentencesFromText", "countSentencesFromDescription", "getSubheadingTextLengths", "findTransitionWords", "passiveVoice", "getSentenceBeginnings" ];
var fs = require( "fs" );

var filepath = process.argv[ 2 ];
var locale = process.argv[ 3 ];
var runs = process.argv[ 4 ];

if ( ! filepath ) {
	filepath = __dirname + "/input.txt";
}

if ( ! locale ) {
	locale = "en_US";
}

if ( ! runs ) {
	runs = 1;
}

var text = fs.readFileSync( filepath, { encoding: "utf-8" } );
var paper = new Paper( text );
paper.title = "The 100 Best U.S. Colleges and universities by State | The best schools";
paper.description = "The best colleges and universities list includes a full-fledged research university and college focused on undergraduate education for every state.";
paper.keyword = "university";

function add( a, b ) {
	return a + b;
}

function Result( research, timeElapsed ) {
	this.research = research;
	this.time = timeElapsed;
	this.percentage = -1;
	this.average = -1;
	this.min = -1;
	this.max = -1;
}

function assess( researcher, research, runs ) {
	// Save all run times
	var times = [];
    // Loop for *run* times
	for( var i = 0; i < runs; i++ ) {
		var researchStartTime = Date.now();
		researcher.getResearch( research );
		times[ times.length ] = Date.now() - researchStartTime;
	}
	var result = new Result();
	var totalTime = times.reduce( add, 0 );

	result.research = research;
	result.time = totalTime;
	result.average = totalTime / runs;
	result.min = Math.min.apply( null, times );
	result.max = Math.max.apply( null, times );
	return result;
}

function calculatePercentage( results, totalTime ) {
	for( var i = 0; i < results.length; i++ )        {
		results[ i ].percentage = ( 100 / totalTime ) * results[ i ].time;
	}
	return results;
}

function sortResults( results ) {
	var totalTime = 0;
	for ( var j = 0; j < results.length; j++ ) {
		totalTime += results[ j ].time;
	}
	results = calculatePercentage( results, totalTime );
	results.sort( function( a, b ) {
		return parseFloat( b.percentage ) - parseFloat( a.percentage );
	} );
	return { totalTime, results };
}

function assessAll( runs ) {
	var researcher = new Researcher( paper );
	var results = [];
	var startTime = Date.now();

	for( var i = 0; i < researches.length; i++ ) {
		results[ results.length ] = assess( researcher, researches[ i ], runs );
	}

	const __ret = sortResults( results );
	var totalTime = __ret.totalTime;
	results = __ret.results;

	console.table( results );
	console.log( "Total Time %d", totalTime );
}

assessAll( runs );
