const villages=[
  {name:"Village des Premiers Pas",ta:"முதல் படி கிராமம்",theme:"Les bases du tamoul"},
  {name:"Village de la Mer",ta:"கடல் கிராமம்",theme:"Les mots du quotidien"},
  {name:"Village du Temple",ta:"கோவில் கிராமம்",theme:"La famille et les proches"},
  {name:"Village des Rizières",ta:"நெல் வயல் கிராமம்",theme:"La nourriture et la nature"},
  {name:"Village du Marché",ta:"சந்தை கிராமம்",theme:"Les achats et les prix"},
  {name:"Village du Savoir",ta:"அறிவு கிராமம்",theme:"L’école et le travail"},
  {name:"Village des Fêtes",ta:"திருவிழா கிராமம்",theme:"La culture et les traditions"},
  {name:"Village des Collines",ta:"மலை கிராமம்",theme:"Les voyages et les lieux"},
  {name:"Village de la Ville",ta:"நகர கிராமம்",theme:"La vie en ville"},
  {name:"Village des Horizons",ta:"எல்லை கிராமம்",theme:"Les projets et le futur"},
  {name:"Village de la Sagesse",ta:"ஞான கிராமம்",theme:"Les idées et les émotions"},
  {name:"Village du Maître",ta:"ஆசான் கிராமம்",theme:"La maîtrise du tamoul"}
];
const lessonQuestions=[
  {letter:"ஆ",prompt:"Quel son correspond à cette lettre ?",answers:["aa","i","ou"],correct:0},
  {letter:"ஈ",prompt:"Choisis la bonne prononciation",answers:["é","ii","an"],correct:1},
  {letter:"ஊ",prompt:"Quelle voyelle entends-tu ?",answers:["uu","aï","o"],correct:0}
];
const reviewItems=[
  ["🔤","Alphabet","12 cartes à revoir"],
  ["🔊","Prononciation","8 sons à écouter"],
  ["✍🏽","Écriture","5 lettres à tracer"],
  ["💬","Vocabulaire","18 mots maîtrisés"]
];
const validPages=["home","levels","review","profile","settings","lesson"];
const validLessonModes=["parcours",...reviewItems.map(item=>item[1])];
const STORAGE_KEY="thimoli-v1.1-state";
const defaultProgress=[10,10,6,0,0,0,0,0,0,0,0,0];

function loadSavedState(){
  try{
    const value=JSON.parse(localStorage.getItem(STORAGE_KEY));
    return value&&typeof value==="object"?value:{};
  }catch(error){
    return {};
  }
}

const saved=loadSavedState();
const requestedPage=new URLSearchParams(location.search).get("page");
const currentVillage=Number.isInteger(saved.currentVillage)&&saved.currentVillage>=0&&saved.currentVillage<3?saved.currentVillage:2;
const lessonProgress=villages.map((v,index)=>{
  const value=Array.isArray(saved.lessonProgress)?saved.lessonProgress[index]:undefined;
  return Number.isFinite(value)?Math.max(0,Math.min(10,Math.round(value))):defaultProgress[index];
});
const state={
  page:validPages.includes(requestedPage)?requestedPage:(validPages.includes(saved.page)?saved.page:"home"),
  currentVillage,
  lesson:Number.isInteger(saved.lesson)?Math.max(0,Math.min(lessonQuestions.length,saved.lesson)):0,
  lessonMode:validLessonModes.includes(saved.lessonMode)?saved.lessonMode:"parcours",
  lessonProgress,
  completedSessions:Number.isInteger(saved.completedSessions)&&saved.completedSessions>=0?saved.completedSessions:0,
  selected:null,
  streak:Number.isInteger(saved.streak)&&saved.streak>=0?saved.streak:7,
  lives:Number.isInteger(saved.lives)?Math.max(0,Math.min(5,saved.lives)):4,
  settings:{
    soundEffects:typeof saved.settings?.soundEffects==="boolean"?saved.settings.soundEffects:true,
    autoPronunciation:typeof saved.settings?.autoPronunciation==="boolean"?saved.settings.autoPronunciation:true,
    reminders:typeof saved.settings?.reminders==="boolean"?saved.settings.reminders:true
  }
};

function saveState(){
  try{
    localStorage.setItem(STORAGE_KEY,JSON.stringify({
      page:state.page,
      currentVillage:state.currentVillage,
      lesson:state.lesson,
      lessonMode:state.lessonMode,
      lessonProgress:state.lessonProgress,
      completedSessions:state.completedSessions,
      streak:state.streak,
      lives:state.lives,
      settings:state.settings
    }));
  }catch(error){
    // L’application reste utilisable lorsque le stockage privé est indisponible.
  }
}

const app=document.querySelector("#app");
const status=()=>`<div class="status"><span>9:41</span><span>▮▮  ◉  100%</span></div>`;
const logo=()=>`<div class="brandbar"><div><div class="logo">Thimoli<span class="leaf">◆</span></div><div class="tagline">Apprendre le tamoul, un jour à la fois</div></div><div class="avatar">👦🏽</div></div>`;
const nav=()=>`<nav class="bottom-nav"><button class="nav-btn ${state.page==="home"?"active":""}" data-go="home"><b>⌂</b>Accueil</button><button class="nav-btn ${state.page==="review"?"active":""}" data-go="review"><b>↻</b>Révisions</button><button class="nav-btn ${state.page==="profile"?"active":""}" data-go="profile"><b>●</b>Profil</button></nav>`;
const hearts=()=>Array.from({length:5},(_,index)=>index<state.lives?"♥":"♡").join(" ");

function home(){
  const index=state.currentVillage;
  const village=villages[index];
  const completed=state.lessonProgress[index];
  const percent=completed*10;
  const next=villages[index+1];
  const lessonNumber=Math.min(completed+1,10);
  const actionLabel=completed>=10?"Réviser":"Continuer";
  const nextMessage=index+1<3?"Ce village est débloqué":`Encore ${Math.max(0,10-completed)} leçons pour débloquer`;
  const nextCard=next?`<article class="next-card" data-go="levels" role="button" tabindex="0"><div class="next-thumb"><div class="sprite level-${index+2}"></div></div><div><small>Prochain niveau</small><p><strong>${next.name}</strong></p><small>${nextMessage}</small></div><b>›</b></article>`:"";
  return `${status()}${logo()}<section class="stats"><div class="stat"><span class="stat-icon">🔥</span><div><small>Série</small><strong>${state.streak} jours</strong></div></div><div class="stat"><div><div class="hearts">${hearts()}</div><strong>${state.lives}/5 <small>◷ +1 dans 42 min</small></strong></div></div></section><div class="hero-village"><div class="sprite level-${index+1}"></div></div><section class="progress-card"><div class="eyebrow">NIVEAU ${index+1} SUR 12</div><h1>${village.name}</h1><div class="tamil">${village.ta}</div><p class="village-theme">${village.theme}</p><div class="bar"><span style="width:${percent}%"></span></div><div class="progress-meta"><span>${completed} / 10 leçons terminées</span><span>${percent}%</span></div></section><button class="primary" data-start-lesson="parcours"><span>${actionLabel}</span><span>→</span></button><button class="lesson-row" data-start-lesson="parcours"><span>📖 &nbsp; ${completed>=10?"Révision":`Leçon ${lessonNumber}`} · Lecture</span><span>›</span></button>${nextCard}${nav()}`;
}

function villageState(index){
  if(index>2)return "VERROUILLÉ";
  if(state.lessonProgress[index]>=10)return "TERMINÉ";
  if(state.lessonProgress[index]>0)return "EN COURS";
  return "DÉBLOQUÉ";
}

function levels(){
  return `${status()}<header class="page-head"><div><h1>Les 12 villages</h1><p>12 villages, un nouveau monde.</p></div><button class="avatar" data-go="profile">👦🏽</button></header><aside class="village-intro">Progresse village après village et découvre la richesse du tamoul. 🌿</aside><div class="village-grid">${villages.map((v,index)=>{
    const locked=index>2;
    return `<article class="village-card ${locked?"locked":""} ${index===state.currentVillage?"current":""}" ${locked?'aria-disabled="true"':`data-village="${index}" role="button" tabindex="0"`}>${locked?'<span class="card-lock">🔒</span>':""}<div class="village-art"><div class="sprite level-${index+1}"></div></div><span class="level-badge">Niveau ${index+1}</span><h3>${v.name}</h3><p class="village-tamil">${v.ta}</p><p class="village-theme">${v.theme}</p><p class="village-state">${villageState(index)}</p></article>`;
  }).join("")}</div><p class="village-quote">🌿 “Chaque village te rapproche d’une nouvelle version de toi.” 🌿</p>${nav()}`;
}

function review(){
  return `${status()}<header class="page-head"><div><h1>Révisions</h1><p>Consolide ce que tu as appris.</p></div><div class="avatar">🧠</div></header>${reviewItems.map(item=>`<article class="review-card" data-review="${item[1]}" role="button" tabindex="0"><div class="icon">${item[0]}</div><div><h3>${item[1]}</h3><p>${item[2]}</p></div><b style="margin-left:auto">›</b></article>`).join("")}${nav()}`;
}

function profile(){
  const village=villages[state.currentVillage];
  const completedLessons=state.lessonProgress.reduce((total,value)=>total+value,0);
  return `${status()}<div class="profile-hero"><div class="avatar">👦🏽</div><h1>Abinash</h1><p>Niveau ${state.currentVillage+1} · ${village.ta}</p></div><div class="metrics"><div class="metric">🔥<strong>${state.streak}</strong><small>jours</small></div><div class="metric">📚<strong>${completedLessons}</strong><small>leçons</small></div><div class="metric">⭐<strong>68%</strong><small>maîtrise</small></div></div><section class="settings-card" style="padding:4px 18px;margin-top:22px"><div class="setting"><span>🎯 Objectif quotidien</span><span>10 min ›</span></div><div class="setting" data-go="settings" role="button" tabindex="0"><span>⚙️ Paramètres</span><span>›</span></div><div class="setting"><span>💎 Thimoli Plus</span><span>Découvrir ›</span></div></section>${nav()}`;
}

function toggle(name,label){
  const active=state.settings[name];
  return `<div class="setting"><span>${label}</span><button class="toggle ${active?"":"off"}" data-setting="${name}" role="switch" aria-checked="${active}" aria-label="${label}" style="border:0;cursor:pointer;flex:none;${active?"":"background:#cbd1d5;transform:scaleX(-1);"}"></button></div>`;
}

function settings(){
  return `${status()}<header class="page-head"><button class="avatar" data-go="profile">←</button><div><h1>Paramètres</h1><p>Personnalise ton expérience.</p></div></header><section class="settings-card" style="padding:4px 18px">${toggle("soundEffects","Effets sonores")}${toggle("autoPronunciation","Prononciation automatique")}${toggle("reminders","Rappels quotidiens")}<div class="setting"><span>Langue de l’interface</span><span>Français ›</span></div><div class="setting"><span>Compte et confidentialité</span><span>›</span></div></section>${nav()}`;
}

function lesson(){
  const done=state.lesson>=lessonQuestions.length;
  if(done)return `${status()}<div class="empty"><div style="font-size:80px">🎉</div><h1>Leçon terminée !</h1><p>Bravo, tu viens de renforcer ta lecture en tamoul.</p><button class="primary" data-go="home">Retour au village →</button></div>`;
  const data=lessonQuestions[state.lesson];
  const section=state.lessonMode==="parcours"?"LECTURE":`RÉVISION · ${state.lessonMode.toUpperCase()}`;
  return `${status()}<div class="lesson-top"><button data-go="home" aria-label="Fermer la leçon">×</button><div class="bar" style="width:70%"><span style="width:${((state.lesson+1)/lessonQuestions.length)*100}%"></span></div><span>❤️ ${state.lives}</span></div><div class="eyebrow">${section} · QUESTION ${state.lesson+1}/${lessonQuestions.length}</div><section class="lesson-card"><p>Lis la lettre en tamoul</p><div class="letter">${data.letter}</div><button class="lesson-row" data-speak="${data.letter}" style="width:100%;border:0"><span>🔊 Écouter</span><span>▶</span></button></section><p style="text-align:center">${data.prompt}</p><div class="answers">${data.answers.map((answer,index)=>`<button class="answer ${state.selected===index?"selected":""}" data-answer="${index}">${answer}</button>`).join("")}</div>${state.selected!==null?`<div class="${state.selected===data.correct?"success":"eyebrow"}">${state.selected===data.correct?"✓ Bonne réponse !":"Essaie encore"}</div><button class="primary" data-next="${data.correct}">Continuer →</button>`:""}`;
}

function goTo(page){
  if(!validPages.includes(page))return;
  state.page=page;
  state.selected=null;
  saveState();
  render();
  window.scrollTo(0,0);
}

function startLesson(mode){
  const nextMode=validLessonModes.includes(mode)?mode:"parcours";
  if(state.lessonMode!==nextMode||state.lesson>=lessonQuestions.length)state.lesson=0;
  state.lessonMode=nextMode;
  state.page="lesson";
  state.selected=null;
  lastAutoSpeechKey="";
  saveState();
  render();
  window.scrollTo(0,0);
}

function speakTamil(text){
  if(!text||!("speechSynthesis" in window)||typeof window.SpeechSynthesisUtterance!=="function")return;
  try{
    const utterance=new window.SpeechSynthesisUtterance(text);
    utterance.lang="ta-IN";
    utterance.rate=0.78;
    const tamilVoice=window.speechSynthesis.getVoices().find(voice=>voice.lang.toLowerCase().startsWith("ta"));
    if(tamilVoice)utterance.voice=tamilVoice;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  }catch(error){
    // Certains navigateurs ne proposent aucune voix tamoule.
  }
}

function playFeedbackTone(correct){
  if(!state.settings.soundEffects)return;
  try{
    const AudioContext=window.AudioContext||window.webkitAudioContext;
    if(!AudioContext)return;
    const context=new AudioContext();
    const oscillator=context.createOscillator();
    const gain=context.createGain();
    oscillator.frequency.value=correct?660:220;
    gain.gain.setValueAtTime(0.05,context.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001,context.currentTime+0.12);
    oscillator.connect(gain);
    gain.connect(context.destination);
    oscillator.start();
    oscillator.stop(context.currentTime+0.12);
    oscillator.addEventListener("ended",()=>context.close());
  }catch(error){
    // Le retour visuel reste disponible sans Web Audio.
  }
}

function activateWithKeyboard(element,callback){
  element.addEventListener("click",callback);
  if(element.tagName==="BUTTON"||element.tagName==="A")return;
  element.addEventListener("keydown",event=>{
    if(event.key==="Enter"||event.key===" "){
      event.preventDefault();
      callback();
    }
  });
}

let lastAutoSpeechKey="";
function maybeSpeakCurrentLetter(){
  if(state.page!=="lesson"||!state.settings.autoPronunciation||state.lesson>=lessonQuestions.length)return;
  const key=`${state.lessonMode}:${state.lesson}`;
  if(lastAutoSpeechKey===key)return;
  lastAutoSpeechKey=key;
  window.setTimeout(()=>{
    if(state.page==="lesson"&&state.lesson<lessonQuestions.length)speakTamil(lessonQuestions[state.lesson].letter);
  },0);
}

function render(){
  app.innerHTML=({home,levels,review,profile,settings,lesson}[state.page]||home)();

  document.querySelectorAll("[data-go]").forEach(element=>{
    activateWithKeyboard(element,()=>goTo(element.dataset.go));
  });
  document.querySelectorAll("[data-village]").forEach(element=>{
    activateWithKeyboard(element,()=>{
      const index=Number(element.dataset.village);
      if(!Number.isInteger(index)||index<0||index>2)return;
      if(index!==state.currentVillage){
        state.lesson=0;
        state.lessonMode="parcours";
      }
      state.currentVillage=index;
      state.page="home";
      state.selected=null;
      saveState();
      render();
      window.scrollTo(0,0);
    });
  });
  document.querySelectorAll("[data-review]").forEach(element=>{
    activateWithKeyboard(element,()=>startLesson(element.dataset.review));
  });
  document.querySelectorAll("[data-start-lesson]").forEach(element=>{
    element.addEventListener("click",()=>startLesson(element.dataset.startLesson));
  });
  document.querySelectorAll("[data-setting]").forEach(element=>{
    element.addEventListener("click",()=>{
      const name=element.dataset.setting;
      if(!Object.prototype.hasOwnProperty.call(state.settings,name))return;
      state.settings[name]=!state.settings[name];
      saveState();
      render();
    });
  });
  document.querySelectorAll("[data-speak]").forEach(element=>{
    element.addEventListener("click",()=>speakTamil(element.dataset.speak));
  });
  document.querySelectorAll("[data-answer]").forEach(element=>{
    element.addEventListener("click",()=>{
      const answer=Number(element.dataset.answer);
      const question=lessonQuestions[state.lesson];
      if(!question||!Number.isInteger(answer))return;
      const isNewWrongAnswer=state.selected!==answer&&answer!==question.correct;
      state.selected=answer;
      if(isNewWrongAnswer)state.lives=Math.max(0,state.lives-1);
      playFeedbackTone(answer===question.correct);
      saveState();
      render();
    });
  });
  document.querySelectorAll("[data-next]").forEach(element=>{
    element.addEventListener("click",()=>{
      if(state.selected!==Number(element.dataset.next))return;
      state.lesson+=1;
      state.selected=null;
      lastAutoSpeechKey="";
      if(state.lesson>=lessonQuestions.length){
        state.completedSessions+=1;
        if(state.lessonMode==="parcours"){
          const index=state.currentVillage;
          state.lessonProgress[index]=Math.min(10,state.lessonProgress[index]+1);
        }
      }
      saveState();
      render();
    });
  });

  maybeSpeakCurrentLetter();
}

saveState();
render();
