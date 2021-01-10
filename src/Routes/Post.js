import React, { useState } from "react";
import styled from "styled-components";
import Input from "../Components/Input";
import { Link } from "react-router-dom";
<<<<<<< HEAD
import ThreeDotButton from "../Components/ThreeDotButton";
import { CommentsIcon, Ddabong, View, ThreeDot, LikeButton } from "./../Components/Icons";
import { gql } from "apollo-boost";
import { useMutation, useQuery } from "react-apollo-hooks";
=======
import {
  CommentsIcon,
  Ddabong,
  View,
  ThreeDot,
  LikeButton,
} from "./../Components/Icons";
import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client";
>>>>>>> 062bac7003ea4c319887c185b12fbd42c9f767b4
import { CKEditor, CKEDITOR } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-editor-classic/src/classiceditor.js";

const Background = styled.div`
  background-color: white;
`;

const PostSection = styled.div`
  display: flex;
  //flex-direction: column;
  font-family: Roboto;
  border-bottom: 1px solid #cecece;
  padding: 3% 0 1% 0;
`;

const PostWrapper = styled.div`
  padding: 0 3% 0 3%;
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
  padding: 0 0 5% 0;
`;

const MainPost = styled.div`
  font-size: 20px;
  padding: 0 0 5% 0;
`;

const LikeViewWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const LikeButtonWrapper = styled.div`
  min-width: 80%;
`;

const Info = styled.div`
  display: flex;
  justify-content: space-between;
  min-width: 20%;
  padding: 3% 0 3% 0;
`;

const LikeView = styled.span`
  min-width: 20%;
  color: #818181;
`;

const ThreeDotButtonWrapper = styled.div`
  width: 10%;
`;

function Post({ data, loading }) {
  return (
    <div>
      {loading ? (
        <div>Loading...</div>
      ) : (
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
            <MainPost
              dangerouslySetInnerHTML={{ __html: data.postOne.content }}
            ></MainPost>
            <LikeViewWrapper>
              <LikeButtonWrapper>
                <Button>
                  <LikeButton></LikeButton>
                </Button>
              </LikeButtonWrapper>
              <Info>
                <LikeView>
                  <CommentsIcon></CommentsIcon> {data.postOne.commentCount}
                </LikeView>
                <LikeView>
                  <Ddabong></Ddabong> {data.postOne.likeAll}
                </LikeView>
                <LikeView>
                  <View></View> {data.postOne.viewAll}
                </LikeView>
              </Info>
            </LikeViewWrapper>
          </PostWrapper>
        </PostSection>
      )}
    </div>
  );
}

function Comment({ data, loading }) {
  return <div>{loading ? <div>Loading...</div> : null}</div>;
}

export default () => {
  const POSTONE_QUERY = gql`
    query postOne($id: String!) {
      postOne(id: $id) {
        id
        timeFromToday
        author
        title
        content
        commentCount
        likeAll
        viewAll
        comments: id
      }
    }
  `;
  const { data, loading, error, refetch, fetchMore } = useQuery(POSTONE_QUERY, {
    variables: {
      id: "ckjdv9a010000vruxg9xgfdr0",
    },
    notifyOnNetworkStatusChange: true,
  });
  return (
    <Background>
      <Post data={data} loading={loading}></Post>
      <Comment data={data} loading={loading}></Comment>
    </Background>
  );
};
