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
  return loading || data === undefined ? (
    <Loader />
  ) : (
    data.homeZzal.map((item, idx) => (
      <ZzalBox key={idx} to={"/Post?" + item.id}>
        <ZzalWrapper>
          <Zzal style={{ resizeMode: "cover" }} src={item.thumbnail} />
        </ZzalWrapper>
        <ZzalTitle to={"/Post?" + item.id}>{item.title}</ZzalTitle>
        <ZzalView>
          <InfoIcon src={require("../Image/info_view.png")} />
          {" " +
            item.viewAll.toLocaleString(undefined, {
              maximumFractionDigits: 0,
            })}
        </ZzalView>
      </ZzalBox>
    ))
  );
};
