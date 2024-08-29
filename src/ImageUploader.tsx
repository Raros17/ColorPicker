import React, {useRef} from 'react';
import { ImageBtn, InputSection, InputTypeSection, TextDeleteBtn, TextInput } from './ImageUploader.styled.ts';

interface ImageUploaderProps {
  inputRef: React.RefObject<HTMLInputElement>;
  handleProxyUrl: (url: string) => void;
  setColorData: React.Dispatch<React.SetStateAction<string[]>>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>; 
  isLoading:boolean
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ inputRef, handleProxyUrl, setColorData, setIsLoading, isLoading }) => {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleImageUrl = (url: string) => {
    timeoutRef.current = setTimeout(() => {
      setIsLoading(true);
    }, 500);

    const img = new Image();
    img.src = url;
    img.onload = () => {
      handleProxyUrl(url);
        setIsLoading(false);
        clearTimeout(timeoutRef.current!);
    };
    img.onerror = () => {
      handleProxyUrl('');
      setColorData([]);
      setIsLoading(false);
      clearTimeout(timeoutRef.current!);
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
    clearTimeout(timeoutRef.current!);
    setIsLoading(false);
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

