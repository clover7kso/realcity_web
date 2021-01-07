import React from "react";
import styled from "styled-components";
import Input from "../Components/Input";
import { Link } from "react-router-dom";
import { SearchIcon, Ddabong, View } from "./../Components/Icons";
import { gql } from "apollo-boost";
import { useQuery } from "react-apollo-hooks";

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
  min-height: 100%;
  padding: 5% 5% 0% 0%;
`;

const ZzalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 20%;
  height: 100%;
  min-height: 100%;
  padding: 8% 0 0 0;
`;

const TitleBar = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #cecece;
  padding: 10px 0 10px 10px;
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
  min-height: 15%;
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

const ZzalBox = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 20%;
`;

const Zzal = styled.img`
  border-radius: 50px;
  padding: 10% 0 10% 0;
`;

const ZzalTitle = styled(Link)`
  min-width: 100%;
  font-size: 18px;
  color: black;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  padding: 0 0 5% 0;
`;

const ZzalView = styled.span`
  min-width: 100%;
  font-size: 13px;
  color: #818181;
  text-align: right;
`;

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

class ZzalInfo extends React.Component {
  render() {
    return (
      <ZzalBox>
        <Zzal src={this.props.post.zzal}></Zzal>
        <ZzalTitle to="/">{this.props.post.title}</ZzalTitle>
        <ZzalView>
          <View></View> {this.props.post.view}
        </ZzalView>
      </ZzalBox>
    );
  }
}

class ZzalList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ZzalData: [
        {
          zzal: "https://placeimg.com/187/187/any",
          title: "엄마한테 등짝 맞기.jpg",
          view: 46342,
        },
        {
          zzal: "https://placeimg.com/187/187/any",
          title: "거북이의 자연은 아름답다",
          view: 46342,
        },
        {
          zzal: "https://placeimg.com/187/187/any",
          title: "지랄궁상떠는 그지 사진임",
          view: 46342,
        },
        {
          zzal: "https://placeimg.com/187/187/any",
          title: "오늘자 손흥민 실시간",
          view: 46342,
        },
        {
          zzal: "https://placeimg.com/187/187/any",
          title: "분노한 개구리 짤",
          view: 46342,
        },
      ],
    };
    this.state.ZzalData.sort(function (a, b) {
      return a.view > b.view ? -1 : a.view < b.view ? 1 : 0;
    }); //조회수순 정렬
  }
  render() {
    const mapToComponent = (data) => {
      return data.map((post, i) => {
        return <ZzalInfo post={post} key={i} />;
      });
    };
    return <div>{mapToComponent(this.state.ZzalData)}</div>;
  }
}

const HOMETOP_QUERY = gql`
  query homeTop {
    homeTop {
      id
      category
      title
      likeAll
      viewAll
    }
  }
`;

const HOMENORMAL_QUERY = gql`
  query homeNormal {
    homeNormal {
      id
      category
      title
      likeAll
      viewAll
    }
  }
`;

const list = [
  { name: "🐶 자유롭게멍멍" },
  { name: "🏎 애마자랑" },
  { name: "🔫 나때는군대" },
  { name: "📈 주식투자" },
  { name: "🚘 시승후기" },
  { name: "✈️ 여행먹방" },
  { name: "💼 보험후기" },
  { name: "🚓️ 사고후기" },
  { name: "👰🏻‍♀️ 결혼이야기" },
  { name: "🚗 차Q&A" },
];

export default () => {
  const { data, loading, error } = useQuery(HOMETOP_QUERY, {
    notifyOnNetworkStatusChange: true,
  });

  // const { data, loading, error } = useQuery(HOMENORMAL_QUERY, {
  //   notifyOnNetworkStatusChange: true,
  // });

  // const postShow = () => {
  //   list.map(item, idx);
  //   {
  //     <NormalPost key={idx}>
  //       <TitleBar>
  //         <Title>{list.name}</Title>
  //         <NormalMoreView>더보기 &gt;</NormalMoreView>
  //       </TitleBar>
  //       <NormalTextBox>
  //         <StyledLink to="/:catecory/:id">{this.props.post.title}</StyledLink>
  //         <LikeView>
  //           <Ddabong></Ddabong> <LikeView>{this.props.post.like}</LikeView>
  //         </LikeView>
  //         &nbsp;
  //         <LikeView>
  //           <View></View> <LikeView>{this.props.post.view}</LikeView>
  //         </LikeView>
  //       </NormalTextBox>
  //     </NormalPost>;
  //   }
  // };

  console.log(data.homeTop);
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
            {loading ? (
              <div>Loading...</div>
            ) : (
              data.homeTop.map((item, idx) => (
                <TopTextBox key={idx}>
                  <CategoryTitleWrapper>
                    <CategoryBox to="/:catecory">{item.category}</CategoryBox>
                    <TopStyledLink to="/:catecory/:id">{item.title}</TopStyledLink>
                  </CategoryTitleWrapper>
                  <TopLikeView>
                    <Ddabong></Ddabong> <TopLikeView>{item.likeAll}</TopLikeView>
                  </TopLikeView>
                  &nbsp;
                  <TopLikeView>
                    <View></View> <TopLikeView>{item.viewAll}</TopLikeView>
                  </TopLikeView>
                </TopTextBox>
              ))
            )}
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
          <ZzalList></ZzalList>
        </ZzalWrapper>
      </PostZzalDivider>
      <SideWrapper></SideWrapper>
    </Wrapper>
  );
};
