import { List, ListItem } from "material-ui/List";
import Subheader from "material-ui/Subheader";
import DahsboardIcon from "material-ui/svg-icons/action/dashboard";
import { Link } from "../routes";
import { graphql } from "react-apollo";
import gql from "graphql-tag";

const BoardsList = ({ data }) => {
  if (data.loading) {
    return <div>Loading</div>;
  }
  let boardItems = data.boards.map(b => (
    <Link passHref={true} route="board" params={{ id: b.id }} key={b.id}>
      <ListItem
        primaryText={b.name}
        rightIcon={<DahsboardIcon />}
        containerElement="a"
      />
    </Link>
  ));
  return (
    <List>
      <Subheader>Boards</Subheader>
      {boardItems}
    </List>
  );
};

export default graphql(gql`
  query BoardsListQuery {
    boards {
      id
      name
    }
  }
`)(BoardsList);
