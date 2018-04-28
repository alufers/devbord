import gql from "graphql-tag";
import { graphql } from "react-apollo";
import FloatingActionButton from "material-ui/FloatingActionButton";
import ContentAdd from "material-ui/svg-icons/content/add";
import { Mutation, Query } from "react-apollo";
import CircularProgress from "material-ui/CircularProgress";
import BoardArea from "./BoardArea";
import styled from "styled-components";

const AreaList = styled.div`
  display: flex;
  flex-direction: row;
  min-height: 400px;
  align-items: flex-start;
`;

const AddFab = styled(FloatingActionButton)`
  align-self: center;
`;

const addBoardAreaMutation = gql`
  mutation addBoardAreaMutation($boardId: ID!) {
    createBoardArea(
      data: { name: "New area", board: { connect: { id: $boardId } } }
    ) {
      id
    }
  }
`;

const Board = ({ data }) => {
  if (data.loading) {
    return <div>Loading</div>;
  }
  return (
    <div>
      <h1>{data.board ? data.board.name : "404"}</h1>
      <style jsx>{`
        .area-list {
        }
        .add-fab {
        }
      `}</style>
      <AreaList>
        {data.board.areas.map(area => <BoardArea area={area} key={area.id} />)}
        <Mutation
          mutation={addBoardAreaMutation}
          variables={{ boardId: data.board.id }}
        >
          {(addBoard, { data, loading }) => (
            <AddFab onClick={addBoard}>
              {loading && <CircularProgress />}
              {!loading && <ContentAdd />}
            </AddFab>
          )}
        </Mutation>
      </AreaList>
    </div>
  );
};

export default graphql(
  gql`
    query GetBoardById($id: ID!) {
      board(where: { id: $id }) {
        id
        name
        areas {
          id
          name
        }
      }
    }
  `,
  {
    options: props => ({
      variables: {
        id: props.boardId
      }
    })
  }
)(Board);
