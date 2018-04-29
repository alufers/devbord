import React from "react";
import TextField from "material-ui/TextField";
import styled from "styled-components";
import CircularProgress from "material-ui/CircularProgress";

const StaticName = styled.div`
  margin-top: 14px;
  font-size: 16px;
`;

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

  handleKeyDown = ev => {
    if (ev.keyCode === 27) {
      this.setState({ editMode: false, editValue: this.props.value });
    }
    if (ev.keyCode === 13) {
      this.exitEditMode();
    }
  };

  render() {
    if (this.state.editMode) {
      return (
        <TextField
          id={this.props.value + "_editable_name"}
          hintText={this.props.placeholder}
          value={this.state.editValue}
          onChange={this.inputChanged}
          onBlur={this.exitEditMode}
          ref={r => (this.inputRef = r)}
          onKeyDown={this.handleKeyDown}
        />
      );
    } else {
      return (
        <StaticName
          onDoubleClick={this.enterEditMode}
          underlineShow={this.state.editMode}
        >
          {this.props.value}
          {this.props.loading && <CircularProgress />}
        </StaticName>
      );
    }
  }
}
