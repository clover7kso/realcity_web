import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useQuery } from "@apollo/client";
import { gql } from "@apollo/client";
import Loader from "./Loader";

const ZzalBox = styled(Link)`
  display: flex;
  flex-direction: column;
`;

const Zzal = styled.img`
  max-width: 100%;
  height: auto;
`;

const ZzalWrapper = styled.div`
  border-radius: 20px;
  margin: 20px 0 10px 0;
  width: 100%;
  height: 200px;
  overflow: hidden;
`;

const ZzalTitle = styled.span`
  min-width: 100%;
  font-size: 18px;
  color: black;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  padding: 0 0 3px 0;
`;

const ZzalView = styled.span`
  min-width: 100%;
  font-size: 13px;
  color: #818181;
  text-align: right;
`;

const InfoIcon = styled.img`
  object-fit: cover;
  width:15px
  height:15px
  margin-right:5px
`;

const LikeView = styled.span`
  text-align: center;
  margin-left: 5px;
  margin-right: 10px;
  color: #818181;
`;

export default () => {
  const HOMEZZAL_QUERY = gql`
    query homeZzal {
      homeZzal {
        id
        title
        thumbnail
        likeAll
      }
    }
  `;
  const { data, loading } = useQuery(HOMEZZAL_QUERY, {
    notifyOnNetworkStatusChange: true,
  });
  return loading || data === undefined ? (
    <Loader />
  ) : (
    data.homeZzal.map((item, idx) => (
      <ZzalBox key={idx} to={"/post?id=" + item.id}>
        <ZzalWrapper>
          <Zzal style={{ resizeMode: "contain" }} src={item.thumbnail} />
        </ZzalWrapper>
        <ZzalTitle to={"/post?id=" + item.id}>{item.title}</ZzalTitle>
        <ZzalView>
          <InfoIcon src={require("../Image/info_like.png")} />
          <LikeView>
            {item.likeAll.toLocaleString(undefined, {
              maximumFractionDigits: 0,
            })}
          </LikeView>
        </ZzalView>
      </ZzalBox>
    ))
  );
};
