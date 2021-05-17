import * as React from 'react';

import { SignUpFlowProps } from '../';
import { stringToRadioButton, dropDownMenu, nextButton } from '../../templates';
import { track } from '../../utils/analyticsEvents';

const genders = ['Male', 'Female', 'Agender', 'Gender Fluid'];
const NOT_SET = ' ';

type EthnicityKey =
  | 'not-set'
  | 'asian-or-asian-british'
  | 'black-or-black-british'
  | 'white'
  | 'mixed'
  | 'other'
  | 'not-stated';

type EthnicityDisplay =
  | ' '
  | 'Asian or Asian British'
  | 'Black or Black British'
  | 'White'
  | 'Mixed'
  | 'Any other ethnic group'
  | "I'd rather not say";

const ethnicities: {
  [k in EthnicityKey]: { name: EthnicityDisplay; backgrounds: string[] | null };
} = {
  'not-set': {
    name: ' ',
    backgrounds: null,
  },
  'asian-or-asian-british': {
    name: 'Asian or Asian British',
    backgrounds: [
      'Bangladeshi',
      'Chinese',
      'Indian',
      'Pakistani',
      'Any other background',
    ],
  },
  'black-or-black-british': {
    name: 'Black or Black British',
    backgrounds: ['African', 'Caribbean', 'Any other background'],
  },
  white: {
    name: 'White',
    backgrounds: ['British', 'Irish', 'Any other background'],
  },
  mixed: {
    name: 'Mixed',
    backgrounds: [
      'White and Asian',
      'White and Black African',
      'White and Black Caribbean',
      'Any other background',
    ],
  },
  other: {
    name: 'Any other ethnic group',
    backgrounds: null,
  },
  'not-stated': {
    name: "I'd rather not say",
    backgrounds: null,
  },
};

const _hasBackgrounds = (ethnicity: EthnicityKey): boolean =>
  ethnicities[ethnicity].backgrounds !== null;

const AboutYou: React.FC<SignUpFlowProps> = ({ formData, next }) => {
  const [gender, setGender] = React.useState();
  const [ethnicity, setEthnicity] = React.useState<EthnicityKey>(
    'not-set' as EthnicityKey
  );
  const [background, setBackground] = React.useState<string>(NOT_SET);
  const submit = (event: React.FormEvent) => {
    event.preventDefault();

    if (
      gender &&
      (ethnicity === 'not-stated' ||
        ethnicity === 'other' ||
        (ethnicity !== 'not-set' && background !== ' '))
    ) {
      track('sign-up', 'completed-about-you');
      next(
        { ...formData, gender, ethnicity, background },
        'research and marketing'
      );
    }
  };

  const updateEthnicity = (event: React.FormEvent<HTMLSelectElement>) => {
    const val = event.currentTarget.value;
    setEthnicity(val as EthnicityKey);
    setBackground(NOT_SET);
  };

  const updateBackground = (event: React.FormEvent<HTMLSelectElement>) => {
    const val = event.currentTarget.value;
    setBackground(val);
  };

  return (
    <form onSubmit={submit} className="sign-up-form">
      <h2>Which best describes you?</h2>

      <p className="info">
        These questions help us to understand who uses Kooth.
      </p>

      <fieldset>
        <legend>My gender is best described as</legend>

        {genders.map(gender =>
          stringToRadioButton('gender', gender, setGender)
        )}
      </fieldset>

      {dropDownMenu(
        'My ethnicity most closely matches',
        'ethnicity',
        updateEthnicity,
        Object.keys(ethnicities).map((e: EthnicityKey) => ethnicities[e].name),
        Object.keys(ethnicities)
      )}

      {_hasBackgrounds(ethnicity)
        ? dropDownMenu('Background', 'background', updateBackground, [
            ' ',
            ...ethnicities[ethnicity].backgrounds,
          ])
        : null}
      {nextButton()}
    </form>
  );
};

export { AboutYou };
