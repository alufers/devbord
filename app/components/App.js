import React from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import AppBar from "material-ui/AppBar";
import styled from "styled-components";

const Container = styled.div`
  width: 70%;
  margin: 0 auto;
`;

export default ({ children }) => (
  <MuiThemeProvider>
    <div>
      <AppBar title="DevBord" />
      <Container>{children}</Container>
    </div>
  </MuiThemeProvider>
);
