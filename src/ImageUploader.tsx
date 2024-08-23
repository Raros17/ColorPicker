import React from 'react';
import styled from 'styled-components';

interface ImageUploaderProps {
  inputRef: React.RefObject<HTMLInputElement>;
  handleProxyUrl: (url: string) => void;
  setColorData: React.Dispatch<React.SetStateAction<string[]>>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>; 
  isLoading:boolean
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ inputRef, handleProxyUrl, setColorData, setIsLoading, isLoading }) => {

  const handleImageUrl = (url: string) => {
    setIsLoading(true);
    const img = new Image();
    img.src = url;
    img.onload = () => {
      handleProxyUrl(url);
        setIsLoading(false);
    };
    img.onerror = () => {
      handleProxyUrl('');
      setColorData([]);
      setIsLoading(false);
      alert("올바른 이미지 주소를 넣어주세요!");
    };
  };

  const handleButtonClick = () => {
    if (inputRef.current) {
      const url = inputRef.current.value;
      handleImageUrl(url);
    };
  };

  const handleDataDelete = () => {
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }

  return (
    <InputSection>
      <InputTypeSection>
        <TextInput type="text" 
          defaultValue="" ref={inputRef} placeholder='이미지 주소를 넣으면 멋진 색상을 뽑아드립니다.'/>
        <TextDeleteBtn onClick={handleDataDelete}>X</TextDeleteBtn>
      </InputTypeSection>
      <ImageBtn onClick={handleButtonClick} disabled={isLoading}>
         {isLoading ? "로딩 중..." : "뽑기!"}
      </ImageBtn>
    </InputSection>
  );
}

export default ImageUploader;



const TextInput = styled.input`
  width: 100%;
  height: 2rem;
  border-radius: 10px;
  margin-right: 10px;
  font-size: 15px;
  padding-left: 1rem;
  color: #888;
  font-family: 'TheJamsil5Bold';
  outline: none;
  border  :none ;
`

const TextDeleteBtn = styled.button`
  width: 28px;
  height: 28px;
  border-radius: 50%;
  position: absolute;
  right: 1rem;
  cursor: pointer;
  transition: all 0.1s ease;
  font-weight: 500;
  border: 1px solid #222;
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
  font-family: 'TheJamsil5Bold';
  &:hover{
    background-color: #171717;
  }
`

const InputSection = styled.div`
  display: flex;
  justify-content: center;
  width: 60%;
`