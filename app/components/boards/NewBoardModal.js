import React from "react";
import Dialog from "material-ui/Dialog";
import FlatButton from "material-ui/FlatButton";
import RaisedButton from "material-ui/RaisedButton";
import TextField from "material-ui/TextField";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import { getBoardsQuery } from "./BoardsList";

const createBoardMutation = gql`
  mutation createBoard($name: String!) {
    createBoard(data: { name: $name }) {
      id
      name
    }
  }
`;

const addBoardCacheUpdate = (cache, { data: { createBoard } }) => {
  const { boards } = cache.readQuery({
    query: getBoardsQuery
  });
  cache.writeQuery({
    query: getBoardsQuery,
    data: { boards: [...boards, createBoard] }
  });
};

export default class NewBoardModal extends React.Component {
  state = { name: "" };
  nameChanged = ev => {
    this.setState({ name: ev.target.value });
  };
  render() {
    return (
      <Mutation
        mutation={createBoardMutation}
        onCompleted={this.props.onClose}
        variables={{ name: this.state.name }}
        update={addBoardCacheUpdate}
      >
        {createBoard => (
          <Dialog
            title="New board"
            actions={[
              <FlatButton
                label="Cancel"
                primary={true}
                onClick={this.props.onClose}
              />,
              <FlatButton
                label="Create board"
                primary={true}
                keyboardFocused={true}
                onClick={createBoard}
                disabled={this.state.name.trim() === ""}
              />
            ]}
            modal={false}
            open={this.props.open}
            onRequestClose={this.props.onClose}
          >
            <TextField
              hintText="Board name"
              fullWidth
              value={this.state.name}
              onChange={this.nameChanged}
            />
          </Dialog>
        )}
      </Mutation>
    );
  }
}
