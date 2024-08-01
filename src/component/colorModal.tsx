import React from 'react';
import styled from 'styled-components';

interface ColorModalProps {
  colorData: string[];
}

const ColorModal: React.FC<ColorModalProps>  = ({colorData}) => {   
    return (
        <ModalWrapper>
          <ModalTitle>My Colors</ModalTitle>
      {colorData.map((color, idx) => (
        <ColorDataList key={idx}>
          <ColorCircle style={{ backgroundColor: color }}/>
          <ColorTag>{color}</ColorTag>          
        </ColorDataList>
      ))}
        </ModalWrapper>
    )
  };
  
  export default ColorModal;

  const ModalTitle = styled.h4`
    font-size: 25px;
    font-weight: 800;
    margin-bottom: 1.5rem;
  `

  const ColorTag = styled.li`
    font-size: 20px;
    margin-bottom: 20px;
    font-weight: 800;
    width: 100px;
  `

  const ColorCircle = styled.div`
    width: 40px;
    margin-right: 10px;
    height: 30px;
    border-radius: 10px;
  `

  const ColorDataList = styled.ul`
    display: flex;
  `

  const ModalWrapper = styled.section`
    color: #fff;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.5);
    width: 30%;
    height: 60%;
    background-color: #101010;
    border-radius: 20px;
    position: absolute;
    z-index: 3;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  `