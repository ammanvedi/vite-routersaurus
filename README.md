

<div align="center">
    <img width="400" src="./assets/dino.png" />
    <br />

</div>

<div align="center">
    <br />
    <div>
        <img src="https://img.shields.io/github/actions/workflow/status/ammanvedi/vite-routersaurus/build-test.yml" />
        <img src="https://img.shields.io/npm/v/%40routersaurus/dom?color=blue" />
    </div>
</div>

<br/>
**Routersaurus** is a ViteJS plugin for file based routing, it comes with a few features


- File based routing
- Custom layout / 404 / loader component support
- Customisable loader components
- Static generation of HTML containing meta tags
- Implementation independent of routing library
- React.lazy / Suspense based
- Creates a SPA that supports the View Transitions API

# Getting Started

## Install

### NPM
```
npm install --save-dev @routersaurus/dom @routersaurus/plugin-vite @routersaurus/plugin-react-router
```

### Yarn

```
yarn add --dev @routersaurus/dom @routersaurus/plugin-vite @routersaurus/plugin-react-router
```

## Update Vite Config

```javascript
// vite.config.ts

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import {viteFileRouter} from "@routersaurus/plugin-vite";

export default defineConfig({
    plugins: [viteFileRouter(), react()],
})
```

## Create the Pages Directory

```
my-app/
├─ src/
│  ├─ posts/
│  │  ├─ my-blog-post.tsx
│  ├─ index.tsx
```

## Integrate With React Router

```javascript
// App.tsx

import { routes } from "@routersaurus/dom";
import {viteFileRouterReactRouter} from '@routersaurus/plugin-react-router'
import {BrowserRouter, Routes} from "react-router-dom";

function App() {

  return (
      <BrowserRouter>
          <Routes>{viteFileRouterReactRouter(routes)}</Routes>
      </BrowserRouter>
  )
}

export default App
```

## TADA!
Well done you should now see a homepage and a posts/my-blog-post page

## Access to Raw Routing Data

Routersaurus provides access to the raw routing tree you can access this via

```javascript
import { routesMap, routes } from "@routersaurus/dom";
```

routesMap is a flattened map of route paths to their data, routes is a tree structure.

You can see how this is useful below.

## File Metadata
If we think about a basic blog website, we want to lazily load the blog posts themselves
but it would be useful to have some basic metadata about each blog post pre loaded so we
can do things like render a list of posts, or display some information immediately in a skeleton
state before the whole post lands.

In Routersaurus we support Front Matter in all page files, for example;

```javascript
// posts/my-blog-post.tsx
/**
 ---
 title: PostOneTsxFile
 image: myImage
 description: mydescription
 ---
 */

const MyBlogPost = (props) => {
    return <div>My Post</div>
}

export default MyBlogPost
```

now this metadata can be used in a few places

### Usage in Index Page


```javascript
import { routesMap, startViewTransition } from "@routersaurus/dom";
import React from 'react'
import {useNavigate} from "react-router-dom";
import {Heading} from "../../components/Heading";

/**
---
title: Posts
---
 */

export default function Posts() {
    const n = useNavigate()

    return <div>
        {routesMap['/posts'].type === 'directory' ?
            routesMap['/posts'].children.map(child =>
                child.type === 'page' ? (
                    <a href={child.path}>{child.metadata.title}</a>
                ) : null
            ) : null
        }
    </div>

}
```

### Usage in Loader

By leveraging metadata in loader components we can render immediately part of the page
before its been fetched.

This is very useful for supporting View Transitions, since we
can for example transition a blog post title in the /posts list from the list to the heading

Routersaurus also tracks if there is a view transition ongoing and ensures that the loader
displays until this transition is finished.

```javascript
import React from 'react'

export default function Loader(props) {

    /**
     * Rendered when we are loading posts/_layout.tsx of posts/index.tsx
     */
    if(!props.metadata) {
        return <h1>Loading Posts Index</h1>
    }

    /**
     * Rendered when we are loading one of the blog posts
     */
    return <h1>{props.metadata.title}</h1>
}
```

## MDX Support
Its quite likely that instead of tsx files youll prefer to use MDX

MDX is supported via the rollup plugin, you should also enable the remark front matter plugin so that
front matter is removed from MDX

```javascript
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import {viteFileRouter} from "@routersaurus/plugin-vite";
import mdx from "@mdx-js/rollup";
import remarkFrontmatter from "remark-frontmatter";

export default defineConfig({
  plugins: [
    viteFileRouter(),
    mdx({ remarkPlugins: [remarkFrontmatter] }),
    react(),
  ],
  clearScreen: false
});

```

## Loader Custom Components

You can create a `_loader.tsx` component in any directory

```
my-app/
├─ src/
│  ├─ posts/
│  │  ├─ my-blog-post.tsx
│  │  ├─ _loader.tsx
│  ├─ index.tsx
```

```javascript

// _loader.tsx

import React from 'react'

export default function Loader(props) {

    if(!props.metadata) {
        return <h1>Loading Posts Index</h1>
    }

    return <h1>props.metadata.title</h1>
}
```

## Layout Custom Components
You can leverage react router layouts by creating a `_layout.tsx` component in any
`pages/` directory.

This is useful for creating a global navigation for example

Layouts can be nested

```
my-app/
├─ src/
│  ├─ posts/
│  │  ├─ my-blog-post.tsx
│  │  ├─ _loader.tsx
│  ├─ index.tsx
│  ├─ _layout.tsx
```

```javascript
import { Outlet } from "react-router-dom";
import React from 'react'

const Layout = () => {
  return (
    <>
        <nav>Navigation Bar</nav>
        <Outlet />
    </>
  );
};

export default Layout;

```

## 404 Custom Components
404 components handle any routes that cant be matched. Nested 404s will take precedence the
ones above them in the tree

```
my-app/
├─ src/
│  ├─ posts/
│  │  ├─ my-blog-post.tsx
│  │  ├─ _loader.tsx
│  │  ├─ _404.tsx
│  ├─ index.tsx
│  ├─ _layout.tsx
│  ├─ _404.tsx
```

```javascript
import React from 'react'

export default function() {
    return <div>404 Posts</div>
}
```

## Static Meta Tag Generation
One of the main problems with SPAs is the lack of SEO support. For example if you make a blog site
and attempt to share a blog post on social media, you will not get a nicely expanded preview for your link

However if you use Routersaurus you will!

Routersaurus will generate static html at build time, based on the Front Matter metadata you provide
it will add the appropriate meta tags

For example given a page file

```javascript
// posts/my-blog-post.tsx
/**
 ---
 title: My Blog Post
 image: myImage
 description: mydescription
 ---
 */

const MyBlogPost = (props) => {
    return <div>My Post</div>
}

export default MyBlogPost
```

then when you run `vite build` we will generate the following tree structure in `dist/`

```
my-app/
├─ dist/
│  ├─ index.html 
│  ├─ posts/
│  │  ├─ my-blog-post
│  │  |  ├─ index.html
```

now when we hit `http://localhost:8008/posts/my-blog-post` we will get the following html

```html
<!doctype html><html lang="en">
    <head>
        <meta charset="UTF-8">
        <link rel="icon" type="image/svg+xml" href="/vite.svg">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <script type="module" crossorigin="" src="/assets/index-809b25bf.js"></script>
        <link rel="stylesheet" href="/assets/index-3738abed.css">
        
        <!-- Meta tags added automatically! -->
        <meta property="og:image" content="myImage">
        <meta property="og:description" content="myDescription">
        <title>My Blog Post</title>
    </head>
    <body>
        <div id="root"></div>
    </body>
</html>
```

And this will enable proper link expansion when sharing!

## View Transitions

One of the motivating factors in creating Routersaurus was the need for a SPA router framework that
considered the needs of View Transitions

To this end Routersaurus provides the `startViewTransition` function.

This function will kick off the transition using the native API, it will return the created
ViewTransition object.

It will also make sure that any dynamic import (for example page load) will wait for the view
transition to finish.

```javascript
import { routesMap, startViewTransition } from "@routersaurus/dom";
import React from 'react'
import {useNavigate} from "react-router-dom";
import {Heading} from "../../components/Heading";

/**
---
title: Posts
---
 */

export default function Posts() {
    const n = useNavigate()

    return (
        <div key={child.path} onClick={() => {
            startViewTransition(
                // Give the view transition an ID
                child.path,
                // Function to tell the library how to perform the transition
                () => { n(child.path) }
            )
        }}>
            <h1>Hello World</h1>
        </div>
    )
}
```



# Contribution

## Getting Started

### Install Turborepo

[Docs](https://turbo.build/)

### Install Dependencies
```
yarn
```

### Run Tests

```
turbo run test
```


