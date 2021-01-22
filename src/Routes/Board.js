import React, { useState } from "react";
import styled from "styled-components";
import { Menu, MyScrollMenu } from "../Components/MyScrollMenu";
import { useQuery } from "@apollo/client";
import InfiniteScroll from "../Components/InfiniteScroll";
import { gql } from "@apollo/client";
import { withRouter } from "react-router-dom";
import Sidebar from "../Components/Sidebar";
import { CategoryListTypeB, removeEmojis } from "../Components/Util";
import { PC, isPC } from "../Components/MediaQuery";

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
        user {
          nickname
          point
        }
      }
    }
  }
`;

const Title = styled.span`
  font-size: 24px;
  font-weight: bold;
`;

const ZzalWrapper = styled.div`
  width:190px
  display: flex;
  flex-direction: column;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  min-height: 80vh;
`;

const BoardWrapper = styled.div`
  overflow: hidden;
  margin-right: ${(props) => (props.marginRight ? props.marginRight : "20px")};
  flex-direction: column;
  width: ${(props) => (props.width ? props.width : "80%")};
`;

var selectedFirst = "👑 오늘인기글";
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
  var pcCheck = isPC();
  return (
    <Wrapper>
      <BoardWrapper
        width={pcCheck ? "80%" : "100%"}
        marginRight={pcCheck ? null : "0px"}
      >
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
            data={!loading ? data.postMany.posts : undefined}
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
      <PC>
        <ZzalWrapper>
          <Title>오늘 짤방 TOP</Title>
          <Sidebar />
        </ZzalWrapper>
      </PC>
    </Wrapper>
  );
};
export default withRouter(Board);
