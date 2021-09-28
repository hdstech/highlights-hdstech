import React, { Fragment } from "react";
import styled from "styled-components";
import GlobalStyle from "./GlobalStyle";
import TimeLineHeader from "./components/TimeLineHeader";
import Highlights from "./components/Highlights";
import { dummyHighlights } from "./lib/dummyData";

const Container = styled.div`
  padding: 12px;
  background-color: lightgrey;
`;

const App = () => (
  <Fragment>
    <GlobalStyle />
    <Container>
      <TimeLineHeader />
      <Highlights highlights={dummyHighlights} />
    </Container>
  </Fragment>
);

export default React.memo(App);
