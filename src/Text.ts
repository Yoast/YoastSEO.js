import {Content} from "./Content";
var getSubheadingContents = require( "./stringProcessing/getSubheadings.js" ).getSubheadingContents;
var getSubheadings = require( "./stringProcessing/getSubheadings.js" ).getSubheadings;

class Text extends Content{

    constructor(content: string){
        super(content);
        this.update();
    }

    update(){
        // console.log("banana");
    }
}

export { Text };
