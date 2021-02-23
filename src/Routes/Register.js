import React, { useState } from "react";
import styled from "styled-components";
import { withRouter } from "react-router-dom";
import Input from "../Components/Input";
import { checkValidate } from "../Components/Util";
import { gql } from "@apollo/client";
import { useMutation } from "@apollo/client";
import { useAlert } from "react-alert";
import Modal from "../Components/Modal";
import {
  footerDataPrivacy,
  dataMarketing,
  footerDataRule,
} from "../Components/Util";

const Wrapper = styled.div`
  max-width: 935px;
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
  margin-bottom: 30px;
`;

const NickInfo = styled.div`
  display: flex;
  font-size: 15px;
  width: 100%;
`;

const InputInfo = styled(Input)`
  border-color: ${(props) => props.theme.grey};
  margin-top:20px
  background-color: white;
  height:44px
  font-size: 20px;
  text-align: left;
  padding-left:10px;
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

const AgreeWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  margin-top: 20px;
  align-items: center;
`;

const Info = styled.div`
  display: flex;
  font-size: 15px;
  margin-left: 10px;
  flex: 1;
`;

const InfoFull = styled.button`
  display: flex;
  font-size: 15px;
  color: darkGrey;
  background: white;
  border: 0;
  outline: 0;
`;

const Register = ({ history }) => {
  const alert = useAlert();

  const REGISTER = gql`
    mutation register(
      $socialId: String!
      $socialType: String!
      $email: String!
      $nickname: String!
      $agreeMarketing: Boolean!
    ) {
      register(
        socialId: $socialId
        socialType: $socialType
        email: $email
        nickname: $nickname
        agreeMarketing: $agreeMarketing
      )
    }
  `;

  const [registerMutation] = useMutation(REGISTER);

  const [nick, setNick] = useState("");
  const [agreeUsage, setAgreeUsage] = useState(false);
  const [agreePrivacy, setAgreePrivacy] = useState(false);
  const [agreeMarketing, setAgreeMarketing] = useState(false);
  const [agreeAll, setAgreeAll] = useState(false);
  const setAll = () => {
    setAgreeUsage(!agreeAll);
    setAgreePrivacy(!agreeAll);
    setAgreeMarketing(!agreeAll);
    setAgreeAll(!agreeAll);
  };
  const [modalVisible, setModalVisible] = useState(false);
  const [index, setIndex] = useState(0);
  const dataList = [footerDataRule, footerDataPrivacy, dataMarketing];
  const openModal = (idx) => {
    setIndex(idx);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const clickConfirm = async () => {
    if (!agreeUsage) alert.error("이용수칙 동의는 필수사항입니다.");
    if (!agreePrivacy) alert.error("개인정보처리 동의는 필수사항입니다.");

    const uploadData = [
      {
        key: nick,
        tagNull: "닉네임을 입력해주세요.",
        regex: /^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9]{2,20}$/,
        tagRegex: "닉네임은 한글 또는 영어 또는 숫자 조합 2-20자입니다.",
      },
    ];
    const validateResult = checkValidate(uploadData, alert);

    if (agreeUsage && agreePrivacy && validateResult) {
      const result = await registerMutation({
        variables: {
          socialId: history.location.state[0],
          socialType: history.location.state[1],
          email: history.location.state[2],
          nickname: nick,
          agreeMarketing: agreeMarketing,
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
        <NickInfo>닉네임은 변경 불가하니 신중하게 정해주세요.</NickInfo>
        <InputInfo onChange={setNick} placeholder="닉네임" type="text" />
        <AgreeWrapper>
          <input
            style={{ width: "20px", height: "20px" }}
            type="checkbox"
            checked={agreeUsage}
            onChange={() => setAgreeUsage(!agreeUsage)}
          />
          <Info>[필수] 이용수칙 동의 </Info>
          <InfoFull onClick={() => openModal(0)}>전문보기</InfoFull>
        </AgreeWrapper>
        <AgreeWrapper>
          <input
            style={{ width: "20px", height: "20px" }}
            type="checkbox"
            checked={agreePrivacy}
            onChange={() => setAgreePrivacy(!agreePrivacy)}
          />
          <Info>[필수] 개인정보처리 동의 </Info>{" "}
          <InfoFull onClick={() => openModal(1)}>전문보기</InfoFull>
        </AgreeWrapper>
        <AgreeWrapper>
          <input
            style={{ width: "20px", height: "20px" }}
            type="checkbox"
            checked={agreeMarketing}
            onChange={() => setAgreeMarketing(!agreeMarketing)}
          />
          <Info>[선택] 마케팅수신 동의</Info>{" "}
          <InfoFull onClick={() => openModal(2)}>전문보기</InfoFull>
        </AgreeWrapper>
        <AgreeWrapper>
          <input
            style={{ width: "20px", height: "20px" }}
            type="checkbox"
            checked={agreeAll}
            onChange={() => setAll()}
          />
          <Info>전체 동의</Info>
        </AgreeWrapper>
        <ButtonWrapper>
          <Confirm onClick={() => clickConfirm()}>완료</Confirm>
        </ButtonWrapper>
      </InnderWrapper>
      {modalVisible && (
        <Modal
          visible={modalVisible}
          closable={true}
          maskClosable={true}
          onClose={closeModal}
        >
          <span dangerouslySetInnerHTML={{ __html: dataList[index] }} />
        </Modal>
      )}
    </Wrapper>
  );
};

export default withRouter(Register);
