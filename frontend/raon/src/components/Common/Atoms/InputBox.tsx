import React, { useState, ChangeEvent } from 'react';

interface InputBoxProps {
  inputText: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: () => void; // onBlur 핸들러를 선택적 프로퍼티로 추가
  placeHolder?: string;
}

const InputBox = ({
  inputText,
  onChange,
  onBlur,
  placeHolder,
}: InputBoxProps) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();
  };

  const formStyle = {
    width: '100%',
  };

  const inputStyle: React.CSSProperties = {
    boxSizing: 'border-box',
    height: '3.125rem',
    width: '31.25rem',
    padding: '0.625rem',
    borderRadius: '1rem',
    borderColor: isFocused ? '#a2d6ab' : '#c0c0c0',
    borderStyle: 'solid',
    outline: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  return (
    <form style={formStyle} onSubmit={handleFormSubmit}>
      <input
        value={inputText}
        style={inputStyle}
        placeholder={placeHolder || '값을 입력해주세요'}
        onFocus={handleFocus}
        onBlur={onBlur}
        onChange={onChange}
        autoComplete="off"
      />
    </form>
  );
};
InputBox.defaultProps = {
  onBlur: console.log('test'),
  placeHolder: '값을 입력해주세요',
};
export default InputBox;
