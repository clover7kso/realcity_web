import React, { useState } from "react";
import styled from "styled-components";
import { Menu, MyScrollMenu } from "../Components/MyScrollMenu";
import { useQuery } from "@apollo/client";
import InfiniteScroll from "../Components/InfiniteScroll";
import { gql } from "@apollo/client";
import { withRouter } from "react-router-dom";
import Sidebar from "../Components/Sidebar";
import { CategoryListTypeB, removeEmojis } from "../Components/Util";
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

const BOARD_QUERY = gql`
  query postMany($cursor: String, $category: String) {
    postMany(cursor: $cursor, category: $category) {
      cursor
      posts {
        ip
        category
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

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  min-height: 80vh;
`;

const BoardWrapper = styled.div`
  margin-right:20px
  width:80%
  flex-direction: column;
  font-family: Roboto;
`;

var selectedFirst = "👑 오늘 이 글 잘나가네";
const menuItems = Menu(CategoryListTypeB, selectedFirst);

const Board = ({ history }) => {
  const historyState = decodeURI(
    decodeURIComponent(history.location.search.replace("?", ""))
  );

  selectedFirst = historyState !== undefined ? historyState : selectedFirst;

  const [selected, setSelected] = useState(selectedFirst);

  const { data, loading, error, refetch, fetchMore } = useQuery(BOARD_QUERY, {
    variables: {
      category: removeEmojis(selected),
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

  const handleRefresh = async () => {
    await refetch();
    return true;
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
            onRefresh={() => handleRefresh()}
            selected={selected}
            loading={loading}
            data={data}
            onLoadMore={() => {
              if (!loading && data.postMany.cursor === "end") {
                return;
              } else {
                fetchMore({
                  variables: {
                    category: removeEmojis(selected),
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
        <Sidebar />
      </ZzalWrapper>
    </Wrapper>
  );
};
export default withRouter(Board);
