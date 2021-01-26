import React, { useState } from "react";
import styled from "styled-components";
import { Link, withRouter } from "react-router-dom";
import { SmallLogo } from "./Icons";
import Headroom from "react-headroom";
import LoginGoogle from "./LoginGoogle";
import LoginNaver from "./LoginNaver";
import { useMutation } from "@apollo/client";
import { gql } from "@apollo/client";
import { getLevel, getPercentage, getRemain } from "./Util";
import LiquidGauge from "./LiquidGauge";
import { useAlert } from "react-alert";

const Button = styled.button`
  width: 47px;
  height:35px;
  border: 0;
  border-radius: ${(props) => props.theme.borderRadius};
  color: white;
  font-weight: 400;
  background-color: #4A4848
  text-align: center;
  padding-top: 5px;
  padding-bottom: 5px;
  font-size: 10px;
  cursor: pointer;
  margin-right: ${(props) => props.marginRight};
`;

const HeaderWrapper = styled.div`
  padding-left: 3%;
  padding-right: 3%;
  background: white;
  height: 80px;
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
  margin-right: 5px;
`;

const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: right;
  height: 30px;
  margin-right: 5px;
  margin-top: 3px;
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
  font-size: 12px;
  font-weight: bold;
`;

const Level = styled.div`
  margin-right: 5px;
  white-space: nowrap;
  font-size: 6px;
  font-weight: bold;
`;

const Logout = styled.div`
  white-space: nowrap;
  font-size: 6px;
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
        BanManager {
          blockedUntil
          blockedReason
          blockedNum
          blockedDate
        }
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

  const [loginMutation] = useMutation(LOGIN);
  const [getMeMutation] = useMutation(GETME);
  const alert = useAlert();

  const socialLogin = async (social) => {
    if (social === null) return;
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
    } else {
      if (
        result.data.login.BanManager === null ||
        result.data.login.BanManager.blockedUntil === "NOPE" ||
        result.data.login.BanManager.blockedUntil === "NEED_MANAGING"
      ) {
        window.sessionStorage.setItem("id", result.data.login.id);
        window.sessionStorage.setItem("nickname", result.data.login.nickname);
        window.sessionStorage.setItem("point", result.data.login.point);
        window.location.reload();
      } else {
        const state = [
          result.data.login.nickname,
          result.data.login.BanManager.blockedUntil,
          result.data.login.BanManager.blockedReason,
          result.data.login.BanManager.blockedNum,
          result.data.login.BanManager.blockedDate,
        ];
        history.push({
          pathname: "/Ban",
          search: "?" + state,
        });
      }
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

  return (
    <Headroom>
      <HeaderWrapper>
        <InWrapper>
          <HeaderColumn>
            <Link to="/">
              <SmallLogo />
            </Link>
          </HeaderColumn>
          {location.pathname === "/Ban" ? null : (
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
                    radius={19}
                    value={getPercentage(
                      window.sessionStorage.getItem("point")
                    )}
                    onClick={() => {
                      refreshLevel();
                    }}
                  />
                </InfoOutWrapper>
              ) : (
                <>
                  {show ? (
                    <>
                      <LoginGoogle
                        onSocial={(onSocial) => socialLogin(onSocial)}
                      />
                      <LoginNaver
                        onSocial={(onSocial) => socialLogin(onSocial)}
                      />
                    </>
                  ) : (
                    <Button marginRight="2px" onClick={(e) => showLogin(e)}>
                      로그인
                    </Button>
                  )}
                </>
              )}
              {location.pathname !== "/Gamble" ? (
                <HeaderLink to="/Gamble">
                  <Button marginRight="2px">인생역전</Button>
                </HeaderLink>
              ) : null}
              {location.pathname !== "/Writer" ? (
                <HeaderLink to="/Writer">
                  <Button>글쓰기</Button>
                </HeaderLink>
              ) : null}
            </HeaderColumn>
          )}
        </InWrapper>
      </HeaderWrapper>
    </Headroom>
  );
});
