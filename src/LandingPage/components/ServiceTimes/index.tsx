import * as React from 'react';
import { Link } from 'react-router-dom';

import { ContentSection } from '../../../templates/components/ContentSection/';

import chatBox from '../../../images/chatbox.kooth.svg';
import './styles.scss';
import { useConfig } from '../../../hooks';
import urljoin from 'url-join';

const ServiceTimes : React.FC = () => {
  const frontendRoot = useConfig<string>('frontendRoot');

  return (
    <ContentSection className="need-to-talk">
      <div className="image-container">
        <img className="header-image" src={ chatBox } alt="Kooth logo" />
      </div>
      <h2>Need to talk?</h2>
      <div className="unstack-left">
      <h3>Our counsellors are online between</h3>
      <ul>
        <li><span className="time">12pm - 10pm</span> weekdays</li>
        <li><span className="time">6pm - 10pm</span> weekends</li>
        <li><span className="time">4pm - 8pm</span> public holidays</li>
      </ul>
      </div>
      <div className="unstack-right">
      <p className="extra-details">
        You can message counsellors and talk to the Kooth community 24/7.
        Kooth is based in the UK and uses UK time.
        { frontendRoot.state === 'LOADED' &&
        <>
          &nbsp;
          <a href={urljoin(frontendRoot.value, '/caba/sign-up/')}>Sign up to try</a>
        </>}
      </p>
      <Link className="secondary-cta alternate" to="/in-crisis">IN CRISIS?</Link>
      </div>
    </ContentSection>
  );
};

export {
  ServiceTimes
}
