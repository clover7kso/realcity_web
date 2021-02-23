import React from "react";
import styled from "styled-components";
import Input from "../Components/Input";
import { SearchIcon } from "./../Components/Icons";
import { withRouter } from "react-router-dom";
import Sidebar from "../Components/Sidebar";
import HomeTop from "../Components/HomeTop";
import HomeNormal from "../Components/HomeNormal";
import HomeNotice from "../Components/HomeNotice";
import { PC, isPC } from "../Components/MediaQuery";

const Wrapper = styled.div`
  max-width: 935px;
  display: flex;
  flex-direction: column;
  min-height: 80vh;
  font-family: Roboto;
`;

const SearchWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: left;
  border-color: black;
  border-radius: 10px;
  border-style: solid;
  border-width: 2px;
`;

const SearchInput = styled(Input)`
  border-color: white;
  padding: ${(props) => (props.PCCheck ? "15px" : "5px")};
  font-size: ${(props) => (props.PCCheck ? "24px" : "17px")};
  height: ${(props) => (props.PCCheck ? "50px" : "35px")};
  text-align: left;
  border-radius: 50px;
  width: 100%;
  &::placeholder {
    color: grey;
  }
`;

const SearchButton = styled.button`
  background-color: transparent;
  border-color: transparent;
  margin-left: ${(props) => (props.PCCheck ? "20px" : "10px")};
  cursor: pointer;
  outline: 0;
`;

const PostZzalDivider = styled.div`
  display: flex;
  height: 100%;
`;

const PostWrapper = styled.div`
  width: ${(props) => props.width};
  height: 100%;
  min-height: 100%;
  padding: 5px 0 0 0;
`;

const ZzalWrapper = styled.div`
  width:190px
  display: flex;
  flex-direction: column;
  font-family: Roboto;
  padding-top:25px
`;

const Title = styled.span`
  font-size: 24px;
  font-weight: bold;
`;

const Home = ({ history }) => {
  const PCCheck = isPC();
  var search = "";

  const onKeyPress = (e) => {
    if (e.key === "Enter") {
      history.push({
        pathname: "/Search",
        search: "?" + search,
      });
    }
  };
  return (
    <Wrapper>
      <SearchWrapper>
        <SearchButton
          PCCheck={PCCheck}
          onClick={() => {
            history.push({
              pathname: "/Search",
              search: "?" + search,
            });
          }}
        >
          <SearchIcon />
        </SearchButton>
        <SearchInput
          PCCheck={PCCheck}
          placeholder="게시물을 검색해주세요"
          type="text"
          onChange={(text) => {
            search = text;
          }}
          onKeyPress={onKeyPress}
        />
      </SearchWrapper>
      <PostZzalDivider>
        <PostWrapper width={PCCheck ? "80%" : "100%"}>
          <HomeNotice />
          <HomeTop />
          <HomeNormal />
        </PostWrapper>
        <PC>
          <ZzalWrapper>
            <Title>오늘 짤방 TOP</Title>
            <Sidebar />
          </ZzalWrapper>
        </PC>
      </PostZzalDivider>
    </Wrapper>
  );
};

export default withRouter(Home);
