import gql from "graphql-tag";
import { graphql } from "react-apollo";
import FloatingActionButton from "material-ui/FloatingActionButton";
import ContentAdd from "material-ui/svg-icons/content/add";
import { Mutation, Query } from "react-apollo";
import CircularProgress from "material-ui/CircularProgress";
import BoardArea from "./BoardArea";

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
          display: flex;
          flex-direction: row;
          min-height: 400px;
          align-items: flex-start;
        }
        .add-fab {
          align-self: center;
        }
      `}</style>
      <div className="area-list">
        {data.board.areas.map(area => <BoardArea area={area} key={area.id} />)}
        <Mutation
          mutation={addBoardAreaMutation}
          variables={{ boardId: data.board.id }}
        >
          {(addBoard, { data, loading }) => (
            <FloatingActionButton className="add-fab" onClick={addBoard}>
              {loading && <CircularProgress />}
              {!loading && <ContentAdd />}
            </FloatingActionButton>
          )}
        </Mutation>
      </div>
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
