import React from "react";
import styled from "styled-components";
import Input from "../Components/Input";
import { SearchIcon } from "./../Components/Icons";
import { withRouter, Link } from "react-router-dom";
import Sidebar from "../Components/Sidebar";
import HomeTop from "../Components/HomeTop";
import HomeNormal from "../Components/HomeNormal";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 80vh;
  font-family: Roboto;
`;

const SearchWrapper = styled.div`
  width: 100%;
  height: 10%;
  display: flex;
  align-items: left;
  border-color: black;
  border-radius: 50px;
  border-style: solid;
  border-width: 2px 2px 2px 2px;
`;

const SearchInput = styled(Input)`
  border-color: white;
  padding: 15px;
  font-size: 30px;
  height: 70px;
  text-align: left;
  padding-left:10px
  border-radius: 50px;
  width: 90%;
  &::placeholder {
    color:black;
    font-weight: 550;
  }
`;

const SearchButton = styled.button`
  background-color: transparent;
  border-color: transparent;
  margin: auto auto auto 2%;
  cursor: pointer;
  outline: 0;
`;

const PostZzalDivider = styled.div`
  display: flex;
  height: 100%;
`;

const PostWrapper = styled.div`
  width: 80%;
  height: 100%;
  min-height: 100%;
  padding: 5% 2% 0% 0%;
`;

const ZzalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 20%;
  height: 100%;
  min-height: 100%;
  padding: 5% 0 0 0;
`;

const TitleBar = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #cecece;
  align-items:baseline
  padding: 10px 0 10px 10px;
  margin: 0 0 10px 0;
`;

const Title = styled.span`
  font-size: 24px;
  font-weight: bold;
`;

const MoreView = styled(Link)`
  color: grey;
  font-size: 15px;
  text-align: right;
  background-color: transparent;
  border-color: transparent;
  cursor: pointer;
  outline: 0;
`;

const TopPost = styled.div`
  width: 100%;
  padding-right: 3%;
`;

const Home = ({ history }) => {
  return (
    <Wrapper>
      <SearchWrapper>
        <SearchButton>
          <SearchIcon></SearchIcon>
        </SearchButton>
        <SearchInput
          placeholder="관심있는 내용을 검색해주세요"
          type="text"
          onChange={() => {}}
        />
      </SearchWrapper>
      <PostZzalDivider>
        <PostWrapper>
          <TopPost>
            <TitleBar>
              <Title>{"👑 오늘 이 글 잘나가네"}</Title>
              <MoreView to={"/Board?👑 오늘 이 글 잘나가네"}>
                더보기 &gt;
              </MoreView>
            </TitleBar>
            <HomeTop />
          </TopPost>
          <HomeNormal />
        </PostWrapper>
        <ZzalWrapper>
          <Title>오늘 짤방 TOP</Title>
          <Sidebar />;
        </ZzalWrapper>
      </PostZzalDivider>
    </Wrapper>
  );
};

export default withRouter(Home);
