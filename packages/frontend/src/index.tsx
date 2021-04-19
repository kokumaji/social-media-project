import * as React from "react";
import * as ReactDOM from "react-dom";
import { hot } from "react-hot-loader/root";
import { renderRoutes } from "react-router-config";
import { BrowserRouter, Switch } from "react-router-dom";
import { ThemeProvider } from "styled-components";

import { UserManager } from "./components/data/UserManager";
import { routes } from "./routes";
import { darkTheme } from "./theme/colorScheme/colors";
import { GlobalStyles } from "./theme/global";

const App = hot(() => (
	<BrowserRouter>
		<Switch>
			<ThemeProvider theme={darkTheme}>
				<UserManager>
					<GlobalStyles />
					{renderRoutes(routes)}
				</UserManager>
			</ThemeProvider>
		</Switch>
	</BrowserRouter>
));

ReactDOM.render(<App />, document.querySelector("#app-mount"));
