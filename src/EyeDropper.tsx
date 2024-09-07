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
  const image = imageRef.current;
  if (image && image.complete) {
    console.log('Image loaded:', image.src);
  } else {
    console.log('Image failed to load');
  }
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    const image = imageRef.current;

    if (canvas && ctx && image) {
      image.onload = () => {
        canvas.width = image.width;
        canvas.height = image.height;
        ctx.drawImage(image, 0, 0);
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
      <canvas
        ref={canvasRef}
        onClick={handleCanvasClick}
        style={{ 
          border: '1px solid black', 
          cursor: isSpoidActive ? 'crosshair' : 'default',
          display: 'block', 
          pointerEvents: isSpoidActive ? 'auto' : 'none' 
        }}
      />
      <img ref={imageRef} src={imageUrl} alt="Selected" style={{ display: 'none' }} />
    </DropperContainer>
  );
};

export default EyeDropper;


const DropperContainer = styled.div`
  width: 300px;
  height: 300px;
  border-radius: 10px;
  object-fit: cover;
  margin-top: 20px;
`