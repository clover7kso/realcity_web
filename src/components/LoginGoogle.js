import React from "react";
import GoogleLogin from "react-google-login";
import styled from "styled-components";

const Wrapper = styled.div`
  width: ${(props) => props.width};
  margin-right: 10px;
`;

const GoogleImg = styled.img`
  resize-mode: contain;
  width: 100%;
  height: 100%;
  alt: NaverLogin;
`;

const clientId =
  "289117987786-glcqi2k8afv23t5ffvimap68vd05avkm.apps.googleusercontent.com";

export default function GoogleButton({ onSocial }) {
  const onSuccess = async (response) => {
    //console.log(response);

    const {
      googleId,
      profileObj: { email, name },
    } = response;

    await onSocial({
      socialId: googleId,
      socialType: "google",
      email,
      nickname: name,
    });
  };

  const onFailure = (error) => {
    //console.log(error);
  };

  return (
    <div>
      <GoogleLogin
        clientId={clientId}
        responseType={"id_token"}
        render={(props) => (
          <Wrapper width={"52px"} onClick={props.onClick}>
            <GoogleImg src={require("../Image/google_small_white.png")} />
          </Wrapper>
        )}
        onSuccess={onSuccess}
        onFailure={onFailure}
      />
    </div>
  );
}
