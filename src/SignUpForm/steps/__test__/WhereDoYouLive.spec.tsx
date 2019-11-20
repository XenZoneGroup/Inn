import * as React from 'react';
import {
  render,
  fireEvent,
  cleanup,
  waitForElement,
} from '@testing-library/react';
import { WhereDoYouLive } from '../WhereDoYouLive';
import { testConfig } from './helpers';

describe('Where do you live', () => {
  afterEach(cleanup);

  it('Sends people to the region page if they select england', async () => {
    const dataBag = {};
    const next = jest.fn();
    const comp = render(
      <WhereDoYouLive formData={dataBag} next={next} config={testConfig} />
    );

    comp.getByText('Where do you live?');

    fireEvent.click(comp.getByTestId('england'));
    fireEvent.click(comp.getByTestId('submit'));

    expect(next).toHaveBeenCalledWith({ location: 'england' }, 'region');
  });

  it('Sends people to the age step if they select any other location', async () => {
    const dataBag = {};
    const next = jest.fn();
    const comp = render(
      <WhereDoYouLive formData={dataBag} next={next} config={testConfig} />
    );

    comp.getByText('Where do you live?');

    fireEvent.click(comp.getByTestId('northern-ireland'));
    fireEvent.click(comp.getByTestId('submit'));

    expect(next).toHaveBeenCalledWith({ location: 'northern-ireland' }, 'age');
  });

  it('Does nothing if next is clicked and no location is selected', async () => {
    const dataBag = {};
    const next = jest.fn();
    const comp = render(
      <WhereDoYouLive formData={dataBag} next={next} config={testConfig} />
    );

    comp.getByText('Where do you live?');

    fireEvent.click(comp.getByTestId('submit'));

    expect(next).not.toHaveBeenCalled();
  });
});
