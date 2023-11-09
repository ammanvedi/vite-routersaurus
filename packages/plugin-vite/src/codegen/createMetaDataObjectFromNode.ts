import {RoutingTreeNode} from "../fileRouting/types";
import ts from "typescript";
import {createObjectLiteralExpression} from "../ast/ts/createObjectLiteralExpression";
import {createObjectLiteralProperty} from "../ast/ts/createObjectLiteralProperty";
import {createStringLiteral} from "../ast/ts/createStringLiteral";

const { factory: f, NodeFlags } = ts;
export const createMetaDataObjectFromNode = (node: RoutingTreeNode): ts.ObjectLiteralExpression => {
    if(node.type !== 'page') {
        return createObjectLiteralExpression([])
    }

    const metadataObject = createObjectLiteralExpression(
[
            ...Object.entries(node.metadata).map(([key, value]) => {
                return createObjectLiteralProperty(key)(createStringLiteral(value))
            }),
            createObjectLiteralProperty('index')(node.index ? f.createTrue() : f.createFalse())
]
    )

    /**
     * Structure defined in ./types
     */
    return createObjectLiteralExpression(
        [
            createObjectLiteralProperty('metadata')(metadataObject)
        ]
    )

}