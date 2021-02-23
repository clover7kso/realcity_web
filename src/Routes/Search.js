import React, { useState } from "react";
import styled from "styled-components";
import { useQuery } from "@apollo/client";
import InfiniteScroll from "../Components/InfiniteScroll";
import { gql } from "@apollo/client";
import { withRouter } from "react-router-dom";
import Sidebar from "../Components/Sidebar";
import { PC, isPC } from "../Components/MediaQuery";
import Input from "../Components/Input";
import { SearchIcon } from "./../Components/Icons";

const BOARD_QUERY = gql`
  query postSearch($cursor: String, $search: String!) {
    postSearch(cursor: $cursor, search: $search) {
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
  max-width: 935px;
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

const SearchWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: left;
  border-color: black;
  border-radius: 10px;
  border-style: solid;
  border-width: 2px;
`;

const SearchInput = styled(Input)`
  border-color: white;
  padding: ${(props) => (props.PCCheck ? "15px" : "5px")};
  font-size: ${(props) => (props.PCCheck ? "24px" : "17px")};
  height: ${(props) => (props.PCCheck ? "50px" : "35px")};
  text-align: left;
  border-radius: 50px;
  width: 100%;
  &::placeholder {
    color: grey;
  }
`;

const SearchButton = styled.button`
  background-color: transparent;
  border-color: transparent;
  margin-left: ${(props) => (props.PCCheck ? "20px" : "10px")};
  cursor: pointer;
  outline: 0;
`;

const Board = ({ history }) => {
  const historyState = decodeURI(
    decodeURIComponent(history.location.search.replace("?", ""))
  );
  var searchFirst = historyState !== undefined ? historyState : "";
  const [search, setSearch] = useState(searchFirst);
  var word = searchFirst;

  const { data, loading, error, refetch, fetchMore } = useQuery(BOARD_QUERY, {
    variables: {
      search: search,
    },
    notifyOnNetworkStatusChange: true,
  });

  const onKeyPress = (e) => {
    if (e.key === "Enter") {
      history.replace({
        pathname: "Search",
        search: "?" + word,
      });
      setSearch(word);
    }
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
        <SearchWrapper>
          <SearchButton
            PCCheck={pcCheck}
            onClick={() => {
              history.replace({
                pathname: "Search",
                search: "?" + word,
              });
              setSearch(word);
            }}
          >
            <SearchIcon />
          </SearchButton>
          <SearchInput
            PCCheck={pcCheck}
            onKeyPress={onKeyPress}
            placeholder="게시물을 검색해주세요"
            type="text"
            onChange={(text) => (word = text)}
          />
        </SearchWrapper>
        {error ? (
          <p>{error.message}</p>
        ) : (
          <InfiniteScroll
            onRefresh={() => handleRefresh()}
            selected={"👑 실시간 인기글"}
            loading={loading}
            data={!loading ? data.postSearch.posts : undefined}
            onLoadMore={() => {
              if (!loading && data.postSearch.cursor === "end") {
                return;
              } else if (!loading) {
                fetchMore({
                  variables: {
                    search: search,
                    cursor: data !== undefined ? data.postSearch.cursor : null,
                  },
                  updateQuery: (prevResult, { fetchMoreResult }) => {
                    const newEdges = fetchMoreResult.postSearch.posts;
                    return {
                      postSearch: {
                        __typename: prevResult.postSearch.__typename,
                        cursor: fetchMoreResult.postSearch.cursor,
                        posts: [...prevResult.postSearch.posts, ...newEdges],
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
