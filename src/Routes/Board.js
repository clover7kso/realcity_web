import React, { Component } from "react";
import styled from "styled-components";
import { Menu, MyScrollMenu } from "../Components/MyScrollMenu";

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

const selected = "👑 오늘 이 글 잘나가네";

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

export default class Board extends Component {
  constructor(props) {
    super(props);
    // call it again if items count changes
    this.menuItems = Menu(list, selected);
  }

  state = {
    selected,
  };

  onSelect = (key) => {
    this.setState({ selected: key });
  };

  render() {
    const { selected } = this.state;
    // Create menu from items
    const menu = this.menuItems;

    return (
      <Wrapper>
        <BoardWrapper>
          <MyScrollMenu
            data={menu}
            selected={selected}
            onSelect={this.onSelect}
          />
        </BoardWrapper>
        <ZzalWrapper>
          <Title>오늘 짤방 TOP</Title>
        </ZzalWrapper>
      </Wrapper>
    );
  }
}
