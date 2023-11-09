
import ts from "typescript";
import {DirectoryNode, LayoutNode, PageNode, RoutingTreeNode} from "../fileRouting/types";
import {Statements} from "../ast/ts/types";
import {traverse} from "../tree/traverse";
import {createDefaultImportStatement} from "../ast/ts/createDefaultImportStatement";
import {createArrowFunctionStatement} from "../ast/ts/createArrowFunctionStatement";
import {createFunctionCallExpression} from "../ast/ts/createFunctionCallExpression";
import {createIdentifier} from "../ast/ts/createIdentifier";
import {createStringLiteral} from "../ast/ts/createStringLiteral";
import {createPropertyAccessExpression} from "../ast/ts/createPropertyAccessExpression";
import {pipe} from "fp-ts/function";
import {createConstStatement} from "../ast/ts/createConstStatement";
import {createObjectLiteralExpression} from "../ast/ts/createObjectLiteralExpression";
import {createObjectLiteralProperty} from "../ast/ts/createObjectLiteralProperty";
import {createNull} from "../ast/ts/createNull";
import {createReactCreateElementStatement} from "../ast/ts/createReactCreateElementStatement";
import {filterNulls} from "../array/filterNulls";
import {createMetaDataObjectFromNode} from "./createMetaDataObjectFromNode";

import {astFromCodeString} from "../ast/ts/astFromCodeString";

const { factory: f, NodeFlags } = ts;

const transitionAwareImportSource = `
import {flushSync} from "react-dom";

const transitionState = {};

const waitForTransitionCompletion = id => {
    return new Promise((res) => {
        /**
         * Todo, this could also be apprached by listening to a custom event on the body
         */
        const interval  = setInterval(() => {

            if(!transitionState[id]) {
                clearInterval(interval)
                res()
            }

        }, 10)
    })
}

/**
 * When importing modules the flow is as follows
 *
 * - User is on page A
 * - User clicks a link to Page B
 * - Page B loader is shown immediately
 * - Page B source is loaded from network
 * - View transition may occur between A and the B loader
 * - Page B loader is replaced with page B content
 *
 * now we want to prevent the module from acyually loading before the transition
 * is completed, if we don't then there will be another dom render
 * that will break the transition
 *
 * This is usually an issue if the request to load the page is very quick, but
 * it should be quick, so we handle this case
 *
 */
const transitionAwareImport = (importFunc, id) => {

    if(transitionState[id]) {
        return Promise.all([
            importFunc(), waitForTransitionCompletion(id)
        ]).then(
            ([imported]) => imported
        )
    }

    return importFunc()

}

export const startViewTransition = (id, performTransition) => {

    transitionState[id] = true;

    const transition = document.startViewTransition(async () => {
        flushSync(() => {
            performTransition()
        })
        
        
        
    })

    transition.finished.then(() => {
        delete transitionState[id]
    })

    return transition

}

`

const buildComponentDefinitions = (
    node: PageNode | LayoutNode,
    parentDirectoryNode: DirectoryNode,
): Statements => {
    const { moduleImportPath, generatedModuleName, generatedSuspenseModuleName } =
        node;

    const dynamicImportStatement = createArrowFunctionStatement(
        createFunctionCallExpression(createIdentifier("transitionAwareImport"))([
            createArrowFunctionStatement(
                createFunctionCallExpression(createIdentifier('import'))([createStringLiteral(moduleImportPath)])
            )
            ,
            /**
             * Todo understand how this interacts with layout components
             */
            createStringLiteral(node.type === 'page' ? node.sitePath : node.generatedModuleName)
        ]),
    );

    const reactLazyStatement = createFunctionCallExpression(
        createPropertyAccessExpression("React", "lazy"),
    );

    const lazyComponentConstStatement = pipe(
        [dynamicImportStatement],
        reactLazyStatement,
        createConstStatement(generatedModuleName),
    );

    const metaDataObject = createMetaDataObjectFromNode(node)

    const moduleCreateElementCall = createFunctionCallExpression(
        createPropertyAccessExpression("React", "createElement"),
    )([
        createIdentifier(generatedModuleName),
        metaDataObject,
        createNull(),
    ]);

    const fallback = parentDirectoryNode.loaderNode
        ? createReactCreateElementStatement(
            createIdentifier(parentDirectoryNode.loaderNode.generatedImportName),
            metaDataObject,
        )
        : createNull();

    const suspenseCreateElementCall = createReactCreateElementStatement(
        createPropertyAccessExpression("React", "Suspense"),
        createObjectLiteralExpression([
            createObjectLiteralProperty("fallback")(fallback),
        ]),
        moduleCreateElementCall,
    );

    const suspenseComponentConstStatement = pipe(
        createArrowFunctionStatement(suspenseCreateElementCall),
        createConstStatement(generatedSuspenseModuleName),
    );

    return filterNulls([
        lazyComponentConstStatement,
        suspenseComponentConstStatement,
    ]);
};

const getTransitionAwareImportSource = () => {
    const sourceFileAst = astFromCodeString(transitionAwareImportSource);
    return sourceFileAst.statements
}

export const createLazyRoutesSource = (tree: RoutingTreeNode): Statements => {
    let sourceLines: Statements = [
        ...getTransitionAwareImportSource()
    ];

    traverse<RoutingTreeNode>(tree, null, (node, parent) => {
        switch (node.type) {
            case "directory":
                if (node.indexNode) {
                    sourceLines = sourceLines.concat(
                        buildComponentDefinitions(node.indexNode, node),
                    );
                }
                if (node.layoutNode) {
                    sourceLines = sourceLines.concat(
                        buildComponentDefinitions(node.layoutNode, node),
                    );
                }
                /**
                 * Loaders and 404 pages we don't load dynamically, rationale is that
                 * we want them to display as fast as possible. This may change in
                 * future
                 */
                if (node.loaderNode) {
                    sourceLines = sourceLines.concat(
                        createDefaultImportStatement(
                            node.loaderNode.generatedImportName,
                            node.loaderNode.moduleImportPath,
                        ),
                    );
                }
                if (node.notFoundNode) {
                    sourceLines = sourceLines.concat(
                        createDefaultImportStatement(
                            node.notFoundNode.generatedImportName,
                            node.notFoundNode.moduleImportPath,
                        ),
                    );
                }
                break;
            case "page":
                if (!parent || parent.type !== "directory") {
                    throw new Error("Pages only allowed as children of directories");
                }

                sourceLines = sourceLines.concat(buildComponentDefinitions(node, parent));
                break;
        }
    });

    return sourceLines;
};