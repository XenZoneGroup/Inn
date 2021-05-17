import * as React from 'react';

import { SignUpFlowProps } from '../';
import { stringToRadioButton, nextButton } from '../../templates';
import { track } from '../../utils/analyticsEvents';

const englandRegions = [
  'London',
  'South East',
  'East',
  'South West',
  'West Midlands',
  'East Midlands',
  'North West',
  'North East',
  'Yorkshire and the Humber',
  'I’m not sure...',
];

const WhereDoYouLiveInEngland: React.FC<SignUpFlowProps> = ({
  formData,
  next,
}) => {
  const [region, setRegion] = React.useState<string>();
  const submit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    if (region) {
      track('sign-up', 'completed-where-england');
      next({ ...formData, region }, 'age');
    }
  };

  return (
    <form onSubmit={submit} className="sign-up-form">
      <h2>Awesome! Where in England?</h2>
      {englandRegions.map(r => stringToRadioButton('region', r, setRegion))}
      {nextButton()}
    </form>
  );
};

export { WhereDoYouLiveInEngland };
