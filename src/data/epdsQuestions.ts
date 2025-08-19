export interface EPDSQuestion {
  id: number;
  question: string;
  context?: string;
  options: {
    text: string;
    score: number;
  }[];
  isCritical?: boolean;
}

export const epdsQuestions: EPDSQuestion[] = [
  {
    id: 1,
    question: "In the past 7 days, I have been able to laugh and see the funny side of things:",
    context: "This helps us understand how you've been experiencing joy and lightness recently.",
    options: [
      { text: "As much as I always could", score: 0 },
      { text: "Not quite so much now", score: 1 },
      { text: "Definitely not so much now", score: 2 },
      { text: "Not at all", score: 3 }
    ]
  },
  {
    id: 2,
    question: "In the past 7 days, I have looked forward with enjoyment to things:",
    context: "This helps us understand your sense of anticipation and hope for future activities.",
    options: [
      { text: "As much as I ever did", score: 0 },
      { text: "Rather less than I used to", score: 1 },
      { text: "Definitely less than I used to", score: 2 },
      { text: "Hardly at all", score: 3 }
    ]
  },
  {
    id: 3,
    question: "In the past 7 days, I have blamed myself unnecessarily when things went wrong:",
    context: "This helps us understand how you've been processing difficult situations.",
    options: [
      { text: "Yes, most of the time", score: 3 },
      { text: "Yes, some of the time", score: 2 },
      { text: "Not very often", score: 1 },
      { text: "No, never", score: 0 }
    ]
  },
  {
    id: 4,
    question: "In the past 7 days, I have been anxious or worried for no good reason:",
    context: "This helps us understand your overall anxiety levels and worry patterns.",
    options: [
      { text: "No, not at all", score: 0 },
      { text: "Hardly ever", score: 1 },
      { text: "Yes, sometimes", score: 2 },
      { text: "Yes, very often", score: 3 }
    ]
  },
  {
    id: 5,
    question: "In the past 7 days, I have felt scared or panicky for no very good reason:",
    context: "This helps us understand your experience with panic and fear responses.",
    options: [
      { text: "Yes, quite a lot", score: 3 },
      { text: "Yes, sometimes", score: 2 },
      { text: "No, not much", score: 1 },
      { text: "No, not at all", score: 0 }
    ]
  },
  {
    id: 6,
    question: "In the past 7 days, things have been getting on top of me:",
    context: "This helps us understand how manageable daily life has felt for you.",
    options: [
      { text: "Yes, most of the time I haven't been able to cope at all", score: 3 },
      { text: "Yes, sometimes I haven't been coping as well as usual", score: 2 },
      { text: "No, most of the time I have coped quite well", score: 1 },
      { text: "No, I have been coping as well as ever", score: 0 }
    ]
  },
  {
    id: 7,
    question: "In the past 7 days, I have been so unhappy that I have had difficulty sleeping:",
    context: "This helps us understand how your emotional state has affected your rest.",
    options: [
      { text: "Yes, most of the time", score: 3 },
      { text: "Yes, sometimes", score: 2 },
      { text: "Not very often", score: 1 },
      { text: "No, not at all", score: 0 }
    ]
  },
  {
    id: 8,
    question: "In the past 7 days, I have felt sad or miserable:",
    context: "This helps us understand your overall mood and emotional wellbeing.",
    options: [
      { text: "Yes, most of the time", score: 3 },
      { text: "Yes, quite often", score: 2 },
      { text: "Not very often", score: 1 },
      { text: "No, not at all", score: 0 }
    ]
  },
  {
    id: 9,
    question: "In the past 7 days, I have been so unhappy that I have been crying:",
    context: "This helps us understand the intensity of your emotional experiences.",
    options: [
      { text: "Yes, most of the time", score: 3 },
      { text: "Yes, quite often", score: 2 },
      { text: "Only occasionally", score: 1 },
      { text: "No, never", score: 0 }
    ]
  },
  {
    id: 10,
    question: "In the past 7 days, the thought of harming myself has occurred to me:",
    context: "This is a critical safety question that helps us ensure you receive appropriate care immediately.",
    isCritical: true,
    options: [
      { text: "Yes, quite often", score: 3 },
      { text: "Sometimes", score: 2 },
      { text: "Hardly ever", score: 1 },
      { text: "Never", score: 0 }
    ]
  }
];