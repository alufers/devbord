import App from "../components/App";
import withData from "../lib/withData";
import Board from "../components/Board";

class BoardPage extends React.Component {
  static async getInitialProps({ query }) {
    return {
      boardId: query.id
    };
  }
  render() {
   
    return (
      <App>
        <Board boardId={this.props.boardId} />
      </App>
    );
  }
}

export default withData(BoardPage);
