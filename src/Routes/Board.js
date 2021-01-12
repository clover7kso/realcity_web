import React, { useState } from "react";
import styled from "styled-components";
import { Menu, MyScrollMenu } from "../Components/MyScrollMenu";
import { useQuery } from "@apollo/client";
import InfiniteScroll from "../Components/InfiniteScroll";
import { gql } from "@apollo/client";
import { withRouter, Link } from "react-router-dom";
import { View } from "./../Components/Icons";

const Title = styled.span`
  font-size: 24px;
  font-weight: bold;
`;

const ZzalWrapper = styled.div`
  width:20%
  display: flex;
  flex-direction: column;
  font-family: Roboto;
`;

const ZzalBox = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 20%;
`;

const Zzal = styled.img`
  border-radius: 20px;
  margin: 20px 0 10px 0;
`;

const ZzalTitle = styled(Link)`
  min-width: 100%;
  font-size: 18px;
  color: black;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  padding: 0 0 5% 0;
`;

const ZzalView = styled.span`
  min-width: 100%;
  font-size: 13px;
  color: #818181;
  text-align: right;
`;

const BOARD_QUERY = gql`
  query postMany($cursor: String, $category: String) {
    postMany(cursor: $cursor, category: $category) {
      cursor
      posts {
        id
        title
        content
        author
        timeFromToday
        commentCount
        thumbnail
        viewAll
        likeAll
      }
    }
  }
`;

// list of items
const list = [
  { name: "👑 오늘 이 글 잘나가네" },
  { name: "🐶 자유롭게멍멍" },
  { name: "🏎 애마자랑" },
  { name: "🔫 나때는군대" },
  { name: "📈 주식투자" },
  { name: "🚘 시승후기" },
  { name: "✈️ 여행먹방" },
  { name: "💼 보험후기" },
  { name: "🚓️ 사고후기" },
  { name: "👰🏻‍♀️ 결혼이야기" },
  { name: "🚗 차Q&A" },
];

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  min-height: 80vh;
`;

const BoardWrapper = styled.div`
  margin-right:30px
  width:80%
  flex-direction: column;
  font-family: Roboto;
`;

var selectedFirst = "👑 오늘 이 글 잘나가네";
const menuItems = Menu(list, selectedFirst);

function removeEmojis(str) {
  const regex = /(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|\ud83c[\ude32-\ude3a]|\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])/g;
  return str.replace(regex, "");
}

function HomeZzal() {
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
  const { data, loading, error } = useQuery(HOMEZZAL_QUERY, {
    notifyOnNetworkStatusChange: true,
  });
  return loading ? (
    <div>Loading...</div>
  ) : (
    data.homeZzal.map((item, idx) => (
      <ZzalBox key={idx}>
        <Zzal src={item.thumbnail}></Zzal>
        <ZzalTitle to={"/Post?" + item.id}>{item.title}</ZzalTitle>
        <ZzalView>
          <View></View>{" "}
          {item.viewAll.toLocaleString(undefined, {
            maximumFractionDigits: 0,
          })}
        </ZzalView>
      </ZzalBox>
    ))
  );
}

const Board = ({ history }) => {
  const historyState = decodeURI(
    decodeURIComponent(history.location.search.replace("?", ""))
  );

  selectedFirst = historyState !== undefined ? historyState : selectedFirst;

  const [selected, setSelected] = useState(selectedFirst);

  const { data, loading, error, refetch, fetchMore } = useQuery(BOARD_QUERY, {
    variables: {
      category: removeEmojis(selected).substring(1),
    },
    notifyOnNetworkStatusChange: true,
  });
  if (
    data !== undefined &&
    data.postMany.cursor !== "end" &&
    historyState !== undefined &&
    historyState.refetch
  )
    refetch();

  const onSelect = (key) => {
    setSelected(key);
    refetch();
  };

  return (
    <Wrapper>
      <BoardWrapper>
        <MyScrollMenu
          data={menuItems}
          selected={selected}
          onSelect={onSelect}
        />

        {error ? (
          <p>{error.message}</p>
        ) : (
          <InfiniteScroll
            loading={loading}
            data={data}
            onLoadMore={() => {
              if (!loading && data.postMany.cursor === "end") {
                return;
              } else {
                fetchMore({
                  variables: {
                    category: removeEmojis(selected).substring(1),
                    cursor: data !== undefined ? data.postMany.cursor : null,
                  },
                  updateQuery: (prevResult, { fetchMoreResult }) => {
                    const newEdges = fetchMoreResult.postMany.posts;
                    return {
                      postMany: {
                        __typename: prevResult.postMany.__typename,
                        cursor: fetchMoreResult.postMany.cursor,
                        posts: [...prevResult.postMany.posts, ...newEdges],
                      },
                    };
                  },
                });
              }
            }}
          />
        )}
      </BoardWrapper>
      <ZzalWrapper>
        <Title>오늘 짤방 TOP</Title>
        <HomeZzal></HomeZzal>
      </ZzalWrapper>
    </Wrapper>
  );
};
export default withRouter(Board);
