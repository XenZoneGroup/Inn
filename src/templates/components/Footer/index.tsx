import * as React from 'react';
import { Link } from 'react-router-dom';

import './styles.scss';

interface LinkProps {
  text: string;
  href: string;
  className?: string;
}

const FooterLink: React.FC<LinkProps> = ({ text, href }) => {
  return (
    <li>
      <a href={href} target="_blank" className="footer-link">
        {text}
      </a>
    </li>
  );
};

const Footer: React.FC = () => {
  return (
    <footer>
      <ul className="footer-links">
        <h3>Helpful Links</h3>
        <li>
          <Link className="footer-link" to="/meet-the-team">
            Meet the Team
          </Link>
        </li>
        <li>
          <Link className="footer-link" to="/privacy-and-safety">
            Privacy and Safety
          </Link>
        </li>
        <li>
          <Link className="footer-link" to="/terms-of-use">
            Terms of Use
          </Link>
        </li>
        <li>
          <Link className="footer-link" to="/about-kooth">
            About Kooth
          </Link>
        </li>
        <FooterLink
          text="About SOME_PARTNER"
          href="https://www.SOME_PARTNER.org.uk/about-us"
        />
        <li>
          <Link className="footer-link" to="/information-for-parents">
            Information for Parents
          </Link>
        </li>
      </ul>
      <div className="copyright">© Xenzone 2019</div>
    </footer>
  );
};

export { Footer };
