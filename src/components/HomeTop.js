import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { gql } from "@apollo/client";
import Loader from "./Loader";
import { CategoryListTypeA } from "./Util";
import { PC } from "./MediaQuery";
import { isPC } from "./MediaQuery";

const CategoryBox = styled(Link)`
  text-decoration: none;
  font-size: 13px;
  color: #818181;
  border: 1px solid #cecece;
  padding: 3px;
  margin-right: 10px;
  white-space: nowrap;
`;

const TitleBar = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #cecece;
  align-items:baseline
  padding: 10px 0 10px 0px;
  margin: 0 0 10px 0;
`;

const Title = styled(Link)`
  font-size: 24px;
  font-weight: bold;
  color: black;
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
  width: 100%
  height: 15%;
  min-height: 15%;
  padding-right: ${(props) => (props.paddingRight ? props.paddingRight : "3%")};
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
`;

const NormalTextBox = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 18px;
  margin: 15px 0 15px 0;
`;

const LikeView = styled.span`
  text-align: center;
  margin-left: 5px;
  margin-right: 10px;
  color: #818181;
`;

const CommentCount = styled.span`
  text-align: left;
  margin-right: 10px;
  margin-left: 5px;
  color: #818181;
  flex-grow: 1;
  display: flex;
  align-items: flex-end;
`;

const InfoWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
`;

const InfoIcon = styled.img`
  object-fit: cover;
  width:15px
  height:15px
  margin-right:5px
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
        commentCount
      }
    }
  `;
  const { data, loading } = useQuery(HOMETOP_QUERY, {
    notifyOnNetworkStatusChange: true,
  });
  const pcCheck = isPC();

  return (
    <NormalPostWrapper>
      {loading || data === undefined ? (
        <Loader />
      ) : (
        <NormalPost paddingRight={pcCheck ? "3%" : "0%"}>
          <TitleBar>
            <Title to={"/Board?👑 실시간 인기글"}>{"👑 실시간 인기글"}</Title>
            <NormalMoreView to={"/Board?👑 실시간 인기글"}>
              더보기 &gt;
            </NormalMoreView>
          </TitleBar>
          {data.homeTop.map((item, idx) => {
            return (
              <NormalTextBox key={idx}>
                <PC>
                  <CategoryBox
                    to={
                      "/Board?" +
                      CategoryListTypeA.find((x) => x.name === item.category)
                        .emoji +
                      CategoryListTypeA.find((x) => x.name === item.category)
                        .name
                    }
                  >
                    {item.category}
                  </CategoryBox>
                </PC>
                <StyledLink to={"/Post?" + item.id}>{item.title}</StyledLink>
                <CommentCount>[{item.commentCount}]</CommentCount>
                <InfoWrapper>
                  <InfoIcon src={require("../Image/info_like.png")} />
                  <LikeView>
                    {item.likeAll.toLocaleString(undefined, {
                      maximumFractionDigits: 0,
                    })}
                  </LikeView>
                  <InfoIcon src={require("../Image/info_view.png")} />
                  <LikeView>
                    {item.viewAll.toLocaleString(undefined, {
                      maximumFractionDigits: 0,
                    })}
                  </LikeView>
                </InfoWrapper>
              </NormalTextBox>
            );
          })}
        </NormalPost>
      )}
    </NormalPostWrapper>
  );
};
