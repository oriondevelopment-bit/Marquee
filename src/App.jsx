import { useState } from 'react';
import { TopBar }    from './components/layout/TopBar.jsx';
import { Header }    from './components/layout/Header.jsx';
import { Footer }    from './components/layout/Footer.jsx';
import {
  Hero, PartnersBar, Services, DesignBand, Testimonials,
} from './components/sections/Sections.jsx';
import { PoolDesignerModal } from './components/designer/PoolDesigner.jsx';

export default function App() {
  const [designerOpen, setDesignerOpen] = useState(false);

  const openDesigner  = () => setDesignerOpen(true);
  const closeDesigner = () => setDesignerOpen(false);

  return (
    <>
      {/* Sandbox notice — remove for production */}
      <div style={{
        background: 'linear-gradient(90deg,#FFB539,#FF8C00)',
        color: '#010F34',
        textAlign: 'center',
        padding: '9px',
        fontFamily: 'var(--title-font)',
        fontSize: '13px',
        fontWeight: 700,
        letterSpacing: '0.3px',
      }}>
        ⚙️ SANDBOX DEMO — AI Pool Designer Plugin · Marquee Pools & Service
      </div>

      <TopBar />
      <Header onDesignClick={openDesigner} />

      <main>
        <Hero        onDesignClick={openDesigner} />
        <PartnersBar />
        <Services />
        <DesignBand  onDesignClick={openDesigner} />
        <Testimonials />
      </main>

      <Footer />

      <PoolDesignerModal isOpen={designerOpen} onClose={closeDesigner} />
    </>
  );
}
