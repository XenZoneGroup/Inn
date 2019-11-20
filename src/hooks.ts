import * as React from 'react';

import axios from 'axios';

interface ConfigValue<T> {
  value?: T;
  state: 'LOADING' | 'LOADED' | 'ERRORED';
}

const CONFIG_URL = '/caba/config.json';

const useConfig = <T>(key: string): ConfigValue<T> => {
  const [value, setValue] = React.useState<ConfigValue<T>>({state: 'LOADING'});

  React.useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(CONFIG_URL);
        const value = response.data[key];
        
      if (value === undefined) throw new Error(`Config value for ${key} was undefined`);
        
      setValue({
        state: 'LOADED',
        value: (value as T)
      });
        
      } catch (e) {
        console.error(`Could not load config value for ${key}`, e)
        setValue({ state: 'ERRORED' });
      }
    })();
  }, [key]);

  return value;
};

export {
  useConfig
}
