export class TreeNode {
    items: string[]

    child: undefined | TreeNode

    constructor(items: string[], child: undefined | TreeNode = undefined) {
        this.items = items;
        this.child = child;
    }
}