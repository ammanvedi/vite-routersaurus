import React from "react";

export interface PageMetaData {
    index: boolean
}

export interface PageMetaDataProps {
    metadata?: PageMetaData
}

export interface ClientRoutingConfigurationDirectoryNode {
    type: 'directory'
    path: string,
    children: ClientRoutingConfigurationNode[],
    IndexElement: React.ComponentType<any>,
    LayoutElement: React.ComponentType<any>,
    NotFoundElement: React.ComponentType<any>
}

export interface ClientRoutingConfigurationPageNode {
    type: 'page'
    index: boolean,
    path: string,
    Element: React.ComponentType<any>,
    metadata: PageMetaData
}

export type ClientRoutingConfigurationNode = ClientRoutingConfigurationDirectoryNode | ClientRoutingConfigurationPageNode

export interface ClientRoutingTree extends ClientRoutingConfigurationDirectoryNode {

}

export type ClientClientRoutingMap = {
    [key: string]: ClientRoutingConfigurationNode
}


interface ViewTransition {
    finished: Promise<void>;
    ready: Promise<void>;
    updateCallbackDone: Promise<void>;
    skipTransition(): void;
}

export type StartViewTransition = (id: string, performTransition: () => void) => ViewTransition