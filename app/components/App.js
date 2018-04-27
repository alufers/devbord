import React from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import AppBar from "material-ui/AppBar";

export default ({ children }) => (
  <MuiThemeProvider>
    <div>
      <style jsx global>
        {`
          body, html {
            font-family: Roboto, sans-serif;
            margin: 0;
            padding: 0;
          }
          .container {
            width: 70%;
            margin: 0 auto;
          }
        `}
      </style>
      <AppBar title="DevBord" />
      <div className="container">{children}</div>
    </div>
  </MuiThemeProvider>
);
