/**
 * WordPress widget entry point.
 *
 * The WP plugin adds <div id="marquee-pool-designer"></div> to the page
 * via shortcode, then enqueues this bundle. This file mounts the modal
 * widget to that div, wired to a trigger button the shortcode also renders.
 */
import React from 'react';
import ReactDOM from 'react-dom/client';
import { useState } from 'react';
import { PoolDesignerModal } from './components/designer/PoolDesigner.jsx';
import './styles/poolax-theme.css';

function WidgetRoot() {
  const [open, setOpen] = useState(false);

  // Expose open() globally so WP shortcode buttons can trigger it
  window.MarqueePoolDesigner = { open: () => setOpen(true) };

  return (
    <PoolDesignerModal
      isOpen={open}
      onClose={() => setOpen(false)}
    />
  );
}

const mountEl = document.getElementById('marquee-pool-designer');
if (mountEl) {
  ReactDOM.createRoot(mountEl).render(
    <React.StrictMode>
      <WidgetRoot />
    </React.StrictMode>
  );
}
