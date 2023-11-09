import {Element, Root} from "hast";
import {h} from 'hastscript'
import {addTagToHead} from "./addTagToHead";


export const addTitleToDocument = (title?: string) => (root: Readonly<Root>): Readonly<Root> => {

    if(!title) {
        return root
    }

    const titleNode = h('title', [
        title
    ])

    return addTagToHead(root, titleNode)
}