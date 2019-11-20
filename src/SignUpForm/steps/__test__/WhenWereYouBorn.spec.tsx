import * as React from 'react';
import {
  render,
  fireEvent,
  cleanup,
  waitForElement,
} from '@testing-library/react';
import { WhenWereYouBorn } from '../WhenWereYouBorn';
import { testConfig } from './helpers';

describe('Where do you live', () => {
  afterEach(cleanup);

  it('Sends people to the username page when they complete the form correctly', async () => {
    const dataBag = { someStuff: 'hello' };
    const next = jest.fn();
    const dob = (testConfig.currentYear - 13).toString();

    const comp = render(
      <WhenWereYouBorn formData={dataBag} next={next} config={testConfig} />
    );
    comp.getByText('When were you born?');

    fireEvent.change(comp.getByTestId('when-were-you-born-year'), {
      target: {
        value: dob,
      },
    });

    fireEvent.change(comp.getByTestId('when-were-you-born-month'), {
      target: {
        value: 'february',
      },
    });

    fireEvent.click(comp.getByTestId('submit'));

    expect(next).toHaveBeenCalledWith(
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
    const next = jest.fn();
    const dob = (testConfig.currentYear - 13).toString();

    const comp = render(
      <WhenWereYouBorn formData={dataBag} next={next} config={testConfig} />
    );

    fireEvent.change(comp.getByTestId('when-were-you-born-year'), {
      target: {
        value: dob,
      },
    });

    fireEvent.click(comp.getByTestId('submit'));

    expect(next).not.toHaveBeenCalled();
  });

  it('Does nothing if only month is selected', async () => {
    const dataBag = {};
    const next = jest.fn();
    const currentYear = 2019;
    const dob = (currentYear - 13).toString();

    testConfig.currentYear = currentYear;

    const comp = render(
      <WhenWereYouBorn formData={dataBag} next={next} config={testConfig} />
    );

    fireEvent.change(comp.getByTestId('when-were-you-born-month'), {
      target: {
        value: 'february',
      },
    });

    fireEvent.click(comp.getByTestId('submit'));

    expect(next).not.toHaveBeenCalled();
  });
});
