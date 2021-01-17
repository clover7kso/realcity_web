import React from "react";
import styled from "styled-components";
import {
  EmailShareButton,
  FacebookShareButton,
  InstapaperShareButton,
  LineShareButton,
  LinkedinShareButton,
  TelegramShareButton,
  TumblrShareButton,
  TwitterShareButton,
  EmailIcon,
  FacebookIcon,
  InstapaperIcon,
  LineIcon,
  LinkedinIcon,
  TelegramIcon,
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
      <EmailShareButton url={pathname}>
        <EmailIcon size={28} round={true} />
      </EmailShareButton>
      <FacebookShareButton url={pathname}>
        <FacebookIcon size={28} round={true} />
      </FacebookShareButton>
      <InstapaperShareButton url={pathname}>
        <InstapaperIcon size={28} round={true} />
      </InstapaperShareButton>
      <LineShareButton url={pathname}>
        <LineIcon size={28} round={true} />
      </LineShareButton>
      <LinkedinShareButton url={pathname}>
        <LinkedinIcon size={28} round={true} />
      </LinkedinShareButton>
      <TelegramShareButton url={pathname}>
        <TelegramIcon size={28} round={true} />
      </TelegramShareButton>
      <TumblrShareButton url={pathname}>
        <TumblrIcon size={28} round={true} />
      </TumblrShareButton>
      <TwitterShareButton url={pathname}>
        <TwitterIcon size={28} round={true} />
      </TwitterShareButton>
    </ShareWrapper>
  );
};
