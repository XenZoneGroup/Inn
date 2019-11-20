const databag = {
  location: 'scotland',
  year: '2007',
  month: 'february',
  username: 'username',
  password: 'Password',
  termsOfService: 'agreed',
  gender: 'female',
  ethnicity: 'mixed',
  background: 'white-and-black-african',
  researchConsent: 'no',
  heardAboutUs: "family/friends",
};

const serialisedUser = {
  "@context": "https://vocabularies.xenzone.com/context.jsonld",
  "@type": "ServiceUser",
  applicationServiceGroup: {
    "@id": "asg/YoungPeople",
    "@type": "ApplicationServiceGroup"
  },
  applicationId: "applications/8bea7523-20ac-4d48-b0f6-eb6bdf861244",
  customer: {
    "@type": "Customer",
    "@id": "6a225bf0-eed8-47aa-8e88-9fefebee6344"
  },
  password: "Password",
  username: "username",
  birthDate: "2007-02-01",
  nickname: "username",
  ethnicity: {
    "@type": "Ethnicity",
    "@id": "WhiteAndBlackAfrican"
  },
  gender: {
    "@type": "Gender",
    "@id": "Female"
  },
  avatar: {
    "@id": "0",
    "@type": "Avatar"
  },
  referrer: "family/friends",
  researchConsent: {
    consent: false,
    datestamp: "2019-07-31T11:34:39.767Z"
  },
  tags: [
    {
      "@id": "ed5b751d-e241-45d9-a981-ce78ca2ffe0f/Scotland",
      "@type": "SubLocation"
    }
  ]
};

export {
  databag,
  serialisedUser,
};

