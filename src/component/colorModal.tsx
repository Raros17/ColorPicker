import React from 'react';
import styled from 'styled-components';
import html2canvas from 'html2canvas';

interface ColorModalProps {
  colorData: string[];
  handleModalOpen: () => void;
}

const ColorModal: React.FC<ColorModalProps>  = ({colorData, handleModalOpen}) => {   
  const handleCopyColorText = async() => {
    const combinedText = colorData.join('\n');
    try {
      await navigator.clipboard.writeText(combinedText);
      alert('색상 코드가 복사되었습니다.');
    } catch (err) {
      console.error('텍스트 복사에 실패했습니다:', err);
    }
  }

  const handleDownloadImage = ()=>{
    const modalElement = document.getElementById('modal');
    if(modalElement) {
      html2canvas(modalElement).then(canvas => {
        const link = document.createElement('a');
        link.href = canvas.toDataURL('image/png');
        link.download = 'color-palette-image.png';
        link.click();
      })
    }
  }
    return (
      <>
        <ModalWrapper >
          <ModalTextWrapper id='modal'>
            <ModalTitle>My Colors</ModalTitle>
                  {colorData.map((color, idx) => (
                    <ColorDataList key={idx}>
            <ColorCircle style={{ backgroundColor: color }}/>
            <ColorTag>{color}</ColorTag>          
                    </ColorDataList>
                  ))}
          </ModalTextWrapper>
      <DownBtnWrapper>
        <DownloadTextBtn onClick={handleCopyColorText}>텍스트 복사</DownloadTextBtn>
        <DownloadImgBtn onClick={handleDownloadImage}>이미지 저장</DownloadImgBtn>
      </DownBtnWrapper>
        </ModalWrapper>
        <Overlay onClick={handleModalOpen}/>
        </>
        
    )
  };
  
  export default ColorModal;

  const ModalTextWrapper = styled.div`
    padding: 15px 0;
    background-color: inherit;
    width: 100%;
    border-radius: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  `

  const DownBtnWrapper = styled.div`
    display: flex;
    width: 100%;
    justify-content: center;
  `

  const DownloadImgBtn = styled.button`
    background-color: #d8d8d8;
    width: 80%;
    max-width: 150px;
    height: 40px;
    font-size: 16px;
    font-weight: 800;
    cursor: pointer;
    border-radius: 20px;
    transition: all 0.1s ease;
    margin: 15px 10px 0 10px;
    &:hover{
      background-color: #ffffff;;
    }
  `

  const DownloadTextBtn = styled(DownloadImgBtn)`
    background-color:#ececec;
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
    cursor: pointer;
  `;
  const ModalTitle = styled.h4`
    font-size: 25px;
    font-weight: 800;
    margin-bottom: 1.5rem;
  `

  const ColorTag = styled.li`
    font-size: 20px;
    margin-bottom: 20px;
    font-weight: 800;
    width: 100px;
  `

  const ColorCircle = styled.div`
    width: 40px;
    margin-right: 10px;
    height: 30px;
    border-radius: 10px;
    border: 1px solid #fff;
  `

  const ColorDataList = styled.ul`
    display: flex;
  `

  const ModalWrapper = styled.section`
    color: #fff;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.5);
    width: 30%;
    height: 60%;
    background-color: #101010;
    border-radius: 20px;
    position: absolute;
    z-index: 3;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  `