import gql from "graphql-tag";
import { graphql } from "react-apollo";
import FloatingActionButton from "material-ui/FloatingActionButton";
import ContentAdd from "material-ui/svg-icons/content/add";
import { Mutation, Query } from "react-apollo";
import CircularProgress from "material-ui/CircularProgress";
import BoardArea from "./BoardArea";
import styled from "styled-components";
import { DragDropContext } from "react-beautiful-dnd";
import arrayMove from "array-move";

const AreaList = styled.div`
  display: flex;
  flex-direction: row;
  min-height: 400px;
  align-items: flex-start;
  overflow-x: scroll;
  padding: 10px;
`;

const AddFab = styled(FloatingActionButton)`
  align-self: center;
`;

const addBoardAreaMutation = gql`
  mutation addBoardArea($boardId: ID!) {
    createBoardArea(
      data: { name: "New area", board: { connect: { id: $boardId } } }
    ) {
      id
      name
      cards {
        id
        title
        content
      }
      board {
        id
      }
    }
  }
`;

export const getBoardByIdQuery = gql`
  query getBoardById($id: ID!) {
    board(where: { id: $id }) {
      id
      name
      areas {
        id
        name
        id
        cards: cards(orderBy: index_ASC) {
          id
          title
          index
          content
        }
      }
    }
  }
`;

const addBoardAreaCacheUpdate = (cache, { data: { createBoardArea } }) => {
  const { board } = cache.readQuery({
    query: getBoardByIdQuery,
    variables: { id: createBoardArea.board.id }
  });
  cache.writeQuery({
    query: getBoardByIdQuery,
    variables: { id: createBoardArea.board.id },
    data: { board: { ...board, areas: [...board.areas, createBoardArea] } }
  });
};

class Board extends React.Component {
  onDragEnd = ev => {
    if (!ev.destination) return;

    let card = this.props.apolloClient.cache.readFragment({
      id: "Card:" + ev.draggableId,
      fragment: gql`
        fragment DraggedCard on Card {
          id
          title
          content
          index
        }
      `
    });

    let { board } = this.props.apolloClient.readQuery({
      query: getBoardByIdQuery,
      variables: { id: this.props.data.board.id }
    });

    let destinationIndex = ev.destination.index;
    if (destinationIndex < 0) {
      destinationIndex = 0;
    }

    if (ev.destination.droppableId === ev.source.droppableId) {
      let area = board.areas.find(a => a.id === ev.destination.droppableId);

     
      area.cards.find(c => c.id === card.id).index = destinationIndex;
      area.cards.sort((a, b) => a.index - b.index);
      this.props.apolloClient.writeQuery({
        query: getBoardByIdQuery,
        variables: { id: this.props.data.board.id },
        data: { board }
      });
    } else {
      let destinationArea = board.areas.find(a => a.id === ev.destination.droppableId);
      let sourceArea = board.areas.find(a => a.id === ev.source.droppableId);
      //sourceArea.filter
    }
  };
  render() {
    let { data } = this.props;
    if (data.loading) {
      return <div>Loading</div>;
    }
    if (data.error) {
      return <div>{data.error}</div>;
    }
    if (!data.board) {
      return <div>404</div>;
    }
    return (
      <div>
        <h1>{data.board ? data.board.name : "404"}</h1>
        <DragDropContext onDragEnd={this.onDragEnd}>
          <AreaList>
            {data.board.areas.map(area => (
              <BoardArea area={area} key={area.id} />
            ))}
            <Mutation
              mutation={addBoardAreaMutation}
              variables={{ boardId: data.board.id }}
              update={addBoardAreaCacheUpdate}
            >
              {(addBoard, { data, loading }) => (
                <AddFab onClick={addBoard}>
                  {loading && <CircularProgress />}
                  {!loading && <ContentAdd />}
                </AddFab>
              )}
            </Mutation>
          </AreaList>
        </DragDropContext>
      </div>
    );
  }
}

export default graphql(getBoardByIdQuery, {
  options: props => ({
    variables: {
      id: props.boardId
    }
  })
})(Board);
