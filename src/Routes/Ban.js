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
    return "안녕하세요 리얼시티 회원님 'CM시티' 입니다.\n회원님이 작성하신 글(댓글)이 리얼시티 커뮤니티 가이드라인인 선정성에 위반되어 제재를 하게 되었습니다.\n밴이 풀리는 날짜는 위와 같이 확인이 가능합니다.";
  else if (reason === "ANTI")
    return "안녕하세요 리얼시티 회원님 'CM시티' 입니다.\n회원님이 작성하신 글(댓글)이 리얼시티 커뮤니티 가이드라인인 안티성에 위반되어 제재를 하게 되었습니다.\n밴이 풀리는 날짜는 위와 같이 확인이 가능합니다.";
  else if (reason === "GORE")
    return "안녕하세요 리얼시티 회원님 'CM시티' 입니다.\n회원님이 작성하신 글(댓글)이 리얼시티 커뮤니티 가이드라인인 혐오성에 위반되어 제재를 하게 되었습니다.\n밴이 풀리는 날짜는 위와 같이 확인이 가능합니다.";
  else if (reason === "COMMERCE")
    return "안녕하세요 리얼시티 회원님 'CM시티' 입니다.\n회원님이 작성하신 글(댓글)이 리얼시티 커뮤니티 가이드라인인 상업성에 위반되어 제재를 하게 되었습니다.\n밴이 풀리는 날짜는 위와 같이 확인이 가능합니다.";
  else if (reason === "SPAM")
    return "안녕하세요 리얼시티 회원님 'CM시티' 입니다.\n회원님이 작성하신 글(댓글)이 리얼시티 커뮤니티 가이드라인인 도배성에 위반되어 제재를 하게 되었습니다.\n밴이 풀리는 날짜는 위와 같이 확인이 가능합니다.";
  else if (reason === "ILLEGAL")
    return "안녕하세요 리얼시티 회원님 'CM시티' 입니다.\n회원님이 작성하신 글(댓글)이 리얼시티 커뮤니티 가이드라인인 범법성에 위반되어 제재를 하게 되었습니다.\n밴이 풀리는 날짜는 위와 같이 확인이 가능합니다.";
  else if (reason === "FRIEND")
    return "안녕하세요 리얼시티 회원님 'CM시티' 입니다.\n회원님이 작성하신 글(댓글)이 리얼시티 커뮤니티 가이드라인인 친목성에 위반되어 제재를 하게 되었습니다.\n커뮤니티 내에서의 친목을 하는 것은 좋으나 과도한 과시 및 추종은 자제 부탁드리겠습니다 :)\n밴이 풀리는 날짜는 위와 같이 확인이 가능합니다.";
  else if (reason === "OTHERS")
    return "기타 다른 이유 때문에 제제당하였습니다.";
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

function printDate(inputDate) {
  const today = inputDate;
  const dayNames = [
    "(일요일)",
    "(월요일)",
    "(화요일)",
    "(수요일)",
    "(목요일)",
    "(금요일)",
    "(토요일)",
  ];
  // getDay: 해당 요일(0 ~ 6)를 나타내는 정수를 반환한다.
  const day = dayNames[today.getDay()];
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const date = today.getDate();
  let hour = today.getHours();
  let minute = today.getMinutes();
  let second = today.getSeconds();
  const ampm = hour >= 12 ? "PM" : "AM";
  // 12시간제로 변경
  hour %= 12;
  hour = hour || 12; // 0 => 12
  // 10미만인 분과 초를 2자리로 변경
  minute = minute < 10 ? "0" + minute : minute;
  second = second < 10 ? "0" + second : second;
  const now = `${year}년 ${month}월 ${date}일 ${day} ${hour}:${minute}:${second} ${ampm}`;
  return now;
}

const Ban = ({ history }) => {
  const info = history.location.search.replace("?", "").split(",");
  const id = info[0];
  const number = info[3];
  const reason = getReason(info[2]);
  const long = getDate(info[1]);
  const date = info[4];
  const dateTransform = new Date(date);
  //console.log(printDate(dateTransform));
  return (
    <Wrapper>
      <Title>닉네임 : {id}</Title>
      <Title>제재일 : {printDate(dateTransform)}</Title>
      <Title>제재형량 : {long}</Title>
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
      <Content>밴은 재제 형량를 채운 후 00시 00분에 해제됩니다.</Content>
      <Content>감사합니다.</Content>
    </Wrapper>
  );
};
export default withRouter(Ban);
