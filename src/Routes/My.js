import React, { useState } from "react";
import styled from "styled-components";
import { useQuery } from "@apollo/client";
import InfiniteScroll from "../Components/InfiniteScroll";
import InfiniteScrollComment from "../Components/InfiniteScrollComment";
import { gql } from "@apollo/client";
import { withRouter } from "react-router-dom";
import Sidebar from "../Components/Sidebar";
import { PC, isPC } from "../Components/MediaQuery";

const Title = styled.span`
  font-size: 24px;
  font-weight: bold;
`;

const ZzalWrapper = styled.div`
  width:190px
  display: flex;
  flex-direction: column;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  min-height: 80vh;
`;

const BoardWrapper = styled.div`
  overflow: hidden;
  margin-right: ${(props) => (props.marginRight ? props.marginRight : "20px")};
  flex-direction: column;
  width: ${(props) => (props.width ? props.width : "80%")};
`;

const TypeWrapper = styled.div`
  display: flex;
`;

const TypeSelector = styled.button`
  cursor: pointer;
  outline: 0;
  background-color: transparent;
  border-color: transparent;
  font-size: 20px;
  margin-bottom: 20px;
`;

const POST_MY = gql`
  query postMy($cursor: String, $userId: String!) {
    postMy(cursor: $cursor, userId: $userId) {
      cursor
      posts {
        ip
        category
        id
        title
        content
        author
        timeFromToday
        commentCount
        thumbnail
        viewAll
        likeAll
        user {
          nickname
          point
        }
      }
    }
  }
`;

const COMMENT_MY = gql`
  query commentMy($cursor: String, $userId: String!) {
    commentMy(cursor: $cursor, userId: $userId) {
      cursor
      comments {
        ip
        id
        postId
        content
        author
        timeFromToday
        likeAll
        dislikeAll
        user {
          nickname
          point
        }
      }
    }
  }
`;

const My = ({ history }) => {
  if (!window.sessionStorage.getItem("id")) {
    return <Title>회원가입 전용 페이지 입니다.</Title>;
  }
  const [mySelect, setMySelect] = useState("post");

  const postResult = useQuery(POST_MY, {
    variables: {
      userId: window.sessionStorage.getItem("id"),
    },
    notifyOnNetworkStatusChange: true,
  });

  const commentResult = useQuery(COMMENT_MY, {
    variables: {
      userId: window.sessionStorage.getItem("id"),
    },
    notifyOnNetworkStatusChange: true,
  });

  const handlePostRefresh = async () => {
    await postResult.refetch();
    return true;
  };

  const handleCommentRefresh = async () => {
    await commentResult.refetch();
    return true;
  };

  var pcCheck = isPC();
  return (
    <Wrapper>
      <BoardWrapper width={pcCheck ? "80%" : "100%"}>
        <TypeWrapper>
          <TypeSelector
            onClick={() => setMySelect("post")}
            style={{
              textDecoration: mySelect === "post" ? "underline" : null,
              fontWeight: mySelect === "post" ? "bold" : null,
            }}
          >
            내가 쓴 게시글
          </TypeSelector>
          <TypeSelector
            onClick={() => setMySelect("comment")}
            style={{
              textDecoration: mySelect === "comment" ? "underline" : null,
              fontWeight: mySelect === "comment" ? "bold" : null,
            }}
          >
            내가 쓴 댓글
          </TypeSelector>
        </TypeWrapper>

        {mySelect === "post" ? (
          postResult.error ? (
            <p>{postResult.error.message}</p>
          ) : (
            <InfiniteScroll
              onRefresh={() => handlePostRefresh()}
              selected={"👑 실시간 인기글"}
              loading={postResult.loading}
              data={
                !postResult.loading ? postResult.data.postMy.posts : undefined
              }
              onLoadMore={() => {
                if (
                  !postResult.loading &&
                  postResult.data.postMy.cursor === "end"
                ) {
                  return;
                } else if (!postResult.loading) {
                  postResult.fetchMore({
                    variables: {
                      cursor:
                        postResult.data !== undefined
                          ? postResult.data.postMy.cursor
                          : null,
                      userId: window.sessionStorage.getItem("id"),
                    },
                    updateQuery: (prevResult, { fetchMoreResult }) => {
                      const newEdges = fetchMoreResult.postMy.posts;
                      return {
                        postMy: {
                          __typename: prevResult.postMy.__typename,
                          cursor: fetchMoreResult.postMy.cursor,
                          posts: [...prevResult.postMy.posts, ...newEdges],
                        },
                      };
                    },
                  });
                }
              }}
            />
          )
        ) : (
          <InfiniteScrollComment
            onRefresh={() => handleCommentRefresh()}
            loading={commentResult.loading}
            data={
              !commentResult.loading
                ? commentResult.data.commentMy.comments
                : undefined
            }
            onLoadMore={() => {
              if (
                !commentResult.loading &&
                commentResult.data.commentMy.cursor === "end"
              ) {
                return;
              } else {
                commentResult.fetchMore({
                  variables: {
                    cursor:
                      commentResult.data !== undefined
                        ? commentResult.data.commentMy.cursor
                        : null,
                    userId: window.sessionStorage.getItem("id"),
                  },
                  updateQuery: (prevResult, { fetchMoreResult }) => {
                    const newEdges = fetchMoreResult.commentMy.comments;
                    return {
                      commentMy: {
                        __typename: prevResult.commentMy.__typename,
                        cursor: fetchMoreResult.commentMy.cursor,
                        comments: [
                          ...prevResult.commentMy.comments,
                          ...newEdges,
                        ],
                      },
                    };
                  },
                });
              }
            }}
          />
        )}
      </BoardWrapper>
      <PC>
        <ZzalWrapper>
          <Title>오늘 짤방 TOP</Title>
          <Sidebar />
        </ZzalWrapper>
      </PC>
    </Wrapper>
  );
};
export default withRouter(My);
