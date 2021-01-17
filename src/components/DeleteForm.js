import React from "react";
import styled from "styled-components";
import { isPC } from "./MediaQuery";
import { checkValidate } from "./Util";
import Input from "./Input";

const ReplyWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const ReplyContent = styled.div`
  display: flex;
`;

const Password = styled(Input)`
  width: ${(props) => props.width};
  border-radius: 4px;
  background-color: #f8f8f8;
`;

const ReplyButton = styled.button`
  border: 0;
  border-radius: 3px;
  background: #e00000;
  outline: 0;
  width: 44px;
  height: 32px;
  cursor: pointer;
  color: white;
`;

var password = "";
export default ({ funcSend, id, funcComplete, alert }) => {
  var PC = isPC();

  const upload = async ({ password }) => {
    const result = await funcSend({
      variables: {
        id: id,
        password: password,
      },
    });
    return result.data;
  };
  const clickHandler = async () => {
    const uploadData = [
      {
        key: password,
        tagNull: "비밀번호를 입력해주세요.",
        regex: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{4,15}$/,
        tagRegex:
          "비밀번호는 영어대문자 또는 영어소문자 또는 숫자 조합 4-15자입니다.",
      },
    ];
    const validateResult = checkValidate(uploadData, alert);

    if (validateResult) {
      const { postShowOff, commentShowOff } = await upload({ password });
      if (postShowOff || commentShowOff) {
        alert.success("해당 글이 삭제되었습니다.");
        funcComplete();
      } else alert.error("올바르지 않은 비밀번호입니다.");
    }
  };

  return (
    <ReplyWrapper>
      <ReplyContent>
        <Password
          width={PC ? "25%" : "50%"}
          placeholder="비밀번호"
          type="password"
          onChange={(text) => {
            password = text;
          }}
        />
        <ReplyButton onClick={() => clickHandler()}>삭제</ReplyButton>
      </ReplyContent>
    </ReplyWrapper>
  );
};
