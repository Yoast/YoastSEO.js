let getLanguage = require( "../helpers/getLanguage.js" );
let isUndefined = require( "lodash/isUndefined" );

let es = require( "./stopwords/es.json" ).stopwords;
let en = require( './stopwords/en.json' ).stopwords;

let languages = { es, en };

module.exports = function( locale = "en_US" ) {
	let language = getLanguage( locale );

	if( languages.hasOwnProperty( language ) ) {
		return languages[ language ];
	}

	// If an unknown locale is used, default to English.
	return languages[ "en" ];
};
