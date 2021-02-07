import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { CategoryListTypeA } from "./Util";
import { useQuery } from "@apollo/client";
import { gql } from "@apollo/client";
import Loader from "./Loader";
import { isPC, PC } from "./MediaQuery";

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
  width: ${(props) => (props.width ? props.width : "50%")};
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
  font-size: 15px;
  height: 15px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-family: Roboto;
`;

const NormalTextBox = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 15px;
  margin: 10px 0 10px 0;
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
  const HOMENORMAL_QUERY = gql`
    query homeNormal {
      homeNormal {
        id
        category
        title
        likeAll
        viewAll
        commentCount
      }
    }
  `;
  const { data, loading } = useQuery(HOMENORMAL_QUERY, {
    notifyOnNetworkStatusChange: true,
  });

  const pcCheck = isPC();
  return (
    <NormalPostWrapper>
      {loading || data === undefined ? (
        <Loader />
      ) : (
        CategoryListTypeA.map((item, idx) => (
          <NormalPost
            width={pcCheck ? "50%" : "100%"}
            paddingRight={pcCheck ? "3%" : "0%"}
            key={idx}
          >
            <TitleBar>
              <Title to={"/Board?" + item.emoji + item.name}>
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
                  <StyledLink to={"/post?id=" + item1.id}>
                    {item1.title}
                  </StyledLink>
                  <CommentCount>[{item1.commentCount}]</CommentCount>
                  <InfoWrapper>
                    <InfoIcon src={require("../Image/info_like.png")} />
                    <LikeView>
                      {item1.likeAll.toLocaleString(undefined, {
                        maximumFractionDigits: 0,
                      })}
                    </LikeView>
                    <PC>
                      <InfoIcon src={require("../Image/info_view.png")} />
                      <LikeView>
                        {item1.viewAll.toLocaleString(undefined, {
                          maximumFractionDigits: 0,
                        })}
                      </LikeView>
                    </PC>
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
