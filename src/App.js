import { useState, useEffect } from "react";
import { supabase } from "./supabase";

// ── Translate comment via Claude API ────────────────────────────
async function translateComment(text, targetLang) {
  const langName = targetLang === "it" ? "Italian" : "English";
  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 1000,
        messages: [{
          role: "user",
          content: `Translate the following text to ${langName}. Return ONLY the translated text, nothing else:\n\n${text}`
        }]
      })
    });
    const data = await response.json();
    return data.content?.[0]?.text || text;
  } catch {
    return text;
  }
}




const CATEGORIE = [
  { key: "all", en: "🌍 All", it: "🌍 Tutti" },
  { key: "technical", en: "🎯 Technical", it: "🎯 Tecnico" },
  { key: "tactical", en: "🧠 Tactical", it: "🧠 Tattico" },
  { key: "physical", en: "💪 Physical", it: "💪 Fisico" },
  { key: "mental", en: "🔥 Mental", it: "🔥 Mentale" },
  { key: "competition", en: "🏆 Competition", it: "🏆 Competitivo" },
  { key: "youth", en: "👶 Youth Dev", it: "👶 Giovanile" },
  { key: "business", en: "💼 Business", it: "💼 Business" },
  { key: "general", en: "💬 General", it: "💬 Generale" },
];

const T = {
  en: {
    siteName: "The Tennis Coaching Room",
    tagline: "The global didactic hub for tennis coaches",
    newTopic: "+ New Topic",
    admin: "Admin",
    coaches: "Coaches",
    backToTopics: "← Back",
    yourName: "Your name",
    yourNamePlaceholder: "e.g. Rafael Mendez",
    country: "Country (optional)",
    countryPlaceholder: "e.g. Spain",
    yourOpinion: "Share your opinion...",
    submitComment: "Post Comment",
    comments: "Comments",
    noComments: "Be the first to share your opinion!",
    noTopics: "No topics in this category yet.",
    search: "Search by keyword...",
    topicTitle: "Topic title",
    topicTitlePlaceholder: "e.g. The serve technique in modern tennis",
    topicContent: "Content / Description",
    topicContentPlaceholder: "Describe the topic in detail...",
    youtubeUrl: "YouTube / Vimeo URL (optional)",
    imageUrl: "Image URL (optional)",
    externalLink: "External link (optional)",
    externalLinkLabel: "Link label (optional)",
    categoria: "Category",
    publishTopic: "Publish Topic",
    saveChanges: "Save Changes",
    cancel: "Cancel",
    edit: "Edit",
    delete: "Delete",
    confirmDelete: "Delete this topic?",
    confirmDeleteComment: "Delete this comment?",
    nameRequired: "Please enter your name.",
    commentRequired: "Please write your comment.",
    titleRequired: "Please fill in all required fields.",
    loading: "Loading...",
    justNow: "just now",
    minutesAgo: "m ago",
    hoursAgo: "h ago",
    daysAgo: "d ago",
    visitLink: "Visit link",
    langToggle: "🇮🇹 Italiano",
    sortRecent: "Most Recent",
    sortLikes: "Most Liked",
    sortStars: "Top Rated",
    rateComment: "Rate",
    likeComment: "Helpful",
    alreadyRated: "Rated",
    proposeTopic: "💡 Propose a Topic",
    proposeSubtitle: "Your proposal will be reviewed by the admin before publication.",
    proposeYourName: "Your name *",
    proposeCountry: "Your country (optional)",
    proposeTitle: "Topic title *",
    proposeContent: "Describe your topic *",
    proposeSubmit: "Submit for Review",
    proposeSuccess: "Your topic has been submitted! The admin will review it shortly.",
    pendingTopics: "Pending Approval",
    approve: "✅ Approve",
    reject: "🗑️ Reject",
    noPending: "No topics pending approval.",
    proposedBy: "Proposed by",
  },
  it: {
    siteName: "The Tennis Coaching Room",
    tagline: "Il polo didattico globale per maestri di tennis",
    newTopic: "+ Nuovo Argomento",
    admin: "Admin",
    coaches: "Maestri",
    backToTopics: "← Torna",
    yourName: "Il tuo nome",
    yourNamePlaceholder: "es. Rafael Mendez",
    country: "Paese (opzionale)",
    countryPlaceholder: "es. Italia",
    yourOpinion: "Condividi la tua opinione...",
    submitComment: "Pubblica Commento",
    comments: "Commenti",
    noComments: "Sii il primo a condividere la tua opinione!",
    noTopics: "Nessun argomento in questa categoria.",
    search: "Cerca per parola chiave...",
    topicTitle: "Titolo argomento",
    topicTitlePlaceholder: "es. La tecnica del servizio nel tennis moderno",
    topicContent: "Contenuto / Descrizione",
    topicContentPlaceholder: "Descrivi l'argomento in dettaglio...",
    youtubeUrl: "URL YouTube / Vimeo (opzionale)",
    imageUrl: "URL Immagine (opzionale)",
    externalLink: "Link esterno (opzionale)",
    externalLinkLabel: "Etichetta link (opzionale)",
    categoria: "Categoria",
    publishTopic: "Pubblica Argomento",
    saveChanges: "Salva Modifiche",
    cancel: "Annulla",
    edit: "Modifica",
    delete: "Elimina",
    confirmDelete: "Eliminare questo argomento?",
    confirmDeleteComment: "Eliminare questo commento?",
    nameRequired: "Inserisci il tuo nome.",
    commentRequired: "Scrivi il tuo commento.",
    titleRequired: "Compila tutti i campi obbligatori.",
    loading: "Caricamento...",
    justNow: "adesso",
    minutesAgo: "min fa",
    hoursAgo: "h fa",
    daysAgo: "g fa",
    visitLink: "Visita link",
    langToggle: "🇬🇧 English",
    sortRecent: "Più recenti",
    sortLikes: "Più utili",
    sortStars: "Meglio valutati",
    rateComment: "Valuta",
    likeComment: "Utile",
    alreadyRated: "Valutato",
    proposeTopic: "💡 Proponi un Argomento",
    proposeSubtitle: "La tua proposta sarà revisionata dall'admin prima della pubblicazione.",
    proposeYourName: "Il tuo nome *",
    proposeCountry: "Il tuo paese (opzionale)",
    proposeTitle: "Titolo argomento *",
    proposeContent: "Descrivi il tuo argomento *",
    proposeSubmit: "Invia per revisione",
    proposeSuccess: "Il tuo argomento è stato inviato! L'admin lo revisionerà a breve.",
    pendingTopics: "In attesa di approvazione",
    approve: "✅ Approva",
    reject: "🗑️ Rifiuta",
    noPending: "Nessun argomento in attesa.",
    proposedBy: "Proposto da",
  },
};

function timeAgo(dateStr, t) {
  const diff = (Date.now() - new Date(dateStr)) / 1000;
  if (diff < 60) return t.justNow;
  if (diff < 3600) return `${Math.floor(diff / 60)}${t.minutesAgo}`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}${t.hoursAgo}`;
  return `${Math.floor(diff / 86400)}${t.daysAgo}`;
}

function getYoutubeEmbed(url) {
  if (!url) return null;
  const match = url.match(/(?:youtu\.be\/|youtube\.com(?:\/embed\/|\/v\/|\/watch\?v=|\/watch\?.+&v=))([\w-]{11})/);
  if (match) return `https://www.youtube.com/embed/${match[1]}`;
  const vimeo = url.match(/vimeo\.com\/(\d+)/);
  if (vimeo) return `https://player.vimeo.com/video/${vimeo[1]}`;
  return null;
}

function getCatLabel(key, lang) {
  const cat = CATEGORIE.find(c => c.key === key);
  return cat ? cat[lang] : key;
}

const S = {
  page: { minHeight: "100vh", background: "#0a0a0a", fontFamily: "'DM Sans', sans-serif", color: "#f0ebe3" },
  header: { borderBottom: "1px solid #1e1e1e", padding: "0 16px", height: 56, display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, background: "rgba(10,10,10,0.95)", backdropFilter: "blur(12px)", zIndex: 100 },
  logo: { fontFamily: "'Cormorant Garamond', serif", fontSize: 17, fontWeight: 700, color: "#c8a96e", letterSpacing: 0.5 },
  tagline: { fontSize: 9, color: "#555", letterSpacing: 1, textTransform: "uppercase", marginTop: 1 },
  main: { maxWidth: 900, margin: "0 auto", padding: "24px 16px" },
  card: { background: "#111", border: "1px solid #1e1e1e", borderRadius: 14, padding: "18px 16px", marginBottom: 16, cursor: "pointer", transition: "all 0.2s" },
  btn: { padding: "10px 22px", borderRadius: 10, border: "none", fontWeight: 700, cursor: "pointer", fontSize: 14, fontFamily: "'DM Sans', sans-serif" },
  btnGold: { background: "linear-gradient(135deg, #c8a96e, #e8c98e)", color: "#0a0a0a" },
  btnDark: { background: "#1e1e1e", color: "#f0ebe3" },
  btnRed: { background: "#3d1a1a", color: "#f87171" },
  btnGreen: { background: "#1a2a1a", color: "#4ade80", border: "1px solid #4ade8044" },
  input: { width: "100%", padding: "12px 16px", borderRadius: 10, border: "1px solid #2a2a2a", background: "#151515", color: "#f0ebe3", fontSize: 14, fontFamily: "'DM Sans', sans-serif", outline: "none", boxSizing: "border-box" },
  textarea: { width: "100%", padding: "12px 16px", borderRadius: 10, border: "1px solid #2a2a2a", background: "#151515", color: "#f0ebe3", fontSize: 14, fontFamily: "'DM Sans', sans-serif", outline: "none", boxSizing: "border-box", resize: "vertical" },
  label: { fontSize: 12, fontWeight: 700, color: "#888", letterSpacing: 1, textTransform: "uppercase", display: "block", marginBottom: 8 },
  tag: { background: "#1a1a1a", border: "1px solid #2a2a2a", color: "#c8a96e", padding: "3px 10px", borderRadius: 20, fontSize: 11, fontWeight: 700, letterSpacing: 1 },
};

function StarRating({ value, onChange, readonly, size = 18 }) {
  const [hovered, setHovered] = useState(0);
  return (
    <div style={{ display: "flex", gap: 3 }}>
      {[1, 2, 3, 4, 5].map(s => (
        <span key={s}
          onClick={() => !readonly && onChange && onChange(s)}
          onMouseEnter={() => !readonly && setHovered(s)}
          onMouseLeave={() => !readonly && setHovered(0)}
          style={{ fontSize: size, cursor: readonly ? "default" : "pointer", color: s <= (hovered || value) ? "#c8a96e" : "#333", transition: "color 0.1s" }}>
          ★
        </span>
      ))}
    </div>
  );
}

function CategoryBadge({ catKey, lang }) {
  const cat = CATEGORIE.find(c => c.key === catKey);
  if (!cat || catKey === "general" || catKey === "all") return null;
  return <span style={{ ...S.tag, marginRight: 6 }}>{cat[lang]}</span>;
}

// ── Proponi Argomento ───────────────────────────────────────────
function ProponiArgomento({ t, onSubmit, onCancel }) {
  const [titolo, setTitolo] = useState("");
  const [contenuto, setContenuto] = useState("");
  const [nome, setNome] = useState("");
  const [paese, setPaese] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async () => {
    if (!titolo.trim() || !contenuto.trim() || !nome.trim()) {
      alert(t.titleRequired);
      return;
    }
    setLoading(true);
    await onSubmit({ titolo, contenuto, nome, paese });
    setLoading(false);
    setSuccess(true);
  };

  if (success) {
    return (
      <div style={{ background: "#111", border: "1px solid #2a2a2a", borderRadius: 20, padding: 40, maxWidth: 560, margin: "0 auto", textAlign: "center" }}>
        <div style={{ fontSize: 56, marginBottom: 16 }}>🎾</div>
        <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 24, color: "#c8a96e", margin: "0 0 12px" }}>Thank you!</h2>
        <p style={{ color: "#666", fontSize: 15, margin: "0 0 24px" }}>{t.proposeSuccess}</p>
        <button onClick={onCancel} style={{ ...S.btn, ...S.btnDark }}>{t.backToTopics}</button>
      </div>
    );
  }

  return (
    <div style={{ background: "#111", border: "1px solid #2a2a2a", borderRadius: 20, padding: 32, maxWidth: 560, margin: "0 auto" }}>
      <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 28, color: "#c8a96e", margin: "0 0 8px" }}>{t.proposeTopic}</h2>
      <p style={{ color: "#555", fontSize: 13, margin: "0 0 24px" }}>{t.proposeSubtitle}</p>
      <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          <div>
            <label style={S.label}>{t.proposeYourName}</label>
            <input style={S.input} value={nome} onChange={e => setNome(e.target.value)} placeholder={t.yourNamePlaceholder} />
          </div>
          <div>
            <label style={S.label}>{t.proposeCountry}</label>
            <input style={S.input} value={paese} onChange={e => setPaese(e.target.value)} placeholder={t.countryPlaceholder} />
          </div>
        </div>
        <div>
          <label style={S.label}>{t.proposeTitle}</label>
          <input style={S.input} value={titolo} onChange={e => setTitolo(e.target.value)} placeholder={t.topicTitlePlaceholder} />
        </div>
        <div>
          <label style={S.label}>{t.proposeContent}</label>
          <textarea style={S.textarea} rows={5} value={contenuto} onChange={e => setContenuto(e.target.value)} placeholder={t.topicContentPlaceholder} />
        </div>
        <div style={{ display: "flex", gap: 12 }}>
          <button style={{ ...S.btn, ...S.btnGold, flex: 1 }} onClick={handleSubmit} disabled={loading}>
            {loading ? "..." : t.proposeSubmit}
          </button>
          <button style={{ ...S.btn, ...S.btnDark }} onClick={onCancel}>{t.cancel}</button>
        </div>
      </div>
    </div>
  );
}

// ── Pending Topics ──────────────────────────────────────────────
function PendingTopics({ t, topics, onApprove, onReject, onBack }) {
  const pending = (topics || []).filter(tp => tp.stato === "in attesa");
  return (
    <div style={{ maxWidth: 700, margin: "0 auto" }}>
      <button onClick={onBack} style={{ ...S.btn, ...S.btnDark, marginBottom: 24, fontSize: 13 }}>{t.backToTopics}</button>
      <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 28, color: "#c8a96e", margin: "0 0 24px" }}>
        ⏳ {t.pendingTopics} ({pending.length})
      </h2>
      {pending.length === 0 ? (
        <div style={{ textAlign: "center", padding: "48px 0", color: "#444" }}>
          <div style={{ fontSize: 40, marginBottom: 12 }}>✅</div>
          <div>{t.noPending}</div>
        </div>
      ) : (
        pending.map(tp => (
          <div key={tp.id} style={{ background: "#111", border: "1px solid #2a2a2a", borderRadius: 16, padding: 24, marginBottom: 16 }}>
            <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 20, color: "#f0ebe3", margin: "0 0 8px" }}>{tp.title}</h3>
            {tp.proposto_da && (
              <div style={{ fontSize: 12, color: "#c8a96e", fontWeight: 700, marginBottom: 12 }}>
                {t.proposedBy}: {tp.proposto_da} {tp.proposto_paese ? `🌍 ${tp.proposto_paese}` : ""}
              </div>
            )}
            <p style={{ color: "#666", fontSize: 14, lineHeight: 1.7, margin: "0 0 20px" }}>{tp.content}</p>
            <div style={{ display: "flex", gap: 10 }}>
              <button onClick={() => onApprove(tp.id)} style={{ ...S.btn, ...S.btnGreen, flex: 1 }}>{t.approve}</button>
              <button onClick={() => onReject(tp.id)} style={{ ...S.btn, ...S.btnRed, flex: 1 }}>{t.reject}</button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

// ── Topic Form ──────────────────────────────────────────────────
function TopicForm({ t, lang, onSave, onCancel, editTopic }) {
  const empty = { title: "", content: "", youtube_url: "", image_url: "", external_link: "", external_link_label: "", categoria: "general", title_it: "", content_it: "" };
  const [form, setForm] = useState(editTopic ? { ...editTopic } : empty);
  const [loading, setLoading] = useState(false);
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleSubmit = async () => {
    if (!form.title || !form.content) { alert(t.titleRequired); return; }
    setLoading(true);
    await onSave(form);
    setLoading(false);
  };

  return (
    <div style={{ background: "#111", border: "1px solid #2a2a2a", borderRadius: 20, padding: 32, maxWidth: 640, margin: "0 auto" }}>
      <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 28, color: "#c8a96e", margin: "0 0 28px" }}>
        {editTopic ? "✏️ " + t.edit : "✦ " + t.newTopic.replace("+ ", "")}
      </h2>
      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        <div>
          <label style={S.label}>{t.topicTitle} *</label>
          <input style={S.input} value={form.title} onChange={e => set("title", e.target.value)} placeholder={t.topicTitlePlaceholder} />
        </div>
        <div>
          <label style={S.label}>🇮🇹 Titolo in italiano (opzionale)</label>
          <input style={S.input} value={form.title_it || ""} onChange={e => set("title_it", e.target.value)} placeholder="es. L'Occhio del Maestro" />
        </div>
        <div>
          <label style={S.label}>🇮🇹 Contenuto in italiano (opzionale)</label>
          <textarea style={S.textarea} rows={5} value={form.content_it || ""} onChange={e => set("content_it", e.target.value)} placeholder="Versione italiana dell'argomento..." />
        </div>
        <div>
          <label style={S.label}>{t.categoria}</label>
          <select value={form.categoria} onChange={e => set("categoria", e.target.value)} style={{ ...S.input, cursor: "pointer" }}>
            {CATEGORIE.filter(c => c.key !== "all").map(c => <option key={c.key} value={c.key}>{c[lang]}</option>)}
          </select>
        </div>
        <div>
          <label style={S.label}>{t.topicContent} *</label>
          <textarea style={S.textarea} rows={6} value={form.content} onChange={e => set("content", e.target.value)} placeholder={t.topicContentPlaceholder} />
        </div>
        <div>
          <label style={S.label}>🎥 {t.youtubeUrl}</label>
          <input style={S.input} value={form.youtube_url} onChange={e => set("youtube_url", e.target.value)} placeholder="https://youtube.com/watch?v=..." />
        </div>
        <div>
          <label style={S.label}>🖼️ {t.imageUrl}</label>
          <input style={S.input} value={form.image_url} onChange={e => set("image_url", e.target.value)} placeholder="https://example.com/image.jpg" />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          <div>
            <label style={S.label}>🔗 {t.externalLink}</label>
            <input style={S.input} value={form.external_link} onChange={e => set("external_link", e.target.value)} placeholder="https://..." />
          </div>
          <div>
            <label style={S.label}>{t.externalLinkLabel}</label>
            <input style={S.input} value={form.external_link_label} onChange={e => set("external_link_label", e.target.value)} placeholder="e.g. Research Paper" />
          </div>
        </div>
        <div style={{ display: "flex", gap: 12, marginTop: 8 }}>
          <button style={{ ...S.btn, ...S.btnGold, flex: 1 }} onClick={handleSubmit} disabled={loading}>
            {loading ? "..." : editTopic ? t.saveChanges : t.publishTopic}
          </button>
          <button style={{ ...S.btn, ...S.btnDark }} onClick={onCancel}>{t.cancel}</button>
        </div>
      </div>
    </div>
  );
}

// ── Topic Card ──────────────────────────────────────────────────
function TopicCard({ topic, t, lang, onClick, isAdmin, onEdit, onDelete }) {
  const commentCount = topic.comment_count || 0;
  const avgStars = topic.avg_stars ? parseFloat(topic.avg_stars).toFixed(1) : null;
  return (
    <div style={{ ...S.card }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = "#c8a96e44"; e.currentTarget.style.transform = "translateY(-2px)"; }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = "#1e1e1e"; e.currentTarget.style.transform = ""; }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap", alignItems: "center" }}>
          <CategoryBadge catKey={topic.categoria} lang={lang} />
          {topic.youtube_url && <span style={S.tag}>🎥</span>}
          {topic.image_url && <span style={S.tag}>🖼️</span>}
          {topic.external_link && <span style={S.tag}>🔗</span>}
        </div>
        <span style={{ fontSize: 12, color: "#444", flexShrink: 0, marginLeft: 8 }}>{timeAgo(topic.created_at, t)}</span>
      </div>
      <h3 onClick={onClick} style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(18px, 4vw, 24px)", fontWeight: 700, color: "#f0ebe3", margin: "0 0 10px", cursor: "pointer", lineHeight: 1.3 }}>
        {lang === "it" && topic.title_it ? topic.title_it : topic.title}
      </h3>
      <p style={{ color: "#666", fontSize: 14, lineHeight: 1.7, margin: "0 0 20px" }}>
        {(() => { const txt = lang === "it" && topic.content_it ? topic.content_it : topic.content; return txt.length > 180 ? txt.slice(0, 180) + "..." : txt; })()}
      </p>
      {topic.image_url && (
        <div style={{ borderRadius: 10, overflow: "hidden", marginBottom: 16, maxHeight: 200 }}>
          <img src={topic.image_url} alt="" style={{ width: "100%", objectFit: "cover", maxHeight: 200 }} onError={e => e.target.style.display = "none"} />
        </div>
      )}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid #1a1a1a", paddingTop: 16 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <button onClick={onClick} style={{ ...S.btn, ...S.btnDark, fontSize: 13 }}>
            💬 {commentCount} {t.comments}
          </button>
          {avgStars && (
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <StarRating value={Math.round(parseFloat(avgStars))} readonly size={14} />
              <span style={{ fontSize: 12, color: "#c8a96e", fontWeight: 700 }}>{avgStars}</span>
            </div>
          )}
        </div>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <button
            onClick={e => {
              e.stopPropagation();
              const url = `${window.location.origin}${window.location.pathname}?topic=${topic.id}`;
              navigator.clipboard.writeText(url).then(() => alert("🔗 Link copied! Share it on Instagram or WhatsApp."));
            }}
            style={{ ...S.btn, background: "none", color: "#444", fontSize: 12, padding: "6px 10px", border: "1px solid #2a2a2a" }}
            title="Copy link">
            🔗
          </button>
          {isAdmin && (
            <>
              <button onClick={e => { e.stopPropagation(); onEdit(topic); }} style={{ ...S.btn, ...S.btnDark, fontSize: 12, padding: "8px 14px" }}>✏️</button>
              <button onClick={e => { e.stopPropagation(); if (window.confirm(t.confirmDelete)) onDelete(topic.id); }} style={{ ...S.btn, ...S.btnRed, fontSize: 12, padding: "8px 14px" }}>🗑️</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Comment Card ────────────────────────────────────────────────
function CommentCard({ c, t, lang, isAdmin, onDelete, onLike, onRate, ratedIds, likedIds }) {
  const [translatedText, setTranslatedText] = useState(null);
  const [translating, setTranslating] = useState(false);

  const handleTranslate = async () => {
    if (translatedText) { setTranslatedText(null); return; }
    setTranslating(true);
    const result = await translateComment(c.testo, lang);
    setTranslatedText(result);
    setTranslating(false);
  };
  const alreadyRated = ratedIds.includes(c.id);
  const alreadyLiked = likedIds.includes(c.id);
  return (
    <div style={{ background: "#111", border: "1px solid #1e1e1e", borderRadius: 14, padding: 22, marginBottom: 14 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 40, height: 40, borderRadius: "50%", background: "linear-gradient(135deg, #c8a96e, #8b5a2b)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, fontWeight: 800, color: "#0a0a0a", flexShrink: 0 }}>
            {c.nome.charAt(0).toUpperCase()}
          </div>
          <div>
            <div style={{ fontWeight: 700, color: "#f0ebe3", fontSize: 15 }}>{c.nome}</div>
            {c.paese && <div style={{ fontSize: 12, color: "#555" }}>🌍 {c.paese}</div>}
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontSize: 12, color: "#444" }}>{timeAgo(c.created_at, t)}</span>
          {isAdmin && <button onClick={() => onDelete(c.id)} style={{ ...S.btn, ...S.btnRed, padding: "4px 10px", fontSize: 11 }}>✕</button>}
        </div>
      </div>
      <p style={{ color: "#aaa", fontSize: 14, lineHeight: 1.7, margin: "0 0 10px", whiteSpace: "pre-wrap" }}>{c.testo}</p>
      {translatedText && (
        <div style={{ background: "#0a0a0a", border: "1px solid #c8a96e22", borderRadius: 10, padding: "10px 14px", marginBottom: 12 }}>
          <div style={{ fontSize: 11, color: "#c8a96e", fontWeight: 700, marginBottom: 6, letterSpacing: 1 }}>
            {lang === "it" ? "🇮🇹 TRADUZIONE" : "🇬🇧 TRANSLATION"}
          </div>
          <p style={{ color: "#888", fontSize: 14, lineHeight: 1.7, margin: 0, whiteSpace: "pre-wrap", fontStyle: "italic" }}>{translatedText}</p>
        </div>
      )}
      <button onClick={handleTranslate} disabled={translating}
        style={{ background: "none", border: "none", cursor: "pointer", color: translatedText ? "#c8a96e" : "#444", fontSize: 12, padding: "0 0 8px", fontFamily: "inherit", fontStyle: "italic" }}>
        {translating ? "⏳ Translating..." : translatedText ? (lang === "it" ? "✕ Nascondi traduzione" : "✕ Hide translation") : (lang === "it" ? "🌐 Traduci" : "🌐 Translate")}
      </button>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderTop: "1px solid #1a1a1a", paddingTop: 14, flexWrap: "wrap", gap: 12 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          {!alreadyRated ? (
            <>
              <span style={{ fontSize: 11, color: "#555", fontWeight: 700, textTransform: "uppercase", letterSpacing: 1 }}>{t.rateComment}:</span>
              <StarRating value={0} onChange={(s) => onRate(c.id, s)} size={18} />
            </>
          ) : (
            <>
              <StarRating value={Math.round(c.stelle || 0)} readonly size={16} />
              {c.rate_count > 0 && <span style={{ fontSize: 12, color: "#c8a96e", fontWeight: 700 }}>{parseFloat(c.stelle || 0).toFixed(1)} ({c.rate_count})</span>}
              <span style={{ fontSize: 11, color: "#444" }}>— {t.alreadyRated}</span>
            </>
          )}
        </div>
        <button onClick={() => !alreadyLiked && onLike(c.id)}
          style={{ ...S.btn, background: alreadyLiked ? "#1a2a1a" : "#1e1e1e", color: alreadyLiked ? "#4ade80" : "#888", fontSize: 12, padding: "6px 14px", border: alreadyLiked ? "1px solid #4ade8044" : "1px solid transparent", cursor: alreadyLiked ? "default" : "pointer" }}>
          👍 {t.likeComment} {c.likes > 0 ? `(${c.likes})` : ""}
        </button>
      </div>
    </div>
  );
}

// ── Topic Detail ────────────────────────────────────────────────
function TopicDetail({ topic, t, lang, onBack, isAdmin, onEdit, onDelete }) {
  const [comments, setComments] = useState([]);
  const [nome, setNome] = useState("");
  const [paese, setPaese] = useState("");
  const [testo, setTesto] = useState("");
  const [loading, setLoading] = useState(false);
  const [sortBy, setSortBy] = useState("recent");
  const [ratedIds, setRatedIds] = useState(() => { try { return JSON.parse(localStorage.getItem("rated_ids") || "[]"); } catch { return []; } });
  const [likedIds, setLikedIds] = useState(() => { try { return JSON.parse(localStorage.getItem("liked_ids") || "[]"); } catch { return []; } });
  const embedUrl = getYoutubeEmbed(topic.youtube_url);

  const caricaCommenti = async () => {
    const { data } = await supabase.from("commenti").select("*").eq("topic_id", topic.id);
    setComments(data || []);
  };

  useEffect(() => { caricaCommenti(); }, [topic.id]);

  const sortedComments = [...comments].sort((a, b) => {
    if (sortBy === "likes") return (b.likes || 0) - (a.likes || 0);
    if (sortBy === "stars") return (b.stelle || 0) - (a.stelle || 0);
    return new Date(b.created_at) - new Date(a.created_at);
  });

  const inviaCommento = async () => {
    if (!nome.trim()) { alert(t.nameRequired); return; }
    if (!testo.trim()) { alert(t.commentRequired); return; }
    setLoading(true);
    await supabase.from("commenti").insert([{ topic_id: topic.id, nome: nome.trim(), paese: paese.trim(), testo: testo.trim(), likes: 0, stelle: 0, rate_count: 0 }]);
    setTesto("");
    await caricaCommenti();
    setLoading(false);
  };

  const eliminaCommento = async (id) => {
    if (!window.confirm(t.confirmDeleteComment)) return;
    await supabase.from("commenti").delete().eq("id", id);
    await caricaCommenti();
  };

  const handleLike = async (id) => {
    const c = comments.find(x => x.id === id);
    if (!c) return;
    await supabase.from("commenti").update({ likes: (c.likes || 0) + 1 }).eq("id", id);
    const newLiked = [...likedIds, id];
    setLikedIds(newLiked);
    try { localStorage.setItem("liked_ids", JSON.stringify(newLiked)); } catch {}
    await caricaCommenti();
  };

  const handleRate = async (id, stelle) => {
    const c = comments.find(x => x.id === id);
    if (!c) return;
    const oldCount = c.rate_count || 0;
    const oldStelle = c.stelle || 0;
    const newCount = oldCount + 1;
    const newStelle = ((oldStelle * oldCount) + stelle) / newCount;
    await supabase.from("commenti").update({ stelle: newStelle, rate_count: newCount }).eq("id", id);
    const newRated = [...ratedIds, id];
    setRatedIds(newRated);
    try { localStorage.setItem("rated_ids", JSON.stringify(newRated)); } catch {}
    await caricaCommenti();
  };

  return (
    <div>
      <button onClick={onBack} style={{ ...S.btn, ...S.btnDark, marginBottom: 28, fontSize: 13 }}>{t.backToTopics}</button>
      <div style={{ background: "#111", border: "1px solid #1e1e1e", borderRadius: 20, padding: 36, marginBottom: 24 }}>
        <div style={{ display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap", alignItems: "center" }}>
          <CategoryBadge catKey={topic.categoria} lang={lang} />
          {topic.youtube_url && <span style={S.tag}>🎥 VIDEO</span>}
          {topic.image_url && <span style={S.tag}>🖼️ IMAGE</span>}
          {topic.external_link && <span style={S.tag}>🔗 LINK</span>}
        </div>
        <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 36, fontWeight: 700, color: "#f0ebe3", margin: "0 0 20px", lineHeight: 1.2 }}>{lang === "it" && topic.title_it ? topic.title_it : topic.title}</h1>
        <p style={{ color: "#888", fontSize: 15, lineHeight: 1.8, margin: "0 0 24px", whiteSpace: "pre-wrap" }}>{lang === "it" && topic.content_it ? topic.content_it : topic.content}</p>
        {topic.image_url && (
          <div style={{ borderRadius: 12, overflow: "hidden", marginBottom: 24 }}>
            <img src={topic.image_url} alt="" style={{ width: "100%", objectFit: "cover", maxHeight: 400 }} onError={e => e.target.style.display = "none"} />
          </div>
        )}
        {embedUrl && (
          <div style={{ borderRadius: 12, overflow: "hidden", marginBottom: 24, position: "relative", paddingBottom: "56.25%", height: 0 }}>
            <iframe src={embedUrl} style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", border: "none" }} allowFullScreen title="video" />
          </div>
        )}
        {topic.external_link && (
          <a href={topic.external_link} target="_blank" rel="noopener noreferrer"
            style={{ display: "inline-flex", alignItems: "center", gap: 8, ...S.btn, ...S.btnDark, textDecoration: "none" }}>
            🔗 {topic.external_link_label || t.visitLink}
          </a>
        )}
        {isAdmin && (
          <div style={{ display: "flex", gap: 10, marginTop: 20, borderTop: "1px solid #1a1a1a", paddingTop: 20 }}>
            <button onClick={() => onEdit(topic)} style={{ ...S.btn, ...S.btnDark }}>✏️ {t.edit}</button>
            <button onClick={() => { if (window.confirm(t.confirmDelete)) onDelete(topic.id); }} style={{ ...S.btn, ...S.btnRed }}>🗑️ {t.delete}</button>
          </div>
        )}
      </div>

      <div style={{ background: "#111", border: "1px solid #1e1e1e", borderRadius: 20, padding: 28, marginBottom: 24 }}>
        <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 22, color: "#c8a96e", margin: "0 0 20px" }}>✦ {t.yourOpinion.replace("...", "")}</h3>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 }}>
          <div>
            <label style={S.label}>{t.yourName} *</label>
            <input style={S.input} value={nome} onChange={e => setNome(e.target.value)} placeholder={t.yourNamePlaceholder} />
          </div>
          <div>
            <label style={S.label}>{t.country}</label>
            <input style={S.input} value={paese} onChange={e => setPaese(e.target.value)} placeholder={t.countryPlaceholder} />
          </div>
        </div>
        <div style={{ marginBottom: 16 }}>
          <label style={S.label}>{t.yourOpinion} *</label>
          <textarea style={S.textarea} rows={4} value={testo} onChange={e => setTesto(e.target.value)} placeholder={t.yourOpinion} />
        </div>
        <button onClick={inviaCommento} disabled={loading} style={{ ...S.btn, ...S.btnGold, width: "100%" }}>
          {loading ? "..." : t.submitComment}
        </button>
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16, flexWrap: "wrap", gap: 12 }}>
        <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 22, color: "#f0ebe3", margin: 0 }}>
          💬 {comments.length} {t.comments}
        </h3>
        <div style={{ display: "flex", background: "#151515", borderRadius: 10, padding: 3, gap: 3 }}>
          {[
            { key: "recent", label: "🕐 " + t.sortRecent },
            { key: "likes", label: "👍 " + t.sortLikes },
            { key: "stars", label: "⭐ " + t.sortStars },
          ].map(({ key, label }) => (
            <button key={key} onClick={() => setSortBy(key)}
              style={{ ...S.btn, fontSize: 11, padding: "6px 12px", background: sortBy === key ? "#c8a96e" : "transparent", color: sortBy === key ? "#0a0a0a" : "#666" }}>
              {label}
            </button>
          ))}
        </div>
      </div>

      {comments.length === 0 ? (
        <div style={{ textAlign: "center", padding: "40px 0", color: "#444", fontSize: 15 }}>{t.noComments}</div>
      ) : (
        sortedComments.map(c => (
          <CommentCard key={c.id} c={c} t={t} lang={lang} isAdmin={isAdmin}
            onDelete={eliminaCommento} onLike={handleLike} onRate={handleRate}
            ratedIds={ratedIds} likedIds={likedIds} />
        ))
      )}
    </div>
  );
}


// ── Admin Login Modal ───────────────────────────────────────────
function AdminLoginModal({ t, onLogin, onClose }) {
  const [password, setPassword] = useState("");
  const [errore, setErrore] = useState("");
  const ADMIN_PASSWORD = "tenniscoachingroom2026";

  const handleLogin = () => {
    if (password === ADMIN_PASSWORD) {
      onLogin();
    } else {
      setErrore("Wrong password. Try again.");
    }
  };

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.8)", zIndex: 1000, display: "flex", alignItems: "flex-end", justifyContent: "center", padding: 16 }}
      onClick={onClose}>
      <div style={{ background: "#111", border: "1px solid #2a2a2a", borderRadius: "20px 20px 0 0", padding: "28px 24px 40px", width: "100%", maxWidth: 480 }}
        onClick={e => e.stopPropagation()}>
        <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 24, color: "#c8a96e", margin: "0 0 6px" }}>⚙️ Admin Access</h2>
        <p style={{ color: "#555", fontSize: 13, margin: "0 0 24px" }}>Enter your password to access the admin panel.</p>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <input
            value={password}
            onChange={e => setPassword(e.target.value)}
            onKeyDown={e => e.key === "Enter" && handleLogin()}
            type="password"
            placeholder="Password"
            autoFocus
            style={{ ...S.input }}
          />
          {errore && (
            <div style={{ background: "#3d1a1a", color: "#f87171", padding: "10px 14px", borderRadius: 10, fontSize: 13 }}>
              ⚠️ {errore}
            </div>
          )}
          <button onClick={handleLogin} style={{ ...S.btn, ...S.btnGold, width: "100%", padding: 13 }}>
            Access →
          </button>
          <button onClick={onClose} style={{ ...S.btn, ...S.btnDark, width: "100%", padding: 11, fontSize: 13 }}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Main App ────────────────────────────────────────────────────
export default function App() {
  const [lang, setLang] = useState("en");
  const t = T[lang];
  const [isAdmin, setIsAdmin] = useState(false);
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [topics, setTopics] = useState([]);
  const [directTopicId, setDirectTopicId] = useState(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const id = params.get("topic");
      return id ? parseInt(id) : null;
    } catch { return null; }
  });
  const [loading, setLoading] = useState(true);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [showPropose, setShowPropose] = useState(false);
  const [showPending, setShowPending] = useState(false);
  const [editTopic, setEditTopic] = useState(null);
  const [search, setSearch] = useState("");
  const [activeCat, setActiveCat] = useState("all");

  const caricaTopics = async () => {
    setLoading(true);
    const { data: topicsData } = await supabase.from("topics").select("*").order("created_at", { ascending: false });
    const { data: commentiData } = await supabase.from("commenti").select("topic_id, stelle");
    const withStats = (topicsData || []).map(tp => {
      const topicComments = (commentiData || []).filter(c => c.topic_id === tp.id);
      const ratedComments = topicComments.filter(c => c.stelle > 0);
      const avgStars = ratedComments.length > 0
        ? ratedComments.reduce((sum, c) => sum + c.stelle, 0) / ratedComments.length
        : null;
      return { ...tp, comment_count: topicComments.length, avg_stars: avgStars };
    });
    setTopics(withStats);
    setLoading(false);
  };

  useEffect(() => { caricaTopics(); }, []);

  useEffect(() => {
    if (directTopicId && topics.length > 0) {
      const found = topics.find(tp => tp.id === directTopicId);
      if (found) {
        setSelectedTopic(found);
        setDirectTopicId(null);
      }
    }
  }, [directTopicId, topics]);

  const saveTopic = async (form) => {
    const payload = {
      title: form.title,
      content: form.content,
      title_it: form.title_it || "",
      content_it: form.content_it || "",
      youtube_url: form.youtube_url || "",
      image_url: form.image_url || "",
      external_link: form.external_link || "",
      external_link_label: form.external_link_label || "",
      categoria: form.categoria || "general",
      stato: "pubblicato",
    };
    if (editTopic) {
      await supabase.from("topics").update(payload).eq("id", editTopic.id);
    } else {
      await supabase.from("topics").insert([{ ...payload, proposto_da: "", proposto_paese: "" }]);
    }
    await caricaTopics();
    setShowForm(false);
    setEditTopic(null);
    setSelectedTopic(null);
  };

  const proponiArgomento = async ({ titolo, contenuto, nome, paese }) => {
    await supabase.from("topics").insert([{
      title: titolo,
      content: contenuto,
      youtube_url: "",
      image_url: "",
      external_link: "",
      external_link_label: "",
      categoria: "general",
      stato: "in attesa",
      proposto_da: nome,
      proposto_paese: paese,
    }]);
    await caricaTopics();
  };

  const approvaTopic = async (id) => {
    await supabase.from("topics").update({ stato: "pubblicato" }).eq("id", id);
    await caricaTopics();
  };

  const rifiutaTopic = async (id) => {
    if (!window.confirm(t.confirmDelete)) return;
    await supabase.from("topics").delete().eq("id", id);
    await caricaTopics();
  };

  const deleteTopic = async (id) => {
    await supabase.from("topics").delete().eq("id", id);
    await caricaTopics();
    setSelectedTopic(null);
  };

  const pendingCount = topics.filter(tp => tp.stato === "in attesa").length;

  const filtered = topics.filter(tp => {
    if (!isAdmin && tp.stato !== "pubblicato") return false;
    const matchCat = activeCat === "all" || tp.categoria === activeCat;
    const matchSearch = search === "" ||
      tp.title.toLowerCase().includes(search.toLowerCase()) ||
      tp.content.toLowerCase().includes(search.toLowerCase()) ||
      getCatLabel(tp.categoria, lang).toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div style={S.page}>
      {showAdminLogin && (
        <AdminLoginModal
          t={t}
          onLogin={() => { setIsAdmin(true); setShowAdminLogin(false); }}
          onClose={() => setShowAdminLogin(false)}
        />
      )}
      <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700&family=DM+Sans:wght@400;500;700&display=swap" rel="stylesheet" />

      <header style={S.header}>
        <div>
          <div style={S.logo}>✦ The Tennis Coaching Room</div>
          <div style={S.tagline}>{t.tagline}</div>
        </div>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <button onClick={() => setLang(l => l === "en" ? "it" : "en")}
            style={{ ...S.btn, background: "none", color: "#888", fontSize: 12, padding: "6px 12px" }}>
            {t.langToggle}
          </button>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            {isAdmin ? (
              <button onClick={() => { setIsAdmin(false); setShowForm(false); setShowPending(false); setSelectedTopic(null); }}
                style={{ ...S.btn, background: "#1e1e1e", color: "#f87171", fontSize: 12, padding: "7px 14px" }}>
                ⚙️ Exit Admin
              </button>
            ) : (
              <button onClick={() => setShowAdminLogin(true)}
                style={{ ...S.btn, background: "none", color: "#333", fontSize: 11, padding: "6px 10px", border: "1px solid #1e1e1e" }}>
                ⚙️
              </button>
            )}
          </div>
        </div>
      </header>

      <main style={S.main}>
        {showPropose ? (
          <ProponiArgomento t={t} onSubmit={proponiArgomento} onCancel={() => setShowPropose(false)} />
        ) : showPending ? (
          <PendingTopics t={t} topics={topics} onApprove={approvaTopic} onReject={rifiutaTopic} onBack={() => setShowPending(false)} />
        ) : showForm ? (
          <TopicForm t={t} lang={lang} editTopic={editTopic} onSave={saveTopic} onCancel={() => { setShowForm(false); setEditTopic(null); }} />
        ) : selectedTopic ? (
          <TopicDetail topic={selectedTopic} t={t} lang={lang} isAdmin={isAdmin}
            onBack={() => setSelectedTopic(null)}
            onEdit={(tp) => { setEditTopic(tp); setShowForm(true); }}
            onDelete={async (id) => { await deleteTopic(id); }} />
        ) : (
          <>
            <div style={{ maxWidth: 720, margin: "0 auto 48px" }}>
              {/* Site title */}
              <div style={{ textAlign: "center", marginBottom: 40 }}>
                <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(28px, 6vw, 48px)", fontWeight: 700, color: "#f0ebe3", margin: "0 0 10px", lineHeight: 1.1 }}>
                  The Tennis <span style={{ color: "#c8a96e" }}>Coaching Room</span>
                </h1>
                <p style={{ color: "#555", fontSize: 14, letterSpacing: 2, textTransform: "uppercase", margin: 0 }}>{t.tagline}</p>
              </div>

              {/* Intro box */}
              <div style={{ background: "#111", border: "1px solid #1e1e1e", borderRadius: 16, padding: "20px 20px" }}>
                {/* Opening quote */}
                <div style={{ borderLeft: "3px solid #c8a96e", paddingLeft: 20, marginBottom: 28 }}>
                  <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(14px, 3.5vw, 18px)", color: "#c8a96e", fontStyle: "italic", lineHeight: 1.7, margin: 0 }}>
                    {lang === "it"
                      ? "“La crescita vera non nasce da ciò che sai — nasce dal coraggio di mettere ciò che sai a confronto con chi la pensa diversamente da te.”"
                      : "“True growth does not come from what you know — it comes from the courage to put what you know in confrontation with those who think differently from you.”"}
                  </p>
                </div>

                {/* Main text */}
                <p style={{ color: "#888", fontSize: "clamp(13px, 3vw, 15px)", lineHeight: 1.85, margin: "0 0 16px" }}>
                  {lang === "it"
                    ? "Ogni grande maestro ha una storia. Una filosofia. Un metodo costruito in anni di campo. The Tennis Coaching Room è il luogo dove quelle storie si incontrano."
                    : "Every great coach has a story. A philosophy. A method built over years on the court. The Tennis Coaching Room is the place where those stories meet."}
                </p>
                <p style={{ color: "#888", fontSize: "clamp(13px, 3vw, 15px)", lineHeight: 1.85, margin: "0 0 16px" }}>
                  {lang === "it"
                    ? "Ogni argomento è una domanda aperta — rispondi come se stessi rilasciando un'intervista, o come stessi parlando con un collega al Club. Perché il modo in cui vedi il gioco è plasmato dalla tua esperienza, dalla tua cultura, dal tuo percorso. Il tennis è universale — ma ogni maestro lo legge in modo diverso. Ed è proprio in quelle differenze che si nascondono le lezioni più preziose."
                    : "Each topic is an open question — answer it as if you were being interviewed, or as if you were talking to a colleague at the club. Because the way you see the game is shaped by your experience, your culture, your journey. Tennis is universal — but every coach reads it differently. And it is precisely in those differences that the richest lessons hide."}
                </p>
                <p style={{ color: "#666", fontSize: 14, lineHeight: 1.7, margin: "0 0 28px" }}>
                  {lang === "it"
                    ? "Leggi le opinioni di maestri da tutto il mondo. Confrontati. Lasciati ispirare. Cresci. Il tuo commento può essere anonimo — non esistono risposte giuste o sbagliate, solo l'esperienza che parla."
                    : "Read the opinions of coaches from around the world. Compare. Be inspired. Grow. Your comment can be anonymous — there are no right or wrong answers, only experience speaking."}
                </p>

                {/* Tag line */}
                <div style={{ textAlign: "center", marginBottom: 28 }}>
                  <span style={{ color: "#c8a96e", fontSize: 15, fontWeight: 700, letterSpacing: 1 }}>
                    {lang === "it" ? "Un campo. Tanti maestri. Infinite prospettive." : "One court. Many coaches. Infinite perspectives."}
                  </span>
                </div>

                {/* Shaw quote */}
                <div style={{ borderTop: "1px solid #1e1e1e", paddingTop: 24 }}>
                  <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 16, color: "#555", fontStyle: "italic", lineHeight: 1.7, margin: "0 0 8px" }}>
                    {lang === "it"
                      ? "“Se tu hai una mela e io ho una mela e ce le scambiamo, abbiamo entrambi ancora una mela. Ma se tu hai un'idea e io ho un'idea e ce le scambiamo, abbiamo entrambi due idee.”"
                      : "“If you have an apple and I have an apple and we exchange apples, we both still have one apple. But if you have an idea and I have an idea and we exchange ideas, we each now have two ideas.”"}
                  </p>
                  <p style={{ color: "#444", fontSize: 13, margin: 0, textAlign: "right" }}>— George Bernard Shaw</p>
                </div>
              </div>
            </div>

            <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
              <div style={{ flex: 1, position: "relative" }}>
                <span style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "#444" }}>🔍</span>
                <input value={search} onChange={e => setSearch(e.target.value)} placeholder={t.search}
                  style={{ ...S.input, paddingLeft: 40 }} />
              </div>
              {isAdmin ? (
                <div style={{ display: "flex", gap: 8 }}>
                  {pendingCount > 0 && (
                    <button onClick={() => setShowPending(true)}
                      style={{ ...S.btn, background: "#fef3c7", color: "#78350f", border: "1px solid #fde68a", whiteSpace: "nowrap" }}>
                      ⏳ {pendingCount}
                    </button>
                  )}
                  <button onClick={() => { setShowForm(true); setEditTopic(null); }} style={{ ...S.btn, ...S.btnGold, whiteSpace: "nowrap" }}>
                    {t.newTopic}
                  </button>
                </div>
              ) : (
                <button onClick={() => setShowPropose(true)}
                  style={{ ...S.btn, background: "#151515", color: "#c8a96e", border: "1px solid #c8a96e44", whiteSpace: "nowrap" }}>
                  💡 Propose
                </button>
              )}
            </div>

            <div style={{ display: "flex", gap: 8, flexWrap: "nowrap", overflowX: "auto", marginBottom: 24, paddingBottom: 8, WebkitOverflowScrolling: "touch" }}>
              {CATEGORIE.map(cat => (
                <button key={cat.key} onClick={() => setActiveCat(cat.key)}
                  style={{ ...S.btn, fontSize: 12, padding: "7px 14px",
                    background: activeCat === cat.key ? "#c8a96e" : "#151515",
                    color: activeCat === cat.key ? "#0a0a0a" : "#666",
                    border: activeCat === cat.key ? "none" : "1px solid #1e1e1e",
                  }}>
                  {cat[lang]}
                </button>
              ))}
            </div>

            {loading ? (
              <div style={{ textAlign: "center", padding: "60px 0", color: "#444" }}>{t.loading}</div>
            ) : filtered.length === 0 ? (
              <div style={{ textAlign: "center", padding: "60px 0", color: "#444" }}>
                <div style={{ fontSize: 40, marginBottom: 12 }}>🎾</div>
                <div>{t.noTopics}</div>
              </div>
            ) : (
              filtered.map(tp => (
                <TopicCard key={tp.id} topic={tp} t={t} lang={lang} isAdmin={isAdmin}
                  onClick={() => setSelectedTopic(tp)}
                  onEdit={(tp) => { setEditTopic(tp); setShowForm(true); }}
                  onDelete={deleteTopic} />
              ))
            )}
          </>
        )}
      </main>

      <footer style={{ borderTop: "1px solid #1a1a1a", marginTop: 60, padding: "28px 24px", textAlign: "center" }}>
        <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 18, color: "#c8a96e", marginBottom: 8 }}>✦ The Tennis Coaching Room</div>
        <div style={{ fontSize: 12, color: "#555", marginBottom: 6 }}>The global didactic hub for tennis coaches 🎾</div>
        <div style={{ fontSize: 11, color: "#333", letterSpacing: 1 }}>© {new Date().getFullYear()} The Tennis Coaching Room — All rights reserved</div>
      </footer>
    </div>
  );
}
