import React, { useState } from "react";
import styled from "styled-components";
import { Link, withRouter } from "react-router-dom";
import { Logo } from "./Icons";
import Headroom from "react-headroom";
import LoginGoogle from "./LoginGoogle";
import LoginNaver from "./LoginNaver";
import { useMutation } from "@apollo/client";
import { gql } from "@apollo/client";
import { getLevel, getPercentage, getRemain } from "./Util";
import LiquidGauge from "./LiquidGauge";
import { useAlert } from "react-alert";

const Button = styled.button`
  width: 80px;
  height:50px;
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
  margin-right: ${(props) => props.marginRight};
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

const InfoOutWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin-right: 15px;
`;

const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: right;
  height: 40px;
  margin-right: 15px;
`;

const InfoTopWrapper = styled(Link)`
  color: black;
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
  const [show, setShow] = useState(
    history.location.hash.includes("access_token")
  );

  const showLogin = (event) => {
    event.preventDefault();
    setShow(true);
    document.addEventListener("click", closeLogin);
  };
  const closeLogin = (event) => {
    setShow(false);
    document.removeEventListener("click", closeLogin);
  };

  const LOGIN = gql`
    mutation login($socialId: String!, $socialType: String!) {
      login(socialId: $socialId, socialType: $socialType) {
        id
        nickname
        point
        socialId
        socialType
      }
    }
  `;

  const GETME = gql`
    mutation getMe($id: String!) {
      getMe(id: $id) {
        nickname
        point
      }
    }
  `;

  const [social, setSocial] = useState(null);

  const [loginMutation] = useMutation(LOGIN);
  const [getMeMutation] = useMutation(GETME);
  const alert = useAlert();

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
      window.sessionStorage.setItem("id", result.data.login.id);
      window.sessionStorage.setItem("nickname", result.data.login.nickname);
      window.sessionStorage.setItem("point", result.data.login.point);
      window.location.reload();
      setSocial(null);
    }
  };
  const socialLogout = async () => {
    window.sessionStorage.clear();
    window.location.reload();
    setToggle(!toggle);
  };

  const refreshLevel = async () => {
    const result = await getMeMutation({
      variables: {
        id: window.sessionStorage.getItem("id"),
      },
    });
    window.sessionStorage.setItem("nickname", result.data.getMe.nickname);
    window.sessionStorage.setItem("point", result.data.getMe.point);
    setToggle(!toggle);
    alert.removeAll();
    alert.success("경험치가 새로고침되었습니다.");
    alert.success(
      "다음레벨까지 좋아요 " +
        getRemain(window.sessionStorage.getItem("point")) +
        " 가 남았습니다."
    );
  };

  if (social !== null) socialLogin();

  return (
    <Headroom>
      <HeaderWrapper>
        <InWrapper>
          <HeaderColumn>
            <Link to="/">
              <Logo />
            </Link>
          </HeaderColumn>
          <HeaderColumn>
            {location.pathname ===
            "/Register" ? null : window.sessionStorage.getItem("id") ? (
              <InfoOutWrapper>
                <InfoWrapper>
                  <InfoTopWrapper to="/My">
                    <Level>
                      Lv.{getLevel(window.sessionStorage.getItem("point"))}
                    </Level>
                    <Nickname>
                      {window.sessionStorage.getItem("nickname")}
                    </Nickname>
                  </InfoTopWrapper>
                  <InfoBottomWrapper>
                    <Logout onClick={() => socialLogout()}>로그아웃</Logout>
                  </InfoBottomWrapper>
                </InfoWrapper>

                <LiquidGauge
                  style={{ margin: "0" }}
                  radius={24}
                  value={getPercentage(window.sessionStorage.getItem("point"))}
                  onClick={() => {
                    refreshLevel();
                  }}
                />
              </InfoOutWrapper>
            ) : (
              <>
                {show ? (
                  <>
                    <LoginGoogle onSocial={(onSocial) => setSocial(onSocial)} />
                    <LoginNaver onSocial={(onSocial) => setSocial(onSocial)} />
                  </>
                ) : (
                  <Button marginRight="4px" onClick={(e) => showLogin(e)}>
                    로그인
                  </Button>
                )}
              </>
            )}
            {location.pathname !== "/Writer" ? (
              <HeaderLink to="/Writer">
                <Button>글쓰기</Button>
              </HeaderLink>
            ) : null}
          </HeaderColumn>
        </InWrapper>
      </HeaderWrapper>
    </Headroom>
  );
});
