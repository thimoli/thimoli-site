const villages = [
  { name: "Village des Premiers Pas", ta: "முதல் படி கிராமம்", theme: "Les bases du tamoul" },
  { name: "Village de la Mer", ta: "கடல் கிராமம்", theme: "Les mots du quotidien" },
  { name: "Village du Temple", ta: "கோவில் கிராமம்", theme: "La famille et les proches" },
  { name: "Village des Rizières", ta: "நெல் வயல் கிராமம்", theme: "La nourriture et la nature" },
  { name: "Village du Marché", ta: "சந்தை கிராமம்", theme: "Les achats et les prix" },
  { name: "Village du Savoir", ta: "அறிவு கிராமம்", theme: "L’école et le travail" },
  { name: "Village des Fêtes", ta: "திருவிழா கிராமம்", theme: "La culture et les traditions" },
  { name: "Village des Collines", ta: "மலை கிராமம்", theme: "Les voyages et les lieux" },
  { name: "Village de la Ville", ta: "நகர கிராமம்", theme: "La vie en ville" },
  { name: "Village des Horizons", ta: "எல்லை கிராமம்", theme: "Les projets et le futur" },
  { name: "Village de la Sagesse", ta: "ஞான கிராமம்", theme: "Les idées et les émotions" },
  { name: "Village du Maître", ta: "ஆசான் கிராமம்", theme: "La maîtrise du tamoul" }
]

const lessonQuestions = [
  {
    id: "long-aa", letter: "ஆ", prompt: "Quel son correspond à cette lettre ?", answers: ["aa", "i", "ou"], correct: 0,
    hint: "C’est un « a » que l’on laisse durer un peu plus longtemps.",
    explanation: "ஆ correspond au son long « aa ». La durée du son peut changer le sens d’un mot.", example: "ஆடு (ādu) · chèvre"
  },
  {
    id: "long-ii", letter: "ஈ", prompt: "Choisis la bonne prononciation.", answers: ["é", "ii", "an"], correct: 1,
    hint: "Étire le son « i », comme dans « ici », mais plus long.",
    explanation: "ஈ se prononce « ii » : c’est la version longue du son இ (i).", example: "ஈ (ī) · mouche"
  },
  {
    id: "long-uu", letter: "ஊ", prompt: "Quelle voyelle entends-tu ?", answers: ["uu", "aï", "o"], correct: 0,
    hint: "Le son ressemble à « ou », mais il est tenu plus longtemps.",
    explanation: "ஊ correspond au son long « uu ». Il s’oppose au son court உ (u).", example: "ஊர் (ūr) · village"
  },
  {
    id: "short-a", letter: "அ", prompt: "Cette lettre produit quel son court ?", answers: ["a", "ee", "oo"], correct: 0,
    hint: "C’est le premier son de « amma ».", explanation: "அ se prononce « a », brièvement et sans l’étirer.", example: "அம்மா (ammā) · maman"
  }
]

const levelOneStages = [
  { title: "Reconnaître les voyelles", lesson: "Découvrir et prononcer les voyelles tamoules", exercises: ["Toucher la lettre entendue", "Relier deux lettres identiques", "Retrouver la lettre cachée"], reward: "L’entrée du village" },
  { title: "Lettres et sons", lesson: "Associer chaque lettre à son son", exercises: ["Écouter puis choisir", "Classer les sons initiaux", "Compléter le mot"], reward: "L’entrée du village" },
  { title: "Image et mot", lesson: "Apprendre les objets familiers", exercises: ["Relier l’image au mot", "Choisir le bon mot", "Placer l’étiquette"], reward: "La maison des mots" },
  { title: "Lettres manquantes", lesson: "Observer la construction d’un mot", exercises: ["Insérer une lettre", "Insérer deux lettres", "Reconstruire avec des tuiles"], reward: "La maison des mots" },
  { title: "Former des mots", lesson: "Combiner consonnes et voyelles", exercises: ["Fusionner deux tuiles", "Choisir la combinaison", "Remettre les syllabes en ordre"], reward: "Le jardin et la bibliothèque" },
  { title: "Trouver et classer", lesson: "Reconnaître les mots et les catégories", exercises: ["Trouver les mots cachés", "Classer les images", "Classer les mots"], reward: "Le jardin et la bibliothèque" },
  { title: "Morceaux de phrase", lesson: "Comprendre une phrase très courte", exercises: ["Relier sujet et action", "Relier image et phrase", "Choisir la fin de phrase"], reward: "Les habitants" },
  { title: "Singulier et pluriel", lesson: "Observer les deux formes d’un nom", exercises: ["Associer les deux formes", "Choisir la forme adaptée", "Transformer le mot"], reward: "Les habitants" },
  { title: "Écouter et comprendre", lesson: "Reconnaître des mots et phrases à l’oral", exercises: ["Toucher l’image entendue", "Choisir entre trois mots", "Répondre vrai ou faux"], reward: "L’école du village" },
  { title: "Décrire une scène", lesson: "Produire de petites phrases", exercises: ["Repérer les mots présents", "Compléter deux phrases", "Décrire l’image"], reward: "L’école du village" }
]

const villagePathNodes = levelOneStages.flatMap((stage, stageIndex) => [
  { type: "lesson", stage: stageIndex, title: stage.lesson },
  ...stage.exercises.map((title, exerciseIndex) => ({ type: "exercise", stage: stageIndex, exercise: exerciseIndex, title }))
]).concat({ type: "evaluation", stage: 10, title: "Évaluation finale · 12 questions" })
const PATH_NODE_COUNT = villagePathNodes.length

const reviewItems = [
  { icon: "அ", name: "Alphabet", detail: "12 cartes à revoir", mastery: 72, priority: "Priorité du jour" },
  { icon: "◖", name: "Prononciation", detail: "8 sons à écouter", mastery: 64, priority: "À renforcer" },
  { icon: "✎", name: "Écriture", detail: "5 lettres à tracer", mastery: 81, priority: "Bon niveau" },
  { icon: "Aa", name: "Vocabulaire", detail: "18 mots maîtrisés", mastery: 68, priority: "En progression" }
]

const navItems = [
  { page: "home", icon: "⌂", label: "Accueil" },
  { page: "levels", icon: "◇", label: "Villages" },
  { page: "review", icon: "↻", label: "Révisions" },
  { page: "stats", icon: "▥", label: "Stats" },
  { page: "profile", icon: "●", label: "Profil" }
]

const pageTitles = { home: "Accueil", levels: "Villages", path: "Sentier du village", review: "Révisions", stats: "Stats", profile: "Profil", settings: "Paramètres", lesson: "Leçon" }

const validPages = ["home", "levels", "path", "review", "stats", "profile", "settings", "lesson"]
const validLessonModes = ["parcours", ...reviewItems.map((item) => item.name)]
const STORAGE_KEY = "thimoli-v1.1-premium-state"
const defaultProgress = [10, 10, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0]
const mascotSources = Object.fromEntries(["welcome", "hint", "success", "correction", "celebrate"].map((name) => [name, `assets/mascot/mascot-${name}.webp`]))

function loadSavedState() {
  try {
    const value = JSON.parse(localStorage.getItem(STORAGE_KEY))
    return value && typeof value === "object" ? value : {}
  } catch (error) { return {} }
}
function clamp(value, min, max) { return Math.max(min, Math.min(max, value)) }
function safeArray(value) { return Array.isArray(value) ? value : [] }

const saved = loadSavedState()
const requestedPage = new URLSearchParams(location.search).get("page")
const initialPage = validPages.includes(requestedPage) ? requestedPage : validPages.includes(saved.page) ? saved.page : "home"
const savedProgress = villages.map((village, index) => {
  const value = safeArray(saved.lessonProgress)[index]
  return Number.isFinite(value) ? clamp(Math.round(value), 0, 10) : defaultProgress[index]
})
const savedPathProgress = villages.map((village, index) => {
  const value = safeArray(saved.pathProgress)[index]
  if (Number.isFinite(value)) return clamp(Math.round(value), 0, PATH_NODE_COUNT)
  return savedProgress[index] >= 10 ? PATH_NODE_COUNT : Math.min(PATH_NODE_COUNT - 1, savedProgress[index] * 4)
})
const prefersReducedMotion = Boolean(window.matchMedia?.("(prefers-reduced-motion: reduce)").matches)
const state = {
  page: initialPage,
  currentVillage: Number.isInteger(saved.currentVillage) ? clamp(saved.currentVillage, 0, 11) : 2,
  lesson: Number.isInteger(saved.lesson) ? clamp(saved.lesson, 0, lessonQuestions.length) : 0,
  lessonMode: validLessonModes.includes(saved.lessonMode) ? saved.lessonMode : "parcours",
  lessonProgress: savedProgress,
  pathProgress: savedPathProgress,
  activePathNode: Number.isInteger(saved.activePathNode) ? clamp(saved.activePathNode, 0, PATH_NODE_COUNT - 1) : null,
  completedSessions: Number.isInteger(saved.completedSessions) && saved.completedSessions >= 0 ? saved.completedSessions : 0,
  streak: Number.isInteger(saved.streak) && saved.streak >= 0 ? saved.streak : 7,
  lives: Number.isInteger(saved.lives) ? clamp(saved.lives, 0, 5) : 4,
  selected: null, feedback: null, showHint: false, questionAttempts: 0, heartLostThisQuestion: false, modal: null,
  answerHistory: safeArray(saved.answerHistory).filter((entry) => entry && Number.isFinite(entry.timestamp)).slice(-300),
  sessions: safeArray(saved.sessions).filter((entry) => entry && Number.isFinite(entry.timestamp)).slice(-100),
  lessonRun: saved.lessonRun && typeof saved.lessonRun === "object" ? saved.lessonRun : null,
  settings: {
    soundEffects: typeof saved.settings?.soundEffects === "boolean" ? saved.settings.soundEffects : true,
    autoPronunciation: typeof saved.settings?.autoPronunciation === "boolean" ? saved.settings.autoPronunciation : true,
    reminders: typeof saved.settings?.reminders === "boolean" ? saved.settings.reminders : true,
    reducedMotion: typeof saved.settings?.reducedMotion === "boolean" ? saved.settings.reducedMotion : prefersReducedMotion,
    dailyGoal: [5, 10, 15, 20].includes(saved.settings?.dailyGoal) ? saved.settings.dailyGoal : 10
  }
}

function isVillageUnlocked(index) { return index <= 2 || state.lessonProgress[index - 1] >= 10 }
if (!isVillageUnlocked(state.currentVillage)) state.currentVillage = 2

function saveState() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      page: state.page, currentVillage: state.currentVillage, lesson: state.lesson, lessonMode: state.lessonMode,
      lessonProgress: state.lessonProgress, pathProgress: state.pathProgress, activePathNode: state.activePathNode,
      completedSessions: state.completedSessions, streak: state.streak, lives: state.lives,
      answerHistory: state.answerHistory, sessions: state.sessions, lessonRun: state.lessonRun, settings: state.settings
    }))
  } catch (error) { /* Le prototype reste utilisable sans stockage privé. */ }
}

function applyMotionPreference() {
  document.documentElement.dataset.reducedMotion = String(state.settings.reducedMotion)
  document.documentElement.classList.toggle("reduce-motion", state.settings.reducedMotion)
}

const app = document.querySelector("#app")
const statusBar = () => `<div class="status" aria-hidden="true"><span>9:41</span><span>▮▮ &nbsp; ◉ &nbsp; 100%</span></div>`
function mascot(kind = "welcome", extraClass = "", alt = "Mascotte Thimoli") {
  return `<img class="mascot-image mascot-${kind} ${extraClass}" src="${mascotSources[kind] || mascotSources.welcome}" alt="${alt}" loading="eager">`
}
function villageImage(index, extraClass = "", alt = "") {
  const number = String(index + 1).padStart(2, "0")
  return `<img class="village-png ${extraClass}" src="assets/villages/village-${number}.png" alt="${alt}" ${extraClass.includes("hero") ? 'loading="eager"' : 'loading="lazy"'}>`
}
function coach(kind, message, options = {}) {
  const label = options.label || "Conseil de Thimoli"
  return `<section class="coach coach-${kind}${options.compact ? " coach-compact" : ""}" aria-label="${label}"><div class="coach-character">${mascot(kind, "", "Thimoli, ton guide")}</div><div class="coach-bubble" role="status" aria-live="polite"><span class="coach-kicker">${label}</span><p>${message}</p>${options.action || ""}</div></section>`
}
function logoBar() {
  return `<header class="brandbar"><div><div class="logo" aria-label="Thimoli">Thimoli<span class="leaf" aria-hidden="true">◆</span></div><div class="tagline">Apprendre le tamoul, un jour à la fois</div></div><button class="avatar avatar-mascot" type="button" data-go="profile" aria-label="Ouvrir mon profil">${mascot("welcome", "avatar-image", "")}</button></header>`
}
function bottomNav() {
  return `<nav class="bottom-nav" aria-label="Navigation principale">${navItems.map((item) => {
    const active = state.page === item.page || (state.page === "path" && item.page === "levels")
    return `<button class="nav-btn ${active ? "active" : ""}" type="button" data-go="${item.page}" ${active ? 'aria-current="page"' : ""}><b aria-hidden="true">${item.icon}</b><span>${item.label}</span></button>`
  }).join("")}</nav>`
}
function heartsMarkup() {
  return Array.from({ length: 5 }, (_, index) => `<span class="heart ${index < state.lives ? "heart-full" : "heart-empty"}" aria-hidden="true">${index < state.lives ? "♥" : "♡"}</span>`).join("")
}
function progressBar(value, label, extraClass = "") {
  const percent = clamp(Math.round(value), 0, 100)
  return `<div class="bar ${extraClass}" role="progressbar" aria-label="${label}" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${percent}"><span style="width:${percent}%"></span></div>`
}
function pageHeader(title, subtitle, action = "") {
  return `<header class="page-head"><div><h1>${title}</h1><p>${subtitle}</p></div>${action || `<button class="avatar avatar-mascot" type="button" data-go="profile" aria-label="Ouvrir mon profil">${mascot("welcome", "avatar-image", "")}</button>`}</header>`
}

function home() {
  const index = state.currentVillage
  const village = villages[index]
  const completed = state.lessonProgress[index]
  const pathDone = state.pathProgress[index]
  const percent = Math.round((pathDone / PATH_NODE_COUNT) * 100)
  const next = villages[index + 1]
  const nextUnlocked = next ? isVillageUnlocked(index + 1) : false
  const coachMessage = completed >= 10 ? `Bravo Abinash ! <strong>${village.name}</strong> est terminé. On consolide tes acquis ?` : `வணக்கம் Abinash ! On continue le <strong>${village.name}</strong> ?`
  const nextCard = next ? `<button class="next-card" type="button" ${nextUnlocked ? `data-village="${index + 1}"` : `data-locked="${index + 1}"`}><div class="next-thumb" aria-hidden="true">${villageImage(index + 1)}</div><div class="next-copy"><small>${nextUnlocked ? "Village disponible" : "Prochain village"}</small><p><strong>${next.name}</strong></p><small>${nextUnlocked ? "Prêt à être exploré" : `Encore ${Math.max(0, 10 - completed)} leçons pour le débloquer`}</small></div><b aria-hidden="true">›</b></button>` : ""
  return `<div class="app-view page-home">${statusBar()}${logoBar()}${coach("welcome", coachMessage, { compact: true, label: "Ton parcours aujourd’hui" })}
    <section class="stats home-stats" aria-label="Série et cœurs"><article class="stat"><span class="stat-icon" aria-hidden="true">🔥</span><div><small>Série</small><strong>${state.streak} jours</strong></div></article><button class="stat stat-button" type="button" data-modal="hearts" aria-label="${state.lives} cœurs sur 5. Comprendre les cœurs."><div><div class="hearts">${heartsMarkup()}</div><strong>${state.lives}/5 <small>Pourquoi ?</small></strong></div><span class="info-mark" aria-hidden="true">i</span></button></section>
    <button class="hero-village hero-village-button" type="button" data-go="levels" aria-label="Voir les autres villages depuis ${village.name}">${villageImage(index, "hero-village-png", village.name)}<span class="hero-tap-hint">Changer de village <b aria-hidden="true">›</b></span></button>
    <section class="home-village-info"><div><span class="eyebrow">NIVEAU ${index + 1} SUR 12</span><h1>${village.name}</h1><div class="tamil" lang="ta">${village.ta}</div></div><p>${village.theme}</p></section>
    <section class="home-progress-strip"><div class="progress-strip-head"><span>Progression du village</span><strong>${pathDone}/${PATH_NODE_COUNT}</strong></div>${progressBar(percent, `${percent} % du parcours du village terminé`)}<div class="progress-meta"><span>${percent}% terminé</span><span>${PATH_NODE_COUNT - pathDone} étapes restantes</span></div></section>
    <button class="primary primary-main" type="button" data-open-path><span>${completed >= 10 ? "Réviser ce village" : "Continuer mon parcours"}</span><span aria-hidden="true">→</span></button><div class="lesson-meta" aria-label="Contenu du village"><span>10 leçons</span><span>30 exercices</span><span>1 évaluation</span></div>${nextCard}${bottomNav()}</div>`
}

function villageState(index) {
  if (!isVillageUnlocked(index)) return "VERROUILLÉ"
  if (state.lessonProgress[index] >= 10) return "TERMINÉ"
  if (state.lessonProgress[index] > 0) return "EN COURS"
  return "DÉBLOQUÉ"
}
function levels() {
  const nextLocked = villages.findIndex((village, index) => !isVillageUnlocked(index))
  const guideText = nextLocked > 0 ? `Encore <strong>${Math.max(0, 10 - state.lessonProgress[nextLocked - 1])} leçons</strong> et ${villages[nextLocked].name.replace("Village ", "")} s’ouvrira à toi.` : "Explore chaque monde et découvre un nouveau thème du tamoul."
  return `<div class="app-view page-levels">${statusBar()}${pageHeader("Les 12 villages", "Un parcours vivant, du premier mot à la maîtrise.")}${coach("hint", guideText, { compact: true, label: "Ton prochain objectif" })}<div class="village-grid village-path">${villages.map((village, index) => {
    const locked = !isVillageUnlocked(index)
    const progress = Math.round((state.pathProgress[index] / PATH_NODE_COUNT) * 100)
    const stateLabel = villageState(index)
    return `<button class="village-card ${locked ? "locked" : "unlocked"} ${index === state.currentVillage ? "current" : ""} ${progress >= 100 ? "completed" : ""}" type="button" ${locked ? `data-locked="${index}"` : `data-village="${index}"`} aria-label="Niveau ${index + 1}, ${village.name}, ${stateLabel.toLowerCase()}"><span class="path-number" aria-hidden="true">${String(index + 1).padStart(2, "0")}</span>${locked ? '<span class="card-lock" aria-hidden="true">⌑</span>' : progress >= 100 ? '<span class="card-complete" aria-hidden="true">✓</span>' : ""}<div class="village-art" aria-hidden="true">${villageImage(index)}</div><span class="level-badge">Niveau ${index + 1}</span><h3>${village.name}</h3><p class="village-tamil" lang="ta">${village.ta}</p><p class="village-theme">${village.theme}</p>${progress > 0 && progress < 100 ? progressBar(progress, `${progress} % terminé`, "village-progress") : ""}<p class="village-state">${stateLabel}</p></button>`
  }).join("")}</div><p class="village-quote">“Chaque village te rapproche d’une nouvelle version de toi.”</p>${bottomNav()}</div>`
}

function pathNodeState(index) {
  const progress = state.pathProgress[state.currentVillage]
  if (index < progress) return "complete"
  if (index === progress) return "current"
  return "locked"
}

function pathPage() {
  const village = villages[state.currentVillage]
  const progress = state.pathProgress[state.currentVillage]
  const percent = Math.round((progress / PATH_NODE_COUNT) * 100)
  const accents = ["coral", "blue", "green", "gold", "violet"]
  const checkpointIcons = ["🏡", "📖", "🌿", "🤝", "🏫"]
  const stageMarkup = levelOneStages.map((stage, stageIndex) => {
    const start = stageIndex * 4
    const nodes = villagePathNodes.slice(start, start + 4)
    const accent = accents[Math.floor(stageIndex / 2)]
    const checkpoint = (stageIndex + 1) % 2 === 0 ? `<article class="trail-checkpoint ${progress >= start + 4 ? "complete" : ""}"><span aria-hidden="true">${checkpointIcons[Math.floor(stageIndex / 2)]}</span><div><small>LE VILLAGE ÉVOLUE</small><strong>${stage.reward}</strong></div>${progress >= start + 4 ? '<b aria-hidden="true">✓</b>' : '<b aria-hidden="true">◇</b>'}</article>` : ""
    return `<section class="trail-stage trail-${accent}" aria-labelledby="stage-${stageIndex + 1}"><header><span>ÉTAPE ${String(stageIndex + 1).padStart(2, "0")}</span><h2 id="stage-${stageIndex + 1}">${stage.title}</h2></header><div class="trail-nodes">${nodes.map((node, localIndex) => {
      const nodeIndex = start + localIndex
      const status = pathNodeState(nodeIndex)
      const typeLabel = node.type === "lesson" ? "Mini-leçon" : `Exercice ${String.fromCharCode(64 + localIndex)}`
      const icon = node.type === "lesson" ? "▤" : String.fromCharCode(64 + localIndex)
      return `<button class="trail-node trail-node-${node.type} ${status} shift-${nodeIndex % 3}" type="button" data-path-node="${nodeIndex}" ${status === "locked" ? "disabled" : ""} aria-label="${typeLabel}, ${node.title}, ${status === "complete" ? "terminé" : status === "current" ? "à faire" : "verrouillé"}"><span class="trail-node-icon" aria-hidden="true">${status === "complete" ? "✓" : status === "locked" ? "⌑" : icon}</span><span class="trail-node-copy"><small>${typeLabel}</small><strong>${node.title}</strong></span>${status === "current" ? '<span class="trail-play" aria-hidden="true">→</span>' : ""}</button>${localIndex < nodes.length - 1 ? '<span class="trail-line" aria-hidden="true"></span>' : ""}`
    }).join("")}</div>${checkpoint}</section>`
  }).join("")
  const evaluationIndex = PATH_NODE_COUNT - 1
  const evaluationState = pathNodeState(evaluationIndex)
  return `<div class="app-view page-path">${statusBar()}<header class="path-top"><button class="icon-button" type="button" data-go="home" aria-label="Retour à l’accueil">←</button><div><span class="eyebrow">NIVEAU ${state.currentVillage + 1}</span><h1>Sentier du village</h1></div><button class="avatar avatar-mascot" type="button" data-go="profile" aria-label="Ouvrir mon profil">${mascot("welcome", "avatar-image", "")}</button></header>
    <section class="path-village-hero"><div class="path-village-art">${villageImage(state.currentVillage, "", village.name)}</div><div><span class="eyebrow">${village.name.toUpperCase()}</span><h2>${village.ta}</h2><p>10 mini-leçons · 30 exercices · 1 évaluation</p><div class="path-progress-label"><span>${progress}/${PATH_NODE_COUNT} étapes</span><strong>${percent}%</strong></div>${progressBar(percent, `${percent} % du sentier terminé`)}</div></section>
    ${coach("hint", progress >= PATH_NODE_COUNT ? "Tout le village est restauré. Tu peux rejouer chaque étape pour consolider tes acquis." : "Avance étape par étape : une leçon débloque ses exercices, puis le village se transforme.", { compact: true, label: "Ton sentier d’apprentissage" })}
    <main class="village-trail">${stageMarkup}<section class="final-gate ${evaluationState}" aria-label="Évaluation finale"><span class="final-gate-icon" aria-hidden="true">♛</span><div><span class="eyebrow">PORTAIL FINAL</span><h2>La clé du prochain village</h2><p>12 questions nouvelles · 8 bonnes réponses pour réussir</p></div><button class="primary" type="button" data-path-node="${evaluationIndex}" ${evaluationState === "locked" ? "disabled" : ""}>${evaluationState === "complete" ? "Rejouer l’évaluation" : "Commencer l’évaluation"}</button></section></main>${bottomNav()}</div>`
}

function review() {
  return `<div class="app-view page-review">${statusBar()}${pageHeader("Révisions", "Quelques minutes pour ancrer durablement tes acquis.")}${coach("hint", "Tes <strong>sons longs</strong> méritent 3 minutes de pratique aujourd’hui.", { compact: true, label: "Recommandation personnalisée" })}
    <section class="daily-review"><div><span class="eyebrow">RÉVISION DU JOUR</span><h2>7 éléments · environ 5 min</h2><p>Un mélange adapté de lettres, sons et vocabulaire.</p></div><div class="daily-review-score" aria-label="Objectif de maîtrise 80 %"><strong>80%</strong><small>objectif</small></div><button class="primary" type="button" data-start-lesson="Alphabet"><span>Commencer ma révision</span><span aria-hidden="true">→</span></button></section>
    <div class="section-heading"><div><span class="eyebrow">PAR COMPÉTENCE</span><h2>Choisis ce que tu veux renforcer</h2></div></div><div class="review-list">${reviewItems.map((item) => `<button class="review-card" type="button" data-review="${item.name}"><div class="icon" aria-hidden="true">${item.icon}</div><div class="review-copy"><h3>${item.name}</h3><p>${item.detail}</p><small>${item.priority}</small></div><div class="mastery-ring" style="--mastery:${item.mastery}" aria-label="Maîtrise ${item.mastery} %"><strong>${item.mastery}</strong><span>%</span></div><b aria-hidden="true">›</b></button>`).join("")}</div>${bottomNav()}</div>`
}

function dateKey(timestamp) {
  const date = new Date(timestamp)
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`
}
function getStats() {
  const today = new Date()
  today.setHours(12, 0, 0, 0)
  const days = Array.from({ length: 7 }, (_, index) => {
    const date = new Date(today)
    date.setDate(today.getDate() - (6 - index))
    return { key: dateKey(date.getTime()), label: new Intl.DateTimeFormat("fr-FR", { weekday: "short" }).format(date).replace(".", ""), minutes: 0 }
  })
  const hasRealHistory = state.answerHistory.length > 0 || state.sessions.length > 0
  state.sessions.forEach((session) => {
    const day = days.find((item) => item.key === dateKey(session.timestamp))
    if (day) day.minutes += Number.isFinite(session.duration) ? session.duration : 0
  })
  if (!state.sessions.length && state.answerHistory.length) {
    const activeKeys = new Set(state.answerHistory.map((entry) => dateKey(entry.timestamp)))
    days.forEach((day) => { if (activeKeys.has(day.key)) day.minutes = 4 })
  }
  if (!hasRealHistory) [8, 12, 0, 15, 6, 10, 0].forEach((minutes, index) => { days[index].minutes = minutes })
  const correct = state.answerHistory.filter((entry) => entry.correct).length
  const accuracy = state.answerHistory.length ? Math.round((correct / state.answerHistory.length) * 100) : 84
  const weeklyMinutes = days.reduce((sum, day) => sum + day.minutes, 0)
  const activeDays = days.filter((day) => day.minutes > 0).length
  const completedLessons = state.lessonProgress.reduce((sum, value) => sum + value, 0)
  const xp = state.sessions.reduce((sum, session) => sum + (session.xp || 0), 0) || 146
  return { days, hasRealHistory, accuracy, weeklyMinutes, activeDays, completedLessons, xp }
}
function stats() {
  const data = getStats()
  const maxMinutes = Math.max(20, ...data.days.map((day) => day.minutes))
  const sessionsNeeded = Math.max(1, 4 - data.activeDays)
  const motivate = data.activeDays >= 4 ? `Tu as étudié <strong>${data.activeDays} jours</strong> cette semaine. Belle régularité !` : `Encore <strong>${sessionsNeeded} session${sessionsNeeded > 1 ? "s" : ""}</strong> pour atteindre ton objectif de semaine.`
  const skills = [["Lecture", 78], ["Écoute", 64], ["Écriture", 71], ["Vocabulaire", 68]]
  return `<div class="app-view page-stats">${statusBar()}${pageHeader("Tes progrès", "Des repères motivants, jamais des notes.")}${coach("success", motivate, { compact: true, label: "Bilan de la semaine" })}${!data.hasRealHistory ? '<p class="demo-notice">Aperçu démo · ces données seront remplacées par ton activité réelle.</p>' : ""}
    <section class="activity-card"><div class="section-heading"><div><span class="eyebrow">ACTIVITÉ · 7 JOURS</span><h2>${data.weeklyMinutes} minutes cette semaine</h2></div><span class="trend-pill">${data.activeDays}/7 jours</span></div><div class="activity-chart" role="img" aria-label="Activité des sept derniers jours">${data.days.map((day) => `<div class="chart-day"><div class="chart-track"><span style="height:${Math.round((day.minutes / maxMinutes) * 100)}%"></span></div><strong>${day.minutes || "–"}</strong><small>${day.label}</small></div>`).join("")}</div></section>
    <div class="stat-grid"><article class="metric-card"><span>Série actuelle</span><strong>🔥 ${state.streak}</strong><small>meilleur : ${Math.max(9, state.streak)} jours</small></article><article class="metric-card"><span>Précision</span><strong>${data.accuracy}%</strong><small>sur toutes les réponses</small></article><article class="metric-card"><span>XP gagnés</span><strong>${data.xp}</strong><small>depuis le début</small></article><article class="metric-card"><span>Leçons</span><strong>${data.completedLessons}/120</strong><small>${Math.round((data.completedLessons / 120) * 100)} % du parcours</small></article></div>
    <section class="skills-card"><div class="section-heading"><div><span class="eyebrow">COMPÉTENCES</span><h2>Ta maîtrise du tamoul</h2></div></div>${skills.map(([name, value]) => `<div class="skill-row"><div><strong>${name}</strong><span>${value}%</span></div>${progressBar(value, `${name} ${value} %`, "skill-progress")}</div>`).join("")}</section>
    <section class="focus-card"><div><span class="eyebrow">À RENFORCER</span><h2>Les sons longs</h2><p>Une révision ciblée de 3 minutes suffit pour progresser.</p></div><button class="secondary" type="button" data-start-lesson="Prononciation">Réviser maintenant</button></section><section class="world-progress"><span class="eyebrow">LES 12 VILLAGES</span><div class="world-dots">${villages.map((village, index) => `<span class="world-dot ${state.lessonProgress[index] >= 10 ? "done" : state.lessonProgress[index] > 0 ? "current" : ""}" title="${village.name}">${index + 1}</span>`).join("")}</div></section>${bottomNav()}</div>`
}

function profile() {
  const village = villages[state.currentVillage]
  const completedLessons = state.lessonProgress.reduce((total, value) => total + value, 0)
  const xp = state.sessions.reduce((total, session) => total + (session.xp || 0), 0) || 146
  const badges = [["🔥", "7 jours", "Régularité"], ["ஆ", "Premiers sons", "Alphabet"], ["✓", "Village 1", "Exploration"]]
  const todayMinutes = getStats().days[6]?.minutes || 0
  return `<div class="app-view page-profile">${statusBar()}<header class="profile-top"><div><span class="eyebrow">MON PROFIL</span><h1>Mon aventure</h1></div><button class="icon-button" type="button" data-go="settings" aria-label="Ouvrir les paramètres">⚙</button></header>
    <section class="profile-hero"><div class="profile-mascot">${mascot("welcome", "", "Thimoli salue Abinash")}</div><div class="profile-identity"><h2>Abinash</h2><p>Niveau ${state.currentVillage + 1} · <span lang="ta">${village.ta}</span></p><span class="xp-pill">${xp} XP</span></div></section>
    <div class="metrics profile-metrics"><article class="metric">🔥<strong>${state.streak}</strong><small>jours</small></article><article class="metric">📚<strong>${completedLessons}</strong><small>leçons</small></article><article class="metric">◇<strong>${state.lessonProgress.filter((value) => value >= 10).length}</strong><small>villages</small></article></div>
    <section class="goal-card"><div><span class="eyebrow">OBJECTIF QUOTIDIEN</span><h2>${state.settings.dailyGoal} minutes par jour</h2><p>Tu avances mieux avec de petites sessions régulières.</p></div><div class="goal-ring"><strong>${Math.min(100, Math.round((todayMinutes / state.settings.dailyGoal) * 100))}%</strong></div></section>
    <section class="badges-section"><div class="section-heading"><div><span class="eyebrow">MA COLLECTION</span><h2>Badges récents</h2></div><button class="text-button" type="button" data-go="stats">Voir mes stats</button></div><div class="badge-grid">${badges.map(([icon, title, subtitle]) => `<article class="badge-card"><span aria-hidden="true">${icon}</span><strong>${title}</strong><small>${subtitle}</small></article>`).join("")}</div></section>
    <section class="settings-card profile-links"><button class="setting" type="button" data-go="settings"><span>⚙ Paramètres</span><span aria-hidden="true">›</span></button><button class="setting" type="button" data-go="levels"><span>◇ Mes villages</span><span aria-hidden="true">›</span></button></section>${bottomNav()}</div>`
}

function toggle(name, label, detail = "") {
  const active = state.settings[name]
  return `<div class="setting setting-toggle"><div><strong>${label}</strong>${detail ? `<small>${detail}</small>` : ""}</div><button class="toggle ${active ? "" : "off"}" type="button" data-setting="${name}" role="switch" aria-checked="${active}" aria-label="${label}"><span></span></button></div>`
}
function settings() {
  const backAction = '<button class="icon-button" type="button" data-go="profile" aria-label="Retour au profil">←</button>'
  return `<div class="app-view page-settings">${statusBar()}${pageHeader("Paramètres", "Personnalise une expérience qui te ressemble.", backAction)}
    <section class="settings-group"><span class="settings-label">APPRENTISSAGE</span><div class="settings-card"><label class="setting" for="daily-goal"><div><strong>Objectif quotidien</strong><small>Une durée réaliste que tu peux tenir</small></div><select id="daily-goal" data-daily-goal aria-label="Objectif quotidien">${[5, 10, 15, 20].map((value) => `<option value="${value}" ${state.settings.dailyGoal === value ? "selected" : ""}>${value} min</option>`).join("")}</select></label>${toggle("autoPronunciation", "Prononciation automatique", "Joue le son au début de chaque question")}${toggle("soundEffects", "Effets sonores", "Sons doux de réussite et de correction")}</div></section>
    <section class="settings-group"><span class="settings-label">CONFORT</span><div class="settings-card">${toggle("reminders", "Rappel quotidien", "Chaque jour à 19:00")}${toggle("reducedMotion", "Réduire les animations", "Limite les mouvements et les célébrations")}<button class="setting" type="button"><span><strong>Taille du texte</strong><small>Standard</small></span><span aria-hidden="true">›</span></button></div></section>
    <section class="settings-group"><span class="settings-label">COMPTE</span><div class="settings-card"><button class="setting" type="button"><span>Langue de l’interface</span><span>Français ›</span></button><button class="setting" type="button"><span>Compte et confidentialité</span><span aria-hidden="true">›</span></button><button class="setting" type="button"><span>Aide et retours</span><span aria-hidden="true">›</span></button></div></section><p class="version-note">Thimoli v1.1 · Prototype interactif</p>${bottomNav()}</div>`
}

function ensureLessonRun() {
  if (state.lessonRun) return
  state.lessonRun = { startedAt: Date.now(), totalChecks: 0, correctAnswers: 0, firstTryCorrect: 0, wrongAnswers: 0, progressBefore: state.lessonProgress[state.currentVillage], pathBefore: state.pathProgress[state.currentVillage], finalized: false, summary: null }
}
function finalizeLesson() {
  ensureLessonRun()
  if (state.lessonRun.finalized) return state.lessonRun.summary
  const duration = Math.max(2, Math.round((Date.now() - state.lessonRun.startedAt) / 60000))
  const accuracy = state.lessonRun.totalChecks ? Math.round((state.lessonRun.correctAnswers / state.lessonRun.totalChecks) * 100) : 100
  const xp = 10 + state.lessonRun.firstTryCorrect * 2
  const before = state.lessonRun.progressBefore
  const pathBefore = Number.isFinite(state.lessonRun.pathBefore) ? state.lessonRun.pathBefore : state.pathProgress[state.currentVillage]
  let after = before
  let pathAfter = pathBefore
  let pathAdvanced = false
  if (Number.isInteger(state.activePathNode)) {
    if (state.activePathNode === pathBefore) {
      pathAfter = Math.min(PATH_NODE_COUNT, pathBefore + 1)
      state.pathProgress[state.currentVillage] = pathAfter
      pathAdvanced = true
    }
    after = pathAfter >= PATH_NODE_COUNT ? 10 : Math.min(9, Math.floor(pathAfter / 4))
    state.lessonProgress[state.currentVillage] = after
  } else if (state.lessonMode === "parcours") {
    after = Math.min(10, before + 1)
    state.lessonProgress[state.currentVillage] = after
    state.pathProgress[state.currentVillage] = after >= 10 ? PATH_NODE_COUNT : Math.min(PATH_NODE_COUNT - 1, after * 4)
    pathAfter = state.pathProgress[state.currentVillage]
  }
  const summary = { duration, accuracy, xp, before, after, pathBefore, pathAfter, pathAdvanced, correct: state.lessonRun.correctAnswers, total: lessonQuestions.length }
  state.lessonRun.finalized = true
  state.lessonRun.summary = summary
  state.completedSessions += 1
  state.sessions.push({ timestamp: Date.now(), duration, accuracy, xp, village: state.currentVillage, mode: state.lessonMode })
  state.sessions = state.sessions.slice(-100)
  saveState()
  return summary
}
function lessonComplete() {
  const summary = finalizeLesson()
  const village = villages[state.currentVillage]
  const fromPath = Number.isInteger(state.activePathNode)
  const completedNode = fromPath ? villagePathNodes[state.activePathNode] : null
  const beforePercent = fromPath ? Math.round((summary.pathBefore / PATH_NODE_COUNT) * 100) : summary.before * 10
  const afterPercent = fromPath ? Math.round((summary.pathAfter / PATH_NODE_COUNT) * 100) : summary.after * 10
  const resultCopy = fromPath ? (summary.pathAdvanced ? `Étape ${summary.pathAfter} sur ${PATH_NODE_COUNT} validée.` : "Étape rejouée : tes acquis sont renforcés.") : `${beforePercent}% → ${afterPercent}% · Encore ${Math.max(0, 10 - summary.after)} leçons avant le prochain village.`
  const primaryAction = fromPath ? '<button class="primary" type="button" data-return-path><span>Voir l’étape suivante</span><span aria-hidden="true">→</span></button>' : '<button class="primary" type="button" data-restart-lesson><span>Continuer le parcours</span><span aria-hidden="true">→</span></button>'
  return `<div class="app-view page-lesson page-complete">${statusBar()}<div class="celebration-burst" aria-hidden="true"><span>✦</span><span>·</span><span>✦</span></div>${mascot("celebrate", "completion-mascot", "Thimoli célèbre la leçon terminée")}<header class="completion-title"><span class="eyebrow">BRAVO ABINASH</span><h1>Leçon terminée !</h1><p>Tu viens de renforcer ta lecture en tamoul.</p></header>
    <div class="completion-metrics"><article><strong>${summary.correct}/${summary.total}</strong><span>questions</span></article><article><strong>+${summary.xp}</strong><span>XP gagnés</span></article><article><strong>${summary.accuracy}%</strong><span>précision</span></article></div>
    <section class="learned-card"><span class="learned-letter" lang="ta">ஆ</span><div><span class="eyebrow">${completedNode ? (completedNode.type === "lesson" ? "MINI-LEÇON VALIDÉE" : completedNode.type === "evaluation" ? "ÉVALUATION TERMINÉE" : "EXERCICE VALIDÉ") : "AUJOURD’HUI, TU AS APPRIS"}</span><h2>${completedNode ? completedNode.title : "ஆ = « aa », un son long"}</h2><p>Exemple : ஆடு (ādu) · chèvre</p></div></section>
    <section class="village-result"><div class="section-heading"><div><span class="eyebrow">${village.name.toUpperCase()}</span><h2>Ta progression avance</h2></div><strong>${afterPercent}%</strong></div>${progressBar(afterPercent, `${afterPercent} % du village terminé`)}<p>${resultCopy}</p></section>
    ${primaryAction}<button class="secondary secondary-full" type="button" data-go="home">Retour au village</button></div>`
}

function lesson() {
  if (state.lesson >= lessonQuestions.length) return lessonComplete()
  ensureLessonRun()
  const question = lessonQuestions[state.lesson]
  const activeNode = Number.isInteger(state.activePathNode) ? villagePathNodes[state.activePathNode] : null
  const section = activeNode ? `${activeNode.type === "lesson" ? "MINI-LEÇON" : activeNode.type === "evaluation" ? "ÉVALUATION" : "EXERCICE"} · ÉTAPE ${state.activePathNode + 1}` : state.lessonMode === "parcours" ? "LECTURE" : `RÉVISION · ${state.lessonMode.toUpperCase()}`
  const isCorrect = state.feedback === "correct"
  const isWrong = state.feedback === "wrong"
  const coachKind = isCorrect ? "success" : isWrong ? "correction" : "hint"
  const coachMessage = isCorrect ? `<strong>Bien joué !</strong> ${question.explanation}` : isWrong ? state.questionAttempts >= 2 ? `<strong>Tu progresses.</strong> La bonne piste est « ${question.answers[question.correct]} ». On la refait ensemble ?` : `<strong>Presque !</strong> ${question.explanation} Écoute une fois, puis réessaie.` : state.showHint ? question.hint : "Prends ton temps : écoute le son, puis choisis ta réponse."
  const coachLabel = isCorrect ? "Bonne réponse" : isWrong ? "Correction utile" : state.showHint ? "Ton indice" : "Conseil de Thimoli"
  return `<div class="app-view page-lesson ${isCorrect ? "lesson-is-correct" : isWrong ? "lesson-is-wrong" : ""}">${statusBar()}<header class="lesson-top"><button class="icon-button lesson-close" type="button" data-go="home" aria-label="Fermer la leçon">×</button>${progressBar(((state.lesson + 1) / lessonQuestions.length) * 100, `Question ${state.lesson + 1} sur ${lessonQuestions.length}`, "lesson-progress")}<button class="lesson-hearts" type="button" data-modal="hearts" aria-label="${state.lives} cœurs restants">♥ ${state.lives}</button></header>
    <div class="lesson-section"><span class="eyebrow">${section}</span><span>QUESTION ${state.lesson + 1}/${lessonQuestions.length}</span></div>${coach(coachKind, coachMessage, { compact: true, label: coachLabel })}
    <section class="lesson-card"><p>Lis et écoute la lettre en tamoul</p><div class="letter" lang="ta">${question.letter}</div><button class="listen-button" type="button" data-speak="${question.letter}"><span aria-hidden="true">◖</span><span>Écouter le son</span></button><p class="question-prompt">${question.prompt}</p></section>
    <div class="answers" role="group" aria-label="Choisis une réponse">${question.answers.map((answer, index) => {
      const selected = state.selected === index
      const correctState = isCorrect && index === question.correct
      const wrongState = isWrong && selected
      return `<button class="answer ${selected ? "selected" : ""} ${correctState ? "answer-correct" : ""} ${wrongState ? "answer-wrong" : ""}" type="button" data-answer="${index}" aria-pressed="${selected}" ${state.feedback ? "disabled" : ""}><span class="answer-key">${String.fromCharCode(65 + index)}</span><span>${answer}</span>${correctState ? '<b aria-hidden="true">✓</b>' : wrongState ? '<b aria-hidden="true">×</b>' : ""}</button>`
    }).join("")}</div>
    ${state.showHint && !state.feedback ? `<aside class="hint-card"><span>Indice</span><p>${question.hint}</p></aside>` : ""}
    ${isCorrect ? `<section class="feedback-panel feedback-success"><span class="feedback-label">À retenir</span><h2>${question.explanation}</h2><p><strong>Exemple :</strong> ${question.example}</p><button class="primary" type="button" data-next-question><span>Continuer</span><span aria-hidden="true">→</span></button></section>` : ""}
    ${isWrong ? `<section class="feedback-panel feedback-correction"><span class="feedback-label">On apprend de chaque essai</span><h2>${question.explanation}</h2><p><strong>Exemple :</strong> ${question.example}</p>${state.questionAttempts >= 4 && state.heartLostThisQuestion ? '<p class="heart-message">Un seul cœur a été utilisé pour cette question.</p>' : ""}<button class="primary" type="button" data-retry><span>Réécouter et réessayer</span><span aria-hidden="true">↻</span></button></section>` : ""}
    ${!state.feedback ? `<div class="lesson-actions"><button class="secondary" type="button" data-hint ${state.showHint ? "disabled" : ""}>${state.showHint ? "Indice affiché" : "Voir un indice"}</button><button class="primary check-answer" type="button" data-check-answer ${state.selected === null ? "disabled" : ""}>Vérifier</button></div>` : ""}</div>`
}

function modalView() {
  if (!state.modal) return ""
  if (state.modal.type === "hearts") return `<div class="modal-backdrop" data-close-modal role="presentation"><section class="modal-card" role="dialog" aria-modal="true" aria-labelledby="modal-title"><button class="modal-close" type="button" data-close-modal aria-label="Fermer">×</button><div class="modal-icon hearts-large" aria-hidden="true">♥</div><h2 id="modal-title">Les cœurs protègent ton rythme</h2><p>Ils t’encouragent à prendre le temps de comprendre, sans te punir.</p><ul><li>Les trois premiers essais incorrects ne coûtent rien.</li><li>Un cœur est utilisé seulement à partir de la quatrième erreur.</li><li>Tu ne peux perdre qu’un cœur par question.</li></ul><p class="modal-note">Dans ce prototype, tu peux continuer à apprendre même à 0 cœur.</p><button class="primary" type="button" data-close-modal>J’ai compris</button></section></div>`
  const index = state.modal.index
  const village = villages[index]
  const previous = villages[Math.max(0, index - 1)]
  const remaining = Math.max(0, 10 - state.lessonProgress[Math.max(0, index - 1)])
  return `<div class="modal-backdrop" data-close-modal role="presentation"><section class="modal-card locked-modal" role="dialog" aria-modal="true" aria-labelledby="modal-title"><button class="modal-close" type="button" data-close-modal aria-label="Fermer">×</button><div class="modal-village" aria-hidden="true">${villageImage(index)}</div><span class="level-badge">Niveau ${index + 1}</span><h2 id="modal-title">${village.name}</h2><p class="tamil" lang="ta">${village.ta}</p><p>${village.theme}</p><div class="unlock-rule"><strong>Comment le débloquer ?</strong><span>Termine ${previous.name}. Il te reste ${remaining} leçon${remaining > 1 ? "s" : ""}.</span></div><button class="primary" type="button" data-close-modal>Continuer mon parcours</button></section></div>`
}

function currentView() {
  const views = { home, levels, path: pathPage, review, stats, profile, settings, lesson }
  return (views[state.page] || home)()
}
function updateUrl(page, replace = false) {
  const url = new URL(location.href)
  url.searchParams.set("page", page)
  history[replace ? "replaceState" : "pushState"]({ page }, "", url)
}
function render() {
  applyMotionPreference()
  app.innerHTML = `${currentView()}${modalView()}`
  document.title = `Thimoli — ${pageTitles[state.page] || "Accueil"}`
  const modalClose = app.querySelector(".modal-close")
  if (modalClose) window.setTimeout(() => modalClose.focus(), 0)
  maybeSpeakCurrentLetter()
}
function goTo(page, options = {}) {
  if (!validPages.includes(page)) return
  state.page = page
  state.selected = null
  state.feedback = null
  state.showHint = false
  state.modal = null
  saveState()
  if (!options.fromPop) updateUrl(page, Boolean(options.replace))
  render()
  window.scrollTo({ top: 0, behavior: state.settings.reducedMotion ? "auto" : "smooth" })
}
function startLesson(mode, pathNode = null) {
  state.lessonMode = validLessonModes.includes(mode) ? mode : "parcours"
  state.activePathNode = Number.isInteger(pathNode) ? clamp(pathNode, 0, PATH_NODE_COUNT - 1) : null
  state.lesson = 0
  state.selected = null
  state.feedback = null
  state.showHint = false
  state.questionAttempts = 0
  state.heartLostThisQuestion = false
  state.lessonRun = null
  state.page = "lesson"
  lastAutoSpeechKey = ""
  ensureLessonRun()
  saveState()
  updateUrl("lesson")
  render()
  window.scrollTo(0, 0)
}
function restartLesson() {
  state.lesson = 0
  state.selected = null
  state.feedback = null
  state.showHint = false
  state.questionAttempts = 0
  state.heartLostThisQuestion = false
  state.lessonRun = null
  lastAutoSpeechKey = ""
  ensureLessonRun()
  saveState()
  render()
  window.scrollTo(0, 0)
}

function speakTamil(text) {
  if (!text || !("speechSynthesis" in window) || typeof window.SpeechSynthesisUtterance !== "function") return
  try {
    const utterance = new window.SpeechSynthesisUtterance(text)
    utterance.lang = "ta-IN"
    utterance.rate = 0.78
    const tamilVoice = window.speechSynthesis.getVoices().find((voice) => voice.lang.toLowerCase().startsWith("ta"))
    if (tamilVoice) utterance.voice = tamilVoice
    window.speechSynthesis.cancel()
    window.speechSynthesis.speak(utterance)
  } catch (error) { /* Certains navigateurs ne proposent aucune voix tamoule. */ }
}
function playFeedbackTone(correct) {
  if (!state.settings.soundEffects) return
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext
    if (!AudioContext) return
    const context = new AudioContext()
    const oscillator = context.createOscillator()
    const gain = context.createGain()
    oscillator.frequency.value = correct ? 660 : 240
    gain.gain.setValueAtTime(0.045, context.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.0001, context.currentTime + 0.14)
    oscillator.connect(gain)
    gain.connect(context.destination)
    oscillator.start()
    oscillator.stop(context.currentTime + 0.14)
    oscillator.addEventListener("ended", () => context.close())
  } catch (error) { /* Le retour visuel reste disponible sans Web Audio. */ }
}
function recordAnswer(question, answer, correct) {
  state.answerHistory.push({ timestamp: Date.now(), questionId: question.id, answer, correct, attempt: state.questionAttempts, village: state.currentVillage, mode: state.lessonMode })
  state.answerHistory = state.answerHistory.slice(-300)
}
function checkAnswer() {
  const question = lessonQuestions[state.lesson]
  if (!question || state.selected === null || state.feedback) return
  const correct = state.selected === question.correct
  state.questionAttempts += 1
  state.lessonRun.totalChecks += 1
  if (correct) {
    state.feedback = "correct"
    state.lessonRun.correctAnswers += 1
    if (state.questionAttempts === 1) state.lessonRun.firstTryCorrect += 1
  } else {
    state.feedback = "wrong"
    state.lessonRun.wrongAnswers += 1
    if (state.questionAttempts >= 4 && !state.heartLostThisQuestion) {
      state.lives = Math.max(0, state.lives - 1)
      state.heartLostThisQuestion = true
    }
  }
  recordAnswer(question, state.selected, correct)
  playFeedbackTone(correct)
  saveState()
  render()
}
function retryQuestion() {
  const question = lessonQuestions[state.lesson]
  state.selected = null
  state.feedback = null
  state.showHint = true
  lastAutoSpeechKey = ""
  saveState()
  render()
  if (question) window.setTimeout(() => speakTamil(question.letter), 80)
}
function nextQuestion() {
  if (state.feedback !== "correct") return
  state.lesson += 1
  state.selected = null
  state.feedback = null
  state.showHint = false
  state.questionAttempts = 0
  state.heartLostThisQuestion = false
  lastAutoSpeechKey = ""
  saveState()
  render()
  window.scrollTo({ top: 0, behavior: state.settings.reducedMotion ? "auto" : "smooth" })
}

let lastAutoSpeechKey = ""
function maybeSpeakCurrentLetter() {
  if (state.page !== "lesson" || state.feedback || !state.settings.autoPronunciation || state.lesson >= lessonQuestions.length) return
  const key = `${state.lessonMode}:${state.lesson}:${state.questionAttempts}`
  if (lastAutoSpeechKey === key) return
  lastAutoSpeechKey = key
  window.setTimeout(() => {
    if (state.page === "lesson" && state.lesson < lessonQuestions.length) speakTamil(lessonQuestions[state.lesson].letter)
  }, 120)
}
function openModal(type, index = null) {
  state.modal = type === "hearts" ? { type: "hearts" } : { type: "locked", index }
  render()
}
function closeModal() { state.modal = null; render() }

app.addEventListener("click", (event) => {
  const target = event.target.closest("button, [data-close-modal]")
  if (!target) return
  if (target.classList.contains("modal-backdrop") && event.target !== target) return
  if (target.hasAttribute("data-close-modal")) return closeModal()
  if (target.hasAttribute("data-open-path")) return goTo("path")
  if (target.dataset.pathNode !== undefined) {
    const nodeIndex = Number(target.dataset.pathNode)
    if (!Number.isInteger(nodeIndex) || nodeIndex < 0 || nodeIndex >= PATH_NODE_COUNT || pathNodeState(nodeIndex) === "locked") return
    const node = villagePathNodes[nodeIndex]
    return startLesson(node.type === "lesson" ? "parcours" : "Alphabet", nodeIndex)
  }
  if (target.hasAttribute("data-return-path")) {
    state.activePathNode = null
    state.lessonRun = null
    return goTo("path")
  }
  if (target.dataset.go) return goTo(target.dataset.go)
  if (target.dataset.startLesson) return startLesson(target.dataset.startLesson)
  if (target.dataset.review) return startLesson(target.dataset.review)
  if (target.hasAttribute("data-restart-lesson")) return restartLesson()
  if (target.dataset.village !== undefined) {
    const index = Number(target.dataset.village)
    if (!Number.isInteger(index) || !isVillageUnlocked(index)) return
    state.currentVillage = index
    state.lesson = 0
    state.lessonRun = null
    state.activePathNode = null
    saveState()
    return goTo("home")
  }
  if (target.dataset.locked !== undefined) {
    const index = Number(target.dataset.locked)
    if (Number.isInteger(index) && villages[index]) openModal("locked", index)
    return
  }
  if (target.dataset.modal === "hearts") return openModal("hearts")
  if (target.dataset.setting) {
    const name = target.dataset.setting
    if (!Object.prototype.hasOwnProperty.call(state.settings, name)) return
    state.settings[name] = !state.settings[name]
    saveState()
    return render()
  }
  if (target.dataset.speak) return speakTamil(target.dataset.speak)
  if (target.dataset.answer !== undefined) {
    if (state.feedback) return
    const answer = Number(target.dataset.answer)
    if (!Number.isInteger(answer)) return
    state.selected = answer
    saveState()
    return render()
  }
  if (target.hasAttribute("data-hint")) { state.showHint = true; saveState(); return render() }
  if (target.hasAttribute("data-check-answer")) return checkAnswer()
  if (target.hasAttribute("data-retry")) return retryQuestion()
  if (target.hasAttribute("data-next-question")) nextQuestion()
})

app.addEventListener("change", (event) => {
  if (!event.target.matches("[data-daily-goal]")) return
  const value = Number(event.target.value)
  if (![5, 10, 15, 20].includes(value)) return
  state.settings.dailyGoal = value
  saveState()
  render()
})
window.addEventListener("popstate", () => {
  const page = new URLSearchParams(location.search).get("page")
  goTo(validPages.includes(page) ? page : "home", { fromPop: true })
})
window.addEventListener("keydown", (event) => { if (event.key === "Escape" && state.modal) closeModal() })

applyMotionPreference()
updateUrl(state.page, true)
saveState()
render()

