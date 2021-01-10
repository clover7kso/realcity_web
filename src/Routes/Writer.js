import React, { useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-editor-classic/src/classiceditor.js";
import ImgurUploaderInit from "ckeditor5-imgur-uploader";
import { installedPlugins, toolbarSetting } from "../Components/CKEditorPlugin";

import styled from "styled-components";
import Input from "../Components/Input";

import { gql } from "@apollo/client";
import { useMutation } from "@apollo/client";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
  padding: 20px;
  border: 1px solid ${(props) => props.theme.lightGreyColor};
  border-radius: 3px;
`;

const InfoWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

const InputInfo = styled(Input)`
  border-color: ${(props) => props.theme.grey};
  background-color: white;
  height:44px
  font-size: 20px;
  text-align: left;
  padding-left:10px;
  margin-right:2%;
  margin-bottom:20px;
  border-radius:1px
  width: 25%;
  &::placeholder {
    color:${(props) => props.theme.grey}
  }
`;

const Title = styled(Input)`
  border-color: ${(props) => props.theme.grey};
  background-color: white;
  height:44px
  font-size: 20px;
  text-align: left;
  padding-left:10px;
  margin-right:40px;
  margin-bottom:20px;
  border-radius:1px
  width: 52%;
  &::placeholder {
    color:${(props) => props.theme.grey}
  }
`;

const ButtonWrapper = styled.div`
  justify-content: flex-end;
  display: flex;
  flex-direction: row;
  margin-top: 10px;
`;

const Confirm = styled.button`
  width: 130px;
  height: 100%;
  border: 0;
  border-radius: 2px;
  color: white;
  font-weight: 400;
  background-color: red
  text-align: center;
  padding: 7px 0px;
  font-size: 20px;
  cursor: pointer;
`;

const Cancel = styled.button`
  width: 130px;
  height: 100%;
  border: 0;
  border-radius: 2px;
  color: white;
  font-weight: 400;
  background-color: ${(props) => props.theme.darkGreyColor}
  text-align: center;
  padding: 7px 0px;
  font-size: 20px;
  cursor: pointer;
  margin-right:2%
`;

//list
const DropDownContainer = styled("div")`
  width: 52%;
`;

const DropDownHeader = styled("div")`
  margin-bottom: 20px;
  padding: 0.4em 2em 0.4em 1em;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.15);
  font-size: 1.3rem;
  color: black;
  background: #ffffff;
`;

const DropDownListContainer = styled("div")`
  margin-bottom: 20px;
`;

const DropDownList = styled("ul")`
  padding: 0;
  margin: 0;
  padding-left: 1em;
  background: #ffffff;
  border: 2px solid #e5e5e5;
  box-sizing: border-box;
  color: black;
  font-size: 1.3rem;
  &:first-child {
    padding-top: 0.8em;
  }
`;

const ListItem = styled("li")`
  list-style: none;
  margin-bottom: 0.8em;
`;

// list of items
const list = [
  { name: "🐶 자유롭게멍멍", key: "자유롭게멍멍" },
  { name: "🏎 애마자랑", key: "애마자랑" },
  { name: "🔫 나때는군대", key: "나때는군대" },
  { name: "📈 주식투자", key: "주식투자" },
  { name: "🚘 시승후기", key: "시승후기" },
  { name: "✈️ 여행먹방", key: "여행먹방" },
  { name: "💼 보험후기", key: "보험후기" },
  { name: "🚓️ 사고후기", key: "사고후기" },
  { name: "👰🏻‍♀️ 결혼이야기", key: "결혼이야기" },
  { name: "🚗 차Q&A", key: "차Q&A" },
];

export default () => {
  //list
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState({
    key: "카테고리",
    name: "",
  });
  const toggling = () => setIsOpen(!isOpen);
  const onOptionClicked = (value) => () => {
    setSelectedOption(value);
    setIsOpen(false);
  };

  const [nick, setNick] = useState("");
  const [password, setPassword] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const getImages = (data) => {
    var m,
      urls = [],
      rex = /<img[^>]*src=[\"']?([^>\"']+)[\"']?[^>]*>/g;

    while ((m = rex.exec(data))) {
      urls.push(m[1]);
    }

    return urls;
  };

  const getIp = async () => {
    const publicIp = require("public-ip");
    const ip = await publicIp.v4();
    const splitResult = ip.split(".");
    const result = splitResult[0] + "." + splitResult[1];
    return result;
  };

  const POST_UPLOAD = gql`
    mutation postUpload(
      $ip: String!
      $category: String!
      $title: String!
      $content: String!
      $author: String!
      $password: String!
      $images: [String]!
    ) {
      postUpload(
        ip: $ip
        category: $category
        title: $title
        content: $content
        author: $author
        password: $password
        images: $images
      )
    }
  `;
  const [postUpload, { data }] = useMutation(POST_UPLOAD);

  const clickConfirm = async () => {
    const ip = await getIp();
    console.log(ip);
    console.log(selectedOption.name);
    console.log(nick);
    console.log(password);
    console.log(title);
    console.log(content);
    const images = getImages(content);
    console.log(images);

    postUpload({
      variables: {
        ip: ip,
        category: selectedOption.name,
        title: title,
        content: content,
        author: nick,
        password: password,
        images: images,
      },
    });
  };

  const ImgurUploader = ImgurUploaderInit({ clientID: "818d43b4be21dd8" });

  return (
    <Wrapper>
      <DropDownContainer>
        <DropDownHeader onClick={toggling}>
          {selectedOption.name || "⏬ 카테고리"}
        </DropDownHeader>
        {isOpen && (
          <DropDownListContainer>
            <DropDownList>
              {list.map((item) => (
                <ListItem onClick={onOptionClicked(item)} key={item.key}>
                  {item.name}
                </ListItem>
              ))}
            </DropDownList>
          </DropDownListContainer>
        )}
      </DropDownContainer>

      <InfoWrapper>
        <InputInfo
          onChange={setNick}
          placeholder="닉네임"
          required="true"
          type="text"
        />
        <InputInfo
          onChange={setPassword}
          placeholder="비밀번호"
          required="true"
          type="password"
        />
      </InfoWrapper>
      <Title
        onChange={setTitle}
        placeholder="제목"
        required="true"
        type="text"
      />
      <CKEditor
        editor={ClassicEditor}
        config={{
          extraPlugins: [ImgurUploader],
          plugins: [...installedPlugins],
          toolbar: [...toolbarSetting],
        }}
        onChange={(event, editor) => {
          const data = editor.getData();
          setContent(data);
        }}
      />
      <ButtonWrapper>
        <Cancel>취소</Cancel>
        <Confirm onClick={clickConfirm}>완료</Confirm>
      </ButtonWrapper>
    </Wrapper>
  );
};
