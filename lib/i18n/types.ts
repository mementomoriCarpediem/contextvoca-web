export type Locale = "ko" | "en" | "ja" | "zh";

export interface Translations {
  meta: {
    title: string;
    description: string;
    keywords: string[];
    ogDescription: string;
  };
  header: {
    features: string;
    pricing: string;
    support: string;
    download: string;
  };
  footer: {
    tagline: string;
    service: string;
    featureIntro: string;
    pricing: string;
    faq: string;
    legal: string;
    privacy: string;
    terms: string;
    contact: string;
    rights: string;
    businessInfo: string;
  };
  hero: {
    titleLine1: string;
    titleLine2: string;
    description: string;
    appStore: string;
    googlePlay: string;
    /** Alt text for the hero device mockup screenshot. */
    imageAlt: string;
    /** Alt text for the mascot illustration next to the hero mockup. */
    mascotAlt: string;
  };
  howItWorks: {
    title: string;
    subtitle: string;
    steps: Array<{
      number: string;
      title: string;
      description: string;
    }>;
  };
  features: {
    title: string;
    subtitle: string;
    items: Array<{
      title: string;
      description: string;
    }>;
    /** Alt text for the four feature screenshots shown in the zigzag layout, in
     * display order (AI keyword extraction, similar-sentence quiz, adaptive
     * difficulty, tag-based organization). */
    screenshotAlts: string[];
  };
  science: {
    title: string;
    subtitle: string;
    cards: Array<{
      title: string;
      /** 2~3 sentences drawn only from the vetted "safe sentences" in docs/science-claims.md. */
      body: string;
      /** One line describing what the product actually does, matching docs/science-claims.md exactly. */
      productLine: string;
    }>;
    referencesTitle: string;
    /** Formatted citation strings, each starting with its footnote marker (e.g. "[1] Author, Year..."). */
    references: string[];
    mediaTitle: string;
    media: Array<{
      title: string;
      creator: string;
      url: string;
    }>;
    /** Labels for the forgetting-curve chart (retention = e^(-days/halfLife)). */
    forgettingCurve: {
      xAxisLabel: string;
      yAxisLabel: string;
      /** One label per half-life curve, in order [7, 14, 30, 90] days. */
      legend: string[];
    };
    /** Labels for the cramming-vs-spaced-review timeline illustration. */
    spacedReview: {
      crammingLabel: string;
      spacedLabel: string;
    };
    /** Alt text for the small mascot illustration placed among the science cards. */
    mascotAlt: string;
    /** Label for the collapsed <details> toggle that reveals the reference list. */
    referencesToggle: string;
  };
  pricing: {
    title: string;
    subtitle: string;
    popular: string;
    startButton: string;
    monthly: string;
    yearly: string;
    yearlyDiscount: string;
    oneTime: string;
    /** "{percent}" 자리에 yearlySavings가 들어간다. */
    yearlySavingsNote: string;
    perMonth: string;
    perYear: string;
    plans: Array<{
      name: string;
      /** Headline figure shown on the card, e.g. word limit ("1,000 words"). */
      wordLimit: string;
      /** Secondary note replacing a fixed price, e.g. "Price shown in the app's subscription screen". */
      priceNote: string;
      /** 고정 가격(현지 스토어 확인 가능한 로케일만). 없으면 priceNote만 표시. */
      priceMonthly?: string;
      priceYearly?: string;
      priceOnce?: string;
      /** 연간 결제 할인율 문자열("38%"). 통화와 무관해 모든 로케일에 표시 가능. */
      yearlySavings?: string;
      isLifetime?: boolean;
      description: string;
      features: string[];
    }>;
  };
  cta: {
    title: string;
    subtitle: string;
    appStore: string;
    googlePlay: string;
  };
  support: {
    metaTitle: string;
    metaDescription: string;
    title: string;
    subtitle: string;
    contactTitle: string;
    contactDescription: string;
    contactButton: string;
    faqs: Array<{
      category: string;
      questions: Array<{
        q: string;
        a: string;
      }>;
    }>;
  };
  privacy: {
    metaTitle: string;
    metaDescription: string;
    title: string;
    lastUpdated: string;
    sections: Array<{
      title: string;
      content: string;
      items?: string[];
    }>;
  };
  terms: {
    metaTitle: string;
    metaDescription: string;
    title: string;
    lastUpdated: string;
    sections: Array<{
      title: string;
      content: string;
      items?: string[];
    }>;
  };
}
