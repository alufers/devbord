import App from "../components/App";
import withData from "../lib/withData";
import Board from "../components/boards/Board";
import withApp from "../lib/withApp";

class BoardPage extends React.Component {
  static async getInitialProps({ query }) {
    return {
      boardId: query.id
    };
  }
  render() {
    return <Board boardId={this.props.boardId} />;
  }
}

export default withData(withApp(BoardPage));
