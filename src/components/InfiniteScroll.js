import React, { Component } from "react";
import Loader from "./Loader";
import styled from "styled-components";
import { CommentsIcon, LikesIcon, ViewsIcon } from "./Icons";

const Wrapper = styled.div`
  margin-top: 35px;
  display: flex;
  flex-direction: column;
  font-family: Roboto;
  justify-content: space-around;
`;

const Title = styled.span`
  font-size: 24px;
  font-weight: bold;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const Content = styled.span`
  margin-top: 25px;
  margin-bottom: 25px;
  font-size: 20px;
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
  font-family: Roboto;
`;

const InfoGrey1 = styled.span`
  color: #8c8c8c;
  font-size: 15px;
  display: flex;
  align-items: center;
`;

const InfoBlack = styled.span`
  margin-left: 20px;
  font-size: 15px;
  display: flex;
  align-items: center;
`;

const InfoGrey2 = styled.span`
  margin-left: 7px;
  margin-right: 10px;
  color: #8c8c8c;
  font-size: 15px;
  display: flex;
  align-items: center;
`;

const Divider = styled.div`
  margin-top:35px;
  background: #8c8c8c;
  width:100%
  height:1px
  border-radius:10px
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
    const myData =
      this.props.data.postMany !== undefined
        ? this.props.data.postMany.posts
        : [];

    return (
      <ul>
        {myData.map((item, idx) => (
          <li key={idx}>
            <Wrapper>
              <Title>{item.title}</Title>
              <Content>{item.content}</Content>
              <InfoWrapper>
                <InfoInWrapper>
                  <InfoGrey1>{item.timeFromToday}</InfoGrey1>
                  <InfoBlack>{item.author}</InfoBlack>
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
            </Wrapper>
          </li>
        ))}
        {this.props.loading && <Loader />}
      </ul>
    );
  }
}

export default InfiniteScroll;
