import * as React from 'react';
import { render, fireEvent, cleanup, screen } from '@testing-library/react';
import { WhenWereYouBorn } from '../WhenWereYouBorn';
import { testConfig } from './helpers';

describe('Where do you live', () => {
  afterEach(cleanup);

  it('Sends people to the username page when they complete the form correctly', async () => {
    const dataBag = { someStuff: 'hello' };
    const proceedToStep = jest.fn();
    const dob = (testConfig.currentYear - 13).toString();

    render(
      <WhenWereYouBorn
        formData={dataBag}
        proceedToStep={proceedToStep}
        config={testConfig}
      />
    );

    screen.getByText('When were you born?');

    fireEvent.change(screen.getByTestId('when-were-you-born-year'), {
      target: {
        value: dob,
      },
    });

    fireEvent.change(screen.getByTestId('when-were-you-born-month'), {
      target: {
        value: 'february',
      },
    });

    fireEvent.click(screen.getByTestId('submit'));

    expect(proceedToStep).toHaveBeenCalledWith(
      {
        someStuff: 'hello',
        year: dob,
        month: 'february',
      },
      'username'
    );
  });

  it('Does nothing if only year is selected', async () => {
    const dataBag = {};
    const proceedToStep = jest.fn();
    const dob = (testConfig.currentYear - 13).toString();

    render(
      <WhenWereYouBorn
        formData={dataBag}
        proceedToStep={proceedToStep}
        config={testConfig}
      />
    );

    fireEvent.change(screen.getByTestId('when-were-you-born-year'), {
      target: {
        value: dob,
      },
    });

    fireEvent.click(screen.getByTestId('submit'));

    expect(proceedToStep).not.toHaveBeenCalled();
  });

  it('Does nothing if only month is selected', async () => {
    const dataBag = {};
    const proceedToStep = jest.fn();
    const currentYear = 2019;
    const dob = (currentYear - 13).toString();

    testConfig.currentYear = currentYear;

    render(
      <WhenWereYouBorn
        formData={dataBag}
        proceedToStep={proceedToStep}
        config={testConfig}
      />
    );

    fireEvent.change(screen.getByTestId('when-were-you-born-month'), {
      target: {
        value: 'february',
      },
    });

    fireEvent.click(screen.getByTestId('submit'));

    expect(proceedToStep).not.toHaveBeenCalled();
  });
});
