import styled from 'styled-components';
import React from 'react';
import ColorTheif from './component/colorTheif';

function App() {
  const colorData = [];
  return (
    <MainSection>
      <InputSection>
        <Title>이미지 색상 넣기</Title>
        <TextInput type="text"></TextInput>
        <ImageBtn>버튼</ImageBtn>
      </InputSection>
      <ImageGroup>
      {colorData?.map((color) => (
        <PickedColor style={{ backgroundColor: color }} />
      ))}
      </ImageGroup>
    </MainSection>
  );
}

export default App;

const ImageGroup = styled.div`
  width: 100%;
`
const PickedColor = styled.div`
  width: 20px;
  height: 20px;
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