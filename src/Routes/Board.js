import React, { useState } from "react";
import styled from "styled-components";
import { Menu, MyScrollMenu } from "../Components/MyScrollMenu";
import { useQuery } from "react-apollo-hooks";
import InfiniteScroll from "../Components/InfiniteScroll";
import { gql } from "apollo-boost";

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
  font-family: Roboto;
`;

const BoardWrapper = styled.div`
  width:80%
  flex-direction: column;
  font-family: Roboto;
`;

const ZzalWrapper = styled.div`
  width:20%
  display: flex;
  flex-direction: column;
  font-family: Roboto;
`;

const Title = styled.span`
  font-size: 24px;
  font-weight: bold;
  text-align: center;
`;

const selectedFirst = "👑 오늘 이 글 잘나가네";
const menuItems = Menu(list, selectedFirst);

export default () => {
  const [selected, setSelected] = useState(selectedFirst);

  const { data, loading, error, refetch, fetchMore } = useQuery(BOARD_QUERY, {
    variables: {
      category: selected.substring(3),
    },
    notifyOnNetworkStatusChange: true,
  });

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
                    category: selected.substring(3),
                    cursor:
                      data.postMany !== undefined ? data.postMany.cursor : null,
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
      </ZzalWrapper>
    </Wrapper>
  );
};
