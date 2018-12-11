/**
 * Tries to import a word list.
 *
 * @param {string} list     The name and filename of the word list.
 * @param {string} language The language code and subdirectory name of the word list.
 *
 * @returns {Promise<*>|*} The promise of the list.
 */
export default function( list, language = "en" ) {
	return new Promise( ( resolve, reject ) => {
		require.ensure(
			[],
			require => {
				resolve( require( `./${ language }/${ list }.js` ) );
			},
			error => reject( error ),
			"wordlist"
		);
		// import(
		// 	/* webpackInclude: /\.js$/ */
		// 	/* webpackChunkName: "wordlist" */
		// 	/* webpackMode: "lazy-once" */
		// 	`./${ language }/${ list }`
		// );
	} );
}
