import React from "react";
import styled from "styled-components";
import Input from "../Components/Input";
import { Link } from "react-router-dom";
import { SearchIcon, Ddabong, View } from "./../Components/Icons";
import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client";
import { withRouter } from "react-router-dom";

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

const list = [
  { emoji: "🐶 ", name: "자유롭게멍멍" },
  { emoji: "🏎 ", name: "애마자랑" },
  { emoji: "🔫 ", name: "나때는군대" },
  { emoji: "📈 ", name: "주식투자" },
  { emoji: "🚘 ", name: "시승후기" },
  { emoji: "✈️ ", name: "여행먹방" },
  { emoji: "💼 ", name: "보험후기" },
  { emoji: "🚓️ ", name: "사고후기" },
  { emoji: "👰🏻 ‍", name: "결혼이야기" },
  { emoji: "🚗 ", name: "차Q&A" },
];

function HomeTop() {
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
  const { data, loading, error } = useQuery(HOMETOP_QUERY, {
    notifyOnNetworkStatusChange: true,
  });
  return (
    <div>
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
    </div>
  );
}
const goBoard = (history, category) => {
  history.push({
    pathname: "/Board",
    state: { category: category, refetch: true },
  });
};

function HomeNormal({ history }) {
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
  const { data, loading, error } = useQuery(HOMENORMAL_QUERY, {
    notifyOnNetworkStatusChange: true,
  });

  return (
    <NormalPostWrapper>
      {loading ? (
        <div>Loading...</div>
      ) : (
        list.map((item, idx) => (
          <NormalPost key={idx}>
            <TitleBar>
              <Title>
                {item.emoji}
                {item.name}
              </Title>
              <NormalMoreView
                onClick={() => goBoard(history, item.emoji + item.name)}
              >
                더보기 &gt;
              </NormalMoreView>
            </TitleBar>
            {data.homeNormal.map((item1, idx1) => {
              return item.name === item1.category ? (
                <NormalTextBox key={idx1}>
                  <StyledLink to="/:catecory/:id">{item1.title}</StyledLink>
                  <LikeView>
                    <Ddabong></Ddabong> <LikeView>{item1.likeAll}</LikeView>
                  </LikeView>
                  &nbsp;
                  <LikeView>
                    <View></View> <LikeView>{item1.viewAll}</LikeView>
                  </LikeView>
                </NormalTextBox>
              ) : null;
            })}
          </NormalPost>
        ))
      )}
    </NormalPostWrapper>
  );
}

function HomeZzal() {
  const HOMEZZAL_QUERY = gql`
    query homeZzal {
      homeZzal {
        id
        title
        thumbnail
        viewAll
      }
    }
  `;
  const { data, loading, error } = useQuery(HOMEZZAL_QUERY, {
    notifyOnNetworkStatusChange: true,
  });
  return loading ? (
    <div>Loading...</div>
  ) : (
    data.homeZzal.map((item, idx) => (
      <ZzalBox key={idx}>
        <Zzal src={item.thumbnail}></Zzal>
        <ZzalTitle to="/">{item.title}</ZzalTitle>
        <ZzalView>
          <View></View> {item.viewAll}
        </ZzalView>
      </ZzalBox>
    ))
  );
}

const Home = ({ history }) => {
  return (
    <Wrapper>
      <SearchWrapper>
        <SearchButton>
          <SearchIcon></SearchIcon>
        </SearchButton>
        <SearchInput
          placeholder="관심있는 내용을 검색해주세요"
          required="true"
          type="text"
        />
      </SearchWrapper>
      <PostZzalDivider>
        <PostWrapper>
          <TopPost>
            <TitleBar>
              <Title>👑 오늘 이 글 잘나가네</Title>
              <MoreView
                onClick={() => goBoard(history, "👑 오늘 이 글 잘나가네")}
              >
                더보기 &gt;
              </MoreView>
            </TitleBar>
            <HomeTop></HomeTop>
          </TopPost>
          &nbsp;
          <HomeNormal history={history}></HomeNormal>
        </PostWrapper>
        <ZzalWrapper>
          <Title>오늘 짤방 TOP</Title>
          <HomeZzal></HomeZzal>
        </ZzalWrapper>
      </PostZzalDivider>
      <SideWrapper></SideWrapper>
    </Wrapper>
  );
};

export default withRouter(Home);
