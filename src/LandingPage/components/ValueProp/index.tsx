import * as React from 'react';

import { ContentSection } from '../../../templates/components/ContentSection/';
import { VideoOverlay, KoothVideo } from '../../components/VideoOverlay/';

import './styles.scss';

const ValueProp : React.FC = () => {
  const [video, setVideo] = React.useState<boolean>(false);

  return (
        <ContentSection className="value-prop">
          { video && <VideoOverlay onClose={ () => { setVideo(false) } } /> }
          <h2>On Kooth you can</h2>
          <div className="unstack-left">
            <ul>
              <li>Chat to friendly counsellors</li>
              <li>Share and talk with the Kooth community</li>
              <li>Set yourself goals</li>
              <li>Keep a journal</li>
            </ul>
          </div>
          <a className="secondary-cta alternate hide-on-desktop"
             href="#"
             onClick={ (e : React.SyntheticEvent) => { e.preventDefault(); setVideo(true); }}>
            WATCH THE VIDEO
          </a>
          <div className="unstack-right desktop-video reveal-on-desktop">
            <KoothVideo />
          </div>
        </ContentSection>
  );
};

export {
  ValueProp
}
