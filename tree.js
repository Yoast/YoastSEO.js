#!/usr/bin/env node

const fs = require( "fs" );
const htmlparser = require( "htmlparser2" );
const _defaultsDeep = require( "lodash/defaultsDeep" );
const _repeat = require( "lodash/repeat" );
const md5 = require( "blueimp-md5" );
const XXH = require( "xxhashjs" );
const ourParser = require( "./js/stringProcessing/htmlParser" );
const getBlocks = require( "./src/helpers/html" ).getBlocks;
const JSDiff = require( "diff" );
const sax = require( "sax" );

const _take = require( "lodash/take" );

let text = fs.readFileSync( "./examples/PerformanceAnalyses/text3.html", { encoding: "utf-8" } );
let textModified = fs.readFileSync( "./examples/PerformanceAnalyses/text3-modified.html", { encoding: "utf-8" } );
text = `
	<h2>
		<strong>
			Table of Contents
		</strong>
	</h2>
	<h2>
		Test
	</h2>
	<h2>
		More text
	</h2>`;
textModified = `
	<h2>
		<strong>
			Table of Contents
		</strong>
	</h2>
	<h2>
		A different kind of test.
	</h2>
	<h2>
		More text
	</h2>`;

text = text.replace( /[\n\s]{2,}/g, "" );
textModified = textModified.replace( /[\n\s]{2,}/g, "" );

let simpleText = "<h2><strong>Table of Contents</strong></h2>";
let simpleText2 = "<h2><strong>Table of Contents2</strong></h2>";

var hScriptParser = require('html2hscript');
console.time( "hyper" );

const tree = {
	type: "root",
	children: [],
};

const defaultNode = {
	type: "",
	children: [],
};

let currentNode = tree;

let parser = sax.parser( false );
console.time( "XML" );
parser.write( text ).end();
console.timeEnd( "XML" );


function hashFunction( input ) {
	return input;
	// if ( input.length <= 100 ) {
	// 	return input;
	// }

	return XXH.h32( input, 0xABCD ).toString( 16 );

	return md5( input );
}

// const parser = new htmlparser.Parser( {
// 	onopentag: function( name, attribs ) {
// 		// Console.log( arguments );
//
// 		let node = Object.assign( {}, defaultNode, {
// 			name,
// 			parent: currentNode,
// 		} );
//
// 		currentNode.children.push( node );
// 		currentNode = node;
// 	},
// 	ontext: function( text ) {
// 		let node = Object.assign( {}, defaultNode, {
// 			type: "text",
// 			content: text,
// 		} );
//
// 		currentNode.children.push( node );
// 	},
// 	onclosetag: function( tagname ) {
// 		currentNode = currentNode.parent;
// 	},
// }, { decodeEntities: true } );

// console.time( "time" );
// parser.write( text );
// parser.end();
//
// console.log( tree );
// console.timeEnd( "time" );


const parse5 = require( "parse5" );
const http = require( "http" );

const file = fs.createWriteStream( "./google.com.html" );
const parser2 = new parse5.SAXParser( {
	locationInfo: true,
} );

const newTree = {
	type: "root",
	children: [],
};

// console.time( "onlyParser" );
// parser2.write( text );
// parser2.end();
// console.timeEnd( "onlyParser" );

parser2.on( "startTag", ( tagName, attributes, selfClosing, location ) => {
	// console.log( "startTag", tagName );
	let newNode = _defaultsDeep( {}, {
		type: tagName,
		start: location.startOffset,
		startTagEnd: location.endOffset,
	}, defaultNode );

	// Must not be a copy to reference the correct node.
	newNode.parent = currentNode;

	currentNode.children.push( newNode );

	if ( selfClosing ) {
		newNode.end = location.endOffset;
	} else {
		currentNode = newNode;
	}
} );

parser2.on( "text", ( text, location ) => {
	// console.log( "text" );
	let newTextNode = _defaultsDeep( {}, {
		type: "text",
		content: text,
		start: location.startOffset,
		end: location.endOffset,
	}, defaultNode );

	currentNode.children.push( newTextNode );
} );

parser2.on( "endTag", ( tagName, location ) => {
	// console.log( "endTag", tagName );
	currentNode.end = location.endOffset;
	currentNode.endTagStart = location.startOffset;
	currentNode = currentNode.parent;
} );

parser2.on( "comment", ( text, location ) => {
	// console.log( "comment" );
	let node = _defaultsDeep( {}, {
		type: "comment",
		content: text,
		start: location.startOffset,
		end: location.endOffset,
	}, defaultNode );

	currentNode.children.push( node );
} );

parser2.on( "doctype", ( name, publicId, systemId, location ) => {
	console.log( name, publicId, systemId, location );
} );


function calculateHashes( text, tree ) {
	tree.children.forEach( ( node ) => {
		let textPart = text.substring( node.start, node.end );

		node.content = textPart;
		node.hash = hashFunction( textPart );

		calculateHashes( text, node );
	} );
}

console.time( "time" );
parser2.write( text );
parser2.end();
console.timeEnd( "time" );

// console.time( "ourParser" );
// let text3 = ourParser( text );
// console.timeEnd( "ourParser" );
//
// console.time( "getBlocks" );
// let blocks = getBlocks( text );
// console.timeEnd( "getBlocks" );

// console.time( "diff" );
// let diff = JSDiff.diffLines( text, textModified, {
// 	ignoreWhitespace: false,
// 	newlineIsToken: true,
// } );
// console.timeEnd( "diff" );
// console.log( diff );

// process.exit();

calculateHashes( text, tree );

const util = require( "util" );
// console.log( util.inspect( tree, { depth: 4 } ) );

function displayTree( text, tree, inset = 1 ) {
	tree.children.forEach( ( node ) => {
		let spacing = _repeat( " ", inset );

		let textPart = text.substring( node.start, node.end );

		console.log( spacing, node.type, node.start, node.end, textPart );

		displayTree( text, node, inset + 2 );
	} );
}

const baseTree = {
	type: "root",
	children: [],
};

const movementThreshold = 100;

function moveNodeOffsetsRecursively( movement, node ) {
	node.start += movement;
	node.end += movement;
	node.startTagEnd += movement;
	node.endTagStart += movement;

	node.children.forEach( ( node ) => {
		moveNodeOffsetsRecursively( movement, node );
	} );
}

function checkTree( text, newTree, tree ) {
	// const checkParser = parse5.SAXParser( {
	// 	locationInfo: true,
	// } );

	let reducingText = text;
	let cachedUntil = 0;
	let hasUnknownHTML = false;

	let removedLength = 0;

	let parseAgain = [];

	let globalMovement = 0;

	tree.children.forEach( ( node, i ) => {
		let previousStart = node.start + globalMovement;
		let previousEnd = node.end + globalMovement;

		let relativeStart = previousStart - removedLength;
		let relativeEnd = previousEnd - removedLength;

		let textPart = text.substring( previousStart, previousEnd );
		let relativeTextPart = reducingText.substring( relativeStart, relativeEnd );

		// console.log( 'i', i );
		// console.log( 'ranges', previousStart, relativeStart, previousEnd, relativeEnd );

		if ( textPart !== relativeTextPart ) {
			// console.log( 'INCORRECT!!!' );
			// console.log( textPart, relativeTextPart );
		}

		// console.time( "hash" );
		let hash = hashFunction( textPart );
		// console.timeEnd( "hash" );

		if ( hash === node.hash ) {
			newTree.children.push( node );


			let nodeLength = previousEnd - previousStart;

			removedLength += nodeLength;


			let oldLength = reducingText.length;
			reducingText = reducingText.substring( previousEnd - previousStart );
			// console.log( 'global', globalMovement );
			// console.log( 'cached', reducingText.length, previousEnd - previousStart, oldLength, oldLength - ( previousEnd - previousStart ) );

			cachedUntil = node.end;

			return;
		}

		// console.log( node );

		let movedStart = reducingText.indexOf( node.content );
		if ( movedStart !== -1 ) {
			// console.log( 'MOVED START', movedStart );
			let movement = movedStart - relativeStart;
			globalMovement += movement;

			if ( Math.abs( movement ) < movementThreshold ) {
				/*
				 * Find string that needs to be parsed again. Everything from the last known location to the newly found start of this node.
				 */

				let reparseString = text.substring( cachedUntil, movedStart );

				newTree.children.push( {
					type: "regenerate-tree",
					content: reparseString,
					start: cachedUntil,
					end: movedStart,
					children: [],
				} );

				moveNodeOffsetsRecursively( movement, node );

				newTree.children.push( node );

				hasUnknownHTML = false;
			}
		}

		hasUnknownHTML = true;
	} );

	// console.log( newTree.children );

	return newTree;
}
console.log( 'original tree:' );
displayTree( text, tree );

console.time( "checkTree" );

let checkedTree = checkTree( textModified, baseTree, tree );
console.timeEnd( "checkTree" );
// console.log( process.memoryUsage().heapUsed / 1024 / 1024 );
//

console.log( "\n", 'checked tree:' );
displayTree( textModified, checkedTree );


{/*<h2><strong>Table of Contents</strong></h2>*/}

// console.time( "time" );
// parser.write( text );
// parser.end();
//
// console.log( tree );
// console.timeEnd( "time" );
