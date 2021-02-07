import React from "react";
import styled from "styled-components";
import {
  FacebookShareButton,
  LineShareButton,
  TumblrShareButton,
  TwitterShareButton,
  FacebookIcon,
  LineIcon,
  TumblrIcon,
  TwitterIcon,
} from "react-share";
const ShareWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  flex: 1;
`;

export default ({ pathname }) => {
  return (
    <ShareWrapper>
      <FacebookShareButton url={pathname}>
        <FacebookIcon size={28} round={true} />
      </FacebookShareButton>
      <LineShareButton url={pathname}>
        <LineIcon size={28} round={true} />
      </LineShareButton>
      <TumblrShareButton url={pathname}>
        <TumblrIcon size={28} round={true} />
      </TumblrShareButton>
      <TwitterShareButton url={pathname}>
        <TwitterIcon size={28} round={true} />
      </TwitterShareButton>
    </ShareWrapper>
  );
};
