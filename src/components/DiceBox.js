import React from "react";
import ReactDice from "react-dice-complete";
import "react-dice-complete/dist/react-dice-complete.css";
import styled, { keyframes } from "styled-components";
import { getLevel } from "./Util";
import Input from "./Input";

const ButtonWrapper = styled.div`
  padding-top: 30px;
  padding-left: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  background: white;
  justify-content: center;
  align-items: center;
`;

const MapWrapper = styled.table`
  border-spacing: 10px;
  border-collapse: separate;
`;

const MapRow = styled.tr``;

const boxOn = keyframes`
  50% {
    transform: scale(1.7);
  }
  100% {
    transform: scale(1);
  }
`;

const Prize = styled.span`
  display: flex;
  width:100%
  height:100%
  justify-content: center;
  align-items: center;
  font-size:30px
`;

const Box = styled.td`
  width: 60px;
  height: 60px;
  border-radius: 10px;
  background: ${(props) => {
    return props.value === props.screenPos ? "black" : "lightgrey";
  }};
  animation: ${(props) => {
      return props.value === props.screenPos ? boxOn : null;
    }}
    0.5s linear;
`;

const NoBox = styled.td``;

const DiceWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  flex-wrap: no-wrap;
`;

const InfoWrapper = styled.div`
  display: flex;
  flex-wrap: no-wrap;
  flex-direction: column;
`;

const InfoRowWrapper = styled.div`
  min-width: 400px;
  display: flex;
  flex-wrap: no-wrap;
  flex-direction: row;
  align-items: bottom;
  justify-content: bottom;
`;
const Info = styled.div`
  font-family: BMJUA;
  font-size: 2rem;
  margin: 1rem 0;
  color: #000;
`;
const SmallInfo = styled.div`
  font-family: BMJUA;
  font-size: 1.3rem;
  color: #000;
  margin: 0.4rem 0rem;
`;
const InputInfo = styled(Input)`
  border-color: ${(props) => props.theme.grey};
  background-color: white;
  height:44px
  font-size: 20px;
  text-align: left;
  padding-left:10px;
  margin-bottom:10px;
  margin-top:20px;
  border-radius:1px
  width:100%
  &::placeholder {
    color:${(props) => props.theme.grey}
  }
  &:focus{
    outline: none !important;
    border:1px solid ${(props) => props.theme.blueColor};
    box-shadow: 0 0 3px #719ECE;
  }
`;

export default class DiceBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rollTime: 0,
      pos: this.props.data.getMe.gamblePosition,
      dice1: 6,
      dice2: 6,
      screenPos: this.props.data.getMe.gamblePosition,
      diceSum: 0,
      message: "",
      betPoint: 0,
    };
  }

  setPoint(num) {
    this.setState({ betPoint: num });
  }

  mapEffect() {
    this.timer = setInterval(() => {
      if (this.state.diceSum !== 0) {
        var next =
          this.state.screenPos + 1 < 16
            ? this.state.screenPos + 1
            : (this.state.screenPos + 1) % 16;
        this.setState({
          screenPos: next,
          diceSum: this.state.diceSum - 1,
        });
      } else {
        clearTimeout(this.timer);
        this.props.refreshMe();
        setTimeout(() => {
          this.setState({
            effect: false,
          });
        }, 300);
      }
    }, 400);
  }

  rollAll = async () => {
    this.setState({ effect: true });

    var randomValue1 = Math.floor(Math.random() * 6) + 1;
    var randomValue2 = Math.floor(Math.random() * 6) + 1;
    var sum = randomValue1 + randomValue2;
    await this.setState({
      rollTime: 2,
      dice1: randomValue1,
      dice2: randomValue2,
      pos:
        this.state.pos + sum < 16
          ? this.state.pos + sum
          : (this.state.pos + sum) % 16,
      diceSum: randomValue1 + randomValue2,
      message: randomValue1 !== randomValue2 ? "두근두근" : "더블+🎲",
    });
    const myResult = await this.props.gambleResult({
      variables: {
        id: window.sessionStorage.getItem("id"),
        dice1: randomValue1,
        dice2: randomValue2,
        betPoint: Number(this.state.betPoint),
      },
    });
    if (!myResult.data.gambleResult) {
      this.setState({ effect: false });
      return;
    }
    this.reactDice1.rollAll([this.state.dice1]);
    this.reactDice2.rollAll([this.state.dice2]);

    console.log(this.state.dice1);
    console.log(this.state.dice2);
    console.log(this.state.pos);
    console.log(this.state.message);
    console.log("-----------------");
  };

  rollDoneCallback = (num) => {
    console.log("roll done");
    setTimeout(() => {
      this.setState({ message: "" });
      this.mapEffect(this.state.dice1 + this.state.dice2);
    }, 300);
  };

  render() {
    return (
      <Wrapper>
        <MapWrapper cellSpacing="10px">
          <tbody>
            <MapRow>
              <Box value={13} screenPos={this.state.screenPos} />
              <Box value={12} screenPos={this.state.screenPos} />
              <Box value={11} screenPos={this.state.screenPos} />
              <Box value={10} screenPos={this.state.screenPos}>
                <Prize>
                  <span role="img" aria-label="prize">
                    🎉
                  </span>
                </Prize>
              </Box>
              <Box value={9} screenPos={this.state.screenPos} />
              <Box value={8} screenPos={this.state.screenPos} />
            </MapRow>
            <MapRow>
              <Box value={14} screenPos={this.state.screenPos} />
              <NoBox colSpan={4} rowSpan={2}>
                <ButtonWrapper>
                  <LotteryButton
                    alert={this.props.alert}
                    chance={this.props.data.getMe.gambleChance}
                    diceSum={this.state.diceSum}
                    message={this.state.message}
                    decrypting={this.state.effect}
                    betPoint={this.state.betPoint}
                    betMax={Number(window.sessionStorage.getItem("point"))}
                    betMin={0}
                    run={this.rollAll}
                  />
                </ButtonWrapper>
              </NoBox>
              <Box value={7} screenPos={this.state.screenPos} />
            </MapRow>
            <MapRow>
              <Box value={15} screenPos={this.state.screenPos} />
              <Box value={6} screenPos={this.state.screenPos} />
            </MapRow>
            <MapRow>
              <Box value={0} screenPos={this.state.screenPos} />
              <Box value={1} screenPos={this.state.screenPos} />
              <Box value={2} screenPos={this.state.screenPos}>
                <Prize>
                  <span role="img" aria-label="prize">
                    🎉
                  </span>
                </Prize>
              </Box>
              <Box value={3} screenPos={this.state.screenPos} />
              <Box value={4} screenPos={this.state.screenPos} />
              <Box value={5} screenPos={this.state.screenPos} />
            </MapRow>
          </tbody>
        </MapWrapper>
        {window.sessionStorage.getItem("nickname") ? (
          <InfoWrapper>
            <InputInfo
              disabled={this.state.effect}
              onChange={(num) => this.setPoint(num)}
              placeholder="배팅 좋아요 수"
              type="number"
            />
            <InfoRowWrapper>
              <Info>
                Lv.{getLevel(window.sessionStorage.getItem("point"))}{" "}
                {window.sessionStorage.getItem("nickname")}
              </Info>
            </InfoRowWrapper>
            <SmallInfo>
              현재 좋아요 수는 {window.sessionStorage.getItem("point")}개
              입니다.
            </SmallInfo>
            {0 < this.state.betPoint &&
            this.state.betPoint <
              Number(window.sessionStorage.getItem("point")) + 1 ? (
              <>
                <SmallInfo>
                  당첨시 레벨은 Lv.
                  {getLevel(window.sessionStorage.getItem("point"))}
                  {" -> "}
                  Lv.
                  {getLevel(
                    Number(window.sessionStorage.getItem("point")) +
                      this.state.betPoint * 4
                  )}{" "}
                  입니다.
                </SmallInfo>
                <SmallInfo>
                  꽝일시 레벨은 Lv.
                  {getLevel(window.sessionStorage.getItem("point"))}
                  {" -> "}
                  Lv.
                  {getLevel(
                    Number(window.sessionStorage.getItem("point")) -
                      this.state.betPoint
                  )}{" "}
                  입니다.
                </SmallInfo>
              </>
            ) : 0 === this.state.betPoint ? (
              <SmallInfo>배팅 좋아요 수를 입력해주세요. 당첨시 2배.</SmallInfo>
            ) : (
              <SmallInfo>
                최소 1개, 최대 {window.sessionStorage.getItem("point")}개의
                좋아요 수가 입력가능합니다.
              </SmallInfo>
            )}
            <SmallInfo>주사위 기회는 매주 토요일 5회 충전됩니다.</SmallInfo>
          </InfoWrapper>
        ) : null}
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
            margin={60}
            dieSize="140"
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
            margin={60}
            dieSize="140"
            outline={true}
            disableIndividual={true}
          />
        </DiceWrapper>
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
  color: #000;
  border: 2px solid #666;
  border-radius: 6px;
  overflow: hidden;
  cursor: pointer;
  transition: 0.5s;
  user-select: none;
  outline: 0;
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

const infoAnimation = keyframes`
  30% {
    transform: scale(1.8);
  }
  90% {
    transform: scale(1);
  }
`;
const InfoRun = styled.div`
  font-family: BMJUA;
  position: absolute;
  display: block;
  padding: 1rem 2.5rem 1.6rem;
  color: #000;
  overflow: hidden;
  transition: 1.5s;
  user-select: none;
  outline: 0;
  font-size: 2.4rem;
  &:active {
    padding: 1rem 2.5rem 1rem;
    margin-top: 0.6rem;
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
    transition: 0.5s;
  }
  &:active::after {
    transform: translateY(0.6rem);
  }
  &.hide {
    transform: scale(0);
  }
  animation: ${(props) => {
      return props.anime ? infoAnimation : null;
    }}
    0.4s linear;
`;

class LotteryButton extends React.Component {
  render() {
    return (
      <>
        <InfoRun
          className={!this.props.decrypting && "hide"}
          anime={this.props.message === ""}
        >
          {this.props.message === "" ? this.props.diceSum : this.props.message}
        </InfoRun>
        <ButtonRun
          className={this.props.chance !== 0 && this.props.decrypting && "hide"}
          onClick={() => {
            this.props.alert.removeAll();
            if (this.props.betPoint === 0 || this.props.betPoint === "")
              this.props.alert.error("배팅 좋아요 수를 입력해주세요");
            else if (this.props.betPoint < this.props.betMin)
              this.props.alert.error(
                "배팅 좋아요 수는 0 보다 작을 수 없습니다."
              );
            else if (this.props.betPoint > this.props.betMax)
              this.props.alert.error(
                "배팅 좋아요 수의 최대는 " + this.props.betMax + "입니다."
              );
            else if (this.props.chance !== 0) this.props.run();
            else this.props.alert.error("남은 기회가 없어요.");
          }}
        >
          남은기회 {" " + this.props.chance + "/5"}
        </ButtonRun>
      </>
    );
  }
}
