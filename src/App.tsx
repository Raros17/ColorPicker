import styled from 'styled-components';
import React, { useState, useRef } from 'react';
import ColorTheif from './component/colorTheif.tsx';
import ColorModal from './component/colorModal.tsx';

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

  const handleButtonClick = () => {
    if (inputRef.current) {
      const url = inputRef.current.value;
      loadImage(url);
    };

  };

  const loadImage = (url: string) => {
    const img = new Image();
    img.src = url;
    img.onload = () => {
      setImageUrl(url);
    };
    img.onerror = () => {
      setImageUrl('');
      setColorData([]);
      alert("올바른 이미지 주소를 넣어주세요!");
    };
  };

  const handleDataDelete = () => {
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }

  const handleColorCodeClick = (color: string, index: number) => {
    navigator.clipboard.writeText(color).then(() => {
      setCopiedColors(prev => ({ ...prev, [index]: true }));
      setTimeout(() => {
        setCopiedColors(prev => ({ ...prev, [index]: false }));
      }, 3000);
    });
  };

  return (
    <MainSection colorData={colorData || []}>
      {modalToggle && <ColorModal colorData={colorData} handleModalOpen={handleModalOpen} />}
      <TextSection colorData={colorData || []}>
        <Title>외부 이미지 주소 넣기</Title>
        <InputSection>
          <InputTypeSection>
            <TextInput type="text" 
              defaultValue="" ref={inputRef} placeholder='이미지 주소를 넣으면 멋진 색상을 뽑아드립니다.'/>
            <TextDeleteBtn onClick={handleDataDelete}>X</TextDeleteBtn>
          </InputTypeSection>
          <ImageBtn onClick={handleButtonClick}>뽑기!</ImageBtn>
        </InputSection>
        {imageUrl && colorData.length > 0 ? (
          <StyledImage  src={imageUrl} alt="Selected" />
        ) : (
          <PlaceholderImage />
        )}
      </TextSection>
      
      <ImageGroup>
        {colorData?.map((color, idx) => (
          <ColorWrapper key={idx}>
            <ColorCode
              onClick={() => handleColorCodeClick(color, idx)}
            >
              {copiedColors[idx] ? 'Copied!' : color}
            </ColorCode>
            <PickedColor style={{ backgroundColor: color }} />
          </ColorWrapper>
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

const TextDeleteBtn = styled.button`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  position: absolute;
  right: 1rem;
  cursor: pointer;
  transition: all 0.1s ease;
  font-weight: 500;
  &:hover {
    background-color: #d2d2d2;
  }
`

const InputTypeSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width : 100%;
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
  &:hover {
    background-color: #101010;
  }
`

const StyledImage = styled.img`
  width: 300px;
  height: 300px;
  border-radius: 10px;
  object-fit: cover;
  margin-top: 20px;
`

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
`

const ImageGroup = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap; 
  justify-content: center;
  width: 100%;
`

const PickedColor = styled.div`
  width: 100px;
  height: 50px;
  border-radius: 20px;
  margin: 5px;
`

const ImageBtn = styled.button`
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
  &:hover{
    background-color: #171717;
  }
`

const InputSection = styled.div`
  display: flex;
  justify-content: center;
  width: 60%;
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
`

const MainSection = styled.section<TextSectionProps>`
  width: 100vw;
  height: 100vh;
  background: ${({ colorData }) =>
    getBackgroundGradient(colorData, '#444444')};
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const TextInput = styled.input`
  width: 100%;
  height: 2rem;
  border-radius: 10px;
  margin-right: 10px;
  font-size: 16px;
  padding-left: 1rem;
`

const getBackgroundGradient = (colorData: string[], fallbackColor: string) => {
  if (colorData.length > 1) {
    return `linear-gradient(to right, ${colorData[0]}, ${colorData[1]})`;
  }
  return fallbackColor;
};