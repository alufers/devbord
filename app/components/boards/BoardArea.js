import React from "react";
import Paper from "material-ui/Paper";
import styled from "styled-components";
import EditableName from "../common/EditableName";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import Card from "./Card";
import FloatingActionButton from "material-ui/FloatingActionButton";
import ContentAdd from "material-ui/svg-icons/content/add";
import { getBoardByIdQuery } from "./Board";
import { Droppable } from "react-beautiful-dnd";

const AreaName = styled.div`
  margin-bottom: 5px;
`;

const BoardAreaPaper = styled(Paper)`
  margin-right: 20px;
  padding: 10px;
  min-height: 400px;
  min-width: 300px;
`;

const renameBoardAreaMutation = gql`
  mutation renameBoardArea($id: ID!, $newName: String!) {
    updateBoardArea(where: { id: $id }, data: { name: $newName }) {
      id
      name
    }
  }
`;

const createCardMuatation = gql`
  mutation createCardInArea($areaId: ID!) {
    createCard(
      data: {
        title: "New card"
        content: ""
        area: { connect: { id: $areaId } }
      }
    ) {
      id
      title
      content
      area {
        id
        board {
          id
        }
      }
    }
  }
`;

const createCardCacheUpdate = (cache, { data: { createCard } }) => {
  const { board } = cache.readQuery({
    query: getBoardByIdQuery,
    variables: { id: createCard.area.board.id }
  });
  board.areas.find(a => a.id === createCard.area.id).cards.push(createCard);
  cache.writeQuery({
    query: getBoardByIdQuery,
    variables: { id: createCard.area.board.id },
    data: { board }
  });
};

export default ({ area }) => (
  <Droppable droppableId={"board_area_droppable_" + area.id} type="card">
    {(provided, snapshot) => (
      <div ref={provided.innerRef} {...provided.droppableProps}>
        {" "}
        <BoardAreaPaper zDepth={2}>
          <AreaName>
            <Mutation mutation={renameBoardAreaMutation}>
              {(rename, { loading }) => (
                <EditableName
                  value={area.name}
                  loading={loading}
                  onChange={v =>
                    rename({
                      variables: { id: area.id, newName: v || "Unnamed area" }
                    })
                  }
                />
              )}
            </Mutation>
          </AreaName>
          {area.cards.map(card => <Card card={card} key={card.id} />)}
          {provided.placeholder}
          <Mutation
            mutation={createCardMuatation}
            variables={{ areaId: area.id }}
            update={createCardCacheUpdate}
          >
            {createCard => (
              <FloatingActionButton onClick={createCard}>
                <ContentAdd />
              </FloatingActionButton>
            )}
          </Mutation>
        </BoardAreaPaper>
      </div>
    )}
  </Droppable>
);
