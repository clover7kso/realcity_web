import React, { useState } from "react";
import styled from "styled-components";
import { withRouter } from "react-router-dom";
import DiceBox from "../Components/DiceBox";
import { useQuery } from "@apollo/client";
import { gql } from "@apollo/client";
import { useAlert } from "react-alert";
import { getRemain } from "../Components/Util";
import Loader from "../Components/Loader";
import { useMutation } from "@apollo/client";

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
`;

const DiceWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 80vh;
`;

const GETME = gql`
  query getMe($id: String!) {
    getMe(id: $id) {
      nickname
      point
      gamblePosition
      gambleChance
    }
  }
`;

const GAMBLE_RESULT = gql`
  mutation gambleResult($id: String!, $diceSum: Int!, $betPoint: Int!) {
    gambleResult(id: $id, diceSum: $diceSum, betPoint: $betPoint)
  }
`;

const Ban = ({ history }) => {
  const alert = useAlert();

  const { data, loading, refetch } = useQuery(GETME, {
    variables: {
      id: window.sessionStorage.getItem("id"),
    },
  });

  const [gambleResult] = useMutation(GAMBLE_RESULT);
  const [toggle, setToggle] = useState();

  const refreshMe = async () => {
    refetch();
    if (!loading && data) {
      window.sessionStorage.setItem("nickname", data.getMe.nickname);
      window.sessionStorage.setItem("point", data.getMe.point);
      setToggle(!toggle);
      alert.removeAll();
      alert.success("경험치가 새로고침되었습니다.");
      alert.success(
        "다음레벨까지 좋아요 " +
          getRemain(window.sessionStorage.getItem("point")) +
          " 가 남았습니다."
      );
    }
  };

  return (
    <Wrapper>
      <DiceWrapper>
        {!loading && data !== null ? (
          <>
            <Title>인생역전!</Title>
            <DiceBox
              data={data}
              alert={alert}
              gambleResult={gambleResult}
              refreshMe={refreshMe}
            />
          </>
        ) : (
          <Loader />
        )}
      </DiceWrapper>
    </Wrapper>
  );
};
export default withRouter(Ban);
