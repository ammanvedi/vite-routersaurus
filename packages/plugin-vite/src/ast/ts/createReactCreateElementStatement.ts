import ts from "typescript";
import {createFunctionCallExpression} from "./createFunctionCallExpression";
import {createPropertyAccessExpression} from "./createPropertyAccessExpression";
import {createNull} from "./createNull";


export const createReactCreateElementStatement = (
    component: ts.Expression,
    props?: ts.ObjectLiteralExpression,
    children?: ts.Expression,
) => {
    return createFunctionCallExpression(
        createPropertyAccessExpression("React", "createElement"),
    )([
        component,
        props ? props : createNull(),
        children ? children : createNull(),
    ]);
};