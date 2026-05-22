import { useRef, useEffect } from 'react';
import { QUICK_PROMPTS } from '../../constants/poolData.js';
import styles from './Designer.module.css';

export function StepDesign({ state, actions }) {
  const { form, photos, poolType, messages, input, loading, chatStarted } = state;
  const { startChat, sendMessage, setInput, goToSummary } = actions;
  const endRef = useRef(null);
  const firstName = form.name.split(' ')[0];

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  if (!chatStarted) {
    return (
      <div className={styles.stepContent}>
        <div className={styles.chatWelcome}>
          <div className={styles.chatWelcomeIcon}>🌊</div>
          <h2 className={styles.chatWelcomeTitle}>Welcome, {firstName}!</h2>
          <p className={styles.chatWelcomeDesc}>
            Our AI consultant knows every Marquee pool model, Pentair system, and Fairfield County
            consideration.{' '}
            {photos.length > 0 && `Your ${photos.length} yard photo${photos.length > 1 ? 's are' : ' is'} ready to reference.`}
          </p>
          {poolType && (
            <div className={styles.chatWelcomeType}>
              Starting with: {poolType === 'fiberglass' ? '🔷 Fiberglass' : '🔶 Vinyl-Liner'} Pool
            </div>
          )}
          <div className={styles.featurePills}>
            {['Pool Models', 'Spas & Fire', 'Pentair Lighting', 'Audio Systems', 'Decking', 'App Control'].map((f) => (
              <span key={f} className={styles.featurePill}>{f}</span>
            ))}
          </div>
          <button className={`th-btn ${styles.submitBtn}`} onClick={startChat}>
            Start Design Session →
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.stepContent} style={{ padding: 0 }}>
      {/* Chat header bar */}
      <div className={styles.chatHeader}>
        <div className={styles.chatAvatar}>M</div>
        <div>
          <div className={styles.chatName}>Marquee Pools — Design Consultant</div>
          <div className={styles.chatSub}>AI-powered · Fairfield County, CT specialist</div>
        </div>
        <div className={styles.chatOnline}>
          <div className={styles.chatOnlineDot} />
          <span>Online</span>
        </div>
      </div>

      {/* Messages */}
      <div className={styles.chatMessages} role="log" aria-live="polite" aria-label="Design consultation">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`${styles.chatMsg} ${m.role === 'user' ? styles.chatMsgUser : styles.chatMsgAssistant}`}
          >
            {m.role === 'assistant' && <div className={styles.chatMsgAvatar}>M</div>}
            <div className={styles.chatMsgBubble}>{m.content}</div>
            {m.role === 'user' && (
              <div className={`${styles.chatMsgAvatar} ${styles.chatMsgAvatarUser}`}>
                {firstName.charAt(0).toUpperCase()}
              </div>
            )}
          </div>
        ))}

        {loading && (
          <div className={`${styles.chatMsg} ${styles.chatMsgAssistant}`}>
            <div className={styles.chatMsgAvatar}>M</div>
            <div className={`${styles.chatMsgBubble} ${styles.chatTyping}`}>
              <span /><span /><span />
            </div>
          </div>
        )}
        <div ref={endRef} />
      </div>

      {/* Quick prompts */}
      <div className={styles.quickPrompts} role="group" aria-label="Quick message options">
        {QUICK_PROMPTS.map((p) => (
          <button
            key={p}
            className={styles.quickChip}
            onClick={() => sendMessage(p)}
            disabled={loading}
          >
            {p}
          </button>
        ))}
      </div>

      {/* Input bar */}
      <div className={styles.chatInputBar}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && sendMessage()}
          placeholder="Describe your vision or ask about any feature..."
          className={styles.chatInput}
          aria-label="Message to pool designer"
          disabled={loading}
        />
        <button
          className={styles.chatSendBtn}
          onClick={() => sendMessage()}
          disabled={!input.trim() || loading}
          aria-label="Send message"
        >
          Send →
        </button>
      </div>

      {messages.length >= 4 && (
        <div className={styles.chatNext}>
          <button className="th-btn" style={{ width: '100%' }} onClick={goToSummary}>
            Review Design & Request Free Estimate →
          </button>
        </div>
      )}
    </div>
  );
}
