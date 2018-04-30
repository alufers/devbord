import App from "../components/App";
import withData from "../lib/withData";
import Board from "../components/boards/Board";
import withApp from "../lib/withApp";
import { resetServerContext } from "react-beautiful-dnd";
import { ApolloConsumer } from "react-apollo";

class BoardPage extends React.Component {
  static async getInitialProps({ query }) {
    if (!process.browser) resetServerContext();
    return {
      boardId: query.id
    };
  }
  render() {
    return (
      <ApolloConsumer>
        {client => <Board boardId={this.props.boardId} apolloClient={client}/>}
      </ApolloConsumer>
    );
  }
}

export default withData(withApp(BoardPage));
