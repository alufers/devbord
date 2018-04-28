import React from "react";
import Paper from "material-ui/Paper";
import styled from "styled-components";

const AreaName = styled.div`
  margin-bottom: 5px;
`;

const BoardAreaPaper = styled(Paper)`
  margin-right: 20px;
  padding: 10px;
  min-height: 400px;
  min-width: 250px;
`;

export default ({ area }) => (
  <BoardAreaPaper>
    <AreaName>{area.name}</AreaName>
  </BoardAreaPaper>
);
