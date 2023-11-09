import React from 'react'
import {Route} from "react-router";
import {ClientRoutingConfigurationNode} from "@routersaurus/types";

export const viteFileRouterReactRouter = (ClientRoute: ClientRoutingConfigurationNode) => {
    switch(ClientRoute.type) {
        case "directory":
            return (
                <Route
                    key={ClientRoute.path}
                    path={ClientRoute.path}
                    element={ClientRoute.LayoutElement ? <ClientRoute.LayoutElement /> : null}
                >
                    {ClientRoute.IndexElement && <Route index element={<ClientRoute.IndexElement />} />}
                    {ClientRoute.children.length && ClientRoute.children.map(viteFileRouterReactRouter)}
                    {ClientRoute.NotFoundElement && <Route path='*' element={<ClientRoute.NotFoundElement />} /> }
                </Route>
            )
        case "page":
            return <Route key={ClientRoute.path}  path={ClientRoute.path} element={<ClientRoute.Element />} />
    }
};