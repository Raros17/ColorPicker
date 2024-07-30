import { usePalette } from 'color-thief-react';
import React, {useEffect} from 'react';

interface ColorTheifProps {
    imageUrl: string;
    onColorsExtracted: (colors: string[]) => void;
  }


const ColorTheif: React.FC<ColorTheifProps> = ({ imageUrl, onColorsExtracted }) => {
    const { data: colorData } = usePalette(
    imageUrl,
      7,
      'hex',
      {
        crossOrigin: 'anonymous',
      },
    );
  
    useEffect(() => {
      if (colorData) {
        onColorsExtracted(colorData);
      }
    }, [colorData, onColorsExtracted]);
  
    return null;
  };
  
  export default ColorTheif;