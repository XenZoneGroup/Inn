import * as React from 'react';
import { stringToRadioButton, nextButton } from '../../templates';
import { SignUpStepComponentsProps } from '../';
import { track } from '../../utils/analyticsEvents';

const locations = [
  'England',
  'Northern Ireland',
  'Scotland',
  'Wales',
  'The Channel Islands',
  'Isle of Man',
];

const WhereDoYouLive: React.FC<SignUpStepComponentsProps> = ({
  formData,
  proceedToStep,
}) => {
  const [location, setLocation] = React.useState<string>();
  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    if (location === 'england') {
      track('sign-up', 'completed-where-live');
      proceedToStep({ ...formData, location }, 'region');
    } else if (location) {
      track('sign-up', 'completed-where-live');
      proceedToStep({ ...formData, location }, 'age');
    }
  };

  return (
    <form onSubmit={submit} className="sign-up-form">
      <h2>Where do you live?</h2>
      <fieldset>
        {locations.map(l => stringToRadioButton('locations', l, setLocation))}
      </fieldset>
      {nextButton()}
    </form>
  );
};

export { WhereDoYouLive };
