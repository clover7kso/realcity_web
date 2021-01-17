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
        <Link href="#">서비스 소개</Link>
      </ListItem>
      <ListItem>
        <Link href="#">이용약관</Link>
      </ListItem>
      <ListItem>
        <Link href="#">개인정보 처리방침</Link>
      </ListItem>
    </List>
    <Copyright>Real City {new Date().getFullYear()} &copy;</Copyright>
  </Footer>
);
