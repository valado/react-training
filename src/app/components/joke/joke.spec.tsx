import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Joke } from './joke';

global.fetch = jest.fn() as any;

describe('Joke', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Joke />);
    expect(baseElement).toBeTruthy();
  });

  it('should call show joke after clicked', async () => {
    render(<Joke />);
    const expectedJoke = 'test';
    mockFetch({ value: expectedJoke });
    expect(screen.queryByText(expectedJoke)).toBeNull();
    const button = screen.getByRole('button');
    await userEvent.click(button);
    screen.getByText(expectedJoke);
  });
});

const mockFetch = (data: object) => {
  (global.fetch as jest.Mock).mockImplementation(() =>
    Promise.resolve({
      json: () => Promise.resolve(data),
    })
  );
};
