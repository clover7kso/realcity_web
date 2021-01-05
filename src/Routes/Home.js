import { syntaxError } from "graphql/error";
import React from "react";
import styled from "styled-components";
import Button from "../Components/Button";
import Input from "../Components/Input";
import { Link, withRouter } from "react-router-dom";
import { SearchIcon, Ddabong, View } from "./../Components/Icons";
import { render } from "react-dom";

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

const SideWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SearchInput = styled(Input)`
  border-color: Transparent;
  background-color: ${(props) => props.theme.bgColor};
  padding: 15px;
  font-size: 30px;
  height: 50px;
  text-align: left;
  padding-left:10px
  border-radius: 50px;
  width: 90%;
  &::placeholder {
    color:black
    font-weight: 200;
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
  padding: 5% 5% 0% 0%;
`;

const ZzalWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 20%;
  height: 100%;
  padding: 5% 0% 0% 0%;
`;

const TitleBar = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Title = styled.span`
  font-size: 24px;
  font-weight: bold;
`;

const MoreView = styled.button`
  font-size: 18px;
  font-weight: bold;
  text-align: right;
  background-color: transparent;
  border-color: transparent;
  cursor: pointer;
  outline: 0;
`;

const NormalMoreView = styled.button`
  font-size: 18px;
  font-weight: bold;
  text-align: right;
  background-color: transparent;
  border-color: transparent;
  cursor: pointer;
  outline: 0;
`;

const TopPost = styled.div`
  width: 100%;
`;

const NormalPost = styled.div`
  width: 50%;
  height: 15%;
  padding: 1%;
  flex: 1 1 40%;
`;

const NormalPostWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: black;
  font-size: 18px;
  width: 70%;
  height: 18px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  &:focus,
  &:hover,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
  }
`;

const TextBox = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 18px;
  margin: 1% auto auto auto;
`;

const CategoryBox = styled(Link)`
  text-decoration: none;
  font-size: 13px;
  color: #818181;
  border: 1px solid #cecece;
  margin: 0 3% 0 0;
`;

const CategoryTitleWrapper = styled.div`
  display: flex;
  width: 80%;
`;

class TopPostInfo extends React.Component {
  render() {
    return (
      <TextBox>
        <CategoryTitleWrapper>
          <CategoryBox to="">{this.props.post.category}</CategoryBox>
          <StyledLink to="/:catecory/:id">{this.props.post.title}</StyledLink>
        </CategoryTitleWrapper>
        <span>
          <Ddabong></Ddabong>
          {this.props.post.like}
        </span>
        &nbsp;&nbsp;
        <span>
          <View></View>
          {this.props.post.view}
        </span>
        <br />
      </TextBox>
    );
  }
}

class TopPostList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      postData: [
        {
          title: "악1",
          category: "자유롭게멍멍",
          like: 1,
          view: 1,
        },
        {
          title: "악2",
          category: "애마자랑",
          like: 2,
          view: 2,
        },
        {
          title: "악3",
          category: "주식투자",
          like: 3,
          view: 3,
        },
        {
          title: "악4",
          category: "나때는군대",
          like: 4,
          view: 4,
        },
        {
          title: "악5",
          category: "시승후기",
          like: 5,
          view: 5,
        },
      ],
    };
    this.state.postData.sort(function (a, b) {
      return a.view > b.view ? -1 : a.view < b.view ? 1 : 0;
    }); //조회수순 정렬
  }
  render() {
    const mapToComponent = (data) => {
      return data.map((post, i) => {
        return <TopPostInfo post={post} key={i} />;
      });
    };
    return <div>{mapToComponent(this.state.postData)}</div>;
  }
}

class NormalPostInfo extends React.Component {
  render() {
    return (
      <TextBox>
        <StyledLink to="/">{this.props.post.title}</StyledLink>
        <span>
          <Ddabong></Ddabong> {this.props.post.like}
        </span>
        &nbsp;
        <span>
          <View></View> {this.props.post.view}
        </span>
        <br />
        <br />
      </TextBox>
    );
  }
}

class NormalPostList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      postData: [
        {
          title: "악dfsfdsfssssssssssssssssssssssssssss1",
          category: "1",
          like: 1,
          view: 1,
        },
        {
          title: "악2",
          category: "2",
          like: 2,
          view: 2,
        },
        {
          title: "악3",
          category: "3",
          like: 3,
          view: 3,
        },
        {
          title: "악4",
          category: "4",
          like: 4,
          view: 4,
        },
        {
          title: "악5",
          category: "5",
          like: 5,
          view: 5,
        },
      ],
    };
  }

  render() {
    const mapToComponent = (data) => {
      return data.map((post, i) => {
        return <NormalPostInfo post={post} key={i} />;
      });
    };
    return <div>{mapToComponent(this.state.postData)}</div>;
  }
}

export default () => {
  return (
    <Wrapper>
      <SearchWrapper>
        <SearchButton>
          <SearchIcon></SearchIcon>
        </SearchButton>
        <SearchInput placeholder="관심있는 내용을 검색해주세요" required="true" type="text" />
      </SearchWrapper>
      <PostZzalDivider>
        <PostWrapper>
          <TopPost>
            <TitleBar>
              <Title>👑 오늘 이 글 잘나가네</Title>
              <MoreView>더보기 &gt;</MoreView>
            </TitleBar>
            <hr></hr>
            <TopPostList></TopPostList>
          </TopPost>
          &nbsp;
          <NormalPostWrapper>
            <NormalPost>
              <TitleBar>
                <Title>🐶 자유롭게멍멍</Title>
                <NormalMoreView>더보기 &gt;</NormalMoreView>
              </TitleBar>
              <hr></hr>
              <NormalPostList></NormalPostList>
            </NormalPost>
            <NormalPost>
              <TitleBar>
                <Title> 🏎 애마자랑</Title>
                <NormalMoreView>더보기 &gt;</NormalMoreView>
              </TitleBar>

              <hr></hr>
              <NormalPostList></NormalPostList>
            </NormalPost>
            <NormalPost>
              <TitleBar>
                <Title>🔫 나때는군대</Title>
                <NormalMoreView>더보기 &gt;</NormalMoreView>
              </TitleBar>
              <hr></hr>
              <NormalPostList></NormalPostList>
            </NormalPost>
            <NormalPost>
              <TitleBar>
                <Title>📈 주식투자</Title>
                <NormalMoreView>더보기 &gt;</NormalMoreView>
              </TitleBar>

              <hr></hr>
              <NormalPostList></NormalPostList>
            </NormalPost>
            <NormalPost>
              <TitleBar>
                <Title>🚘 시승후기</Title>
                <NormalMoreView>더보기 &gt;</NormalMoreView>
              </TitleBar>

              <hr></hr>
              <NormalPostList></NormalPostList>
            </NormalPost>
            <NormalPost>
              <TitleBar>
                <Title>✈️ 여행먹방</Title>
                <NormalMoreView>더보기 &gt;</NormalMoreView>
              </TitleBar>
              <hr></hr>
              <NormalPostList></NormalPostList>
            </NormalPost>
            <NormalPost>
              <TitleBar>
                <Title>💼 보험후기</Title>
                <NormalMoreView>더보기 &gt;</NormalMoreView>
              </TitleBar>
              <hr></hr>
              <NormalPostList></NormalPostList>
            </NormalPost>
            <NormalPost>
              <TitleBar>
                <Title>🚓️ 사고후기</Title>
                <NormalMoreView>더보기 &gt;</NormalMoreView>
              </TitleBar>
              <hr></hr>
              <NormalPostList></NormalPostList>
            </NormalPost>
            <NormalPost>
              <TitleBar>
                <Title>🏻‍ 결혼이야기</Title>
                <NormalMoreView>더보기 &gt;</NormalMoreView>
              </TitleBar>
              <hr></hr>
              <NormalPostList></NormalPostList>
            </NormalPost>
            <NormalPost>
              <TitleBar>
                <Title>🚗 차Q&A</Title>
                <NormalMoreView>더보기 &gt;</NormalMoreView>
              </TitleBar>
              <hr></hr>
              <NormalPostList></NormalPostList>
            </NormalPost>
          </NormalPostWrapper>
        </PostWrapper>
        <ZzalWrapper>
          <Title>오늘 짤방 TOP</Title>
        </ZzalWrapper>
      </PostZzalDivider>
      <SideWrapper></SideWrapper>
    </Wrapper>
  );
};
