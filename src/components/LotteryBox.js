import React from "react";
import styled from "styled-components";

const Title = styled.h1`
  @font-face {
    font-family: "BMJUA";
    src: url("https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_one@1.0/BMJUA.woff")
      format("woff");
    font-weight: normal;
    font-style: normal;
  }
  font-family: BMJUA;
  font-size: 3rem;
  margin: 2rem 0;
  color: #bbb;
`;

const Button = styled.button`
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

const Plus = styled.div`
  font-family: BMJUA;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 20px;
  font-size: 48px;
  font-weight: bold;
  margin: 0 0 10px 0;
`;

const BallWrapper = styled.div`
  flex-wrap: wrap;
  display: flex;
  margin-bottom: 20px;
  padding: 30px;
  border: 3px solid pink;
  border-radius: 20px;
  align-items: center;
  justify-content: space-around;
  flex-direction: row;
`;

const Ball = styled.div`
  font-family: BMJUA;
  width: 80px;
  height: 80px;
  margin-bottom: 10px;
  line-height: 80px;
  font-size: 48px;
  border-radius: 50%;
  text-align: center;
  &:last-child {
    margin-bottom: 0;
  }
  &.blue {
    background: #69c8f2;
  }
  &.bonus {
    background: #b0d840;
  }
  &.done {
    animation: done 0.3s linear;
  }
  &:last-child {
    margin-right: 0;
  }
  @keyframes done {
    70% {
      transform: scale(1.2);
    }
    100% {
      transform: scale(1);
    }
  }
`;

export default class LotteryBox extends React.Component {
  state = { number: [0, 0, 0] };
  randomize = () => {
    if (!this.state.effect) {
      const arr = [];
      for (let i = 0; i <= 2; i++) {
        const random = Math.floor(Math.random() * 9);
        arr.push(random + 1);
      }
      this.setState({ number: arr, effect: true });
      console.log(arr);
      setTimeout(() => {
        this.setState({ effect: false });
      }, 4000);
    }
  };

  render() {
    return (
      <React.Fragment>
        <Title>뽑아뽑아~</Title>
        <BallWrapper id="numbers">
          <LotteryItem
            index="0"
            color="blue"
            number={this.state.number[0]}
            decrypting={this.state.effect}
          />
          <Plus>{"-"}</Plus>
          <LotteryItem
            index="1"
            color="blue"
            number={this.state.number[1]}
            decrypting={this.state.effect}
          />
          <Plus>{"="}</Plus>
          <LotteryItem
            index="2"
            color="bonus"
            number={this.state.number[2]}
            decrypting={this.state.effect}
          />
        </BallWrapper>
        <div>
          <LotteryButton decrypting={this.state.effect} run={this.randomize} />
        </div>
      </React.Fragment>
    );
  }
}

class LotteryButton extends React.Component {
  render() {
    return (
      <Button
        className={this.props.decrypting && "hide"}
        onClick={this.props.run}
      >
        추첨!
      </Button>
    );
  }
}

class LotteryItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      number: "?",
      decryptingDone: "",
    };
  }

  decryptEffect() {
    this.setState({ decryptingDone: "" });
    this.timer = setInterval(() => {
      this.randomNumber();
    }, 10);
    setTimeout(() => {
      this.setState({
        decryptingDone: "done",
        number: this.props.number,
      });
      clearTimeout(this.timer);
    }, 1000 * +this.props.index + 1000);
  }

  randomNumber() {
    this.setState({ number: Math.round(Math.random() * 8) + 1 });
  }

  componentDidUpdate(nextProps) {
    const { decrypting } = this.props;
    if (nextProps.decrypting !== decrypting) {
      if (decrypting) {
        this.decryptEffect();
      }
    }
  }

  render() {
    return (
      <Ball className={`ball ${this.props.color} ${this.state.decryptingDone}`}>
        {this.state.number}
      </Ball>
    );
  }
}
