import React from "react";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import styled from "styled-components";
import { isPC } from "./MediaQuery";

const Wrapper = styled.div`
  width: ${(props) => props.width};
  margin-right: ${(props) => props.marginRight};
  cursor: pointer;
  padding-bottom: ${(props) => props.paddingBottom};
  padding-top: ${(props) => props.paddingTop};
`;

const GoogleImg = styled.img`
  resize-mode: contain;
  width: 100%;
  height: 100%;
  alt: NaverLogin;
`;

const clientId = "2863229327223936";

export default function FacebookButton({ onSocial }) {
  const onSuccess = async (response) => {
    //console.log(response);

    const { userID, email } = response;

    await onSocial({
      socialId: userID,
      socialType: "facebook",
      email,
    });
  };

  var checkPC = isPC();

  return (
    <div>
      <FacebookLogin
        appId={clientId}
        autoLoad={false}
        fields="email"
        callback={onSuccess}
        render={(props) => (
          <Wrapper
            width={checkPC ? "52px" : "35px"}
            marginRight={checkPC ? "7px" : "2px"}
            paddingBottom={checkPC ? "5px" : "0px"}
            paddingTop={checkPC ? "0px" : "2px"}
            onClick={props.onClick}
          >
            <GoogleImg src={require("../Image/facebook_small_white.png")} />
          </Wrapper>
        )}
      />
    </div>
  );
}
