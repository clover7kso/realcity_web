import React, { Component } from "react";
import styled from "styled-components";
import ThreeDotButton from "./ThreeDotButton";
import ReplyForm from "./ReplyForm";
import DeleteForm from "./DeleteForm";
import CommentOnItem from "./CommentOnItem";
import { getFullIp } from "./Util";
import { GoodButton, BadButton } from "./Icons";
import { getLevel } from "./Util";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const InfoWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const MenuWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Time = styled.div`
  color: #8c8c8c;
  font-size: 14px;
`;

const Num = styled.div`
  font-size: 14px;
  padding-top: 2px;
`;

const TimeAuthorWrapper = styled.div`
  display: flex;
  padding: 20px 0 10px 0;
`;

const LikeOrDislikeWrapper = styled.div`
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

const Button = styled.button`
  background-color: transparent;
  border-color: transparent;
  cursor: pointer;
  outline: 0;
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
        id: this.props.item.id,
        ip: await getFullIp(),
      },
    });
    if (result.data.commentAddReport)
      this.props.alert.success("신고되었습니다.");
    else this.props.alert.error("이미 신고하신 글 입니다.");
  };

  addLikeHandler = async () => {
    const result = await this.props.commentAddLike({
      variables: {
        id: this.props.item.id,
        ip: await getFullIp(),
      },
    });
    if (result.data.commentAddLike) {
      this.props.alert.success("추천되었습니다.");
      this.props.refetch();
    } else this.props.alert.error("이미 추천하신 댓글입니다.");
  };

  addDislikeHandler = async () => {
    const result = await this.props.commentAddDislike({
      variables: {
        id: this.props.item.id,
        ip: await getFullIp(),
      },
    });
    if (result.data.commentAddDislike) {
      this.props.alert.success("비추천되었습니다.");
      this.props.refetch();
    } else this.props.alert.error("이미 비추천하신 댓글입니다.");
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
        name: "답글",
        onClick: () => {
          this.setState({ showMenu: true }, () => {
            document.addEventListener("click", this.closeMenu);
          });
        },
      },
      {
        name: "신고",
        onClick: async () => this.addReportHandler(),
      },
      { name: "삭제", onClick: (e) => this.showDelete(e) },
    ];

    return (
      <Wrapper>
        <InfoWrapper>
          <TimeAuthorWrapper>
            <Time>{this.props.item.timeFromToday}</Time>&nbsp;&nbsp;
            <div>
              {this.props.item.user === null
                ? this.props.item.author
                : " Lv." +
                  getLevel(this.props.item.user.point) +
                  "  " +
                  this.props.item.user.nickname}
            </div>
            &nbsp;&nbsp;
            {this.props.item.user === null ? (
              <Time>{this.props.item.ip}</Time>
            ) : null}
          </TimeAuthorWrapper>
          <LikeOrDislikeWrapper>
            <Button onClick={() => this.addLikeHandler()}>
              <GoodButton />
            </Button>
            <Num>{this.props.item.likeAll}</Num>&nbsp;&nbsp;
            <Button onClick={() => this.addDislikeHandler()}>
              <BadButton />
            </Button>
            <Num>{this.props.item.dislikeAll}</Num>&nbsp;&nbsp;
          </LikeOrDislikeWrapper>
        </InfoWrapper>
        {this.state.showDelete ? (
          <MenuWrapper
            className="menu"
            ref={(element) => {
              this.dropdownMenu = element;
            }}
          >
            <DeleteForm
              funcSend={this.props.commentShowOff}
              id={this.props.item.id}
              funcComplete={this.props.refetch}
              alert={this.props.alert}
            />
          </MenuWrapper>
        ) : null}
        <ThreeDotButtonWrapper>
          <FirstComment onClick={this.showMenu}>
            {this.props.item.published
              ? this.props.item.content
              : "삭제된 댓글입니다."}
          </FirstComment>
          <ThreeDotButton data={ThreeDotButtonData} />
        </ThreeDotButtonWrapper>
        {this.props.data.postOne.comments.map((item1, idx1) => {
          if (this.props.item.id === item1.group) {
            return (
              <CommentOnItem
                key={idx1}
                item1={item1}
                alert={this.props.alert}
                refetch={this.props.refetch}
                commentShowOff={this.props.commentShowOff}
                commentAddReport={this.props.commentAddReport}
                commentAddLike={this.props.commentAddLike}
                commentAddDislike={this.props.commentAddDislike}
              />
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
            <ReplyForm
              group={this.props.item.id}
              isGroup={true}
              data={this.props.data}
              refetch={this.props.refetch}
              alert={this.props.alert}
            />
          </MenuWrapper>
        ) : null}
      </Wrapper>
    );
  }
}

export default CommentItem;
