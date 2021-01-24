import React from "react";
import styled from "styled-components";
import { withRouter } from "react-router-dom";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 80vh;
`;

const Title = styled.span`
  margin-top: 10px;
  margin-bottom: 10px;
  font-size: 20px;
`;

const Content = styled.span`
  margin-top: 10px;
  font-size: 18px;
`;

const getReason = (reason) => {
  if (reason === "NOPE") return "현재 제제사유 검토중입니다.";
  else if (reason === "SEXSURE")
    return "선정성\n유사나체나 성기가 나오는 사진을 올렸을 경우 무통보 삭제 및 차단\n\n수위를 지킨 야한 짤방 게시물일 경우 제목에 ㅎㅂ이나 후방을 명시\n(허용되는 수위는 맥심잡지 정도의 수위이다.)\n\n- 정보통신에 관한 심의 규정 8조 위반되는 사항\n";
  else if (reason === "POLITICS")
    return "현 사이트 운영에 지장을 초례하는 선동성 또는 정치성 게시글의 경우 차단 조치\n선동 및 정치성은 현 사이트에 대한 지속적인 안티성 발언이거나, 특정 세력에 대한\n지속적인 안티성 선동작업을 뜻한다.";
  else if (reason === "GORE")
    return "시체 사진이나 심각한 고어 사진을 올렸을 경우 무통보 삭제 및 차단";
  else if (reason === "COMMERCE")
    return "외부 링크들을 무단으로 퍼와서 댓글에 광고를 하거나 커뮤니티 글에\n광고목적으로만 글을 쓰는게 적발될 시 무통보 삭제 및 차단";
  else if (reason === "SPAM")
    return "동일한 형식의 게시글이나 댓글을 반복적으로 게시할 경우 제재대상이 된다.";
  else if (reason === "ILLEGAL")
    return "마약, 살인, 강도 등과 같은 중범죄를 저지르고 사이트에 인증 글을 올렸을 시\n무통보 삭제 및 영구차단 조치";
  else if (reason === "OTHERS") return "기타다른 이유 때문에 제제당하였습니다.";
};

const getDate = (date) => {
  if (date === "NOPE") return "현재 제제형량 검토중입니다.";
  else if (date === "DAY1") return "1일";
  else if (date === "DAY3") return "3일";
  else if (date === "WEEK1") return "1주일";
  else if (date === "WEEK2") return "2주일";
  else if (date === "WEEK4") return "4주일";
  else if (date === "FOREVER") return "영구벤";
};

const Ban = ({ history }) => {
  const info = history.location.search.replace("?", "").split(",");
  const id = info[0];
  const number = info[3];
  const reason = getReason(info[2]);
  const long = getDate(info[1]);
  const date = info[4];
  return (
    <Wrapper>
      <Title>닉네임 : {id}</Title>
      <Title>제제일 : {date}</Title>
      <Title>제제형량 : {long}</Title>
      <Title>누적제제 : {number}</Title>
      <Title>제제사유 : </Title>
      {reason !== undefined
        ? reason.split("\n").map((item, idx) => {
            return (
              <Content key={idx}>
                {item}
                <br />
              </Content>
            );
          })
        : null}
    </Wrapper>
  );
};
export default withRouter(Ban);
