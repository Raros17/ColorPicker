import styled from "styled-components"

export const TextInput = styled.input`
  width: 100%;
  height: 2rem;
  border-radius: 10px;
  margin-right: 10px;
  font-size: 15px;
  padding-left: 1rem;
  color: #888;
  font-family: 'TheJamsil5Bold';
  outline: none;
  border  :none ;
`

export const TextDeleteBtn = styled.button`
  width: 28px;
  height: 28px;
  border-radius: 50%;
  position: absolute;
  right: 1rem;
  cursor: pointer;
  transition: all 0.1s ease;
  font-weight: 500;
  border: 1px solid #222;
  &:hover {
    background-color: #d2d2d2;
  }
`

export const InputTypeSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width : 100%;
`


export const ImageBtn = styled.button`
  width: 100px;
  height: 2.5;
  color: #fff;
  background-color: #272727;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.5s ease;
  border: 1px solid #eeeeee;
  font-size: 16px;
  font-weight: 800;
  font-family: 'TheJamsil5Bold';
  &:hover{
    background-color: #171717;
  }
`

export const InputSection = styled.div`
  display: flex;
  justify-content: center;
  width: 60%;
`