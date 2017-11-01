/** @module config/syllables */

let getLanguage = require( "../helpers/getLanguage.js" );
let isUndefined = require( "lodash/isUndefined" );

let de = require( "./syllables/de.js" );
let en = require( "./syllables/en.js" );
let nl = require( "./syllables/nl.js" );
let it = require( "./syllables/it.js" );

let languages = { de, nl, en, it };

module.exports = function( locale = "en_US" ) {
	let language = getLanguage( locale );

	if( languages.hasOwnProperty( language ) ) {
		return languages[ language ];
	}

	// If an unknown locale is used, default to English.
	return languages.en;
};
