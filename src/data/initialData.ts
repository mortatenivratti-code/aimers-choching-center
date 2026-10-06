import {
  TargetClass,
  SubjectItem,
  ChapterItem,
  NoteItem,
  MockTest,
  AchieverStudent,
  TestimonialItem,
  StatItem,
  FaqItem
} from '../types';
import {
  MAHARASHTRA_BOARD_SUBJECTS,
  MAHARASHTRA_BOARD_CHAPTERS,
  MAHARASHTRA_BOARD_NOTES,
  MAHARASHTRA_BOARD_TESTS
} from './maharashtraBoardData';

export {
  MAHARASHTRA_BOARD_SUBJECTS,
  MAHARASHTRA_BOARD_CHAPTERS,
  MAHARASHTRA_BOARD_NOTES,
  MAHARASHTRA_BOARD_TESTS
};

export const INITIAL_STATS: StatItem[] = [
  {
    id: 'stat-1',
    label: 'Students Guided',
    value: '10,000+',
    subtext: 'Across Classes 6–10 in Board & School Exams',
    iconName: 'Users'
  },
  {
    id: 'stat-2',
    label: 'Regular Test Participation',
    value: '95%+',
    subtext: 'Consistent weekly performance evaluation',
    iconName: 'CheckCircle2'
  },
  {
    id: 'stat-3',
    label: 'Curated Mock Tests',
    value: '500+',
    subtext: 'Chapter-wise, periodic & full-syllabus papers',
    iconName: 'FileText'
  },
  {
    id: 'stat-4',
    label: 'Academic Years',
    value: '8+',
    subtext: 'Of student-first educational excellence',
    iconName: 'Award'
  }
];

export const CLASS_METADATA: Record<
  TargetClass,
  {
    tagline: string;
    description: string;
    keyFocus: string[];
    subjects: string[];
    color: string;
    accent: string;
    studentCount: string;
  }
> = {
  'Class 6': {
    tagline: 'Build Your Foundation',
    description: 'Transition smoothly from primary to middle school with strong foundational concepts in Mathematics and Science.',
    keyFocus: ['Concept Clarity', 'Speed Calculation Basics', 'Scientific Curiosity', 'Homework Support'],
    subjects: ['Mathematics', 'Science', 'English', 'Social Science', 'Hindi'],
    color: 'from-blue-600 to-cyan-700',
    accent: 'text-cyan-700 bg-cyan-50 border-cyan-200',
    studentCount: '1,450+ enrolled'
  },
  'Class 7': {
    tagline: 'Strengthen Your Concepts',
    description: 'Deepen logical thinking and analytical problem-solving through structured notes, regular drills, and interactive doubt clearing.',
    keyFocus: ['Algebra Fundamentals', 'Physics & Chemistry Basics', 'Grammar Mastery', 'Weekly Chapter Quizzes'],
    subjects: ['Mathematics', 'Science', 'English', 'Social Science', 'Hindi / Regional'],
    color: 'from-indigo-600 to-blue-700',
    accent: 'text-indigo-700 bg-indigo-50 border-indigo-200',
    studentCount: '1,820+ enrolled'
  },
  'Class 8': {
    tagline: 'Learn. Practice. Improve.',
    description: 'A pivotal year bridging middle school with higher secondary preparation; focus on geometry, linear equations, and biology basics.',
    keyFocus: ['NTSE & Olympiad Base', 'Advanced Geometry', 'Science Lab Concept Modules', 'Time-bound Practice Tests'],
    subjects: ['Mathematics', 'Science', 'English', 'Social Science', 'Computer / IT'],
    color: 'from-sky-600 to-indigo-700',
    accent: 'text-sky-700 bg-sky-50 border-sky-200',
    studentCount: '2,100+ enrolled'
  },
  'Class 9': {
    tagline: 'Prepare for the Next Level',
    description: 'Tackle the rigorous Class 9 curriculum with step-by-step guidance, formula handbooks, and board exam foundational training.',
    keyFocus: ['Quadratic & Coordinate Geometry', 'Physics Numerical Solving', 'Chemical Equations Mastery', 'Exam-Pattern Mock Papers'],
    subjects: ['Mathematics', 'Science (Phy, Chem, Bio)', 'English Language & Lit', 'Social Science (Hist, Civ, Geo, Eco)', 'Computer / IT'],
    color: 'from-amber-600 to-orange-700',
    accent: 'text-amber-700 bg-amber-50 border-amber-200',
    studentCount: '2,600+ enrolled'
  },
  'Class 10': {
    tagline: 'Board Exam Focus',
    description: 'Intensive board exam mastery program with PYQs, model answer writing techniques, 10+ full syllabus test series, and 1-on-1 mentorship.',
    keyFocus: ['100% NCERT & Board Coverage', '10 Years Previous Papers', 'Strict Time-Management Mock Drills', 'Topper Answer Sheets Analysis'],
    subjects: ['Mathematics (Standard / Basic)', 'Science', 'English', 'Social Science', 'Hindi / Marathi', 'Information Technology'],
    color: 'from-rose-600 to-red-700',
    accent: 'text-rose-700 bg-rose-50 border-rose-200',
    studentCount: '3,200+ enrolled'
  }
};

export const INITIAL_SUBJECTS: SubjectItem[] = [
  {
    id: 'sub-math-10',
    name: 'Mathematics',
    class: 'Class 10',
    iconName: 'Calculator',
    description: 'Real Numbers, Polynomials, Linear Equations, Quadratic, AP, Triangles, Trigonometry, Circles & Statistics.',
    totalChapters: 14,
    notesCount: 28,
    testsCount: 22,
    color: 'bg-blue-50 text-blue-700 border-blue-200'
  },
  {
    id: 'sub-sci-10',
    name: 'Science',
    class: 'Class 10',
    iconName: 'FlaskConical',
    description: 'Chemical Reactions, Acids & Bases, Metals, Life Processes, Light, Electricity & Magnetic Effects.',
    totalChapters: 13,
    notesCount: 26,
    testsCount: 20,
    color: 'bg-emerald-50 text-emerald-700 border-emerald-200'
  },
  {
    id: 'sub-sst-10',
    name: 'Social Science',
    class: 'Class 10',
    iconName: 'Globe',
    description: 'Rise of Nationalism in Europe, Resources & Development, Power Sharing, Money & Credit.',
    totalChapters: 16,
    notesCount: 32,
    testsCount: 15,
    color: 'bg-amber-50 text-amber-700 border-amber-200'
  },
  {
    id: 'sub-eng-10',
    name: 'English Language & Lit',
    class: 'Class 10',
    iconName: 'BookOpen',
    description: 'Reading comprehension, writing skills, grammar masterclasses, First Flight & Footprints without Feet.',
    totalChapters: 18,
    notesCount: 24,
    testsCount: 12,
    color: 'bg-purple-50 text-purple-700 border-purple-200'
  },
  {
    id: 'sub-hin-10',
    name: 'Hindi / Marathi',
    class: 'Class 10',
    iconName: 'Languages',
    description: 'Sparsh, Sanchayan, Vyakaran, formal letter writing, Nibandh, and board unseen passages.',
    totalChapters: 14,
    notesCount: 18,
    testsCount: 10,
    color: 'bg-rose-50 text-rose-700 border-rose-200'
  },
  {
    id: 'sub-it-10',
    name: 'Computer / IT',
    class: 'Class 10',
    iconName: 'Laptop',
    description: 'Digital Documentation, Electronic Spreadsheets, DBMS and Web Applications & Security.',
    totalChapters: 8,
    notesCount: 12,
    testsCount: 8,
    color: 'bg-cyan-50 text-cyan-700 border-cyan-200'
  },
  // Class 9 Sample Subjects
  {
    id: 'sub-math-9',
    name: 'Mathematics',
    class: 'Class 9',
    iconName: 'Calculator',
    description: 'Number Systems, Polynomials, Coordinate Geometry, Linear Equations, Triangles, Quadrilaterals, Circles & Surface Areas.',
    totalChapters: 12,
    notesCount: 24,
    testsCount: 18,
    color: 'bg-blue-50 text-blue-700 border-blue-200'
  },
  {
    id: 'sub-sci-9',
    name: 'Science',
    class: 'Class 9',
    iconName: 'Atom',
    description: 'Matter in Our Surroundings, Atoms & Molecules, The Fundamental Unit of Life, Motion, Force & Laws of Motion.',
    totalChapters: 12,
    notesCount: 22,
    testsCount: 16,
    color: 'bg-emerald-50 text-emerald-700 border-emerald-200'
  },
  // Class 8 Sample Subjects
  {
    id: 'sub-math-8',
    name: 'Mathematics',
    class: 'Class 8',
    iconName: 'Calculator',
    description: 'Rational Numbers, Linear Equations, Understanding Quadrilaterals, Square Roots, Algebraic Expressions & Mensuration.',
    totalChapters: 11,
    notesCount: 20,
    testsCount: 14,
    color: 'bg-blue-50 text-blue-700 border-blue-200'
  },
  {
    id: 'sub-sci-8',
    name: 'Science',
    class: 'Class 8',
    iconName: 'FlaskConical',
    description: 'Crop Production, Microorganisms, Coal & Petroleum, Combustion, Cell Structure, Force & Pressure, Sound, Light.',
    totalChapters: 11,
    notesCount: 19,
    testsCount: 12,
    color: 'bg-emerald-50 text-emerald-700 border-emerald-200'
  },
  ...MAHARASHTRA_BOARD_SUBJECTS
];

export const INITIAL_CHAPTERS: ChapterItem[] = [
  // Class 10 Maths
  {
    id: 'ch-math-10-1',
    subjectId: 'sub-math-10',
    subjectName: 'Mathematics',
    class: 'Class 10',
    chapterNumber: 1,
    title: 'Real Numbers',
    description: 'Fundamental Theorem of Arithmetic, revisiting irrational numbers, proofs of irrationality of √2, √3, √5.',
    topics: ['Fundamental Theorem of Arithmetic', 'Revisiting Irrational Numbers', 'Decimal Expansions Review', 'HCF and LCM Applications'],
    board: 'CBSE',
    hasNotes: true,
    practiceQuestionsCount: 25,
    mockTestId: 'test-ch-math-1',
    importantMarksWeightage: '6 Marks'
  },
  {
    id: 'ch-math-10-2',
    subjectId: 'sub-math-10',
    subjectName: 'Mathematics',
    class: 'Class 10',
    chapterNumber: 2,
    title: 'Polynomials',
    description: 'Geometrical meaning of zeroes of a polynomial, relationship between zeroes and coefficients of quadratic polynomials.',
    topics: ['Geometrical Meaning of Zeroes', 'Relationship between Zeroes & Coefficients', 'Quadratic Factorization Techniques'],
    board: 'CBSE',
    hasNotes: true,
    practiceQuestionsCount: 30,
    mockTestId: 'test-ch-math-2',
    importantMarksWeightage: '5 Marks'
  },
  {
    id: 'ch-math-10-3',
    subjectId: 'sub-math-10',
    subjectName: 'Mathematics',
    class: 'Class 10',
    chapterNumber: 3,
    title: 'Pair of Linear Equations in Two Variables',
    description: 'Graphical method of solution, consistency/inconsistency, algebraic methods: substitution and elimination methods.',
    topics: ['Graphical Representation', 'Substitution Method', 'Elimination Method', 'Word Problems & Real-life Modeling'],
    board: 'CBSE',
    hasNotes: true,
    practiceQuestionsCount: 40,
    mockTestId: 'test-ch-math-3',
    importantMarksWeightage: '7 Marks'
  },
  {
    id: 'ch-math-10-4',
    subjectId: 'sub-math-10',
    subjectName: 'Mathematics',
    class: 'Class 10',
    chapterNumber: 4,
    title: 'Quadratic Equations',
    description: 'Standard form ax² + bx + c = 0, solutions by factorization and quadratic formula, nature of roots.',
    topics: ['Standard Form of Quadratic Equation', 'Factorization Method', 'Quadratic Formula (Discriminant D)', 'Nature of Roots (D > 0, D = 0, D < 0)'],
    board: 'CBSE',
    hasNotes: true,
    practiceQuestionsCount: 35,
    mockTestId: 'test-ch-math-4',
    importantMarksWeightage: '6 Marks'
  },
  {
    id: 'ch-math-10-5',
    subjectId: 'sub-math-10',
    subjectName: 'Mathematics',
    class: 'Class 10',
    chapterNumber: 5,
    title: 'Arithmetic Progressions',
    description: 'Motivation for studying AP, nth term of an AP, sum of the first n terms of an AP and practical daily applications.',
    topics: ['Common Difference (d)', 'nth Term Formula an = a + (n-1)d', 'Sum of n Terms Sn = n/2[2a+(n-1)d]', 'Application Word Problems'],
    board: 'CBSE',
    hasNotes: true,
    practiceQuestionsCount: 32,
    mockTestId: 'test-ch-math-5',
    importantMarksWeightage: '6 Marks'
  },
  {
    id: 'ch-math-10-8',
    subjectId: 'sub-math-10',
    subjectName: 'Mathematics',
    class: 'Class 10',
    chapterNumber: 8,
    title: 'Introduction to Trigonometry',
    description: 'Trigonometric ratios of an acute angle, values of 0°, 30°, 45°, 60°, 90°, trigonometric identities.',
    topics: ['Trigonometric Ratios (sin, cos, tan, cot, sec, cosec)', 'Trig Values Table', 'Fundamental Identity sin²θ + cos²θ = 1', 'Proofs of Identities'],
    board: 'CBSE',
    hasNotes: true,
    practiceQuestionsCount: 45,
    mockTestId: 'test-ch-math-8',
    importantMarksWeightage: '8 Marks'
  },
  // Class 10 Science
  {
    id: 'ch-sci-10-1',
    subjectId: 'sub-sci-10',
    subjectName: 'Science',
    class: 'Class 10',
    chapterNumber: 1,
    title: 'Chemical Reactions and Equations',
    description: 'Chemical equation, Balanced chemical equation, implication of a balanced chemical equation, types of chemical reactions.',
    topics: ['Balancing Chemical Equations', 'Combination & Decomposition', 'Displacement & Double Displacement', 'Redox Reactions, Corrosion & Rancidity'],
    board: 'CBSE',
    hasNotes: true,
    practiceQuestionsCount: 30,
    mockTestId: 'test-ch-sci-1',
    importantMarksWeightage: '7 Marks'
  },
  {
    id: 'ch-sci-10-6',
    subjectId: 'sub-sci-10',
    subjectName: 'Science',
    class: 'Class 10',
    chapterNumber: 6,
    title: 'Life Processes',
    description: 'Basic concept of nutrition, respiration, transport and excretion in plants and animals.',
    topics: ['Autotrophic & Heterotrophic Nutrition', 'Human Digestive System', 'Aerobic & Anaerobic Respiration', 'Human Circulatory & Excretory System'],
    board: 'CBSE',
    hasNotes: true,
    practiceQuestionsCount: 38,
    mockTestId: 'test-ch-sci-6',
    importantMarksWeightage: '9 Marks'
  },
  {
    id: 'ch-sci-10-10',
    subjectId: 'sub-sci-10',
    subjectName: 'Science',
    class: 'Class 10',
    chapterNumber: 10,
    title: 'Light – Reflection and Refraction',
    description: 'Reflection by curved surfaces, images formed by spherical mirrors, center of curvature, principal axis, lens formula, magnification.',
    topics: ['Mirror Formula & Magnification', 'Refraction & Snell’s Law', 'Convex & Concave Lenses', 'Power of a Lens (P = 1/f)'],
    board: 'CBSE',
    hasNotes: true,
    practiceQuestionsCount: 42,
    mockTestId: 'test-ch-sci-10',
    importantMarksWeightage: '10 Marks'
  },
  // Class 9 Samples
  {
    id: 'ch-math-9-1',
    subjectId: 'sub-math-9',
    subjectName: 'Mathematics',
    class: 'Class 9',
    chapterNumber: 1,
    title: 'Number Systems',
    description: 'Irrational numbers, real numbers and their decimal expansions, representing real numbers on the number line, laws of exponents.',
    topics: ['Rational & Irrational Numbers', 'Decimal Expansions (Terminating / Non-terminating)', 'Rationalizing the Denominator', 'Laws of Exponents for Real Numbers'],
    board: 'CBSE',
    hasNotes: true,
    practiceQuestionsCount: 28,
    mockTestId: 'test-ch-math-9-1',
    importantMarksWeightage: '6 Marks'
  },
  {
    id: 'ch-sci-9-1',
    subjectId: 'sub-sci-9',
    subjectName: 'Science',
    class: 'Class 9',
    chapterNumber: 1,
    title: 'Matter in Our Surroundings',
    description: 'Physical nature of matter, characteristics of particles of matter, states of matter, latent heat, evaporation.',
    topics: ['Solid, Liquid, Gas States', 'Effect of Temperature & Pressure', 'Latent Heat of Fusion & Vaporization', 'Evaporation Factors & Cooling Effect'],
    board: 'CBSE',
    hasNotes: true,
    practiceQuestionsCount: 24,
    mockTestId: 'test-ch-sci-9-1',
    importantMarksWeightage: '5 Marks'
  },
  // Class 8 Samples
  {
    id: 'ch-math-8-1',
    subjectId: 'sub-math-8',
    subjectName: 'Mathematics',
    class: 'Class 8',
    chapterNumber: 1,
    title: 'Rational Numbers',
    description: 'Properties of rational numbers (closure, commutativity, associativity, distributivity), representation on number line.',
    topics: ['Closure & Commutative Properties', 'Additive & Multiplicative Inverse', 'Distributive Property', 'Rational Numbers between Two Numbers'],
    board: 'CBSE',
    hasNotes: true,
    practiceQuestionsCount: 20,
    mockTestId: 'test-ch-math-8-1',
    importantMarksWeightage: '6 Marks'
  },
  ...MAHARASHTRA_BOARD_CHAPTERS
];

export const INITIAL_NOTES: NoteItem[] = [
  {
    id: 'note-math-10-ch1',
    title: 'Real Numbers — Complete Revision Notes & Proofs',
    subject: 'Mathematics',
    class: 'Class 10',
    chapterNumber: 1,
    board: 'CBSE',
    medium: 'English',
    description: 'Handwritten crisp formulas, step-by-step proofs of irrationality of √2 & √3, HCF-LCM relation, and 10 expected board exam questions.',
    pageCount: 8,
    lastUpdated: 'Sept 2026',
    fileSize: '2.4 MB',
    recommendedForExam: true,
    keyTopics: ['Fundamental Theorem of Arithmetic', 'Irrationality Proofs', 'HCF x LCM = a x b', 'Terminal Expansions'],
    contentPreview: {
      summary: 'A comprehensive study module designed for quick pre-exam revision. Emphasizes proofs that guarantee 3-marks in board examinations.',
      keyPoints: [
        'Fundamental Theorem of Arithmetic states that every composite number can be expressed (factorized) as a product of primes uniquely.',
        'If p is a prime number and p divides a², then p divides a, where a is a positive integer.',
        'HCF(a, b) × LCM(a, b) = a × b (Only valid for two numbers, not for three).',
        'A rational number p/q in lowest terms has a terminating decimal expansion if the prime factorization of q is of the form 2ⁿ · 5ᵐ.'
      ],
      importantFormulasOrFacts: [
        'HCF(a, b) × LCM(a, b) = a × b',
        'Theorem: Let x = p/q be a rational number, such that prime factorisation of q is 2ⁿ5ᵐ; then x has a terminating decimal expansion.'
      ],
      sampleQuestions: [
        {
          q: 'Explain why 7 × 11 × 13 + 13 is a composite number.',
          a: 'Taking 13 common: 13(7 × 11 + 1) = 13(77 + 1) = 13 × 78. Since it has factors other than 1 and itself, it is composite by Fundamental Theorem of Arithmetic.'
        },
        {
          q: 'Find HCF and LCM of 96 and 404 using prime factorisation.',
          a: '96 = 2⁵ × 3, 404 = 2² × 101. HCF = 2² = 4. LCM = (96 × 404) / 4 = 9696.'
        }
      ]
    }
  },
  {
    id: 'note-math-10-ch4',
    title: 'Quadratic Equations — Formulas & Word Problems',
    subject: 'Mathematics',
    class: 'Class 10',
    chapterNumber: 4,
    board: 'CBSE',
    medium: 'English',
    description: 'Discriminant analysis, nature of roots, speed-distance-time word problem templates, and previous 5 years board questions.',
    pageCount: 12,
    lastUpdated: 'August 2026',
    fileSize: '3.1 MB',
    recommendedForExam: true,
    keyTopics: ['ax² + bx + c = 0', 'Discriminant D = b² - 4ac', 'Nature of Roots', 'Speed-Boat Problem Framework'],
    contentPreview: {
      summary: 'Master quadratic formulas, factorization tricks, and the step-by-step method to convert tricky verbal problems into equations.',
      keyPoints: [
        'A quadratic equation in variable x is an equation of the form ax² + bx + c = 0, where a, b, c are real numbers and a ≠ 0.',
        'The roots of ax² + bx + c = 0 are given by x = (-b ± √(b² - 4ac)) / (2a).',
        'If D = b² - 4ac > 0, roots are real and distinct.',
        'If D = 0, roots are real and equal (each root = -b / 2a).',
        'If D < 0, roots are not real (no real roots).'
      ],
      importantFormulasOrFacts: [
        'D = b² - 4ac',
        'x = (-b ± √D) / 2a',
        'Sum of roots (α + β) = -b/a, Product of roots (αβ) = c/a'
      ],
      sampleQuestions: [
        {
          q: 'Find the values of k for which 2x² + kx + 3 = 0 has two equal roots.',
          a: 'For equal roots, D = 0 => b² - 4ac = 0 => k² - 4(2)(3) = 0 => k² = 24 => k = ±2√6.'
        }
      ]
    }
  },
  {
    id: 'note-sci-10-ch1',
    title: 'Chemical Reactions & Equations — Master Sheet',
    subject: 'Science',
    class: 'Class 10',
    chapterNumber: 1,
    board: 'CBSE',
    medium: 'English',
    description: 'All 24 NCERT chemical equations with color changes, precipitate indicators, exothermic vs endothermic examples, and balance tricks.',
    pageCount: 10,
    lastUpdated: 'Sept 2026',
    fileSize: '2.8 MB',
    recommendedForExam: true,
    keyTopics: ['Balancing Reactions', 'Precipitation Reactions', 'Redox (Oxidation & Reduction)', 'Corrosion & Prevention'],
    contentPreview: {
      summary: 'Full color-coded summary sheet of all reactions, observations (fizzing, temperature change, precipitates) frequently tested in Board exams.',
      keyPoints: [
        'A complete chemical equation represents the reactants, products, and their physical states symbolically.',
        'Law of Conservation of Mass: Mass can neither be created nor destroyed in a chemical reaction.',
        'Precipitation reaction: Any reaction that produces an insoluble substance is called a precipitation reaction (e.g. BaSO₄ white precipitate).',
        'Oxidation is the gain of oxygen or loss of hydrogen. Reduction is the loss of oxygen or gain of hydrogen.'
      ],
      importantFormulasOrFacts: [
        'CaO(s) + H₂O(l) → Ca(OH)₂(aq) + Heat (Quick lime to slaked lime - Exothermic)',
        '2FeSO₄(s) --Δ--> Fe₂O₃(s) + SO₂(g) + SO₃(g) (Green ferrous sulphate to brown ferric oxide)'
      ],
      sampleQuestions: [
        {
          q: 'Why does the colour of copper sulphate solution change when an iron nail is dipped in it?',
          a: 'Iron is more reactive than copper; it displaces copper from copper sulphate solution: Fe + CuSO₄ → FeSO₄ + Cu. The blue color fades to light green.'
        }
      ]
    }
  },
  {
    id: 'note-sci-10-ch10',
    title: 'Light: Reflection & Refraction — Ray Diagrams & Numericals',
    subject: 'Science',
    class: 'Class 10',
    chapterNumber: 10,
    board: 'CBSE',
    medium: 'English',
    description: 'All 12 ray diagrams with step-by-step rules, Cartesian sign convention table, mirror formula, and lens formula solved numericals.',
    pageCount: 14,
    lastUpdated: 'August 2026',
    fileSize: '3.6 MB',
    recommendedForExam: true,
    keyTopics: ['Spherical Mirrors', 'New Cartesian Sign Convention', 'Lens Formula & Power', 'Refraction through Glass Slab'],
    contentPreview: {
      summary: 'Guaranteed 8-10 marks section. Features clear ray diagram rules, sign conventions, and common calculation pitfalls to avoid.',
      keyPoints: [
        'Mirror Formula: 1/f = 1/v + 1/u, where u is object distance, v is image distance, and f is focal length.',
        'Magnification by mirror: m = h\'/h = -v/u.',
        'Lens Formula: 1/f = 1/v - 1/u; Magnification by lens: m = h\'/h = +v/u.',
        'Power of a lens P = 1 / f(in metres). SI unit is Dioptre (D). Convex lens has +ve power, Concave lens has -ve power.'
      ],
      importantFormulasOrFacts: [
        '1/v + 1/u = 1/f (Mirrors)',
        '1/v - 1/u = 1/f (Lenses)',
        'P = 1/f (in meters)'
      ],
      sampleQuestions: [
        {
          q: 'A concave mirror produces three times magnified real image of an object placed at 10 cm in front of it. Where is the image located?',
          a: 'u = -10 cm. Real image => m = -3. m = -v/u => -3 = -v/(-10) => v = -30 cm. The image is located 30 cm in front of the mirror.'
        }
      ]
    }
  },
  {
    id: 'note-math-9-ch1',
    title: 'Number Systems — Class 9 Revision Guide',
    subject: 'Mathematics',
    class: 'Class 9',
    chapterNumber: 1,
    board: 'CBSE',
    medium: 'English',
    description: 'Rationalisation of denominators, representation of √x on number line, laws of exponents, and 15 practice drill problems.',
    pageCount: 9,
    lastUpdated: 'July 2026',
    fileSize: '2.1 MB',
    recommendedForExam: true,
    keyTopics: ['Irrational Numbers', 'Decimal Expansions', 'Rationalising Conjugates', 'Exponents Laws'],
    contentPreview: {
      summary: 'Essential bridge chapter between Class 8 arithmetic and high-school algebra.',
      keyPoints: [
        'Every real number is represented by a unique point on the number line.',
        'Sum or difference of a rational number and an irrational number is always irrational.',
        'To rationalise 1/(a + √b), multiply numerator and denominator by (a - √b).'
      ],
      importantFormulasOrFacts: [
        'aᵖ · aᵍ = aᵖ⁺ᵍ',
        '(aᵖ)ᵍ = aᵖᵍ',
        'aᵖ / aᵍ = aᵖ⁻ᵍ'
      ],
      sampleQuestions: [
        {
          q: 'Rationalise the denominator of 1 / (7 + 3√2).',
          a: 'Multiply by (7 - 3√2): (7 - 3√2) / [7² - (3√2)²] = (7 - 3√2) / (49 - 18) = (7 - 3√2) / 31.'
        }
      ]
    }
  },
  {
    id: 'note-math-8-ch1',
    title: 'Rational Numbers — Formulae & Practice Questions',
    subject: 'Mathematics',
    class: 'Class 8',
    chapterNumber: 1,
    board: 'CBSE',
    medium: 'English',
    description: 'Closure, commutative and associative properties table, finding rational numbers between two numbers, and NCERT exemplars.',
    pageCount: 7,
    lastUpdated: 'August 2026',
    fileSize: '1.9 MB',
    recommendedForExam: false,
    keyTopics: ['Properties of Rational Numbers', 'Additive Inverse', 'Multiplicative Inverse', 'Number Line Plotting'],
    contentPreview: {
      summary: 'Foundational concepts for Class 8 students with clear property tables and solved practice questions.',
      keyPoints: [
        'Rational numbers are closed under addition, subtraction, and multiplication, but not division by zero.',
        '0 is the additive identity and 1 is the multiplicative identity for rational numbers.',
        'Between any two given rational numbers, there are infinitely many rational numbers.'
      ],
      importantFormulasOrFacts: [
        'Additive inverse of a/b is -a/b',
        'Multiplicative inverse (reciprocal) of a/b is b/a'
      ],
      sampleQuestions: [
        {
          q: 'Find three rational numbers between 1/4 and 1/2.',
          a: 'Make common denominators: 2/8 and 4/8 => multiply by 2: 4/16 and 8/16. Numbers: 5/16, 6/16, 7/16.'
        }
      ]
    }
  },
  ...MAHARASHTRA_BOARD_NOTES
];

export const INITIAL_MOCK_TESTS: MockTest[] = [
  {
    id: 'test-10-math-algebra',
    title: 'Class 10 Mathematics — Algebra Chapter Test',
    class: 'Class 10',
    subject: 'Mathematics',
    category: 'Chapter Test',
    durationMinutes: 30,
    totalMarks: 20,
    questionsCount: 5,
    difficulty: 'Medium',
    attemptCount: 1420,
    passingPercentage: 60,
    description: 'Covers Real Numbers, Polynomials, and Quadratic Equations with time-bound board exam difficulty.',
    questions: [
      {
        id: 'q1',
        questionText: 'If two positive integers a and b are written as a = x³y² and b = xy³, where x, y are prime numbers, then HCF(a, b) is:',
        options: [
          { id: 'opt-a', label: 'A', text: 'xy' },
          { id: 'opt-b', label: 'B', text: 'xy²' },
          { id: 'opt-c', label: 'C', text: 'x³y³' },
          { id: 'opt-d', label: 'D', text: 'x²y²' }
        ],
        correctAnswer: 'B',
        explanation: 'HCF is the product of the smallest power of each common prime factor involved in the numbers. Smallest power of x is x¹, and smallest power of y is y². Therefore, HCF(a, b) = xy².',
        marks: 4,
        difficulty: 'Easy',
        topic: 'Real Numbers'
      },
      {
        id: 'q2',
        questionText: 'If the zeroes of the quadratic polynomial ax² + bx + c (c ≠ 0) are equal, then:',
        options: [
          { id: 'opt-a', label: 'A', text: 'c and a have opposite signs' },
          { id: 'opt-b', label: 'B', text: 'c and b have opposite signs' },
          { id: 'opt-c', label: 'C', text: 'c and a have the same sign' },
          { id: 'opt-d', label: 'D', text: 'c and b have the same sign' }
        ],
        correctAnswer: 'C',
        explanation: 'For equal roots, discriminant D = b² - 4ac = 0 => b² = 4ac. Since b² ≥ 0 for real b, 4ac must be positive, which implies ac > 0. Hence, c and a must have the same sign.',
        marks: 4,
        difficulty: 'Medium',
        topic: 'Polynomials'
      },
      {
        id: 'q3',
        questionText: 'The values of k for which the quadratic equation 2x² - kx + k = 0 has equal roots is:',
        options: [
          { id: 'opt-a', label: 'A', text: '0 only' },
          { id: 'opt-b', label: 'B', text: '4' },
          { id: 'opt-c', label: 'C', text: '8 only' },
          { id: 'opt-d', label: 'D', text: '0, 8' }
        ],
        correctAnswer: 'D',
        explanation: 'For equal roots, D = 0 => (-k)² - 4(2)(k) = 0 => k² - 8k = 0 => k(k - 8) = 0 => k = 0 or k = 8.',
        marks: 4,
        difficulty: 'Medium',
        topic: 'Quadratic Equations'
      },
      {
        id: 'q4',
        questionText: 'Which term of the AP: 21, 18, 15, ... is -81?',
        options: [
          { id: 'opt-a', label: 'A', text: '28th term' },
          { id: 'opt-b', label: 'B', text: '35th term' },
          { id: 'opt-c', label: 'C', text: '34th term' },
          { id: 'opt-d', label: 'D', text: '32nd term' }
        ],
        correctAnswer: 'B',
        explanation: 'Here a = 21, d = 18 - 21 = -3. Let an = -81. Using an = a + (n - 1)d: -81 = 21 + (n - 1)(-3) => -102 = -3(n - 1) => n - 1 = 34 => n = 35.',
        marks: 4,
        difficulty: 'Easy',
        topic: 'Arithmetic Progressions'
      },
      {
        id: 'q5',
        questionText: 'If a pair of linear equations is consistent and dependent, then the lines representing them will be:',
        options: [
          { id: 'opt-a', label: 'A', text: 'Parallel' },
          { id: 'opt-b', label: 'B', text: 'Always coincident' },
          { id: 'opt-c', label: 'C', text: 'Intersecting at one point' },
          { id: 'opt-d', label: 'D', text: 'Perpendicular' }
        ],
        correctAnswer: 'B',
        explanation: 'Consistent and dependent system of linear equations in two variables has infinitely many solutions, meaning the lines overlap and are coincident.',
        marks: 4,
        difficulty: 'Easy',
        topic: 'Linear Equations'
      }
    ]
  },
  {
    id: 'test-10-sci-chemistry',
    title: 'Class 10 Science — Chemical Reactions & Acids Quick Test',
    class: 'Class 10',
    subject: 'Science',
    category: 'Quick Test',
    durationMinutes: 15,
    totalMarks: 16,
    questionsCount: 4,
    difficulty: 'Easy',
    attemptCount: 980,
    passingPercentage: 60,
    description: 'Fast-paced 15-minute concept review on balancing, reaction types, and pH scale.',
    questions: [
      {
        id: 'q-sci-1',
        questionText: 'When lead nitrate crystal is heated in a dry test tube, what observation is made?',
        options: [
          { id: 'opt-a', label: 'A', text: 'Crystals melt quickly without gas' },
          { id: 'opt-b', label: 'B', text: 'Brown fumes of Nitrogen Dioxide (NO₂) are evolved' },
          { id: 'opt-c', label: 'C', text: 'A white precipitate is formed' },
          { id: 'opt-d', label: 'D', text: 'Yellow precipitate of lead iodide is formed' }
        ],
        correctAnswer: 'B',
        explanation: 'Thermal decomposition of lead nitrate: 2Pb(NO₃)₂ --Δ--> 2PbO (yellow) + 4NO₂ (brown fumes) + O₂.',
        marks: 4,
        difficulty: 'Medium',
        topic: 'Chemical Reactions'
      },
      {
        id: 'q-sci-2',
        questionText: 'Which of the following gases can be used for the storage of fresh samples of an oil for a long time to prevent rancidity?',
        options: [
          { id: 'opt-a', label: 'A', text: 'Carbon dioxide or oxygen' },
          { id: 'opt-b', label: 'B', text: 'Nitrogen or oxygen' },
          { id: 'opt-c', label: 'C', text: 'Carbon dioxide or helium' },
          { id: 'opt-d', label: 'D', text: 'Helium or nitrogen' }
        ],
        correctAnswer: 'D',
        explanation: 'Inert unreactive gases like Helium and Nitrogen prevent oxidation of fats and oils, keeping them fresh.',
        marks: 4,
        difficulty: 'Easy',
        topic: 'Chemical Reactions'
      },
      {
        id: 'q-sci-3',
        questionText: 'An aqueous solution turns red litmus paper blue. Excess addition of which solution would reverse the change?',
        options: [
          { id: 'opt-a', label: 'A', text: 'Baking powder' },
          { id: 'opt-b', label: 'B', text: 'Lime water' },
          { id: 'opt-c', label: 'C', text: 'Ammonium hydroxide solution' },
          { id: 'opt-d', label: 'D', text: 'Hydrochloric acid' }
        ],
        correctAnswer: 'D',
        explanation: 'Turning red litmus blue indicates the solution is basic. To reverse the change (make it acidic so it turns blue litmus red), an acid like Hydrochloric acid must be added in excess.',
        marks: 4,
        difficulty: 'Easy',
        topic: 'Acids and Bases'
      },
      {
        id: 'q-sci-4',
        questionText: 'The enzyme present in human saliva that breaks down starch into simple sugars is:',
        options: [
          { id: 'opt-a', label: 'A', text: 'Pepsin' },
          { id: 'opt-b', label: 'B', text: 'Salivary Amylase' },
          { id: 'opt-c', label: 'C', text: 'Trypsin' },
          { id: 'opt-d', label: 'D', text: 'Lipase' }
        ],
        correctAnswer: 'B',
        explanation: 'Saliva contains salivary amylase (ptyalin), which digests complex starch molecules into maltose and simple sugars in the mouth.',
        marks: 4,
        difficulty: 'Easy',
        topic: 'Life Processes'
      }
    ]
  },
  {
    id: 'test-10-board-full-mock',
    title: 'Class 10 Board Exam — Full Syllabus Mathematics Mock Test',
    class: 'Class 10',
    subject: 'Mathematics',
    category: 'Full Syllabus Mock Test',
    durationMinutes: 45,
    totalMarks: 25,
    questionsCount: 5,
    difficulty: 'Hard',
    attemptCount: 2150,
    passingPercentage: 65,
    description: 'Comprehensive board simulation designed strictly on the latest CBSE & State Board examination blueprint.',
    questions: [
      {
        id: 'q-full-1',
        questionText: 'If tan θ + cot θ = 2, then the value of tan²⁰ θ + cot²⁰ θ is:',
        options: [
          { id: 'opt-a', label: 'A', text: '20' },
          { id: 'opt-b', label: 'B', text: '2' },
          { id: 'opt-c', label: 'C', text: '2²⁰' },
          { id: 'opt-d', label: 'D', text: '1' }
        ],
        correctAnswer: 'B',
        explanation: 'tan θ + 1/tan θ = 2 => (tan θ - 1)² = 0 => tan θ = 1. Hence cot θ = 1. Therefore, tan²⁰ θ + cot²⁰ θ = 1²⁰ + 1²⁰ = 1 + 1 = 2.',
        marks: 5,
        difficulty: 'Hard',
        topic: 'Trigonometry'
      },
      {
        id: 'q-full-2',
        questionText: 'The ratio in which the line segment joining points A(-3, 10) and B(6, -8) is divided by the point (-1, 6) is:',
        options: [
          { id: 'opt-a', label: 'A', text: '2 : 7' },
          { id: 'opt-b', label: 'B', text: '7 : 2' },
          { id: 'opt-c', label: 'C', text: '3 : 5' },
          { id: 'opt-d', label: 'D', text: '2 : 5' }
        ],
        correctAnswer: 'A',
        explanation: 'Let ratio be k:1. Using section formula for x-coordinate: (-1) = (6k - 3) / (k + 1) => -k - 1 = 6k - 3 => 7k = 2 => k = 2/7. Ratio is 2:7.',
        marks: 5,
        difficulty: 'Medium',
        topic: 'Coordinate Geometry'
      },
      {
        id: 'q-full-3',
        questionText: 'From an external point P, tangents PA and PB are drawn to a circle with centre O. If ∠APB = 70°, then ∠AOB is equal to:',
        options: [
          { id: 'opt-a', label: 'A', text: '110°' },
          { id: 'opt-b', label: 'B', text: '70°' },
          { id: 'opt-c', label: 'C', text: '140°' },
          { id: 'opt-d', label: 'D', text: '90°' }
        ],
        correctAnswer: 'A',
        explanation: 'Since the tangents are perpendicular to the radius at contact points (∠OAP = ∠OBP = 90°), in quadrilateral OAPB, ∠AOB + ∠APB = 180°. Therefore, ∠AOB = 180° - 70° = 110°.',
        marks: 5,
        difficulty: 'Easy',
        topic: 'Circles'
      },
      {
        id: 'q-full-4',
        questionText: 'A metallic sphere of radius 4.2 cm is melted and recast into the shape of a cylinder of radius 6 cm. Find the height of the cylinder.',
        options: [
          { id: 'opt-a', label: 'A', text: '2.74 cm' },
          { id: 'opt-b', label: 'B', text: '3.14 cm' },
          { id: 'opt-c', label: 'C', text: '1.92 cm' },
          { id: 'opt-d', label: 'D', text: '2.50 cm' }
        ],
        correctAnswer: 'A',
        explanation: 'Volume of cylinder = Volume of sphere => π · r₁² · h = 4/3 · π · r₂³ => 6² · h = 4/3 · (4.2)³ => 36h = 4/3 · 74.088 => 36h = 98.784 => h = 2.744 cm ≈ 2.74 cm.',
        marks: 5,
        difficulty: 'Medium',
        topic: 'Surface Areas & Volumes'
      },
      {
        id: 'q-full-5',
        questionText: 'For the following distribution, what is the modal class? (Marks: 0-10, 10-20, 20-30, 30-40; Students: 5, 12, 20, 9)',
        options: [
          { id: 'opt-a', label: 'A', text: '10-20' },
          { id: 'opt-b', label: 'B', text: '20-30' },
          { id: 'opt-c', label: 'C', text: '30-40' },
          { id: 'opt-d', label: 'D', text: '0-10' }
        ],
        correctAnswer: 'B',
        explanation: 'The modal class is the class interval having the highest frequency. Here, the maximum frequency is 20, which belongs to interval 20-30.',
        marks: 5,
        difficulty: 'Easy',
        topic: 'Statistics'
      }
    ]
  },
  {
    id: 'test-9-math-number-system',
    title: 'Class 9 Mathematics — Number Systems & Polynomials',
    class: 'Class 9',
    subject: 'Mathematics',
    category: 'Revision Test',
    durationMinutes: 20,
    totalMarks: 15,
    questionsCount: 3,
    difficulty: 'Medium',
    attemptCount: 840,
    passingPercentage: 60,
    description: 'Test your understanding of irrational numbers, exponent rules, and polynomial zeroes.',
    questions: [
      {
        id: 'q-9-1',
        questionText: 'Between two rational numbers, there are:',
        options: [
          { id: 'opt-a', label: 'A', text: 'Exactly one rational number' },
          { id: 'opt-b', label: 'B', text: 'Infinitely many rational numbers' },
          { id: 'opt-c', label: 'C', text: 'Many irrational numbers only' },
          { id: 'opt-d', label: 'D', text: 'No rational number' }
        ],
        correctAnswer: 'B',
        explanation: 'By the density property of rational numbers, between any two distinct rational numbers, there exist infinitely many rational numbers.',
        marks: 5,
        difficulty: 'Easy',
        topic: 'Number Systems'
      },
      {
        id: 'q-9-2',
        questionText: 'The value of (256)^0.16 × (256)^0.09 is:',
        options: [
          { id: 'opt-a', label: 'A', text: '4' },
          { id: 'opt-b', label: 'B', text: '16' },
          { id: 'opt-c', label: 'C', text: '64' },
          { id: 'opt-d', label: 'D', text: '256.25' }
        ],
        correctAnswer: 'A',
        explanation: '256^(0.16 + 0.09) = 256^0.25 = 256^(1/4) = (4⁴)^(1/4) = 4.',
        marks: 5,
        difficulty: 'Medium',
        topic: 'Number Systems'
      },
      {
        id: 'q-9-3',
        questionText: 'If x + 1 is a factor of the polynomial 2x² + kx, then the value of k is:',
        options: [
          { id: 'opt-a', label: 'A', text: '-2' },
          { id: 'opt-b', label: 'B', text: '2' },
          { id: 'opt-c', label: 'C', text: '4' },
          { id: 'opt-d', label: 'D', text: '-1' }
        ],
        correctAnswer: 'B',
        explanation: 'By Factor Theorem, if x + 1 is a factor, then P(-1) = 0 => 2(-1)² + k(-1) = 0 => 2(1) - k = 0 => k = 2.',
        marks: 5,
        difficulty: 'Easy',
        topic: 'Polynomials'
      }
    ]
  },
  ...MAHARASHTRA_BOARD_TESTS
];

export const INITIAL_ACHIEVERS: AchieverStudent[] = [
  {
    id: 'ach-1',
    name: 'Rahul Deshmukh',
    photoUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=600&q=80',
    class: 'Class 10',
    score: '98.4%',
    subjectAchievement: 'Mathematics: 100/100 • Science: 99/100',
    board: 'State Board 2026',
    year: '2026',
    schoolName: 'Bal Shivaji High School',
    category: 'Top Performers',
    quote: 'The weekly chapter tests and teacher feedback helped me spot recurring silly mistakes in algebra. Scoring 100/100 in Maths was only possible because of the mock test series!',
    rankBadge: 'Centre Topper'
  },
  {
    id: 'ach-2',
    name: 'Ananya Sharma',
    photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
    class: 'Class 10',
    score: '97.2%',
    subjectAchievement: 'Science: 100/100 • English: 96/100',
    board: 'CBSE Board 2026',
    year: '2026',
    schoolName: 'Delhi Public School',
    category: 'Board Results',
    quote: 'Notes provided for Chemical Reactions and Ray Diagrams are unmatched. I did not have to read bulky reference books because the study material was so crisp and structured.',
    rankBadge: 'CBSE 97%+ Club'
  },
  {
    id: 'ach-3',
    name: 'Aditya Kulkarni',
    photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
    class: 'Class 10',
    score: '96.8%',
    subjectAchievement: 'Social Science: 98/100 • Maths: 97/100',
    board: 'State Board 2026',
    year: '2026',
    schoolName: 'Saraswati Vidyalaya',
    category: 'Board Results',
    quote: 'The doubt clearing sessions every Saturday ensured no backlog piled up before board pre-finals.',
    rankBadge: 'Merit List'
  },
  {
    id: 'ach-4',
    name: 'Pooja Iyer',
    photoUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80',
    class: 'Class 9',
    score: '95.6%',
    subjectAchievement: 'Science: 99/100 • Maths: 96/100',
    board: 'CBSE 2026',
    year: '2026',
    schoolName: 'National Model School',
    category: 'Top Performers',
    quote: 'Class 9 physics numericals used to terrify me. Aimers Coaching Class mentors broke each formula into simple everyday examples.',
    rankBadge: 'Class 9 Rank 1'
  },
  {
    id: 'ach-5',
    name: 'Tanmay Patil',
    photoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80',
    class: 'Class 10',
    score: '89.4% (Improved from 64%)',
    subjectAchievement: 'Maths improved from 48/100 to 92/100',
    board: 'State Board 2026',
    year: '2026',
    schoolName: 'New English School',
    category: 'Most Improved Students',
    quote: 'In Class 9 I was failing Mathematics. The teachers here never gave up on me, started from the absolute basics, and today I secured 92 in Maths in Board Exams!',
    rankBadge: 'Star Improver'
  },
  {
    id: 'ach-6',
    name: 'Sneha Patel',
    photoUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=600&q=80',
    class: 'Class 8',
    score: '96.2%',
    subjectAchievement: 'Maths Olympiad Gold • Science: 98/100',
    board: 'CBSE 2026',
    year: '2026',
    schoolName: 'Ryan International School',
    category: 'Subject Toppers',
    quote: 'The digital portal allowed me to practice chapter quizzes on my father’s phone whenever I had 15 minutes of free time.',
    rankBadge: 'Junior Prodigy'
  }
];

export const INITIAL_TESTIMONIALS: TestimonialItem[] = [
  {
    id: 'testi-1',
    name: 'Suresh & Sunita Deshmukh',
    role: 'Parent',
    class: 'Class 10',
    rating: 5,
    highlight: 'Transparent tracking and caring faculty',
    content: 'As parents, our biggest worry was our son getting distracted during board exams. Aimers Coaching Class’s regular WhatsApp updates, monthly parent-teacher meetings, and prompt test reports gave us total peace of mind.',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80',
    date: 'August 2026'
  },
  {
    id: 'testi-2',
    name: 'Rohan Joshi',
    role: 'Student',
    class: 'Class 10',
    rating: 5,
    highlight: 'After regular practice tests, I became confident in Mathematics',
    content: 'Before joining, I always ran out of time during the 3-hour school exams. Attempting the full mock tests under exam conditions taught me exact time management and answer presentation.',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=200&q=80',
    date: 'July 2026'
  },
  {
    id: 'testi-3',
    name: 'Dr. Meera Nambiar',
    role: 'Parent',
    class: 'Class 9',
    rating: 5,
    highlight: 'Solid foundation for competitive exams',
    content: 'My daughter is preparing for future medical entrance exams. The conceptual rigor in Class 9 Science here is far superior to standard rote-learning coaching centres.',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
    date: 'September 2026'
  },
  {
    id: 'testi-4',
    name: 'Priyanka Verma',
    role: 'Student',
    class: 'Class 8',
    rating: 5,
    highlight: 'Clear notes and friendly teachers',
    content: 'The teachers are so approachable! Even if I ask the same doubt three times in algebra, they patiently explain using step-by-step illustrations until I understand.',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80',
    date: 'June 2026'
  }
];

export const FAQS: FaqItem[] = [
  {
    id: 'faq-1',
    question: 'Which classes do you teach?',
    answer: 'We provide specialized comprehensive academic coaching exclusively for students from Class 6 to Class 10. Our programs are tailored for each stage — foundational skills for Classes 6–7, bridge preparation for Class 8, and intensive board preparation for Classes 9 and 10.',
    category: 'Academics'
  },
  {
    id: 'faq-2',
    question: 'Which boards do you cover?',
    answer: 'We cater to both State Board (Maharashtra, Karnataka, and regional boards) and CBSE curriculums, with dedicated separate batches and board-aligned study material.',
    category: 'Academics'
  },
  {
    id: 'faq-3',
    question: 'Do you provide printed and digital notes?',
    answer: 'Yes! All enrolled students receive crisp, professionally printed chapter booklets, formula cheat-sheets, and 24/7 access to our digital PDF notes library on our web portal.',
    category: 'Academics'
  },
  {
    id: 'faq-4',
    question: 'Are mock tests free for enrolled students?',
    answer: 'Yes, full access to our 500+ mock tests, chapter tests, quick quizzes, and 10+ full-length board simulations with detailed performance analytics is included in the enrolment fee with no extra charges.',
    category: 'Mock Tests'
  },
  {
    id: 'faq-5',
    question: 'Can students attempt tests from mobile?',
    answer: 'Absolutely. Our digital testing portal is completely mobile-responsive and optimized for smartphones, tablets, and desktop laptops with a distraction-free exam interface.',
    category: 'Mock Tests'
  },
  {
    id: 'faq-6',
    question: 'Is a demo class available before admission?',
    answer: 'Yes, we offer 2 complimentary free trial/demo classes for both students and parents to experience our teaching methodology, inspect our classroom environment, and interact with senior faculty.',
    category: 'Admissions'
  },
  {
    id: 'faq-7',
    question: 'How can parents track their child’s progress?',
    answer: 'Parents receive real-time attendance alerts, automated SMS/WhatsApp report cards after every weekly test, and monthly one-on-one progress counselling sessions highlighting strong and weak topics.',
    category: 'General'
  },
  {
    id: 'faq-8',
    question: 'How can I contact the coaching centre?',
    answer: 'You can call or WhatsApp our admission desk directly at +91 97639 86833, or visit Aimers Coaching Class at 2W5X+P79, Palam, Maharashtra 431720 from 8:00 AM to 8:30 PM (Monday to Sunday).',
    category: 'General'
  }
];

export const INITIAL_ENQUIRIES = [
  {
    id: 'enq-101',
    fullName: 'Sunil Gavaskar',
    userType: 'Parent' as const,
    mobileNumber: '+91 98765 43210',
    email: 'sunil.g@example.com',
    class: 'Class 10' as TargetClass,
    board: 'CBSE' as const,
    subjectInterest: 'Mathematics & Science',
    preferredBatch: 'Evening' as const,
    message: 'Looking for intensive board exam test series and revision batch for my daughter.',
    dateSubmitted: '2026-09-17',
    status: 'Demo Scheduled' as const
  },
  {
    id: 'enq-102',
    fullName: 'Aarav Mehta',
    userType: 'Student' as const,
    mobileNumber: '+91 98112 34567',
    email: 'aarav.m@example.com',
    class: 'Class 9' as TargetClass,
    board: 'State Board' as const,
    subjectInterest: 'All Subjects',
    preferredBatch: 'Morning' as const,
    message: 'Want to clear doubts in Physics and join notes portal.',
    dateSubmitted: '2026-09-18',
    status: 'New' as const
  }
];
