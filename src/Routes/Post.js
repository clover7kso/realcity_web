import React from "react";
import styled from "styled-components";
import { CommentsIcon, Ddabong, View, LikeButton } from "../Components/Icons";
import { gql } from "@apollo/client";
import { useQuery, useMutation } from "@apollo/client";
import { withRouter } from "react-router-dom";
import ThreeDotButton from "../Components/ThreeDotButton";
import CommentReply from "../Components/CommentReply";

import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-editor-classic/src/classiceditor.js";
import { installedPlugins } from "../Components/CKEditorPlugin";
import Loader from "../Components/Loader";

const Background = styled.div`
  background-color: white;
`;

const PostSection = styled.div`
  display: flex;
  flex-direction: column;
  font-family: Roboto;
  border-bottom: 1px solid #cecece;
  padding: 3% 0 1% 0;
`;

const PostWrapper = styled.div`
  min-width: 100%;
`;

const TimeAuthorWrapper = styled.div`
  display: flex;
  padding: 0 0 3% 0;
`;

const Time = styled.div`
  color: #8c8c8c;
  font-size: 14px;
`;

const Title = styled.div`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const Button = styled.button`
  background-color: transparent;
  border-color: transparent;
  cursor: pointer;
  outline: 0;
`;

const TitleThreeDotWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const LikeViewWrapper = styled.div`
  margin-top: 20px;
  align-items: baseline;
  display: flex;
  justify-content: space-between;
`;

const LikeButtonWrapper = styled.div``;

const Info = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
`;

const LikeView = styled.div`
  color: #818181;
  margin-left: 10px;
  margin-right: 10px;
  line-height: 15px;
`;

const CommentSection = styled.div`
  display: flex;
  flex-direction: column;
  font-family: Roboto;
`;

function Comment({ data, loading }) {
  console.log(data, loading);
  return (
    <div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <CommentSection>
          <CommentReply data={data}></CommentReply>
        </CommentSection>
      )}
    </div>
  );
}

const POSTONE_QUERY = gql`
  query postOne($id: String!) {
    postOne(id: $id) {
      id
      password
      timeFromToday
      author
      title
      content
      commentCount
      likeAll
      viewAll
      comments {
        id
        group
        timeFromToday
        author
        content
        password
        createdAt
      }
    }
  }
`;

const Post = ({ history }) => {
  console.log(history.location.search);
  const { data, loading, refetch } = useQuery(POSTONE_QUERY, {
    variables: {
      id: history.location.search.replace("?", ""),
    },
    notifyOnNetworkStatusChange: true,
  });
  const POSTADDLIKE = gql`
    mutation postAddLike($id: String!) {
      postAddLike(id: $id)
    }
  `;
  const [postAddLike] = useMutation(POSTADDLIKE);
  const clickConfirm = async () => {
    const result = await postAddLike({
      variables: {
        id: history.location.search.replace("?", ""),
      },
    });
    console.log(result);
    refetch();
  };
  console.log(loading ? data : "loading");
  console.log(data);
  console.log(loading);
  return (
    <Background>
      {loading || data === undefined || data.postOne === null ? (
        <Loader />
      ) : (
        <div>
          <PostSection>
            <PostWrapper>
              <TimeAuthorWrapper>
                <Time>{data.postOne.timeFromToday}</Time>&nbsp;
                <div>{data.postOne.author}</div>
              </TimeAuthorWrapper>
              <TitleThreeDotWrapper>
                <Title>{data.postOne.title}</Title>
                <ThreeDotButton></ThreeDotButton>
              </TitleThreeDotWrapper>
              <CKEditor
                editor={ClassicEditor}
                config={{
                  plugins: [...installedPlugins],
                }}
                disabled={true}
                data={data.postOne.content}
              />
              <LikeViewWrapper>
                <LikeButtonWrapper>
                  <Button onClick={() => clickConfirm}>
                    <LikeButton></LikeButton>
                  </Button>
                </LikeButtonWrapper>
                <Info>
                  <CommentsIcon />
                  <LikeView>
                    {data.postOne.commentCount.toLocaleString(undefined, {
                      maximumFractionDigits: 0,
                    })}
                  </LikeView>
                  <Ddabong />
                  <LikeView>
                    {data.postOne.likeAll.toLocaleString(undefined, {
                      maximumFractionDigits: 0,
                    })}
                  </LikeView>
                  <View />
                  <LikeView>
                    {data.postOne.viewAll.toLocaleString(undefined, {
                      maximumFractionDigits: 0,
                    })}
                  </LikeView>
                </Info>
              </LikeViewWrapper>
            </PostWrapper>
          </PostSection>
          <Comment data={data} loading={loading} />
        </div>
      )}
    </Background>
  );
};

export default withRouter(Post);
