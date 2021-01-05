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
  height: 70px;
  text-align: left;
  padding-left:10px
  border-radius: 50px;
  width: 90%;
  &::placeholder {
    color:black
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
  border-bottom: 1px solid #cecece;
  padding: 10px;
  margin: 0 0 2% 0;
`;

const Title = styled.span`
  font-size: 24px;
  font-weight: bold;
`;

const MoreView = styled.button`
  font-size: 15px;
  text-align: right;
  background-color: transparent;
  border-color: transparent;
  cursor: pointer;
  outline: 0;
`;

const NormalMoreView = styled.button`
  font-size: 15px;
  text-align: right;
  background-color: transparent;
  border-color: transparent;
  cursor: pointer;
  outline: 0;
`;

const TopPost = styled.div`
  width: 100%;
  padding: 3%;
`;

const NormalPost = styled.div`
  width: 50%;
  height: 15%;
  padding: 3%;
  flex: 1 1 40%;
`;

const NormalPostWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const TopStyledLink = styled(Link)`
  text-decoration: none;
  color: black;
  font-size: 18px;
  width: 75%;
  height: 18px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-family: Roboto;
  &:focus,
  &:hover,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
    color: black;
    font-size: 18px;
    width: 75%;
    height: 18px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    font-family: Roboto;
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: black;
  font-size: 18px;
  width: 55%;
  height: 18px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-family: Roboto;
  &:focus,
  &:hover,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
    color: black;
    font-size: 18px;
    width: 55%;
    height: 18px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    font-family: Roboto;
  }
`;

const TopTextBox = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 18px;
  margin: 2% auto 2% auto;
`;

const NormalTextBox = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 18px;
  margin: 4% 0 4% 0;
`;

const CategoryBox = styled(Link)`
  text-decoration: none;
  font-size: 13px;
  color: #818181;
  border: 1px solid #cecece;
  margin: 0 3% 0 0;
  padding: 1%;
  height: 25px;
  width: 10%;
  &:focus,
  &:hover,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
    font-size: 13px;
    color: #818181;
    border: 1px solid #cecece;
    margin: 0 3% 0 0;
    padding: 1%;
    height: 25px;
    width: auto;
  }
`;

const CategoryTitleWrapper = styled.div`
  display: flex;
  width: 80%;
  height: 100%;
`;

const TopLikeView = styled.span`
  min-width: 10%;
  color: #818181;
`;

const LikeView = styled.span`
  min-width: 20%;
  color: #818181;
`;

class TopPostInfo extends React.Component {
  render() {
    return (
      <TopTextBox>
        <CategoryTitleWrapper>
          <CategoryBox to="/:catecory">{this.props.post.category}</CategoryBox>
          <TopStyledLink to="/:catecory/:id">{this.props.post.title}</TopStyledLink>
        </CategoryTitleWrapper>
        <TopLikeView>
          <Ddabong></Ddabong> <TopLikeView>{this.props.post.like}</TopLikeView>
        </TopLikeView>
        &nbsp;
        <TopLikeView>
          <View></View> <TopLikeView>{this.props.post.view}</TopLikeView>
        </TopLikeView>
      </TopTextBox>
    );
  }
}

class TopPostList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      postData: [
        {
          title: "술 한잔 마셨습니다...",
          category: "자유롭게멍멍",
          like: 6342,
          view: 46342,
        },
        {
          title: "내일 DMC파인시티 계약금 내러 갈 생각에 신나네요",
          category: "애마자랑",
          like: 6342,
          view: 46342,
        },
        {
          title: "진학사 채용해요~",
          category: "주식투자",
          like: 6342,
          view: 46342,
        },
        {
          title: "엔드르 영차",
          category: "나때는군대",
          like: 6342,
          view: 46342,
        },
        {
          title: "차 공부중이야 벤츠 BMW 볼보 제네시스 구경했어",
          category: "시승후기",
          like: 6342,
          view: 46342,
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
      <NormalTextBox>
        <StyledLink to="/:catecory/:id">{this.props.post.title}</StyledLink>
        <LikeView>
          <Ddabong></Ddabong> <LikeView>{this.props.post.like}</LikeView>
        </LikeView>
        &nbsp;
        <LikeView>
          <View></View> <LikeView>{this.props.post.view}</LikeView>
        </LikeView>
      </NormalTextBox>
    );
  }
}

class NormalPostList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      postData: [
        {
          title: "여친이 나 몰래 필러맞고 숨기는...",
          category: "1",
          like: 16342,
          view: 46342,
        },
        {
          title: "소유욕으로 주식하는 새끼 없제?..",
          category: "2",
          like: 6342,
          view: 46342,
        },
        {
          title: "이제 34살의 고민은? 탈모?",
          category: "3",
          like: 6342,
          view: 46342,
        },
        {
          title: "대외적인 회계사 이미지는 꽝임",
          category: "4",
          like: 6342,
          view: 46342,
        },
        {
          title: "이 경우 손해배상 가능한가요??",
          category: "5",
          like: 6342,
          view: 46342,
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
            <TopPostList></TopPostList>
          </TopPost>
          &nbsp;
          <NormalPostWrapper>
            <NormalPost>
              <TitleBar>
                <Title>🐶 자유롭게멍멍</Title>
                <NormalMoreView>더보기 &gt;</NormalMoreView>
              </TitleBar>

              <NormalPostList></NormalPostList>
            </NormalPost>
            <NormalPost>
              <TitleBar>
                <Title> 🏎 애마자랑</Title>
                <NormalMoreView>더보기 &gt;</NormalMoreView>
              </TitleBar>

              <NormalPostList></NormalPostList>
            </NormalPost>
            <NormalPost>
              <TitleBar>
                <Title>🔫 나때는군대</Title>
                <NormalMoreView>더보기 &gt;</NormalMoreView>
              </TitleBar>

              <NormalPostList></NormalPostList>
            </NormalPost>
            <NormalPost>
              <TitleBar>
                <Title>📈 주식투자</Title>
                <NormalMoreView>더보기 &gt;</NormalMoreView>
              </TitleBar>

              <NormalPostList></NormalPostList>
            </NormalPost>
            <NormalPost>
              <TitleBar>
                <Title>🚘 시승후기</Title>
                <NormalMoreView>더보기 &gt;</NormalMoreView>
              </TitleBar>

              <NormalPostList></NormalPostList>
            </NormalPost>
            <NormalPost>
              <TitleBar>
                <Title>✈️ 여행먹방</Title>
                <NormalMoreView>더보기 &gt;</NormalMoreView>
              </TitleBar>

              <NormalPostList></NormalPostList>
            </NormalPost>
            <NormalPost>
              <TitleBar>
                <Title>💼 보험후기</Title>
                <NormalMoreView>더보기 &gt;</NormalMoreView>
              </TitleBar>

              <NormalPostList></NormalPostList>
            </NormalPost>
            <NormalPost>
              <TitleBar>
                <Title>🚓️ 사고후기</Title>
                <NormalMoreView>더보기 &gt;</NormalMoreView>
              </TitleBar>

              <NormalPostList></NormalPostList>
            </NormalPost>
            <NormalPost>
              <TitleBar>
                <Title>🏻‍ 결혼이야기</Title>
                <NormalMoreView>더보기 &gt;</NormalMoreView>
              </TitleBar>

              <NormalPostList></NormalPostList>
            </NormalPost>
            <NormalPost>
              <TitleBar>
                <Title>🚗 차Q&A</Title>
                <NormalMoreView>더보기 &gt;</NormalMoreView>
              </TitleBar>

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
