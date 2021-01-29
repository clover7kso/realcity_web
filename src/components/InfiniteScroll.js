import React, { Component } from "react";
import Loader from "./Loader";
import styled from "styled-components";
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
  font-size: 15px;
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
  flex: 1;
`;

const InfoWrapper = styled.div`
  display: flex;
  flex-direction: row;
  font-family: Roboto;
  justify-content: space-between;
`;

const InfoInWrapper = styled.div`
  margin-top: 15px;
  display: flex;
  flex-direction: row;
`;

const InfoGrey1 = styled.span`
  color: #8c8c8c;
  font-size: 11px;
  display: flex;
  align-items: center;
`;

const InfoGrey2 = styled.span`
  color: #8c8c8c;
  margin-left: 5px;
  margin-right: 15px;
  font-size: 11px;
  display: flex;
  align-items: center;
`;

const InfoGrey4 = styled.span`
  color: #8c8c8c;
  margin-left: 5px;
  font-size: 11px;
  display: flex;
  align-items: center;
`;

const InfoBlack = styled.span`
  margin-left: 10px;
  font-size: 11px;
  display: flex;
  align-items: center;
`;

const InfoGrey3 = styled.span`
  margin-left: 7px;
  margin-right: 10px;
  color: #8c8c8c;
  font-size: 11px;
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
  width:45px
  height:45px
  border-radius:10px
  margin-right:15px
`;

const CategoryBox = styled.div`
  font-size: 11px;
  display: flex;
  align-items: center;
  margin-right: 7px;
`;

const RefreshWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  whith: 100%;
`;
const ClickToRefreshWrapper = styled.button`
  user-drag: none;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  outline: 0;
  border: 0px;
  background: white;
  cursor: pointer;
`;

const ClickToRefresh = styled.div`
  margin-right:5px
  font-size: 15px;
  color: black;
  text-align: center;
`;

const InfoIcon = styled.img`
  object-fit: cover;
  width:13px
  height:13px
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
    const myData = this.props.data !== null ? this.props.data : [];

    return myData.length !== 0 ? (
      <PullToRefresh onRefresh={() => this.props.onRefresh()}>
        <Wrapper>
          <RefreshWrapper>
            <ClickToRefreshWrapper onClick={() => this.props.onRefresh()}>
              <ClickToRefresh>클릭 또는 당겨서 새로고침</ClickToRefresh>
              <RefreshIcon />
            </ClickToRefreshWrapper>
          </RefreshWrapper>
          {myData.map((item, idx) => (
            <li key={idx}>
              <WrapperItem>
                <MainWrapper>
                  <Thumbnail
                    src={
                      item.thumbnail
                        ? item.thumbnail
                        : require("../Image/thumnail_null.png")
                    }
                  />
                  <TextWrapper>
                    <Title to={"/Post?" + item.id}>{item.title}</Title>
                    <InfoWrapper>
                      <InfoInWrapper>
                        {this.props.selected === "👑 실시간 인기글" ? (
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
                        <InfoIcon src={require("../Image/info_like.png")} />
                        <InfoGrey2>
                          {item.likeAll.toLocaleString(undefined, {
                            maximumFractionDigits: 0,
                          })}
                        </InfoGrey2>
                        <InfoIcon src={require("../Image/info_comment.png")} />
                        <InfoGrey2>
                          {item.commentCount.toLocaleString(undefined, {
                            maximumFractionDigits: 0,
                          })}
                        </InfoGrey2>
                        <InfoIcon src={require("../Image/info_view.png")} />
                        <InfoGrey4>
                          {item.viewAll.toLocaleString(undefined, {
                            maximumFractionDigits: 0,
                          })}
                        </InfoGrey4>
                      </InfoInWrapper>
                    </InfoWrapper>
                  </TextWrapper>
                </MainWrapper>

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
