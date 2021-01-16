import React, { Component } from "react";
import styled from "styled-components";
import { ThreeDot } from "./../Components/Icons";

const Wrapper = styled.div`
  position: relative;
  z-index: 1;
`;

const Button = styled.button`
  align-content: end;
  display: flex;
  justify-content: flex-end;
  background-color: transparent;
  border-color: transparent;
  cursor: pointer;
  width: 60px;
  outline: 0;
`;

const MenuButton = styled.button`
  background-color: transparent;
  border-color: transparent;
  cursor: pointer;
  outline:0
  height: 40px;
  width: 60px;
  background-color: white;
  color: #222;
  text-align: center;
  text-decoration: none;
  font-size: 15px;
`;

const MenuWrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  height: 130px;
`;

const ButtonWrapper = styled.div`
  border: 1px solid #d4d4d4;
  margin: 20% 0 0 0;
  position: relative;
  z-index: 10;
`;

class ThreeDotButton extends Component {
  constructor() {
    super();
    this.state = {
      showMenu: false,
    };
    this.showMenu = this.showMenu.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
  }

  showMenu(event) {
    event.preventDefault();
    this.setState({ showMenu: true }, () => {
      document.addEventListener("click", this.closeMenu);
    });
  }

  closeMenu(event) {
    if (!this.dropdownMenu.contains(event.target)) {
      this.setState({ showMenu: false }, () => {
        document.removeEventListener("click", this.closeMenu);
      });
    }
  }

  render() {
    return (
      <Wrapper>
        <Button onClick={this.showMenu}>
          <ThreeDot/>
        </Button>
        {this.state.showMenu ? (
          <MenuWrapper
            className="menu"
            ref={(element) => {
              this.dropdownMenu = element;
            }}
          >
            <ButtonWrapper>
              <MenuButton> 수정 </MenuButton>
              <MenuButton> 신고 </MenuButton>
              <MenuButton> 삭제 </MenuButton>
            </ButtonWrapper>
          </MenuWrapper>
        ) : null}
      </Wrapper>
    );
  }
}

export default ThreeDotButton;
