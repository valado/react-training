import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { LoginForm } from './login-form';
import { MemoryRouter } from 'react-router-dom';
import * as auth from 'src/app/auth/auth-context';

describe('LoginForm', () => {
  let loginMock: jest.Mock;

  beforeEach(() => {
    loginMock = jest.fn().mockReturnValue(Promise.resolve());
    jest.spyOn(auth, 'useAuth').mockReturnValue({
      login: loginMock,
      isAuthenticated: false,
      register: jest.fn(),
      logout: jest.fn(),
    });
  });

  it('rendering and submitting a basic Formik form', async () => {
    const testEmail = 'test@mail.com';
    const testPassword = 'test-password';

    render(
      <MemoryRouter>
        <LoginForm />
      </MemoryRouter>
    );

    const user = userEvent.setup();

    await user.type(screen.getByRole('textbox', { name: /email/i }), testEmail);
    // password doesn't have a role due to security reasons
    // https://github.com/testing-library/dom-testing-library/issues/567
    await user.type(screen.getByLabelText(/password/i), testPassword);
    await user.click(screen.getByRole('button', { name: /login/i }));

    await waitFor(() =>
      expect(loginMock).toHaveBeenCalledWith(testEmail, testPassword)
    );
  });
});
