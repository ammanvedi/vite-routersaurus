import ts from "typescript";
import {createObjectLiteralExpression} from "../ast/ts/createObjectLiteralExpression";
import {createObjectLiteralProperty} from "../ast/ts/createObjectLiteralProperty";
import {createIdentifier} from "../ast/ts/createIdentifier";
import {DirectoryNode, RoutingTreeNode} from "../fileRouting/types";
import {createStringLiteral} from "../ast/ts/createStringLiteral";
import {Statements} from "../ast/ts/types";
import {createExportConstStatement} from "../ast/ts/createExportConstStatement";
import {createMetaDataObjectFromNode} from "./createMetaDataObjectFromNode";
import {traverse} from "../tree/traverse";

const { factory: f, NodeFlags } = ts;

const getRoutingObjectPropertiesForIndexFile = (node: DirectoryNode) => {
    if (!node.indexNode) {
        return [];
    }

    return [
        createObjectLiteralProperty("IndexElement")(
            createIdentifier(node.indexNode.generatedSuspenseModuleName),
        ),
    ];
};

const getRoutingObjectPropertiesForLayoutFile = (node: DirectoryNode) => {
    if (!node.layoutNode) {
        return [];
    }

    return [
        createObjectLiteralProperty("LayoutElement")(
            createIdentifier(node.layoutNode.generatedSuspenseModuleName),
        ),
    ];
};

const getRoutingObjectPropertiesForNotFoundFile = (node: DirectoryNode) => {
    if (!node.notFoundNode) {
        return [];
    }

    return [
        createObjectLiteralProperty("NotFoundElement")(
            createIdentifier(node.notFoundNode.generatedImportName),
        ),
    ];
};

const createClientRoutingObjectMap = (node: RoutingTreeNode) => {
    const properties: ts.PropertyAssignment[] = []

    traverse(node, null,(node) => {
        switch(node.type) {
            case "page":
            case "directory":
                properties.push(createObjectLiteralProperty(node.sitePath)(createClientRoutingObjectNode(node)))
                break;
            default:
                break;
        }
    })

    return createObjectLiteralExpression(properties)
}

const createClientRoutingObjectNode = (
    node: RoutingTreeNode,
): ts.ObjectLiteralExpression => {
    switch (node.type) {
        case "directory":
            return createObjectLiteralExpression([
                createObjectLiteralProperty('type')(createStringLiteral('directory')),
                createObjectLiteralProperty("path")(createStringLiteral(node.sitePath)),
                createObjectLiteralProperty("children")(
                    f.createArrayLiteralExpression(
                        node.children.map(createClientRoutingObjectNode),
                    ),
                ),
                ...getRoutingObjectPropertiesForIndexFile(node),
                ...getRoutingObjectPropertiesForLayoutFile(node),
                ...getRoutingObjectPropertiesForNotFoundFile(node),
            ]);

        case "page":
            return createObjectLiteralExpression([
                createObjectLiteralProperty('type')(createStringLiteral('page')),
                createObjectLiteralProperty("path")(createStringLiteral(node.sitePath)),
                createObjectLiteralProperty("Element")(
                    createIdentifier(node.generatedSuspenseModuleName),
                ),
                f.createSpreadAssignment(createMetaDataObjectFromNode(node))

            ]);
        default:
            return createObjectLiteralExpression([])
    }
};

export const createClientRoutingSource = (
    fileSystemTreeRoot: RoutingTreeNode,
): Statements => {
    return [
        createExportConstStatement("routes")(
            createClientRoutingObjectNode(fileSystemTreeRoot),
        ),

        createExportConstStatement("routesMap")(
            createClientRoutingObjectMap(fileSystemTreeRoot),
        ),
    ];
};
