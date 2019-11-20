import * as React from 'react';
import { Link } from 'react-router-dom';

import { ContentSection } from '../templates/components/ContentSection/';

import './styles.scss';

interface InfoPageProps {
  title: string;
}

const InfoPage : React.FC<InfoPageProps> = ({ children, title }) => {
  React.useEffect(() => {
    document.title = title;
  });
  return (
    <React.Fragment>
      <header></header>
        <ContentSection className="info-page">
          <div className='info-content'>
          <Link className="home-link" to="/">Home</Link>
          { children }
          </div>
        </ContentSection>
      <footer></footer>
    </React.Fragment>
  );
};

export {
  InfoPage
}
