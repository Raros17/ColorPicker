import React, { useState, useRef } from 'react';
import ColorTheif from './component/colorTheif.tsx';
import ColorModal from './component/colorModal.tsx';
import ColorCodes from './component/ColorCode.tsx';
import ImageUploader from './component/ImageUploader.tsx';
import { 
  PlaceholderImage, 
  StyledImage, 
  ColorDownBtn, 
  ImageGroup, 
  TextSection, 
  Title, 
  MainSection,
  ShowSpoidColor
} from './App.styled.ts'; 



function App() {  
  const [colorData, setColorData] = useState<string[]>([]);
  const [imageUrl, setImageUrl] = useState<string>('');
  const [modalToggle, setModalToggle] = useState<boolean>(false);
  const [copiedColors, setCopiedColors] = useState<{ [key: number]: boolean }>({});
  const [isLoading, setIsLoading] = useState<boolean>(false); 
  const [isImageValid, setIsImageValid] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);
  

  const handleModalOpen = () => {
    setModalToggle(!modalToggle);
  }

  const handleColorsExtracted = (colors: string[]) => {
    setColorData(colors);
    setIsLoading(false);
  };

   const handleProxyUrl = (url: string) => { 
    const proxyUrl = '/api/cors-proxy?url=';
    setImageUrl(proxyUrl + encodeURIComponent(url)); 
  }

  


  return (
    <MainSection colorData={colorData || []}>
      {modalToggle && <ColorModal colorData={colorData} handleModalOpen={handleModalOpen} />}
      <TextSection colorData={colorData || []}>
        <Title>외부 이미지 주소 넣기</Title>
        <ImageUploader
          inputRef={inputRef}
          handleProxyUrl={handleProxyUrl}
          setColorData={setColorData}
          setIsLoading={setIsLoading}
          isLoading={isLoading} 
          setIsImageValid={setIsImageValid}
        />
         {imageUrl && isImageValid ?  (
          <StyledImage  src={imageUrl} alt="Selected" />
        ) : (
          <PlaceholderImage />
        )}
        <ShowSpoidColor></ShowSpoidColor>

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
