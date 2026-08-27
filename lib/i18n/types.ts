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
