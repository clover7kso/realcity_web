import React from "react";
import styled from "styled-components";
import CommentThreeDot from "./CommentThreeDot";

const CommentBox = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 0 3% 0;
`;

const Time = styled.div`
  color: #8c8c8c;
  font-size: 14px;
`;

const TimeAuthorWrapper = styled.div`
  display: flex;
  padding: 3% 0 0 0;
`;

const FirstComment = styled.div`
  font-size: 20px;
`;

const CommentThreeDotWrapper = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  padding: 1% 0 3% 0;
`;

const Linedivide = styled.div`
  border-bottom: 1px solid #cecece;
`;

const Padding = styled.div`
  padding: 0 3% 0 3%;
`;

const ReplyPadding = styled.div`
  padding: 0 0 0 3%;
  border-radius: 14px;
  background-color: #F8F8F8;
`;

function CommentReply(props) {
  const temp = props.data.postOne.comments;
  let comment = [];
  for(var i=0; i<temp.length; i++)
    comment.push(temp[i]);
  comment.sort((a, b) => {
    return a.createdAt-b.createdAt;
  });
  console.log(comment);
  return (
    <CommentBox>
      {comment.map((item, idx) => {
        if (item.group === null) {
          return (
            <Linedivide key={idx}>
              <Padding>
                <TimeAuthorWrapper>
                  <Time>{item.timeFromToday}</Time>&nbsp;
                  <div>{item.author}</div>
                </TimeAuthorWrapper>
                <CommentThreeDotWrapper>
                  <FirstComment>{item.content}</FirstComment>
                  <CommentThreeDot></CommentThreeDot>
                </CommentThreeDotWrapper>
              {comment.map((item1, idx1) => {
                if(item.id === item1.group){
                  return(
                    <div>
                      <ReplyPadding key={idx1}>
                        <TimeAuthorWrapper>
                          <Time>{item1.timeFromToday}</Time>&nbsp;
                          <div>{item1.author}</div>
                        </TimeAuthorWrapper>
                        <CommentThreeDotWrapper>
                          <FirstComment>{item1.content}</FirstComment>
                          <CommentThreeDot></CommentThreeDot>
                        </CommentThreeDotWrapper>
                      </ReplyPadding>
                      <br></br>
                    </div>
                  );
                } else return null;
              })}
              </Padding>
            </Linedivide>
          );
        } else return null;
      })}
    </CommentBox>
  );
}

export default CommentReply;
