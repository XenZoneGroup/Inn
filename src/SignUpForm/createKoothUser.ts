import axios from 'axios';
import urlJoin from 'url-join';

const createUserEndpoint = (apiRoot: string) : string => urlJoin(apiRoot, '/create-service-user');
const loginUserEndpoint = (apiRoot: string) : string => urlJoin(apiRoot, '/token');

const KOOTH_ASG = '8bea7523-20ac-4d48-b0f6-eb6bdf861244';

import { serialiseCreateUser } from './serialise';

const createUser = async (userData : any, endpoint: string) => {
  await axios.post(
    createUserEndpoint(endpoint),
    serialiseCreateUser(userData)
  );
};

const logUserIn = async (username : string, password : string, apiRoot: string, userProfileEndpoint: string) => {
  const dataToPost = {
      username, password,
      "grant_type": "password",
      "scope": `type:ServiceUser applicationId:applications/${KOOTH_ASG}`
  };

  const form = Object.entries(dataToPost).reduce((acc, [key, val]) => {
    const maybeAmpersand = (acc.length !== 0) ? '&' : '';
    return acc + `${maybeAmpersand}${key}=${encodeURIComponent(val)}`
  }, "");

  const response = await axios.post(
    loginUserEndpoint(apiRoot),
    form,
    {
      'headers': {'content-type': 'application/x-www-form-urlencoded'},
      'withCredentials': true
    }
  );
  const authData = response.data;

  const userProfileResponse = await axios.get(
    userProfileEndpoint,
    { headers: { 'Authorization': `Bearer ${authData.access_token}`} }
  );

  localStorage.setItem("loginCount", "1");
  localStorage.setItem("isFirstLogin", "true");
  localStorage.setItem("authData", JSON.stringify({
    ...authData,
    username: userProfileResponse.data
  }));
};

const createKoothUserAPI = async (userData : any, apiRoot: string, userProfileEndpoint: string, onError : (msg : string) => void) => {
  try {
    await createUser(userData, apiRoot);
  } catch(e) {
    console.log(e);
    onError(e.message);
  }
  try {
    const token = await logUserIn(userData.username, userData.password, apiRoot, userProfileEndpoint);
    window.location.href = "/beta";
  } catch(e) {
    console.log(e);
    onError(e.message);
  }
}

export {
  createKoothUserAPI
}
