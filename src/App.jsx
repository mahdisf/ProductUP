import { useEffect, useState } from 'react';
import { lessonSets, practiceSets } from './localizedContent.js';
import { futureTopics, uiCopy } from './uiCopy.js';

const STORAGE_KEY = 'product-practice-v1';
const LANGUAGE_KEY = 'productup-language';
const emptyData = () => ({ xp: 0, answers: {}, progress: {}, streak: { count: 0, lastDate: '' }, validation: { intent: '', note: '' } });

function loadData() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (!saved || typeof saved !== 'object') return emptyData();
    return { ...emptyData(), ...saved, answers: saved.answers || {}, progress: saved.progress || {}, streak: saved.streak || { count: 0, lastDate: '' }, validation: saved.validation || { intent: '', note: '' } };
  } catch { return emptyData(); }
}

const answerKey = (id, index) => `${id}:${index}`;
const skillPercent = (lesson, data, withCompletion = true) => {
  const correct = lesson.steps.filter((_, index) => data.answers[answerKey(lesson.id, index)]?.correct).length;
  return Math.min(94, lesson.baseSkill + correct * 2 + (withCompletion && data.progress[lesson.id]?.completed ? 9 : 0));
};

function optionOrder(count, key) {
  // Keep display order stable while saved answers continue to use source indices.
  let hash = 0;
  for (const character of key) hash = (hash * 31 + character.charCodeAt(0)) | 0;
  const shift = Math.abs(hash) % count;
  return Array.from({ length: count }, (_, index) => (index + shift) % count);
}

function ChoiceOptions({ options, seed, answer, draft, onSelect }) {
  return <div className="options">{optionOrder(options.length, seed).map((optionIndex) => {
    const option = options[optionIndex];
    const chosen = draft === optionIndex || answer?.value === optionIndex;
    return (!answer || answer.value === optionIndex) && <button
      key={optionIndex}
      disabled={!!answer}
      aria-pressed={chosen}
      className={`option ${chosen ? 'selected' : ''} ${answer && answer.value === optionIndex ? answer.correct ? 'correct' : 'incorrect' : ''}`}
      onClick={() => onSelect(optionIndex)}
    >{option.label}</button>;
  })}</div>;
}

function Feedback({ answer, feedbackText, onContinue, t, fmt }) {
  const heading = answer.correct ? `${t.strongDecision} · +${fmt(answer.xp)} XP` : answer.xp ? `${t.partialDecision} · +${fmt(answer.xp)} XP` : t.notQuite;
  const explanation = answer.correct
    ? feedbackText.replace(/^(?:درست است|انتخاب خوبی است|شروع خوبی است|Yes|Right|Good start|Good call)\.\s*/u, '')
    : feedbackText;
  return <>
    <div className={`feedback ${answer.correct ? '' : 'miss'}`} role="status"><strong>{heading}</strong><p>{explanation}</p></div>
    <div className="activity-actions"><button className="btn btn-dark" onClick={onContinue}>{t.continue}</button></div>
  </>;
}

export default function App() {
  const [data, setData] = useState(loadData);
  const [language, setLanguage] = useState(() => localStorage.getItem(LANGUAGE_KEY) === 'en' ? 'en' : 'fa');
  const [view, setView] = useState('home');
  const [lessonId, setLessonId] = useState('target');
  const [futureIndex, setFutureIndex] = useState(0);
  const [draft, setDraft] = useState(null);
  const [note, setNote] = useState(() => loadData().validation.note || '');

  const lessons = lessonSets[language];
  const practice = practiceSets[language];
  const t = uiCopy[language];
  const fmt = (value) => new Intl.NumberFormat(language === 'fa' ? 'fa-IR' : 'en-US').format(value);
  const percentMark = language === 'fa' ? '٪' : '%';
  const backArrow = language === 'fa' ? '→' : '←';
  const lesson = lessons.find((item) => item.id === lessonId) || lessons[0];
  const stepIndex = data.progress[lesson.id]?.step || 0;
  const step = lesson.steps[stepIndex];
  const answer = data.answers[answerKey(lesson.id, stepIndex)];
  const completedCount = lessons.filter((item) => data.progress[item.id]?.completed).length;
  const discoverySkill = Math.round(lessons.reduce((sum, item) => sum + skillPercent(item, data), 0) / lessons.length);
  const isMainPage = ['home', 'learn', 'review-home', 'gym-home'].includes(view);

  useEffect(() => { localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); }, [data]);
  useEffect(() => {
    localStorage.setItem(LANGUAGE_KEY, language);
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'fa' ? 'rtl' : 'ltr';
    document.title = language === 'fa' ? 'ProductUP · یادگیری با تصمیم' : 'ProductUP · Learn by deciding';
  }, [language]);
  useEffect(() => { setDraft(null); }, [lessonId, stepIndex, view, data.progress.review?.stage, data.progress.gym?.stage]);

  const go = (next) => { setView(next); window.scrollTo(0, 0); };
  const toggleLanguage = () => setLanguage((current) => current === 'fa' ? 'en' : 'fa');
  const languageButton = <button className="lang-switch" onClick={toggleLanguage} aria-label={language === 'fa' ? 'Switch to English' : 'تغییر زبان به فارسی'}>{language === 'fa' ? 'EN' : 'فارسی'}</button>;
  const openLesson = (id) => { setLessonId(id); go(data.progress[id]?.completed ? 'recap' : 'lesson'); };
  const reset = () => {
    if (!window.confirm(t.resetConfirm)) return;
    localStorage.removeItem(STORAGE_KEY);
    setData(emptyData());
    setNote('');
    setLessonId('target');
    go('home');
  };
  const record = (value, correct, feedback, xp = 0) => {
    const key = answerKey(lesson.id, stepIndex);
    if (data.answers[key]) return;
    setData((prev) => ({
      ...prev,
      xp: prev.xp + xp,
      answers: { ...prev.answers, [key]: { value, correct, feedback, xp } },
      progress: { ...prev.progress, [lesson.id]: { ...(prev.progress[lesson.id] || {}), step: stepIndex } },
    }));
  };
  const nextStep = () => {
    if (stepIndex < lesson.steps.length - 1) {
      setData((prev) => ({ ...prev, progress: { ...prev.progress, [lesson.id]: { ...(prev.progress[lesson.id] || {}), step: stepIndex + 1 } } }));
      window.scrollTo(0, 0);
      return;
    }
    if (!data.progress[lesson.id]?.completed) {
      const today = new Date().toLocaleDateString('en-CA');
      const yesterday = new Date(Date.now() - 86400000).toLocaleDateString('en-CA');
      setData((prev) => ({
        ...prev,
        xp: prev.xp + 40,
        progress: { ...prev.progress, [lesson.id]: { step: lesson.steps.length, completed: true } },
        streak: { count: prev.streak.lastDate === today ? prev.streak.count : prev.streak.lastDate === yesterday ? prev.streak.count + 1 : 1, lastDate: today },
      }));
    }
    go('recap');
  };

  const shell = (body) => <div className={`app ${isMainPage ? '' : 'activity-view'}`} dir={language === 'fa' ? 'rtl' : 'ltr'}>
    <aside className="sidebar">
      <div className="brand"><span className="brand-mark">P</span><span className="brand-name">ProductUP</span></div>
      <nav className="nav" aria-label={language === 'fa' ? 'فهرست اصلی' : 'Main navigation'}>
        {[['home', '⌂', t.home], ['learn', '▦', t.learn], ['review-home', '↺', t.review], ['gym-home', '◇', t.gym]].map(([target, icon, label]) =>
          <button key={target} className={`nav-btn ${view === target ? 'active' : ''}`} onClick={() => go(target)}><span className="nav-icon">{icon}</span><span className="nav-label">{label}</span></button>
        )}
      </nav>
      <div className="sidebar-foot"><strong>{t.sidebarTitle}</strong>{t.sidebarText}</div>
    </aside>
    <main className="main">
      {isMainPage && <header className="topbar"><span className="topbar-name">ProductUP</span><div className="top-stats"><span className="stat-pill streak">◉ {fmt(data.streak.count)} {t.streak}</span><span className="stat-pill xp">✦ {fmt(data.xp)} XP</span>{languageButton}</div></header>}
      <div className="content">{body}</div>
    </main>
    {isMainPage && <nav className="mobile-nav" aria-label={language === 'fa' ? 'فهرست پایین' : 'Bottom navigation'}>
      {[['home', '⌂', t.home], ['learn', '▦', t.learn], ['review-home', '↺', t.review], ['gym-home', '◇', t.gym]].map(([target, icon, label]) =>
        <button key={target} onClick={() => go(target)} className={view === target ? 'active' : ''}><span>{icon}</span>{label}</button>
      )}
    </nav>}
  </div>;

  if (view === 'home') return shell(<>
    <div className="intro-grid">
      <section className="hero"><div className="hero-glow" /><div className="eyebrow">{t.heroEyebrow}</div><h1>{t.heroTitle}</h1><p>{t.heroText}</p><button className="btn btn-primary" onClick={() => go('learn')}>{completedCount ? t.continueLearning : t.startLearning}</button></section>
      <aside className="snapshot"><h2>{t.yourProgress}</h2><div className="snapshot-line"><span>{t.lessonsCompleted}</span><strong>{fmt(completedCount)}</strong></div><div className="snapshot-line"><span>{t.discoverySkill}</span><strong>{fmt(discoverySkill)}{percentMark}</strong></div><div className="meter" role="progressbar" aria-label={t.discoverySkill} aria-valuenow={discoverySkill} aria-valuemin="0" aria-valuemax="100"><span style={{ width: `${discoverySkill}%` }} /></div></aside>
    </div>
    <details className="demo-controls"><summary>{t.demoControls}</summary><button className="reset" onClick={reset}>{t.resetDemo}</button></details>
  </>);

  if (view === 'learn') return shell(<section className="learning-roadmap" aria-label={t.roadmapTitle}>
    <header className="roadmap-intro"><div><div className="roadmap-eyebrow">{t.roadmapEyebrow}</div><h1>{t.roadmapTitle}</h1><p>{t.roadmapText}</p></div><div className="roadmap-progress"><strong>{fmt(completedCount)}</strong><small>{t.completed}</small></div></header>
    <div className="roadmap-path">
      <div className="roadmap-chapter"><span className="chapter-index">{language === 'fa' ? '۳' : '03'}</span><div><span className="roadmap-eyebrow">{t.currentModule}</span><h2>{t.discoveryModule}</h2></div></div>
      {lessons.map((item, index) => {
        const progress = data.progress[item.id] || {};
        const attempted = Object.keys(data.answers).some((key) => key.startsWith(`${item.id}:`));
        const action = progress.completed ? t.viewRecap : attempted ? t.continueLesson : t.startLesson;
        return <div className={`route-row route-row-active tone-${index} ${progress.completed ? 'route-done' : ''}`} key={item.id}>
          <span className="route-node" aria-hidden="true">{progress.completed ? '✓' : language === 'fa' ? fmt(index + 1) : item.number}</span>
          <button className="route-card" onClick={() => openLesson(item.id)} aria-label={`${action}: ${item.title}`}><span className="route-meta">{item.category} <span>·</span> {item.time}</span><strong>{item.title}</strong><span className="route-topic">{item.topic}</span><span className="route-action">{progress.completed ? t.completed : action}</span></button>
        </div>;
      })}
      <div className="roadmap-divider"><span>{t.exploreNext}</span></div>
      {futureTopics[language].map(([module, title], index) => <div className="route-row route-row-upcoming" key={title}>
        <span className="route-node" aria-hidden="true">✦</span>
        <button className="route-card route-card-upcoming" onClick={() => { setFutureIndex(index); go('upcoming'); }} aria-label={title}><span className="route-meta">{module}</span><strong>{title}</strong></button>
      </div>)}
    </div>
  </section>);

  if (view === 'upcoming') {
    const [module, title] = futureTopics[language][futureIndex];
    return shell(<div className="lesson-shell"><div className="lesson-top"><button className="back-link" onClick={() => go('learn')}>{backArrow} {t.backToRoadmap}</button>{languageButton}</div><section className="activity future"><div className="activity-kicker">{module}</div><h1>{title}</h1><p>{t.comingSoon}</p><p>{t.comingSoonText}</p><div className="activity-actions"><button className="btn btn-dark" onClick={() => go('learn')}>{t.backToRoadmap}</button></div></section></div>);
  }

  if (view === 'review-home' || view === 'gym-home') {
    const kind = view === 'review-home' ? 'review' : 'gym';
    const mode = practice[kind];
    const progress = data.progress[kind] || { stage: 0, completed: false };
    return shell(<div className="lesson-shell"><div className="section-head"><div><div className="eyebrow">{kind === 'review' ? t.pillarReview : t.pillarGym}</div><h2>{mode.title}</h2></div></div><section className="activity future"><div className="activity-kicker">{progress.completed ? t.practiceComplete : t.ready}</div><h1>{kind === 'review' ? t.reviewHomeTitle : t.gymHomeTitle}</h1><p>{mode.intro}</p><div className="activity-actions"><button className="btn btn-dark" onClick={() => go(kind)}>{progress.completed ? t.viewResults : progress.stage ? t.continuePractice : t.startPractice}</button></div></section></div>);
  }

  if (view === 'review' || view === 'gym') {
    const mode = practice[view];
    const progress = data.progress[view] || { stage: 0, completed: false };
    const stageIndex = progress.stage || 0;
    const stage = mode.stages[stageIndex];
    const stageAnswer = data.answers[answerKey(view, stageIndex)];
    const submit = () => {
      if (draft === null || stageAnswer) return;
      const selected = stage.options[draft];
      setData((prev) => ({ ...prev, xp: prev.xp + (selected.correct ? 10 : 0), answers: { ...prev.answers, [answerKey(view, stageIndex)]: { value: draft, correct: !!selected.correct, xp: selected.correct ? 10 : 0 } }, progress: { ...prev.progress, [view]: { stage: stageIndex, completed: false } } }));
    };
    const continuePractice = () => {
      if (stageIndex < mode.stages.length - 1) setData((prev) => ({ ...prev, progress: { ...prev.progress, [view]: { ...prev.progress[view], stage: stageIndex + 1 } } }));
      else if (!progress.completed) setData((prev) => ({ ...prev, xp: prev.xp + 20, progress: { ...prev.progress, [view]: { stage: mode.stages.length, completed: true } } }));
      else setData((prev) => ({ ...prev, progress: { ...prev.progress, [view]: { stage: mode.stages.length, completed: true } } }));
      window.scrollTo(0, 0);
    };
    const previousPractice = () => { setData((prev) => ({ ...prev, progress: { ...prev.progress, [view]: { ...prev.progress[view], stage: stageIndex - 1 } } })); window.scrollTo(0, 0); };
    const reviewQuestions = () => { setData((prev) => ({ ...prev, progress: { ...prev.progress, [view]: { stage: mode.stages.length - 1, completed: true } } })); window.scrollTo(0, 0); };
    if (progress.completed && stageIndex >= mode.stages.length) return shell(<div className="lesson-shell">
      <div className="lesson-top"><button className="back-link" onClick={() => go(`${view}-home`)}>{backArrow} {t.backToSection} {mode.title}</button>{languageButton}</div>
      <div className="progress-track"><span style={{ width: '100%' }} /></div>
      <section className="activity"><div className="activity-kicker">{t.practiceComplete}</div><h1>{t.practiceRecapTitle}</h1><p>{view === 'review' ? t.reviewRecap : t.gymRecap}</p><div className="reward"><div><strong>+{fmt(20 + mode.stages.reduce((sum, _, index) => sum + (data.answers[answerKey(view, index)]?.xp || 0), 0))} XP</strong><span>{t.earnedPractice}</span></div></div><div className="activity-actions"><button className="btn btn-ghost" onClick={reviewQuestions}>{t.reviewQuestions}</button><button className="btn btn-dark" onClick={() => go(`${view}-home`)}>{t.backToSection} {mode.title}</button></div></section>
    </div>);
    return shell(<div className="lesson-shell">
      <div className="lesson-top"><button className="back-link" onClick={stageIndex > 0 ? previousPractice : () => go(`${view}-home`)}>{backArrow} {stageIndex > 0 ? t.previousQuestion : `${t.backToSection} ${mode.title}`}</button><div className="lesson-status"><span className="progress-count">{t.question} {fmt(stageIndex + 1)}</span>{languageButton}</div></div>
      <div className="progress-track" role="progressbar" aria-label={mode.title} aria-valuenow={stageIndex + 1} aria-valuemin="0" aria-valuemax={mode.stages.length}><span style={{ width: `${((stageIndex + 1) / mode.stages.length) * 100}%` }} /></div>
      <section className="activity"><div className="activity-kicker">{stage.kicker}</div><h1>{stage.title}</h1><p>{stage.body}</p><div className="prompt">{stage.prompt}</div>
          <ChoiceOptions options={stage.options} seed={`${view}:${stageIndex}`} answer={stageAnswer} draft={draft} onSelect={setDraft} />
        {stageAnswer ? <Feedback answer={stageAnswer} feedbackText={stage.options[stageAnswer.value]?.feedback || ''} onContinue={continuePractice} t={t} fmt={fmt} /> : <div className="activity-actions"><button className="btn btn-dark" disabled={draft === null} onClick={submit}>{t.submitDecision}</button></div>}
      </section>
    </div>);
  }

  if (view === 'recap') {
    const gained = lesson.steps.reduce((sum, _, index) => sum + (data.answers[answerKey(lesson.id, index)]?.xp || 0), 40);
    return shell(<div className="lesson-shell">
      <div className="lesson-top"><button className="back-link" onClick={() => go('home')}>{backArrow} {t.backHome}</button>{languageButton}</div>
      <div className="progress-track"><span style={{ width: '100%' }} /></div>
      <section className="activity"><div className="activity-kicker">{t.lessonComplete}</div><h1>{lesson.title}</h1><p>{t.lessonRecapText}</p><div className="reward"><div><strong>+{fmt(gained)} XP</strong><span>{t.earnedLesson}</span></div><div><strong>{fmt(skillPercent(lesson, data, false))}{percentMark} {language === 'fa' ? '←' : '→'} {fmt(skillPercent(lesson, data))}{percentMark}</strong><span>{lesson.skill}</span></div></div><div className="recap-takeaways">{lesson.takeaways.map((item) => <div key={item}>{item}</div>)}</div><div className="activity-actions"><button className="btn btn-ghost" onClick={() => go('home')}>{t.backHome}</button><button className="btn btn-dark" onClick={() => go('learn')}>{t.exploreLessons}</button></div>
        <details className="validation"><summary>{t.shareFeedback}</summary><h3>{t.weeklyIntent}</h3><div className="chip-row">{[['yes', t.definitely], ['maybe', t.maybe], ['no', t.probablyNot]].map(([id, label]) => <button key={id} className={`chip ${data.validation.intent === id ? 'selected' : ''}`} onClick={() => setData((prev) => ({ ...prev, validation: { ...prev.validation, intent: id } }))}>{label}</button>)}</div><label className="small-note" htmlFor="validation-note">{t.feedbackQuestion}</label><textarea id="validation-note" value={note} onChange={(event) => setNote(event.target.value)} placeholder={t.feedbackPlaceholder} /><div className="activity-actions"><button className="btn btn-soft" onClick={() => setData((prev) => ({ ...prev, validation: { ...prev.validation, note } }))}>{t.saveResponse}</button></div><div className="validation-status">{t.savedHere}</div></details>
      </section>
    </div>);
  }

  if (!step) return shell(<div className="lesson-shell"><p>{t.unavailable}</p><button className="btn btn-dark" onClick={() => go('learn')}>{t.backToLessons}</button></div>);
  let activity;
  if (step.type === 'concept') activity = <><div className="concept-rule">{step.chain.map((part, index) => <span key={part}>{part}{index < step.chain.length - 1 ? language === 'fa' ? ' ←' : ' →' : ''}</span>)}</div><div className="activity-actions"><button className="btn btn-dark" onClick={nextStep}>{t.applyConcept}</button></div></>;
  if (step.type === 'choice') activity = <>
    <div className="prompt">{step.prompt}</div><ChoiceOptions options={step.options} seed={`${lesson.id}:${stepIndex}`} answer={answer} draft={draft} onSelect={setDraft} />
    {answer ? <Feedback answer={answer} feedbackText={step.options[answer.value]?.feedback || ''} onContinue={nextStep} t={t} fmt={fmt} /> : <div className="activity-actions"><button className="btn btn-dark" disabled={draft === null} onClick={() => { const selected = step.options[draft]; record(draft, !!selected.correct, selected.feedback, selected.correct ? stepIndex === lesson.steps.length - 1 ? 15 : 10 : 0); }}>{t.submitDecision}</button></div>}
  </>;
  if (step.type === 'rank') {
    const order = answer?.value || (Array.isArray(draft) ? draft : step.items.map((item) => item.id));
    const itemMap = Object.fromEntries(step.items.map((item) => [item.id, item]));
    const move = (index, offset) => { const next = [...order]; [next[index], next[index + offset]] = [next[index + offset], next[index]]; setDraft(next); };
    activity = <><div className="prompt">{t.mostToLeast}</div><div>{order.map((id, index) => <div className="rank-row" key={id}><span className="rank-num">{fmt(index + 1)}</span><span className="rank-label">{itemMap[id].label}</span><span className="rank-controls"><button aria-label={`${t.moveUp}: ${itemMap[id].label}`} disabled={!!answer || index === 0} onClick={() => move(index, -1)}>↑</button><button aria-label={`${t.moveDown}: ${itemMap[id].label}`} disabled={!!answer || index === order.length - 1} onClick={() => move(index, 1)}>↓</button></span></div>)}</div>
      {answer ? <><div className="feedback-detail"><strong>{t.bestOrder}</strong><ol>{step.order.map((id) => <li key={id}>{itemMap[id].label} — {itemMap[id].detail}</li>)}</ol></div><Feedback answer={answer} feedbackText={step.feedback} onContinue={nextStep} t={t} fmt={fmt} /></> : <div className="activity-actions"><button className="btn btn-dark" onClick={() => { const correct = order.every((id, index) => id === step.order[index]); record(order, correct, step.feedback, correct ? 15 : 0); }}>{t.submitRanking}</button></div>}
    </>;
  }
  if (step.type === 'classify') {
    const choices = draft && !Array.isArray(draft) ? draft : {};
    const count = answer ? step.items.filter((item) => answer.value[item.id] === item.answerId).length : 0;
    activity = <><div className="prompt">{t.chooseCategory}</div>{step.items.map((item) => <div className="classify-row" key={item.id}><p>{item.text}</p><div className="chip-row">{step.categories.map((category, index) => <button key={category} disabled={!!answer} aria-pressed={choices[item.id] === step.categoryIds[index] || answer?.value[item.id] === step.categoryIds[index]} className={`chip ${(choices[item.id] === step.categoryIds[index] || answer?.value[item.id] === step.categoryIds[index]) ? 'selected' : ''}`} onClick={() => setDraft({ ...choices, [item.id]: step.categoryIds[index] })}>{category}</button>)}</div>{answer && <div className={`item-feedback ${answer.value[item.id] === item.answerId ? 'good' : ''}`}>{answer.value[item.id] === item.answerId ? '✓' : `${t.bestFit}: ${item.answer}.`} {item.why}</div>}</div>)}
      {answer ? <Feedback answer={answer} feedbackText={`${fmt(count)} ${t.placedWell}.`} onContinue={nextStep} t={t} fmt={fmt} /> : <div className="activity-actions"><button className="btn btn-dark" disabled={step.items.some((item) => !choices[item.id])} onClick={() => { const result = step.items.filter((item) => choices[item.id] === item.answerId).length; record(choices, result === step.items.length, '', result === step.items.length ? 15 : result * 2); }}>{t.checkMap}</button></div>}
    </>;
  }
  if (step.type === 'multi') {
    const selected = Array.isArray(draft) ? draft : [];
    activity = <><div className="prompt">{t.chooseExactly} {fmt(step.limit)}</div><div className="options">{optionOrder(step.options.length, `${lesson.id}:${stepIndex}:multi`).map((optionIndex) => {
      const option = step.options[optionIndex];
      return <div key={option.id}><button disabled={!!answer} aria-pressed={selected.includes(option.id) || answer?.value.includes(option.id)} className={`option ${(selected.includes(option.id) || answer?.value.includes(option.id)) ? 'selected' : ''}`} onClick={() => setDraft(selected.includes(option.id) ? selected.filter((id) => id !== option.id) : selected.length < step.limit ? [...selected, option.id] : selected)}>{option.label}</button>{answer && <div className="item-feedback">{step.correct.includes(option.id) ? t.useful : t.lessUseful}: {option.why}</div>}</div>;
    })}</div>
      {answer ? <Feedback answer={answer} feedbackText={answer.correct ? t.multiCorrect : t.multiIncorrect} onContinue={nextStep} t={t} fmt={fmt} /> : <div className="activity-actions"><button className="btn btn-dark" disabled={selected.length !== step.limit} onClick={() => { const correct = step.correct.every((id) => selected.includes(id)); record(selected, correct, '', correct ? 15 : 0); }}>{t.submitEvidence}</button></div>}
    </>;
  }
  return shell(<div className="lesson-shell">
    <div className="lesson-top"><button className="back-link" onClick={() => go('learn')}>{backArrow} {t.backToLessons}</button><div className="lesson-status"><span className="progress-count">{t.step} {fmt(stepIndex + 1)}</span>{languageButton}</div></div>
    <div className="progress-track" role="progressbar" aria-label={t.step} aria-valuenow={stepIndex + 1} aria-valuemin="0" aria-valuemax={lesson.steps.length}><span style={{ width: `${((stepIndex + 1) / lesson.steps.length) * 100}%` }} /></div>
    <section className="activity"><div className="activity-kicker">{step.kicker}</div><h1>{step.title}</h1><p>{step.body}</p>{step.facts && <div className="scenario-facts">{step.facts.map((fact) => <div key={fact}>{fact}</div>)}</div>}{activity}</section>
  </div>);
}
