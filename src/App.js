import { useState, useEffect } from "react";
import { supabase } from "./supabase";

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
    siteName: "Court of Ideas",
    tagline: "A global community for tennis coaches",
    newTopic: "+ New Topic",
    admin: "Admin",
    coaches: "Coaches",
    backToTopics: "← Back to topics",
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
    sortBy: "Sort by",
    sortRecent: "Most Recent",
    sortLikes: "Most Liked",
    sortStars: "Top Rated",
    rateComment: "Rate",
    likeComment: "Helpful",
    alreadyRated: "Rated",
    filterBy: "Filter by category",
  },
  it: {
    siteName: "Court of Ideas",
    tagline: "Una community globale per maestri di tennis",
    newTopic: "+ Nuovo Argomento",
    admin: "Admin",
    coaches: "Maestri",
    backToTopics: "← Torna agli argomenti",
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
    sortBy: "Ordina per",
    sortRecent: "Più recenti",
    sortLikes: "Più utili",
    sortStars: "Meglio valutati",
    rateComment: "Valuta",
    likeComment: "Utile",
    alreadyRated: "Valutato",
    filterBy: "Filtra per categoria",
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
  header: { borderBottom: "1px solid #1e1e1e", padding: "0 24px", height: 64, display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, background: "rgba(10,10,10,0.95)", backdropFilter: "blur(12px)", zIndex: 100 },
  logo: { fontFamily: "'Cormorant Garamond', serif", fontSize: 22, fontWeight: 700, color: "#c8a96e", letterSpacing: 1 },
  tagline: { fontSize: 11, color: "#555", letterSpacing: 2, textTransform: "uppercase", marginTop: 1 },
  main: { maxWidth: 900, margin: "0 auto", padding: "40px 24px" },
  card: { background: "#111", border: "1px solid #1e1e1e", borderRadius: 16, padding: 28, marginBottom: 20, cursor: "pointer", transition: "all 0.2s" },
  btn: { padding: "10px 22px", borderRadius: 10, border: "none", fontWeight: 700, cursor: "pointer", fontSize: 14, fontFamily: "'DM Sans', sans-serif" },
  btnGold: { background: "linear-gradient(135deg, #c8a96e, #e8c98e)", color: "#0a0a0a" },
  btnDark: { background: "#1e1e1e", color: "#f0ebe3" },
  btnRed: { background: "#3d1a1a", color: "#f87171" },
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
  if (!cat || catKey === "general") return null;
  return (
    <span style={{ ...S.tag, marginRight: 6 }}>{cat[lang]}</span>
  );
}

function TopicForm({ t, lang, onSave, onCancel, editTopic }) {
  const empty = { title: "", content: "", youtube_url: "", image_url: "", external_link: "", external_link_label: "", categoria: "general" };
  const [form, setForm] = useState(editTopic ? { ...editTopic } : empty);
  const [loading, setLoading] = useState(false);
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleSubmit = async () => {
    if (!form.title || !form.content) return alert(t.titleRequired);
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
          <label style={S.label}>{t.categoria}</label>
          <select value={form.categoria} onChange={e => set("categoria", e.target.value)}
            style={{ ...S.input, cursor: "pointer" }}>
            {CATEGORIE.filter(c => c.key !== "all").map(c => (
              <option key={c.key} value={c.key}>{c[lang]}</option>
            ))}
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
      <h3 onClick={onClick} style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 24, fontWeight: 700, color: "#f0ebe3", margin: "0 0 12px", cursor: "pointer", lineHeight: 1.3 }}>
        {topic.title}
      </h3>
      <p style={{ color: "#666", fontSize: 14, lineHeight: 1.7, margin: "0 0 20px" }}>
        {topic.content.length > 180 ? topic.content.slice(0, 180) + "..." : topic.content}
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
        {isAdmin && (
          <div style={{ display: "flex", gap: 8 }}>
            <button onClick={e => { e.stopPropagation(); onEdit(topic); }} style={{ ...S.btn, ...S.btnDark, fontSize: 12, padding: "8px 14px" }}>✏️</button>
            <button onClick={e => { e.stopPropagation(); if (window.confirm(t.confirmDelete)) onDelete(topic.id); }} style={{ ...S.btn, ...S.btnRed, fontSize: 12, padding: "8px 14px" }}>🗑️</button>
          </div>
        )}
      </div>
    </div>
  );
}

function CommentCard({ c, t, isAdmin, onDelete, onLike, onRate, ratedIds, likedIds }) {
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
          {isAdmin && (
            <button onClick={() => onDelete(c.id)} style={{ ...S.btn, ...S.btnRed, padding: "4px 10px", fontSize: 11 }}>✕</button>
          )}
        </div>
      </div>
      <p style={{ color: "#aaa", fontSize: 14, lineHeight: 1.7, margin: "0 0 16px", whiteSpace: "pre-wrap" }}>{c.testo}</p>
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
              {c.rate_count > 0 && <span style={{ fontSize: 12, color: "#c8a96e", fontWeight: 700 }}>{parseFloat(c.stelle).toFixed(1)} ({c.rate_count})</span>}
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

function TopicDetail({ topic, t, lang, onBack, isAdmin, onEdit, onDelete }) {
  const [comments, setComments] = useState([]);
  const [nome, setNome] = useState("");
  const [paese, setPaese] = useState("");
  const [testo, setTesto] = useState("");
  const [loading, setLoading] = useState(false);
  const [sortBy, setSortBy] = useState("recent");
  const [ratedIds, setRatedIds] = useState(() => JSON.parse(localStorage.getItem("rated_ids") || "[]"));
  const [likedIds, setLikedIds] = useState(() => JSON.parse(localStorage.getItem("liked_ids") || "[]"));
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
    if (!nome.trim()) return alert(t.nameRequired);
    if (!testo.trim()) return alert(t.commentRequired);
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
    localStorage.setItem("liked_ids", JSON.stringify(newLiked));
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
    localStorage.setItem("rated_ids", JSON.stringify(newRated));
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
        <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 36, fontWeight: 700, color: "#f0ebe3", margin: "0 0 20px", lineHeight: 1.2 }}>{topic.title}</h1>
        <p style={{ color: "#888", fontSize: 15, lineHeight: 1.8, margin: "0 0 24px", whiteSpace: "pre-wrap" }}>{topic.content}</p>
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

      {/* Comment form */}
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

      {/* Sort + Comments */}
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
          <CommentCard key={c.id} c={c} t={t} isAdmin={isAdmin}
            onDelete={eliminaCommento} onLike={handleLike} onRate={handleRate}
            ratedIds={ratedIds} likedIds={likedIds} />
        ))
      )}
    </div>
  );
}

export default function App() {
  const [lang, setLang] = useState("en");
  const t = T[lang];
  const [view, setView] = useState("coaches");
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [showForm, setShowForm] = useState(false);
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

  const saveTopic = async (form) => {
    if (editTopic) {
      await supabase.from("topics").update({ ...form }).eq("id", editTopic.id);
    } else {
      await supabase.from("topics").insert([{ ...form }]);
    }
    await caricaTopics();
    setShowForm(false);
    setEditTopic(null);
    setSelectedTopic(null);
  };

  const deleteTopic = async (id) => {
    await supabase.from("topics").delete().eq("id", id);
    await caricaTopics();
    setSelectedTopic(null);
  };

  const filtered = topics.filter(tp => {
    const matchCat = activeCat === "all" || tp.categoria === activeCat;
    const matchSearch = search === "" ||
      tp.title.toLowerCase().includes(search.toLowerCase()) ||
      tp.content.toLowerCase().includes(search.toLowerCase()) ||
      getCatLabel(tp.categoria, lang).toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const isAdmin = view === "admin";

  return (
    <div style={S.page}>
      <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700&family=DM+Sans:wght@400;500;700&display=swap" rel="stylesheet" />

      <header style={S.header}>
        <div>
          <div style={S.logo}>✦ {t.siteName}</div>
          <div style={S.tagline}>{t.tagline}</div>
        </div>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <button onClick={() => setLang(l => l === "en" ? "it" : "en")}
            style={{ ...S.btn, background: "none", color: "#888", fontSize: 12, padding: "6px 12px" }}>
            {t.langToggle}
          </button>
          <div style={{ display: "flex", background: "#151515", borderRadius: 10, padding: 3, gap: 3 }}>
            <button onClick={() => { setView("coaches"); setShowForm(false); setSelectedTopic(null); }}
              style={{ ...S.btn, fontSize: 12, padding: "7px 14px", background: !isAdmin ? "#c8a96e" : "transparent", color: !isAdmin ? "#0a0a0a" : "#666" }}>
              👤 {t.coaches}
            </button>
            <button onClick={() => { setView("admin"); setShowForm(false); setSelectedTopic(null); }}
              style={{ ...S.btn, fontSize: 12, padding: "7px 14px", background: isAdmin ? "#c8a96e" : "transparent", color: isAdmin ? "#0a0a0a" : "#666" }}>
              ⚙️ {t.admin}
            </button>
          </div>
        </div>
      </header>

      <main style={S.main}>
        {showForm ? (
          <TopicForm t={t} lang={lang} editTopic={editTopic} onSave={saveTopic} onCancel={() => { setShowForm(false); setEditTopic(null); }} />
        ) : selectedTopic ? (
          <TopicDetail topic={selectedTopic} t={t} lang={lang} isAdmin={isAdmin}
            onBack={() => setSelectedTopic(null)}
            onEdit={(tp) => { setEditTopic(tp); setShowForm(true); }}
            onDelete={async (id) => { await deleteTopic(id); }} />
        ) : (
          <>
            {/* Hero */}
            <div style={{ textAlign: "center", marginBottom: 40 }}>
              <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 52, fontWeight: 700, color: "#f0ebe3", margin: "0 0 12px", lineHeight: 1.1 }}>
                Court of <span style={{ color: "#c8a96e" }}>Ideas</span>
              </h1>
              <p style={{ color: "#555", fontSize: 16, margin: 0 }}>{t.tagline}</p>
            </div>

            {/* Search */}
            <div style={{ display: "flex", gap: 12, marginBottom: 20 }}>
              <div style={{ flex: 1, position: "relative" }}>
                <span style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "#444" }}>🔍</span>
                <input value={search} onChange={e => setSearch(e.target.value)} placeholder={t.search}
                  style={{ ...S.input, paddingLeft: 40 }} />
              </div>
              {isAdmin && (
                <button onClick={() => { setShowForm(true); setEditTopic(null); }} style={{ ...S.btn, ...S.btnGold, whiteSpace: "nowrap" }}>
                  {t.newTopic}
                </button>
              )}
            </div>

            {/* Category filters */}
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 32 }}>
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

            {/* Topics */}
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
    </div>
  );
}
