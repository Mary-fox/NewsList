import React from "react";
import { observer } from "mobx-react";
import styled, { keyframes } from "styled-components";

const loadAnimation = keyframes`
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
`;
const LoaderWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const LoaderCircle = styled.div`
  width: 20px;
  height: 20px;
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top: 3px solid white;
  animation: ${loadAnimation} 1s linear infinite;
`;

const Loader = observer(() => {
  return (
    <LoaderWrapper>
      <LoaderCircle />
    </LoaderWrapper>
  );
});

export default Loader;
