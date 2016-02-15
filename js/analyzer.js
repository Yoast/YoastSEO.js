var sanitizeString = require( "../js/stringProcessing/sanitizeString.js" );
var stringToRegex = require( "../js/stringProcessing/stringToRegex.js" );
var replaceDiacritics = require( "../js/stringProcessing/replaceDiacritics.js" );

var AnalyzeScorer = require( "./analyzescorer.js" );
var analyzerConfig = require( "./config/config.js" );

var valueObject = {};

/**
 * Text Analyzer, accepts args for config and calls init for initialization
 *
 * @param {Object} args The analyzer arguments.
 * @param {String} args.keyword The keyword to analyze the text with.
 * @param {String} args.meta The meta description of the page.
 * @param {String} args.text The text of the page.
 * @param {String} args.pageTitle The title of the page as displayed in google.
 * @param {String} args.title The actual title of the page.
 * @param {String} args.url The full URL that the page will be displayed on.
 * @param {String} args.excerpt The page excerpt.
 * @param {String} args.snippetTitle The title as displayed in the snippet preview.
 * @param {String} args.snippetMeta The meta description as displayed in the snippet preview.
 * @param {String} args.snippetCite  The URL as displayed in the snippet preview.
 *
 * @property {Object} analyses Object that contains all analyses.
 *
 * @constructor
 */
var Analyzer = function( args ) {
	this.config = args;
	valueObject = args;

	this.checkConfig();
	this.init( args );

	this.analyses = {};
};

/**
 * sets value to "" of text if it is undefined to make sure it doesn' break the analyzer
 */
Analyzer.prototype.checkConfig = function() {
	if ( typeof this.config.text === "undefined" ) {
		this.config.text = "";
	}
};

/**
 * YoastSEO.Analyzer initialization. Loads defaults and overloads custom settings.
 */
Analyzer.prototype.init = function( args ) {
	this.config = args;
	this.initDependencies();
	this.formatKeyword();
	this.initQueue();
	this.loadWordlists();
	this.__output = [];
	this.__store = {};
};

/**
 * creates a regex from the keyword including /ig switch so it is case insensitive and global.
 * replaces a number of characters that can break the regex.
*/
Analyzer.prototype.formatKeyword = function() {
	if ( typeof this.config.keyword !== "undefined" && this.config.keyword !== "" ) {

		// removes characters from the keyword that could break the regex, or give unwanted results.
		// leaves the - since this is replaced later on in the function
		var keyword = sanitizeString( this.config.keyword );

		// Creates new regex from keyword with global and caseinsensitive option,

		this.keywordRegex = stringToRegex(
			replaceDiacritics( keyword.replace( /[-_]/g, " " )
		) );

		// Creates new regex from keyword with global and caseinsensitive option,
		// replaces space with -. Used for URL matching
		this.keywordRegexInverse = stringToRegex(
			replaceDiacritics( keyword.replace( /\s/g, "-" ) ),
			"\\-"
		);
	}
};

/**
 * initializes required objects.
 * For the analyzeScorer a new object is always defined, to make sure there are no duplicate scores
 */
Analyzer.prototype.initDependencies = function() {

	//init scorer
	this.analyzeScorer = new AnalyzeScorer( this );
};

/**
 * initializes the function queue. Uses slice for assignment so it duplicates array in stead of
 * referencing it.
 */
Analyzer.prototype.initQueue = function() {
	var fleschReadingIndex;

	//if custom queue available load queue, otherwise load default queue.
	if ( typeof this.config.queue !== "undefined" && this.config.queue.length !== 0 ) {
		this.queue = this.config.queue.slice();
	} else {
		this.queue = analyzerConfig.queue.slice();
	}

	// Exclude the flesh easy reading score for non-english languages
	if ( 0 !== this.config.locale.indexOf( "en_" ) && ( fleschReadingIndex = this.queue.indexOf( "fleschReading" ) ) ) {
		this.queue.splice( fleschReadingIndex, 1 );
	}
};

/**
 * load wordlists.
 */
Analyzer.prototype.loadWordlists = function() {

	//if no available keywords, load default array
	if ( typeof this.config.wordsToRemove === "undefined" ) {
		this.config.wordsToRemove = analyzerConfig.wordsToRemove;
	}
	if ( typeof this.config.stopWords === "undefined" ) {
		this.config.stopWords = analyzerConfig.stopWords;
	}
};

/**
 * starts queue of functions executing the analyzer functions untill queue is empty.
 */
Analyzer.prototype.runQueue = function() {
	var output, score;

	// Remove the first item from the queue and execute it.
	if ( this.queue.length > 0 ) {
		var currentQueueItem = this.queue.shift();

		if ( undefined !== this[ currentQueueItem ] ) {
			output = this[ currentQueueItem ]();
		} else if ( this.analyses.hasOwnProperty( currentQueueItem ) ) {
			score = this.analyses[ currentQueueItem ].callable();

			/*
			 * This is because the analyzerScorer requires this format and we want users that add plugins to just return
			 * a score because that makes the API easier. So this is a translation while our internal format isn't
			 * perfect.
			 */
			output = {
				"test": this.analyses[ currentQueueItem ].name,
				"result": score
			};
		}

		this.__output = this.__output.concat( output );

		this.runQueue();
	} else {
		this.score();
	}
};

/**
 * Adds an analysis to the analyzer
 *
 * @param {Object}   analysis The analysis object.
 * @param {string}   analysis.name The name of this analysis.
 * @param {function} analysis.callable The function to call to calculate this the score.
 */
Analyzer.prototype.addAnalysis = function( analysis ) {
	this.analyses[ analysis.name ] = analysis;
	this.queue.push( analysis.name );
};

/**
 * returns wordcount from this.config.text
 * @returns {{test: string, result: Number)}}
 */
Analyzer.prototype.wordCount = function() {
	var countWords = require( "./stringProcessing/countWords.js" );
	return [ { test: "wordCount", result: countWords( valueObject.text ) } ];
};

/**
 * Checks if keyword is present, if not returns 0
 * @returns {{test: string, result: number}[]}
 */
Analyzer.prototype.keyphraseSizeCheck = function() {
	var getKeyphraseLength = require( "./analyses/getWordCount.js" );
	return [ { test: "keyphraseSizeCheck", result: getKeyphraseLength( valueObject.keyword ) } ];
};

/**
 * checks the keyword density of given keyword against the cleantext stored in __store.
 * @returns resultObject
 */
Analyzer.prototype.keywordDensity = function() {
	var getKeywordDensity = require( "./analyses/getKeywordDensity.js" );
	var countWords = require( "./stringProcessing/countWords.js" );
	var matchWords = require( "./stringProcessing/matchTextWithWord.js" );
	var keywordCount = countWords(valueObject.text );

	if ( keywordCount >= 100 ) {
		var density = getKeywordDensity( valueObject );

		// Present for backwards compatibility with the .refObj.__store.keywordCount option in scoring.js
		this.__store.keywordCount = matchWords( this.config.text, this.config.keyword );

		return [ { test: "keywordDensity", result: density } ];
	}
};

/**
 * counts the number of keyword occurrences of the keyword. Saves this in the __store and returns
 * it.
 * @returns keywordCount
 */
Analyzer.prototype.keywordCount = function() {
	var matchTextWithWord = require( "./stringProcessing/matchTextWithWord.js" );
	var keywordCount = matchTextWithWord( this.config.text, this.config.keyword );

	return keywordCount;
};

/**
 * checks if keywords appear in subheaders of stored cleanTextSomeTags text.
 * @returns resultObject
 */
Analyzer.prototype.subHeadings = function() {
	var getSubheadings = require( "./analyses/matchKeywordInSubheadings.js" );

	var result = [ { test: "subHeadings", result: getSubheadings( this.config.text, this.config.keyword ) } ];

	return result;
};

/**
 * check if the keyword contains stopwords.
 * @returns {result object}
 */
Analyzer.prototype.stopwords = function() {
	var checkStringForStopwords = require( "./analyses/checkStringForStopwords.js" );
	var matches = checkStringForStopwords( this.config.keyword );

	/* Matchestext is used for scoring, we should move this to the scoring */
	var matchesText = matches.join( ", " );

	return [ {
		test: "stopwordKeywordCount",
		result: {
			count: matches.length,
			matches: matchesText
		}
	} ];
};

/**
 * calculate Flesch Reading score
 * formula: 206.835 - 1.015 (total words / total sentences) - 84.6 ( total syllables / total words);
 * @returns {result object}
 */
Analyzer.prototype.fleschReading = function() {
	var calculateFleschReading = require( "./analyses/calculateFleschReading.js" );
	var score = calculateFleschReading( this.config.text );
	if ( score < 0 ) {
		score = 0;
	}

	if ( score > 100 ) {
		score = 100;
	}

	return [ { test: "fleschReading", result: score } ];
};

/**
 * counts the links in a given text. Also checks if a link is internal of external.
 * @returns {
 * 		{
 * 			total: number, internal: {
 * 				total: number,
 * 				totalNaKeyword: number,
 * 				totalKeyword: number,
 * 				dofollow: number,
 * 				nofollow: number
 * 			}, external: {
 * 				total: number,
 * 				dofollow: number,
 * 				nofollow: number
 * 			}, other: {
 * 				total: number,
 * 				dofollow: number,
 * 				nofollow: number
 * 			}
 * 		}
 * 	}
 */
Analyzer.prototype.linkCount = function() {
	var countLinks = require( "./analyses/getLinkStatistics.js" );
	var keyword = this.config.keyword;

	if ( typeof keyword === "undefined" ) {
		keyword = "";
	}

	return [ { test: "linkCount", result: countLinks( this.config.text, keyword, this.config.baseUrl ) } ];
};

/**
 * counts the number of images found in a given textstring, based on the <img>-tag and returns a
 * result object
 *
 * @todo update function so it will also check on picture elements/make it configurable.
 *
 * @returns {{name: string, result: {total: number, alt: number, noAlt: number}}}
 */
Analyzer.prototype.imageCount = function() {
	var countImages = require( "./analyses/getImageStatistics.js" );
	return [ { test: "imageCount", result: countImages( this.config.text, this.config.keyword ) } ];
};

/**
 * counts the number of characters in the pagetitle, returns 0 if empty or not set.
 * @returns {{name: string, count: *}}
 */
Analyzer.prototype.pageTitleLength = function() {
	var result =  [ { test: "pageTitleLength", result:  0 } ];
	if ( typeof this.config.pageTitle !== "undefined" ) {
		result[ 0 ].result = this.config.pageTitle.length;
	}
	return result;
};

/**
 * counts the occurrences of the keyword in the pagetitle, returns 0 if pagetitle is empty or not
 * set.
 *
 * @returns {{name: string, count: number}}
 */
Analyzer.prototype.pageTitleKeyword = function() {
	var findKeywordInPageTitle = require( "./analyses/findKeywordInPageTitle.js" );
	var result = [ { test: "pageTitleKeyword", result: { position: -1, matches: 0 } } ];
	if ( typeof this.config.pageTitle !== "undefined" && typeof this.config.keyword !== "undefined" ) {
		result[0].result = findKeywordInPageTitle( this.config.pageTitle, this.config.keyword );
	}
	return result;
};

/**
 * counts the occurrences of the keyword in the first paragraph, returns 0 if it is not found,
 * if there is no paragraph tag or 0 hits, it checks for 2 newlines
 * @returns {{name: string, count: number}}
 */
Analyzer.prototype.firstParagraph = function() {
	var findKeywordInFirstParagraph = require( "./analyses/findKeywordInFirstParagraph.js" );
	var result = [ { test: "firstParagraph", result: findKeywordInFirstParagraph( this.config.text, this.config.keyword ) } ];
	return result;
};

/**
 * counts the occurrences of the keyword in the metadescription, returns 0 if metadescription is
 * empty or not set. Default is -1, if the meta is empty, this way we can score for empty meta.
 * @returns {{name: string, count: number}}
 */
Analyzer.prototype.metaDescriptionKeyword = function() {
	var wordMatch = require( "./stringProcessing/matchTextWithWord.js" );
	var result = [ { test: "metaDescriptionKeyword", result: -1 } ];

	if ( typeof this.config.meta !== "undefined" && typeof this.config.keyword !== "undefined" &&
		this.config.meta !== "" && this.config.keyword !== "" ) {
		result[ 0 ].result = wordMatch( this.config.meta, this.config.keyword );
	}

	return result;
};

/**
 * returns the length of the metadescription
 * @returns {{test: string, result: Number}[]}
 */
Analyzer.prototype.metaDescriptionLength = function() {
	var result = [ { test: "metaDescriptionLength", result: 0 } ];
	if ( typeof  this.config.meta !== "undefined" ) {
		result[ 0 ].result =  this.config.meta.length;
	}

	return result;
};

/**
 * counts the occurences of the keyword in the URL, returns 0 if no URL is set or is empty.
 * @returns {{name: string, count: number}}
 */
Analyzer.prototype.urlKeyword = function() {
	var checkForKeywordInUrl = require( "./analyses/countKeywordInUrl.js" );
	var score = 0;

	if ( typeof this.config.keyword !== "undefined" && typeof this.config.url !== "undefined" ) {
		score = checkForKeywordInUrl( this.config.url, this.config.keyword );
	}

	var result = [ { test: "urlKeyword", result: score } ];
	return result;
};

/**
 * returns the length of the URL
 * @returns {{test: string, result: number}[]}
 */
Analyzer.prototype.urlLength = function() {
	var isUrlTooLong = require( "./analyses/isUrlTooLong.js" );
	var result = [ { test: "urlLength", result: { urlTooLong: isUrlTooLong(
		this.config.url,
		this.config.keyword,
		this.config.maxSlugLength,
		this.config.maxUrlLength
	) } } ];
	return result;
};

/**
 * checks if there are stopwords used in the URL.
 * @returns {{test: string, result: number}[]}
 */
Analyzer.prototype.urlStopwords = function() {
	var checkUrlForStopwords = require( "./analyses/checkUrlForStopwords.js" );
	var result = [ { test: "urlStopwords", result: checkUrlForStopwords( this.config.url ) } ];

	return result;
};

/**
 * checks if the keyword has been used before. Uses usedkeywords array. If empty, returns 0.
 * @returns {{test: string, result: number}[]}
 */
Analyzer.prototype.keywordDoubles = function() {
	var result = [ { test: "keywordDoubles", result: { count: 0, id: 0 } } ];
	if ( typeof this.config.keyword !== "undefined" && typeof this.config.usedKeywords !== "undefined" ) {
		var checkForKeywordDoubles = require( "./analyses/checkForKeywordDoubles.js" );
		result[0].result = checkForKeywordDoubles( this.config.keyword, this.config.usedKeywords );
	}
	return result;
};

/**
 * runs the scorefunction of the analyzeScorer with the generated output that is used as a queue.
 */
Analyzer.prototype.score = function() {
	this.analyzeScorer.score( this.__output );
};

module.exports = Analyzer;
