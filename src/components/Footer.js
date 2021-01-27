import React from "react";
import styled from "styled-components";

const Footer = styled.footer`
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-transform: uppercase;
  font-weight: 600;
  font-size: 12px;
  margin: 50px 0px;
`;

const List = styled.ul`
  display: flex;
`;

const ListItem = styled.li`
  &:not(:last-child) {
    margin-right: 16px;
  }
`;

const Link = styled.a`
  color: ${(props) => props.theme.darkBlueColor};
`;

const Copyright = styled.span`
  color: ${(props) => props.theme.darkGreyColor};
`;

export default () => (
  <Footer>
    <List>
      <ListItem>
        <Link href="/FooterInfo?privacy">개인정보취급방침</Link>
      </ListItem>
      <ListItem>
        <Link href="/FooterInfo?service">서비스소개</Link>
      </ListItem>
      <ListItem>
        <Link href="/FooterInfo?rule">이용약관</Link>
      </ListItem>
      <ListItem>
        <Link href="/FooterInfo?protect">청소년보호정책</Link>
      </ListItem>
    </List>
    <Copyright>Real City {new Date().getFullYear()} &copy;</Copyright>
  </Footer>
);
