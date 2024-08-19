import styled from 'styled-components';
import React, { useState, useRef } from 'react';
import ColorTheif from './component/colorTheif.tsx';
import ColorModal from './component/colorModal.tsx';
import ColorCodes from './ColorCode.tsx';
import ImageUploader from './ImageUploader.tsx';

interface TextSectionProps {
  colorData: string[];
}

function App() {  
  const [colorData, setColorData] = useState<string[]>([]);
  const [imageUrl, setImageUrl] = useState<string>('');
  const [modalToggle, setModalToggle] = useState<boolean>(false);
  const [copiedColors, setCopiedColors] = useState<{ [key: number]: boolean }>({});
  const inputRef = useRef<HTMLInputElement>(null);


  const handleModalOpen = () => {
    setModalToggle(!modalToggle);
  }

  const handleColorsExtracted = (colors: string[]) => {
    setColorData(colors);
  };

  return (
    <MainSection colorData={colorData || []}>
      {modalToggle && <ColorModal colorData={colorData} handleModalOpen={handleModalOpen} />}
      <TextSection colorData={colorData || []}>
        <Title>외부 이미지 주소 넣기</Title>
        <ImageUploader
          inputRef={inputRef}
          setImageUrl={setImageUrl}
          setColorData={setColorData}
        />
         {imageUrl && colorData.length > 0 ? (
          <StyledImage  src={imageUrl} alt="Selected" />
        ) : (
          <PlaceholderImage />
        )}
      </TextSection>
      
      <ImageGroup>
        {colorData?.map((color, idx) => (
          <ColorCodes
          key={idx}
          color={color}
          index={idx}
          copiedColors={copiedColors}
          setCopiedColors={setCopiedColors}
        />
        ))}
        {colorData.length > 0  && <ColorDownBtn onClick={handleModalOpen}>전체 저장</ColorDownBtn>}
      </ImageGroup>
      {imageUrl && <ColorTheif imageUrl={imageUrl} onColorsExtracted={handleColorsExtracted} />}
    </MainSection>
  );
}

export default App;

const PlaceholderImage = styled.div`
  width: 300px;
  height: 300px;
  border-radius: 10px;
  background-color: #1b1a1a; 
  margin-top: 20px;
`

const StyledImage = styled.img`
  width: 300px;
  height: 300px;
  border-radius: 10px;
  object-fit: cover;
  margin-top: 20px;
`

const ColorDownBtn = styled.button`
  height: 50px;
  border-radius: 20px;
  border: none;
  transition: all 0.5s ease;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  font-weight: 800;
  background-color: #262626;
  color: #fff;
  padding: 0 1rem;
  font-family: 'TheJamsil5Bold';
  &:hover {
    background-color: #101010;
  }
  @media (max-width: 800px) {
  width: 70px;
  font-size: 15px;
}
`


const ImageGroup = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap; 
  justify-content: center;
  width: 100%;
`


const TextSection = styled.section<TextSectionProps>`
  width: 80%;
  background: ${({ colorData }) =>
    getBackgroundGradient(colorData, '#212121')};
  border-radius: 20px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 20px;
  font-weight: 700;
  color: white;
  margin-bottom: 10px;
  font-family : 'HSSanTokki20-Regular';
`

const MainSection = styled.section<TextSectionProps>`
  width: 100vw;
  min-height: 100vh; 
  background: ${({ colorData }) =>
    getBackgroundGradient(colorData, '#444444')};
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const getBackgroundGradient = (colorData: string[], fallbackColor: string) => {
  if (colorData.length > 1) {
    return `linear-gradient(to right, ${colorData[0]}, ${colorData[1]})`;
  }
  return fallbackColor;
};