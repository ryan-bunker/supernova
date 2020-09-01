import * as React from "react";
import * as ReactDOM from "react-dom";
import { createMuiTheme, MuiThemeProvider, CssBaseline } from "@material-ui/core";
import App from "./app";

let serverWorker: Worker;
//if (window.Worker) {
  serverWorker = new Worker('./server/worker.ts', { name: 'server-worker', type: 'module' });
//}

const darkTheme = createMuiTheme({
    palette: {
      type: 'dark',
    },
  });

let domContainer = document.querySelector('#app-root');
ReactDOM.render(
    <MuiThemeProvider theme={darkTheme}>
        <CssBaseline />
        <App serverWorker={serverWorker} />
    </MuiThemeProvider>, domContainer);

