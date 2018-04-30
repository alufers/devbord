import React from "react";
import Paper from "material-ui/Paper/Paper";
import styled from "styled-components";
import { Mutation } from "react-apollo";
import EditableName from "../common/EditableName";
import gql from "graphql-tag";
import { Draggable } from "react-beautiful-dnd";

const CardTitle = styled.div`
  margin-bottom: 15px;
  cursor: pointer;
  user-select: none;
`;

const CardPaper = styled(Paper)`
  padding: 15px;
  margin-bottom: 15px;
  cursor: move;
`;

const changeCardTitleMutation = gql`
  mutation changeCardTitle($id: ID!, $newTitle: String!) {
    updateCard(where: { id: $id }, data: { title: $newTitle }) {
      id
      title
    }
  }
`;

export default class Card extends React.Component {
  render() {
    return (
      <Draggable
        draggableId={this.props.card.id}
        type="card"
      >
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <CardPaper>
              <CardTitle>
                <Mutation mutation={changeCardTitleMutation}>
                  {renameCard => (
                    <EditableName
                      value={this.props.card.title}
                      onChange={v =>
                        renameCard({
                          variables: {
                            id: this.props.card.id,
                            newTitle: v
                          }
                        })
                      }
                    />
                  )}
                </Mutation>
              </CardTitle>
            </CardPaper>
          </div>
        )}
      </Draggable>
    );
  }
}
