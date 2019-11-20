import * as React from 'react';
import {
  render,
  fireEvent,
  cleanup,
  waitForElement,
} from '@testing-library/react';
import { WhereDoYouLiveInEngland } from '../WhereDoYouLiveInEngland';
import { testConfig } from './helpers';

describe('Where do you live', () => {
  afterEach(cleanup);

  it('Sends people to the age page when they select a region', async () => {
    const dataBag = { existingValue: 'some-data' };
    const next = jest.fn();
    const comp = render(
      <WhereDoYouLiveInEngland
        formData={dataBag}
        next={next}
        config={testConfig}
      />
    );

    comp.getByText('Awesome! Where in England?');

    fireEvent.click(comp.getByTestId('london'));
    fireEvent.click(comp.getByTestId('submit'));

    expect(next).toHaveBeenCalledWith(
      {
        region: 'london',
        existingValue: 'some-data',
      },
      'age'
    );
  });

  it("Doesn't send people to the next page if no region was selected", async () => {
    const dataBag = { existingValue: 'some-data' };
    const next = jest.fn();
    const comp = render(
      <WhereDoYouLiveInEngland
        formData={dataBag}
        next={next}
        config={testConfig}
      />
    );

    fireEvent.click(comp.getByTestId('submit'));

    expect(next).not.toHaveBeenCalled();
  });
});
