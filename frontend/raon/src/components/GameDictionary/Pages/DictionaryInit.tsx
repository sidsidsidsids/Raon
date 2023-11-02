import React from 'react';
import styled from 'styled-components';
import InitInterface from '../Organisms/InitInterface';
import LeftSpeakBalloon from '../Atoms/LeftSpeakBalloon';
import RightSpeakBalloon from '../Atoms/RightSpeakBalloon';
import HelpCharacter from '../../Common/Atoms/HelpCharacterDiv';

const ContentDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const SpeakEventLeftDiv = styled.div`
  position: fixed;
  top: 13%;
  left: 2%;
  z-index: 5;
`;
const SpeakEventRightTopDiv = styled.div`
  position: fixed;
  top: 40%;
  right: 2%;
  z-index: 5;
`;

const DictionaryInit = () => {
  return (
    <div>
      <SpeakEventLeftDiv>
        <LeftSpeakBalloon content="??" />
      </SpeakEventLeftDiv>
      <SpeakEventRightTopDiv>
        <RightSpeakBalloon content=" ! " />
      </SpeakEventRightTopDiv>
      <ContentDiv>
        <InitInterface />
      </ContentDiv>
      <HelpCharacter
        onClick={() => {
          console.log('도와줄게');
        }}
      />
    </div>
  );
};
export default DictionaryInit;