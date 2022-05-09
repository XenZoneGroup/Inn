import * as React from 'react';
import { render, fireEvent, cleanup, waitFor } from '@testing-library/react';
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

    const comp = render(
      <Username
        formData={dataBag}
        proceedToStep={proceedToStep}
        config={config}
      />
    );

    comp.getByText('Pick a username and password');

    config.usernameIsNew.mockReturnValue(Promise.resolve(true));
    await _setUsername(comp, 'iamausername', true);

    _setAndConfirmPassword(comp, 'A boring password 1');

    fireEvent.click(comp.getByTestId('terms-of-service'));

    fireEvent.click(comp.getByTestId('submit'));

    waitFor(() => {
      expect(comp.getByTestId('unique-username')).toBeInTheDocument();
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

    const comp = render(
      <Username
        formData={dataBag}
        proceedToStep={proceedToStep}
        config={config}
      />
    );

    config.usernameIsNew.mockReturnValue(Promise.resolve(true));
    await _setUsername(comp, 'iamausername', true);

    _setAndConfirmPassword(comp, 'somepass!');

    fireEvent.click(comp.getByTestId('submit'));

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

    const comp = render(
      <Username
        formData={dataBag}
        proceedToStep={proceedToStep}
        config={config}
      />
    );

    config.usernameIsNew.mockReturnValue(Promise.resolve(true));
    await _setUsername(comp, 'iamausername', true);

    config.validatePassword.mockReturnValue(false);
    _setAndConfirmPassword(comp, 'Pwd');

    fireEvent.click(comp.getByTestId('terms-of-service'));

    fireEvent.click(comp.getByTestId('submit'));

    waitFor(() => {
      expect(comp.getByTestId('unique-username')).toBeInTheDocument();
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

    const comp = render(
      <Username
        formData={dataBag}
        proceedToStep={proceedToStep}
        config={config}
      />
    );

    config.usernameIsNew.mockReturnValue(Promise.resolve(true));
    fireEvent.change(comp.getByTestId('username'), {
      target: { value: 'invalid username' },
    });
    await fireEvent.blur(comp.getByTestId('username'));

    _setAndConfirmPassword(comp, 'ValidPassword123%');

    fireEvent.click(comp.getByTestId('terms-of-service'));

    fireEvent.click(comp.getByTestId('submit'));

    expect(proceedToStep).not.toHaveBeenCalled();
  });

  it("won't accept existing usernames", async () => {
    const dataBag = {};
    const proceedToStep = jest.fn();
    const config = {
      ...testConfig,
      usernameIsNew: jest.fn(),
    };

    const comp = render(
      <Username
        formData={dataBag}
        proceedToStep={proceedToStep}
        config={config}
      />
    );

    _setAndConfirmPassword(comp, 'ValidPassword123%');

    fireEvent.click(comp.getByTestId('terms-of-service'));

    config.usernameIsNew.mockReturnValue(Promise.resolve(true));
    await _setUsername(comp, 'newUsername', true);
    await expect(config.usernameIsNew).toHaveBeenCalled();

    config.usernameIsNew.mockReturnValue(Promise.resolve(false));
    await _setUsername(comp, 'existingUsername', false);
    await expect(config.usernameIsNew).toHaveBeenCalled();

    fireEvent.click(comp.getByTestId('submit'));

    expect(proceedToStep).not.toHaveBeenCalled();

    config.usernameIsNew.mockReturnValue(Promise.resolve(true));
    await _setUsername(comp, 'newUsername', true);
    await expect(config.usernameIsNew).toHaveBeenCalled();

    fireEvent.click(comp.getByTestId('submit'));

    waitFor(() => {
      expect(comp.getByTestId('unique-username')).toBeInTheDocument();
    });

    waitFor(() => {
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

    const comp = render(
      <Username
        formData={dataBag}
        proceedToStep={proceedToStep}
        config={config}
      />
    );

    comp.getByText('Pick a username and password');

    config.usernameIsNew.mockReturnValue(Promise.resolve(true));
    await _setUsername(comp, 'iamausername', true);

    _setAndConfirmPassword(comp, 'A boring password 1');

    fireEvent.click(comp.getByTestId('terms-of-service'));
    fireEvent.click(comp.getByTestId('terms-of-service'));

    fireEvent.click(comp.getByTestId('submit'));

    expect(proceedToStep).not.toHaveBeenCalled();
  });

  it.todo('Existing username message not shown by default');

  it.todo('usesrnames are validated before checking for uniqueness');
});
