import React from "react";
import Paper from "material-ui/Paper";

export default ({ area }) => (
  <Paper className="board-area">
    <style jsx>{`
      :global(.board-area) {
        margin-right: 20px;
        padding: 10px;
        min-height: 400px;
        min-width: 250px;
      }
    `}</style>
    <h2>{area.name}</h2>
  </Paper>
);
