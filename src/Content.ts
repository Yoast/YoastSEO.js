class Content{
    public rawContent: string;

    public constructor(content?: string){
        this.rawContent = content;
    }

    update(){
        throw new Error("Not implemented");
    }

}

export {Content};
