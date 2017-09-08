class Node<T>{
    private data: T;
    private children: Array<Node<T>>;
    private parent: Node<T>;

    constructor();
    constructor(data: T);
    constructor(data?: T){
        this.children = new Array<Node<T>>();
        this.setData(data);
    }

    public getParent() {
        return this.parent;
    }

    public getChildren() {
        return this.children;
    }

    public getNumberOfChildren() {
        return this.getChildren().length;
    }

    public hasChildren() {
        return (this.getNumberOfChildren() > 0);
    }

    public setChildren(children: Array<T> ) {
        let childNodes = new Array<Node<T>>();
        for(let child of children) {
            let childNode = new Node<T>(child);
            childNode.parent = this;
            childNodes.push(childNode);
        }
        this.children = childNodes;
    }

    public addChild(child: T) {
        let childNode = new Node<T>(child);
        childNode.parent = this;
        this.children.push(childNode);
    }

    public removeChildren() {
        this.children = new Array<Node<T>>();
    }

    public removeChildAt(index: number) {
        delete this.children[index];
    }

    public getData() {
        return this.data;
    }

    public setData(data: T) {
        this.data = data;
    }
}

export {Node};