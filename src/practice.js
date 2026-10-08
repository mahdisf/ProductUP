export const practice = {
  review: {
    title: 'Review', intro: 'Recall the decision, then apply it in a different setting.', skill: 'Concept recall',
    stages: [
      {
        kicker: 'LEVEL 1 · OPPORTUNITY JUDGMENT', title: 'Does a loud request deserve the target?',
        body: 'Goal: 60-day retention. Exports are requested by 45% of active accounts. New teams failing their first schedule churn at twice the usual rate.',
        prompt: 'Which opportunity should the PM investigate first?',
        options: [
          { label: 'First-schedule completion among new teams', correct: true, feedback: 'It affects the target cohort and has a direct observed relationship to the retention outcome.' },
          { label: 'Export customization because more users ask for it', feedback: 'Request volume matters, but these accounts are active and the connection to new-team retention is weak.' },
          { label: 'Both equally, without choosing a target', feedback: 'Splitting the focus avoids using the retention evidence to set a clear target.' },
        ],
      },
      {
        kicker: 'LEVEL 2 · ASSUMPTION TESTING', title: 'What would invalidate the solution?',
        body: 'Automatic meeting summaries are proposed. Transcription works. The goal is faster follow-through on decisions.',
        prompt: 'Which assumption should the team test first?',
        options: [
          { label: 'Teams will act on decisions surfaced in the summary', correct: true, feedback: 'If the summary changes no follow-through behavior, better transcription alone will not achieve the goal.' },
          { label: 'The summary can use the company’s brand colors', feedback: 'Brand presentation is editable and unlikely to invalidate the core value.' },
          { label: 'Users prefer a Monday rather than Tuesday email', feedback: 'Timing may affect opens, but it cannot establish whether summaries change decisions.' },
        ],
      },
    ],
  },
  gym: {
    title: 'PM Gym', intro: 'Make a product call as new evidence and constraints appear.', skill: 'Product judgment',
    stages: [
      {
        kicker: 'LEVEL 1 · DIAGNOSE', title: 'Growth is hiding a retention problem.',
        body: 'New users +20%. Orders +8%. Retention −17%. Late-delivery tickets +35%. Growth wants more ad spend.',
        prompt: 'What should you do in the next sprint?',
        options: [
          { label: 'Compare retention by delivery experience and interview affected customers', correct: true, feedback: 'This tests a plausible cause of churn before scaling acquisition into a leaky experience.' },
          { label: 'Increase ad spend because orders are rising', feedback: 'Orders can rise while more customers leave. Scaling acquisition before investigating churn may increase waste.' },
          { label: 'Build a loyalty program to offset late deliveries', feedback: 'A loyalty feature could mask symptoms without fixing the delivery experience driving complaints.' },
        ],
      },
      {
        kicker: 'LEVEL 2 · TRADE-OFF', title: 'One sprint of capacity. Two credible paths.',
        body: 'Late first deliveries predict churn. Ops can pilot a dispatch fix in one city now. Engineering offers a six-week tracking rebuild.',
        prompt: 'Which move gives the team the strongest next decision?',
        options: [
          { label: 'Pilot the dispatch change and measure first-delivery timeliness and retention', correct: true, feedback: 'The pilot tests the suspected cause with limited cost and a measurable outcome before the larger rebuild.' },
          { label: 'Commit the sprint to tracking because better data is always useful', feedback: 'The rebuild has value, but it does not directly test or resolve the delivery failure already linked to churn.' },
          { label: 'Roll out the dispatch change everywhere immediately', feedback: 'A broad rollout skips a controlled signal on whether the change improves timeliness and downstream retention.' },
        ],
      },
    ],
  },
};
