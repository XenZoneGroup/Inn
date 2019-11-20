import * as React from 'react';
import {
  render,
  fireEvent,
  cleanup,
  waitForElement,
} from '@testing-library/react';
import { ResearchAndMarketing } from '../ResearchAndMarketing';
import { testConfig } from './helpers';

describe('Research and Marketing', () => {
  afterEach(cleanup);

  it('Sends people to the done step when they fill in the form correctly', async () => {
    const dataBag = { someStuff: 'hello' };
    const next = jest.fn();

    const comp = render(
      <ResearchAndMarketing formData={dataBag} next={next} config={testConfig} />
    );

    comp.getByText('One last thing...');

    fireEvent.change(comp.getByTestId('heard-about-us'), {
      target: {
        value: 'campaign',
      },
    });

    fireEvent.click(comp.getByTestId('no'));

    fireEvent.click(comp.getByTestId('submit'));

    expect(next).toHaveBeenCalledWith(
      {
        someStuff: 'hello',
        heardAboutUs: 'campaign',
        researchConsent: 'no'
      },
      'done'
    );
  });

  it('Prevents people from progressing if they don\'t say how they heard about us', async () => {
    const dataBag = { someStuff: 'hello' };
    const next = jest.fn();

    const comp = render(
      <ResearchAndMarketing formData={dataBag} next={next} config={testConfig} />
    );

    comp.getByText('One last thing...');

    fireEvent.click(comp.getByTestId('yes'));

    fireEvent.click(comp.getByTestId('submit'));

    expect(next).not.toHaveBeenCalled();
  });

  it('Prevents people from progressing if they don\'t choose a research option', async () => {
    const dataBag = { someStuff: 'hello' };
    const next = jest.fn();

    const comp = render(
      <ResearchAndMarketing formData={dataBag} next={next} config={testConfig} />
    );

    comp.getByText('One last thing...');

    fireEvent.change(comp.getByTestId('heard-about-us'), {
      target: {
        value: 'campaign',
      },
    });

    fireEvent.click(comp.getByTestId('submit'));

    expect(next).not.toHaveBeenCalled();
  });

});
