import * as React from 'react';
import { render, fireEvent, cleanup, screen } from '@testing-library/react';
import { WhereDoYouLiveInEngland } from '../WhereDoYouLiveInEngland';
import { testConfig } from './helpers';

describe('Where do you live', () => {
  afterEach(cleanup);

  it('Sends people to the age page when they select a region', async () => {
    const dataBag = { existingValue: 'some-data' };
    const proceedToStep = jest.fn();

    render(
      <WhereDoYouLiveInEngland
        formData={dataBag}
        proceedToStep={proceedToStep}
        config={testConfig}
      />
    );

    screen.getByText('Awesome! Where in England?');

    fireEvent.click(screen.getByTestId('london'));
    fireEvent.click(screen.getByTestId('submit'));

    expect(proceedToStep).toHaveBeenCalledWith(
      {
        region: 'london',
        existingValue: 'some-data',
      },
      'age'
    );
  });

  it("Doesn't send people to the proceedToStep page if no region was selected", async () => {
    const dataBag = { existingValue: 'some-data' };
    const proceedToStep = jest.fn();

    render(
      <WhereDoYouLiveInEngland
        formData={dataBag}
        proceedToStep={proceedToStep}
        config={testConfig}
      />
    );

    fireEvent.click(screen.getByTestId('submit'));

    expect(proceedToStep).not.toHaveBeenCalled();
  });
});
