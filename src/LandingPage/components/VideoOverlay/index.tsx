import * as React from 'react';
import { Link } from 'react-router-dom';
import { useConfig } from '../../../hooks';
import urlJoin from 'url-join';

import './styles.scss';

interface OverlayProps {
  onClose: () => void;
}

interface VideoProps {
  autoPlay: boolean;
}

const KoothVideo: React.FC = () => {
  return (
    <iframe
      title="Learn about kooth"
      src="https://player.vimeo.com/video/318731977?autoplay=false"
      allow="fullscreen"
      frameBorder="0"
      allowFullScreen={false}
    ></iframe>
  );
};

const VideoOverlay: React.FC<OverlayProps> = ({ onClose }) => {
  const close = (e: React.SyntheticEvent) => {
    e.preventDefault();
    onClose();
  };

  const frontendRoot = useConfig<string>('frontendRoot');

  return (
    <div
      className="video-overlay"
      aria-modal="true"
      role="dialog"
      aria-labelledby="videoTitle"
    >
      <a
        className="close-button secondary-cta alternate"
        onClick={close}
        role="button"
      >
        CLOSE
      </a>
      <h1 id="videoTitle">Kooth Video</h1>
      <div className="video">
        <KoothVideo />
      </div>
      <div className="controls">
        {frontendRoot.state === 'LOADED' && (
          <a
            className="primary-cta"
            href={urlJoin(frontendRoot.value, '/SOME_PARTNER/sign-up/')}
          >
            JOIN KOOTH
          </a>
        )}
      </div>
    </div>
  );
};

export { VideoOverlay, KoothVideo };
