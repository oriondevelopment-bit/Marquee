import styles from './Designer.module.css';

const STEPS = ['Your Info', 'Design', 'Summary'];

export function StepBar({ current }) {
  return (
    <div className={styles.stepBar}>
      {STEPS.map((label, i) => {
        const num    = i + 1;
        const done   = current > num;
        const active = current === num;
        return (
          <div key={label} className={styles.stepItem} style={{ flex: i < 2 ? 1 : 'none' }}>
            <div className={styles.stepInner}>
              <div
                className={`${styles.stepCircle} ${done ? styles.done : ''} ${active ? styles.active : ''}`}
              >
                {done ? '✓' : num}
              </div>
              <span className={`${styles.stepLabel} ${active ? styles.stepLabelActive : ''}`}>
                {label.toUpperCase()}
              </span>
            </div>
            {i < 2 && (
              <div className={`${styles.stepLine} ${done ? styles.stepLineDone : ''}`} />
            )}
          </div>
        );
      })}
    </div>
  );
}
