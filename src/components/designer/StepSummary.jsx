import { MARQUEE_INFO } from '../../constants/poolData.js';
import styles from './Designer.module.css';
import { useState, useEffect } from 'react';

const ORION_KEY = import.meta.env.VITE_ORION_KEY || 'orion_wk_636fd87d-d04a-4843-afff-0727ae240a65';

async function generateRender(messages, poolType, photos) {
  try {
    // Pass the first site photo as base64 reference if available
    const sitePhotoBase64 = photos?.length > 0 ? photos[0].url : null;
    const res = await fetch('https://orion.cool/api/widget/render', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-orion-key': ORION_KEY },
      body: JSON.stringify({ messages, poolType, sitePhotoBase64 }),
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data.imageDataUrl ? data : null;
  } catch { return null; }
}

export function StepSummary({ state, actions }) {
  const { form, poolType, photos, messages, submitted } = state;
  const { submitDesign, resetAll, goBack } = actions;
  const [renderUrl, setRenderUrl]     = useState(null);
  const [rendering, setRendering]     = useState(false);
  const [renderError, setRenderError] = useState(false);
  const [spaceDesc, setSpaceDesc] = useState('');

  useEffect(() => {
    if (submitted) return;
    setRendering(true);
    setRenderError(false);
    generateRender(messages, poolType, photos)
      .then(result => {
        if (result?.imageDataUrl) {
          setRenderUrl(result.imageDataUrl);
          if (result.spaceDescription) setSpaceDesc(result.spaceDescription);
        } else setRenderError(true);
      })
      .catch(() => setRenderError(true))
      .finally(() => setRendering(false));
  }, []);

  if (submitted) return <ConfirmationScreen form={form} onReset={resetAll} />;

  const assistantCount = messages.filter((m) => m.role === 'assistant').length;

  return (
    <div className={styles.stepContent}>
      {/* Hero card */}
      <div className={styles.summaryHero}>
        <div className={styles.summaryHeroIcon}>🏊‍♀️</div>
        <h2 className={styles.summaryHeroTitle}>{form.name}'s Custom Pool</h2>
        <p className={styles.summaryHeroAddr}>{form.address}</p>
        {poolType && (
          <span className={styles.summaryHeroBadge}>
            {poolType === 'fiberglass' ? 'Fiberglass Pool' : 'Vinyl-Liner Pool'}
          </span>
        )}
      </div>

      {/* AI Pool Rendering */}
      <div className={styles.summarySection}>
        <p className={styles.summarySectionTitle}>
          Your AI Pool Rendering
          <span style={{ marginLeft: 8, fontSize: 10, color: 'var(--theme-color3)', fontWeight: 700 }}>
            Powered by Orion AI
          </span>
        </p>
        <div style={{
          borderRadius: 'var(--radius-md)',
          overflow: 'hidden',
          border: '1px solid var(--th-border-color)',
          background: 'var(--smoke-color)',
          minHeight: 200,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
        }}>
          {rendering && (
            <div style={{ textAlign: 'center', padding: 32 }}>
              <div style={{ fontSize: 32, marginBottom: 12 }}>🎨</div>
              <p style={{ fontFamily: 'var(--title-font)', fontSize: 14, color: 'var(--title-color)', fontWeight: 700, marginBottom: 4 }}>
                Generating your pool rendering...
              </p>
              <p style={{ fontSize: 12, color: 'var(--body-color)' }}>
                Orion AI is visualizing your custom design
              </p>
            </div>
          )}
          {!rendering && renderUrl && (
            <img
              src={renderUrl}
              alt="AI pool rendering"
              style={{ width: '100%', display: 'block', borderRadius: 'var(--radius-md)' }}
            />
          )}
          {!rendering && spaceDesc && renderUrl && (
            <div style={{
              position: 'absolute', bottom: 48, left: 10, right: 10,
              background: 'rgba(1,15,52,0.72)', backdropFilter: 'blur(4px)',
              borderRadius: 10, padding: '8px 12px',
              display: 'flex', gap: 8, alignItems: 'flex-start',
            }}>
              <span style={{ fontSize: 14, flexShrink: 0 }}>🔍</span>
              <div>
                <p style={{ margin: 0, fontSize: 10, fontWeight: 800, color: 'var(--theme-color3)', fontFamily: 'var(--title-font)', letterSpacing: 0.5, textTransform: 'uppercase', marginBottom: 2 }}>
                  Orion analyzed your yard
                </p>
                <p style={{ margin: 0, fontSize: 11, color: 'rgba(255,255,255,0.8)', lineHeight: 1.5, fontStyle: 'italic' }}>
                  "{spaceDesc}"
                </p>
              </div>
            </div>
          )}
          {!rendering && renderError && (
            <div style={{ textAlign: 'center', padding: 32 }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>🏊</div>
              <p style={{ fontSize: 13, color: 'var(--body-color)' }}>
                Rendering unavailable — your design is saved below
              </p>
            </div>
          )}
          {/* Orion badge */}
          {!rendering && renderUrl && (
            <a
              href="https://orion.cool"
              target="_blank"
              rel="noreferrer"
              style={{
                position: 'absolute', bottom: 10, right: 10,
                background: 'rgba(1,15,52,0.75)', color: '#fff',
                fontSize: 10, fontWeight: 700, padding: '4px 10px',
                borderRadius: 20, textDecoration: 'none',
                fontFamily: 'var(--title-font)', letterSpacing: 0.5,
                backdropFilter: 'blur(4px)',
              }}
            >
              ✦ Powered by Orion AI
            </a>
          )}
        </div>
      </div>

      {/* Contact */}
      <div className={styles.summaryGrid2}>
        {[['Email', form.email], ['Phone', form.phone]].map(([l, v]) => (
          <div key={l} className={styles.summaryInfoCell}>
            <div className={styles.summaryInfoLabel}>{l}</div>
            <div className={styles.summaryInfoValue}>{v}</div>
          </div>
        ))}
      </div>

      {/* Photos */}
      {photos.length > 0 && (
        <div className={styles.summarySection}>
          <p className={styles.summarySectionTitle}>Site Photos ({photos.length})</p>
          <div className={styles.summaryPhotoRow}>
            {photos.map((p, i) => (
              <img key={i} src={p.url} alt="" className={styles.summaryPhoto} />
            ))}
          </div>
        </div>
      )}

      {/* Transcript */}
      <div className={styles.summarySection}>
        <p className={styles.summarySectionTitle}>
          Design Consultation ({assistantCount} recommendation{assistantCount !== 1 ? 's' : ''})
        </p>
        <div className={styles.summaryTranscript}>
          {messages.map((m, i) => (
            <div key={i} className={styles.summaryMsg}>
              <div
                className={styles.summaryMsgAvatar}
                style={{ background: m.role === 'assistant'
                  ? 'linear-gradient(135deg,var(--theme-color),var(--theme-color3))'
                  : 'var(--smoke-color2)' }}
              >
                <span style={{ color: m.role === 'assistant' ? '#fff' : 'var(--theme-color)' }}>
                  {m.role === 'assistant' ? 'M' : form.name.charAt(0).toUpperCase()}
                </span>
              </div>
              <div>
                <div className={styles.summaryMsgRole}>
                  {m.role === 'assistant' ? 'Marquee Designer' : form.name.split(' ')[0]}
                </div>
                <p className={styles.summaryMsgText}>{m.content}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <button className={`th-btn ${styles.submitBtn}`} onClick={submitDesign}>
        Submit — Request My Free Estimate
      </button>
      <p className={styles.submitNote}>
        A Marquee specialist will contact you within 24 hours · {MARQUEE_INFO.phone}
      </p>
      <button className={styles.backLink} onClick={goBack}>← Continue Designing</button>
    </div>
  );
}

function ConfirmationScreen({ form, onReset }) {
  const firstName = form.name.split(' ')[0];
  return (
    <div className={styles.stepContent} style={{ textAlign: 'center', paddingTop: 48, paddingBottom: 48 }}>
      <div className={styles.confirmIcon}>✅</div>
      <h2 className={styles.confirmTitle}>Design Submitted!</h2>
      <p className={styles.confirmDesc}>
        Thank you, <strong>{firstName}</strong>! A Marquee Pools specialist will contact you within
        24 hours to discuss your project and schedule a free on-site consultation.
      </p>
      <div className={styles.confirmContact}>
        <a href={'tel:' + MARQUEE_INFO.phone.replace(/\D/g, '')}>
          📞 {MARQUEE_INFO.phone}
        </a>
        <a href={'mailto:' + MARQUEE_INFO.email}>
          ✉ {MARQUEE_INFO.email}
        </a>
      </div>
      <p className={styles.confirmLicense}>
        Marquee Pools & Service, Inc. · Fairfield, CT · Est. 1987 · Fully Licensed & Insured
      </p>
      <button className={styles.backLink} onClick={onReset}>Start a New Design</button>
    </div>
  );
}
