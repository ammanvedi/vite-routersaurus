import {Element, Root} from "hast";
import {h} from 'hastscript'
import {addTagToHead} from "./addTagToHead";

export const addMetaTagToDocument = (property: string, content?: string) => (root: Readonly<Root>): Readonly<Root> => {

    if(!content) {
        return root
    }

    const metaNode = h('meta', {
        property,
        content
    })

    return addTagToHead(root, metaNode)
}