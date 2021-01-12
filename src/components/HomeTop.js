import React from "react";
import styled from "styled-components";
import { Ddabong, View } from "./../Components/Icons";
import { Link } from "react-router-dom";
import { CategoryListTypeA } from "./Util";
import { useQuery } from "@apollo/client";
import { gql } from "@apollo/client";

const TopStyledLink = styled(Link)`
  text-decoration: none;
  color: black;
  font-size: 18px;
  width: 75%;
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
    width: 75%;
    height: 18px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    font-family: Roboto;
  }
`;

const TopTextBox = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 18px;
  margin: 2% auto 2% auto;
`;

const CategoryBox = styled(Link)`
  text-decoration: none;
  font-size: 13px;
  color: #818181;
  border: 1px solid #cecece;
  margin: 0 3% 0 0;
  padding: 1%;
  height: 25px;
  width: 10%;
  &:focus,
  &:hover,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
    font-size: 13px;
    color: #818181;
    border: 1px solid #cecece;
    margin: 0 3% 0 0;
    padding: 1%;
    height: 25px;
    width: auto;
  }
`;

const CategoryTitleWrapper = styled.div`
  display: flex;
  width: 80%;
  height: 100%;
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
  const HOMETOP_QUERY = gql`
    query homeTop {
      homeTop {
        id
        category
        title
        likeAll
        viewAll
      }
    }
  `;
  const { data, loading, error } = useQuery(HOMETOP_QUERY, {
    notifyOnNetworkStatusChange: true,
  });

  return (
    <div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        data.homeTop.map((item, idx) => (
          <TopTextBox key={idx}>
            <CategoryTitleWrapper>
              <CategoryBox
                to={
                  "/Board?" +
                  CategoryListTypeA.find((x) => x.name === item.category)
                    .emoji +
                  CategoryListTypeA.find((x) => x.name === item.category).name
                }
              >
                {item.category}
              </CategoryBox>
              <TopStyledLink to={"/Post?" + item.id}>
                {item.title}
              </TopStyledLink>
            </CategoryTitleWrapper>
            <InfoWrapper>
              <Ddabong />
              <LikeView>
                {item.likeAll.toLocaleString(undefined, {
                  maximumFractionDigits: 0,
                })}
              </LikeView>
              <View />
              <LikeView>
                {item.viewAll.toLocaleString(undefined, {
                  maximumFractionDigits: 0,
                })}
              </LikeView>
            </InfoWrapper>
          </TopTextBox>
        ))
      )}
    </div>
  );
};
