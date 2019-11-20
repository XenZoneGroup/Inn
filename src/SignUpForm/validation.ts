import axios from 'axios';
import { AxiosResponse } from 'axios';

interface PasswordInspectionResult {
  isComplex: boolean;
  isLongEnough: boolean;
}

const lowerCase = /[a-z]/;
const upperCase = /[A-Z]/;
const numbers = /[0-9]/;
const symbols = /[-!$%^&*()_+|~=\s]/; //TODO - validate exact symbols we use

const inspectPassword = (password: string): PasswordInspectionResult => {
  const hasLowerCase = password.match(lowerCase) !== null;
  const hasUpperCase = password.match(upperCase) !== null;
  const hasNumbers = password.match(numbers) !== null;

  return {
    isComplex:
      [hasLowerCase, hasUpperCase, hasNumbers].filter(b => b)
        .length >= 2 && hasUpperCase,
    isLongEnough: password.length >= 8,
  };
};

const validatePassword = (password: string): boolean => {
  const passwordDetails = inspectPassword(password);
  return passwordDetails.isComplex && passwordDetails.isLongEnough;
};

interface UsernameInspectionResult {
  isCorrectLength: boolean;
  isReadable: boolean;
}

const usernameIsNew = async (un: string, apiRoot: string): Promise<boolean> => {
  let response;
  const KOOTH_APPLICATION_ID = '8bea7523-20ac-4d48-b0f6-eb6bdf861244'; // NE TODO: Get this from the mapping
  try {
    response = await axios.get(
      `${apiRoot}/check-username?username=${un}&applicationId=applications/${KOOTH_APPLICATION_ID}`
    )
  } catch (err) {
    console.log("error: ", err.message);
  }

  if (response && response.data) {
    return !response.data.exists; // NE TODO: Move
  }

  return false;

  // NE TODO: think about error handling and logging
};

const inspectUsername = (username: string): UsernameInspectionResult => {
  const hasSymbols = username.match(symbols) !== null;

  return {
    isCorrectLength: username.length >= 6 && username.length <= 20,
    isReadable: !hasSymbols,
  };
};

const validateUsername = (username: string): boolean => {
  const usernameDetails = inspectUsername(username);
  return usernameDetails.isCorrectLength && usernameDetails.isReadable;
};

export {
  inspectPassword,
  validatePassword,
  PasswordInspectionResult,
  inspectUsername,
  validateUsername,
  UsernameInspectionResult,
  usernameIsNew,
};
