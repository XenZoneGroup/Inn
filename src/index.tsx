import 'ts-polyfill/lib/es2015-core';
import 'ts-polyfill/lib/es2015-promise';
import 'ts-polyfill/lib/es2017-object';

import * as React from 'react';
import * as ReactDom from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { __RouterContext } from 'react-router';
import 'normalize.css';
import './base.scss';

import { SignUpForm } from './SignUpForm';
import { LandingPage } from './LandingPage';
import {
  InfoForParents,
  InCrisis,
  AboutKooth,
  PrivacyAndSafety,
  TermsOfUse,
} from './InfoPage/pages';
import { MeetTheTeam } from './InfoPage/MeetTheTeam';
import { impress, initPiwik } from './utils/analyticsEvents';

interface WrapperProps {
  children: any;
}

const useLocation = () => {
  const ctx = React.useContext(__RouterContext);
  return ctx.location;
};

const Analytics: React.FC<WrapperProps> = ({ children }) => {
  const { pathname } = useLocation();
  const [previousPath, setPreviousPath] = React.useState<string>(null);

  React.useEffect(() => {
    const fullPath = window.location.href;
    impress(fullPath, previousPath);
    setPreviousPath(fullPath);
  }, [pathname]);

  return children || null;
};

const ScrollToTop: React.FC<WrapperProps> = ({ children }) => {
  const { pathname } = useLocation();

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return children || null;
};

const App: React.FC = () => {
  return (
    <Router>
      <ScrollToTop>
        <Analytics>
          <Route exact path="/" component={LandingPage} />
          <Route path="/information-for-parents" component={InfoForParents} />
          <Route path="/in-crisis" component={InCrisis} />
          <Route path="/about-kooth" component={AboutKooth} />
          <Route path="/privacy-and-safety" component={PrivacyAndSafety} />
          <Route path="/terms-of-use" component={TermsOfUse} />
          <Route path="/meet-the-team" component={MeetTheTeam} />
          <Route path="/SOME_PARTNER/sign-up" component={SignUpForm} />
        </Analytics>
      </ScrollToTop>
    </Router>
  );
};

initPiwik();
ReactDom.render(<App />, document.getElementById('main'));
