import React from "react";
import ReactDice from "react-dice-complete";
import "react-dice-complete/dist/react-dice-complete.css";
import styled, { keyframes } from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  background: white;
  justify-content: center;
  align-items: center;
`;

const MapWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: no-wrap;
`;

const boxOn = keyframes`
  50% {
    transform: scale(1.7);
  }
  100% {
    transform: scale(1);
  }
`;

const Box = styled.div`
  margin: 10px;
  width: 60px;
  height: 60px;
  border-radius : 10px
  background :  ${(props) => {
    return props.value === props.screenPos ? "black" : "lightgrey";
  }};
  animation: ${(props) => {
    return props.value === props.screenPos ? boxOn : null;
  }}
    0.5s linear;
`;

const NoBox = styled.div`
  margin: 10px;
  width: 60px;
  height: 60px;
`;

const DiceWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
`;

export default class DiceBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rollTime: 0,
      pos: 0,
      dice1: 6,
      dice2: 6,
      screenPos: 0,
    };
  }

  mapEffect(diceSum) {
    this.timer = setInterval(async () => {
      var next =
        this.state.screenPos + 1 < 16
          ? this.state.screenPos + 1
          : Math.floor((this.state.screenPos + 1) % 16);
      await this.setState({
        screenPos: next,
      });
    }, 500);
    setTimeout(() => {
      this.setState({
        effect: false,
      });
      clearTimeout(this.timer);
    }, 500 * diceSum);
  }

  rollAll = async () => {
    this.setState({ effect: true });

    var randomValue1 = Math.floor(Math.random() * 6) + 1;
    var randomValue2 = Math.floor(Math.random() * 6) + 1;
    var sum = randomValue1 + randomValue2;
    await this.setState({
      rollTime: 4,
      dice1: randomValue1,
      dice2: randomValue2,
      pos:
        this.state.pos + sum < 16
          ? this.state.pos + sum
          : Math.floor((this.state.pos + sum) % 16),
    });
    this.reactDice1.rollAll([this.state.dice1]);
    this.reactDice2.rollAll([this.state.dice2]);
    console.log(this.state.dice1);
    console.log(this.state.dice2);
    console.log(this.state.pos);
    console.log("-----------------");
  };

  rollDoneCallback = (num) => {
    console.log("roll done");
    this.mapEffect(this.state.dice1 + this.state.dice2);
  };

  render() {
    return (
      <Wrapper>
        <MapWrapper>
          <Box value={13} screenPos={this.state.screenPos} />
          <Box value={12} screenPos={this.state.screenPos} />
          <Box value={11} screenPos={this.state.screenPos} />
          <Box value={10} screenPos={this.state.screenPos} />
          <Box value={9} screenPos={this.state.screenPos} />
          <Box value={8} screenPos={this.state.screenPos} />
        </MapWrapper>
        <MapWrapper>
          <Box value={14} screenPos={this.state.screenPos} />
          <NoBox />
          <NoBox />
          <NoBox />
          <NoBox />
          <Box value={7} screenPos={this.state.screenPos} />
        </MapWrapper>
        <MapWrapper>
          <Box value={15} screenPos={this.state.screenPos} />
          <NoBox />
          <NoBox />
          <NoBox />
          <NoBox />
          <Box value={6} screenPos={this.state.screenPos} />
        </MapWrapper>
        <MapWrapper>
          <Box value={0} screenPos={this.state.screenPos} />
          <Box value={1} screenPos={this.state.screenPos} />
          <Box value={2} screenPos={this.state.screenPos} />
          <Box value={3} screenPos={this.state.screenPos} />
          <Box value={4} screenPos={this.state.screenPos} />
          <Box value={5} screenPos={this.state.screenPos} />
        </MapWrapper>
        <DiceWrapper>
          <ReactDice
            defaultRoll={this.state.dice1}
            numDice={1}
            rollDone={this.rollDoneCallback}
            ref={(dice) => (this.reactDice1 = dice)}
            faceColor="#e2e2e2dd"
            dotColor="#000000"
            outlineColor="#e2e2e2aa"
            rollTime={this.state.rollTime}
            margin={100}
            dieSize="170"
            outline={true}
            disableIndividual={true}
          />
          <ReactDice
            defaultRoll={this.state.dice2}
            numDice={1}
            ref={(dice) => (this.reactDice2 = dice)}
            faceColor="#000000dd"
            dotColor="#ffffff"
            outlineColor="#000000aa"
            rollTime={this.state.rollTime}
            margin={100}
            dieSize="170"
            outline={true}
            disableIndividual={true}
          />
        </DiceWrapper>
        <LotteryButton decrypting={this.state.effect} run={this.rollAll} />
      </Wrapper>
    );
  }
}

const ButtonRun = styled.button`
  @font-face {
    font-family: "BMJUA";
    src: url("https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_one@1.0/BMJUA.woff")
      format("woff");
    font-weight: normal;
    font-style: normal;
  }
  font-family: BMJUA;
  position: relative;
  display: block;
  padding: 1rem 2.5rem 1.6rem;
  color: #666;
  border: 2px solid #666;
  border-radius: 6px;
  overflow: hidden;
  cursor: pointer;
  transition: 0.5s;
  user-select: none;
  &:active {
    padding: 1rem 2.5rem 1rem;
    margin-top: 0.6rem;
    background: #999;
    color: #fff;
  }
  &::after {
    content: "";
    position: absolute;
    left: 0;
    bottom: 0;
    display: block;
    height: 0.6rem;
    width: 100%;
    background-image: repeating-linear-gradient(
      45deg,
      #666,
      #666 1px,
      transparent 2px,
      transparent 5px
    );
    border-top: 1px solid #666;
    transition: 0.5s;
  }
  &:active::after {
    transform: translateY(0.6rem);
  }
  &.hide {
    transform: scale(0);
  }
`;

class LotteryButton extends React.Component {
  render() {
    return (
      <ButtonRun
        className={this.props.decrypting && "hide"}
        onClick={this.props.run}
      >
        던질까말까!
      </ButtonRun>
    );
  }
}
