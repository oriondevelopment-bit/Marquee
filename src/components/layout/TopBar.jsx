import { MARQUEE_INFO } from '../../constants/poolData.js';
import styles from './TopBar.module.css';

export function TopBar() {
  const { phone, email, social } = MARQUEE_INFO;
  return (
    <div className={styles.topbar}>
      <div className="container">
        <div className={styles.left}>
          <a href={`tel:${phone.replace(/\D/g, '')}`}>
            <i className="fa fa-phone" aria-hidden="true" /> {phone}
          </a>
          <a href={`mailto:${email}`}>
            <i className="fa fa-envelope" aria-hidden="true" /> {email}
          </a>
          <span>
            <i className="fa fa-map-marker-alt" aria-hidden="true" /> Fairfield County, CT
          </span>
        </div>
        <div className={styles.right}>
          <a href={social.facebook}  aria-label="Facebook"  target="_blank" rel="noreferrer"><i className="fab fa-facebook-f" /></a>
          <a href={social.instagram} aria-label="Instagram" target="_blank" rel="noreferrer"><i className="fab fa-instagram" /></a>
          <a href={social.youtube}   aria-label="YouTube"   target="_blank" rel="noreferrer"><i className="fab fa-youtube" /></a>
          <a href={social.pinterest} aria-label="Pinterest" target="_blank" rel="noreferrer"><i className="fab fa-pinterest" /></a>
        </div>
      </div>
    </div>
  );
}
