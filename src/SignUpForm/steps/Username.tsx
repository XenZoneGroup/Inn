import * as React from 'react';

import { nextButton, checkBox, tickGlyph } from '../../templates';
import { SignUpFlowProps, SignUpStep } from '../';
import { usernameIsNew } from '../validation';
import { track } from '../../utils/analyticsEvents';

const EMPTY = ' ';

const Username: React.FC<SignUpFlowProps> = ({ formData, next, config }) => {
  const {
    inspectPassword,
    validatePassword,
    inspectUsername,
    validateUsername,
    usernameIsNew,
  } = config;
  const [username, setUsername] = React.useState<string>(EMPTY);
  const [isNewUsername, setIsNewUsername] = React.useState<boolean>(false);
  const [password, setPassword] = React.useState<string>(EMPTY);
  const [passwordCheck, setPasswordCheck] = React.useState<string>(EMPTY);
  const [passwordMatches, setPasswordMatches] = React.useState<boolean>(false);
  const [termsOfService, setTermsOfService] = React.useState<boolean>(false);

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    const agreedToTermsOfService = termsOfService ? 'agreed' : 'not-agreed';
    const uniqueUsername = await usernameIsNew(username);
    setIsNewUsername(uniqueUsername);
    if (
      agreedToTermsOfService === 'agreed' &&
      validatePassword(password) &&
      validateUsername(username) &&
      uniqueUsername && passwordMatches && (password !== username)
    ) {
      track('sign-up', 'completed-username');
      next(
        {
          ...formData,
          username,
          password,
          termsOfService: agreedToTermsOfService,
        },
        SignUpStep.ABOUT_YOU
      );
    }
  };

  const updateUsername = (event: React.ChangeEvent<HTMLInputElement>) => {
    const val = event.currentTarget.value;
    setUsername(val);
  };

  const checkPasswordMatches = (event: React.ChangeEvent<HTMLInputElement>) => {
    const val = event.currentTarget.value;
    setPasswordMatches(password === val);
    setPasswordCheck(val);
  }

  const updatePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    const val = event.currentTarget.value;
    setPassword(val);
    setPasswordMatches(val === passwordCheck);
  };

  const checkUsername = async (event: React.FocusEvent<HTMLInputElement>) => {
    const isNew = await usernameIsNew(username);
    setIsNewUsername(isNew);
  };


  const { isComplex, isLongEnough } = inspectPassword(password);
  const { isCorrectLength, isReadable } = inspectUsername(username);

  return (
    <form onSubmit={submit} className="sign-up-form">
      <h2>Pick a username and password</h2>
      <p className="info">
        Make sure you remember your username and password. It's the only way to
        access your account.
      </p>
      <p className="hint">
        To protect your anonymity don't use real names, your date of birth or
        your username from another site or service.
      </p>
      <label htmlFor="username">Username</label>
      <input
        id="username"
        data-testid="username"
        onChange={updateUsername}
        onBlur={checkUsername}
        type="text"
      />
      <ul className="usernameReqs">
        {tickGlyph('Please do not use special symbols', isReadable)}
        {tickGlyph('Between 6 and 20 characters', isCorrectLength)}
        {tickGlyph('Username must be unique (not already used on Kooth)', isNewUsername, (isNewUsername) ? 'unique-username' : 'not-unique-username') }
      </ul>
      <label htmlFor="password">Password</label>
      <input
        id="password"
        data-testid="password"
        type="password"
        onChange={updatePassword}
      />
      <ul className="passwordReqs">
        {tickGlyph(
          'Mixture of upper case, lower case or numbers',
          isComplex
        )}
        {tickGlyph('8 or more characters', isLongEnough)}
        {tickGlyph('Cannot match your username', username.toLowerCase() !== password.toLowerCase())}
      </ul>
      <label htmlFor="confirm-password">Confirm your password</label>
      <input
        id="confirm-password"
        data-testid="password-confirm"
        type="password"
        onChange={ checkPasswordMatches }
      />
      <ul className="passwordReqs">{tickGlyph('Matches', passwordMatches)}</ul>
      <p className="form-text">
        To use Kooth you must agree to our terms of service and read our <a href="https://caba.kooth.com/privacy-and-safety" target="_blank">Privacy
        and Safety page</a>
      </p>
      {checkBox(
        'I agree',
        'terms-of-service',
        termsOfService,
        setTermsOfService
      )}
      {nextButton()}
    </form>
  );
};

export { Username };
