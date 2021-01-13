import React from "react";
import styled from "styled-components";
import ScrollMenu from "react-horizontal-scrolling-menu";
import { Link } from "react-router-dom";
import { LeftArrowIcon, RightArrowIcon } from "./Icons";

const SelectedMenu = styled.div`
  color:black;
  font-size: 18px;
  font-weight: bold;
  padding-left:7px
  padding-right: 7px;
  padding-bottom:7px
  background:white
  border-bottom: 2px solid black;
  cursor: pointer;
`;
const UnselectedMenu = styled(Link)`
  color:grey;
  font-size: 18px;
  padding-left:7px
  padding-right:7px
  padding-bottom:7px
  background:white
  border-bottom: 2px solid grey;
  cursor: pointer;
  user-drag: none; 
`;
const ArrowBtn = styled.button`
  background: white;
  border: 0px;
  cursor: pointer;
`;

const Arrow = ({ text, className }) => {
  return (
    <ArrowBtn
      style={{
        margin: text === "left" ? "0px 0px 0px 0px" : "0px 0px 0px 5px",
      }}
      className={className}
    >
      {text === "left" ? <LeftArrowIcon /> : <RightArrowIcon />}
    </ArrowBtn>
  );
};

const ArrowLeft = Arrow({ text: "left", className: "arrow-prev" });
const ArrowRight = Arrow({ text: "right", className: "arrow-next" });

// One item component
// selected prop will be passed
const MenuItem = ({ text, selected }) => {
  return selected ? (
    <SelectedMenu>{text}</SelectedMenu>
  ) : (
    <UnselectedMenu to={"/Board?" + text}>{text}</UnselectedMenu>
  );
};

// All items component
// Important! add unique key
export const Menu = (list, selected) =>
  list.map((el) => {
    const { name } = el;

    return <MenuItem text={name} key={name} selected={selected} />;
  });

export const MyScrollMenu = ({ data, selected, onSelect }) => {
  return (
    <ScrollMenu
      data={data}
      alignCenter={false}
      selected={selected}
      onSelect={onSelect}
      scrollToSelected={true}
      arrowLeft={ArrowLeft}
      arrowRight={ArrowRight}
    />
  );
};
