import React, { useState } from "react";
import styled from "styled-components";
import { Link, withRouter } from "react-router-dom";
import { Logo, SmallLogo } from "./Icons";
import { isPC } from "./MediaQuery";
import Headroom from "react-headroom";
import LoginGoogle from "./LoginGoogle";
import LoginNaver from "./LoginNaver";
import { useMutation } from "@apollo/client";
import { gql } from "@apollo/client";
import { getLevel } from "./Util";

const Button = styled.button`
  width: 100px;
  height: ${(props) => (props.height ? props.height : "50px")};
  border: 0;
  border-radius: ${(props) => props.theme.borderRadius};
  color: white;
  font-weight: 400;
  background-color: #4A4848
  text-align: center;
  padding-top: 5px;
  padding-bottom: 5px;
  font-size: 20px;
  cursor: pointer;
`;

const HeaderWrapper = styled.div`
  background: white;
  height: 120px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const InWrapper = styled.div`
  display: flex;
  padding-left: ${(props) => (props.paddingLeft ? props.paddingLeft : "auto")};
  padding-right: ${(props) =>
    props.paddingRight ? props.paddingRight : "auto"};
  width: ${(props) => props.theme.maxWidth};
  justify-content: space-between;
`;

const HeaderColumn = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
`;

const HeaderLink = styled(Link)``;

const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: right;
  height: 40px;
  margin-right: 15px;
  width: min-content;
`;

const InfoTopWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: baseline;
`;

const InfoBottomWrapper = styled.div`
  display: flex;
  flex-direction:row
  justify-content: flex-end;
`;

const Nickname = styled.div`
  white-space: nowrap;
  font-size: 20px;
  font-weight: bold;
`;

const Level = styled.div`
  margin-right: 10px;
  white-space: nowrap;
  font-size: 14px;
  font-weight: bold;
`;

const Logout = styled.div`
  white-space: nowrap;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  text-decoration: underline;
`;

export default withRouter(({ history, location }) => {
  const [toggle, setToggle] = useState(true);

  const LOGIN = gql`
    mutation login($socialId: String!, $socialType: String!) {
      login(socialId: $socialId, socialType: $socialType) {
        id
        nickname
        socialId
        point
      }
    }
  `;

  var pcCheck = isPC();

  const [social, setSocial] = useState(null);

  const [loginMutation] = useMutation(LOGIN);
  const socialLogin = async () => {
    const result = await loginMutation({
      variables: {
        socialId: social.socialId,
        socialType: social.socialType,
      },
    });
    if (result.data.login === null) {
      history.push("/Register", [
        social.socialId,
        social.socialType,
        social.email,
      ]);
      setSocial(null);
    } else {
      window.sessionStorage.setItem("id", result.data.login.socialId);
      window.sessionStorage.setItem("nickname", result.data.login.nickname);
      window.sessionStorage.setItem("point", result.data.login.point);
      setSocial(null);
    }
  };

  if (social !== null) socialLogin();

  return (
    <Headroom>
      <HeaderWrapper>
        <InWrapper
          paddingLeft={pcCheck ? null : "3%"}
          paddingRight={pcCheck ? null : "3%"}
        >
          <HeaderColumn>
            <Link to="/">{pcCheck ? <Logo /> : <SmallLogo />}</Link>
          </HeaderColumn>
          <HeaderColumn>
            {location.pathname ===
            "/Register" ? null : window.sessionStorage.getItem("id") &&
              window.sessionStorage.getItem("nickname") ? (
              <InfoWrapper>
                <InfoTopWrapper>
                  <Level>
                    LV. {getLevel(window.sessionStorage.getItem("point"))}
                  </Level>
                  <Nickname>
                    {window.sessionStorage.getItem("nickname")}
                  </Nickname>
                </InfoTopWrapper>
                <InfoBottomWrapper>
                  <Logout
                    onClick={() => {
                      window.sessionStorage.clear();
                      setToggle(!toggle);
                    }}
                  >
                    로그아웃
                  </Logout>
                </InfoBottomWrapper>
              </InfoWrapper>
            ) : (
              <>
                <LoginGoogle onSocial={(onSocial) => setSocial(onSocial)} />
                <LoginNaver onSocial={(onSocial) => setSocial(onSocial)} />
              </>
            )}
            {location.pathname !== "/Writer" ? (
              <HeaderLink to="/Writer">
                <Button height={pcCheck ? null : "50px"}>글쓰기</Button>
              </HeaderLink>
            ) : null}
          </HeaderColumn>
        </InWrapper>
      </HeaderWrapper>
    </Headroom>
  );
});
