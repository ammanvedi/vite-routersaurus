import {Element, Root} from "hast";
import {clone} from "../../object/clone";
import {traverse} from "../../tree/traverse";

export const addTagToHead = (root: Readonly<Root>, tag: Readonly<Element>): Readonly<Root> => {
    const rootCopy = clone(root)

    traverse<Root, Root['children']>(rootCopy, null, (node) => {
        if(node.type === 'element' && node.tagName === 'head') {
            node.children.push(tag)
        }
    })

    return rootCopy
}