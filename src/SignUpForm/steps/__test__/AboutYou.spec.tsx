import * as React from 'react';
import {
  render,
  fireEvent,
  cleanup,
  waitForElement,
} from '@testing-library/react';
import { AboutYou } from '../AboutYou';
import { testConfig } from './helpers';

describe('About you', () => {
  afterEach(cleanup);

  it('Sends people to the research and marketing page when they fill in the form correctly and choose ethnicity wtih no background',
    async () => {
    const dataBag = { someStuff: 'hello' };
    const next = jest.fn();

    const comp = render(
      <AboutYou formData={dataBag} next={next} config={testConfig} />
    );

    comp.getByText('Which best describes you?');

    fireEvent.click(comp.getByTestId('female'));

    fireEvent.change(comp.getByTestId('ethnicity'), {
      target: {
        value: 'not-stated',
      },
    });


    fireEvent.click(comp.getByTestId('submit'));
    expect(next).toHaveBeenCalledWith(
      {
        someStuff: 'hello',
        gender: 'female',
        ethnicity: 'not-stated',
        background: " "
      },
      'research and marketing'
    );
  });

  it('Sends people to the research and marketing page when they fill in the form correctly and choose any other ethnic group',
    async () => {
      const dataBag = { someStuff: 'hello' };
      const next = jest.fn();

      const comp = render(
        <AboutYou formData={dataBag} next={next} config={testConfig} />
      );

      comp.getByText('Which best describes you?');

      fireEvent.click(comp.getByTestId('female'));

      fireEvent.change(comp.getByTestId('ethnicity'), {
        target: {
          value: 'other',
        },
      });


      fireEvent.click(comp.getByTestId('submit'));

      expect(next).toHaveBeenCalledWith(
        {
          someStuff: 'hello',
          gender: 'female',
          ethnicity: 'other',
          background: " "
        },
        'research and marketing'
      );
    });

  it('Sends people to the research and marketing page when they fill in the form correctly and do set ethnicity',
    async () => {
      const dataBag = { someStuff: 'hello' };
      const next = jest.fn();

      const comp = render(
        <AboutYou formData={dataBag} next={next} config={testConfig} />
      );

      comp.getByText('Which best describes you?');

      fireEvent.click(comp.getByTestId('agender'));

      fireEvent.change(comp.getByTestId('ethnicity'), {
        target: {
          value: 'asian-or-asian-british',
        },
      });

      fireEvent.change(comp.getByTestId('background'), {
        target: {
          value: 'bangladeshi',
        },
      });


      fireEvent.click(comp.getByTestId('submit'));

      expect(next).toHaveBeenCalledWith(
        {
          someStuff: 'hello',
          gender: 'agender',
          ethnicity: 'asian-or-asian-british',
          background: 'bangladeshi'
        },
        'research and marketing'
      );
    });

  it('prevents people moving to the next stage if they haven\'t chosen a gender', async () => {
    const dataBag = { someStuff: 'hello' };
    const next = jest.fn();

    const comp = render(
      <AboutYou formData={dataBag} next={next} config={testConfig} />
    );

    comp.getByText('Which best describes you?');

    fireEvent.change(comp.getByTestId('ethnicity'), {
      target: {
        value: 'asian-or-asian-british',
      },
    });

    fireEvent.change(comp.getByTestId('background'), {
      target: {
        value: 'bangladeshi',
      },
    });

    fireEvent.click(comp.getByTestId('submit'));
    expect(next).not.toHaveBeenCalled();
  });

  it('prevents people moving to the next stage if they haven\'t chosen an ethnicity', async () => {
    const dataBag = { someStuff: 'hello' };
    const next = jest.fn();

    const comp = render(
      <AboutYou formData={dataBag} next={next} config={testConfig} />
    );

    comp.getByText('Which best describes you?');

    fireEvent.click(comp.getByTestId('agender'));

    fireEvent.click(comp.getByTestId('submit'));
    expect(next).not.toHaveBeenCalled();
  });

  it('prevents people moving to the next stage if they haven\'t chosen a background when required', async () => {
    const dataBag = { someStuff: 'hello' };
    const next = jest.fn();

    const comp = render(
      <AboutYou formData={dataBag} next={next} config={testConfig} />
    );

    comp.getByText('Which best describes you?');

    fireEvent.click(comp.getByTestId('agender'));

    fireEvent.change(comp.getByTestId('ethnicity'), {
      target: {
        value: 'asian-or-asian-british',
      },
    });

    fireEvent.click(comp.getByTestId('submit'));
    expect(next).not.toHaveBeenCalled();
  });
});
