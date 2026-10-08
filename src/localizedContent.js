import { lessons as lessonBlueprints } from './lessons.js';
import { practice as practiceBlueprints } from './practice.js';

const enLessons = [
  {
    title: 'Pick the first problem', topic: 'Opportunity tree', category: 'Finding the problem', skill: 'Choosing a problem', time: '6 min',
    takeaways: ['Start with the goal.', 'Watch what people do, not just what they request.', 'When the goal changes, rethink your choice.'],
    steps: [
      { k: 'YOUR FIRST CALL', t: 'Four problems. One choice.', b: 'You run a team app. You want more teams to still use it after 3 months. You can study one problem this week.', f: ['New teams get stuck setting up.', 'Managers cannot see slow projects.', 'People get too many alerts.', 'Expert users want custom charts.'], p: 'Which problem do you check first?', o: [
        ['Setting up a new team', 'Good start. If setup fails, a team may leave before it gets value. Check the data next.'],
        ['Manager reports', 'This may matter, but first see whether teams without reports leave more often.'],
        ['Too many alerts', 'People complain about alerts, but complaints alone do not show why teams leave.'],
        ['Custom charts', 'These requests come from active users, who already use the app.'],
      ]},
      { k: 'SMALL IDEA', t: 'Start with the goal.', b: 'First name the result you want. Then find a customer problem linked to it. Think about a fix later.', c: ['Goal', 'Problem', 'Fix', 'Test'] },
      { k: 'NEW CLUES', t: 'Now you have data.', b: 'You can compare what people say with what they do.', f: ['Setup: 42% get stuck; those teams leave twice as often.', 'Reports: 17% of managers ask for them.', 'Alerts: 31% complain, but they still stay.', 'Charts: 8% ask for more options.'], p: 'Which problem should the team focus on?', o: [
        ['Make first setup easier', 'Yes. This problem is common and tied to teams leaving.'],
        ['Build better reports', 'Reports could help, but the link to teams leaving is weaker here.'],
        ['Send fewer alerts', 'Many people complain, but they do not leave more often.'],
        ['Add chart options', 'Few teams ask for this, and they already use the app.'],
      ]},
      { k: 'TRY IT', t: 'Which clue is strongest?', b: 'Put these clues in order, from most useful to least useful.', items: [
        ['What people said in interviews', 'Useful for understanding the problem.'],
        ['How many people asked for a feature', 'A request is not proof it solves the goal.'],
        ['How many affected teams stayed', 'This is closest to the goal.'],
        ['Where teams get stuck during setup', 'This shows the problem in real use.'],
      ], feedback: 'Real behavior tied to the goal is strongest. Feature requests are only a clue.' },
      { k: 'A TWIST', t: 'The goal changes.', b: 'Now the company wants to keep big customers. Missing reports affect fewer managers, but those accounts bring much more money.', p: 'What should you do?', o: [
        ['Check the big-customer data again', 'Right. A new goal may mean a different problem matters most.'],
        ['Keep working on setup', 'Setup still matters, but the new goal is about big customers.'],
        ['Build reports right away', 'The signal is strong, but first check if missing reports cause them to leave.'],
        ['Split the team between both', 'With little time, compare the clues before splitting the work.'],
      ]},
      { k: 'FINAL CALL', t: 'One more product.', b: 'A data app wants new teams to stay for 3 months.', f: ['39% get stuck with permissions; they leave twice as often.', '54% of active users dislike exports, but they stay.', '11% of older accounts need audit logs.'], p: 'Which problem do you pick?', o: [
        ['Make permissions easier for new teams', 'Yes. This affects new teams and is tied to them leaving.'],
        ['Redesign exports', 'Many active users mention exports, but that is not linked to this goal.'],
        ['Add audit logs', 'Those logs help a different group of customers.'],
        ['Build all three', 'Doing everything at once makes it hard to learn what works.'],
      ]},
    ],
  },
  {
    title: 'How big is the chance?', topic: 'Customer, market and company', category: 'Finding the problem', skill: 'Sizing a chance', time: '7 min',
    takeaways: ['Pain alone is not enough.', 'Check customers, market and company fit.', 'Use a small test before a big bet.'],
    steps: [
      { k: 'YOUR FIRST CALL', t: 'Three ideas. One choice.', b: 'A work-planning app can study one new idea.', f: ['Payroll exports: strong pain for a few old customers.', 'AI forecasts: big market, but missing data.', 'Shift swaps: weekly pain for a growing group; your tools can help.'], p: 'What do you study first?', o: [
        ['Helping teams swap shifts', 'Good call. The problem happens often, affects a growing group, and fits your tools.'],
        ['Payroll exports', 'The pain is real, but only a small group has it.'],
        ['AI forecasts', 'The market is big, but you cannot yet reach or serve it well.'],
        ['Study all three equally', 'A clear first bet helps you learn faster.'],
      ]},
      { k: 'SMALL IDEA', t: 'Look from three sides.', b: 'Ask: Do customers care? Are there enough of them? Can your company help them?', c: ['Customer', 'Market', 'Company'] },
      { k: 'SORT IT', t: 'Where does each clue belong?', b: 'Tap the group that best fits each clue.', cats: ['Customer', 'Market', 'Company'], items: [
        ['Most target users face this each week.', 'This tells you how often customers face it.'],
        ['Our sales team already talks to these buyers.', 'This is something the company can do.'],
        ['This group of buyers is growing fast.', 'This tells you about the market.'],
        ['We do not have the needed data tool.', 'This is a company limit.'],
        ['Users spend 40 minutes doing it by hand.', 'This shows customer pain.'],
      ]},
      { k: 'PICK TWO', t: 'What is still missing?', b: 'Before building shift swaps, choose the two clues that matter most.', o: [
        ['Will teams pay or stay longer if this gets easier?', 'This shows whether fixing it creates value.'],
        ['How many teams with this problem can we reach?', 'This shows the real size of the chance.'],
        ['What color should the button be?', 'Color will not tell you whether this is worth building.'],
        ['What should we name the feature?', 'The name can wait until you know it has value.'],
      ]},
      { k: 'A TWIST', t: 'A bigger market appears.', b: 'Forecasting might reach twice as many buyers, but needs a new data system. Current users do not ask for it often.', p: 'What is the best next move?', o: [
        ['Keep studying shift swaps; run a small forecast test', 'Yes. Keep the stronger lead while checking if the bigger idea is possible.'],
        ['Switch to forecasts because the market is big', 'A big market does not fix weak demand or missing tools.'],
        ['Never look at forecasts again', 'It may be worth a small test before saying no forever.'],
        ['Build forecasts now', 'Test demand and data first; a full build costs much more.'],
      ]},
      { k: 'FINAL CALL', t: 'Choose one bet.', b: 'Your team can make one big project.', f: ['A: strong pain for 4% of users; easy to build.', 'B: huge market, mild pain, high cost.', 'C: common pain, reachable buyers, and tools you already have.'], p: 'Which idea wins?', o: [
        ['C: the reachable problem you can solve', 'Yes. It balances customer need, market size and company fit.'],
        ['A: the easy build', 'Easy is helpful, but very few customers need it.'],
        ['B: the biggest market', 'The market is large, but pain is weak and cost is high.'],
        ['Build A and B together', 'That spreads the team across two weaker bets.'],
      ]},
    ],
  },
  {
    title: 'Test the biggest risk first', topic: 'Risky assumptions', category: 'Finding a solution', skill: 'Testing assumptions', time: '6 min',
    takeaways: ['Ask what could make the idea fail.', 'Test what is both unknown and important.', 'Start with a cheap, useful test.'],
    steps: [
      { k: 'YOUR FIRST CALL', t: 'Will people use the advice?', b: 'Your team wants an AI helper to suggest weekly priorities. It can make advice, but few team leads review plans each week.', p: 'What should you test first?', o: [
        ['Will leads use the advice to change a real plan?', 'Yes. If no one acts on the advice, the helper has little value.'],
        ['Can the advice sound polished?', 'Nice writing will not matter if no one uses the advice.'],
        ['Can the screen look good?', 'The look can change later. First test whether the idea helps.'],
        ['Can we send a Friday reminder?', 'A reminder may get a click, but it does not prove the advice is useful.'],
      ]},
      { k: 'SMALL IDEA', t: 'Test what could break the idea.', b: 'An assumption is a guess. Test a guess first when you are unsure and being wrong would ruin the plan.', c: ['Not sure', 'Big effect', 'Small test'] },
      { k: 'SORT IT', t: 'How risky is each guess?', b: 'Sort each guess by how sure you are and how much it matters.', cats: ['Unsure · big effect', 'Sure · big effect', 'Unsure · small effect', 'Sure · small effect'], items: [
        ['Leads will change a plan after seeing advice.', 'No one has proved this, and the idea depends on it.'],
        ['Our app can read task status.', 'We already tested this, but it is important.'],
        ['A Friday message gets more opens.', 'We do not know, but timing can change easily.'],
        ['The app can show text on a phone.', 'We know it can, and the format is easy to change.'],
      ]},
      { k: 'TRY IT', t: 'What is the cheapest real test?', b: 'You have 10 willing teams. The AI helper is not built yet.', p: 'What do you do?', o: [
        ['Write advice by hand and watch what leads do', 'Yes. You can see real behavior without building the full tool.'],
        ['Ask a survey if people would use it', 'People may say yes without ever changing a plan.'],
        ['Build the whole helper first', 'That costs more than a small test.'],
        ['Make the AI faster', 'Speed matters later if people want the advice.'],
      ]},
      { k: 'A TWIST', t: 'A new problem appears.', b: 'Seven of ten leads used the hand-made advice. But most target teams do not allow the data access the AI needs.', p: 'What should you test next?', o: [
        ['Can teams allow data access or use less data?', 'Right. This could stop the idea from working at scale.'],
        ['Build the AI now', 'The first test was good, but the data problem is still open.'],
        ['Rewrite the advice', 'Better words do not solve missing data access.'],
        ['Assume permission will come later', 'That is a risky guess. Test it now.'],
      ]},
      { k: 'FINAL CALL', t: 'Another idea, same rule.', b: 'A tool can warn when customers may leave. Managers often ignore dashboards.', p: 'What do you test first?', o: [
        ['Send a few hand-made warnings and watch actions', 'Yes. See whether managers act before building the full tool.'],
        ['Make the prediction a little better', 'The prediction already works well enough for a first behavior test.'],
        ['Design a better dashboard', 'A prettier screen does not prove managers will act.'],
        ['Ask which day alerts should arrive', 'Timing can wait until you know the alert changes behavior.'],
      ]},
    ],
  },
];

const enPractice = {
  review: { title: 'Review', intro: 'Use the ideas again in a new story.', skill: 'Recall', stages: [
    { k: 'QUESTION 1', t: 'Which problem matters more?', b: 'Goal: keep new teams. Many active users ask for better exports. New teams that fail their first schedule leave twice as often.', p: 'What should you study first?', o: [
      ['First-schedule problems', 'Yes. This is tied to new teams leaving.'],
      ['Export settings', 'Many ask for exports, but those users are already active.'],
      ['Both at the same time', 'Pick the problem with the clearest link to the goal.'],
    ]},
    { k: 'QUESTION 2', t: 'What could break this idea?', b: 'A team wants to send meeting summaries. The goal is to help people act on decisions.', p: 'What should they test first?', o: [
      ['Will people act on the summary?', 'Yes. If they do nothing with it, the summary misses its goal.'],
      ['Can the summary match our colors?', 'Colors can change later.'],
      ['Should the email arrive on Monday?', 'Timing matters less than action.'],
    ]},
  ]},
  gym: { title: 'PM Gym', intro: 'Make a call with limited time and mixed clues.', skill: 'Product choices', stages: [
    { k: 'QUESTION 1', t: 'Orders rise. Why do users leave?', b: 'A delivery app gets more orders, but fewer people return. Late-delivery complaints are rising.', p: 'What do you do next?', o: [
      ['Compare late deliveries with users leaving', 'Yes. Check whether late deliveries explain the drop.'],
      ['Spend more on ads', 'More new users will not fix the reason people leave.'],
      ['Add a loyalty program', 'Rewards may hide the delivery problem.'],
    ]},
    { k: 'QUESTION 2', t: 'One small test or a big rebuild?', b: 'Late first deliveries are linked to people leaving. One city can test a dispatch fix this week. A tracking rebuild takes six weeks.', p: 'Which move do you pick?', o: [
      ['Test the dispatch fix in one city', 'Yes. It is quick and shows whether delivery improves.'],
      ['Rebuild tracking first', 'More tracking alone will not fix late delivery.'],
      ['Change dispatch everywhere now', 'Test in one city before changing everything.'],
    ]},
  ]},
};

const faLessons = [
  {
    title: 'اول کدام مشکل؟', topic: 'درخت فرصت و راه‌حل', category: 'شناخت مشکل', skill: 'انتخاب مشکل', time: '۶ دقیقه',
    takeaways: ['از هدف شروع کن.', 'به رفتار مردم نگاه کن، نه فقط درخواست‌هایشان.', 'اگر هدف عوض شد، انتخابت را دوباره بررسی کن.'],
    steps: [
      { k: 'تصمیم اول', t: 'چهار مشکل، یک انتخاب', b: 'مسئول یک برنامهٔ کار گروهی هستی. می‌خواهی گروه‌ها سه ماه بعد هم از آن استفاده کنند. این هفته فقط یک مشکل را می‌توانی بررسی کنی.', f: ['گروه‌های تازه در راه‌اندازی گیر می‌کنند.', 'مدیران نمی‌بینند کدام کار عقب افتاده.', 'اعضا پیام‌های زیادی می‌گیرند.', 'کاربران حرفه‌ای نمودار دلخواه می‌خواهند.'], p: 'اول کدام مشکل را بررسی می‌کنی؟', o: [
        ['راه‌اندازی گروه‌های تازه', 'شروع خوبی است. اگر گروه همان اول گیر کند، شاید هرگز از برنامه استفاده نکند. حالا داده‌ها را ببین.'],
        ['گزارش برای مدیران', 'شاید مهم باشد؛ اول ببین گروه‌هایی که گزارش ندارند بیشتر می‌روند یا نه.'],
        ['پیام‌های زیاد', 'شکایت زیاد است، اما شکایت به‌تنهایی دلیل رفتن گروه‌ها را نشان نمی‌دهد.'],
        ['نمودارهای دلخواه', 'این درخواست بیشتر از کسانی است که همین حالا از برنامه استفاده می‌کنند.'],
      ]},
      { k: 'یک نکتهٔ کوتاه', t: 'از هدف شروع کن', b: 'اول بگو چه نتیجه‌ای می‌خواهی. بعد مشکلی را پیدا کن که به آن نتیجه ربط دارد. تازه بعد از آن دنبال راه‌حل برو.', c: ['هدف', 'مشکل', 'راه‌حل', 'آزمایش'] },
      { k: 'سرنخ تازه', t: 'حالا داده داریم', b: 'می‌توانی گفته‌های کاربران را با رفتار واقعی‌شان مقایسه کنی.', f: ['راه‌اندازی: ۴۲٪ گیر می‌کنند؛ این گروه‌ها دو برابر بیشتر می‌روند.', 'گزارش: ۱۷٪ مدیران آن را می‌خواهند.', 'پیام‌ها: ۳۱٪ شکایت دارند، ولی می‌مانند.', 'نمودار: ۸٪ گزینه‌های بیشتری می‌خواهند.'], p: 'گروه باید روی کدام مشکل تمرکز کند؟', o: [
        ['ساده‌تر کردن راه‌اندازی', 'درست است. این مشکل هم رایج است و هم به رفتن گروه‌ها ربط دارد.'],
        ['ساختن گزارش بهتر', 'گزارش می‌تواند مفید باشد، اما اینجا ارتباطش با رفتن گروه‌ها ضعیف‌تر است.'],
        ['کم کردن پیام‌ها', 'خیلی‌ها شکایت دارند، اما بیشتر از دیگران برنامه را ترک نمی‌کنند.'],
        ['افزودن گزینه‌های نمودار', 'افراد کمی آن را می‌خواهند و همین حالا هم کاربر فعال‌اند.'],
      ]},
      { k: 'نوبت تو', t: 'کدام سرنخ محکم‌تر است؟', b: 'سرنخ‌ها را از مفیدترین تا کم‌فایده‌ترین مرتب کن.', items: [
        ['حرف‌های کاربران در مصاحبه', 'کمک می‌کند مشکل را بفهمی.'],
        ['تعداد درخواست‌ها برای یک ویژگی', 'درخواست، دلیل خوب بودن یک راه‌حل نیست.'],
        ['ماندن یا رفتن گروه‌هایی که مشکل دارند', 'این سرنخ از همه به هدف نزدیک‌تر است.'],
        ['دیدن جایی که گروه‌ها گیر می‌کنند', 'مشکل را در استفادهٔ واقعی نشان می‌دهد.'],
      ], feedback: 'رفتار واقعی که به هدف ربط دارد، محکم‌ترین سرنخ است. درخواست ویژگی فقط یک نشانه است.' },
      { k: 'داستان عوض می‌شود', t: 'هدف تازه‌ای داری', b: 'حالا شرکت می‌خواهد مشتریان بزرگ را نگه دارد. مشکل گزارش برای افراد کمتری پیش می‌آید، ولی این مشتریان پول بیشتری می‌پردازند.', p: 'چه کار می‌کنی؟', o: [
        ['داده‌های مشتریان بزرگ را دوباره بررسی می‌کنم', 'درست است. با عوض شدن هدف، شاید مشکل مهم هم عوض شود.'],
        ['همان راه‌اندازی را ادامه می‌دهم', 'راه‌اندازی هنوز مهم است، ولی هدف تازه دربارهٔ مشتریان بزرگ است.'],
        ['بی‌درنگ گزارش می‌سازم', 'سرنخ خوبی داری، اما هنوز باید ببینی نبود گزارش باعث رفتن آنها می‌شود یا نه.'],
        ['کار را بین هر دو تقسیم می‌کنم', 'وقتی وقت کم است، اول سرنخ‌ها را مقایسه کن.'],
      ]},
      { k: 'تصمیم آخر', t: 'یک برنامهٔ دیگر', b: 'یک برنامهٔ داده می‌خواهد گروه‌های تازه سه ماه بعد هم بمانند.', f: ['۳۹٪ در تنظیم دسترسی گیر می‌کنند؛ دو برابر بیشتر می‌روند.', '۵۴٪ کاربران فعال از خروجی ناراضی‌اند، ولی می‌مانند.', '۱۱٪ حساب‌های قدیمی گزارش امنیتی می‌خواهند.'], p: 'کدام مشکل را انتخاب می‌کنی؟', o: [
        ['آسان کردن تنظیم دسترسی برای گروه‌های تازه', 'درست است. این مشکل برای گروه‌های تازه است و به رفتنشان ربط دارد.'],
        ['بهتر کردن خروجی‌ها', 'خیلی‌ها از خروجی می‌گویند، اما به این هدف ربط روشنی ندارد.'],
        ['ساختن گزارش امنیتی', 'این نیازِ گروه دیگری از مشتریان است.'],
        ['ساختن هر سه', 'اگر همه را با هم بسازی، نمی‌فهمی کدام کار اثر داشته است.'],
      ]},
    ],
  },
  {
    title: 'این فرصت چقدر ارزش دارد؟', topic: 'مشتری، بازار و توان شرکت', category: 'شناخت مشکل', skill: 'سنجیدن فرصت', time: '۷ دقیقه',
    takeaways: ['شدت درد مشتری به‌تنهایی کافی نیست.', 'مشتری، بازار و توان شرکت را با هم ببین.', 'پیش از یک کار بزرگ، یک آزمایش کوچک انجام بده.'],
    steps: [
      { k: 'تصمیم اول', t: 'سه ایده، یک انتخاب', b: 'یک برنامهٔ برنامه‌ریزی کار می‌تواند فقط یک ایده را بررسی کند.', f: ['خروجی حقوق: درد شدید برای چند مشتری قدیمی.', 'پیش‌بینی هوشمند: بازار بزرگ، اما دادهٔ کافی نداریم.', 'جابه‌جایی شیفت: مشکل هفتگی برای گروهی در حال رشد؛ ابزارش را داریم.'], p: 'اول کدام را بررسی می‌کنی؟', o: [
        ['جابه‌جایی شیفت‌ها', 'انتخاب خوبی است. مشکل زیاد تکرار می‌شود، افراد بیشتری را درگیر می‌کند و ابزارش را داری.'],
        ['خروجی حقوق', 'درد واقعی است، اما افراد کمی با آن روبه‌رو هستند.'],
        ['پیش‌بینی هوشمند', 'بازار بزرگ است، ولی هنوز داده و توان کافی برای کمک نداریم.'],
        ['هر سه را برابر بررسی می‌کنم', 'یک انتخاب روشن کمک می‌کند زودتر یاد بگیری.'],
      ]},
      { k: 'یک نکتهٔ کوتاه', t: 'از سه طرف نگاه کن', b: 'بپرس: مشتری چقدر اهمیت می‌دهد؟ چند مشتری مثل او هست؟ شرکت ما می‌تواند کمک کند؟', c: ['مشتری', 'بازار', 'شرکت'] },
      { k: 'دسته‌بندی کن', t: 'هر سرنخ به کجا ربط دارد؟', b: 'برای هر سرنخ، نزدیک‌ترین دسته را بزن.', cats: ['مشتری', 'بازار', 'شرکت'], items: [
        ['بیشتر کاربران هدف هر هفته با این مشکل روبه‌رو می‌شوند.', 'این نشان می‌دهد مشکل برای مشتری چند بار پیش می‌آید.'],
        ['گروه فروش ما همین حالا با این خریداران حرف می‌زند.', 'این یکی از توانایی‌های شرکت است.'],
        ['تعداد این خریداران به‌سرعت بیشتر می‌شود.', 'این دربارهٔ اندازه و رشد بازار است.'],
        ['ابزار دادهٔ لازم را نداریم.', 'این محدودیتِ شرکت است.'],
        ['کاربران ۴۰ دقیقه وقت می‌گذارند تا دستی انجامش دهند.', 'این نشان می‌دهد مشکل برای مشتری سخت است.'],
      ]},
      { k: 'دو سرنخ را بردار', t: 'هنوز چه چیزی را نمی‌دانی؟', b: 'پیش از ساخت جابه‌جایی شیفت، دو سرنخ مهم را انتخاب کن.', o: [
        ['آیا با بهتر شدن آن، گروه‌ها پول می‌دهند یا بیشتر می‌مانند؟', 'این ارزشِ حل مشکل را نشان می‌دهد.'],
        ['چند گروه با این مشکل را می‌توانیم پیدا کنیم؟', 'این اندازهٔ واقعی فرصت را نشان می‌دهد.'],
        ['دکمه چه رنگی باشد؟', 'رنگ نشان نمی‌دهد ساختن این ایده ارزش دارد یا نه.'],
        ['نام این ویژگی چه باشد؟', 'نام را بعد از روشن شدن ارزش ایده هم می‌توان انتخاب کرد.'],
      ]},
      { k: 'داستان عوض می‌شود', t: 'بازار بزرگ‌تری پیدا شده', b: 'پیش‌بینی شاید دو برابر خریدار داشته باشد، ولی به ابزار دادهٔ تازه نیاز دارد. مشتریان فعلی هم زیاد آن را نمی‌خواهند.', p: 'بهترین کار بعدی چیست؟', o: [
        ['جابه‌جایی شیفت را ادامه می‌دهم و پیش‌بینی را کوچک آزمایش می‌کنم', 'درست است. ایدهٔ قوی‌تر را نگه می‌داری و ایدهٔ بزرگ‌تر را ارزان بررسی می‌کنی.'],
        ['چون بازار بزرگ است، سراغ پیش‌بینی می‌روم', 'بازار بزرگ، کم بودن نیاز مشتری و نداشتن ابزار را حل نمی‌کند.'],
        ['پیش‌بینی را برای همیشه کنار می‌گذارم', 'یک آزمایش کوچک می‌تواند نشان دهد بعدها ارزش دارد یا نه.'],
        ['همین حالا پیش‌بینی را می‌سازم', 'اول نیاز مشتری و امکان ساخت را امتحان کن.'],
      ]},
      { k: 'تصمیم آخر', t: 'فقط یک پروژه', b: 'گروه تو می‌تواند فقط یک پروژهٔ بزرگ انجام دهد.', f: ['الف: درد شدید برای ۴٪ کاربران؛ ساخت آسان.', 'ب: بازار خیلی بزرگ؛ درد کم و هزینهٔ زیاد.', 'ج: مشکل پرتکرار، خریداران در دسترس و ابزار آماده.'], p: 'کدام ایده را برمی‌داری؟', o: [
        ['ج: مشکلی که می‌توانیم حل کنیم', 'درست است. هم نیاز مشتری را دارد، هم بازار مناسب و هم توان شرکت را.'],
        ['الف: چون ساختنش آسان است', 'آسان بودن خوب است، اما کاربران کمی به آن نیاز دارند.'],
        ['ب: چون بازارش بزرگ است', 'بازار بزرگ است، ولی نیاز مشتری کم و هزینه زیاد است.'],
        ['الف و ب را با هم می‌سازم', 'این کار نیرو را بین دو انتخاب ضعیف‌تر پخش می‌کند.'],
      ]},
    ],
  },
  {
    title: 'اول بزرگ‌ترین خطر را امتحان کن', topic: 'آزمایش حدس‌های مهم', category: 'پیدا کردن راه‌حل', skill: 'آزمایش حدس‌ها', time: '۶ دقیقه',
    takeaways: ['بپرس چه چیزی می‌تواند ایده را خراب کند.', 'حدسی را آزمایش کن که هم نامطمئن است و هم مهم.', 'با یک آزمایش کوچک و مفید شروع کن.'],
    steps: [
      { k: 'تصمیم اول', t: 'آیا کسی به این پیشنهاد عمل می‌کند؟', b: 'گروه تو می‌خواهد یک دستیار هوش مصنوعی برای برنامهٔ هفتگی بسازد. دستیار می‌تواند پیشنهاد بدهد، ولی مدیران گروه به‌ندرت برنامه را دوباره می‌بینند.', p: 'اول چه چیزی را امتحان می‌کنی؟', o: [
        ['آیا مدیران با پیشنهاد، برنامه‌شان را عوض می‌کنند؟', 'درست است. اگر کسی به پیشنهاد عمل نکند، دستیار فایدهٔ زیادی ندارد.'],
        ['آیا متن پیشنهاد زیباست؟', 'متن خوب مهم است، اما اگر کسی از پیشنهاد استفاده نکند کافی نیست.'],
        ['آیا ظاهر صفحه خوب است؟', 'ظاهر را بعداً می‌توان عوض کرد. اول ببین ایده کمک می‌کند یا نه.'],
        ['آیا جمعه یادآوری بفرستیم؟', 'یادآوری شاید کلیک بگیرد، اما فایدهٔ پیشنهاد را ثابت نمی‌کند.'],
      ]},
      { k: 'یک نکتهٔ کوتاه', t: 'حدسِ مهم را امتحان کن', b: 'حدس یعنی چیزی که هنوز مطمئن نیستی. اگر غلط بودنش کل ایده را خراب می‌کند، اول همان را آزمایش کن.', c: ['نامطمئن', 'اثر بزرگ', 'آزمایش کوچک'] },
      { k: 'دسته‌بندی کن', t: 'هر حدس چقدر خطر دارد؟', b: 'ببین از هر حدس چقدر مطمئنی و غلط بودنش چقدر مهم است.', cats: ['نامطمئن · اثر بزرگ', 'مطمئن · اثر بزرگ', 'نامطمئن · اثر کوچک', 'مطمئن · اثر کوچک'], items: [
        ['مدیران بعد از دیدن پیشنهاد، برنامه را تغییر می‌دهند.', 'هنوز ثابت نشده و ارزش ایده به آن بستگی دارد.'],
        ['برنامه می‌تواند وضعیت کارها را بخواند.', 'این را امتحان کرده‌ایم، اما مهم است.'],
        ['پیام جمعه بیشتر باز می‌شود.', 'نمی‌دانیم، ولی زمان پیام را راحت می‌شود عوض کرد.'],
        ['برنامه می‌تواند متن را روی گوشی نشان دهد.', 'می‌دانیم می‌تواند و شکل نمایش هم قابل تغییر است.'],
      ]},
      { k: 'نوبت تو', t: 'ارزان‌ترین آزمایش واقعی چیست؟', b: 'ده گروه حاضرند کمک کنند. دستیار هنوز ساخته نشده است.', p: 'چه کار می‌کنی؟', o: [
        ['پیشنهاد را دستی می‌نویسم و رفتار مدیران را می‌بینم', 'درست است. بدون ساختن ابزار کامل، رفتار واقعی را می‌بینی.'],
        ['در یک نظرسنجی می‌پرسم آیا استفاده می‌کنند', 'ممکن است بگویند بله، اما هیچ‌وقت برنامه‌شان را عوض نکنند.'],
        ['اول دستیار کامل را می‌سازم', 'ساخت کامل خیلی گران‌تر از یک آزمایش کوچک است.'],
        ['هوش مصنوعی را سریع‌تر می‌کنم', 'سرعت وقتی مهم می‌شود که مردم خودِ پیشنهاد را بخواهند.'],
      ]},
      { k: 'داستان عوض می‌شود', t: 'یک مشکل تازه', b: 'هفت نفر از ده نفر از پیشنهاد دستی استفاده کردند. ولی بیشتر گروه‌های هدف اجازهٔ دسترسی به دادهٔ لازم را نمی‌دهند.', p: 'بعد چه چیزی را امتحان می‌کنی؟', o: [
        ['آیا می‌شود اجازه گرفت یا با دادهٔ کمتر کار کرد؟', 'درست است. این مشکل شاید جلوی کار کردن ایده را بگیرد.'],
        ['همین حالا دستیار را می‌سازم', 'آزمایش اول خوب بود، اما مشکل دسترسی به داده هنوز باقی است.'],
        ['متن پیشنهاد را عوض می‌کنم', 'متن بهتر، مشکل دسترسی به داده را حل نمی‌کند.'],
        ['فرض می‌کنم بعداً اجازه می‌دهند', 'این هم یک حدس خطرناک است؛ همین حالا امتحانش کن.'],
      ]},
      { k: 'تصمیم آخر', t: 'ایدهٔ تازه، قانون همان است', b: 'یک ابزار می‌تواند هشدار بدهد کدام مشتری شاید برود. مدیران معمولاً به داشبوردها توجه نمی‌کنند.', p: 'اول چه چیزی را امتحان می‌کنی؟', o: [
        ['چند هشدار دستی می‌فرستم و می‌بینم چه می‌کنند', 'درست است. پیش از ساختن ابزار کامل، ببین مدیران کاری می‌کنند یا نه.'],
        ['پیش‌بینی را کمی دقیق‌تر می‌کنم', 'پیش‌بینی برای یک آزمایش اول به‌اندازهٔ کافی خوب است.'],
        ['داشبورد زیباتری طراحی می‌کنم', 'ظاهر بهتر ثابت نمی‌کند مدیران به هشدار عمل می‌کنند.'],
        ['می‌پرسم هشدار چه روزی برسد', 'زمان پیام بعد از فهمیدن اثر هشدار مهم می‌شود.'],
      ]},
    ],
  },
];

const faPractice = {
  review: { title: 'مرور', intro: 'این بار همان فکر را در یک داستان تازه به کار ببر.', skill: 'یادآوری', stages: [
    { k: 'سؤال ۱', t: 'کدام مشکل مهم‌تر است؟', b: 'هدف: نگه داشتن گروه‌های تازه. کاربران فعال خروجی بهتر می‌خواهند. گروه‌هایی که اولین برنامهٔ کاری را نمی‌سازند، دو برابر بیشتر می‌روند.', p: 'اول کدام مشکل را بررسی می‌کنی؟', o: [
      ['ساختن اولین برنامهٔ کاری', 'درست است. این مشکل به رفتن گروه‌های تازه ربط دارد.'],
      ['تنظیمات خروجی', 'افراد زیادی آن را می‌خواهند، اما همین حالا کاربر فعال‌اند.'],
      ['هر دو را با هم', 'مشکلی را انتخاب کن که به هدف ارتباط روشن‌تری دارد.'],
    ]},
    { k: 'سؤال ۲', t: 'چه چیزی ممکن است ایده را خراب کند؟', b: 'گروهی می‌خواهد خلاصهٔ جلسه بفرستد. هدف این است که آدم‌ها کارهای تصمیم‌گرفته‌شده را انجام دهند.', p: 'اول چه چیزی را امتحان می‌کنی؟', o: [
      ['آیا مردم به خلاصه عمل می‌کنند؟', 'درست است. اگر کاری نکنند، خلاصه به هدفش نمی‌رسد.'],
      ['آیا رنگ خلاصه با برند یکی است؟', 'رنگ را بعداً می‌توان عوض کرد.'],
      ['آیا ایمیل دوشنبه برسد؟', 'زمان پیام از عمل کردن به تصمیم مهم‌تر نیست.'],
    ]},
  ]},
  gym: { title: 'باشگاه محصول', intro: 'با وقت کم و سرنخ‌های گوناگون تصمیم بگیر.', skill: 'تصمیم‌گیری', stages: [
    { k: 'سؤال ۱', t: 'سفارش بیشتر، مشتری کمتر', b: 'سفارش‌های یک برنامهٔ ارسال غذا بیشتر شده، ولی مشتریان کمتری برمی‌گردند. شکایت از دیر رسیدن غذا هم بیشتر شده است.', p: 'گام بعدی تو چیست؟', o: [
      ['بررسی می‌کنم دیر رسیدن غذا با رفتن مشتری ربط دارد یا نه', 'درست است. اول ببین این مشکل دلیل رفتن مشتری‌ها هست یا نه.'],
      ['پول بیشتری برای تبلیغ می‌دهم', 'آوردن مشتری تازه، دلیل رفتن مشتریان قبلی را حل نمی‌کند.'],
      ['طرح امتیاز و جایزه می‌گذارم', 'جایزه ممکن است مشکل دیر رسیدن را پنهان کند.'],
    ]},
    { k: 'سؤال ۲', t: 'آزمایش کوچک یا ساخت بزرگ؟', b: 'دیر رسیدن سفارش اول به رفتن مشتری ربط دارد. می‌توانی این هفته یک راه تازه را در یک شهر امتحان کنی. ساخت ابزار گزارش‌گیری شش هفته طول می‌کشد.', p: 'کدام را انتخاب می‌کنی؟', o: [
      ['راه تازه را در یک شهر امتحان می‌کنم', 'درست است. سریع می‌فهمی آیا زمان تحویل بهتر می‌شود یا نه.'],
      ['اول ابزار گزارش‌گیری را می‌سازم', 'گزارش بیشتر به‌تنهایی دیر رسیدن غذا را درست نمی‌کند.'],
      ['راه تازه را همان روز همه‌جا اجرا می‌کنم', 'اول در یک شهر امتحان کن، بعد همه‌جا اجرا کن.'],
    ]},
  ]},
};

function localizeLessons(copies) {
  return lessonBlueprints.map((base, lessonIndex) => {
    const copy = copies[lessonIndex];
    return {
      ...base,
      title: copy.title, topic: copy.topic, category: copy.category, skill: copy.skill, time: copy.time, takeaways: copy.takeaways,
      steps: base.steps.map((step, stepIndex) => {
        const text = copy.steps[stepIndex];
        const result = { ...step, kicker: text.k, title: text.t, body: text.b };
        if (text.f) result.facts = text.f;
        if (text.p) result.prompt = text.p;
        if (text.c) result.chain = text.c;
        if (step.type === 'choice') result.options = step.options.map((option, index) => ({ ...option, label: text.o[index][0], feedback: text.o[index][1] }));
        if (step.type === 'rank') { result.items = step.items.map((item, index) => ({ ...item, label: text.items[index][0], detail: text.items[index][1] })); result.feedback = text.feedback; }
        if (step.type === 'classify') { result.categories = text.cats; result.categoryIds = step.categories; result.items = step.items.map((item, index) => ({ ...item, text: text.items[index][0], answerId: item.answer, answer: text.cats[step.categories.indexOf(item.answer)], why: text.items[index][1] })); }
        if (step.type === 'multi') result.options = step.options.map((option, index) => ({ ...option, label: text.o[index][0], why: text.o[index][1] }));
        return result;
      }),
    };
  });
}

function localizePractice(copies) {
  return Object.fromEntries(Object.entries(practiceBlueprints).map(([key, base]) => {
    const copy = copies[key];
    return [key, { ...base, title: copy.title, intro: copy.intro, skill: copy.skill, stages: base.stages.map((stage, index) => ({ ...stage, kicker: copy.stages[index].k, title: copy.stages[index].t, body: copy.stages[index].b, prompt: copy.stages[index].p, options: stage.options.map((option, optionIndex) => ({ ...option, label: copy.stages[index].o[optionIndex][0], feedback: copy.stages[index].o[optionIndex][1] })) })) }];
  }));
}

export const lessonSets = { en: localizeLessons(enLessons), fa: localizeLessons(faLessons) };
export const practiceSets = { en: localizePractice(enPractice), fa: localizePractice(faPractice) };
