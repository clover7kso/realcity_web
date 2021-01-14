import React from "react";
import styled from "styled-components";
import { Link, withRouter } from "react-router-dom";
import { Logo, SmallLogo } from "./Icons";
import { isPC } from "./MediaQuery";
import Headroom from "react-headroom";

const Button = styled.button`
  width: 130px;
  height: ${(props) => (props.height ? props.height : "50px")};
  border: 0;
  border-radius: ${(props) => props.theme.borderRadius};
  color: white;
  font-weight: 400;
  background-color: red
  text-align: center;
  padding: 5px;
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
  return (
    <Headroom>
      <HeaderWrapper>
        <InWrapper
          paddingLeft={isPC() ? null : "3%"}
          paddingRight={isPC() ? null : "3%"}
        >
          <HeaderColumn>
            <Link to="/">{isPC() ? <Logo /> : <SmallLogo />}</Link>
          </HeaderColumn>
          <HeaderColumn>
            {location.pathname !== "/Writer" ? (
              <HeaderLink to="/Writer">
                <Button height={isPC() ? null : "35px"}>글쓰기</Button>
              </HeaderLink>
            ) : null}
          </HeaderColumn>
        </InWrapper>
      </HeaderWrapper>
    </Headroom>
  );
});
