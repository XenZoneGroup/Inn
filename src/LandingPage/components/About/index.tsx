import * as React from 'react';

import { ContentSection } from '../../../templates/components/ContentSection/';

import icons from '../../../images/funding-icons.kooth.png';
import banner from '../../../images/yp-friendly.kooth.png';

const About : React.FC = () => {
  return (
    <ContentSection className="partner-box">
      <div className="image-container">
      <img className="funding-icons" src={ banner } alt="Young people friendly" />
      <img className="funding-icons" src={ icons } alt="BACP accredited service, providing NHS services, lottery funded" />
      </div>
    </ContentSection>
  );
};

export {
  About
}
