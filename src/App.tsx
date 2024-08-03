import styled from 'styled-components';
import React, {useState} from 'react';
import ColorTheif from './component/colorTheif.tsx';
import ColorModal from './component/colorModal.tsx';

function App() {  
  const [colorData, setColorData] = useState<string[]>([]);
  const [imageUrl, setImageUrl] = useState<string>('');
  const [modalToggle, setModalToggle] = useState<boolean>(false);

  const handleModalOpen = () => {
    setModalToggle(!modalToggle);
  }

  const handleColorsExtracted = (colors: string[]) => {
    setColorData(colors);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setImageUrl(event.target.value);
  };

  const handleDataDelete = () => {
    setImageUrl("")
    setColorData([])
  }

  return (
    <MainSection>
            {modalToggle && (
        <Overlay onClick={handleModalOpen}>
          <ColorModal colorData={colorData} handleModalOpen={handleModalOpen}/>
        </Overlay>
      )}
      <TextSection>
        <Title>외부 이미지 주소 넣기</Title>
        <InputSection>
          <InputTypeSection>
            <TextInput type="text" value={imageUrl} onChange={handleInputChange}
            ></TextInput>
            <TextDeleteBtn onClick={handleDataDelete}>X</TextDeleteBtn>
          </InputTypeSection>
          <ImageBtn>뽑기!</ImageBtn>
        </InputSection>
        {imageUrl ? <Image src={imageUrl} alt="Selected" /> : <PlaceholderImage />}
      </TextSection>
      
      <ImageGroup>
      {colorData?.map((color, idx) => (
        <ColorWrapper key={idx}>
        <ColorCode>{color}</ColorCode>
        <PickedColor style={{ backgroundColor: color }} />
        </ColorWrapper>
      ))}
      <ColorDownBtn onClick={handleModalOpen}>얍!</ColorDownBtn>
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

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
`;

const ColorDownBtn = styled.button`
  width: 50px;
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
  &:hover {
    background-color: #101010;
  }
`

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
  display: flex;
  align-items: center;
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
  border: 1px solid #eeeeee;;
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
  width: 100%;
  height: 2rem;
  border-radius: 10px;
  margin-right: 10px;
  font-size: 16px;
  padding-left: 1rem;
`