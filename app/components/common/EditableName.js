import React from "react";
import TextField from "material-ui/TextField";
import styled from "styled-components";

const StaticName = styled.div`
    
`

export default class EditableName extends React.Component {
  state = {
    editMode: false,
    editValue: null
  };

  inputRef = null;

  inputChanged = ev => {
    this.setState({ editValue: ev.target.value });
  };
  exitEditMode = () => {
    this.setState({ editMode: false });
    if (typeof this.props.onChange === "function") {
      this.props.onChange(this.state.editValue);
    }
  };
  enterEditMode = () => {
    this.setState({ editMode: true, editValue: this.props.value });
    setTimeout(_ => {
      this.inputRef.select();
      this.inputRef.focus();
    }, 10);
  };
  render() {
    if (this.state.editMode) {
      return (
        <TextField
          hintText={this.props.placeholder}
          value={this.state.editValue}
          onChange={this.inputChanged}
          onBlur={this.exitEditMode}
          ref={r => (this.inputRef = r)}
        />
      );
    } else {
      return (
        <StaticName
          onDoubleClick={this.enterEditMode}
          underlineShow={this.state.editMode}
        >
          {this.props.value}
        </StaticName>
      );
    }
  }
}
