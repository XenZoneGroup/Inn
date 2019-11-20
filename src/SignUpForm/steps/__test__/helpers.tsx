import { Config } from '../../index';
import {
  inspectPassword,
  validatePassword,
  inspectUsername,
  validateUsername,
  usernameIsNew,
} from '../../validation';

export const testConfig: Config = {
  currentYear: 2019,
  validatePassword,
  inspectPassword,
  validateUsername,
  inspectUsername,
  usernameIsNew: (un: string) => usernameIsNew(un, 'some-url'),
};
