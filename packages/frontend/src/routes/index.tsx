import * as React from "react";
import { RouteConfig } from "react-router-config";

// route configuration
// add new routes as required, can act as pages
// it's possible to nest routers also, but that can be buggy if you're not careful :3
export const routes: RouteConfig[] = [{
    component: () => <h1>soft yeen</h1>,
    path: "/",
    key: "landing",
    exact: true
    },
{
    component: () => <h1>idk man</h1>,
    path: "/test",
    key: "test"
}];
