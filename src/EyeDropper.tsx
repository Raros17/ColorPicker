import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';

interface EyeDropperProps {
  imageUrl: string;
  onColorPick: (color: string) => void;
  isSpoidActive: boolean;
}

const EyeDropper: React.FC<EyeDropperProps> = ({ imageUrl, onColorPick, isSpoidActive }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    const image = imageRef.current;

    if (canvas && ctx && image) {
      image.onload = () => {
        canvas.width = 300;
        canvas.height = 300;
        ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
      };
    }
  }, [imageUrl]);


  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isSpoidActive) return;

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');

    if (canvas && ctx) {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const pixelData = ctx.getImageData(x, y, 1, 1).data;
      const rgb = `rgb(${pixelData[0]}, ${pixelData[1]}, ${pixelData[2]})`;
      onColorPick(rgb);
    }
  };

  return (
    <DropperContainer>
      <CanvasWrapper>
      <canvas
        ref={canvasRef}
        onClick={handleCanvasClick}
        style={{ 
          border: '1px solid black', 
          cursor: isSpoidActive ? 'crosshair' : 'default',
          display: 'block',  
          width: '300px',            
          height: '300px', 
          pointerEvents: isSpoidActive ? 'auto' : 'none' 
        }}
      />
      <img ref={imageRef} src={imageUrl} alt="Selected" style={{ display: 'none' }} />
    </CanvasWrapper>
    </DropperContainer>
  );
};

export default EyeDropper;


const DropperContainer = styled.div`
  margin-top: 20px;
`
const CanvasWrapper = styled.div`
  width: 300px;
  height: 300px;
  border-radius: 10px;
  overflow: hidden; 
  display: flex;
  justify-content: center;
  align-items: center;
`;