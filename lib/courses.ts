export type Audience = "kids" | "adults" | "sisters";

export interface CourseQuestion {
  q: string;
  a: string;
}

export interface Course {
  slug: string;
  title: string;
  shortTitle: string;
  audience: Audience[];
  audienceLabel: string;
  level: string;
  format: string;
  tagline: string;
  whoFor: string;
  outcomes: string[];
  howItWorks: string;
  frequencyNote: string;
  teacherNote: string;
  questions: CourseQuestion[];
  keywords: string;
}

/**
 * The 11 Phase-1 courses (spec §6). Ten Qira'at is intentionally NOT in v1.
 * No completion timelines are stated — Ali has not approved any.
 */
export const courses: Course[] = [
  {
    slug: "noorani-qaida",
    title: "Noorani Qaida",
    shortTitle: "Noorani Qaida",
    audience: ["kids", "adults"],
    audienceLabel: "Beginners — kids 4+ and adults starting from zero",
    level: "Beginner",
    format: "Online 1-to-1 · On-campus",
    tagline: "The perfect first step — learn to read Arabic letters correctly from day one.",
    whoFor:
      "Complete beginners of any age: young children (4+) taking their very first step, and adults who want to start reading the Quran from zero.",
    outcomes: [
      "Recognise every Arabic letter in all its shapes",
      "Correct pronunciation from the right articulation points (Makharij)",
      "Join letters into words with confidence",
      "Read with Harakat (Fatha, Kasra, Damma) and Tanween",
      "Understand the basic Madd (stretching) rules",
      "Finish able to read short verses of the Quran",
    ],
    howItWorks:
      "Live 1-to-1 lessons with your own teacher, who listens to every letter and corrects your pronunciation in real time. On-campus classes are available in Khanpur.",
    frequencyNote:
      "Most beginners study 3–5 short classes per week — choose a plan on the Pricing page that fits your routine.",
    teacherNote:
      "Taught by patient teachers experienced with young children and adult beginners. Female teachers are available for sisters and girls.",
    keywords: "Noorani Qaida online, learn Qaida for kids, Qaida classes online",
    questions: [
      { q: "My child has never read Arabic. Is this the right course?", a: "Yes. Noorani Qaida is designed for complete beginners and is the standard first step before reading the Quran itself." },
      { q: "I am an adult starting from zero. Will I be in a class with children?", a: "No. Classes are 1-to-1, so your lessons are private, at your pace, and matched to your age and goals." },
      { q: "What do I need for online Qaida classes?", a: "A phone, tablet or computer with an internet connection. Your teacher guides you through everything else in the free trial class." },
    ],
  },
  {
    slug: "nazra-quran",
    title: "Nazra Quran Reading",
    shortTitle: "Nazra Quran",
    audience: ["kids", "adults", "sisters"],
    audienceLabel: "Students who have finished Noorani Qaida",
    level: "Beginner to Intermediate",
    format: "Online 1-to-1 · On-campus",
    tagline: "Read the full Mushaf fluently, cover to cover, with correct pronunciation.",
    whoFor:
      "Anyone who has completed Noorani Qaida and wants to read the Quran itself fluently — children, adults and sisters.",
    outcomes: [
      "Read the full Mushaf fluently from Surah Al-Fatiha to An-Nas",
      "Correct pronunciation of every word while reading",
      "Smooth, connected reading without spelling out letters",
      "Confidence to read the Quran independently at home",
    ],
    howItWorks:
      "You read aloud to your teacher in every live 1-to-1 class; the teacher listens, corrects mistakes on the spot and tracks how far you have read.",
    frequencyNote:
      "Reading improves fastest with regular short classes — 3–5 classes per week is the usual pattern. See the Pricing page for plans.",
    teacherNote:
      "Your teacher keeps a record of your reading progress so you always know exactly where you are in the Mushaf.",
    keywords: "Nazra Quran online, learn to read Quran, Quran reading classes",
    questions: [
      { q: "Should I finish Qaida before starting Nazra?", a: "Yes — a solid Qaida foundation makes Nazra much faster and prevents pronunciation mistakes from becoming habits." },
      { q: "Can I read to a female teacher?", a: "Yes. Sisters and girls can request a female teacher when booking the free trial class." },
      { q: "Will my progress be tracked?", a: "Yes. Your teacher records the pages and surahs you have completed so progress is always clear." },
    ],
  },
  {
    slug: "tajweed",
    title: "Quran with Tajweed",
    shortTitle: "Tajweed",
    audience: ["kids", "adults", "sisters"],
    audienceLabel: "Students who can already read the Quran",
    level: "Intermediate",
    format: "Online 1-to-1 · On-campus",
    tagline: "Beautify your recitation by applying the rules of Tajweed verse by verse.",
    whoFor:
      "Students who can read the Quran and want to recite it the way it was revealed — with correct, beautiful pronunciation.",
    outcomes: [
      "Apply Noon Sakinah and Meem Sakinah rules correctly",
      "Master the Madd (elongation) rules in real recitation",
      "Know where to stop and start (Waqf) without changing the meaning",
      "Understand the characteristics of the letters (Sifaat)",
      "Apply every rule practically, verse by verse, with personal correction",
    ],
    howItWorks:
      "In live 1-to-1 classes you recite to your teacher, who corrects each rule in context — you learn Tajweed by reciting, not only by theory.",
    frequencyNote:
      "Regular practice matters more than long sessions — most students take 3–5 classes per week. See Pricing for plans.",
    teacherNote:
      "Taught by teachers trained in Tajweed who correct articulation points (Makharij) and letter characteristics in detail.",
    keywords: "Tajweed classes online, learn Tajweed, Tajweed course for adults and kids",
    questions: [
      { q: "Do I need to read fluently before learning Tajweed?", a: "You should be able to read the Mushaf. If reading is still difficult, start with Nazra Quran Reading first." },
      { q: "Is there a separate Tajweed class for kids?", a: "The course is 1-to-1, so the teacher adapts the pace and style for children or adults individually." },
      { q: "Will I only learn theory?", a: "No. Rules are taught briefly and then applied immediately in your own recitation, with correction in every class." },
    ],
  },
  {
    slug: "recitation-qirat",
    title: "Recitation & Tarteel",
    shortTitle: "Recitation & Tarteel",
    audience: ["adults", "sisters"],
    audienceLabel: "Intermediate to advanced readers",
    level: "Intermediate to Advanced",
    format: "Online 1-to-1 · On-campus",
    tagline: "Move from correct reading to fluent, measured and beautiful recitation.",
    whoFor:
      "Intermediate and advanced students who read with Tajweed and want a flowing, confident and beautiful recitation (Tarteel).",
    outcomes: [
      "Recite with a smooth, measured Tarteel pace",
      "Connect verses with proper stopping and starting",
      "Develop a confident, pleasant recitation voice",
      "Recite comfortably in front of others",
    ],
    howItWorks:
      "Advanced 1-to-1 coaching: you recite longer passages while your teacher refines flow, rhythm and delivery.",
    frequencyNote:
      "Students usually combine this course with regular personal practice between classes. Plans are on the Pricing page.",
    teacherNote:
      "Taught by experienced reciters who model the recitation and then coach yours passage by passage.",
    keywords: "Tarteel course, Quran recitation classes, improve Quran recitation",
    questions: [
      { q: "How is this different from the Tajweed course?", a: "Tajweed teaches the rules; Recitation & Tarteel focuses on flow, rhythm and beauty once the rules are in place." },
      { q: "Do I need Tajweed first?", a: "A working knowledge of Tajweed is recommended. Your level is assessed in the free trial class." },
      { q: "Can this prepare me to lead or recite publicly?", a: "Yes — building confident, correct recitation in front of others is one of the goals of this course." },
    ],
  },
  {
    slug: "hifz",
    title: "Hifz — Quran Memorisation",
    shortTitle: "Hifz Program",
    audience: ["kids", "adults", "sisters"],
    audienceLabel: "Fluent readers — full Quran or partial (Juz 'Amma / selected surahs)",
    level: "Intermediate to Advanced",
    format: "Online 1-to-1 · On-campus",
    tagline: "Memorise the Quran with Tajweed — and retain it for life with a proven revision system.",
    whoFor:
      "Children and adults who read fluently and want to memorise the whole Quran, or a part of it such as Juz 'Amma or selected surahs.",
    outcomes: [
      "Memorise new verses daily with correct Tajweed from the first repetition",
      "Retain old memorisation through a structured revision cycle",
      "Regular testing so weak spots are found and fixed early",
      "A personal memorisation plan matched to your pace",
    ],
    howItWorks:
      "Every class follows the proven three-part system: Sabaq (today's new lesson), Sabqi (revision of recent lessons) and Manzil (revision of everything memorised so far).",
    frequencyNote:
      "Hifz works best with frequent classes — most Hifz students study 5 days a week. See the Pricing page for the matching plans.",
    teacherNote:
      "Your teacher tracks every page memorised and revised, and parents receive progress updates (see the FAQ on the home page).",
    keywords: "online Hifz program, Quran memorisation classes, Hifz for kids online",
    questions: [
      { q: "Can I memorise only part of the Quran?", a: "Yes. Many students start with Juz 'Amma or selected surahs. Full-Hifz and partial tracks are both available." },
      { q: "Do I need to read fluently before Hifz?", a: "Yes — fluent reading with basic Tajweed is required so memorisation is correct from the start. Your level is checked in the free trial." },
      { q: "How do you make sure I don't forget?", a: "The Sabaq + Sabqi + Manzil system revises recent and old memorisation in every class, with regular tests." },
    ],
  },
  {
    slug: "ijazah",
    title: "Ijazah",
    shortTitle: "Ijazah",
    audience: ["adults", "sisters"],
    audienceLabel: "Advanced students — entry by assessment",
    level: "Advanced",
    format: "Online 1-to-1 · On-campus",
    tagline: "Earn an Ijazah with sanad in Hafs 'an 'Asim and become authorised to teach.",
    whoFor:
      "Advanced reciters and Huffaz who want a formal Ijazah — certification with an unbroken chain (sanad) — in the narration of Hafs 'an 'Asim.",
    outcomes: [
      "Recite the entire Quran to a qualified teacher from memory or by reading, to the teacher's standard",
      "Perfect advanced Tajweed in preparation for certification",
      "Receive an Ijazah certificate with sanad on successful completion",
      "Become qualified to teach others",
    ],
    howItWorks:
      "Entry is by assessment, not by booking alone. You recite to a qualified teacher in 1-to-1 sessions until the required standard is reached.",
    frequencyNote:
      "There is no fixed duration — it depends on how many sessions you take each week and how long it takes to reach your tutor's standard.",
    teacherNote:
      "Ijazah is granted only by teachers who themselves hold Ijazah with sanad.",
    keywords: "Ijazah program online, Quran Ijazah with sanad, Ijazah course",
    questions: [
      { q: "What is Ijazah?", a: "Ijazah is a formal authorisation to teach the Quran, given after you recite the whole Quran to a qualified teacher to a high standard. The certificate carries the chain of teachers (sanad) back through generations." },
      { q: "Can anyone enrol directly?", a: "Entry is by assessment. Book a free trial class and your recitation will be assessed to confirm you are ready." },
      { q: "How long does Ijazah take?", a: "It varies by student — it depends on your weekly sessions and how quickly you reach the tutor's standard. No fixed timeline is promised." },
    ],
  },
  {
    slug: "tafsir",
    title: "Tafsir",
    shortTitle: "Tafsir",
    audience: ["adults"],
    audienceLabel: "Advanced readers who want to understand the Quran deeply",
    level: "Advanced",
    format: "Online 1-to-1 · On-campus",
    tagline: "Understand what you recite — verse-by-verse meaning, context and lessons.",
    whoFor:
      "Students who can read and translate the Quran and want a deeper understanding of its meanings and the context in which verses were revealed.",
    outcomes: [
      "Understand verses with their context of revelation (Shan-e-Nuzool)",
      "Study classical interpretations in an accessible way",
      "Draw practical lessons for daily life from every passage",
      "Connect related verses across the Quran",
    ],
    howItWorks:
      "Guided 1-to-1 study, surah by surah, with your teacher explaining meaning, background and interpretation in clear language.",
    frequencyNote:
      "Tafsir is usually studied 2–3 times a week alongside personal reading. See Pricing for plans.",
    teacherNote:
      "Taught by teachers with advanced Islamic studies background.: Ali to confirm teacher credentials.",
    keywords: "Tafsir classes online, learn Tafsir, Quran Tafsir course",
    questions: [
      { q: "Should I study Translation before Tafsir?", a: "It helps. If you cannot yet understand the words, start with the Quran Translation course and move to Tafsir after." },
      { q: "Which Tafsir books are used?", a: "Your teacher will confirm the references used at QIT in your free trial class." },
      { q: "Is Tafsir suitable for beginners?", a: "It is an advanced course. Beginners should start with Qaida, Nazra and Translation first." },
    ],
  },
  {
    slug: "quran-translation",
    title: "Quran Translation",
    shortTitle: "Translation",
    audience: ["adults", "sisters", "kids"],
    audienceLabel: "Readers who want to understand the words they recite",
    level: "Intermediate",
    format: "Online 1-to-1 · On-campus",
    tagline: "Word-by-word translation in English and Urdu so your recitation gains meaning.",
    whoFor:
      "Anyone who recites the Quran and wants to understand it — ideal alongside Nazra or Tajweed, and a natural step before Tafsir.",
    outcomes: [
      "Understand the Quran word by word (English / Urdu)",
      "Build a strong core Quranic vocabulary",
      "Follow the meaning while you recite in prayer",
      "Prepare the foundation for studying Tafsir",
    ],
    howItWorks:
      "In 1-to-1 classes your teacher takes you verse by verse, explaining each word and the overall meaning of the passage.",
    frequencyNote:
      "Often combined with a reading course — 2–3 translation classes per week is common. See Pricing for plans.",
    teacherNote:
      "Teachers explain in simple English and Urdu so students of both languages can follow comfortably.",
    keywords: "Quran translation course, word by word Quran translation, learn Quran meaning",
    questions: [
      { q: "Is the translation in English or Urdu?", a: "Both are available — tell us your preference when you book the free trial class." },
      { q: "Can I take Translation with Nazra or Tajweed?", a: "Yes, many students combine them so reading skill and understanding grow together." },
      { q: "Do I need to know Arabic grammar first?", a: "No. Vocabulary is built gradually; the Arabic Language course adds grammar (Sarf & Nahw) if you want to go further." },
    ],
  },
  {
    slug: "arabic-language",
    title: "Arabic Language",
    shortTitle: "Arabic Language",
    audience: ["kids", "adults"],
    audienceLabel: "Kids, adults and Quranic-Arabic learners",
    level: "Beginner to Intermediate",
    format: "Online 1-to-1 · On-campus",
    tagline: "Read, write and speak Arabic — including the Arabic of the Quran.",
    whoFor:
      "Children and adults who want to learn Arabic as a language: for the Quran, for school, or for everyday communication.",
    outcomes: [
      "Read and write Arabic confidently",
      "Hold everyday conversations in Arabic",
      "Understand basic grammar — Sarf (word forms) and Nahw (sentence structure)",
      "Understand Quranic Arabic with growing independence",
    ],
    howItWorks:
      "Structured 1-to-1 lessons following three tracks: Arabic for Kids, Arabic for Adults, and Quranic Arabic — your teacher places you in the right track after the free trial.",
    frequencyNote:
      "Language learning rewards consistency — 3–5 short classes per week works well. See Pricing for plans.",
    teacherNote:
      "Lessons are adapted to your goal: school support for kids, conversation for adults, or Quran-focused Arabic.",
    keywords: "Arabic language course online, learn Arabic for kids, Quranic Arabic course",
    questions: [
      { q: "Which Arabic track is right for me?", a: "Tell us your goal in the free trial — kids' Arabic, adult conversation, or Quranic Arabic — and your teacher will place you in the right track." },
      { q: "Is grammar included?", a: "Yes, basic Sarf and Nahw are introduced gradually and always through real examples." },
      { q: "Can children learn Arabic here too?", a: "Yes — the kids' track uses a child-friendly pace and materials, always 1-to-1." },
    ],
  },
  {
    slug: "islamic-studies",
    title: "Islamic Studies",
    shortTitle: "Islamic Studies",
    audience: ["kids", "adults", "sisters"],
    audienceLabel: "Kids, adults and new Muslims",
    level: "Beginner to Intermediate",
    format: "Online 1-to-1 · On-campus",
    tagline: "The essentials of Islam — Salah, Seerah, manners and everyday guidance.",
    whoFor:
      "Children building their Islamic foundation, and adults or new Muslims who want structured, essential Islamic knowledge.",
    outcomes: [
      "Pray Salah and make Wudu correctly, step by step",
      "Learn the Seerah — the life of the Prophet Muhammad ﷺ",
      "Daily duas, Kalimas and Islamic manners (Akhlaq)",
      "Understand the Five Pillars of Islam",
      "At the advanced level: Aqeedah, Fiqh and Hadith essentials",
    ],
    howItWorks:
      "Friendly 1-to-1 lessons that often run alongside a Quran course, with topics sequenced from the essentials upward.",
    frequencyNote:
      "Many students add 1–2 Islamic Studies classes per week to their Quran plan. See Pricing for plans.",
    teacherNote:
      "Teachers present authentic knowledge in simple, age-appropriate language — especially important for children and new Muslims.",
    keywords: "Islamic studies for kids online, Islamic classes for new Muslims, Seerah classes",
    questions: [
      { q: "Can Islamic Studies be combined with a Quran course?", a: "Yes — it is commonly taken alongside Qaida or Nazra so children learn practice and manners together with reading." },
      { q: "Is this suitable for new Muslims (reverts)?", a: "Yes. The adult track starts from the essentials — Salah, Wudu, the Five Pillars — and builds up at your pace." },
      { q: "What topics are covered for children?", a: "Salah and Wudu, daily duas, Kalimas, Seerah stories, and Islamic manners (Akhlaq)." },
    ],
  },
  {
    slug: "duas-salah",
    title: "Daily Duas, Kalimas & Salah",
    shortTitle: "Duas & Salah",
    audience: ["kids", "adults", "sisters"],
    audienceLabel: "All beginners — children, adults and new Muslims",
    level: "Beginner",
    format: "Online 1-to-1 · On-campus",
    tagline: "Learn the duas for every day, the Kalimas, and how to pray Salah correctly.",
    whoFor:
      "Every beginner: children starting their Islamic learning, adults filling gaps, and new Muslims learning how to pray.",
    outcomes: [
      "Memorise the daily duas and adhkar with their meanings",
      "Learn all the Kalimas correctly",
      "Pray Salah step by step — positions, recitations and common mistakes corrected",
      "Build a daily routine of remembrance",
    ],
    howItWorks:
      "Short, practical 1-to-1 lessons with memorisation and practice in every class. This course is also bundled as a module with Qaida and Nazra learning.",
    frequencyNote:
      "Often taken 1–3 times a week, or combined into an existing Quran plan. See Pricing for options.",
    teacherNote:
      "Teachers check your Salah practically and patiently — this course is designed to be encouraging, never embarrassing.",
    keywords: "learn Salah step by step, daily duas for kids, Kalimas course",
    questions: [
      { q: "I am a new Muslim. Can this teach me to pray?", a: "Yes — Salah is taught step by step from Wudu to the final Tashahhud, at a pace you are comfortable with." },
      { q: "Are the duas taught with meanings?", a: "Yes. Every dua is memorised together with its meaning so you know what you are saying." },
      { q: "Can my child take this with Noorani Qaida?", a: "Yes, the two are commonly combined for children." },
    ],
  },

  {
    slug: "o-level",
    title: "O Level",
    shortTitle: "O Level",
    audience: ["kids"],
    audienceLabel: "School students preparing for Cambridge O Level exams",
    level: "School — O Level",
    format: "Online 1-to-1 · On-campus",
    tagline: "Complete O Level preparation with a personal teacher for every subject.",
    whoFor:
      "School students in grades 9–11 preparing for Cambridge O Level examinations who want focused, one-to-one help beyond the classroom.",
    outcomes: [
      "Full syllabus coverage for your chosen O Level subjects",
      "Past-paper practice with examiner-style feedback",
      "Clear concepts instead of memorised answers",
      "Regular tests and progress reports for parents",
      "Exam technique: timing, marking schemes and common mistakes",
      "Confidence to sit the exam fully prepared",
    ],
    howItWorks:
      "Live 1-to-1 lessons matched to your school syllabus and exam board, with homework, chapter tests and past-paper sessions built into your routine.",
    frequencyNote:
      "Most O Level students study 3–6 classes per week — choose a plan on the Pricing page that fits your school routine.",
    teacherNote:
      "Taught by experienced school-subject teachers. Female teachers are available for girls.",
    keywords: "O Level tuition online, Cambridge O Level classes, O Level tutor Pakistan",
    questions: [
      { q: "Which O Level subjects can I study?", a: "All major subjects — including Mathematics, English, Physics, Chemistry, Biology, Computer Science, Urdu, Islamiyat and Pakistan Studies. Tell us your subjects in the free trial class." },
      { q: "Do you follow the Cambridge syllabus?", a: "Yes. Lessons follow the Cambridge O Level syllabus for your exam session, with past-paper practice throughout the course." },
      { q: "Can parents see my progress?", a: "Yes. Parents receive regular progress updates and test results, just like our Quran courses." },
    ],
  },
  {
    slug: "a-level",
    title: "A Level",
    shortTitle: "A Level",
    audience: ["kids", "adults"],
    audienceLabel: "College students preparing for Cambridge A Level exams",
    level: "School — A Level",
    format: "Online 1-to-1 · On-campus",
    tagline: "Advanced A Level teaching that turns hard topics into high grades.",
    whoFor:
      "AS and A2 students preparing for Cambridge A Level examinations who need deep concept clarity and serious exam practice, one-to-one.",
    outcomes: [
      "Complete AS and A2 syllabus coverage for your subjects",
      "Deep understanding of advanced concepts, step by step",
      "Structured past-paper training with model answers",
      "Regular topic tests and progress reports",
      "Exam strategy for structured and essay questions",
      "Strong preparation for university entry",
    ],
    howItWorks:
      "Live 1-to-1 lessons planned around your exam session, with topic-wise teaching, worked examples and timed past-paper practice.",
    frequencyNote:
      "Most A Level students study 3–6 classes per week — choose a plan on the Pricing page that fits your college routine.",
    teacherNote:
      "Taught by qualified subject specialists with A Level teaching experience. Female teachers are available for girls.",
    keywords: "A Level tuition online, Cambridge A Level classes, A Level tutor Pakistan",
    questions: [
      { q: "Which A Level subjects do you cover?", a: "All major subjects — including Mathematics, Further Mathematics, Physics, Chemistry, Biology, Computer Science, Economics, Business and English. Confirm your subjects in the free trial class." },
      { q: "I am struggling with one subject only. Can I join for just that?", a: "Yes. You can register for a single subject or several — the plan is built around what you need." },
      { q: "Do you practise past papers?", a: "Yes — past-paper practice with marking-scheme feedback is a core part of every A Level course at QIT." },
    ],
  },
  {
    slug: "persian-language",
    title: "Persian Language",
    shortTitle: "Persian Language",
    audience: ["kids", "adults"],
    audienceLabel: "Anyone who wants to speak, read and write Persian (Farsi)",
    level: "Beginner to Advanced",
    format: "Online 1-to-1 · On-campus",
    tagline: "Learn Persian step by step — speak, read and write Farsi with confidence.",
    whoFor:
      "Beginners and improvers of any age who want to learn Persian for study, work, travel, family or an interest in Persian literature and poetry.",
    outcomes: [
      "Read and write the Persian script fluently",
      "Hold everyday conversations in Persian",
      "Build a strong working vocabulary, topic by topic",
      "Understand Persian grammar through simple, clear rules",
      "Read short Persian texts, stories and poems",
      "Speak with correct pronunciation from the start",
    ],
    howItWorks:
      "Live 1-to-1 lessons at your pace: script and sounds first, then conversation, reading and writing in every class.",
    frequencyNote:
      "Most language students study 3–5 classes per week — choose a plan on the Pricing page that fits your routine.",
    teacherNote:
      "Taught by teachers fluent in Persian with experience teaching it as a foreign language. Female teachers are available for sisters.",
    keywords: "Persian language course online, learn Farsi online, Persian classes Pakistan",
    questions: [
      { q: "I know no Persian at all. Can I start?", a: "Yes. The course starts from the script and basic sounds, so complete beginners are welcome." },
      { q: "Is Persian similar to Urdu?", a: "Persian uses a script close to Urdu and shares much vocabulary, so Urdu speakers usually progress quickly — your teacher builds on what you already know." },
      { q: "Will I learn to speak or only read?", a: "Both. Every lesson includes speaking practice alongside reading and writing." },
    ],
  },
  {
    slug: "urdu-language",
    title: "Urdu Language",
    shortTitle: "Urdu Language",
    audience: ["kids", "adults"],
    audienceLabel: "Kids and adults who want to read, write and speak Urdu beautifully",
    level: "Beginner to Advanced",
    format: "Online 1-to-1 · On-campus",
    tagline: "Read, write and speak Urdu with confidence — at home or anywhere in the world.",
    whoFor:
      "Children and adults — especially Pakistani families living abroad — who want to learn or improve Urdu reading, writing and speaking.",
    outcomes: [
      "Read Urdu script fluently, letter by letter",
      "Write correct Urdu with proper spelling",
      "Speak Urdu confidently in daily conversation",
      "Build rich Urdu vocabulary and sentence structure",
      "Read Urdu stories, poems and newspapers",
      "Understand Urdu grammar in a simple, practical way",
    ],
    howItWorks:
      "Live 1-to-1 lessons starting from your level: Qaida-style script foundations for beginners, then reading, writing and conversation practice.",
    frequencyNote:
      "Most language students study 3–5 classes per week — choose a plan on the Pricing page that fits your routine.",
    teacherNote:
      "Taught by native Urdu teachers experienced with children and overseas learners. Female teachers are available for sisters and girls.",
    keywords: "Urdu language course online, learn Urdu for kids, Urdu classes online",
    questions: [
      { q: "My child speaks Urdu but cannot read it. Is this course suitable?", a: "Yes — that is exactly who this course is for. We start from the script and build reading and writing step by step." },
      { q: "We live outside Pakistan. Can we join?", a: "Yes. All classes are online 1-to-1 and timings are arranged around your country's time zone." },
      { q: "Do adults join this course too?", a: "Yes. Adult learners follow the same structure at their own pace, with more focus on reading, writing and formal Urdu." },
    ],
  },
  {
    slug: "mathematics",
    title: "Mathematics",
    shortTitle: "Mathematics",
    audience: ["kids", "adults"],
    audienceLabel: "School and college students who want strong, stress-free Maths",
    level: "School & College",
    format: "Online 1-to-1 · On-campus",
    tagline: "Maths made simple — concepts first, then practice until it clicks.",
    whoFor:
      "School and college students (including O Level and A Level) who want to understand Mathematics deeply, improve grades and stop fearing exams.",
    outcomes: [
      "Clear understanding of every topic, from basics to advanced",
      "Fast, accurate problem-solving methods",
      "Regular practice questions and chapter tests",
      "Full exam preparation with past papers",
      "Progress reports so parents can follow improvement",
      "Confidence in class, in tests and in the exam hall",
    ],
    howItWorks:
      "Live 1-to-1 lessons: your teacher explains each concept with worked examples, then guides your practice and corrects mistakes on the spot.",
    frequencyNote:
      "Most Maths students study 3–6 classes per week — choose a plan on the Pricing page that fits your routine.",
    teacherNote:
      "Taught by experienced Mathematics teachers for school and college levels. Female teachers are available for girls and sisters.",
    keywords: "Maths tuition online, Mathematics classes online, Maths tutor Pakistan",
    questions: [
      { q: "Which classes/levels do you teach?", a: "School classes through O Level and A Level Mathematics, including Additional/Further Maths topics on request." },
      { q: "My basics are weak. Can you still help?", a: "Yes. Your teacher first finds and fixes the weak basics, then moves forward — that is the advantage of 1-to-1 teaching." },
      { q: "Do you give homework and tests?", a: "Yes. Regular practice and chapter tests are part of the course, with results shared in progress reports." },
    ],
  },
  {
    slug: "english",
    title: "English",
    shortTitle: "English",
    audience: ["kids", "adults"],
    audienceLabel: "Students and adults who want fluent, correct English",
    level: "Beginner to Advanced",
    format: "Online 1-to-1 · On-campus",
    tagline: "Speak and write English fluently — grammar, vocabulary and confidence.",
    whoFor:
      "School and college students who want better English grades, and adults who want fluent spoken and written English for study, work and daily life.",
    outcomes: [
      "Speak English fluently and without hesitation",
      "Correct grammar in speaking and writing",
      "A rich, practical vocabulary for daily and academic use",
      "Strong reading comprehension skills",
      "Essay, letter and paragraph writing for exams",
      "Clear pronunciation and listening skills",
    ],
    howItWorks:
      "Live 1-to-1 lessons mixing conversation practice, grammar, reading and writing — every class includes real speaking time with your teacher.",
    frequencyNote:
      "Most English students study 3–5 classes per week — choose a plan on the Pricing page that fits your routine.",
    teacherNote:
      "Taught by experienced English teachers for school, college and adult learners. Female teachers are available for sisters and girls.",
    keywords: "English language course online, spoken English classes, English tuition Pakistan",
    questions: [
      { q: "I can understand English but cannot speak it. Will this help?", a: "Yes. The course gives you guided speaking practice in every lesson, which is the fastest way to turn understanding into fluency." },
      { q: "Do you also prepare students for school exams?", a: "Yes — grammar, comprehension and essay writing are taught according to your class and board, including O and A Level English." },
      { q: "Is this course for adults too?", a: "Yes. Adults follow a practical programme focused on speaking, workplace communication and writing." },
    ],
  },
  {
    slug: "science",
    title: "Science",
    shortTitle: "Science",
    audience: ["kids"],
    audienceLabel: "School students learning Physics, Chemistry and Biology",
    level: "School — up to O/A Level",
    format: "Online 1-to-1 · On-campus",
    tagline: "Physics, Chemistry and Biology explained clearly, concept by concept.",
    whoFor:
      "School students (including O Level and A Level) who want clear concepts, better grades and complete exam preparation in the science subjects.",
    outcomes: [
      "Clear concepts in Physics, Chemistry and Biology",
      "Diagrams, definitions and key terms learned properly",
      "Numerical practice for Physics and Chemistry",
      "Chapter tests and regular revision",
      "Past-paper practice with marking-scheme feedback",
      "Progress reports for parents after every stage",
    ],
    howItWorks:
      "Live 1-to-1 lessons with visual explanations, worked examples and quick questions in every class to make sure each concept is truly understood.",
    frequencyNote:
      "Most Science students study 3–6 classes per week — choose a plan on the Pricing page that fits your school routine.",
    teacherNote:
      "Taught by experienced science teachers for school and O/A Level. Female teachers are available for girls.",
    keywords: "Science tuition online, Physics Chemistry Biology classes, Science tutor Pakistan",
    questions: [
      { q: "Can I study only one science subject?", a: "Yes. Join for Physics, Chemistry or Biology alone, or study all three — the plan follows your needs." },
      { q: "Do you cover practical (ATP) papers?", a: "Yes. Alternative-to-Practical and practical-based questions are practised with past papers at O and A Level." },
      { q: "How do parents follow progress?", a: "Through regular progress reports and test results, the same as all QIT courses." },
    ],
  },
];

export function getCourse(slug: string): Course | undefined {
  return courses.find((c) => c.slug === slug);
}
