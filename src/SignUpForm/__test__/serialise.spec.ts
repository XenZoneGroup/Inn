import { serialiseCreateUser } from '../serialise';
import { databag, serialisedUser } from './helpers';

describe('Create Kooth User', () => {
  it('adds basic info', () => {
    expect(serialiseCreateUser(databag)["@context"]).toStrictEqual(
      serialisedUser["@context"]);
    expect(serialiseCreateUser(databag)["@type"]).toStrictEqual(
      serialisedUser["@type"]);
    expect(serialiseCreateUser(databag).applicationId).toStrictEqual(
      serialisedUser.applicationId);
  });

  it('serialises username', () => {
    expect(serialiseCreateUser(databag).username).toStrictEqual(
      serialisedUser.username);
  });

  it('serialises nickname', () => {
    expect(serialiseCreateUser(databag).nickname).toStrictEqual(
      serialisedUser.nickname);
  });

  it('serialises password', () => {
    expect(serialiseCreateUser(databag).password).toStrictEqual(
      serialisedUser.password);
  });

  it('serialises LAID', () => {
    expect(serialiseCreateUser(databag).customer).toStrictEqual(
      serialisedUser.customer);
  });

  it('sets default Avatar', () => {
    expect(serialiseCreateUser(databag).avatar).toStrictEqual(
      serialisedUser.avatar);
  });

  it("sets subLocation Ids", () => {
    const southEastUser = {
      ...databag,
      location: 'england',
      region: 'south-east',
    };

    const serialisedSouthEastUser = {
      ...serialisedUser,
      tags: [
        {
          "@id": "ed5b751d-e241-45d9-a981-ce78ca2ffe0f/England - South East",
          "@type": "SubLocation"
        }
      ]
    };

    expect(serialiseCreateUser(southEastUser).tags)
      .toStrictEqual(serialisedSouthEastUser.tags);

    const yorkshireUser = {
      ...databag,
      location: 'yorkshire-and-the-humber',
    };

    const serialisedYorkshireUser = {
      ...serialisedUser,
      tags: [
        {
          "@id": "ed5b751d-e241-45d9-a981-ce78ca2ffe0f/Yorkshire and the Humber",
          "@type": "SubLocation"
        }
      ]
    };

    expect(serialiseCreateUser(yorkshireUser).tags)
      .toStrictEqual(serialisedYorkshireUser.tags);

    const isleOfManUser = {
      ...databag,
      location: 'isle-of-man',
    };

    const serialisedIsleOfManUser = {
      ...serialisedUser,
      tags: [
        {
          "@id": "ed5b751d-e241-45d9-a981-ce78ca2ffe0f/Isle of Man",
          "@type": "SubLocation"
        }
      ]
    };

    expect(serialiseCreateUser(isleOfManUser).tags)
      .toStrictEqual(serialisedIsleOfManUser.tags);

    const doNotKnowUser = {
      ...databag,
      location: 'england',
      region: "i’m-not-sure...",
    };

    const serialisedDoNotKnowUser = {
      ...serialisedUser,
      tags: [
        {
          "@id": "ed5b751d-e241-45d9-a981-ce78ca2ffe0f/England - I dont know which region",
          "@type": "SubLocation"
        }
      ]
    };

    expect(serialiseCreateUser(doNotKnowUser).tags)
      .toStrictEqual(serialisedDoNotKnowUser.tags);

    const channelIslandsUser = {
      ...databag,
      location: 'the-channel-islands',
    };

    const serialisedChannelIslandsUser = {
      ...serialisedUser,
      tags: [
        {
          "@id": "ed5b751d-e241-45d9-a981-ce78ca2ffe0f/The Channel Islands",
          "@type": "SubLocation"
        }
      ]
    };

    expect(serialiseCreateUser(channelIslandsUser).tags)
      .toStrictEqual(serialisedChannelIslandsUser.tags);
  });

  it('serialises gender', () => {
    expect(serialiseCreateUser(databag).gender)
    .toStrictEqual(serialisedUser.gender);
  });

  it('serialises ethnicity', () => {
    const notStatedUser = {
      ...databag,
      ethnicity: 'not-stated',
      background: ' ',
    };

    const serialisedNotStatedUser = {
      ...serialisedUser,
      ethnicity: {
        "@type": "Ethnicity",
        "@id": "NotStated"
      }
    };

    expect(serialiseCreateUser(notStatedUser).ethnicity)
      .toStrictEqual(serialisedNotStatedUser.ethnicity);

    const otherUser = {
      ...databag,
      ethnicity: 'other',
      background: ' ',
    };

    const serialisedOtherUser = {
      ...serialisedUser,
      ethnicity: {
        "@type": "Ethnicity",
        "@id": "AnyOtherEthnicGroup"
      }
    };

    expect(serialiseCreateUser(otherUser).ethnicity)
      .toStrictEqual(serialisedOtherUser.ethnicity);

    const anyOtherAsianBackgroundUser = {
      ...databag,
      ethnicity: 'asian-or-asian-british',
      background: 'any-other-background',
    };

    const serialisedAnyOtherAsianBackgroundUser = {
      ...serialisedUser,
      ethnicity: {
        "@type": "Ethnicity",
        "@id": "AnyOtherAsianBackground"
      }
    };

    expect(serialiseCreateUser(anyOtherAsianBackgroundUser).ethnicity)
      .toStrictEqual(serialisedAnyOtherAsianBackgroundUser.ethnicity);

    const anyOtherBlackBackgroundUser = {
      ...databag,
      ethnicity: 'black-or-black-british',
      background: 'any-other-background',
    };

    const serialisedAnyOtherBlackBackgroundUser = {
      ...serialisedUser,
      ethnicity: {
        "@type": "Ethnicity",
        "@id": "AnyOtherBlackBackground"
      }
    };

    expect(serialiseCreateUser(anyOtherBlackBackgroundUser).ethnicity)
      .toStrictEqual(serialisedAnyOtherBlackBackgroundUser.ethnicity);

    const anyOtherWhiteBackgroundUser = {
      ...databag,
      ethnicity: 'white',
      background: 'any-other-background',
    };

    const serialisedAnyOtherWhiteBackgroundUser = {
      ...serialisedUser,
      ethnicity: {
        "@type": "Ethnicity",
        "@id": "AnyOtherWhiteBackground"
      }
    };

    expect(serialiseCreateUser(anyOtherWhiteBackgroundUser).ethnicity)
      .toStrictEqual(serialisedAnyOtherWhiteBackgroundUser.ethnicity);

    const anyOtherMixedBackgroundUser = {
      ...databag,
      ethnicity: 'mixed',
      background: 'any-other-background',
    };

    const serialisedAnyOtherMixedBackgroundUser = {
      ...serialisedUser,
      ethnicity: {
        "@type": "Ethnicity",
        "@id": "AnyOtherMixedBackground"
      }
    };

    expect(serialiseCreateUser(anyOtherMixedBackgroundUser).ethnicity)
      .toStrictEqual(serialisedAnyOtherMixedBackgroundUser.ethnicity);
  });

  it('serialises date of birth', () => {
    expect(serialiseCreateUser(databag).birthDate)
      .toStrictEqual(serialisedUser.birthDate);

    const octoberUser = {
      ...databag,
      month: 'october',
    };

    const serialisedOctoberUser = {
      ...serialisedUser,
      birthDate: "2007-10-01"
    };

    expect(serialiseCreateUser(octoberUser).birthDate)
      .toStrictEqual(serialisedOctoberUser.birthDate);
  });

  it('serialises referrer', () => {
    expect(serialiseCreateUser(databag).referrer)
      .toStrictEqual(serialisedUser.referrer);

    const trainingCourseUser = {
      ...databag,
      heardAboutUs: 'caba-training-course',
    };

    const serialisedTrainingCourseUser = {
      ...serialisedUser,
      referrer: "caba-training-course"
    };

    expect(serialiseCreateUser(trainingCourseUser).referrer)
      .toStrictEqual(serialisedTrainingCourseUser.referrer);
  });

  it('serialises research consent', () => {
    expect(serialiseCreateUser(databag).researchConsent.consent)
      .toStrictEqual(serialisedUser.researchConsent.consent);

    const consentUser = {
      ...databag,
      researchConsent: 'yes',
    };

    const serialisedConsentUser = {
      ...serialisedUser,
      researchConsent: {
        consent: true,
        datestamp: "2019-07-31T11:34:39.767Z"
      }
    };

    expect(serialiseCreateUser(consentUser).researchConsent.consent)
      .toStrictEqual(serialisedConsentUser.researchConsent.consent);
  });

  it.todo('handles errors');
});
