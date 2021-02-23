import React from "react";
import styled from "styled-components";
import { withRouter } from "react-router-dom";
import {
  footerDataPrivacy,
  footerDataService,
  footerDataRule,
  footerDataProtect,
  footerDataContact,
} from "../Components/Util";
const Wrapper = styled.div`
  max-width: 935px;
  display: flex;
  flex-direction: column;
  min-height: 80vh;
`;

const Title = styled.span`
  margin-top: 10px;
  margin-bottom: 10px;
  font-size: 30px;
  font-weight: bold;
`;

const Content = styled.span`
  font-size: 25px;
`;

const getTitle = (info) => {
  if (info === "privacy") return "개인정보처리방침";
  else if (info === "service") return "서비스소개";
  else if (info === "rule") return "이용약관";
  else if (info === "protect") return "청소년보호정책";
  else if (info === "contact") return "고객센터";
  else return "잘못된 경로입니다.";
};

const getInfo = (info) => {
  if (info === "privacy") return footerDataPrivacy;
  else if (info === "service") return footerDataService;
  else if (info === "rule") return footerDataRule;
  else if (info === "protect") return footerDataProtect;
  else if (info === "contact") return footerDataContact;
  else return "뒤로 돌아가기를 눌러주세요.";
};

const FooterInfo = ({ history }) => {
  const info = history.location.search.replace("?", "");
  const content = getInfo(info);
  return (
    <Wrapper>
      <Title>{getTitle(info)}</Title>
      <Content dangerouslySetInnerHTML={{ __html: content }} />
    </Wrapper>
  );
};
export default withRouter(FooterInfo);
