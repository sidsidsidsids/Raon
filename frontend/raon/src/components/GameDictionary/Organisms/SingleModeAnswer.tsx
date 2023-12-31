import React, { useEffect, KeyboardEvent } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import smile from '../../../assets/Images/smile.png';
import Firework from '../../Common/Organisms/Firework.tsx';
import cry from '../../../assets/Images/cry.png';
import Tear from '../../Common/Organisms/Tear.tsx';
import { useBGM } from '../../../sound/SoundContext.tsx';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

const ModalContainer = styled.div`
  background-color: #ffffff;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  width: 27.5rem;
  height: 32.5rem;
  border-radius: 0.5rem;
  box-shadow: 0rem 0rem 0.9375rem rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const TopSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: 'CookieRun';
  font-size: 3rem;
  width: 100%;
`;

const FaceImage = styled.img`
  max-height: 18.75rem; /* You can adjust based on your requirements */
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 1.25rem; // 간격을 주기 위해 추가
`;

const Button = styled.button`
  margin: 1.25rem;
  padding: 1.25rem 1.875rem;
  border: none;
  border-radius: 5rem;
  background-color: #ffcd4a;
  font-size: 1.25rem;
  font-family: 'CookieRun';
  color: white;
  cursor: pointer;

  &:hover {
    background-color: #ffcd4a;
  }
`;

type Props = {
  onClose: () => void;
  answer: string;
  isCorrect: boolean;
};

const SingleModeAnswer: React.FC<Props> = ({ onClose, answer, isCorrect }) => {
  const navigate = useNavigate();
  const { startBGM, isMuted } = useBGM();

  useEffect(() => {
    if (!isMuted) {
      if (isCorrect) {
        startBGM('correct');
      } else {
        startBGM('incorrect');
      }
    }
  });

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      console.log('눌르긴함');
      onClose();
    }
  };

  if (isCorrect) {
    return (
      <>
        <Firework />
        <ModalOverlay onKeyDown={handleKeyDown} tabIndex={0}>
          <ModalContainer>
            <TopSection>
              <div>맞았어요!</div>
              <FaceImage src={smile} alt="Smile" />
              <div>답 : {answer}</div>
            </TopSection>
            <ButtonGroup>
              <Button onClick={onClose}>다음 문제</Button>
              <Button onClick={() => navigate('/main')}>나가기</Button>
            </ButtonGroup>
          </ModalContainer>
        </ModalOverlay>
      </>
    );
  }
  return (
    <>
      <Tear />
      <ModalOverlay onKeyDown={handleKeyDown} tabIndex={0}>
        <ModalContainer>
          <TopSection>
            <div>틀렸어요..</div>
            <FaceImage src={cry} alt="Cry" />
            <div>답 : {answer}</div>
          </TopSection>
          <ButtonGroup>
            <Button onClick={onClose}>다음 문제</Button>
            <Button onClick={() => navigate('/main')}>나가기</Button>
          </ButtonGroup>
        </ModalContainer>
      </ModalOverlay>
    </>
  );
};

export default SingleModeAnswer;
