import { MARQUEE_INFO } from '../../constants/poolData.js';
import styles from './Header.module.css';

const NAV_LINKS = [
  { label: 'Home',           href: '#',           active: true },
  { label: 'Portfolio',      href: '#portfolio' },
  { label: 'About Us',       href: '#about' },
  { label: 'Financing',      href: '#financing' },
  { label: 'News & Insights',href: '#news' },
  { label: 'FAQs',           href: '#faqs' },
  { label: 'Contact',        href: '#contact' },
];

export function Header({ onDesignClick }) {
  return (
    <header className={styles.header}>
      <div className="container">
        <a href="/" className={styles.logo}>
          <img
            src={MARQUEE_INFO.logo}
            alt="Marquee Pools"
            onError={(e) => { e.target.style.display = 'none'; }}
          />
        </a>

        <nav className={styles.nav} aria-label="Main navigation">
          <ul>
            {NAV_LINKS.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className={link.active ? styles.active : undefined}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.cta}>
          <a href={`tel:${MARQUEE_INFO.phone.replace(/\D/g, '')}`} className={styles.phone}>
            <i className="fa fa-phone" aria-hidden="true" />
            {MARQUEE_INFO.phone}
          </a>
          <button className="th-btn" onClick={onDesignClick}>
            <i className="fa fa-drafting-compass" aria-hidden="true" />
            Design My Pool
          </button>
        </div>
      </div>
    </header>
  );
}
