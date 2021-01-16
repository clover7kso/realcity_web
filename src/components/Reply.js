import React from "react"
import Input from "./Input"
import styled from "styled-components";
import TextareaAutosize from 'react-autosize-textarea';
import { isPC } from "./MediaQuery";

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
`;

export default () => {
    var PC = isPC();
    return(
        <ReplyWrapper>
            <ReplyInfo>
                <Id width={PC?"25%":"50%"} placeholder="닉네임" type="text" onChange={()=>{}}></Id>
                <Password width={PC?"25%":"50%"} placeholder="비밀번호" type="password" onChange={()=>{}}></Password>
            </ReplyInfo>
            <ReplyContent>
                <Content placeholder="댓글내용" type="text" onChange={()=>{}}></Content>
                <ReplyButton><span role="img" aria-label="pen">✏️</span></ReplyButton>
            </ReplyContent>
        </ReplyWrapper>
    );
}