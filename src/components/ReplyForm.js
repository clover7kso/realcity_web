import React from "react";
import Input from "./Input";
import styled from "styled-components";
import TextareaAutosize from "react-autosize-textarea";
import { isPC } from "./MediaQuery";
import { gql } from "@apollo/client";
import { useMutation } from "@apollo/client";
import { getIp, checkValidate } from "./Util";

const ReplyWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const ReplyInfo = styled.div`
  display: flex;
  flex-direction: row;
`;

const ReplyContent = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Id = styled(Input)`
  margin: 0 5px 5px 0;
  width: ${(props) => props.width};
  border-radius: 4px;
  background-color: #f8f8f8;
`;

const Password = styled(Input)`
  margin: 0 0 5px 0;
  width: ${(props) => props.width};
  border-radius: 4px;
  background-color: #f8f8f8;
`;

const Content = styled(TextareaAutosize)`
  margin: 0 5px 5px 0;
  font-family: Roboto;
  background-color: #f8f8f8;
  flex: 1;
  border: 0;
  border: ${(props) => props.theme.boxBorder};
  border-radius: ${(props) => props.theme.borderRadius};
  height: 35px;
  font-size: 12px;
  padding: 10px 15px 10px 15px;
  &:focus {
    outline: none;
  }
`;

const ReplyButton = styled.button`
  border: 0;
  border-radius: 3px;
  background: #4a4848;
  outline: 0;
  width: 38px;
  height: 38px;
  cursor: pointer;
`;

export default ({ data, refetch, alert, isGroup, group }) => {
  var PC = isPC();
  const COMMENTUPLOADNOID = gql`
    mutation commentUploadNoID(
      $postId: String!
      $group: String
      $ip: String!
      $content: String!
      $author: String!
      $password: String!
    ) {
      commentUploadNoID(
        postId: $postId
        group: $group
        ip: $ip
        content: $content
        author: $author
        password: $password
      )
    }
  `;

  const COMMENTUPLOADID = gql`
    mutation commentUploadID(
      $postId: String!
      $group: String
      $ip: String!
      $content: String!
      $userId: String!
    ) {
      commentUploadID(
        postId: $postId
        group: $group
        ip: $ip
        content: $content
        userId: $userId
      )
    }
  `;

  const [commentUploadNoID] = useMutation(COMMENTUPLOADNOID);
  const [commentUploadID] = useMutation(COMMENTUPLOADID);

  var id = "";
  var password = "";
  var content = "";

  const clickHandlerNoID = async () => {
    const ip = await getIp();

    const uploadData = [
      {
        key: ip,
        tagNull: "올바르지 않은 ip주소 입니다.",
      },
      {
        key: id,
        tagNull: "닉네임을 입력해주세요.",
        regex: /^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9]{2,20}$/,
        tagRegex: "닉네임은 한글 또는 영어 또는 숫자 조합 2-20자입니다.",
      },
      {
        key: password,
        tagNull: "비밀번호를 입력해주세요.",
        regex: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{4,15}$/,
        tagRegex:
          "비밀번호는 영어대문자 또는 영어소문자 또는 숫자 조합 4-15자입니다.",
      },
      { key: content, tagNull: "내용을 입력해주세요." },
    ];
    const validateResult = checkValidate(uploadData, alert);

    if (validateResult) {
      const result = await commentUploadNoID({
        variables: {
          postId: data.postOne.id,
          ip: ip,
          group: isGroup ? group : undefined,
          content: content,
          author: id,
          password: password,
        },
      });
      if (result.data.commentUploadNoID) refetch();
    }
  };

  const clickHandlerID = async () => {
    const ip = await getIp();

    const uploadData = [
      {
        key: ip,
        tagNull: "올바르지 않은 ip주소 입니다.",
      },

      { key: content, tagNull: "내용을 입력해주세요." },
    ];
    const validateResult = checkValidate(uploadData, alert);

    if (validateResult) {
      const result = await commentUploadID({
        variables: {
          postId: data.postOne.id,
          ip: ip,
          group: isGroup ? group : undefined,
          content: content,
          userId: window.sessionStorage.getItem("id"),
        },
      });
      if (result.data.commentUploadID) refetch();
    }
  };

  return (
    <ReplyWrapper>
      {window.sessionStorage.getItem("id") ? null : (
        <ReplyInfo>
          <Id
            width={PC ? "25%" : "50%"}
            placeholder="닉네임"
            type="text"
            onChange={(text) => {
              id = text;
            }}
          />
          <Password
            width={PC ? "25%" : "50%"}
            placeholder="비밀번호"
            type="password"
            onChange={(text) => {
              password = text;
            }}
          />
        </ReplyInfo>
      )}
      <ReplyContent>
        <Content
          placeholder="댓글내용"
          type="text"
          onChange={(text) => {
            content = text.currentTarget.value;
          }}
        />
        <ReplyButton
          onClick={() => {
            window.sessionStorage.getItem("id")
              ? clickHandlerID()
              : clickHandlerNoID();
          }}
        >
          <span role="img" aria-label="pen">
            ✏️
          </span>
        </ReplyButton>
      </ReplyContent>
    </ReplyWrapper>
  );
};
