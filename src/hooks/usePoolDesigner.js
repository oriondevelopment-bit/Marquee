import { useState, useCallback } from 'react';
import { chatWithDesigner } from '../services/api.js';

const INITIAL_FORM = { name: '', address: '', email: '', phone: '' };

const FALLBACK_GREETING = (firstName) =>
  `Welcome, ${firstName}! I'm thrilled to help you design your dream pool. ` +
  `Marquee Pools has been building stunning custom pools throughout Fairfield County since 1987, ` +
  `so you're in great hands. To get started — do you have a sense of whether you'd prefer a ` +
  `fiberglass or vinyl-liner pool, or would you like me to walk through the differences?`;

export function usePoolDesigner() {
  const [step, setStep]           = useState(1);
  const [poolType, setPoolType]   = useState(null);
  const [form, setForm]           = useState(INITIAL_FORM);
  const [errors, setErrors]       = useState({});
  const [photos, setPhotos]       = useState([]);
  const [messages, setMessages]   = useState([]);
  const [input, setInput]         = useState('');
  const [loading, setLoading]     = useState(false);
  const [chatStarted, setChatStarted] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // ── Form validation ──────────────────────────────────────────────────────
  const validate = useCallback(() => {
    const e = {};
    if (!form.name.trim())    e.name    = 'Full name required';
    if (!form.address.trim()) e.address = 'Property address required';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Valid email required';
    if (!/^\+?[\d\s\-(]{10,}$/.test(form.phone))         e.phone = 'Valid phone number required';
    setErrors(e);
    return Object.keys(e).length === 0;
  }, [form]);

  const updateField = useCallback((field, value) => {
    setForm((f) => ({ ...f, [field]: value }));
    if (errors[field]) setErrors((e) => ({ ...e, [field]: null }));
  }, [errors]);

  // ── Photo handling ───────────────────────────────────────────────────────
  const addPhotos = useCallback((files) => {
    const remaining = 5 - photos.length;
    Array.from(files).slice(0, remaining).forEach((file) => {
      const reader = new FileReader();
      reader.onload = (ev) =>
        setPhotos((p) => [...p, { name: file.name, url: ev.target.result }].slice(0, 5));
      reader.readAsDataURL(file);
    });
  }, [photos.length]);

  const removePhoto = useCallback((index) => {
    setPhotos((p) => p.filter((_, i) => i !== index));
  }, []);

  // ── Advance step ─────────────────────────────────────────────────────────
  const goToDesign = useCallback(() => {
    if (validate()) setStep(2);
  }, [validate]);

  const goToSummary = useCallback(() => setStep(3), []);
  const goBack      = useCallback(() => setStep((s) => s - 1), []);

  // ── Start AI chat ────────────────────────────────────────────────────────
  const startChat = useCallback(async () => {
    setChatStarted(true);
    setLoading(true);

    const firstName  = form.name.split(' ')[0];
    const typeCtx    = poolType
      ? ` They're interested in a ${poolType === 'fiberglass' ? 'fiberglass' : 'vinyl-liner'} pool.`
      : '';
    const photoCtx   = photos.length > 0
      ? ` They've uploaded ${photos.length} photo(s) of their yard.`
      : '';

    const openingMsg = {
      role: 'user',
      content: `Hi, I'm ${firstName} from ${form.address}.${typeCtx}${photoCtx} Please greet me by first name and start helping me design my pool.`,
    };

    try {
      const reply = await chatWithDesigner([openingMsg]);
      setMessages([{ role: 'assistant', content: reply }]);
    } catch (err) {
      console.error('Chat start error:', err);
      setMessages([{ role: 'assistant', content: FALLBACK_GREETING(firstName) }]);
    } finally {
      setLoading(false);
    }
  }, [form, poolType, photos]);

  // ── Send a message ───────────────────────────────────────────────────────
  const sendMessage = useCallback(async (text) => {
    const msg = (text || input).trim();
    if (!msg || loading) return;

    setInput('');
    const updated = [...messages, { role: 'user', content: msg }];
    setMessages(updated);
    setLoading(true);

    try {
      const reply = await chatWithDesigner(updated);
      setMessages([...updated, { role: 'assistant', content: reply }]);
    } catch (err) {
      console.error('Chat error:', err);
      setMessages([
        ...updated,
        { role: 'assistant', content: 'I\'m having a connection issue — please try again.' },
      ]);
    } finally {
      setLoading(false);
    }
  }, [input, messages, loading]);

  // ── Submit / reset ───────────────────────────────────────────────────────
  const submitDesign = useCallback(() => setSubmitted(true), []);

  const resetAll = useCallback(() => {
    setStep(1);
    setPoolType(null);
    setForm(INITIAL_FORM);
    setErrors({});
    setPhotos([]);
    setMessages([]);
    setInput('');
    setLoading(false);
    setChatStarted(false);
    setSubmitted(false);
  }, []);

  return {
    // State
    step, poolType, form, errors, photos,
    messages, input, loading, chatStarted, submitted,
    // Actions
    setPoolType, updateField, setInput,
    addPhotos, removePhoto,
    goToDesign, goToSummary, goBack,
    startChat, sendMessage,
    submitDesign, resetAll,
  };
}
