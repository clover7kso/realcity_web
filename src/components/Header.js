import React from "react";
import styled from "styled-components";
import { Link, withRouter } from "react-router-dom";
import { Logo, SmallLogo } from "./Icons";
import { isPC } from "./MediaQuery";
import Headroom from "react-headroom";

const Button = styled.button`
  width: 110px;
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
background:white;
  height:100px
  display: flex;
  justify-content:center;
  align-items:center
`;

const InWrapper = styled.div`
  display: flex;
  padding-left: ${(props) => (props.paddingLeft ? props.paddingLeft : "auto")};
  padding-right: ${(props) =>
    props.paddingRight ? props.paddingRight : "auto"};
  width: ${(props) => props.theme.maxWidth};
`;

const HeaderColumn = styled.div`
  width: 33%;
  &:first-child {
    margin-right: auto;
    text-align: left;
  }
  &:last-child {
    margin-left: auto;
    text-align: right;
  }
`;

const HeaderLink = styled(Link)`
  &:not(:last-child) {
    margin-right: 30px;
  }
`;

export default withRouter(({ history, location }) => {
  var pcCheck = isPC();
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
