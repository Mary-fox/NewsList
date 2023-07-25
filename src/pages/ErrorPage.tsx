import React from "react";
import Navbar from "../components/Navbar";
import { styled } from "styled-components";

const ErrorWrapper = styled.div`
  color: white;
  padding: 20px;
`;
const ErrorPage = () => {
  return (
    <div>
      <Navbar />
      <ErrorWrapper>
        <h1>Страница не найдена.</h1>
      </ErrorWrapper>
    </div>
  );
};

export default ErrorPage;
