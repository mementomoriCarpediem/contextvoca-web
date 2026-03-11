export type Locale = "ko" | "zh" | "ja";

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
    upTo: string;
    monthly: string;
    yearly: string;
    yearlyDiscount: string;
    oneTime: string;
    plans: Array<{
      name: string;
      monthlyPrice: string;
      yearlyPrice: string;
      yearlyPeriod: string;
      monthlyPeriod: string;
      isLifetime?: boolean;
      wordLimit: string;
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
