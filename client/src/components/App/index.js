import React from "react";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import { blue } from "@material-ui/core/colors";
import Button from "@material-ui/core/Button";

const theme = createMuiTheme({
	palette: {
		primary: blue
	}
});

const App = () => (
	<ThemeProvider theme={theme}>
		<Button color="primary">Primary</Button>
		<Button color="secondary">Secondary</Button>
	</ThemeProvider>
);

export default App;
