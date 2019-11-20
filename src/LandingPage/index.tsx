import * as React from 'react';
import { Link } from 'react-router-dom';
import urlJoin from 'url-join';

import { Header } from '../templates/components/Header';
import { Footer } from '../templates/components/Footer';

import { KoothQuotes, quotes } from './components/Quotes';
import { About } from './components/About';
import { ServiceTimes } from './components/ServiceTimes';
import { ValueProp } from './components/ValueProp';
import { JoinNow } from './components/JoinNow';

import './styles.scss';
import { useConfig } from '../hooks';

const CTAs: React.FC<{urlRoot: string}> = ({ urlRoot }) => (
  <>
    <a className="primary-cta" href={urlJoin(urlRoot, '/caba/sign-up/')}>JOIN KOOTH</a>
    <a href={urlJoin(urlRoot, '?login=true')} className="secondary-cta">ALREADY A MEMBER? LOGIN</a>
  </>
);

const LandingPage: React.FC = () => {
  React.useEffect(() => {
    document.title = 'Kooth in Association with CABA | Home';
  });
  const frontendRoot = useConfig<string>('frontendRoot');

  return (
    <React.Fragment>
      <Header />
      <section className="hero-box">
        <div className="hero-container">
          <Link className="crisis-link secondary-cta" to="/in-crisis">IN CRISIS?</Link>
          <h1>Free, safe and anonymous online counselling and support.</h1>
          { frontendRoot.state === 'LOADED' && <CTAs urlRoot={frontendRoot.value}/> }
        </div>
      </section>
      <div className="below-the-fold">
        <ValueProp />
        <ServiceTimes />
        <KoothQuotes quotes={quotes} />
        <JoinNow />
        <About />
      </div>
      <Footer />
    </React.Fragment>
  );
};

export { LandingPage };
