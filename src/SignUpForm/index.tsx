import * as React from 'react';
import { WhereDoYouLive } from './steps/WhereDoYouLive';
import { WhereDoYouLiveInEngland } from './steps/WhereDoYouLiveInEngland';
import { WhenWereYouBorn } from './steps/WhenWereYouBorn';
import { AboutYou } from './steps/AboutYou';
import { Username } from './steps/Username';
import { ResearchAndMarketing } from './steps/ResearchAndMarketing';
import { Done } from './steps/Done';
import {
  inspectPassword,
  validatePassword,
  PasswordInspectionResult,
  inspectUsername,
  validateUsername,
  UsernameInspectionResult,
  usernameIsNew,
} from './validation';
import './styles.scss';
import { useConfig } from '../hooks';
import { ProgressBar } from './ProgressBar';

type SignUpStep =
  | 'location'
  | 'region'
  | 'age'
  | 'about you'
  | 'username'
  | 'research and marketing'
  | 'done';

type DataBag = {
  [k: string]: string;
};

interface Config {
  currentYear: number;
  inspectPassword: (password: string) => PasswordInspectionResult;
  validatePassword: (password: string) => boolean;
  inspectUsername: (username: string) => UsernameInspectionResult;
  validateUsername: (username: string) => boolean;
  usernameIsNew: (username: string) => Promise<boolean>;
}

interface SignUpFlowProps {
  formData: DataBag;
  next: (formData: DataBag, step: SignUpStep) => void;
  config: Config;
}

const STEP_COMPONENTS: { [k in SignUpStep]: React.FC<SignUpFlowProps> } = {
  location: WhereDoYouLive,
  region: WhereDoYouLiveInEngland,
  age: WhenWereYouBorn,
  'about you': AboutYou,
  username: Username,
  'research and marketing': ResearchAndMarketing,
  done: Done,
};

const progressBarValues = (step: SignUpStep) => {
  switch (step) {
    case 'location':
      return 1;
    case 'region':
      return 1;
    case 'age':
      return 2;
    case 'username':
      return 3;
    case 'about you':
      return 4;
    case 'research and marketing':
      return 5;
    default:
      return 1;
  }
};

const SignUpForm: React.FC = () => {
  const [step, setStep] = React.useState<SignUpStep>('location');
  const [data, setData] = React.useState<DataBag>({});

  const next = (formData: DataBag, step: SignUpStep) => {
    setData(formData);
    setStep(step);
    window.scrollTo(0, 0);
  };

  const apiRoot = useConfig<string>('apiRoot');

  const flowProps = {
    formData: data,
    next,
    config: {
      currentYear: new Date().getUTCFullYear(),
      validatePassword,
      inspectPassword,
      validateUsername,
      inspectUsername,
      usernameIsNew: (username: string) =>
        usernameIsNew(username, apiRoot.value),
    },
  };

  const CurrentStep = STEP_COMPONENTS[step];

  return (
    <section className="sign-up">
      <h1>Sign Up</h1>

      {apiRoot.state === 'LOADED' && (
        <div className="form-container">
          <ProgressBar progress={progressBarValues(step)} maxProgress={5} />

          <CurrentStep {...flowProps} />
        </div>
      )}
    </section>
  );
};

export { SignUpForm, SignUpFlowProps, SignUpStep, Config };
