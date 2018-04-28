import App from "../components/App";
import withData from "../lib/withData";
import Paper from "material-ui/Paper";
import BoardsList from "../components/BoardsList";
import FloatingActionButton from "material-ui/FloatingActionButton";
import ContentAdd from "material-ui/svg-icons/content/add";
import NewBoardModal from "../components/NewBoardModal";

class IndexPage extends React.Component {
  state = { newBoardModalOpen: false };
  openNewBoardModal = _ => {
    this.setState({ newBoardModalOpen: true });
  };
  closeNewBoardModal = _ => {
    this.setState({ newBoardModalOpen: false });
  };
  render() {
    return (
      <App>
        <Paper>
          <style jsx>
            {`
              .fab-container {
                padding: 30px;
              }
            `}
          </style>
          <BoardsList />
          <NewBoardModal
            onClose={this.closeNewBoardModal}
            open={this.state.newBoardModalOpen}
          />
          <div className="fab-container">
            <FloatingActionButton
              className="fab"
              onClick={this.openNewBoardModal}
            >
              <ContentAdd />
            </FloatingActionButton>
          </div>
        </Paper>
      </App>
    );
  }
}

export default withData(IndexPage);
