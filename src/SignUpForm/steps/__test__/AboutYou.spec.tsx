import * as React from 'react';
import { render, fireEvent, cleanup, screen } from '@testing-library/react';
import { AboutYou } from '../AboutYou';
import { testConfig } from './helpers';

describe('About you', () => {
  afterEach(cleanup);

  it('Sends people to the research and marketing page when they fill in the form correctly and choose ethnicity wtih no background', async () => {
    const dataBag = { someStuff: 'hello' };
    const proceedToStep = jest.fn();

    render(
      <AboutYou
        formData={dataBag}
        proceedToStep={proceedToStep}
        config={testConfig}
      />
    );

    screen.getByText('Which best describes you?');

    fireEvent.click(screen.getByTestId('female'));

    fireEvent.change(screen.getByTestId('ethnicity'), {
      target: {
        value: 'not-stated',
      },
    });

    fireEvent.click(screen.getByTestId('submit'));
    expect(proceedToStep).toHaveBeenCalledWith(
      {
        someStuff: 'hello',
        gender: 'female',
        ethnicity: 'not-stated',
        background: ' ',
      },
      'research and marketing'
    );
  });

  it('Sends people to the research and marketing page when they fill in the form correctly and choose any other ethnic group', async () => {
    const dataBag = { someStuff: 'hello' };
    const proceedToStep = jest.fn();

    render(
      <AboutYou
        formData={dataBag}
        proceedToStep={proceedToStep}
        config={testConfig}
      />
    );

    screen.getByText('Which best describes you?');

    fireEvent.click(screen.getByTestId('female'));

    fireEvent.change(screen.getByTestId('ethnicity'), {
      target: {
        value: 'other',
      },
    });

    fireEvent.click(screen.getByTestId('submit'));

    expect(proceedToStep).toHaveBeenCalledWith(
      {
        someStuff: 'hello',
        gender: 'female',
        ethnicity: 'other',
        background: ' ',
      },
      'research and marketing'
    );
  });

  it('Sends people to the research and marketing page when they fill in the form correctly and do set ethnicity', async () => {
    const dataBag = { someStuff: 'hello' };
    const proceedToStep = jest.fn();

    render(
      <AboutYou
        formData={dataBag}
        proceedToStep={proceedToStep}
        config={testConfig}
      />
    );

    screen.getByText('Which best describes you?');

    fireEvent.click(screen.getByTestId('agender'));

    fireEvent.change(screen.getByTestId('ethnicity'), {
      target: {
        value: 'asian-or-asian-british',
      },
    });

    fireEvent.change(screen.getByTestId('background'), {
      target: {
        value: 'bangladeshi',
      },
    });

    fireEvent.click(screen.getByTestId('submit'));

    expect(proceedToStep).toHaveBeenCalledWith(
      {
        someStuff: 'hello',
        gender: 'agender',
        ethnicity: 'asian-or-asian-british',
        background: 'bangladeshi',
      },
      'research and marketing'
    );
  });

  it("prevents people moving to the proceedToStep stage if they haven't chosen a gender", async () => {
    const dataBag = { someStuff: 'hello' };
    const proceedToStep = jest.fn();

    render(
      <AboutYou
        formData={dataBag}
        proceedToStep={proceedToStep}
        config={testConfig}
      />
    );

    screen.getByText('Which best describes you?');

    fireEvent.change(screen.getByTestId('ethnicity'), {
      target: {
        value: 'asian-or-asian-british',
      },
    });

    fireEvent.change(screen.getByTestId('background'), {
      target: {
        value: 'bangladeshi',
      },
    });

    fireEvent.click(screen.getByTestId('submit'));
    expect(proceedToStep).not.toHaveBeenCalled();
  });

  it("prevents people moving to the next stage if they haven't chosen an ethnicity", async () => {
    const dataBag = { someStuff: 'hello' };
    const proceedToStep = jest.fn();

    render(
      <AboutYou
        formData={dataBag}
        proceedToStep={proceedToStep}
        config={testConfig}
      />
    );

    screen.getByText('Which best describes you?');

    fireEvent.click(screen.getByTestId('agender'));

    fireEvent.click(screen.getByTestId('submit'));
    expect(proceedToStep).not.toHaveBeenCalled();
  });

  it("prevents people moving to the next stage if they haven't chosen a background when required", async () => {
    const dataBag = { someStuff: 'hello' };
    const proceedToStep = jest.fn();

    render(
      <AboutYou
        formData={dataBag}
        proceedToStep={proceedToStep}
        config={testConfig}
      />
    );

    screen.getByText('Which best describes you?');

    fireEvent.click(screen.getByTestId('agender'));

    fireEvent.change(screen.getByTestId('ethnicity'), {
      target: {
        value: 'asian-or-asian-british',
      },
    });

    fireEvent.click(screen.getByTestId('submit'));
    expect(proceedToStep).not.toHaveBeenCalled();
  });
});
