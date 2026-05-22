import { TESTIMONIALS } from '../../constants/poolData.js';
import styles from './Sections.module.css';

// ─── Hero ─────────────────────────────────────────────────────────────────────
export function Hero({ onDesignClick }) {
  return (
    <section className={styles.hero}>
      <div className="container">
        <div className={styles.heroContent}>
          <p className={styles.heroSubtitle}>Fairfield County, CT · Est. 1987</p>
          <h1 className={styles.heroTitle}>
            Transform Your Backyard Into Your{' '}
            <span>Private Oasis</span>
          </h1>
          <p className={styles.heroDesc}>
            Custom fiberglass and vinyl-liner pools designed and built with expert craftsmanship.
            Lifetime warranties. Pentair automation. Serving Connecticut homeowners since 1987.
          </p>
          <div className={styles.heroBtns}>
            <button className="th-btn th-btn--lg" onClick={onDesignClick}>
              <i className="fa fa-drafting-compass" aria-hidden="true" />
              Design My Pool
            </button>
            <a href="tel:2033725554" className="th-btn th-btn--lg th-btn--outline">
              Call 203-372-5554
            </a>
          </div>
        </div>

        <div className={styles.heroStats}>
          {[
            { num: '37+', label: 'Years Experience' },
            { num: '500+', label: 'Pools Built' },
            { num: '5★', label: 'Client Rating' },
          ].map((s) => (
            <div key={s.label} className={styles.heroStat}>
              <div className={styles.heroStatNum}>{s.num}</div>
              <div className={styles.heroStatLabel}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Partners Bar ─────────────────────────────────────────────────────────────
export function PartnersBar() {
  return (
    <div className={styles.partners}>
      <div className="container">
        <span className={styles.partnerLabel}>Authorized Dealer:</span>
        {['Latham', 'River Pools', 'Pentair', 'NESPA'].map((p) => (
          <span key={p} className={styles.partnerName}>{p}</span>
        ))}
      </div>
    </div>
  );
}

// ─── Services ─────────────────────────────────────────────────────────────────
const SERVICES = [
  {
    icon: '🔷',
    title: 'Fiberglass Pools',
    desc: 'One-piece in-ground fiberglass pools with lifetime structural warranty. Fastest installation, most cost-effective to own. Models by Latham and River Pools.',
  },
  {
    icon: '🔶',
    title: 'Vinyl-Liner Pools',
    desc: 'Fully custom free-form designs with cantilever coping, stamped concrete, fire features, waterfalls, and Pentair full system automation.',
  },
  {
    icon: '🔧',
    title: 'Service & Maintenance',
    desc: 'Our exclusive Total Care Service Plan covers all service and heater calls. Seasonal contracts, openings, closings, chemical management, and leak detection.',
  },
];

export function Services() {
  return (
    <section className="section">
      <div className="container">
        <div className="section-title">
          <p className="section-subtitle">What We Offer</p>
          <h2 className="section-heading">
            Premium <span>Pool Services</span>
          </h2>
          <p className="section-desc">
            From custom design to ongoing maintenance — everything you need for the perfect
            backyard pool.
          </p>
        </div>

        <div className={styles.servicesGrid}>
          {SERVICES.map((s) => (
            <div key={s.title} className={styles.serviceCard}>
              <div className={styles.serviceIcon}>{s.icon}</div>
              <h3 className={styles.serviceTitle}>{s.title}</h3>
              <p className={styles.serviceDesc}>{s.desc}</p>
              <a href="#" className={styles.serviceLink}>
                Learn More <i className="fa fa-arrow-right" aria-hidden="true" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Design Band (AI CTA) ─────────────────────────────────────────────────────
export function DesignBand({ onDesignClick }) {
  return (
    <section className={styles.designBand}>
      <div className="container">
        <div className={styles.designBandContent}>
          <p className={styles.designBandLabel}>✦ New — AI-Powered Tool</p>
          <h2 className={styles.designBandTitle}>Build Your Dream Pool Right Now</h2>
          <p className={styles.designBandDesc}>
            Tell our AI designer what you're imagining. Get real recommendations on pool models,
            lighting, sound systems, and decking — then submit directly for a free estimate.
          </p>
        </div>
        <div className={styles.designBandCta}>
          <button className={styles.designBtnLarge} onClick={onDesignClick}>
            <i className="fa fa-wand-magic-sparkles" aria-hidden="true" />
            Launch Pool Designer
          </button>
          <p className={styles.designBtnSub}>Free · No commitment · Instant AI recommendations</p>
        </div>
      </div>
    </section>
  );
}

// ─── Testimonials ─────────────────────────────────────────────────────────────
export function Testimonials() {
  return (
    <section className="section section--smoke">
      <div className="container">
        <div className="section-title">
          <p className="section-subtitle">Happy Customers</p>
          <h2 className="section-heading">
            What Our <span>Clients Say</span>
          </h2>
        </div>

        <div className={styles.testiGrid}>
          {TESTIMONIALS.map((t) => (
            <div key={t.name} className={styles.testiCard}>
              <div className={styles.testiStars}>★★★★★</div>
              <p className={styles.testiText}>"{t.text}"</p>
              <div className={styles.testiAuthor}>
                <div className={styles.testiAvatar}>{t.initials}</div>
                <div>
                  <div className={styles.testiName}>{t.name}</div>
                  <div className={styles.testiLocation}>{t.location}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
