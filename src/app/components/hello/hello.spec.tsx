import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Hello } from './hello';

describe('Hello', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Hello name={''} />);
    expect(baseElement).toBeTruthy();
    screen.getByText(/Hello/i);
  });

  it('should show name when clicked', async () => {
    const expectedName = 'test';
    render(<Hello name={expectedName} />);
    // query returns null if not found
    expect(screen.queryByText(expectedName)).toBeNull();

    const button = screen.getByRole('button');
    await userEvent.click(button);
    // get throws if not found
    screen.getByText(`Hello ${expectedName}`);
  });
});
