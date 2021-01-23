import React from "react";
import styled, { ThemeProvider } from "styled-components";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import GlobalStyles from "../Styles/GlobalStyles";
import Theme from "../Styles/Theme";
import MyRoutes from "./Routes";
import Footer from "./Footer";
import Header from "./Header";
import HeaderNotPC from "./HeaderNotPC";
import { isPC } from "./MediaQuery";

//const QUERY = gql`{isLoggedIn @client}`;

const Wrapper = styled.div`
  margin: 0 auto;
  max-width: ${(props) => props.theme.maxWidth};
  padding-left: ${(props) => (props.paddingLeft ? props.paddingLeft : "auto")};
  padding-right: ${(props) =>
    props.paddingRight ? props.paddingRight : "auto"};
  width: 100%;
`;

export default () => {
  return (
    <ThemeProvider theme={Theme}>
      <>
        <GlobalStyles />
        <BrowserRouter>
          <>
            {isPC() ? <Header /> : <HeaderNotPC />}
            <Wrapper
              paddingLeft={isPC() ? null : "3%"}
              paddingRight={isPC() ? null : "3%"}
            >
              <MyRoutes />
              <Footer />
            </Wrapper>
          </>
        </BrowserRouter>
        <ToastContainer position={toast.POSITION.BOTTOM_LEFT} />
      </>
    </ThemeProvider>
  );
};
