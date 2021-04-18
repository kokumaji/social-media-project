import * as React from "react";
import { RouteConfig } from "react-router-config";
import { Link } from "react-router-dom";

import { LoginPage } from "../views/Login";
import { NotFound } from "../views/NotFound";
import { ProfilePage } from "../views/Profile";
import { SignUpPage } from "../views/SignUp";

// route configuration
// add new routes as required, can act as pages
// it's possible to nest routers also, but that can be buggy if you're not careful :3
export const routes: RouteConfig[] = [{
    component: () => <Link to="/login">
        login page
        </Link>,
    path: "/",
    key: "landing",
    exact: true
},
{
    component: () => <LoginPage />,
    path: "/login",
    key: "login"
},
{
    component: () => <SignUpPage />,
    path: "/register",
    key: "register"
},
{
    component: () => <ProfilePage />,
    path: "/u/:id",
    key: "profile"
}];
