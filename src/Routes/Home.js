import { syntaxError } from "graphql/error";
import React from "react";
import styled from "styled-components";
import Button from "../Components/Button";
import Input from "../Components/Input";
import { Link, withRouter } from "react-router-dom";
import { SearchIcon } from "./../Components/Icons";
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
  margin: auto auto auto 50%;
`;

const NormalMoreView = styled.button`
  font-size: 18px;
  font-weight: bold;
  text-align: right;
  background-color: transparent;
  border-color: transparent;
  cursor: pointer;
  margin: auto auto auto 15%;
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

class PostInfo extends React.Component {
  render() {
    return (
      <div>
        <span>Title : {this.props.post.title}</span>
        <span>catecory : {this.props.post.catecory}</span>
        <span>like : {this.props.post.like}</span>
        <span>view : {this.props.post.view}</span>
        <br />
        <br />
      </div>
    );
  }
}

class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      postData: [
        {
          title: "악1",
          catecory: "1",
          like: 1,
          view: 1,
        },
        {
          title: "악2",
          catecory: "2",
          like: 2,
          view: 2,
        },
        {
          title: "악3",
          catecory: "3",
          like: 3,
          view: 3,
        },
        {
          title: "악4",
          catecory: "4",
          like: 4,
          view: 4,
        },
        {
          title: "악5",
          catecory: "5",
          like: 5,
          view: 5,
        },
      ],
    };
  }
  render() {
    const mapToComponent = (data) => {
      return data.map((post, i) => {
        return <PostInfo post={post} key={i} />;
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
            <Title>👑 오늘 이 글 잘나가네</Title>
            <MoreView>더보기 &gt;</MoreView>
            <hr></hr>
            <List></List>
          </TopPost>
          <NormalPostWrapper>
            <NormalPost>
              <Title>🐶 자유롭게멍멍</Title>
              <NormalMoreView>더보기 &gt;</NormalMoreView>
              <hr></hr>
              <List></List>
            </NormalPost>
            <NormalPost>
              <Title> 🏎 애마자랑</Title>
              <NormalMoreView>더보기 &gt;</NormalMoreView>
              <hr></hr>
              <List></List>
            </NormalPost>
            <NormalPost>
              <Title>🔫 나때는군대</Title>
              <NormalMoreView>더보기 &gt;</NormalMoreView>
              <hr></hr>
              <List></List>
            </NormalPost>
            <NormalPost>
              <Title>📈 주식투자</Title>
              <NormalMoreView>더보기 &gt;</NormalMoreView>
              <hr></hr>
              <List></List>
            </NormalPost>
            <NormalPost>
              <Title>🚘 시승후기</Title>
              <NormalMoreView>더보기 &gt;</NormalMoreView>
              <hr></hr>
              <List></List>
            </NormalPost>
            <NormalPost>
              <Title>✈️ 여행먹방</Title>
              <NormalMoreView>더보기 &gt;</NormalMoreView>
              <hr></hr>
              <List></List>
            </NormalPost>
            <NormalPost>
              <Title>💼 보험후기</Title>
              <NormalMoreView>더보기 &gt;</NormalMoreView>
              <hr></hr>
              <List></List>
            </NormalPost>
            <NormalPost>
              <Title>🚓️ 사고후기</Title>
              <NormalMoreView>더보기 &gt;</NormalMoreView>
              <hr></hr>
              <List></List>
            </NormalPost>
            <NormalPost>
              <Title>🏻‍ 결혼이야기</Title>
              <NormalMoreView>더보기 &gt;</NormalMoreView>
              <hr></hr>
              <List></List>
            </NormalPost>
            <NormalPost>
              <Title>🚗 차Q&A</Title>
              <NormalMoreView>더보기 &gt;</NormalMoreView>
              <hr></hr>
              <List></List>
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
