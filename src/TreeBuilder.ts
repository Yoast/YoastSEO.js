import {Content} from "./Content";
import {Node} from "./Node";
import {Text} from "./Text";
import * as fs from 'fs';
import {join} from "path";
import {Section} from "./Section";
var getSubheadingContents = require( "./stringProcessing/getSubheadings.js" ).getSubheadingContents;
var getSubheadings = require( "./stringProcessing/getSubheadings.js" ).getSubheadings;


var text1 : string = fs.readFileSync(join(__dirname, "../src/text1"),"utf8");
// var text2 : string = fs.readFileSync(join(__dirname, "../src/text2"),"utf8");

console.time('someFunction');
buildTree(text1);
console.timeEnd('someFunction');

function buildTree(text: string): Node<Content>{
    let tree = new Node<Content>(new Text(text));

    //create sections
    let sectionHeading = getSubheadings(text);
    for(let i = 0; i < sectionHeading.length; i++){
        tree.addChild(new Section( sectionHeading[ i ][ 0 ] + sectionHeading[ i ].input,sectionHeading[ i ][ 0 ] ));
    }
    console.log(tree);

    return tree;
}