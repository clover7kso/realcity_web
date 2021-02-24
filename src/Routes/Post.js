import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { LikeButton } from "../Components/Icons";
import { gql } from "@apollo/client";
import { useQuery, useMutation } from "@apollo/client";
import { withRouter } from "react-router-dom";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-editor-classic/src/classiceditor.js";
import StickyBox from "react-sticky-box";

import { installedPlugins } from "../Components/CKEditorPlugin";
import ThreeDotButton from "../Components/ThreeDotButton";
import Loader from "../Components/Loader";
import { getFullIp } from "../Components/Util";
import { useAlert } from "react-alert";
import ReplyForm from "../Components/ReplyForm";
import CommentItem from "../Components/CommentItem";
import CommentItemBest from "../Components/CommentItemBest";
import DeleteForm from "../Components/DeleteForm";
import ShareButtons from "../Components/ShareButtons";
import { getLevel } from "../Components/Util";
import { Helmet } from "react-helmet";
import { isPC } from "../Components/MediaQuery";
import { Bling as GPT } from "react-gpt";

const Background = styled.div`
  background-color: white;
  min-width: ${(props) => (props.pcCheck ? "1255px" : "null")};
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: flex-start;
`;

const Wrapper = styled.div`
  min-width: ${(props) => (props.pcCheck ? "935px" : null)};
  background-color: white;
  padding-left: 10px;
  padding-right: 10px;
`;

const SideAD = styled.div`
  background-color: white;
  display: flex;
  width: 100%;
  align-items: center;
  flex-direction: column;
`;

const PostSection = styled.div`
  display: flex;
  flex-direction: column;
  font-family: Roboto;
  padding: 0 0 1% 0;
`;

const PostWrapper = styled.div`
  min-width: 100%;
  padding-left: 10px;
  padding-right: 10px;
`;

const TimeAuthorWrapper = styled.div`
  display: flex;
  margin-bottom: 20px;
  align-items: baseline;
`;

const TimeAuthorViewWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Time = styled.div`
  color: #8c8c8c;
  font-size: 14px;
`;

const IP = styled.div`
  color: #8c8c8c;
  font-size: 10px;
`;

const Title = styled.div`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const Button = styled.button`
  background-color: transparent;
  border-color: transparent;
  cursor: pointer;
  outline: 0;
`;

const TitleThreeDotWrapper = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
`;

const LikeViewWrapper = styled.div`
  margin-top: 20px;
  align-items: baseline;
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
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
  border-top: 1px solid #cecece;
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
`;

const BestCommentWrapper = styled.div`
  border-top: 1px solid #cecece;
  display: flex;
  flex-direction: column;
  margin-bottom: 30px;
`;

const Linedivide = styled.div`
  border-bottom: 1px solid #cecece;
`;

const CommentTitle = styled.div`
  margin-top: 40px;
  font-size: 17px;
  text-decoration: underline;
  margin-bottom: 20px;
  font-weight: bold;
`;

const CommentTitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const CommentAlignWrapper = styled.div`
  display: flex;
`;

const CommentAlign = styled.button`
  cursor: pointer;
  outline: 0;
  background-color: transparent;
  border-color: transparent;
  margin-top: 40px;
  font-size: 17px;
  margin-bottom: 20px;
`;

const InfoIcon = styled.img`
  object-fit: cover;
  width:15px
  height:15px
`;

const GPTWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-around;
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
      published
      thumbnail
      user {
        nickname
        point
      }
      comments {
        ip
        id
        group
        timeFromToday
        author
        content
        password
        createdAt
        likeAll
        dislikeAll
        published
        user {
          nickname
          point
        }
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
  mutation commentAddReport($id: String!, $ip: String!, $userNick: String) {
    commentAddReport(id: $id, ip: $ip, userNick: $userNick)
  }
`;
const COMMENT_ADD_LIKE = gql`
  mutation commentAddLike($id: String!, $ip: String!) {
    commentAddLike(id: $id, ip: $ip)
  }
`;
const COMMENT_ADD_DISLIKE = gql`
  mutation commentAddDislike($id: String!, $ip: String!) {
    commentAddDislike(id: $id, ip: $ip)
  }
`;
const POST_ADD_REPORT = gql`
  mutation postAddReport($id: String!, $ip: String!, $userNick: String) {
    postAddReport(id: $id, ip: $ip, userNick: $userNick)
  }
`;

const POST_SHOW_OFF_NO_ID = gql`
  mutation postShowOffNoID($id: String!, $password: String!) {
    postShowOffNoID(id: $id, password: $password)
  }
`;

const POST_SHOW_OFF_ID = gql`
  mutation postShowOffID($id: String!, $userId: String!) {
    postShowOffID(id: $id, userId: $userId)
  }
`;

const COMMENT_SHOW_OFF_NO_ID = gql`
  mutation commentShowOffNoID($id: String!, $password: String!) {
    commentShowOffNoID(id: $id, password: $password)
  }
`;

const COMMENT_SHOW_OFF_ID = gql`
  mutation commentShowOffID($id: String!, $userId: String!) {
    commentShowOffID(id: $id, userId: $userId)
  }
`;

const Post = ({ history }) => {
  const alert = useAlert();
  const deleteRef = useRef();
  const [deleteShow, setDeleteShow] = useState(false);
  const handleClickOutside = ({ target }) => {
    if (deleteShow && !deleteRef.current.contains(target)) setDeleteShow(false);
  };
  useEffect(() => {
    window.addEventListener("click", handleClickOutside);
    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, [deleteShow]);

  const [postAddView] = useMutation(POSTADDVIEW);
  const addView = async () => {
    await postAddView({
      variables: {
        id: history.location.search.replace("?id=", ""),
        ip: await getFullIp(),
      },
    });
  };
  useEffect(() => {
    addView();
  }, []);

  const { data, loading, refetch } = useQuery(POSTONE_QUERY, {
    variables: {
      id: history.location.search.replace("?id=", ""),
    },
  });

  const [postAddLike] = useMutation(POSTADDLIKE);
  const clickConfirm = async () => {
    const result = await postAddLike({
      variables: {
        id: history.location.search.replace("?id=", ""),
        ip: await getFullIp(),
      },
    });
    if (result.data.postAddLike) refetch();
    else alert.error("이미 좋아요를 눌렀습니다.");
  };

  const [commentAddReport] = useMutation(COMMENT_ADD_REPORT);
  const [commentAddLike] = useMutation(COMMENT_ADD_LIKE);
  const [commentAddDislike] = useMutation(COMMENT_ADD_DISLIKE);
  const [postAddReport] = useMutation(POST_ADD_REPORT);

  const addReportHandler = async () => {
    if (loading || data === undefined) return;
    const result = await postAddReport({
      variables: {
        id: data.postOne.id,
        ip: await getFullIp(),
        userNick: data.postOne.user ? data.postOne.user.nickname : null,
      },
    });
    if (result.data.postAddReport) alert.success("신고되었습니다.");
    else alert.error("이미 신고하신 글 입니다.");
  };

  const deletePost = async () => {
    if (!data.postOne.published) {
      alert.error("이미 삭제되었습니다.");
      return;
    }
    if (window.sessionStorage.getItem("id")) {
      const result = await postShowOffID({
        variables: {
          id: data.postOne.id,
          userId: window.sessionStorage.getItem("id"),
        },
      });
      if (result.data.postShowOffID) {
        alert.success("삭제되었습니다.");
        history.goBack();
      } else alert.error("본인 글만 삭제가 가능합니다.");
    } else setDeleteShow(true);
  };

  const ThreeDotButtonData = [
    { name: "신고", onClick: () => addReportHandler() },
    { name: "삭제", onClick: () => deletePost() },
  ];

  const [postShowOffNoID] = useMutation(POST_SHOW_OFF_NO_ID);
  const [postShowOffID] = useMutation(POST_SHOW_OFF_ID);
  const [commentShowOffID] = useMutation(COMMENT_SHOW_OFF_ID);
  const [commentShowOffNoID] = useMutation(COMMENT_SHOW_OFF_NO_ID);

  try {
    var TopComment = !loading
      ? data.postOne.comments
          .slice()
          .sort(function (a, b) {
            // 오름차순
            return b["likeAll"] - a["likeAll"];
          })
          .slice(0, 3)
      : [];
  } catch {}

  const [commentAlign, setCommentAlign] = useState("createdAt");

  try {
    var SortedComment = !loading
      ? data.postOne.comments.slice().sort(function (a, b) {
          // 오름차순
          return b[commentAlign] - a[commentAlign];
        })
      : [];
  } catch {}

  const commentAlignHandler = (key) => {
    if (key !== commentAlign) {
      setCommentAlign(key);
    }
  };

  const pcCheck = isPC();

  return (
    <Background pcCheck={pcCheck}>
      {pcCheck ? (
        <StickyBox offsetTop={120} offsetBottom={20}>
          <SideAD>
            <GPT
              adUnitPath="21682743634/da_dion_realcitykr/pc_160x600_leftbottom"
              slotSize={[160, 600]}
            />
          </SideAD>
        </StickyBox>
      ) : null}
      {loading || data === undefined || data.postOne === null ? (
        <Loader />
      ) : (
        <Wrapper pcCheck={pcCheck}>
          <Helmet>
            <meta property="og:url" content={window.location.href} />
            <meta property="og:type" content="website" />
            <meta property="og:title" content={data.postOne.title} />
            <meta property="og:description" content={data.postOne.content} />
            <meta
              property="og:image"
              content={
                data.postOne.thumbnail
                  ? data.postOne.thumbnail
                  : "https://realcitykr.com/logo.png"
              }
            />
          </Helmet>
          <PostSection>
            {pcCheck ? (
              <GPT
                adUnitPath="/21682743634/da_dion_realcitykr/pc_970x90_top"
                slotSize={[970, 90]}
              />
            ) : (
              <GPT
                adUnitPath="/21682743634/da_dion_realcitykr/mobile_300x250_top"
                slotSize={[300, 250]}
              />
            )}
            <PostWrapper>
              {deleteShow ? (
                <div ref={deleteRef}>
                  <DeleteForm
                    funcSend={postShowOffNoID}
                    id={data.postOne.id}
                    funcComplete={() => history.goBack()}
                    alert={alert}
                  />
                </div>
              ) : null}
              <TitleThreeDotWrapper>
                <Title>{data.postOne.title}</Title>
                <ThreeDotButton data={ThreeDotButtonData} />
              </TitleThreeDotWrapper>

              <TimeAuthorViewWrapper>
                <TimeAuthorWrapper>
                  <Time>{data.postOne.timeFromToday}</Time>&nbsp;&nbsp;
                  <div>
                    {data.postOne.user === null
                      ? data.postOne.author
                      : " Lv." +
                        getLevel(data.postOne.user.point) +
                        "  " +
                        data.postOne.user.nickname}
                  </div>
                  &nbsp;&nbsp;
                  {data.postOne.user === null ? (
                    <IP>{data.postOne.ip}</IP>
                  ) : null}
                </TimeAuthorWrapper>
                <Info>
                  <LikeView>
                    조회 :{" "}
                    {data.postOne.viewAll.toLocaleString(undefined, {
                      maximumFractionDigits: 0,
                    })}
                  </LikeView>
                </Info>
              </TimeAuthorViewWrapper>

              <CKEditor
                editor={ClassicEditor}
                config={{
                  plugins: [...installedPlugins],
                }}
                disabled={true}
                data={data.postOne.content}
              />

              {pcCheck ? (
                <GPTWrapper>
                  <GPT
                    adUnitPath="/21682743634/da_dion_realcitykr/pc_post_300x250_leftbottom"
                    slotSize={[300, 250]}
                  />
                  <GPT
                    adUnitPath="/21682743634/da_dion_realcitykr/pc_post_300x250_rightbottom"
                    slotSize={[300, 250]}
                  />
                </GPTWrapper>
              ) : null}

              <LikeViewWrapper>
                <LikeButtonWrapper>
                  <Button onClick={() => clickConfirm()}>
                    <LikeButton />
                  </Button>
                </LikeButtonWrapper>
                <Info>
                  <InfoIcon src={require("../Image/info_like.png")} />
                  <LikeView>
                    {data.postOne.likeAll.toLocaleString(undefined, {
                      maximumFractionDigits: 0,
                    })}
                  </LikeView>
                  <InfoIcon src={require("../Image/info_comment.png")} />
                  <LikeView>
                    {data.postOne.commentCount.toLocaleString(undefined, {
                      maximumFractionDigits: 0,
                    })}
                  </LikeView>
                </Info>
              </LikeViewWrapper>
              <ShareButtons
                pathname={
                  "https://realcitykr.com/Post" + history.location.search
                }
              />
            </PostWrapper>
          </PostSection>
          {TopComment.length > 0 ? (
            <>
              <CommentTitle>베스트댓글</CommentTitle>
              <BestCommentWrapper>
                {TopComment.map((item, idx) => {
                  if (item.likeAll !== 0)
                    return (
                      <Linedivide key={idx}>
                        <CommentItemBest
                          commentShowOffID={commentShowOffID}
                          commentShowOffNoID={commentShowOffNoID}
                          commentAddReport={commentAddReport}
                          commentAddLike={commentAddLike}
                          commentAddDislike={commentAddDislike}
                          data={data}
                          refetch={() => refetch()}
                          alert={alert}
                          item={item}
                        />
                      </Linedivide>
                    );
                  else return null;
                })}
              </BestCommentWrapper>
            </>
          ) : null}
          {SortedComment.length > 0 ? (
            <>
              <CommentTitleWrapper>
                <CommentTitle>댓글</CommentTitle>
                <CommentAlignWrapper>
                  <CommentAlign
                    onClick={() => commentAlignHandler("createdAt")}
                    style={{
                      textDecoration:
                        commentAlign === "createdAt" ? "underline" : null,
                      fontWeight: commentAlign === "createdAt" ? "bold" : null,
                    }}
                  >
                    최신순
                  </CommentAlign>
                  <CommentAlign
                    onClick={() => commentAlignHandler("likeAll")}
                    style={{
                      textDecoration:
                        commentAlign === "likeAll" ? "underline" : null,
                      fontWeight: commentAlign === "likeAll" ? "bold" : null,
                      marginLeft: 10,
                    }}
                  >
                    추천순
                  </CommentAlign>
                </CommentAlignWrapper>
              </CommentTitleWrapper>
              <CommentWrapper>
                {SortedComment.map((item, idx) => {
                  if (item.group === null) {
                    return (
                      <Linedivide key={idx}>
                        <CommentItem
                          commentShowOffID={commentShowOffID}
                          commentShowOffNoID={commentShowOffNoID}
                          commentAddReport={commentAddReport}
                          commentAddLike={commentAddLike}
                          commentAddDislike={commentAddDislike}
                          data={data}
                          refetch={() => refetch()}
                          alert={alert}
                          item={item}
                        />
                      </Linedivide>
                    );
                  } else return null;
                })}
              </CommentWrapper>
            </>
          ) : null}
          <ReplyForm data={data} refetch={() => refetch()} alert={alert} />
          {pcCheck ? (
            <GPTWrapper>
              <GPT
                adUnitPath="/21682743634/da_dion_realcitykr/pc_300x250_leftbottom"
                slotSize={[300, 250]}
              />
              <GPT
                adUnitPath="/21682743634/da_dion_realcitykr/pc_300x250_rightbottom"
                slotSize={[300, 250]}
              />
            </GPTWrapper>
          ) : (
            <GPT
              adUnitPath="/21682743634/da_dion_realcitykr/mobile_300x250_bottom"
              slotSize={[300, 250]}
            />
          )}
        </Wrapper>
      )}
      {pcCheck ? (
        <StickyBox offsetTop={120} offsetBottom={20}>
          <SideAD>
            <GPT
              adUnitPath="/21682743634/da_dion_realcitykr/pc_160x600_rightbottom"
              slotSize={[160, 600]}
            />
          </SideAD>
        </StickyBox>
      ) : null}
    </Background>
  );
};

export default withRouter(Post);
