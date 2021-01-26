import React from "react";
import styled from "styled-components";
import { withRouter } from "react-router-dom";
import DiceBox from "../Components/DiceBox";

const Title = styled.h1`
  font-family: BMJUA;
  font-size: 3rem;
  margin: 2rem 0;
  text-align: center;
  color: #000;
  margin-bottom: 20px;
`;
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 80vh;
`;

const Ban = ({ history }) => {
  return (
    <Wrapper>
      <Title>던져라! 주사위! </Title>
      <DiceBox />
    </Wrapper>
  );
};
export default withRouter(Ban);
