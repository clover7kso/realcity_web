import React from "react";
import styled from "styled-components";
import ScrollMenu from "react-horizontal-scrolling-menu";

const SelectedMenu = styled.button`
  font-size: 23px;
  font-weight: bold;
  padding-left:7px
  padding-right: 7px;
  padding-bottom:7px
  border:none
  background:white
  border-bottom: 4px solid black;
  cursor: pointer;  
  outline: 0;
`;
const UnselectedMenu = styled.button`
  font-size: 23px;
  padding-left:7px
  padding-right:7px
  padding-bottom:7px
  border:none
  background:white
  border-bottom: 4px solid grey;
  cursor: pointer;  
  outline: 0;
`;
// One item component
// selected prop will be passed
const MenuItem = ({ text, selected }) => {
  return selected ? (
    <SelectedMenu>{text}</SelectedMenu>
  ) : (
    <UnselectedMenu>{text}</UnselectedMenu>
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
    />
  );
};
