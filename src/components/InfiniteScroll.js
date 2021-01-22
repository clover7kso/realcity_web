import React, { Component } from "react";
import Loader from "./Loader";
import styled from "styled-components";
import { CommentsIcon, LikesIcon, ViewsIcon } from "./Icons";
import { Link } from "react-router-dom";
import { CategoryListTypeA } from "../Components/Util";
import PullToRefresh from "react-simple-pull-to-refresh";
import { RefreshIcon } from "../Components/Icons";
import { PC } from "../Components/MediaQuery";
import { getLevel } from "./Util";

const Wrapper = styled.ul`
  margin-top: 15px;
`;

const WrapperItem = styled.div`
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  font-family: Roboto;
`;

const Title = styled(Link)`
  user-drag: none;
  color: black;
  font-size: 18px;
  font-weight: bold;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const MainWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;
const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding-right: 10px;
`;

const Content = styled(Link)`
  user-drag: none;
  color: black;
  margin-top: 10px;
  margin-bottom: 10px;
  font-size: 16px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2; /* 라인수 */
  -webkit-box-orient: vertical;
  word-wrap: break-word;
  line-height: 1.2em;
  height: 2.4em;
`;

const InfoWrapper = styled.div`
  display: flex;
  flex-direction: row;
  font-family: Roboto;
  justify-content: space-between;
`;

const InfoInWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

const InfoGrey1 = styled.span`
  color: #8c8c8c;
  font-size: 13px;
  display: flex;
  align-items: center;
`;

const InfoGrey2 = styled.span`
  color: #8c8c8c;
  margin-left: 10px;
  margin-right: 15px;
  padding-top: 2px;
  font-size: 13px;
  display: flex;
  align-items: center;
`;

const InfoBlack = styled.span`
  margin-left: 10px;
  font-size: 13px;
  display: flex;
  align-items: center;
`;

const InfoGrey3 = styled.span`
  margin-left: 7px;
  margin-right: 10px;
  color: #8c8c8c;
  font-size: 13px;
  display: flex;
  align-items: center;
`;

const Divider = styled.div`
  margin-top:10px;
  background: #cecece;
  height:1px
  border-radius:10px
`;

const NoDataWrapper = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: black;
  font-size: 24px;
  font-weight: bold;
`;

const Thumbnail = styled.img`
  object-fit: cover;
  width:90px
  height:90px
  border-radius:10px
  margin-bottom:15px
  margin-right:15px
`;

const CategoryBox = styled.div`
  width: fit-content;
  font-size: 13px;
  color: black;
  text-align: center;
  margin-right: 7px;
`;

const ClickToRefreshWrapper = styled.div`
  user-drag: none;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
`;

const ClickToRefresh = styled.button`
  background: white;
  margin-right:5px
  border: 0px;
  font-size: 15px;
  color: black;
  text-align: center;
  outline: 0;
  cursor: pointer;
`;

class InfiniteScroll extends Component {
  componentDidMount() {
    window.addEventListener("scroll", this.handleOnScroll);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleOnScroll);
  }

  handleOnScroll = () => {
    // http://stackoverflow.com/questions/9439725/javascript-how-to-detect-if-browser-window-is-scrolled-to-bottom
    var scrollTop =
      (document.documentElement && document.documentElement.scrollTop) ||
      document.body.scrollTop;
    var scrollHeight =
      (document.documentElement && document.documentElement.scrollHeight) ||
      document.body.scrollHeight;
    var clientHeight =
      document.documentElement.clientHeight || window.innerHeight;
    var scrolledToBottom = Math.ceil(scrollTop + clientHeight) >= scrollHeight;
    if (scrolledToBottom) {
      this.props.onLoadMore();
    }
  };

  render() {
    if (!this.props.data && this.props.loading) return <Loader />;
    const myData = this.props.data !== undefined ? this.props.data : [];

    return myData.length !== 0 ? (
      <PullToRefresh onRefresh={() => this.props.onRefresh()}>
        <Wrapper>
          <ClickToRefreshWrapper>
            <ClickToRefresh onClick={() => this.props.onRefresh()}>
              클릭 또는 당겨서 새로고침
            </ClickToRefresh>
            <RefreshIcon />
          </ClickToRefreshWrapper>

          {myData.map((item, idx) => (
            <li key={idx}>
              <WrapperItem>
                <MainWrapper>
                  {item.thumbnail ? <Thumbnail src={item.thumbnail} /> : null}
                  <TextWrapper>
                    <Title to={"/Post?" + item.id}>{item.title}</Title>
                    <Content to={"/Post?" + item.id}>
                      {item.content.replace(/(<([^>]+)>)/gi, "")}
                    </Content>
                  </TextWrapper>
                </MainWrapper>
                <InfoWrapper>
                  <InfoInWrapper>
                    {this.props.selected === "👑 오늘인기글" ? (
                      <CategoryBox
                        to={
                          "/Board?" +
                          CategoryListTypeA.find(
                            (x) => x.name === item.category
                          ).emoji +
                          CategoryListTypeA.find(
                            (x) => x.name === item.category
                          ).name
                        }
                      >
                        {item.category}
                      </CategoryBox>
                    ) : null}
                    <InfoGrey1>{item.timeFromToday}</InfoGrey1>

                    <InfoBlack>
                      {item.user === null
                        ? item.author
                        : " Lv." +
                          getLevel(item.user.point) +
                          "  " +
                          item.user.nickname}
                    </InfoBlack>
                    {item.user === null ? (
                      <PC>
                        <InfoGrey3>{item.ip}</InfoGrey3>
                      </PC>
                    ) : null}
                  </InfoInWrapper>
                  <InfoInWrapper>
                    <CommentsIcon />
                    <InfoGrey2>
                      {item.commentCount.toLocaleString(undefined, {
                        maximumFractionDigits: 0,
                      })}
                    </InfoGrey2>
                    <LikesIcon />
                    <InfoGrey2>
                      {item.likeAll.toLocaleString(undefined, {
                        maximumFractionDigits: 0,
                      })}
                    </InfoGrey2>
                    <ViewsIcon />
                    <InfoGrey2>
                      {item.viewAll.toLocaleString(undefined, {
                        maximumFractionDigits: 0,
                      })}
                    </InfoGrey2>
                  </InfoInWrapper>
                </InfoWrapper>
                {myData.length - 1 !== idx ? <Divider /> : null}
              </WrapperItem>
            </li>
          ))}
          {this.props.loading && <Loader />}
        </Wrapper>
      </PullToRefresh>
    ) : (
      <NoDataWrapper>
        아직쓰여진 글이 없어요!! 여러분들의 글로 채워주세요!!
      </NoDataWrapper>
    );
  }
}

export default InfiniteScroll;
