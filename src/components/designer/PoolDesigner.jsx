import { useEffect } from 'react';
import { usePoolDesigner } from '../../hooks/usePoolDesigner.js';
import { StepBar }     from './StepBar.jsx';
import { StepInfo }    from './StepInfo.jsx';
import { StepDesign }  from './StepDesign.jsx';
import { StepSummary } from './StepSummary.jsx';
import styles from './PoolDesigner.module.css';

export function PoolDesignerModal({ isOpen, onClose }) {
  const designer = usePoolDesigner();

  // Lock body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  if (!isOpen) return null;

  const { step } = designer;
  const state   = designer;
  const actions = designer;

  return (
    <div
      className={styles.overlay}
      role="dialog"
      aria-modal="true"
      aria-label="Marquee Pools AI Designer"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className={styles.modal}>
        {/* Modal close button */}
        <button
          className={styles.closeBtn}
          onClick={onClose}
          aria-label="Close pool designer"
        >
          ×
        </button>

        {/* Step progress bar */}
        <StepBar current={step} />

        {/* Step content */}
        {step === 1 && <StepInfo    state={state} actions={actions} />}
        {step === 2 && <StepDesign  state={state} actions={actions} />}
        {step === 3 && <StepSummary state={state} actions={actions} />}
      </div>
    </div>
  );
}
