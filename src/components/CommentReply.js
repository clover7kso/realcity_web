import React, { Component } from "react";
import styled from "styled-components";
import CommentThreeDot from "../Components/CommentThreeDot";

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
  padding: 3% 0 3% 0;
`;

const Linedivide = styled.div`
  border-bottom: 1px solid #cecece;
`;

const Padding = styled.div`
  padding: 0 3% 0 3%;
`;

function CommentReply(props) {
  const temp = props.data.postOne.comments;
  //console.log(temp);
  var comment = [];
  for (var i = 0; i < temp.length; i++) {
    if (!temp[i].group) comment.push(temp[i]);
  }
  for (var i = 0; i < comment.length; i++) {
    for (var j = 0; j < temp.length; j++) {
      if (comment[i].id === temp[j].group) {
        var newObj = temp[j];
        Object.assign(comment[i], newObj);
      }
    }
  }
  console.log(comment);
  return <div>dd</div>;
  // return (
  //   <CommentBox>
  //     {comment.map((item, idx) => {
  //       if (item.group === null) {
  //         return (
  //           <Linedivide key={idx}>
  //             <Padding>
  //               <TimeAuthorWrapper>
  //                 <Time>{item.timeFromToday}</Time>&nbsp;
  //                 <div>{item.author}</div>
  //               </TimeAuthorWrapper>
  //               <CommentThreeDotWrapper>
  //                 <FirstComment>{item.content}</FirstComment>
  //                 <CommentThreeDot></CommentThreeDot>
  //               </CommentThreeDotWrapper>
  //             </Padding>
  //           </Linedivide>
  //         );
  //       }
  //     })}
  //   </CommentBox>
  // );
}

export default CommentReply;
