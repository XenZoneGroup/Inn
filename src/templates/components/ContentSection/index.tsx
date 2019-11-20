import * as React from 'react';

import './styles.scss';

interface ContentProps {
  className : string;
};

const ContentSection: React.FC<ContentProps> = ({ className, children }) => {
  const classes = `content-box ${className}`;

  return (
    <section className={ classes }>
      <div className="content-box-container">
        { children }
      </div>
    </section>
  );
}

export {
  ContentSection
}
