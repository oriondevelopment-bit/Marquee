import { MARQUEE_INFO } from '../../constants/poolData.js';
import styles from './Footer.module.css';

export function Footer() {
  const { phone, email, address, licenses, estYear, logo, social } = MARQUEE_INFO;
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.grid}>
          <div className={styles.brand}>
            <img src={logo} alt="Marquee Pools" className={styles.logo} />
            <p>
              Marquee Pools & Service, Inc. has been building beautiful custom pools
              throughout Fairfield County, Connecticut since {estYear}.
            </p>
            <div className={styles.social}>
              {Object.entries(social).map(([name, url]) => (
                <a key={name} href={url} aria-label={name} target="_blank" rel="noreferrer">
                  <i className={`fab fa-${name}`} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className={styles.heading}>Quick Links</h4>
            <ul className={styles.list}>
              {['Portfolio', 'Fiberglass Pools', 'Vinyl-Liner Pools', 'Financing', 'FAQs'].map((l) => (
                <li key={l}><a href="#">{l}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className={styles.heading}>Services</h4>
            <ul className={styles.list}>
              {['Total Care Plan', 'Pool Openings', 'Pool Closings', 'Leak Detection', 'Renovations'].map((l) => (
                <li key={l}><a href="#">{l}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className={styles.heading}>Contact</h4>
            <div className={styles.contact}>
              <a href={`tel:${phone.replace(/\D/g, '')}`}>
                <i className="fa fa-phone" /> {phone}
              </a>
              <a href={`mailto:${email}`}>
                <i className="fa fa-envelope" /> {email}
              </a>
              <span>
                <i className="fa fa-map-marker-alt" /> {address}
              </span>
            </div>
          </div>
        </div>

        <div className={styles.bottom}>
          <p>© {estYear}–{year} Marquee Pools & Service, Inc. All Rights Reserved.</p>
          <p>{licenses} · Fully Licensed & Insured</p>
        </div>
      </div>
    </footer>
  );
}
