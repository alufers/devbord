import gql from "graphql-tag";

export default gql`
  query getBoards {
    boards {
      id
      name
    }
  }
`;
