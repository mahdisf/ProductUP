export const lessons = [
  {
    id: 'target', number: '01', title: 'Choosing a Target Opportunity', topic: 'Opportunity Solution Tree', category: 'Problem Discovery', time: '6 min', skill: 'Opportunity judgment', baseSkill: 48,
    takeaways: ['A target opportunity should connect to the desired outcome.', 'Compare behavioral evidence with what users say.', 'Change the target when the outcome or segment changes.'],
    steps: [
      {
        type: 'choice', kicker: 'SCENARIO · FIRST INSTINCT', title: 'Which problem comes first?',
        body: 'Your project tool needs better 90-day team retention. You can investigate one problem this sprint.',
        facts: ['New admins stall during setup.', 'Managers lack project visibility.', 'Teammates mute noisy alerts.', 'Power users want custom dashboards.'],
        prompt: 'Which opportunity would you investigate first?',
        options: [
          { label: 'First workspace setup', correct: true, feedback: 'This is the strongest starting hypothesis. It occurs before a team can establish a habit, though you still need evidence linking it to 90-day retention.' },
          { label: 'Manager reporting', feedback: 'Managers may control renewal decisions, so this is plausible. First check whether teams that lack reports actually leave more often.' },
          { label: 'Notification overload', feedback: 'Frequent complaints deserve attention, but active users can complain and still remain. The link to 90-day team retention is unknown.' },
          { label: 'Dashboard customization', feedback: 'Requests from power users can be loud. They represent teams already engaged with the product, making this a weaker first retention hypothesis.' },
        ],
      },
      {
        type: 'concept', kicker: 'MICRO CONCEPT', title: 'Follow the outcome down the tree.',
        body: 'An Opportunity Solution Tree starts with the outcome. Choose a customer problem that could move it. Solutions and experiments come later.',
        chain: ['Desired outcome', 'Opportunity', 'Solution', 'Experiment'],
      },
      {
        type: 'choice', kicker: 'NEW EVIDENCE', title: 'The data changes the conversation.',
        body: 'Research now links each problem to behavior. The goal is still overall 90-day team retention.',
        facts: ['Setup: 42% of new admins; 2.1× higher churn.', 'Reporting: 17% of managers, mostly large accounts.', 'Alerts: 31% complain; churn barely differs.', 'Dashboards: requested by 8% of teams.'],
        prompt: 'What becomes the target opportunity?',
        options: [
          { label: 'Reduce first-workspace setup friction', correct: true, feedback: 'The problem is common at the vulnerable moment and has the clearest observed connection to the retention outcome.' },
          { label: 'Improve reporting for managers', feedback: 'This may matter for enterprise revenue, but the evidence here is narrower and less connected to the stated overall retention goal.' },
          { label: 'Reduce notifications for active users', feedback: 'High mention frequency is not enough. The affected teams do not show meaningfully higher churn.' },
          { label: 'Expand dashboard customization', feedback: 'This is a valid power-user need, but it touches a small engaged segment and has weak retention evidence.' },
        ],
      },
      {
        type: 'rank', kicker: 'INTERACTIVE EXERCISE', title: 'Rank the evidence you would trust.',
        body: 'Order these signals by usefulness for a 90-day retention decision.',
        items: [
          { id: 'quotes', label: 'A set of vivid interview quotes', detail: 'Shows how the pain feels, but not its reach.' },
          { id: 'requests', label: 'Number of requested solutions', detail: 'Shows demand for an idea, not the underlying opportunity.' },
          { id: 'cohort', label: 'Retention by affected vs. unaffected teams', detail: 'Connects the problem to the desired outcome.' },
          { id: 'behavior', label: 'Observed setup failure in the target segment', detail: 'Confirms frequency and where the friction occurs.' },
        ],
        order: ['cohort', 'behavior', 'quotes', 'requests'],
        feedback: 'Cohort behavior is closest to the outcome. Observation establishes reach and context. Quotes add meaning. Requests for solutions are the weakest proxy.',
      },
      {
        type: 'choice', kicker: 'HARDER SCENARIO', title: 'The desired outcome shifts.',
        body: 'The goal changes to enterprise revenue retention. Reporting gaps touch 17% of managers but 38% of revenue at risk. Setup trouble remains common in small teams.',
        prompt: 'What should you do with the opportunity target?',
        options: [
          { label: 'Reassess the target using enterprise cohorts and reporting behavior', correct: true, feedback: 'The outcome and target segment changed. Reopen the tree and test whether reporting friction drives expansion or churn in valuable accounts.' },
          { label: 'Keep setup as the target because its reach is larger', feedback: 'Reach across all teams no longer matches the enterprise revenue goal. A broad problem can be the wrong target for a narrower outcome.' },
          { label: 'Commit to reporting immediately because revenue at risk is high', feedback: 'The revenue signal is strong enough to investigate, not enough to skip causal validation or assume a reporting feature is the right response.' },
          { label: 'Split the sprint evenly between both opportunities', feedback: 'Splitting limited capacity avoids the decision. First compare the opportunities against the revised outcome and evidence.' },
        ],
      },
      {
        type: 'choice', kicker: 'FINAL DECISION', title: 'Make the call in a new product.',
        body: 'New product: a mid-market analytics tool. Goal: 90-day retention of new teams.',
        facts: ['Permissions block 39% of new teams; 2.3× churn.', 'Exports bother 54% of active users; no churn link.', 'Audit logs matter to 11%, mostly established accounts.'],
        prompt: 'Which opportunity should the team target first?',
        options: [
          { label: 'Make first-team permission setup workable', correct: true, feedback: 'It affects the target cohort at a critical point and has the strongest measured association with their retention.' },
          { label: 'Redesign exports because most active users mention them', feedback: 'Mention frequency is high, but the affected users are already active and the retention link is weak.' },
          { label: 'Build audit logs for the highest-value accounts', feedback: 'The pain is real, but this goal targets new mid-market teams. Audit logs serve a different segment and likely a different outcome.' },
          { label: 'Launch all three as a retention bundle', feedback: 'Bundling hides which opportunity matters and exceeds the team’s ability to learn quickly.' },
        ],
      },
    ],
  },
  {
    id: 'sizing', number: '02', title: 'Opportunity Sizing', topic: 'Market, company & customer factors', category: 'Problem Discovery', time: '7 min', skill: 'Opportunity sizing', baseSkill: 44,
    takeaways: ['Severe pain alone does not establish a large opportunity.', 'Size customer, market, and company factors together.', 'Use a small test when stakeholder claims outrun evidence.'],
    steps: [
      {
        type: 'choice', kicker: 'SCENARIO · FIRST INSTINCT', title: 'Three teams are lobbying for one investment.',
        body: 'A workforce SaaS company has one discovery slot. Three teams argue for different opportunities.',
        facts: ['Payroll exports: severe monthly pain, small segment.', 'AI forecasts: large market, no reliable data access.', 'Shift swaps: weekly pain, growing segment, existing integrations.'],
        prompt: 'Where would you invest discovery first?',
        options: [
          { label: 'Shift swaps for growing teams', correct: true, feedback: 'This has recurring customer pain, meaningful reach, and a plausible path through existing capabilities. It is the strongest discovery bet, not yet a build commitment.' },
          { label: 'Payroll exports for legacy customers', feedback: 'The pain is severe, but its limited segment and monthly frequency cap the likely opportunity. Check revenue concentration before elevating it.' },
          { label: 'AI forecasting for the adjacent market', feedback: 'Market size attracts attention, but reach and technical feasibility are unproven. A large TAM is not the same as an accessible opportunity.' },
          { label: 'Divide discovery equally across all three', feedback: 'A thin investigation of everything may produce little decision-quality evidence. Prioritize the strongest hypothesis, with explicit reasons to revisit others.' },
        ],
      },
      {
        type: 'concept', kicker: 'MICRO CONCEPT', title: 'Size the opportunity from three angles.',
        body: 'Customer: pain and behavior. Market: reachable demand and value. Company: fit, capabilities, and constraints. A strong bet needs all three.',
        chain: ['Customer', 'Market', 'Company'],
      },
      {
        type: 'classify', kicker: 'INTERACTIVE EXERCISE', title: 'Sort the evidence.',
        body: 'Place each signal under its most direct lens.',
        categories: ['Customer', 'Market', 'Company'],
        items: [
          { id: 'weekly', text: '70% of target users encounter this weekly.', answer: 'Customer', why: 'This measures frequency in the target customer segment.' },
          { id: 'sales', text: 'Our sales team already reaches these buyers.', answer: 'Company', why: 'This is a distribution capability the company already has.' },
          { id: 'growth', text: 'The addressable segment is growing 25% a year.', answer: 'Market', why: 'This describes the size and trajectory of the market.' },
          { id: 'tech', text: 'We lack the required data integration.', answer: 'Company', why: 'This is a company capability and implementation constraint.' },
          { id: 'workaround', text: 'Users spend 40 minutes on a manual workaround.', answer: 'Customer', why: 'This is evidence of customer pain and current behavior.' },
        ],
      },
      {
        type: 'multi', kicker: 'APPLY IT', title: 'What would you learn before committing?',
        body: 'Shift swaps still have two critical unknowns. Which evidence could change the investment decision?',
        limit: 2, correct: ['pay', 'reach'],
        options: [
          { id: 'pay', label: 'Whether target teams will pay or retain more when swaps improve', why: 'Expected value is still unproven.' },
          { id: 'reach', label: 'How many reachable teams have the problem at this severity', why: 'A survey percentage without segment size cannot establish reach.' },
          { id: 'color', label: 'Which color users prefer for a new swap button', why: 'Visual preference will not decide whether the opportunity merits investment.' },
          { id: 'name', label: 'What the feature should be named', why: 'Naming is premature while value and reachable demand remain uncertain.' },
        ],
      },
      {
        type: 'choice', kicker: 'HARDER SCENARIO', title: 'Sales brings a larger number.',
        body: 'Forecasting could double the market, but needs a new data platform. Current customer pain is moderate and infrequent. The CEO wants a call this week.',
        prompt: 'What is the most defensible response?',
        options: [
          { label: 'Keep shift swaps as the near-term discovery focus; run a bounded feasibility and demand check on forecasting', correct: true, feedback: 'This preserves the current evidence-backed focus while testing the two uncertainties that could change the larger bet.' },
          { label: 'Switch to forecasting because the market estimate is twice as large', feedback: 'A larger market estimate does not resolve weak customer urgency or the missing platform capability.' },
          { label: 'Reject forecasting permanently because the company lacks the platform', feedback: 'The constraint is real, but a bounded test can determine whether the value justifies a future capability investment.' },
          { label: 'Build a forecasting MVP immediately to settle the debate', feedback: 'The key uncertainties can be tested before committing to a platform build.' },
        ],
      },
      {
        type: 'choice', kicker: 'FINAL DECISION', title: 'Choose the strongest opportunity.',
        body: 'A B2B team with strong scheduling data must choose one six-month bet.',
        facts: ['A: severe pain in 4%; easy to build.', 'B: huge market; moderate pain, weak reach, high cost.', 'C: frequent pain, reachable segment, willingness to pay, strong fit.'],
        prompt: 'Which opportunity should lead the investment case?',
        options: [
          { label: 'C: the reachable segment with recurring pain and strategic fit', correct: true, feedback: 'C balances customer urgency, meaningful market value, and the company’s ability to deliver and distribute.' },
          { label: 'A: the smallest segment because implementation is easy', feedback: 'Ease matters, but limited reach and value constrain the return from a six-month bet.' },
          { label: 'B: the largest market because upside dominates other factors', feedback: 'Potential market is large, but current pain, distribution, and capabilities all weaken the accessible opportunity.' },
          { label: 'Fund A and B to diversify the risk', feedback: 'This splits investment between two opportunities with distinct weaknesses instead of backing the strongest combined case.' },
        ],
      },
    ],
  },
  {
    id: 'risk', number: '03', title: 'Riskiest Assumption First', topic: 'Solution risk', category: 'Solution Discovery', time: '6 min', skill: 'Assumption testing', baseSkill: 46,
    takeaways: ['Risk combines uncertainty with the cost of being wrong.', 'Test assumptions that can invalidate the solution.', 'Use the cheapest credible test before a full build.'],
    steps: [
      {
        type: 'choice', kicker: 'SCENARIO · FIRST INSTINCT', title: 'An assistant that may never become a habit.',
        body: 'An AI assistant could recommend weekly priorities. Planning is painful and generation works. Few leads currently revisit a plan each week.',
        prompt: 'Which assumption should be tested first?',
        options: [
          { label: 'Leads will act on a useful recommendation during weekly planning', correct: true, feedback: 'If leads do not change a real planning decision, recommendation quality and interface polish cannot create the intended behavior.' },
          { label: 'The model can produce grammatically polished text', feedback: 'Polished wording improves quality, but engineering has already shown basic generation works. It is less likely to invalidate the solution.' },
          { label: 'The assistant can use the preferred visual style', feedback: 'Presentation matters later. A visual preference is cheaper to revise and does not establish whether the solution changes decisions.' },
          { label: 'The team can send a Friday reminder', feedback: 'A reminder might increase opens but cannot prove the core planning recommendation is valuable enough to use.' },
        ],
      },
      {
        type: 'concept', kicker: 'MICRO CONCEPT', title: 'Test what can kill the idea.',
        body: 'A risky assumption is both uncertain and important. If false, the solution may no longer make sense. Test it before polishing the rest.',
        chain: ['Uncertainty', 'Impact if false', 'Cheapest credible test'],
      },
      {
        type: 'classify', kicker: 'ASSUMPTION MAP', title: 'Map uncertainty and impact.',
        body: 'Map each assumption by current uncertainty and impact if false.',
        categories: ['High uncertainty · high impact', 'Low uncertainty · high impact', 'High uncertainty · low impact', 'Low uncertainty · low impact'],
        items: [
          { id: 'act', text: 'Leads will change a weekly priority after seeing a recommendation.', answer: 'High uncertainty · high impact', why: 'This behavior is unproven and central to the solution’s value.' },
          { id: 'data', text: 'The existing integration can read task status.', answer: 'Low uncertainty · high impact', why: 'The team has already verified the integration; without it, the assistant would be severely limited.' },
          { id: 'timing', text: 'A Friday message gets more opens than a Monday message.', answer: 'High uncertainty · low impact', why: 'Timing is unknown but can be revised without invalidating the core concept.' },
          { id: 'mobile', text: 'The current app can render a text summary on mobile.', answer: 'Low uncertainty · low impact', why: 'The app already renders similar summaries, and format can be changed.' },
        ],
      },
      {
        type: 'choice', kicker: 'APPLY IT', title: 'Pick the cheapest useful test.',
        body: 'You need to see whether leads act on recommendations. You have one researcher, anonymized data, and ten willing teams.',
        prompt: 'What should the team run first?',
        options: [
          { label: 'Manually craft a recommendation for each lead and observe the next planning decision', correct: true, feedback: 'A concierge test exposes the proposed value and measures real behavior without building the assistant.' },
          { label: 'Ask a broad survey whether leads would use an AI assistant', feedback: 'Stated intent is cheap but weak evidence for whether a recommendation changes an actual decision.' },
          { label: 'Build the full assistant and measure weekly active users', feedback: 'This would answer the question eventually, but at much higher cost than a credible manual test.' },
          { label: 'Run a technical spike to improve model latency', feedback: 'Latency matters only if leads value and act on the recommendation. The core behavioral risk remains untested.' },
        ],
      },
      {
        type: 'choice', kicker: 'HARDER SCENARIO', title: 'A new constraint appears.',
        body: 'Seven of ten leads act on manual recommendations. But only 35% of target teams permit the data access needed for automation.',
        prompt: 'What should you test next?',
        options: [
          { label: 'Test permission uptake and a lower-data alternative in the target segment', correct: true, feedback: 'Behavioral value is promising. Data access is now a high-impact uncertainty that may block scale, so test it before building automation.' },
          { label: 'Build automation because most test leads acted', feedback: 'The action signal is useful, but the test sample had access. The broader target segment may not permit the data needed.' },
          { label: 'Improve recommendation wording for the three leads who did not act', feedback: 'Copy may improve response, but it cannot resolve a data-access constraint affecting most of the target segment.' },
          { label: 'Assume legal will approve access once the feature launches', feedback: 'Approval is an untested dependency. Treat it as a potential concept blocker, not a later implementation detail.' },
        ],
      },
      {
        type: 'choice', kicker: 'FINAL DECISION', title: 'Move the principle to another solution.',
        body: 'A churn-alert model works. Managers often ignore dashboards, and no one knows if an alert would change their outreach.',
        prompt: 'What is the first decisive experiment?',
        options: [
          { label: 'Send a small set of credible manual alerts and observe whether managers change outreach', correct: true, feedback: 'This tests the uncertain behavior that must happen for alerts to create value, without requiring the full product.' },
          { label: 'Optimize model accuracy before involving account managers', feedback: 'Accuracy matters, but the model is already credible enough to test whether managers use its signal.' },
          { label: 'Design a polished alert dashboard', feedback: 'A better interface may help later. It does not resolve whether managers will act on the information.' },
          { label: 'Survey managers about their ideal alert frequency', feedback: 'Preference data is useful for tuning delivery, but observed outreach behavior is the decisive assumption.' },
        ],
      },
    ],
  },
];
