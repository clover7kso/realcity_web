import React, { Component } from "react";
import Loader from "./Loader";
import styled from "styled-components";
import { CommentsIcon, LikesIcon, ViewsIcon } from "./Icons";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  font-family: Roboto;
`;

const Title = styled.span`
  font-size: 24px;
  font-weight: bold;
`;

const Content = styled.span`
  font-size: 20px;
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

const InfoGrey = styled.span`
  color: #8c8c8c;
  font-size: 15px;
  display: flex;
  align-items: center;
`;

const InfoBlack = styled.span`
  font-size: 15px;
  display: flex;
  align-items: center;
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
    console.log(myData);

    return (
      <ul>
        {myData.map((item, idx) => (
          <li key={idx}>
            <Wrapper>
              <Title>{item.title}</Title>
              <Content>{item.content}</Content>
              <InfoWrapper>
                <InfoInWrapper>
                  <InfoGrey>{item.timeFromToday}</InfoGrey>
                  <InfoBlack>{item.author}</InfoBlack>
                </InfoInWrapper>
                <InfoInWrapper>
                  <CommentsIcon />
                  <InfoGrey>{item.commentCount}</InfoGrey>
                  <LikesIcon />
                  <InfoGrey>{item.likeAll}</InfoGrey>
                  <ViewsIcon />
                  <InfoGrey>{item.viewAll}</InfoGrey>
                </InfoInWrapper>
              </InfoWrapper>
            </Wrapper>
          </li>
        ))}
        {this.props.loading && <Loader />}
      </ul>
    );
  }
}

export default InfiniteScroll;
