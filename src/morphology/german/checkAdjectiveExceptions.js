import { addAllAdjectiveSuffixes } from "./addAdjectiveSuffixes";
import { addRegularSuffixes } from "./addAdjectiveSuffixes";
import { addComparativeSuffixes } from "./addAdjectiveSuffixes";
import { addSuperlativeSuffixes } from "./addAdjectiveSuffixes";
import { uniq as unique } from "lodash-es";

/**
 *  Returns forms for adjectives that get all suffixes on their second stem (e.g. flexibl-e, flexibl-er, flexibl-est)
 *  but none on their first (flexibel).
 *
 * @param {Object}  morphologyDataAdjectives The German morphology data for nouns.
 * @param {string}  stemmedWordToCheck       The stem to check.
 *
 * @returns {string[]} The created adjective forms.
 */
const twoStemsOneStemGetsSuffixed = function( morphologyDataAdjectives, stemmedWordToCheck ) {
	const exceptionStems = morphologyDataAdjectives.onlySuffixSecondStem;

	for ( let i = 0; i < exceptionStems.length; i++ ) {
		const stemPairToCheck = exceptionStems[ i ];

		if ( stemPairToCheck.includes( stemmedWordToCheck ) ) {
			// The stems that need to be suffixed always end in a consonant; therefore the -n suffix can be removed.
			return [
				stemPairToCheck[ 0 ],
				...addAllAdjectiveSuffixes( morphologyDataAdjectives, stemPairToCheck[ 1 ] ),
			];
		}
	}

	return [];
};

/**
 * Returns forms for adjectives ending in -er. These get the -er re-attached after the stemmer has deleted it and
 * subsequently get all suffixes attached.
 *
 * @param {Object}  morphologyDataAdjectives The German morphology data for nouns.
 * @param {string}  stemmedWordToCheck       The stem to check.
 *
 * @returns {string[]} The created adjective forms.
 */
const erOnlyRestoreEr = function( morphologyDataAdjectives, stemmedWordToCheck ) {
	const exceptionStems = morphologyDataAdjectives.erOnlyRestoreEr;


	if ( exceptionStems.includes( stemmedWordToCheck ) ) {
		/*
		 * Since the stemmer incorrectly removes -er, we need to add it again here. Subsequently we add
		 * all adjective endings to the stem with the restored -er.
		 */
		return [
			stemmedWordToCheck.concat( "er" ),
			...addAllAdjectiveSuffixes( morphologyDataAdjectives, stemmedWordToCheck.concat( "er" ) ),
		];
	}

	return [];
};

/**
 * Returns forms for adjectives ending in -er that have two stems: the -er stem gets -er restored and gets
 * regular and superlative endings (e.g., makaber-e, makaber-ste ); the -r stem gets comparative endings (e.g., makabr-er).
 *
 * @param {Object}  morphologyDataAdjectives The German morphology data for nouns.
 * @param {string}  stemmedWordToCheck       The stem to check.
 *
 * @returns {string[]} The created adjective forms.
 */
const erStemChangeClass1 = function( morphologyDataAdjectives, stemmedWordToCheck ) {
	const exceptionStems = morphologyDataAdjectives.erStemChangeClass1;

	for ( let i = 0; i < exceptionStems.length; i++ ) {
		const stemPairToCheck = exceptionStems[ i ];

		if ( stemPairToCheck.includes( stemmedWordToCheck ) ) {
			return unique( [
				stemPairToCheck[ 0 ].concat( "er" ),
				...addRegularSuffixes( morphologyDataAdjectives, stemPairToCheck[ 0 ].concat( "er" ) ),
				...addSuperlativeSuffixes( morphologyDataAdjectives, stemPairToCheck[ 0 ].concat( "er" ) ),
				...addComparativeSuffixes( morphologyDataAdjectives, stemPairToCheck[ 1 ] ),
			] );
		}
	}

	return [];
};

/**
 * Returns forms for adjectives ending in -er that have two stems: the -er stem gets superlative endings
 * (e.g., sauer-ste) the -r stem gets regular and comparative endings (e.g., saur-e, saur-er).
 *
 * @param {Object}  morphologyDataAdjectives The German morphology data for nouns.
 * @param {string}  stemmedWordToCheck       The stem to check.
 *
 * @returns {string[]} The created adjective forms.
 */
const erStemChangeClass2 = function( morphologyDataAdjectives, stemmedWordToCheck ) {
	const exceptionStems = morphologyDataAdjectives.erStemChangeClass2;

	for ( let i = 0; i < exceptionStems.length; i++ ) {
		const stemPairToCheck = exceptionStems[ i ];

		if ( stemPairToCheck.includes( stemmedWordToCheck ) ) {
			return unique( [
				stemPairToCheck[ 0 ].concat( "er" ),
				...addSuperlativeSuffixes( morphologyDataAdjectives, stemPairToCheck[ 0 ].concat( "er" ) ),
				...addRegularSuffixes( morphologyDataAdjectives, stemPairToCheck[ 1 ] ),
				...addComparativeSuffixes( morphologyDataAdjectives, stemPairToCheck[ 1 ] ),
			] );
		}
	}

	return [];
};

/**
 * Returns forms for adjectives ending in -er that have two stems: the -er stem gets regular,
 * comparative and superlative endings (e.g., finster-e, finster-er, finster-ste); the -r stem gets comparative endings
 * (e.g., finstr-er).
 *
 * @param {Object}  morphologyDataAdjectives The German morphology data for nouns.
 * @param {string}  stemmedWordToCheck       The stem to check.
 *
 * @returns {string[]} The created adjective forms.
 */
const erStemChangeClass3 = function( morphologyDataAdjectives, stemmedWordToCheck ) {
	const exceptionStems = morphologyDataAdjectives.erStemChangeClass3;

	for ( let i = 0; i < exceptionStems.length; i++ ) {
		const stemPairToCheck = exceptionStems[ i ];

		if ( stemPairToCheck.includes( stemmedWordToCheck ) ) {
			return unique( [
				stemPairToCheck[ 0 ].concat( "er" ),
				...addAllAdjectiveSuffixes( morphologyDataAdjectives, stemPairToCheck[ 0 ].concat( "er" ) ),
				...addComparativeSuffixes( morphologyDataAdjectives, stemPairToCheck[ 1 ] ),
			] );
		}
	}

	return [];
};

/**
 * Returns forms for adjectives that get the regular suffixes on their first stem (e.g., gesund-e) and the comparative and
 * superlative suffixes on their second stem (e.g., gesünd-er, gesünd-est).
 *
 * @param {Object}  morphologyDataAdjectives The German morphology data for nouns.
 * @param {string}  stemmedWordToCheck       The stem to check.
 *
 * @returns {string[]} The created adjective forms.
 */
const secondStemCompSup = function( morphologyDataAdjectives, stemmedWordToCheck ) {
	const exceptionStems = morphologyDataAdjectives.secondStemCompSup;

	for ( let i = 0; i < exceptionStems.length; i++ ) {
		const stemPairToCheck = exceptionStems[ i ];

		if ( stemPairToCheck.includes( stemmedWordToCheck ) ) {
			return unique( [
				...addRegularSuffixes( morphologyDataAdjectives, stemPairToCheck[ 0 ] ),
				...addComparativeSuffixes( morphologyDataAdjectives, stemPairToCheck[ 1 ] ),
				...addSuperlativeSuffixes( morphologyDataAdjectives, stemPairToCheck[ 1 ] ),
			] );
		}
	}

	return [];
};

/**
 * Returns forms for adjectives that get all suffixes on the first stem (e.g., blass-e, blass-er, blass-est)
 * and only the comparative and superlative suffixes on the second (bläss-er, bläss-est).
 *
 * @param {Object}  morphologyDataAdjectives The German morphology data for nouns.
 * @param {string}  stemmedWordToCheck       The stem to check.
 *
 * @returns {string[]} The created adjective forms.
 */
const bothStemsComSup = function( morphologyDataAdjectives, stemmedWordToCheck ) {
	const exceptionStems = morphologyDataAdjectives.bothStemsCompSup;

	for ( let i = 0; i < exceptionStems.length; i++ ) {
		const stemPairToCheck = exceptionStems[ i ];

		if ( stemPairToCheck.includes( stemmedWordToCheck ) ) {
			return unique( [
				...addAllAdjectiveSuffixes( morphologyDataAdjectives, stemPairToCheck[ 0 ] ),
				...addComparativeSuffixes( morphologyDataAdjectives, stemPairToCheck[ 1 ] ),
				...addSuperlativeSuffixes( morphologyDataAdjectives, stemPairToCheck[ 1 ] ),
			] );
		}
	}

	return [];
};

/**
 * Checks whether a give stem stem falls into any of the adjective exception categories.
 *
 * @param {Object}  morphologyDataAdjectives The German morphology data for nouns.
 * @param {string}  stemmedWordToCheck       The stem to check.
 *
 * @returns {string[]} The created adjective forms.
 */
export function checkAdjectiveExceptions( morphologyDataAdjectives, stemmedWordToCheck ) {
	const exceptionChecks = [
		twoStemsOneStemGetsSuffixed,
		erOnlyRestoreEr,
		/*
		 * Within the group of adjectives ending in -er with two stems, there are different classes
		 * of adjectives with regards to what endings they get on which stem.
		 */
		erStemChangeClass1,
		erStemChangeClass2,
		erStemChangeClass3,
		secondStemCompSup,
		bothStemsComSup,
	];

	for ( let i = 0; i < exceptionChecks.length; i++ ) {
		const exceptions = exceptionChecks[ i ]( morphologyDataAdjectives, stemmedWordToCheck );
		if ( exceptions.length > 0 ) {
			return exceptions;
		}
	}

	return [];
}