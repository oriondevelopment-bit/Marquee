// ── Orion Widget API ─────────────────────────────────────────────────────────
// All AI calls go through Orion's backend — no Anthropic key in the browser.

const ORION_ENDPOINT = 'https://orion.cool/api/widget/chat';
const ORION_KEY      = import.meta.env.VITE_ORION_KEY || 'orion_wk_636fd87d-d04a-4843-afff-0727ae240a65';

/**
 * Send a conversation to Orion and return the assistant's reply text.
 *
 * @param {Array<{role: 'user'|'assistant', content: string}>} messages
 * @param {string|null} sessionKey - optional session key for lead tracking
 * @returns {Promise<string>}
 */
export async function chatWithDesigner(messages, sessionKey = null) {
  const body = { messages };
  if (sessionKey) body.sessionKey = sessionKey;

  const res = await fetch(ORION_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-orion-key': ORION_KEY,
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err?.error || `Orion API error ${res.status}`);
  }

  const data = await res.json();
  return data.reply || '';
}

/**
 * Create a session in Orion to track this lead's conversation.
 *
 * @param {{ leadName, leadEmail, leadPhone, leadAddress }} leadInfo
 * @returns {Promise<string>} sessionKey
 */
export async function createSession(leadInfo) {
  const res = await fetch('https://orion.cool/api/widget/session', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-orion-key': ORION_KEY,
    },
    body: JSON.stringify(leadInfo),
  });

  if (!res.ok) return null;
  const data = await res.json();
  return data.sessionKey || null;
}

/**
 * Submit a completed design — marks the session as a lead in Orion.
 *
 * @param {string} sessionKey
 * @param {object} designData
 */
export async function submitDesign(sessionKey, designData = {}) {
  if (!sessionKey) return;
  await fetch('https://orion.cool/api/widget/session/submit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-orion-key': ORION_KEY,
    },
    body: JSON.stringify({ sessionKey, designData }),
  }).catch(console.error);
}
