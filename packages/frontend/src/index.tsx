import * as React from "react";
import * as ReactDOM from "react-dom";
import { hot } from "react-hot-loader/root";
import { renderRoutes } from "react-router-config";
import { BrowserRouter, Switch } from "react-router-dom";

import { routes } from "./routes";

const App = hot(() => <BrowserRouter><Switch>{renderRoutes(routes)}</Switch></BrowserRouter>);

ReactDOM.render(<App />, document.querySelector('#app-mount'));
