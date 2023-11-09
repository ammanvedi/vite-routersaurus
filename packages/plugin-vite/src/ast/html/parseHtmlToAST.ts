import {fromHtml} from 'hast-util-from-html'
import {Root} from "hast";

export const parseHtmlToAST = (html: string): Readonly<Root> => {
    return fromHtml(html)
}