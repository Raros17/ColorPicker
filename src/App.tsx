import styled from 'styled-components';
import React, {useState} from 'react';
import ColorTheif from './component/colorTheif.tsx';

function App() {  
  const [colorData, setColorData] = useState<string[]>([]);
  const [imageUrl, setImageUrl] = useState<string>('');

  const handleColorsExtracted = (colors: string[]) => {
    setColorData(colors);
  };
  console.log(colorData)

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setImageUrl(event.target.value);
  };

  return (
    <MainSection>
      <TextSection>
        <Title>이미지 주소 넣기</Title>
        <InputSection>
          <TextInput type="text" value={imageUrl} onChange={handleInputChange} ></TextInput>
          <ImageBtn>버튼</ImageBtn>
        </InputSection>
        {imageUrl && <Image src={imageUrl} alt="Selected" />}
      </TextSection>
      
      <ImageGroup>
      {colorData?.map((color, idx) => (
        <ColorWrapper key={idx}>
        <ColorCode>{color}</ColorCode>
        <PickedColor style={{ backgroundColor: color }} />
        </ColorWrapper>
      ))}
      </ImageGroup>
      {imageUrl && <ColorTheif imageUrl={imageUrl} onColorsExtracted={handleColorsExtracted} />}
    </MainSection>
  );
}

export default App;

const Image = styled.img`
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

`

const ImageGroup = styled.div`
  width: 100%;
  display: flex;
`
const PickedColor = styled.div`
  width: 100px;
  height: 50px;
  border-radius: 20px;
  margin: 5px;
`

const ImageBtn = styled.button`
  width: 100px;
  height: 2rem;
  color: #fff;
  background-color: #272727;
  border-radius: 20px;
  cursor: pointer;
`

const InputSection = styled.div`
  display: flex;
  width: 100%;
`

const TextSection = styled.section`
  width: 80%;
  background-color: #212121;
  border-radius: 20px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const Title = styled.h1`
  font-size: 20px;
  font-weight: 700;
  color: white;
  margin-bottom: 10px;
`

const MainSection = styled.section`
  width: 100%;
  height: 100vh;
  background-color: #444444;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`

const TextInput = styled.input`
  width: 30%;
  height: 1.5rem;
  border-radius: 10px;
  margin-right: 10px;
`