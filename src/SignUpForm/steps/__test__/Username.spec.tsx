import * as React from 'react';
import {
  render,
  fireEvent,
  cleanup,
  waitFor,
  screen,
} from '@testing-library/react';
import { Username } from '../Username';
import { testConfig } from './helpers';

describe('Username', () => {
  afterEach(cleanup);

  const _setUsername = async (
    element: { getByTestId: any },
    username: string,
    isNew: boolean
  ) => {
    fireEvent.change(element.getByTestId('username'), {
      target: { value: username },
    });

    await fireEvent.blur(element.getByTestId('username'));

    if (isNew) {
      waitFor(() => {
        expect(element.getByTestId('unique-username')).toBeInTheDocument();
      });
    }
  };

  const _setAndConfirmPassword = (
    element: { getByTestId: any },
    password: string
  ) => {
    fireEvent.change(element.getByTestId('password'), {
      target: {
        value: password,
      },
    });

    fireEvent.change(element.getByTestId('password-confirm'), {
      target: {
        value: password,
      },
    });
  };

  it('Sends people to the About You step when they fill in the form correctly', async () => {
    const dataBag = {};
    const proceedToStep = jest.fn();
    const config = {
      ...testConfig,
      usernameIsNew: jest.fn(),
    };

    render(
      <Username
        formData={dataBag}
        proceedToStep={proceedToStep}
        config={config}
      />
    );

    screen.getByText('Pick a username and password');

    config.usernameIsNew.mockReturnValue(Promise.resolve(true));
    await _setUsername(screen, 'iamausername', true);

    _setAndConfirmPassword(screen, 'A boring password 1');

    fireEvent.click(screen.getByTestId('terms-of-service'));

    fireEvent.click(screen.getByTestId('submit'));

    waitFor(() => {
      expect(screen.getByTestId('unique-username')).toBeInTheDocument();
      expect(proceedToStep).toHaveBeenCalledWith(
        {
          username: 'iamausername',
          password: 'A boring password 1',
          termsOfService: 'agreed',
        },
        'about you'
      );
    });
  });

  it("Prevents people signing up if they don't agree to the terms of service", async () => {
    const dataBag = {};
    const proceedToStep = jest.fn();
    const config = {
      ...testConfig,
      usernameIsNew: jest.fn(),
    };

    render(
      <Username
        formData={dataBag}
        proceedToStep={proceedToStep}
        config={config}
      />
    );

    config.usernameIsNew.mockReturnValue(Promise.resolve(true));
    await _setUsername(screen, 'iamausername', true);

    _setAndConfirmPassword(screen, 'somepass!');

    fireEvent.click(screen.getByTestId('submit'));

    expect(proceedToStep).not.toHaveBeenCalled();
  });

  it('Wont accept invalid passwords', async () => {
    const dataBag = {};
    const proceedToStep = jest.fn();
    const config = {
      ...testConfig,
      validatePassword: jest.fn(),
      usernameIsNew: jest.fn(),
    };

    render(
      <Username
        formData={dataBag}
        proceedToStep={proceedToStep}
        config={config}
      />
    );

    config.usernameIsNew.mockReturnValue(Promise.resolve(true));
    await _setUsername(screen, 'iamausername', true);

    config.validatePassword.mockReturnValue(false);
    _setAndConfirmPassword(screen, 'Pwd');

    fireEvent.click(screen.getByTestId('terms-of-service'));

    fireEvent.click(screen.getByTestId('submit'));

    waitFor(() => {
      expect(screen.getByTestId('unique-username')).toBeInTheDocument();
      expect(config.validatePassword).toHaveBeenCalledWith('Pwd');
      expect(proceedToStep).not.toHaveBeenCalled();
    });
  });

  it('Wont accept invalid usernames', async () => {
    const dataBag = {};
    const proceedToStep = jest.fn();
    const config = {
      ...testConfig,
      usernameIsNew: jest.fn(),
    };

    render(
      <Username
        formData={dataBag}
        proceedToStep={proceedToStep}
        config={config}
      />
    );

    config.usernameIsNew.mockReturnValue(Promise.resolve(true));
    fireEvent.change(screen.getByTestId('username'), {
      target: { value: 'invalid username' },
    });
    await fireEvent.blur(screen.getByTestId('username'));

    _setAndConfirmPassword(screen, 'ValidPassword123%');

    fireEvent.click(screen.getByTestId('terms-of-service'));

    fireEvent.click(screen.getByTestId('submit'));

    expect(proceedToStep).not.toHaveBeenCalled();
  });

  it("won't accept existing usernames", async () => {
    const dataBag = {};
    const proceedToStep = jest.fn();
    const config = {
      ...testConfig,
      usernameIsNew: jest.fn(),
    };

    render(
      <Username
        formData={dataBag}
        proceedToStep={proceedToStep}
        config={config}
      />
    );

    _setAndConfirmPassword(screen, 'ValidPassword123%');

    fireEvent.click(screen.getByTestId('terms-of-service'));

    config.usernameIsNew.mockReturnValue(Promise.resolve(true));
    await _setUsername(screen, 'newUsername', true);
    await expect(config.usernameIsNew).toHaveBeenCalled();

    config.usernameIsNew.mockReturnValue(Promise.resolve(false));
    await _setUsername(screen, 'existingUsername', false);
    await expect(config.usernameIsNew).toHaveBeenCalled();

    fireEvent.click(screen.getByTestId('submit'));

    expect(proceedToStep).not.toHaveBeenCalled();

    config.usernameIsNew.mockReturnValue(Promise.resolve(true));
    await _setUsername(screen, 'newUsername', true);
    await expect(config.usernameIsNew).toHaveBeenCalled();

    fireEvent.click(screen.getByTestId('submit'));

    waitFor(() => {
      expect(screen.getByTestId('unique-username')).toBeInTheDocument();
      expect(proceedToStep).toHaveBeenCalledWith(
        {
          username: 'newUsername',
          password: 'ValidPassword123%',
          termsOfService: 'agreed',
        },
        'about you'
      );
    });
  });

  it('will fail validation if you click terms and conditions twice', async () => {
    const dataBag = {};
    const proceedToStep = jest.fn();
    const config = {
      ...testConfig,
      usernameIsNew: jest.fn(),
    };

    render(
      <Username
        formData={dataBag}
        proceedToStep={proceedToStep}
        config={config}
      />
    );

    screen.getByText('Pick a username and password');

    config.usernameIsNew.mockReturnValue(Promise.resolve(true));
    await _setUsername(screen, 'iamausername', true);

    _setAndConfirmPassword(screen, 'A boring password 1');

    fireEvent.click(screen.getByTestId('terms-of-service'));
    fireEvent.click(screen.getByTestId('terms-of-service'));

    fireEvent.click(screen.getByTestId('submit'));

    expect(proceedToStep).not.toHaveBeenCalled();
  });

  it.todo('Existing username message not shown by default');

  it.todo('usesrnames are validated before checking for uniqueness');
});
