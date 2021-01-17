import React, { Component } from "react";
import styled from "styled-components";
import ThreeDotButton from "./ThreeDotButton";
import DeleteForm from "./DeleteForm";
import { getFullIp } from "./Util";

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
  padding: 20px 0 10px 0;
`;

const FirstComment = styled.div`
  font-size: 15px;
`;

const ThreeDotButtonWrapper = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  padding: 10px 10px 20px 0;
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
      showDelete: false,
    };
    this.showMenu = this.showMenu.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
    this.showDelete = this.showDelete.bind(this);
    this.closeDelete = this.closeDelete.bind(this);
  }

  addReportHandler = async () => {
    const result = await this.props.commentAddReport({
      variables: {
        id: this.props.item1.id,
        ip: await getFullIp(),
      },
    });
    if (result.data.commentAddReport)
      this.props.alert.success("신고되었습니다.");
    else this.props.alert.error("이미 신고하신 글 입니다.");
  };

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

  showDelete(event) {
    event.preventDefault();
    this.setState({ showDelete: true }, () => {
      document.addEventListener("click", this.closeDelete);
    });
  }

  closeDelete(event) {
    if (this.dropdownMenu && !this.dropdownMenu.contains(event.target)) {
      this.setState({ showDelete: false }, () => {
        document.removeEventListener("click", this.closeDelete);
      });
    }
  }

  render() {
    const ThreeDotButtonData = [
      {
        name: "신고",
        onClick: async () => this.addReportHandler(),
      },
      { name: "삭제", onClick: (e) => this.showDelete(e) },
    ];
    return (
      <Wrapper>
        <div>
          <ReplyPadding key={this.props.idx1}>
            <TimeAuthorWrapper>
              <Time>{this.props.item1.timeFromToday}</Time>&nbsp;
              <div>{this.props.item1.ip}</div>&nbsp;&nbsp;
              <div>{this.props.item1.author}</div>
            </TimeAuthorWrapper>
            {this.state.showDelete ? (
              <MenuWrapper
                className="menu"
                ref={(element) => {
                  this.dropdownMenu = element;
                }}
              >
                <DeleteForm
                  funcSend={this.props.commentShowOff}
                  id={this.props.item1.id}
                  funcComplete={this.props.refetch}
                  alert={this.props.alert}
                />
              </MenuWrapper>
            ) : null}
            <ThreeDotButtonWrapper>
              <FirstComment>
                {this.props.item1.published
                  ? this.props.item1.content
                  : "삭제된 댓글입니다."}
              </FirstComment>
              <ThreeDotButton data={ThreeDotButtonData} />
            </ThreeDotButtonWrapper>
          </ReplyPadding>
          <br />
        </div>
      </Wrapper>
    );
  }
}

export default CommentItem;
