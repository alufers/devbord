import App from "../components/App";
import withData from "../lib/withData";
import Paper from "material-ui/Paper";
import BoardsList from "../components/BoardsList";

export default withData(() => (
  <App>
    <Paper>
      <BoardsList />
    </Paper>
  </App>
));
