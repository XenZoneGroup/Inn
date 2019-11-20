import * as React from 'react';

import { ContentSection } from '../../../templates/components/ContentSection/';

import './styles.scss';
import { useConfig } from '../../../hooks';
import urljoin from 'url-join';

const JoinNow: React.FC = () => {
  const frontendRoot = useConfig<string>('frontendRoot');

  return (
    <ContentSection className="join-now">
      <h2>Need to talk?</h2>
      {frontendRoot.state === 'LOADED' && (
        <a
          className="primary-cta"
          href={urljoin(frontendRoot.value, '/SOME_PARTNER/sign-up/')}
        >
          JOIN KOOTH TODAY
        </a>
      )}
    </ContentSection>
  );
};

export { JoinNow };
