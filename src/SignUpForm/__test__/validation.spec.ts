import {
  inspectPassword,
  inspectUsername,
  usernameIsNew,
  validatePassword,
  validateUsername
} from '../validation';
import axios from 'axios';

jest.mock('axios');

describe('validation', () => {
  it(
    'says a password is complex if it contains at' +
      'least two of lower case, upper case, or numbers and at least one capital',
    () => {
      expect(inspectPassword('some-pass').isComplex).toBe(false);
      expect(inspectPassword('somepass1').isComplex).toBe(false);
      expect(inspectPassword('SOMEpass').isComplex).toBe(true);
      expect(inspectPassword('some pass').isComplex).toBe(false);
      expect(inspectPassword('some pass FIVE').isComplex).toBe(true);
      expect(inspectPassword('$password').isComplex).toBe(false);

      expect(inspectPassword('11111111').isComplex).toBe(false);
      expect(inspectPassword('        ').isComplex).toBe(false);
      expect(inspectPassword('aaaaaaaa').isComplex).toBe(false);
      expect(inspectPassword('%%%%%%%%').isComplex).toBe(false);
    }
  );

  it(`says a password is long enough if it is 8 or more characters`, () => {
    expect(inspectPassword('12345678').isLongEnough).toBe(true);
    expect(inspectPassword('1234567890').isLongEnough).toBe(true);
    expect(inspectPassword('1234567').isLongEnough).toBe(false);
  });

  it('says a username is within the correct length range', () => {
    expect(inspectUsername('123456').isCorrectLength).toBe(true);
    expect(inspectUsername('12345678901234567890').isCorrectLength).toBe(true);

    expect(inspectUsername('12345').isCorrectLength).toBe(false);
    expect(inspectUsername('123456789012345678901').isCorrectLength).toBe(
      false
    );
  });

  it('says a username is readable', () => {
    expect(inspectUsername('123hElLo456').isReadable).toBe(true);

    expect(inspectUsername('hello 456').isReadable).toBe(false);
    expect(inspectUsername('      ').isReadable).toBe(false);
    expect(inspectUsername('$$$$$$').isReadable).toBe(false);
  });

  it('validates a password', () => {
    expect(validatePassword("password")).toBe(false);
    expect(validatePassword("pwd")).toBe(false);
    expect(validatePassword("Password")).toBe(true);
  })

  it('validates a username', () => {
    expect(validateUsername("hello world")).toBe(false);
    expect(validateUsername("hello")).toBe(false);
    expect(validateUsername("helloworld")).toBe(true);
  })

  it('says if a username is already in use', async () => {
    const mockResponse = {
      data: {
        "exists": true,
        "meta": {
          "count": 1,
          "offset": 0,
          "limit": 10
        },
      },
      status: 200,
      statusText: 'OK',
      headers: {},
      config: {},
      request: {}
    };

    (axios.get as jest.Mock).mockImplementationOnce(() =>
      Promise.resolve(mockResponse)
    );

    expect(await usernameIsNew('userExists', 'https://some-uri.kooth.com')).toBe(false);
    expect(axios.get).toHaveBeenCalledWith(
      'https://some-uri.kooth.com/check-username?username=userExists&applicationId=applications/8bea7523-20ac-4d48-b0f6-eb6bdf861244'
    );
  });

  it('says if a username is new', async () => {
    const mockResponse = {
      data: {
        "exists": false,
        "meta": {
          "count": 1,
          "offset": 0,
          "limit": 10
        },
      },
      status: 200,
      statusText: 'OK',
      headers: {},
      config: {},
      request: {}
    };

    (axios.get as jest.Mock).mockImplementationOnce(() =>
      Promise.resolve(mockResponse)
    );

    expect(await usernameIsNew('newUser', 'https://some-uri.kooth.com')).toBe(true);
    expect(axios.get).toHaveBeenCalledWith(
      'https://some-uri.kooth.com/check-username?username=newUser&applicationId=applications/8bea7523-20ac-4d48-b0f6-eb6bdf861244'
    );
  });
});
