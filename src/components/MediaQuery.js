import React, { Fragment } from "react";
import { useMediaQuery } from "react-responsive";

export const Mobile = ({ children }) => {
  const isMobile = useMediaQuery({
    query: "(max-width:767px)",
  });
  return <Fragment>{isMobile && children}</Fragment>;
};

export const Tablet = ({ children }) => {
  const isTablet = useMediaQuery({
    query: "(min-width:768x)",
  });
  return <Fragment>{isTablet && children}</Fragment>;
};

export const PC = ({ children }) => {
  const isPC = useMediaQuery({
    query: "(min-width:1024px)",
  });
  return <Fragment>{isPC && children}</Fragment>;
};

export const PCWide = ({ children }) => {
  const isPCWide = useMediaQuery({
    query: "(min-width:1280px)",
  });
  return <Fragment>{isPCWide && children}</Fragment>;
};

export const isMobile = () => useMediaQuery({ query: "(max-width:767px)" });
export const isTablet = () => useMediaQuery({ query: "(min-width:768x)" });
export const isPC = () => {
  console.log(useMediaQuery({ query: "(min-width:1024px)" }));
  return useMediaQuery({ query: "(min-width:1024px)" });
};
export const isPCWide = () => useMediaQuery({ query: "(min-width:1280px)" });
