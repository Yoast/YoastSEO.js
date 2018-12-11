/**
 * Tries to require a word list.
 *
 * @param {string} list     The name and filename of the word list.
 * @param {string} language The language code and subdirectory name of the word list.
 *
 * @returns {Object|null} The word list if succeeded, null otherwise.
 */
export default function( list, language = "en" ) {
	try {
		// eslint-disable-next-line global-require
		return require( `./${ language }/${ list }.js` ).default;
	} catch ( e ) {
		console.error( `Unfortunately something went wrong while trying to fetch the word list ${list}`, e );
		return null;
	}
}
