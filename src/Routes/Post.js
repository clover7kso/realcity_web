import React, { useEffect } from "react";
import styled from "styled-components";
import { CommentsIcon, Ddabong, View, LikeButton } from "../Components/Icons";
import { gql } from "@apollo/client";
import { useQuery, useMutation } from "@apollo/client";
import { withRouter } from "react-router-dom";
import ThreeDotButton from "../Components/ThreeDotButton";

import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-editor-classic/src/classiceditor.js";
import { installedPlugins } from "../Components/CKEditorPlugin";
import Loader from "../Components/Loader";
import { getFullIp } from "../Components/Util";
import { useAlert } from "react-alert";
import ReplyForm from "../Components/ReplyForm";
import CommentItem from "../Components/CommentItem";

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

const CommentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
`;

const Linedivide = styled.div`
  border-bottom: 1px solid #cecece;
`;

const POSTONE_QUERY = gql`
  query postOne($id: String!) {
    postOne(id: $id) {
      id
      ip
      password
      timeFromToday
      author
      title
      content
      commentCount
      likeAll
      viewAll
      comments {
        ip
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
const POSTADDLIKE = gql`
  mutation postAddLike($id: String!, $ip: String!) {
    postAddLike(id: $id, ip: $ip)
  }
`;
const POSTADDVIEW = gql`
  mutation postAddView($id: String!, $ip: String!) {
    postAddView(id: $id, ip: $ip)
  }
`;
const COMMENT_ADD_REPORT = gql`
  mutation commentAddReport($id: String!, $ip: String!) {
    commentAddReport(id: $id, ip: $ip)
  }
`;

const Post = ({ history }) => {
  const alert = useAlert();

  const [postAddView] = useMutation(POSTADDVIEW);
  const addView = async () => {
    const result = await postAddView({
      variables: {
        id: history.location.search.replace("?", ""),
        ip: await getFullIp(),
      },
    });
    console.log(result);
  };

  useEffect(() => {
    addView();
  }, []);

  const { data, loading, refetch } = useQuery(POSTONE_QUERY, {
    variables: {
      id: history.location.search.replace("?", ""),
    },
    notifyOnNetworkStatusChange: true,
  });

  const [postAddLike] = useMutation(POSTADDLIKE);
  const clickConfirm = async () => {
    const result = await postAddLike({
      variables: {
        id: history.location.search.replace("?", ""),
        ip: await getFullIp(),
      },
    });
    if (result.data.postAddLike) refetch();
    else alert.error("이미 좋아요를 눌렀습니다.");
  };

  const ThreeDotButtonData = [
    { name: "신고", onClick: () => console.log("신고눌림") },
    { name: "삭제", onClick: () => console.log("삭제눌림") },
  ];
  const [commentAddReport] = useMutation(COMMENT_ADD_REPORT);

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
                <div>{data.postOne.ip}</div>&nbsp;&nbsp;
                <div>{data.postOne.author}</div>
              </TimeAuthorWrapper>
              <TitleThreeDotWrapper>
                <Title>{data.postOne.title}</Title>
                <ThreeDotButton data={ThreeDotButtonData} />
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
                  <Button onClick={() => clickConfirm()}>
                    <LikeButton />
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
          <CommentWrapper>
            {data.postOne.comments.map((item, idx) => {
              if (item.group === null) {
                return (
                  <Linedivide key={idx}>
                    <CommentItem
                      commentAddReport={commentAddReport}
                      data={data}
                      refetch={refetch}
                      alert={alert}
                      item={item}
                    />
                  </Linedivide>
                );
              } else return null;
            })}
          </CommentWrapper>
          <ReplyForm data={data} refetch={refetch} alert={alert} />
        </div>
      )}
    </Background>
  );
};

export default withRouter(Post);
