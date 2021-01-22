import React, { useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-editor-classic/src/classiceditor.js";
import ImgurUploaderInit from "ckeditor5-imgur-uploader";
import { installedPlugins, toolbarSetting } from "../Components/CKEditorPlugin";
import styled from "styled-components";
import Input from "../Components/Input";
import { gql } from "@apollo/client";
import { useMutation } from "@apollo/client";
import { useAlert } from "react-alert";
import { withRouter } from "react-router-dom";
import {
  CategoryListTypeC,
  getIp,
  getImages,
  checkValidate,
} from "../Components/Util";
import { isPC } from "../Components/MediaQuery";

const CKEditorWrapper = styled.div`
  border: 1px solid ${(props) => props.theme.lightGreyColor};
`;

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
  margin-right:${(props) => props.marginRight}
  margin-bottom:20px;
  border-radius:1px
  width:${(props) => (props.width ? props.width : "25%")}
  &::placeholder {
    color:${(props) => props.theme.grey}
  }
  &:focus{
    outline: none !important;
    border:1px solid ${(props) => props.theme.blueColor};
    box-shadow: 0 0 3px #719ECE;
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
  width : ${(props) => (props.width ? props.width : "52%")}
  &::placeholder {
    color:${(props) => props.theme.grey}
  }
  &:focus{
    outline: none !important;
    border:1px solid ${(props) => props.theme.blueColor};
    box-shadow: 0 0 3px #719ECE;
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
  background-color: #4A4848
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
  width: ${(props) => (props.width ? props.width : "52%")};
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
const Writer = ({ history }) => {
  const alert = useAlert();

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

  const POST_UPLOAD_NOID = gql`
    mutation postUploadNoID(
      $ip: String!
      $category: String!
      $title: String!
      $content: String!
      $author: String!
      $password: String!
      $images: [String]!
    ) {
      postUploadNoID(
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

  const POST_UPLOAD_ID = gql`
    mutation postUploadID(
      $ip: String!
      $category: String!
      $title: String!
      $content: String!
      $userId: String!
      $images: [String]!
    ) {
      postUploadID(
        ip: $ip
        category: $category
        title: $title
        content: $content
        userId: $userId
        images: $images
      )
    }
  `;

  const [postUploadNoID] = useMutation(POST_UPLOAD_NOID);
  const [postUploadID] = useMutation(POST_UPLOAD_ID);

  const clickConfirmNoID = async () => {
    const ip = await getIp();
    const images = getImages(content);

    const uploadDataNoID = [
      {
        key: ip,
        tagNull: "올바르지 않은 ip주소 입니다.",
      },
      {
        key: selectedOption.name,
        tagNull: "카테고리를 정해주세요.",
      },
      {
        key: nick,
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
      {
        key: title,
        tagNull: "제목을 입력해주세요.",
        regex: /^.{2,200}$/,
        tagRegex: "제목은 2-200자 입니다.",
      },
      { key: content, tagNull: "내용을 입력해주세요." },
    ];
    const validateResult = checkValidate(uploadDataNoID, alert);

    if (validateResult) {
      const result = await postUploadNoID({
        variables: {
          ip: ip,
          category: selectedOption.key,
          title: title,
          content: content,
          author: nick,
          password: password,
          images: images,
        },
      });

      if (result.data.postUploadNoID) {
        alert.success("업로드에 성공하였습니다.");
        history.push({
          pathname: "/Board",
          search: "?" + selectedOption.name,
        });
      } else alert.error("업로드에 실패하였습니다.");
    }
  };

  const clickConfirmID = async () => {
    const ip = await getIp();
    const images = getImages(content);

    const uploadDataID = [
      {
        key: ip,
        tagNull: "올바르지 않은 ip주소 입니다.",
      },
      {
        key: selectedOption.name,
        tagNull: "카테고리를 정해주세요.",
      },
      {
        key: title,
        tagNull: "제목을 입력해주세요.",
        regex: /^.{2,200}$/,
        tagRegex: "제목은 2-200자 입니다.",
      },
      { key: content, tagNull: "내용을 입력해주세요." },
    ];
    const validateResult = checkValidate(uploadDataID, alert);

    if (validateResult) {
      const result = await postUploadID({
        variables: {
          ip: ip,
          category: selectedOption.key,
          title: title,
          content: content,
          userId: window.sessionStorage.getItem("id"),
          images: images,
        },
      });

      if (result.data.postUploadID) {
        alert.success("업로드에 성공하였습니다.");
        history.push({
          pathname: "/Board",
          search: "?" + selectedOption.name,
        });
      } else alert.error("업로드에 실패하였습니다.");
    }
  };

  const ImgurUploader = ImgurUploaderInit({ clientID: "818d43b4be21dd8" });

  var pcCheck = isPC();

  return (
    <Wrapper>
      <DropDownContainer width={pcCheck ? null : "100%"}>
        <DropDownHeader onClick={toggling}>
          {selectedOption.name || "⏬ 카테고리"}
        </DropDownHeader>
        {isOpen && (
          <DropDownListContainer>
            <DropDownList>
              {CategoryListTypeC.map((item) => (
                <ListItem onClick={onOptionClicked(item)} key={item.key}>
                  {item.name}
                </ListItem>
              ))}
            </DropDownList>
          </DropDownListContainer>
        )}
      </DropDownContainer>

      {window.sessionStorage.getItem("id") ? null : (
        <InfoWrapper>
          <InputInfo
            width={pcCheck ? null : "49%"}
            onChange={setNick}
            placeholder="닉네임"
            type="text"
            marginRight="2%"
          />
          <InputInfo
            width={pcCheck ? null : "49%"}
            onChange={setPassword}
            placeholder="비밀번호"
            type="password"
            marginRight="0%"
          />
        </InfoWrapper>
      )}
      <Title
        width={pcCheck ? null : "100%"}
        onChange={setTitle}
        placeholder="제목"
        type="text"
      />
      <CKEditorWrapper>
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
      </CKEditorWrapper>
      <ButtonWrapper>
        <Cancel onClick={() => history.goBack()}>취소</Cancel>
        <Confirm
          onClick={
            window.sessionStorage.getItem("id")
              ? clickConfirmID
              : clickConfirmNoID
          }
        >
          완료
        </Confirm>
      </ButtonWrapper>
    </Wrapper>
  );
};
export default withRouter(Writer);
