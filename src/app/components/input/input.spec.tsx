import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Input } from './input';

describe('Input', () => {
  let onInputChangeMock: jest.Mock;

  beforeEach(() => {
    onInputChangeMock = jest.fn();
  });

  it('should render successfully', () => {
    const { baseElement } = render(<Input onInputChange={onInputChangeMock} />);
    expect(baseElement).toBeTruthy();
  });

  it('should call onInputChange', async () => {
    const expectedInput = 'test';
    render(<Input onInputChange={onInputChangeMock} />);
    const input = screen.getByTestId('input-element');
    await userEvent.type(input, expectedInput);
    expect(onInputChangeMock).toHaveBeenCalledWith(expectedInput);
  });
});
