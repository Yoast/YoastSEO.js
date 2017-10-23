import {Content} from "./Content";
var getSubheadingContents = require( "./stringProcessing/getSubheadings.js" ).getSubheadingContents;
var getSubheadings = require( "./stringProcessing/getSubheadings.js" ).getSubheadings;
class Text extends Content{

    function update(){
        //split text in sections
    console.log(getSubheadings(this.))
}

}
export { Text };
