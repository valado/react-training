import { FC } from 'react';

interface InputProps {
  onInputChange: (input: string) => void;
}

export const Input: FC<InputProps> = ({ onInputChange }) => {
  return (
    <input
      type="text"
      onChange={(e) => {
        onInputChange(e.target.value);
      }}
      data-testid="input-element"
    />
  );
};
