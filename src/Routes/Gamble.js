import React, { useState } from "react";
import styled from "styled-components";
import { withRouter } from "react-router-dom";
import DiceBox from "../Components/DiceBox";
import DiceBoxNotPC from "../Components/DiceBoxNotPC";
import { useQuery } from "@apollo/client";
import { gql } from "@apollo/client";
import { useAlert } from "react-alert";
import { getRemain } from "../Components/Util";
import { isPC } from "../Components/MediaQuery";
import Loader from "../Components/Loader";
import { useMutation } from "@apollo/client";

const Title = styled.h1`
  font-family: BMJUA;
  font-size: ${(props) => (props.PCcheck ? "3rem" : "2rem")};
  margin-top: ${(props) => (props.PCcheck ? "2rem" : ".7rem")};
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
  mutation gambleResult(
    $id: String!
    $dice1: Int!
    $dice2: Int!
    $betPoint: Int!
  ) {
    gambleResult(id: $id, dice1: $dice1, dice2: $dice2, betPoint: $betPoint)
  }
`;

const Ban = ({ history }) => {
  const alert = useAlert();

  if (window.sessionStorage.getItem("id"))
    var { data, loading, refetch } = useQuery(GETME, {
      variables: {
        id: window.sessionStorage.getItem("id"),
      },
    });

  const [gambleResult] = useMutation(GAMBLE_RESULT);
  const [toggle, setToggle] = useState();

  const refreshMe = async () => {
    const result = await refetch();
    data = result.data;
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
  };

  var PCcheck = isPC();

  return (
    <Wrapper>
      <DiceWrapper>
        {!loading && data !== undefined ? (
          <>
            <Title PCcheck={PCcheck}>인생역전!</Title>
            {PCcheck ? (
              <DiceBox
                data={data}
                alert={alert}
                gambleResult={gambleResult}
                refreshMe={refreshMe}
              />
            ) : (
              <DiceBoxNotPC
                data={data}
                alert={alert}
                gambleResult={gambleResult}
                refreshMe={refreshMe}
              />
            )}
          </>
        ) : loading ? (
          <Loader />
        ) : (
          <>
            <Title PCcheck={PCcheck}>로그인이 필요한 기능입니다.</Title>
            <Title PCcheck={PCcheck}>
              로그인하면 액션쾌감 부르마블 시스템을 즐기실 수 있습니다.
            </Title>
          </>
        )}
      </DiceWrapper>
    </Wrapper>
  );
};
export default withRouter(Ban);
