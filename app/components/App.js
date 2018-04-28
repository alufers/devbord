import React from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import AppBar from "material-ui/AppBar";
import styled from "styled-components";
import { Link } from "../routes";
import MenuItem from 'material-ui/MenuItem';

const Container = styled.div`
  width: 70%;
  margin: 0 auto;
`;

export default class App extends React.Component {
  render() {
    const {children} = this.props;
    return (
    <MuiThemeProvider>
      <div>
        <AppBar 
            title="DevBord" 
            iconElementRight={
              <Link route='/'>
                <MenuItem primaryText="Home" />
              </Link>
        }
        >
        </AppBar>
        <Container>{children}</Container>
      </div>
    </MuiThemeProvider>
    );
  }
}
