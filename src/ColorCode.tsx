import React from 'react';
import styled from 'styled-components';
interface ColorCodeProps {
  color: string;
  index: number;
  copiedColors: { [key: number]: boolean };
  setCopiedColors: React.Dispatch<React.SetStateAction<{ [key: number]: boolean }>>;
}

const ColorCodes: React.FC<ColorCodeProps> = ({ color, index, copiedColors, setCopiedColors }) => {

  const handleColorCodeClick = () => {
    navigator.clipboard.writeText(color).then(() => {
      setCopiedColors(prev => ({ ...prev, [index]: true }));
      setTimeout(() => {
        setCopiedColors(prev => ({ ...prev, [index]: false }));
      }, 2000);
    });
  };

  return (
    <ColorWrapper>
      <ColorCode onClick={handleColorCodeClick}>
        {copiedColors[index] ? 'Copied!' : color}
      </ColorCode>
      <PickedColor style={{ backgroundColor: color }} />
    </ColorWrapper>
  );
};

export default ColorCodes;



const ColorWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 10px;
  position:relative;
`

const ColorCode = styled.h5`
  color: #fff;
  font-weight: 800;
  background-color: rgba(0, 0, 0, 0.3);
  text-align: center;
  position: absolute;  
  cursor: pointer;
  @media (max-width: 800px) {
    display:none
}`
  


  const PickedColor = styled.div`
  width: 100px;
  height: 50px;
  border-radius: 20px;
  margin: 5px;
  @media (max-width: 800px) {
  width: 30px;
}`