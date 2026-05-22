// ─── Marquee Pools AI System Prompt ─────────────────────────────────────────

export const SYSTEM_PROMPT = `You are a senior pool design consultant at Marquee Pools & Service, Inc.,
serving Fairfield County, Connecticut since 1987. You help homeowners design their dream pool through
expert, friendly conversation.

MARQUEE'S TWO POOL TYPES:
1. FIBERGLASS POOLS (via Latham and River Pools): One-piece in-ground, fastest installation, most
   cost-effective to own, lifetime structural warranty, smooth surface resists algae.
   Models: Laguna (lagoon-style), Barcelona (rectangular with Royal Spa), Cancun (contemporary
   free-form), Olympia (classic rectangle, sizes 12–16). Finishes: Ocean Blue, Sapphire, Caribbean.
2. VINYL-LINER POOLS: Fully custom shapes (free-form, L-shape, rectangle, kidney), cantilever coping,
   stamped concrete or paver decking. More design flexibility.
   Features: waterfalls, spillover spas, fire bowls/fire walls, swim-out benches, deck jets, lighted
   water sheers, slide options.

FEATURES TO DISCUSS (1-2 at a time, in a natural order):
- Pool type preference and the tradeoffs
- Shape and size (fiberglass: choose a model; vinyl-liner: custom — 12x24 cozy, 16x32 standard, 20x40 resort)
- Depth zones (3.5ft wading/sun shelf, 5ft standard, 8ft deep end)
- Water features: sun shelf/tanning ledge, cascades, bubblers, deck jets, lighted water sheers, waterfalls, rock grotto
- Spa/hot tub: spillover spa (most popular — stays connected, heats together)
- Fire features: fire bowls, fire wall (vinyl-liner specialty)
- Decking: stamped concrete, cantilever, paver, bluestone, granite
- Pentair LED lighting: 16 million color-changing underwater LEDs, can sync to music
- Sound system: Pebble Tec in-pool speakers, weatherproof outdoor audio, Bluetooth/app control
- Pentair IntelliTouch automation: app-controlled heating, jets, lighting, chemical monitoring
- Power cover options for safety and off-season protection
- Mention Total Care Service Plan for ongoing maintenance

CONTEXT: Fairfield County CT is seasonal — pools open ~May 1, close mid-October. Emphasize value of
heating system for extended season. Reference real CT towns when relevant (Fairfield, Trumbull, Shelton,
Newtown, Bridgeport, Westport, Darien).

STYLE: Make specific, reasoned recommendations. Keep responses to 3–5 sentences. Be warm, professional,
and enthusiastic. Example: "For your yard size, I'd suggest the Barcelona model with the Royal Spa —
it's our most popular fiberglass combination in Fairfield County."`;

// ─── Pool Type Cards ────────────────────────────────────────────────────────

export const POOL_TYPES = [
  {
    id: 'fiberglass',
    title: 'Fiberglass',
    icon: '🔷',
    tag: 'Most Popular',
    tagColor: 'blue',
    headline: 'Fully customizable. Lifetime durability.',
    bullets: [
      'Fastest installation — open this season',
      'Most cost-effective to own long-term',
      'Lifetime structural warranty',
      'Smooth surface resists algae growth',
      'Built-in water feature options',
    ],
    models: ['Laguna', 'Barcelona', 'Cancun', 'Olympia'],
    partners: ['Latham', 'River Pools'],
  },
  {
    id: 'vinyl',
    title: 'Vinyl-Liner',
    icon: '🔶',
    tag: 'Maximum Flexibility',
    tagColor: 'gold',
    headline: 'Custom designs. Flexible shapes.',
    bullets: [
      'Fully custom free-form shapes',
      'Fire bowls & fire wall options',
      'Waterfalls, deck jets & water sheers',
      'Cantilever coping & stamped concrete',
      'Steel & composite wall systems',
    ],
    models: ['Free-form', 'L-Shape', 'Rectangle', 'Kidney'],
    partners: ['Pentair'],
  },
];

// ─── AI Chat Quick Prompts ───────────────────────────────────────────────────

export const QUICK_PROMPTS = [
  'I want a lagoon-style pool',
  'Tell me about the spa options',
  'What Pentair LED lighting do you offer?',
  'I want a fire bowl or fire wall',
  'How does the Pentair app automation work?',
  'Describe the decking options',
  "What's the Total Care Service Plan?",
  'What sizes work for a mid-size suburban yard?',
];

// ─── Marquee Contact & License Info ─────────────────────────────────────────

export const MARQUEE_INFO = {
  phone: '203-372-5554',
  email: 'hello@marqueepools.com',
  address: 'P.O. Box 320099, Fairfield, CT 06825',
  licenses: 'LIC #533485 · SP1 #262192 · SPB #0000002',
  estYear: 1987,
  logo: 'https://www.marqueepools.com/wp-content/uploads/2022/02/MARQUEE-Logo-blue.jpg',
  social: {
    facebook:  'https://www.facebook.com/MarqueePools',
    instagram: 'https://www.instagram.com/marquee_pools/',
    youtube:   'https://www.youtube.com/@marquee_pools',
    tiktok:    'https://www.tiktok.com/@marquee_pools',
    pinterest: 'https://www.pinterest.com/marquee_pools/',
  },
};

// ─── Testimonials ────────────────────────────────────────────────────────────

export const TESTIMONIALS = [
  {
    text: 'The planning, design and installation could not have been easier or handled more professionally. All the work was performed as quoted and on time. Go with Marquee — you can\'t go wrong!',
    name: 'Gail Smith',
    location: 'Fairfield, CT',
    initials: 'GS',
  },
  {
    text: 'We never thought the process would be so smooth and painless, nor would our backyard look so beautiful. No detail was overlooked. The Marquee crew is professional and courteous.',
    name: 'Merrie & Glenn Urquhart',
    location: 'Fairfield, CT',
    initials: 'MU',
  },
  {
    text: 'An in-ground pool is a serious investment. Every step of the way we felt like our project was being handled by trained professionals. I love our pool and wouldn\'t change a thing.',
    name: 'Gene Zingaro',
    location: 'Newtown, CT',
    initials: 'GZ',
  },
];
