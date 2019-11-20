import * as React from 'react';
import { useConfig } from '../hooks';

import { render, waitForElement, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import nock from 'nock';

describe('Use config hook', () => {
  afterEach(() => { cleanup(); });

  const StubComponent: React.FC = () => {
    const config = useConfig('someKey');

    return <div>
        <div data-testid={config.state}>{ config.state }</div>
        <div data-testid='value'>{ config.value }</div>
      </div>
  };

  it('Loads and provides a config value', async () => {
    nock(/.*/)
      .get('/caba/config.json')
      .reply(200, { 'someKey': 'test-value' }, { 'Content-Type': 'application/json' });
  
    const comp = render(<StubComponent />);

    expect(comp.getByTestId('LOADING').textContent).toBe('LOADING');

    await waitForElement(() => comp.getAllByTestId('LOADED'));

    expect(comp.getByTestId('value').textContent).toBe('test-value');
  });

  it('Returns an error state if the key does not exist or is undefined', async () => {
    nock(/.*/)
      .get('/caba/config.json')
      .reply(200, { 'someKey': undefined }, { 'Content-Type': 'application/json' });
  
    const comp = render(<StubComponent />);
    
    await waitForElement(() => comp.getAllByTestId('ERRORED'));

    expect(comp.getByTestId('value').textContent).toBe('');
  });
});
