import { useRef } from 'react';
import { POOL_TYPES } from '../../constants/poolData.js';
import styles from './Designer.module.css';

export function StepInfo({ state, actions }) {
  const { poolType, form, errors, photos } = state;
  const { setPoolType, updateField, addPhotos, removePhoto, goToDesign } = actions;
  const fileRef = useRef(null);

  return (
    <div className={styles.stepContent}>
      {/* Pool Type Selector */}
      <p className={styles.fieldLabel} style={{ marginBottom: 10 }}>Select Pool Type</p>
      <div className={styles.poolTypeGrid}>
        {POOL_TYPES.map((t) => (
          <div
            key={t.id}
            role="button"
            tabIndex={0}
            aria-pressed={poolType === t.id}
            onClick={() => setPoolType(poolType === t.id ? null : t.id)}
            onKeyDown={(e) => e.key === 'Enter' && setPoolType(poolType === t.id ? null : t.id)}
            className={`${styles.poolTypeCard} ${poolType === t.id ? styles.poolTypeCardActive : ''}`}
          >
            {t.tag && (
              <span
                className={styles.poolTypeTag}
                style={{ background: t.tagColor === 'blue' ? 'var(--theme-color)' : 'var(--yellow-color)' }}
              >
                {t.tag}
              </span>
            )}
            <div className={styles.poolTypeIcon}>{t.icon}</div>
            <div className={styles.poolTypeTitle}>{t.title}</div>
            <div className={styles.poolTypeDesc}>{t.headline}</div>
            <ul className={styles.poolTypeBullets}>
              {t.bullets.slice(0, 4).map((b) => (
                <li key={b}><span>›</span>{b}</li>
              ))}
            </ul>
            <div className={styles.poolTypeModels}>
              {t.models.map((m) => <span key={m}>{m}</span>)}
            </div>
          </div>
        ))}
      </div>
      {!poolType && (
        <p className={styles.poolTypeHint}>Not sure? Our AI designer will guide you — you can skip this.</p>
      )}

      {/* Contact Form */}
      <div className={styles.formCard}>
        <h3 className={styles.formTitle}>Your Contact Details</h3>

        <div className={styles.fieldRow}>
          <Field label="Full Name"    field="name"    type="text" placeholder="Jane Smith"          form={form} errors={errors} update={updateField} />
          <Field label="Phone"        field="phone"   type="tel"  placeholder="(203) 555-0100"       form={form} errors={errors} update={updateField} />
        </div>
        <Field label="Email Address"  field="email"   type="email" placeholder="jane@example.com"   form={form} errors={errors} update={updateField} />
        <Field label="Property Address (Pool Site)" field="address" placeholder="123 Main St, Fairfield, CT" form={form} errors={errors} update={updateField} />


        <button className={`th-btn ${styles.submitBtn}`} onClick={goToDesign}>
          Begin Design Consultation →
        </button>
      </div>
    </div>
  );
}

// ── Reusable field ────────────────────────────────────────────────────────────
function Field({ label, field, type = 'text', placeholder, form, errors, update }) {
  return (
    <div className={styles.field}>
      <label className={styles.fieldLabel} htmlFor={`pd-${field}`}>
        {label} <span className={styles.fieldRequired}>*</span>
      </label>
      <input
        id={`pd-${field}`}
        type={type}
        value={form[field]}
        placeholder={placeholder}
        onChange={(e) => update(field, e.target.value)}
        className={`${styles.fieldInput} ${errors[field] ? styles.fieldInputError : ''}`}
        aria-invalid={!!errors[field]}
        aria-describedby={errors[field] ? `pd-${field}-err` : undefined}
      />
      {errors[field] && (
        <p id={`pd-${field}-err`} className={styles.fieldError} role="alert">
          {errors[field]}
        </p>
      )}
    </div>
  );
}
