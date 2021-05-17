import * as React from 'react';
import './styles.scss';

interface ProgressProps {
  progress: number;
  maxProgress: number;
}

const ProgressBar: React.FC<ProgressProps> = ({ progress, maxProgress }) => {
  const progression = Math.floor((progress / maxProgress) * 5);

  const _progressClass = (progress: number, progression: number) => {
    return progression >= progress ? 'progress-tick done' : 'progress-tick';
  };

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

export { ProgressBar };
