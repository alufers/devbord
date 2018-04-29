import React from "react";
import Paper from "material-ui/Paper";
import styled from "styled-components";
import EditableName from "../common/EditableName";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";

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

export default ({ area }) => (
  <BoardAreaPaper>
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
  </BoardAreaPaper>
);
