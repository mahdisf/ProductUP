import { useEffect, useState } from 'react';
import { lessons } from './lessons.js';
import { practice } from './practice.js';

const STORAGE_KEY = 'product-practice-v1';
const emptyData = () => ({ xp: 0, answers: {}, progress: {}, streak: { count: 0, lastDate: '' }, validation: { intent: '', note: '' } });
function loadData() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (!saved || typeof saved !== 'object') return emptyData();
    return { ...emptyData(), ...saved, answers: saved.answers || {}, progress: saved.progress || {}, streak: saved.streak || { count: 0, lastDate: '' }, validation: saved.validation || { intent: '', note: '' } };
  } catch { return emptyData(); }
}
const answerKey = (id, index) => `${id}:${index}`;
const percent = (lesson, data, includeCompletion = true) => {
  const correct = lesson.steps.filter((_, index) => data.answers[answerKey(lesson.id, index)]?.correct).length;
  return Math.min(94, lesson.baseSkill + correct * 2 + (includeCompletion && data.progress[lesson.id]?.completed ? 9 : 0));
};

const upcomingLessons = [
  { module: '03 · Discovery & Validation', category: 'Validation', title: 'Behavioral evidence vs stated preference' },
  { module: '03 · Discovery & Validation', category: 'Validation', title: 'Evidence strength ladder' },
  { module: '04 · UX & Product Design', category: 'Experience Mapping', title: 'Service blueprint' },
  { module: '05 · Product Analytics', category: 'North Star', title: 'North Star input metrics' },
  { module: '06 · Experimentation', category: 'A/B Testing', title: 'Minimum detectable effect' },
  { module: '07 · Product Strategy', category: 'Strategy Foundations', title: 'Strategic choices and trade-offs' },
  { module: '08 · Prioritization', category: 'Prioritization Basics', title: 'When not to follow the RICE ranking' },
  { module: '09 · Product Delivery', category: 'Release', title: 'Progressive rollout' },
  { module: '10 · Technical Fluency', category: 'APIs', title: 'API versioning and backward compatibility' },
];

function LockIcon() {
  return <svg aria-hidden="true" viewBox="0 0 24 24" fill="none"><rect x="5.5" y="10.5" width="13" height="10" rx="2" stroke="currentColor" strokeWidth="2" /><path d="M8.5 10V7a3.5 3.5 0 0 1 7 0v3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>;
}

export default function App() {
  const [data, setData] = useState(loadData);
  const [view, setView] = useState('home');
  const [lessonId, setLessonId] = useState('target');
  const [draft, setDraft] = useState(null);
  const [note, setNote] = useState('');
  const lesson = lessons.find((item) => item.id === lessonId) || lessons[0];
  const stepIndex = data.progress[lesson.id]?.step || 0;
  const step = lesson.steps[stepIndex];
  const answer = data.answers[answerKey(lesson.id, stepIndex)];
  const completedCount = lessons.filter((item) => data.progress[item.id]?.completed).length;
  const discoverySkill = Math.round((percent(lessons[0], data) + percent(lessons[1], data) + percent(lessons[2], data)) / 3);
  const completedFirst = completedCount > 0;
  const isMainPage = ['home', 'learn', 'review-home', 'gym-home'].includes(view);
  useEffect(() => { localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); }, [data]);
  useEffect(() => { setDraft(null); }, [lessonId, stepIndex, view, data.progress.review?.stage, data.progress.gym?.stage]);

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
  const openLesson = (id) => {
    setLessonId(id);
    setView(data.progress[id]?.completed ? 'recap' : 'lesson');
    window.scrollTo(0, 0);
  };
  const go = (next) => { setView(next); window.scrollTo(0, 0); };
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
  const reset = () => {
    if (!window.confirm('Reset all demo progress and answers on this device?')) return;
    localStorage.removeItem(STORAGE_KEY);
    setData(emptyData());
    setLessonId('target');
    go('home');
  };

  const roadmap = <section className="learning-roadmap" aria-label="Advanced learning roadmap">
    <header className="roadmap-intro">
      <div><div className="roadmap-eyebrow">ADVANCED PATH · MODULE 03</div><h1>Your learning path</h1><p>Choose a decision. Build the skill. Move forward.</p></div>
      <div className="roadmap-progress"><strong>{completedCount}<span> / 3</span></strong><small>lessons complete</small><div className="roadmap-meter" role="progressbar" aria-label="Playable lessons completed" aria-valuenow={completedCount} aria-valuemin="0" aria-valuemax="3"><span style={{ width: `${(completedCount / 3) * 100}%` }} /></div></div>
    </header>
    <div className="roadmap-path"><div className="roadmap-chapter"><span className="chapter-index">03</span><div><span className="roadmap-eyebrow">CURRENT MODULE</span><h2>Product Discovery & Validation</h2></div><span className="chapter-count">3 playable</span></div>
    {lessons.map((item, index) => {
    const progress = data.progress[item.id] || {};
    const attempted = Object.keys(data.answers).filter((key) => key.startsWith(`${item.id}:`)).length;
    const action = progress.completed ? 'View recap' : attempted ? 'Continue lesson' : 'Start lesson';
    return <div className={`route-row route-row-active tone-${index} ${progress.completed ? 'route-done' : ''}`} key={item.id}>
      <span className="route-node" aria-hidden="true">{progress.completed ? '✓' : item.number}</span>
      <button className="route-card" onClick={() => openLesson(item.id)} aria-label={`${action}: ${item.title}`}>
        <span className="route-meta">{item.category} <span>·</span> {item.time}</span>
        <strong>{item.title}</strong>
        <span className="route-topic">{item.topic}</span>
        <span className="route-action">{progress.completed ? 'Completed · View recap' : attempted ? `Continue · ${attempted} of ${item.steps.length} steps` : 'Start lesson'}</span>
      </button>
    </div>;
  })}
    <div className="roadmap-divider"><span>EXPLORE WHAT COMES NEXT</span><small>Preview only</small></div>
    {upcomingLessons.map((item) => <div className="route-row route-row-locked" key={`${item.module}-${item.title}`}>
      <span className="route-node" aria-hidden="true"><LockIcon /></span>
      <div className="route-card route-card-locked" aria-label={`${item.title}, locked lesson`}>
        <span className="route-meta">{item.module} <span>·</span> {item.category}</span>
        <strong>{item.title}</strong>
        <span className="route-lock"><LockIcon /> Not available yet</span>
      </div>
    </div>)}
    </div>
  </section>;

  const shell = (body) => <div className={`app ${isMainPage ? '' : 'activity-view'}`}>
    <aside className="sidebar"><div className="brand"><span className="brand-mark">P</span><span className="brand-name">ProductUP</span></div>
      <nav className="nav" aria-label="Main navigation">
        <button className={`nav-btn ${view === 'home' ? 'active' : ''}`} onClick={() => go('home')}><span className="nav-icon">⌂</span><span className="nav-label">Home</span></button>
        <button className={`nav-btn ${view === 'learn' ? 'active' : ''}`} onClick={() => go('learn')}><span className="nav-icon">▦</span><span className="nav-label">Learn</span></button>
        <button className={`nav-btn ${view === 'review-home' ? 'active' : ''}`} onClick={() => go('review-home')}><span className="nav-icon">↺</span><span className="nav-label">Review</span></button>
        <button className={`nav-btn ${view === 'gym-home' ? 'active' : ''}`} onClick={() => go('gym-home')}><span className="nav-icon">◇</span><span className="nav-label">PM Gym</span></button>
      </nav><div className="sidebar-foot"><strong>Practice, then learn.</strong>Short product decisions with immediate feedback.</div>
    </aside>
    <main className="main">{isMainPage && <header className="topbar"><span className="topbar-name">ProductUP</span><div className="top-stats"><span className="stat-pill">◉ {data.streak.count} day streak</span><span className="stat-pill xp">✦ {data.xp} XP</span></div></header>}<div className="content">{body}</div></main>
    {isMainPage && <nav className="mobile-nav" aria-label="Bottom navigation"><button onClick={() => go('home')} className={view === 'home' ? 'active' : ''}><span>⌂</span>Home</button><button onClick={() => go('learn')} className={view === 'learn' ? 'active' : ''}><span>▦</span>Learn</button><button onClick={() => go('review-home')} className={view === 'review-home' ? 'active' : ''}><span>↺</span>Review</button><button onClick={() => go('gym-home')} className={view === 'gym-home' ? 'active' : ''}><span>◇</span>PM Gym</button></nav>}
  </div>;

  if (view === 'home') return shell(<>
    <div className="intro-grid"><section className="hero"><div className="hero-glow" /><div className="eyebrow">THE PRODUCT DECISION LAB</div><h1>Practice Product Management, one decision at a time.</h1><p>Short scenarios. Real trade-offs. Immediate feedback.</p><button className="btn btn-primary" onClick={() => go('learn')}>{completedFirst ? 'Continue learning' : 'Start learning'}</button></section>
      <aside className="snapshot"><h2>Your progress</h2><div className="snapshot-line"><span>Lessons completed</span><strong>{completedCount} / 3</strong></div><div className="snapshot-line"><span>Discovery skill</span><strong>{discoverySkill}%</strong></div><div className="meter" role="progressbar" aria-label="Discovery skill" aria-valuenow={discoverySkill} aria-valuemin="0" aria-valuemax="100"><span style={{ width: `${discoverySkill}%` }} /></div></aside></div>
    <details className="demo-controls"><summary>Demo controls</summary><button className="reset" onClick={reset}>Reset demo progress</button></details>
  </>);

  if (view === 'learn') return shell(<>
    {roadmap}
  </>);

  if (view === 'review-home' || view === 'gym-home') {
    const kind = view === 'review-home' ? 'review' : 'gym';
    const mode = practice[kind];
    const progress = data.progress[kind] || { stage: 0, completed: false };
    return shell(<div className="lesson-shell"><div className="section-head"><div><div className="eyebrow">{kind === 'review' ? 'PILLAR 02' : 'PILLAR 03'}</div><h2>{mode.title}</h2></div><p>2 questions</p></div><section className="activity future"><div className="activity-kicker">{progress.completed ? 'PRACTICE COMPLETE' : `QUESTION ${(progress.stage || 0) + 1} READY`}</div><h1>{kind === 'review' ? 'Keep the judgment sharp.' : 'Make the product call.'}</h1><p>{mode.intro}</p><div className="activity-actions"><button className="btn btn-dark" onClick={() => go(kind)}>{progress.completed ? 'View results' : progress.stage ? 'Continue practice' : 'Start practice'}</button></div></section></div>);
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
      setData((prev) => ({ ...prev, xp: prev.xp + (selected.correct ? 10 : 0), answers: { ...prev.answers, [answerKey(view, stageIndex)]: { value: draft, correct: !!selected.correct, feedback: selected.feedback, xp: selected.correct ? 10 : 0 } }, progress: { ...prev.progress, [view]: { stage: stageIndex, completed: false } } }));
    };
    const continuePractice = () => {
      if (stageIndex < mode.stages.length - 1) {
        setData((prev) => ({ ...prev, progress: { ...prev.progress, [view]: { ...prev.progress[view], stage: stageIndex + 1 } } }));
      } else if (!progress.completed) {
        setData((prev) => ({ ...prev, xp: prev.xp + 20, progress: { ...prev.progress, [view]: { stage: mode.stages.length, completed: true } } }));
      } else {
        setData((prev) => ({ ...prev, progress: { ...prev.progress, [view]: { stage: mode.stages.length, completed: true } } }));
      }
      window.scrollTo(0, 0);
    };
    const previousPractice = () => {
      setData((prev) => ({ ...prev, progress: { ...prev.progress, [view]: { ...prev.progress[view], stage: stageIndex - 1 } } }));
      window.scrollTo(0, 0);
    };
    const reviewQuestions = () => {
      setData((prev) => ({ ...prev, progress: { ...prev.progress, [view]: { stage: mode.stages.length - 1, completed: true } } }));
      window.scrollTo(0, 0);
    };
    if (progress.completed && stageIndex >= mode.stages.length) return shell(
      <div className="lesson-shell">
        <div className="lesson-top"><button className="back-link" onClick={() => go(`${view}-home`)}>← Back to {mode.title}</button><span className="progress-count">2 of 2 questions complete</span></div>
        <div className="progress-track"><span style={{ width: '100%' }} /></div>
        <section className="activity">
          <div className="activity-kicker">{mode.title.toUpperCase()} COMPLETE</div>
          <h1>Two decisions, one stronger habit.</h1>
          <p>{view === 'review' ? 'You revisited opportunity judgment and assumption testing in fresh settings.' : 'You diagnosed a retention problem and made a capacity trade-off using new evidence.'}</p>
          <div className="reward"><div><strong>+{20 + mode.stages.reduce((total, _, index) => total + (data.answers[answerKey(view, index)]?.xp || 0), 0)} XP</strong><span>Earned across two questions</span></div><div><strong>2 / 2</strong><span>Questions complete</span></div></div>
          <div className="activity-actions"><button className="btn btn-ghost" onClick={reviewQuestions}>Review questions</button><button className="btn btn-dark" onClick={() => go(`${view}-home`)}>Back to {mode.title}</button></div>
        </section>
      </div>
    );
    return shell(
      <div className="lesson-shell">
        <div className="lesson-top"><button className="back-link" onClick={stageIndex > 0 ? previousPractice : () => go(`${view}-home`)}>{stageIndex > 0 ? '← Previous question' : `← Back to ${mode.title}`}</button><span className="progress-count">Question {stageIndex + 1} of 2</span></div>
        <div className="progress-track" role="progressbar" aria-label={`${mode.title} progress`} aria-valuenow={stageIndex + 1} aria-valuemin="0" aria-valuemax="2"><span style={{ width: `${((stageIndex + 1) / 2) * 100}%` }} /></div>
        <section className="activity">
          <div className="activity-kicker">{stage.kicker}</div><h1>{stage.title}</h1><p>{stage.body}</p><div className="prompt">{stage.prompt}</div>
          <div className="options">{stage.options.map((option, index) => (!stageAnswer || stageAnswer.value === index) && <button key={option.label} disabled={!!stageAnswer} aria-pressed={draft === index || stageAnswer?.value === index} className={`option ${(draft === index || stageAnswer?.value === index) ? 'selected' : ''} ${stageAnswer && stageAnswer.value === index ? stageAnswer.correct ? 'correct' : 'incorrect' : ''}`} onClick={() => setDraft(index)}><span className="option-letter">{String.fromCharCode(65 + index)}</span>{option.label}</button>)}</div>
          {stageAnswer ? <Feedback answer={stageAnswer} onContinue={continuePractice} /> : <div className="activity-actions"><button className="btn btn-dark" disabled={draft === null} onClick={submit}>Submit decision</button></div>}
        </section>
      </div>
    );
  }

  if (view === 'recap') {
    const gained = lesson.steps.reduce((total, _, index) => total + (data.answers[answerKey(lesson.id, index)]?.xp || 0), 40);
    return shell(<div className="lesson-shell"><div className="lesson-top"><button className="back-link" onClick={() => go('home')}>← Back to Home</button><span className="progress-count">Lesson complete</span></div><div className="progress-track"><span style={{ width: '100%' }} /></div><section className="activity"><div className="activity-kicker">LESSON COMPLETE · {lesson.category}</div><h1>{lesson.title}</h1><p>Practice complete. You made decisions with incomplete evidence and saw how stronger product judgment changes the call.</p><div className="reward"><div><strong>+{gained} XP</strong><span>Earned in this lesson</span></div><div><strong>{percent(lesson, data, false)}% → {percent(lesson, data)}%</strong><span>{lesson.skill}</span></div></div><div className="recap-takeaways">{lesson.takeaways.map((item) => <div key={item}>{item}</div>)}</div><div className="activity-actions"><button className="btn btn-ghost" onClick={() => go('home')}>Back to Home</button><button className="btn btn-dark" onClick={() => go('learn')}>Explore lessons</button></div>
      {completedFirst && <details className="validation"><summary>Share feedback on this lesson</summary><h3>Would you practice this way each week?</h3><div className="chip-row">{['Definitely', 'Maybe', 'Probably not'].map((option) => <button key={option} className={`chip ${data.validation.intent === option ? 'selected' : ''}`} onClick={() => setData((prev) => ({ ...prev, validation: { ...prev.validation, intent: option } }))}>{option}</button>)}</div><label className="small-note" htmlFor="validation-note">What would make this more useful? (optional)</label><textarea id="validation-note" value={note} onChange={(event) => setNote(event.target.value)} placeholder="One thing you would change…" /><div className="activity-actions"><button className="btn btn-soft" onClick={() => { setData((prev) => ({ ...prev, validation: { ...prev.validation, note } })); }}>Save response</button></div><div className="validation-status">Responses are saved on this device only.</div></details>}
    </section></div>);
  }

  if (!step) return shell(<div className="lesson-shell"><p>Lesson state unavailable.</p><button className="btn btn-dark" onClick={() => go('home')}>Back to Home</button></div>);
  let activity;
  if (step.type === 'concept') activity = <><div className="concept-rule">{step.chain.map((part, index) => <span key={part}>{part}{index < step.chain.length - 1 ? ' →' : ''}</span>)}</div><div className="activity-actions"><button className="btn btn-dark" onClick={nextStep}>Apply the concept</button></div></>;
  if (step.type === 'choice') activity = <>
    <div className="prompt">{step.prompt}</div><div className="options">{step.options.map((option, index) => (!answer || answer.value === index) && <button key={option.label} disabled={!!answer} aria-pressed={draft === index || answer?.value === index} className={`option ${(draft === index || answer?.value === index) ? 'selected' : ''} ${answer && answer.value === index ? answer.correct ? 'correct' : 'incorrect' : ''}`} onClick={() => setDraft(index)}><span className="option-letter">{String.fromCharCode(65 + index)}</span>{option.label}</button>)}</div>
    {answer ? <Feedback answer={answer} onContinue={nextStep} /> : <div className="activity-actions"><button className="btn btn-dark" disabled={draft === null} onClick={() => { const selected = step.options[draft]; record(draft, !!selected.correct, selected.feedback, selected.correct ? stepIndex === lesson.steps.length - 1 ? 15 : 10 : 0); }}>Submit decision</button></div>}
  </>;
  if (step.type === 'rank') {
    const order = Array.isArray(draft) ? draft : step.items.map((item) => item.id);
    const itemMap = Object.fromEntries(step.items.map((item) => [item.id, item]));
    const move = (index, offset) => { const next = [...order]; [next[index], next[index + offset]] = [next[index + offset], next[index]]; setDraft(next); };
    activity = <><div className="prompt">Most useful → least useful</div><div>{order.map((id, index) => <div className="rank-row" key={id}><span className="rank-num">{index + 1}</span><span className="rank-label">{itemMap[id].label}</span><span className="rank-controls"><button aria-label={`Move ${itemMap[id].label} up`} disabled={!!answer || index === 0} onClick={() => move(index, -1)}>↑</button><button aria-label={`Move ${itemMap[id].label} down`} disabled={!!answer || index === order.length - 1} onClick={() => move(index, 1)}>↓</button></span></div>)}</div>
      {answer ? <><div className="feedback-detail"><strong>Expert order</strong><ol>{step.order.map((id) => <li key={id}>{itemMap[id].label} — {itemMap[id].detail}</li>)}</ol></div><Feedback answer={answer} onContinue={nextStep} /></> : <div className="activity-actions"><button className="btn btn-dark" onClick={() => { const correct = order.every((id, index) => id === step.order[index]); record(order, correct, step.feedback, correct ? 15 : 0); }}>Submit ranking</button></div>}
    </>;
  }
  if (step.type === 'classify') {
    const choices = draft && !Array.isArray(draft) ? draft : {};
    activity = <><div className="prompt">Choose one lens for each signal</div>{step.items.map((item) => <div className="classify-row" key={item.id}><p>{item.text}</p><div className="chip-row">{step.categories.map((category) => <button key={category} disabled={!!answer} aria-pressed={choices[item.id] === category || answer?.value[item.id] === category} className={`chip ${(choices[item.id] === category || answer?.value[item.id] === category) ? 'selected' : ''}`} onClick={() => setDraft({ ...choices, [item.id]: category })}>{category}</button>)}</div>{answer && <div className={`item-feedback ${answer.value[item.id] === item.answer ? 'good' : ''}`}>{answer.value[item.id] === item.answer ? '✓' : `Best fit: ${item.answer}.`} {item.why}</div>}</div>)}
      {answer ? <Feedback answer={answer} onContinue={nextStep} /> : <div className="activity-actions"><button className="btn btn-dark" disabled={step.items.some((item) => !choices[item.id])} onClick={() => { const count = step.items.filter((item) => choices[item.id] === item.answer).length; record(choices, count === step.items.length, `${count} of ${step.items.length} signals placed well. Each lens changes the investment case.`, count === step.items.length ? 15 : count * 2); }}>Check the map</button></div>}
    </>;
  }
  if (step.type === 'multi') {
    const selected = Array.isArray(draft) ? draft : [];
    activity = <><div className="prompt">Choose exactly {step.limit}</div><div className="options">{step.options.map((option, index) => <div key={option.id}><button disabled={!!answer} aria-pressed={selected.includes(option.id) || answer?.value.includes(option.id)} className={`option ${(selected.includes(option.id) || answer?.value.includes(option.id)) ? 'selected' : ''}`} onClick={() => setDraft(selected.includes(option.id) ? selected.filter((id) => id !== option.id) : selected.length < step.limit ? [...selected, option.id] : selected)}><span className="option-letter">{selected.includes(option.id) || answer?.value.includes(option.id) ? '✓' : String.fromCharCode(65 + index)}</span>{option.label}</button>{answer && <div className="item-feedback">{step.correct.includes(option.id) ? 'Useful: ' : 'Less useful: '}{option.why}</div>}</div>)}</div>
      {answer ? <Feedback answer={answer} onContinue={nextStep} /> : <div className="activity-actions"><button className="btn btn-dark" disabled={selected.length !== step.limit} onClick={() => { const correct = step.correct.every((id) => selected.includes(id)); record(selected, correct, correct ? 'These two signals would most change the investment decision.' : 'Prioritize evidence that resolves value and reachable demand before feature details.', correct ? 15 : 0); }}>Submit evidence</button></div>}
    </>;
  }

  return shell(<div className="lesson-shell"><div className="lesson-top"><button className="back-link" onClick={() => go('learn')}>← Back to lessons</button><span className="progress-count">Step {stepIndex + 1} of {lesson.steps.length}</span></div><div className="progress-track" role="progressbar" aria-label="Lesson progress" aria-valuenow={stepIndex + 1} aria-valuemin="0" aria-valuemax={lesson.steps.length}><span style={{ width: `${((stepIndex + 1) / lesson.steps.length) * 100}%` }} /></div><section className="activity"><div className="activity-kicker">{step.kicker}</div><h1>{step.title}</h1><p>{step.body}</p>{step.facts && <div className="scenario-facts">{step.facts.map((fact) => <div key={fact}>{fact}</div>)}</div>}{activity}</section></div>);
}

function Feedback({ answer, onContinue }) {
  return <><div className={`feedback ${answer.correct ? '' : 'miss'}`} role="status"><strong>{answer.correct ? `Strong decision · +${answer.xp} XP` : answer.xp ? `A useful partial read · +${answer.xp} XP` : 'Not quite'}</strong><p>{answer.feedback}</p></div><div className="activity-actions"><button className="btn btn-dark" onClick={onContinue}>Continue</button></div></>;
}
