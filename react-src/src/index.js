// This must be the first line in src/index.js
import "react-app-polyfill/ie11";

import React from "react";
import { render } from "react-dom";
import Map from "./Map";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import ScopedCssBaseline from "@material-ui/core/ScopedCssBaseline";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import { ThemeProvider } from "@material-ui/core/styles";
import { appSettings } from "./settings";
import { USTopoProvider } from "./USTopoProvider";
import { HashRouter, Switch, Route } from "react-router-dom";
import StateInfo from "./StateInfo";
import { StatusConfigProvider } from "./StatusConfigProvider";

import "./style.css";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: appSettings.primaryColor
    },
    secondary: {
      main: appSettings.secondaryColor
    }
  },
  typography: {
    // Tell Material-UI what's the font-size on the html element is.
    htmlFontSize: appSettings.htmlFontSize,
    fontFamily: appSettings.fontFamily
  }
});

function App() {
  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
        <ScopedCssBaseline>
          <StatusConfigProvider>
            <Switch>
              <Route path={["/:state", "/"]}>
                <Container maxWidth="lg">
                  <Box clone pt={3} pb={3}>
                    <Grid container justify="center">
                      <Box textAlign="center" width={1} mb={3}>
                        <Typography
                          variant="h4"
                          component="h2"
                          style={{ textTransform: "uppercase" }}
                        >
                          <strong>{appSettings.primaryHeaderText}</strong>
                        </Typography>
                      </Box>
                      <Grid xs={12} sm={12} md={10} lg={10} item>
                        <USTopoProvider>
                          <Map />
                        </USTopoProvider>
                      </Grid>
                      <Grid xs={12} sm={12} md={10} lg={10} item>
                        <Box mt={4} textAlign="center">
                          <StateInfo />
                        </Box>
                      </Grid>
                    </Grid>
                  </Box>
                </Container>
              </Route>
            </Switch>
          </StatusConfigProvider>
        </ScopedCssBaseline>
      </ThemeProvider>
    </React.Fragment>
  );
}

function AppWithRouter() {
  return (
    <HashRouter>
      <App />
    </HashRouter>
  );
}

render(<AppWithRouter />, document.getElementById("covid-state-status-map"));
