import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { View } from "./../Components/Icons";
import { CategoryListTypeA } from "./Util";
import { Ddabong } from "./../Components/Icons";
import { useQuery } from "@apollo/client";
import { gql } from "@apollo/client";
import Loader from "./Loader";

const TitleBar = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #cecece;
  align-items:baseline
  padding: 10px 0 10px 10px;
  margin: 0 0 10px 0;
`;

const Title = styled.span`
  font-size: 24px;
  font-weight: bold;
`;

const NormalMoreView = styled(Link)`
  color: grey;
  font-size: 15px;
  text-align: right;
  background-color: transparent;
  border-color: transparent;
  cursor: pointer;
  outline: 0;
`;

const NormalPost = styled.div`
  width: 50%;
  height: 15%;
  min-height: 15%;
  padding-right: 3%;
  flex: 1 1 40%;
`;

const NormalPostWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: black;
  font-size: 18px;
  height: 18px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-family: Roboto;
  &:focus,
  &:hover,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
    color: black;
    font-size: 18px;
    height: 18px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    font-family: Roboto;
  }
`;

const NormalTextBox = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 18px;
  margin: 4% 0 4% 0;
`;

const LikeView = styled.span`
  text-align: center;
  margin-left: 5px;
  margin-right: 10px;
  color: #818181;
`;
const InfoWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
`;

export default () => {
  const HOMENORMAL_QUERY = gql`
    query homeNormal {
      homeNormal {
        id
        category
        title
        likeAll
        viewAll
      }
    }
  `;
  const { data, loading } = useQuery(HOMENORMAL_QUERY, {
    notifyOnNetworkStatusChange: true,
  });

  return (
    <NormalPostWrapper>
      {loading || data === undefined ? (
        <Loader />
      ) : (
        CategoryListTypeA.map((item, idx) => (
          <NormalPost key={idx}>
            <TitleBar>
              <Title>
                {item.emoji}
                {item.name}
              </Title>
              <NormalMoreView to={"/Board?" + item.emoji + item.name}>
                더보기 &gt;
              </NormalMoreView>
            </TitleBar>
            {data.homeNormal.map((item1, idx1) => {
              return item.name === item1.category ? (
                <NormalTextBox key={idx1}>
                  <StyledLink to={"/Post?" + item1.id}>
                    {item1.title}
                  </StyledLink>
                  <InfoWrapper>
                    <Ddabong />
                    <LikeView>
                      {item1.likeAll.toLocaleString(undefined, {
                        maximumFractionDigits: 0,
                      })}
                    </LikeView>
                    <View />
                    <LikeView>
                      {item1.viewAll.toLocaleString(undefined, {
                        maximumFractionDigits: 0,
                      })}
                    </LikeView>
                  </InfoWrapper>
                </NormalTextBox>
              ) : null;
            })}
          </NormalPost>
        ))
      )}
    </NormalPostWrapper>
  );
};
