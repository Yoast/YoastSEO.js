import sentences from "./researches/sentences";

var merge = require( "lodash/merge" );
var InvalidTypeError = require( "./errors/invalidType" );
var MissingArgument = require( "./errors/missingArgument" );
var isUndefined = require( "lodash/isUndefined" );
var isEmpty = require( "lodash/isEmpty" );

// Researches
var wordCountInText = require( "./researches/wordCountInText.js" );
var getLinkStatistics = require( "./researches/getLinkStatistics.js" );
var linkCount = require( "./researches/countLinks.js" );
var getLinks = require( "./researches/getLinks.js" );
var urlLength = require( "./researches/urlIsTooLong.js" );
var findKeywordInPageTitle = require( "./researches/findKeywordInPageTitle.js" );
var matchKeywordInSubheadings = require( "./researches/matchKeywordInSubheadings.js" );
const getKeywordDensity = require( "./researches/getKeywordDensity.js" );
const keywordCount = require( "./researches/keywordCount" );
var stopWordsInKeyword = require( "./researches/stopWordsInKeyword" );
var stopWordsInUrl = require( "./researches/stopWordsInUrl" );
var calculateFleschReading = require( "./researches/calculateFleschReading.js" );
var metaDescriptionLength = require( "./researches/metaDescriptionLength.js" );
var imageCount = require( "./researches/imageCountInText.js" );
var altTagCount = require( "./researches/imageAltTags.js" );
var keyphraseLength = require( "./researches/keyphraseLength" );
var metaDescriptionKeyword = require( "./researches/metaDescriptionKeyword.js" );
var keywordCountInUrl = require( "./researches/keywordCountInUrl" );
import findKeywordInFirstParagraph from "./researches/findKeywordInFirstParagraph.js";
var pageTitleWidth = require( "./researches/pageTitleWidth.js" );
var wordComplexity = require( "./researches/getWordComplexity.js" );
var getParagraphLength = require( "./researches/getParagraphLength.js" );
var countSentencesFromText = require( "./researches/countSentencesFromText.js" );
var countSentencesFromDescription = require( "./researches/countSentencesFromDescription.js" );
var getSubheadingTextLengths = require( "./researches/getSubheadingTextLengths.js" );
var findTransitionWords = require( "./researches/findTransitionWords.js" );
var passiveVoice = require( "./researches/getPassiveVoice.js" );
var getSentenceBeginnings = require( "./researches/getSentenceBeginnings.js" );
var relevantWords = require( "./researches/relevantWords" );
var readingTime = require( "./researches/readingTime" );
var getTopicDensity = require( "./researches/getTopicDensity" );
var topicCount = require( "./researches/topicCount" );
const largestKeywordDistance = require( "./researches/largestKeywordDistance" );
const morphology = require( "./researches/buildKeywordForms" ).research;

/**
 * This contains all possible, default researches.
 * @param {Paper} paper The Paper object that is needed within the researches.
 * @constructor
 * @throws {InvalidTypeError} Parameter needs to be an instance of the Paper object.
 */
var Researcher = function( paper ) {
	this.setPaper( paper );

	this.defaultResearches = {
		urlLength: urlLength,
		wordCountInText: wordCountInText,
		findKeywordInPageTitle: findKeywordInPageTitle,
		calculateFleschReading: calculateFleschReading,
		getLinkStatistics: getLinkStatistics,
		getLinks: getLinks,
		linkCount: linkCount,
		imageCount: imageCount,
		altTagCount: altTagCount,
		matchKeywordInSubheadings: matchKeywordInSubheadings,
		keywordCount: keywordCount,
		getKeywordDensity: getKeywordDensity,
		stopWordsInKeyword: stopWordsInKeyword,
		stopWordsInUrl: stopWordsInUrl,
		metaDescriptionLength: metaDescriptionLength,
		keyphraseLength: keyphraseLength,
		keywordCountInUrl: keywordCountInUrl,
		firstParagraph: findKeywordInFirstParagraph,
		metaDescriptionKeyword: metaDescriptionKeyword,
		pageTitleWidth: pageTitleWidth,
		wordComplexity: wordComplexity,
		getParagraphLength: getParagraphLength,
		countSentencesFromText: countSentencesFromText,
		countSentencesFromDescription: countSentencesFromDescription,
		getSubheadingTextLengths: getSubheadingTextLengths,
		findTransitionWords: findTransitionWords,
		passiveVoice: passiveVoice,
		getSentenceBeginnings: getSentenceBeginnings,
		relevantWords: relevantWords,
		readingTime: readingTime,
		getTopicDensity: getTopicDensity,
		topicCount: topicCount,
		sentences,
		largestKeywordDistance: largestKeywordDistance,
		morphology: morphology,
	};

	this._dataProviders = {};

	this.customResearches = {};
};

/**
 * Set the Paper associated with the Researcher.
 * @param {Paper} paper The Paper to use within the Researcher
 * @throws {InvalidTypeError} Parameter needs to be an instance of the Paper object.
 * @returns {void}
 */
Researcher.prototype.setPaper = function( paper ) {
	this.paper = paper;
};

/**
 * Add a custom research that will be available within the Researcher.
 * @param {string} name A name to reference the research by.
 * @param {function} research The function to be added to the Researcher.
 * @throws {MissingArgument} Research name cannot be empty.
 * @throws {InvalidTypeError} The research requires a valid Function callback.
 * @returns {void}
 */
Researcher.prototype.addResearch = function( name, research ) {
	if ( isUndefined( name ) || isEmpty( name ) ) {
		throw new MissingArgument( "Research name cannot be empty" );
	}

	if ( ! ( research instanceof Function ) ) {
		throw new InvalidTypeError( "The research requires a Function callback." );
	}

	this.customResearches[ name ] = research;
};

/**
 * Check wheter or not the research is known by the Researcher.
 * @param {string} name The name to reference the research by.
 * @returns {boolean} Whether or not the research is known by the Researcher
 */
Researcher.prototype.hasResearch = function( name ) {
	return Object.keys( this.getAvailableResearches() ).filter(
		function( research ) {
			return research === name;
		} ).length > 0;
};

/**
 * Return all available researches.
 * @returns {Object} An object containing all available researches.
 */
Researcher.prototype.getAvailableResearches = function() {
	return merge( this.defaultResearches, this.customResearches );
};

/**
 * Return the Research by name.
 * @param {string} name The name to reference the research by.
 * @returns {*} Returns the result of the research or false if research does not exist.
 * @throws {MissingArgument} Research name cannot be empty.
 */
Researcher.prototype.getResearch = function( name ) {
	if ( isUndefined( name ) || isEmpty( name ) ) {
		throw new MissingArgument( "Research name cannot be empty" );
	}

	if ( ! this.hasResearch( name ) ) {
		return false;
	}

	return this.getAvailableResearches()[ name ]( this.paper, this );
};

/**
 * Return the Research by name.
 * @param {string} research The identifier of the research.
 * @param {function} provider The reference to the dataProvider.
 * @returns {void}.
 */
Researcher.prototype.addResearchDataProvider = function( research, provider ) {
	this._dataProviders[ research ] = provider;
};

/**
 * Return the Research by name.
 * @param {string} research The identifier of the research.
 * @returns {*} The data provided by the provider, false if the data do not exist
 */
Researcher.prototype.getProvidedData = function( research ) {
	if ( this._dataProviders.hasOwnProperty( research ) ) {
		return this._dataProviders[ research ];
	}

	return false;
};

module.exports = Researcher;
