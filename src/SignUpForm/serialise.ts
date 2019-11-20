const serialiseCreateUser = (databag: any) => {
  const month = convertMonthToNum(databag.month);
  const consent = databag.researchConsent === 'yes';
  const CABA_CUSTOMER_ID = '6a225bf0-eed8-47aa-8e88-9fefebee6344';
  const KOOTH_APPLICATION_ID = '8bea7523-20ac-4d48-b0f6-eb6bdf861244';
  const DEFAULT_AVATAR = '0';

  return {
    '@context': 'https://vocabularies.xenzone.com/context.jsonld',
    '@type': 'ServiceUser',
    applicationId: `applications/${KOOTH_APPLICATION_ID}`,
    applicationServiceGroup: addType(
      'asg/YoungPeople',
      'ApplicationServiceGroup'
    ),
    avatar: addType(DEFAULT_AVATAR, 'Avatar'),
    birthDate: `${databag.year}-${month}-01`,
    customer: addType(CABA_CUSTOMER_ID, 'Customer'),
    ethnicity: addType(
      serialiseEthnicity(databag.ethnicity, databag.background),
      'Ethnicity'
    ),
    gender: addType(toCamelCase(databag.gender), 'Gender'),
    username: databag.username,
    nickname: databag.username,
    password: databag.password,
    referrer: databag.heardAboutUs,
    researchConsent: {
      consent: consent,
      datestamp: new Date().toISOString(),
    },
    tags: [
      addType(
        formatSublocationId(databag.location, databag.region),
        'SubLocation'
      ),
    ],
  };
};

const months : any = {
  "january": "01",
  "february": "02",
  "march": "03",
  "april": "04",
  "may": "05",
  "june": "06",
  "july": "07",
  "august": "08",
  "september": "09",
  "october": "10",
  "november": "11",
  "december": "12",
  }

const convertMonthToNum = (month: string) => {
  return months[month];
};

const addType = (id: string, type: string) => {
  return {
    '@id': id,
    '@type': type,
  };
};

const capitaliseFirstLetter = (word: string) => {
  return word.charAt(0).toUpperCase() + word.slice(1);
};

const serialiseEthnicity = (ethnicity: string, background: string) => {
  if (ethnicity === 'not-stated') {
                                                                                                                                                                                return 'NotStated';
  }

  if (ethnicity === 'other') {
                                                                                                                                                                                        return 'AnyOtherEthnicGroup';
                                                                                                                                                                                          }

  if (background === 'any-other-background' && ethnicity === "black-or-black-british") {
    return "AnyOtherBlackBackground";
                                                                                                                                                                                                  }

    if (background === 'any-other-background' && ethnicity === "asian-or-asian-british") {
      return "AnyOtherAsianBackground";
    }

  if (background === 'any-other-background') {
    return `AnyOther${capitaliseFirstLetter(ethnicity)}Background`;
  }

  return toCamelCase(background);
};

const toCamelCase = (gender: string) => {
  const camelCase = gender.replace(/-(.)/g, (match, word) => {
    return word.toUpperCase();
  });

  return capitaliseFirstLetter(camelCase);
};

const formatSublocationId = (location: string, region: string) => {
  let subLocationId = "ed5b751d-e241-45d9-a981-ce78ca2ffe0f/"
    .concat(formatLocation(location));

  if (region === "i’m-not-sure...") {
    subLocationId += " - I dont know which region";
  } else if (region) {
    subLocationId += " - " + formatLocation(region);
  }

  return subLocationId;
};

const formatLocation = (location: string) => {
  const words = location.split("-");

  if (location === "the-channel-islands") {
    return "The Channel Islands";
  }

  const capitalisedWords = words.map((word) => {
    if (word === "and" || word === "the" || word === "of") {
      return word;
    }
    return capitaliseFirstLetter(word);
  });

  return capitalisedWords.join(" ");
};

export {
  serialiseCreateUser
}
