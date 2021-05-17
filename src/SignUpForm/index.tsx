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

const SignUpStepComponents: { [k in SignUpStep]: React.FC<SignUpFlowProps> } = {
  location: WhereDoYouLive,
  region: WhereDoYouLiveInEngland,
  age: WhenWereYouBorn,
  'about you': AboutYou,
  username: Username,
  'research and marketing': ResearchAndMarketing,
  done: Done,
};

interface ProgressProps {
  progress: number;
  maxProgress: number;
}

const _progressClass = (progress: number, progression: number) => {
  return progression >= progress ? 'progress-tick done' : 'progress-tick';
};

const ProgressBar: React.FC<ProgressProps> = ({ progress, maxProgress }) => {
  const progression = Math.floor((progress / maxProgress) * 5);
  return (
    <div className="progress" role="progressbar">
      {[1, 2, 3, 4, 5].map((n: number) => (
        <div key={n} className={_progressClass(n, progression)}>
          &nbsp;
        </div>
      ))}
    </div>
  );
};

const _stepToProgress = (step: SignUpStep) => {
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

  const CurrentSignUpStep = SignUpStepComponents[step];

  return (
    <section className="sign-up">
      <h1>Sign Up</h1>

      {apiRoot.state === 'LOADED' && (
        <div className="form-container">
          <ProgressBar progress={_stepToProgress(step)} maxProgress={5} />

          <CurrentSignUpStep {...flowProps} />
        </div>
      )}
    </section>
  );
};

export { SignUpForm, SignUpFlowProps, SignUpStep, Config };
