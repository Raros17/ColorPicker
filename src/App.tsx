import styled from 'styled-components';
import React, {useState} from 'react';
import ColorTheif from './component/colorTheif.tsx';

function App() {
  
  const [colorData, setColorData] = useState<string[]>([]);
  const handleColorsExtracted = (colors: string[]) => {
    setColorData(colors);
  };
  console.log(colorData)

  return (
    <MainSection>
      <InputSection>
        <Title>이미지 색상 넣기</Title>
        <TextInput type="text"></TextInput>
        <ImageBtn>버튼</ImageBtn>
      </InputSection>
      <ImageGroup>
      {colorData?.map((color, idx) => (
        <ColorWrapper key={idx}>
        <ColorCode>`${color}`</ColorCode>
        <PickedColor style={{ backgroundColor: color }} />
        </ColorWrapper>
      ))}
      </ImageGroup>
      <ColorTheif onColorsExtracted={handleColorsExtracted} />
    </MainSection>
  );
}

export default App;

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

const InputSection = styled.section`
  width: 80%;
  background-color: #212121;
  border-radius: 20px;
  padding: 20px;
`

const Title = styled.h1`
  font-size: 25px;
  font-weight: 700;
  color: white;
`

const MainSection = styled.section`
  width: 100%;
  height: 100vh;
  background-color: #444444;
  display: flex;
  justify-content: center;
  align-items: center;
`

const TextInput = styled.input`
  width: 50%;
  height: 1.5rem;
  border-radius: 10px;
`