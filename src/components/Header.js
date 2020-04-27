import React, { Component } from "react";
import styled from 'styled-components'
import Imagem from '../imgs/logoHeader.png'


const HeaderComp = styled.div `
  width: 100vw;
  height: 100px;
  background-color:  #ED7F61;
  display: flex;
  align-items: center;
  padding-left: 50px;
  margin-bottom: 50px;
`
const ImgLogo = styled.img `
  width: 120px;
`


class Header extends Component {
  render() {
    return (
      <HeaderComp>
          <ImgLogo src={Imagem}/>
      </HeaderComp>
    );
  }
}


export default Header;

