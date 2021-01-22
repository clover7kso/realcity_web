import React, { useState } from "react";
import styled from "styled-components";
import { withRouter } from "react-router-dom";
import Input from "../Components/Input";
import { checkValidate } from "../Components/Util";
import { gql } from "@apollo/client";
import { useMutation } from "@apollo/client";
import { useAlert } from "react-alert";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 80vh;
  font-family: Roboto;
  justify-content: center;
  align-items: center;
`;

const InnderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-width: 350px;
  margin-bottom: 30%;
`;

const Title = styled.span`
  display: flex;
  font-size: 24px;
  font-weight: bold;
  text-decoration: underline;
  margin-top: 30px;
  width: 100%;
`;
const InputInfo = styled(Input)`
  border-color: ${(props) => props.theme.grey};
  margin-top:30px
  background-color: white;
  height:44px
  font-size: 20px;
  text-align: left;
  padding-left:10px;
  margin-bottom:20px;
  border-radius:1px
  width:100%
  &::placeholder {
    color:${(props) => props.theme.grey}
  }
  &:focus{
    outline: none !important;
    border:1px solid ${(props) => props.theme.blueColor};
    box-shadow: 0 0 3px #719ECE;
  }
`;
const Confirm = styled.button`
  width: 130px;
  height: 100%;
  border: 0;
  border-radius: 2px;
  color: white;
  font-weight: 400;
  background-color: #4A4848
  text-align: center;
  padding: 7px 0px;
  font-size: 20px;
  cursor: pointer;
`;
const ButtonWrapper = styled.div`
  justify-content: flex-end;
  display: flex;
  flex-direction: row;
  width: 100%;
`;
const Register = ({ history }) => {
  const alert = useAlert();

  const REGISTER = gql`
    mutation register(
      $socialId: String!
      $socialType: String!
      $email: String!
      $nickname: String!
    ) {
      register(
        socialId: $socialId
        socialType: $socialType
        email: $email
        nickname: $nickname
      )
    }
  `;

  const [registerMutation] = useMutation(REGISTER);

  const [nick, setNick] = useState("");

  const clickConfirm = async () => {
    const uploadData = [
      {
        key: nick,
        tagNull: "닉네임을 입력해주세요.",
        regex: /^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9]{2,20}$/,
        tagRegex: "닉네임은 한글 또는 영어 또는 숫자 조합 2-20자입니다.",
      },
    ];
    const validateResult = checkValidate(uploadData, alert);

    if (validateResult) {
      const result = await registerMutation({
        variables: {
          socialId: history.location.state[0],
          socialType: history.location.state[1],
          email: history.location.state[2],
          nickname: nick,
        },
      });

      if (result.data.register) {
        alert.success(
          "회원가입에 성공하였습니다. " +
            (history.location.state[1] === "naver" ? "네이버" : "구글") +
            " 로그인을 눌러 로그인 해주세요."
        );
        history.push({
          pathname: "/",
        });
      } else alert.error("닉네임중복으로 회원가입에 실패하였습니다.");
    }
  };

  return (
    <Wrapper>
      <InnderWrapper>
        <Title>회원가입</Title>
        <InputInfo onChange={setNick} placeholder="닉네임" type="text" />
        <ButtonWrapper>
          <Confirm onClick={() => clickConfirm()}>완료</Confirm>
        </ButtonWrapper>
      </InnderWrapper>
    </Wrapper>
  );
};

export default withRouter(Register);
