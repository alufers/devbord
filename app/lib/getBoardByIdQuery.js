import gql from "graphql-tag";
export default gql`
  query getBoardById($id: ID!) {
    board(where: { id: $id }) {
      id
      name
      areas {
        id
        name
        id
        cards: cards(orderBy: index_ASC) {
          area {
            id
          }
          id
          title
          index
          content
        }
      }
    }
  }
`;
