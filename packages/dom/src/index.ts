import {ClientRoutingTree, ClientClientRoutingMap, StartViewTransition} from "@routersaurus/types";


/**
 * The plugin-vite package will wait for the import of this module and construct the implementation
 * of the below exports dynamically
 *
 * This is why we can leave the implementation blank.
 */
export const routes = {} as ClientRoutingTree

export const routesMap = {} as ClientClientRoutingMap

export const startViewTransition = (() => {}) as StartViewTransition