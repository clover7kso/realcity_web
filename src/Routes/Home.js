import React from "react";
import styled from "styled-components";
import Input from "../Components/Input";
import { SearchIcon } from "./../Components/Icons";
import { withRouter } from "react-router-dom";
import Sidebar from "../Components/Sidebar";
import HomeTop from "../Components/HomeTop";
import HomeNormal from "../Components/HomeNormal";
import { PC, isPC } from "../Components/MediaQuery";

const Wrapper = styled.div`
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
  border-radius: 50px;
  border-style: solid;
  border-width: 2px;
`;

const SearchInput = styled(Input)`
  border-color: white;
  padding: 15px;
  font-size: 24px;
  height: 50px;
  text-align: left;
  border-radius: 50px;
  width: 90%;
  &::placeholder {
    color: grey;
  }
`;

const SearchButton = styled.button`
  background-color: transparent;
  border-color: transparent;
  margin-left:20px
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
  padding: 30px 0 0 0;
`;

const ZzalWrapper = styled.div`
  width:190px
  display: flex;
  flex-direction: column;
  font-family: Roboto;
  padding-top:5%
`;

const Title = styled.span`
  font-size: 24px;
  font-weight: bold;
`;

const Home = ({ history }) => {
  const PCCheck = isPC();
  return (
    <Wrapper>
      <SearchWrapper>
        <SearchButton>
          <SearchIcon />
        </SearchButton>
        <SearchInput
          placeholder="게시물을 검색해주세요"
          type="text"
          onChange={() => {}}
        />
      </SearchWrapper>
      <PostZzalDivider>
        <PostWrapper width={PCCheck ? "80%" : "100%"}>
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
