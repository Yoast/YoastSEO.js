import {Content} from "./Content";
class Section extends Content{
    public subHeadingTitle : string;

    constructor(content: string, title: string){
        super(content);
        this.subHeadingTitle = title;
    }
}
export { Section };
