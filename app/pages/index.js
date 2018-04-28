import App from "../components/App";
import withData from "../lib/withData";
import Paper from "material-ui/Paper";
import BoardsList from "../components/boards/BoardsList";
import FloatingActionButton from "material-ui/FloatingActionButton";
import ContentAdd from "material-ui/svg-icons/content/add";
import NewBoardModal from "../components/boards/NewBoardModal";
import styled from "styled-components";

const FabContainer = styled.div`
  padding: 30px;
`;

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
          <BoardsList />
          <NewBoardModal
            onClose={this.closeNewBoardModal}
            open={this.state.newBoardModalOpen}
          />
          <FabContainer>
            <FloatingActionButton
              className="fab"
              onClick={this.openNewBoardModal}
            >
              <ContentAdd />
            </FloatingActionButton>
          </FabContainer>
        </Paper>
      </App>
    );
  }
}

export default withData(IndexPage);
