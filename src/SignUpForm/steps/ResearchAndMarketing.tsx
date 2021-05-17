import * as React from 'react';

import { stringToRadioButton, dropDownMenu, nextButton } from '../../templates';
import { SignUpFlowProps } from '../';
import { track } from '../../utils/analyticsEvents';

const hearAboutUsOptions = [
  '',
  'Family/Friends',
  'Campaign',
  'SOME_PARTNER Website',
  'Advert',
  'Event',
  'SOME_PARTNER Training Course',
  'Newsletter',
  'News Article',
  'SOME_PARTNER referral',
  'Facebook',
  'Instagram',
  'Twitter',
  'Other',
].sort();

const ResearchAndMarketing: React.FC<SignUpFlowProps> = ({
  formData,
  next,
}) => {
  const [researchConsent, setResearchConsent] = React.useState<string>();
  const [heardAboutUs, setHeardAboutUs] = React.useState<string>();

  const submit = (event: React.FormEvent) => {
    event.preventDefault();

    if (heardAboutUs && researchConsent) {
      track('sign-up', 'completed-r-and-m');
      next({ ...formData, researchConsent, heardAboutUs }, 'done');
    }
  };

  const updateHeardAboutUs = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const val = event.currentTarget.value;

    setHeardAboutUs(val);
  };

  // TODO - better research consent copy...
  return (
    <form onSubmit={submit} className="sign-up-form">
      <h2>One last thing...</h2>

      {dropDownMenu(
        'How did you hear about us?',
        'heard-about-us',
        updateHeardAboutUs,
        hearAboutUsOptions
      )}

      <p className="form-text">
        We sometimes use anonymous data about our users for research into
        delivering better services. You can find out more about data and privacy{' '}
        <a
          href="https://SOME_PARTNER.kooth.com/privacy-and-safety"
          target="_blank"
        >
          here
        </a>
        . You don't need to say yes to use Kooth.
      </p>
      <fieldset>
        <legend>Can we use your anonymous data for research?</legend>
        {stringToRadioButton('research-consent', 'Yes', setResearchConsent)}
        {stringToRadioButton('research-consent', 'No', setResearchConsent)}
      </fieldset>
      {nextButton()}
    </form>
  );
};

export { ResearchAndMarketing };
