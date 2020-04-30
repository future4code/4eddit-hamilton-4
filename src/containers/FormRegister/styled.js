import styled from 'styled-components'

export const Body = styled.div `
  width: 100vw;
  height: 100vh;
  background-color: #DAE0E6;
  display: flex;
  flex-direction: column;
  align-items: center;
`
export const ContainerLogin = styled.div `
  display: flex;
  justify-content: center;
  flex-direction: column;
  min-width: 500px;
  width: fit-content;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 50px;
  height: fit-content;
  padding: 20px;
  box-sizing: border-box;
  margin-bottom: 30px;
  background-color: white;
  border-radius: 5px;
`
export const Form = styled.form `
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`