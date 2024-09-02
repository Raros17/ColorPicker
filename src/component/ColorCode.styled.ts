import styled from "styled-components"

export const ColorWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 10px;
  position:relative;
  font-family: 'TheJamsil5Bold';
`

export const ColorCode = styled.h5`
  color: #fff;
  font-weight: 800;
  background-color: rgba(0, 0, 0, 0.3);
  text-align: center;
  position: absolute;  
  cursor: pointer;
  @media (max-width: 800px) {
    display:none
}`
  
export const PickedColor = styled.div`
  width: 100px;
  height: 50px;
  border-radius: 20px;
  margin: 5px;
  @media (max-width: 800px) {
  width: 30px;
}`