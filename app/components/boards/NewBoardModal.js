import React from "react";
import Dialog from "material-ui/Dialog";
import FlatButton from "material-ui/FlatButton";
import RaisedButton from "material-ui/RaisedButton";

export default class NewBoardModal extends React.Component {
  render() {
    const actions = [
        <FlatButton
          label="Cancel"
          primary={true}
          onClick={this.props.onClose}
        />,
        <FlatButton
          label="Create board"
          primary={true}
          keyboardFocused={true}
          onClick={this.props.onClose}
        />,
      ];
  
    return (
      <Dialog
        title="New board"
        actions={actions}
        modal={false}
        open={this.props.open}
        onRequestClose={this.props.onClose}
      >
        The actions in this window were passed in as an array of React objects.
      </Dialog>
    );
  }
}
