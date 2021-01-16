import React from "react"
import Input from "./Input"
import styled from "styled-components";
import TextareaAutosize from 'react-autosize-textarea';
import { isPC } from "./MediaQuery";
import { gql } from "@apollo/client";
import { useMutation } from "@apollo/client";
import { getIp, checkValidate } from "./Util"

const ReplyWrapper = styled.div`
display:flex;
flex-direction: column;
padding: 20px 0 0 0;
`;

const ReplyInfo = styled.div`
display:flex;
flex-direction: row;
`;

const ReplyContent = styled.div`
display:flex;
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
  flex:1;
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
border:0;
border-radius:3px;
background: #E00000;
outline:0;
width:38px;
height:38px;
cursor:pointer;
`;

export default ({data, refetch, alert}) => {
    var PC = isPC();
    const COMMENTUPLOAD = gql`
        mutation commentUpload($postId: String!, $group: String, $ip: String!, $content: String!, $author: String!, $password: String!) {
            commentUpload(
                postId: $postId,
                group: $group,
                ip: $ip,
                content: $content,
                author: $author,
                password: $password)
        }
    `;
    const [commentUpload] = useMutation(COMMENTUPLOAD);
    var id = "";
    var password = "";
    var content = "";
    const upload = async () => {
        const ip = await getIp();
        const result = await commentUpload({
        variables: {
            postId: data.postOne.id,
            ip: ip,
            content: content,
            author: id,
            password: password,
        },
        });
        return result.data.commentUpload
    }
    const clickHandler = async () => {
        const uploadData = [
            {
              key: id,
              tagNull: "닉네임을 입력해주세요.",
              regex: /^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9].{2,20}/,
              tagRegex: "닉네임은 한글 또는 영어 또는 숫자 조합 2-20자입니다.",
            },
            {
              key: password,
              tagNull: "비밀번호를 입력해주세요.",
              regex: /^[a-zA-Z0-9]{4,15}$/,
              tagRegex:
                "비밀번호는 영어대문자 또는 영어소문자 또는 숫자 조합 4-15자입니다.",
            },
            { key: content, tagNull: "내용을 입력해주세요." },
          ];
          const validateResult = checkValidate(uploadData, alert);
      
          if (validateResult){
            const isSuccess = await upload();
            if(isSuccess) refetch();
          }
    }

    return(
        <ReplyWrapper>
            <ReplyInfo>
                <Id width={PC?"25%":"50%"} placeholder="닉네임" type="text" onChange={(text)=>{id = text}}></Id>
                <Password width={PC?"25%":"50%"} placeholder="비밀번호" type="password" onChange={(text)=>{password = text}}></Password>
            </ReplyInfo>
            <ReplyContent>
                <Content placeholder="댓글내용" type="text" onChange={(text)=>{content=text.currentTarget.value}}></Content>
                <ReplyButton onClick={()=>clickHandler()}><span role="img" aria-label="pen">✏️</span></ReplyButton>
            </ReplyContent>
        </ReplyWrapper>
    );
}