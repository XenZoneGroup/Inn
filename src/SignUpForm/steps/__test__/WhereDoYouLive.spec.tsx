import * as React from 'react';
import { render, fireEvent, cleanup, screen } from '@testing-library/react';
import { WhereDoYouLive } from '../WhereDoYouLive';
import { testConfig } from './helpers';

describe('Where do you live', () => {
  afterEach(cleanup);

  it('Sends people to the region page if they select england', async () => {
    const dataBag = {};
    const proceedToStep = jest.fn();

    render(
      <WhereDoYouLive
        formData={dataBag}
        proceedToStep={proceedToStep}
        config={testConfig}
      />
    );

    screen.getByText('Where do you live?');

    fireEvent.click(screen.getByTestId('england'));
    fireEvent.click(screen.getByTestId('submit'));

    expect(proceedToStep).toHaveBeenCalledWith(
      { location: 'england' },
      'region'
    );
  });

  it('Sends people to the age step if they select any other location', async () => {
    const dataBag = {};
    const proceedToStep = jest.fn();

    render(
      <WhereDoYouLive
        formData={dataBag}
        proceedToStep={proceedToStep}
        config={testConfig}
      />
    );

    screen.getByText('Where do you live?');

    fireEvent.click(screen.getByTestId('northern-ireland'));
    fireEvent.click(screen.getByTestId('submit'));

    expect(proceedToStep).toHaveBeenCalledWith(
      { location: 'northern-ireland' },
      'age'
    );
  });

  it('Does nothing if next is clicked and no location is selected', async () => {
    const dataBag = {};
    const proceedToStep = jest.fn();

    render(
      <WhereDoYouLive
        formData={dataBag}
        proceedToStep={proceedToStep}
        config={testConfig}
      />
    );

    screen.getByText('Where do you live?');

    fireEvent.click(screen.getByTestId('submit'));

    expect(proceedToStep).not.toHaveBeenCalled();
  });
});
