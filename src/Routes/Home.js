import React from "react";
import styled from "styled-components";
import Input from "../Components/Input";

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  min-height: 80vh;
`;

const MainWrapper = styled.div`
  width:100%
  display: flex;
  flex-direction: column;
  align-items: left;
`;

const SideWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SearchInput = styled(Input)`
  border-color:black
  background-color: ${(props) => props.theme.bgColor};
  padding: 15px;
  font-size: 30px;
  border-radius: 50px;
  height: auto;
  text-align: left;
  padding-left:40px
  width: 100%;
  &::placeholder {
    color:black
    font-weight: 200;
  }
`;

export default () => {
  return (
    <Wrapper>
      <MainWrapper>
        <SearchInput
          placeholder="관심있는 내용을 검색해주세요"
          required="true"
          type="text"
        />
      </MainWrapper>

      <SideWrapper></SideWrapper>
    </Wrapper>
  );
};
