import * as React from 'react';

import { SignUpFlowProps, SignUpStep } from '../.';
import { dropDownMenu, nextButton } from '../../templates';
import { track } from '../../utils/analyticsEvents';

const EMPTY = '';

const _makeAges = (maxAge: number, minAge: number, currentYear: number) => {
  const delta = maxAge - minAge;
  let years = [EMPTY];
  for (let i = 0; i < delta; i++) {
    years.push(String(currentYear - minAge - i));
  }
  return years;
};

const months = [
  EMPTY,
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const WhenWereYouBorn: React.FC<SignUpFlowProps> = ({
  formData,
  next,
  config,
}) => {
  const years = _makeAges(26, 11, config.currentYear);

  const [year, setYear] = React.useState<string>(EMPTY);
  const [month, setMonth] = React.useState<string>(EMPTY);
  const submit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    if (month !== EMPTY && year !== EMPTY) {
      track('sign-up', 'completed-when-born');
      next({ ...formData, year, month }, SignUpStep.USERNAME);
    }
  };

  //TODO - check keyboard events work properly
  const updateYear = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const val = event.currentTarget.value;
    setYear(val);
  };

  const updateMonth = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const val = event.currentTarget.value;
    setMonth(val);
  };

  return (
    <form onSubmit={submit} className="sign-up-form">
      <h2>When were you born?</h2>

      <p className="info">Kooth is only available to a certain age range.</p>

      {dropDownMenu('Year', 'when-were-you-born-year', updateYear, years)}
      {dropDownMenu('Month', 'when-were-you-born-month', updateMonth, months)}

      {nextButton()}
    </form>
  );
};

export { WhenWereYouBorn };
