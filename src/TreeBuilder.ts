import {Content} from "./Content";
import {Node} from "./Node";
import {Text} from "./Text";
import {Section} from "./Section";
import * as fs from 'fs';
import {join} from "path";


var text1 : string = fs.readFileSync(join(__dirname, "../src/text1"),"utf8");
var text2 : string = fs.readFileSync(join(__dirname, "../src/text2"),"utf8");

let tree = new Node<Content>(new Text(text1));
console.log(tree);
