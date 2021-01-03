import React from "react";
import styled from "styled-components";

function SearchBar() {
  return (
    <section>
      <input
        name="keyword"
        type="search"
        placeholder="관심있는 내용을 검색해보세요!"
        autocomplete="off"
      ></input>
    </section>
  );
}

function HomePage() {
  return (
    <div>
      <SearchBar></SearchBar>
    </div>
  );
}

export default HomePage;
