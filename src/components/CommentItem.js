import React, { Component } from "react";
import styled from "styled-components";
import CommentThreeDot from "./CommentThreeDot"
import ReplyForm from "./ReplyForm"

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const MenuWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Time = styled.div`
  color: #8c8c8c;
  font-size: 14px;
`;

const TimeAuthorWrapper = styled.div`
  display: flex;
  padding: 20px 0 0 0;
`;

const FirstComment = styled.div`
  font-size: 15px;
`;

const CommentThreeDotWrapper = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  padding: 5px 10px 20px 0;
`;

const ReplyPadding = styled.div`
  padding: 0 0 0 20px;
  border-radius: 14px;
  background-color: #f8f8f8;
`;

class CommentItem extends Component {
  constructor() {
    super();
    this.state = {
      showMenu: false,
    };
    this.showMenu = this.showMenu.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
  }

  showMenu(event) {
    event.preventDefault();
    this.setState({ showMenu: true }, () => {
      document.addEventListener("click", this.closeMenu);
    });
  }

  closeMenu(event) {
    if (this.dropdownMenu && !this.dropdownMenu.contains(event.target)) {
      this.setState({ showMenu: false }, () => {
        document.removeEventListener("click", this.closeMenu);
      });
    }
  }

  render() {
    return (
      <Wrapper>
        <TimeAuthorWrapper>
          <Time>{this.props.item.timeFromToday}</Time>&nbsp;
          <div>{this.props.item.ip}</div>&nbsp;&nbsp;
          <div>{this.props.item.author}</div>
        </TimeAuthorWrapper>
        <CommentThreeDotWrapper>
          <FirstComment onClick={this.showMenu}>{this.props.item.content}</FirstComment>
          <CommentThreeDot/>
        </CommentThreeDotWrapper>
        {this.props.data.postOne.comments.map((item1, idx1) => {
          if (this.props.item.id === item1.group) {
            return (
              <div>
                <ReplyPadding key={idx1}>
                  <TimeAuthorWrapper>
                    <Time>{item1.timeFromToday}</Time>&nbsp;
                    <div>{item1.ip}</div>&nbsp;&nbsp;
                    <div>{item1.author}</div>
                  </TimeAuthorWrapper>
                  <CommentThreeDotWrapper>
                    <FirstComment>{item1.content}</FirstComment>
                    <CommentThreeDot/>
                  </CommentThreeDotWrapper>
                </ReplyPadding>
                <br/>
              </div>
            );
          } else return null;
        })}
        {this.state.showMenu ? (
          <MenuWrapper
            className="menu"
            ref={(element) => {
              this.dropdownMenu = element;
            }}
          >
            <ReplyForm group={this.props.item.id} isGroup={true} data={this.props.data} refetch={this.props.refetch} alert={this.props.alert} />
          </MenuWrapper>) : null}
      </Wrapper>
    );
  }
}

export default CommentItem;
