import * as React from 'react';

import { track } from '../../utils/analyticsEvents';

import { createKoothUserAPI } from '../createKoothUser';
import { useConfig } from '../../hooks';

const Done: React.FC<{ formData: { [k: string]: string } }> = ({
  formData,
}) => {
  const [error, setError] = React.useState<boolean>(false);
  const onError = (msg : string) => {
    //TODO - find a way of passing a sensible digest of the error message to matomo
    track('sign-up', 'error-creating-account');
    setError(true);
  }
  const apiEndpoint = useConfig<string>('apiRoot');
  const userProfileEndpoint = useConfig<string>('userProfileEndpoint');

  React.useEffect(() => {
    track('sign-up', 'registration-complete');
    if (apiEndpoint.state === 'LOADED' && userProfileEndpoint.state === 'LOADED') {
      createKoothUserAPI(formData, apiEndpoint.value, userProfileEndpoint.value, onError);
    }
  }, [apiEndpoint, userProfileEndpoint]);

  return (
    <div>
      <div className="loading-box">
        <div className="spinner">&nbsp;</div>
      </div>
      <h2>Signing you in to Kooth...</h2>
      { (error || (apiEndpoint.state === 'ERRORED' || userProfileEndpoint.state === 'ERRORED')) &&
        <span>Sorry! Something went wrong when creating your account. Please try again.</span> }
    </div>
  );
};

export { Done };
