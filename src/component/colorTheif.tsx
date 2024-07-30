import { usePalette } from 'color-thief-react'
import React, {useEffect} from 'react';

interface ColorTheifProps {
    onColorsExtracted: (colors: string[]) => void;
  }


const ColorTheif: React.FC<ColorTheifProps> = ({ onColorsExtracted }) => {
    const { data: colorData } = usePalette(
      'https://images.unsplash.com/photo-1721983571623-ed178f59d9b3?q=80&w=1578&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
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