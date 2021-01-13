import React from "react";
import { View } from "./../Components/Icons";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useQuery } from "@apollo/client";
import { gql } from "@apollo/client";

const ZzalBox = styled(Link)`
  display: flex;
  flex-direction: column;
`;

const Zzal = styled.img`
  border-radius: 20px;
  margin: 20px 0 10px 0;
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

export default () => {
  const HOMEZZAL_QUERY = gql`
    query homeZzal {
      homeZzal {
        id
        title
        thumbnail
        viewAll
      }
    }
  `;
  const { data, loading } = useQuery(HOMEZZAL_QUERY, {
    notifyOnNetworkStatusChange: true,
  });
  return loading ? (
    <div>Loading...</div>
  ) : (
    data.homeZzal.map((item, idx) => (
      <ZzalBox key={idx} to={"/Post?" + item.id}>
        <Zzal src={item.thumbnail}></Zzal>
        <ZzalTitle to={"/Post?" + item.id}>{item.title}</ZzalTitle>
        <ZzalView>
          <View />
          {item.viewAll.toLocaleString(undefined, {
            maximumFractionDigits: 0,
          })}
        </ZzalView>
      </ZzalBox>
    ))
  );
};
