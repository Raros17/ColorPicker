import React from 'react';
import { ColorWrapper, ColorCode, PickedColor } from './ColorCode.styled.ts';
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
