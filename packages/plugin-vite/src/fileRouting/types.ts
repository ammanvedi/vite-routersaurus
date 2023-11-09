export type RoutingTree = DirectoryNode;
export type RoutingTreeNode = DirectoryNode | PageNode | LayoutNode | LoaderNode | NotFoundNode;

export type DirectoryNode = {
    type: "directory";
    filesystemPath: string;
    sitePath: string;
    indexNode: PageNode | null;
    layoutNode: LayoutNode | null;
    loaderNode: LoaderNode | null;
    notFoundNode: NotFoundNode | null;
    children: RoutingTreeNode[];
};

export type PageNode = {
    type: "page";
    index: boolean;
    filesystemPath: string;
    moduleImportPath: string;
    generatedModuleName: string;
    generatedSuspenseModuleName: string;
    sitePath: string;
    metadata: Record<string, string>;
};

export type LayoutNode = {
    type: "layout";
    filesystemPath: string;
    moduleImportPath: string;
    generatedModuleName: string;
    generatedSuspenseModuleName: string;
};

export type LoaderNode = {
    type: "loader";
    filesystemPath: string;
    moduleImportPath: string;
    generatedImportName: string;
};

export type NotFoundNode = {
    type: "notFound";
    filesystemPath: string;
    moduleImportPath: string;
    generatedImportName: string;
};

export type ParsedDirectory = {
    indexFilePath: string | null,
    layoutFilePath: string | null,
    loaderFilePath: string | null,
    notFoundFilePath: string | null,
    childDirectoryPaths: string[],
    childPagePaths: string[]
}