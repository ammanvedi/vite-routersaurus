import {
  BrowserRouter,
  Routes,
} from "react-router-dom";
import React from 'react'
import { routes } from "@routersaurus/dom";
import {viteFileRouterReactRouter} from '@routersaurus/plugin-react-router'
import { Suspense } from "react";

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BrowserRouter>
        <Routes>{viteFileRouterReactRouter(routes)}</Routes>
      </BrowserRouter>
    </Suspense>
  );
}

export default App;
