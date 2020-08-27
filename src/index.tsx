import * as React from "react";
import * as ReactDOM from "react-dom";
import { createMuiTheme, MuiThemeProvider, CssBaseline } from "@material-ui/core";
import App from "./app";

const darkTheme = createMuiTheme({
    palette: {
      type: 'dark',
    },
  });

let domContainer = document.querySelector('#app-root');
ReactDOM.render(
    <MuiThemeProvider theme={darkTheme}>
        <CssBaseline />
        <App />
    </MuiThemeProvider>, domContainer);

// if ('serviceWorker' in navigator) {
//     navigator.serviceWorker.register('./sw.bundle.js', {scope: './'})
//     .then(reg => {
//         // registration worked
//         console.log('Registration succeeded. Scope is ' + reg.scope);
//     }).catch((error) => {
//         // registration failed
//         console.log('Registration failed with ' + error);
//     });
// }