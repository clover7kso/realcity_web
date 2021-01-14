import React from "react";
import styled, { ThemeProvider } from "styled-components";
import { HashRouter as Router } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import GlobalStyles from "../Styles/GlobalStyles";
import Theme from "../Styles/Theme";
import Routes from "./Routes";
import Footer from "./Footer";
import Header from "./Header";
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
  //const { data: { isLoggedIn }, } = useQuery(QUERY);

  const {
    data: { isLoggedIn },
  } = { data: { isLoggedIn: true } };

  return (
    <ThemeProvider theme={Theme}>
      <>
        <GlobalStyles />
        <Router>
          <>
            {isLoggedIn && <Header />}
            <Wrapper
              paddingLeft={isPC() ? null : "3%"}
              paddingRight={isPC() ? null : "3%"}
            >
              <Routes isLoggedIn={isLoggedIn} />
              <Footer />
            </Wrapper>
          </>
        </Router>
        <ToastContainer position={toast.POSITION.BOTTOM_LEFT} />
      </>
    </ThemeProvider>
  );
};
