import React from "react";
import NaverLogin from "react-login-by-naver";
import styled from "styled-components";
import { isPC } from "./MediaQuery";

const Wrapper = styled.div`
  width: ${(props) => props.width};
  margin-right: ${(props) => props.marginRight};
  cursor: pointer;
`;

const NaverImg = styled.img`
  resize-mode: contain;
  width: 100%;
  height: 100%;
  alt: NaverLogin;
`;

const clientId = "ke57bxzi1WKiJlqXYwFk";

export default function NaverButton({ onSocial }) {
  const onSuccess = async (response) => {
    //console.log(response);

    const { id, email, name } = response;

    await onSocial({
      socialId: id,
      socialType: "naver",
      email,
      nickname: name,
    });
  };

  const onFailure = (error) => {
    //console.log("Naver Login Fail");
    //console.log(error);
  };

  var checkPC = isPC();

  return (
    <div>
      <NaverLogin
        clientId={clientId}
        callbackUrl="https://realcitykr.com"
        render={(props) => (
          <Wrapper
            width={checkPC ? "52px" : "35px"}
            marginRight={checkPC ? "6px" : "2px"}
            onClick={props.onClick}
          >
            <NaverImg src={require("../Image/naver_small_white.png")} />
          </Wrapper>
        )}
        onSuccess={(response) => onSuccess(response)}
        onFailure={(result) => onFailure(result)}
      />
    </div>
  );
}
