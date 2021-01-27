import React from "react";
import styled from "styled-components";
import { isPC, PC } from "../Components/MediaQuery";

const Footer = styled.footer`
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-transform: uppercase;
  font-weight: ${(props) => props.fontWeight};
  font-size: ${(props) => props.fontSize};
  margin: 50px 0px;
`;

const List = styled.ul`
  display: flex;
`;

const ListItem = styled.li`
  white-space: nowrap;
  &:not(:last-child) {
    margin-right: ${(props) => props.marginRight};
  }
`;

const Link = styled.a`
  white-space: nowrap;
  color: ${(props) => props.theme.darkBlueColor};
`;

const Copyright = styled.span`
  color: ${(props) => props.theme.darkGreyColor};
`;

export default () => {
  var PCcheck = isPC();
  return (
    <Footer
      fontSize={PCcheck ? "12px" : "2px"}
      fontWeight={PCcheck ? "600" : "400"}
    >
      <List>
        <ListItem marginRight={PCcheck ? "16px" : "5px"}>
          <Link href="/FooterInfo?privacy">개인정보처리방침</Link>
        </ListItem>
        <ListItem marginRight={PCcheck ? "16px" : "5px"}>
          <PC>
            <Link href="/FooterInfo?service">서비스소개</Link>
          </PC>
        </ListItem>
        <ListItem marginRight={PCcheck ? "16px" : "5px"}>
          <Link href="/FooterInfo?rule">이용약관</Link>
        </ListItem>
        <ListItem marginRight={PCcheck ? "16px" : "5px"}>
          <Link href="/FooterInfo?protect">청소년보호정책</Link>
        </ListItem>
      </List>
      <Copyright>Real City {new Date().getFullYear()} &copy;</Copyright>
    </Footer>
  );
};
