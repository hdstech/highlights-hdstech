import React from "react";
import styled from "styled-components";

const TimeLine = styled.div`
  border-bottom: 1px solid darkgrey;
  display: flex;
  justify-content: space-between;
`;

const TimeLineHeader: React.FC = () => {
  return (
    <>
      <TimeLine>
        <span>t=0</span>
        <span>t=1</span>
      </TimeLine>
    </>
  );
};

export default React.memo(TimeLineHeader);
