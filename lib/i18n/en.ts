import { Translations } from "./types";

const en: Translations = {
  meta: {
    title: "ContextVoca - Learn English Words in Context with AI",
    description:
      "Stop memorizing word lists. AI pulls the key vocabulary out of your photos and sentences, then a smart quiz makes sure it actually sticks.",
    keywords: [
      "vocabulary app",
      "AI vocabulary",
      "learn english words",
      "sentence learning",
      "TOEFL vocabulary",
      "IELTS vocabulary",
      "flashcard app",
      "ContextVoca",
    ],
    ogDescription:
      "AI pulls the key vocabulary out of your photos and sentences, then a smart quiz makes sure it actually sticks.",
  },
  header: {
    features: "Features",
    pricing: "Pricing",
    support: "Support",
    download: "Download",
  },
  footer: {
    tagline: "Learn English words in context, with AI",
    service: "Product",
    featureIntro: "Features",
    pricing: "Pricing",
    faq: "FAQ",
    legal: "Legal",
    privacy: "Privacy Policy",
    terms: "Terms of Use",
    contact: "Contact",
    rights: "All rights reserved.",
    businessInfo: "Gongmyeong | Business Registration No. 520-22-02348",
  },
  hero: {
    titleLine1: "Stop memorizing word lists.",
    titleLine2: "Learn them in context instead.",
    description:
      "AI extracts the key vocabulary from your photos and sentences, then a smart\nquiz builds real, lasting recall.",
    appStore: "App Store",
    googlePlay: "Google Play",
  },
  howItWorks: {
    title: "How it works",
    subtitle: "Four steps to context-based vocabulary learning",
    steps: [
      {
        number: "1",
        title: "Capture a sentence",
        description:
          "Paste a sentence you don't fully understand, or snap a photo of it.",
      },
      {
        number: "2",
        title: "AI extracts the key words",
        description:
          "AI automatically picks out the words that are worth learning from that sentence.",
      },
      {
        number: "3",
        title: "Take a comparison quiz",
        description:
          "Test the exact meaning of each word against similar sentences with close meanings.",
      },
      {
        number: "4",
        title: "Build real fluency",
        description:
          "Difficulty auto-adjusts to keep you at a 70-80% success rate, so you stay motivated as you improve.",
      },
    ],
  },
  features: {
    title: "Built for how you actually learn",
    subtitle:
      "Not just another flashcard app. Everything you need for AI-powered, context-first learning.",
    items: [
      {
        title: "AI keyword extraction",
        description:
          "Type or paste a sentence and AI automatically extracts the words worth learning. No more manually hunting for vocabulary.",
      },
      {
        title: "Context-based learning",
        description:
          "You don't just memorize a definition — you learn how each word is actually used in a real sentence. That's what makes it stick.",
      },
      {
        title: "Similar-sentence comparison quiz",
        description:
          "AI generates sentences with closely related meanings so you can compare them side by side. No more confusing implement and execute.",
      },
      {
        title: "Adaptive difficulty",
        description:
          "Difficulty automatically adjusts to keep your success rate around 70-80% — never too easy, never too discouraging.",
      },
      {
        title: "OCR photo recognition",
        description:
          "Snap a photo of a textbook or exam paper and the text is recognized automatically. Start learning without typing a thing.",
      },
      {
        title: "Tag-based organization",
        description:
          "Organize words with tags like TOEIC, exam prep, or business. Pick a category and focus your study session on exactly what you need.",
      },
    ],
  },
  pricing: {
    title: "Simple, fair pricing",
    subtitle: "Start for free, upgrade whenever you need more.",
    popular: "Most popular",
    startButton: "Get started",
    monthly: "Monthly",
    yearly: "Yearly",
    yearlyDiscount: "Save more",
    oneTime: "One-time purchase",
    yearlySavingsNote: "Save {percent} with annual billing",
    perMonth: "/mo",
    perYear: "/yr",
    plans: [
      {
        name: "Free",
        wordLimit: "100 words",
        priceNote: "Free, forever",
        description: "Core learning features",
        features: [
          "Save up to 100 words",
          "OCR text extraction",
          "AI keyword analysis",
          "Smart quiz",
          "3 custom tags",
        ],
      },
      {
        name: "Basic",
        yearlySavings: "38%",
        wordLimit: "1,000 words",
        priceNote: "Price shown in the app's subscription screen",
        description: "Save more words",
        features: [
          "Save up to 1,000 words",
          "OCR text extraction",
          "AI keyword analysis",
          "Smart quiz",
          "Unlimited tags",
        ],
      },
      {
        name: "Pro",
        yearlySavings: "41%",
        wordLimit: "Unlimited",
        priceNote: "Price shown in the app's subscription screen",
        description: "Every feature, unlocked",
        features: [
          "Unlimited word storage",
          "Everything in Basic",
          "Detailed learning stats",
          "Priority support",
        ],
      },
      {
        name: "Lifetime",
        wordLimit: "Unlimited",
        priceNote: "Price shown in the app's purchase screen",
        isLifetime: true,
        description: "Pay once, use it for life",
        features: [
          "Unlimited word storage",
          "Everything in Pro",
          "Lifetime access",
          "No recurring charges",
        ],
      },
    ],
  },
  cta: {
    title: "Start learning today",
    subtitle: "Same time invested, double the results. Context-based word learning.",
    appStore: "Download on the App Store",
    googlePlay: "Get it on Google Play",
  },
  support: {
    metaTitle: "Support & FAQ",
    metaDescription:
      "Find answers about getting started, using features, subscriptions, and account management for ContextVoca, or get in touch with our team.",
    title: "Need a hand?",
    subtitle: "Check the FAQ below, or reach out to us directly.",
    contactTitle: "Contact us directly",
    contactDescription:
      "Reach out using the method below and we'll get back to you as soon as we can.",
    contactButton: "Email us: support@contextvoca.app",
    faqs: [
      {
        category: "Getting started",
        questions: [
          {
            q: "What kind of app is ContextVoca?",
            a: "ContextVoca is an AI-powered vocabulary app that teaches you words in the context of real sentences. Type or paste text and AI extracts the key vocabulary, then a similar-sentence comparison quiz helps it truly sink in.",
          },
          {
            q: "What devices does it work on?",
            a: "ContextVoca is available on iOS (iPhone, iPad) and Android. Download it from the App Store or Google Play.",
          },
          {
            q: "How do I sign up?",
            a: "You can sign in instantly with your Apple, Google, or Kakao account — there's no separate sign-up process.",
          },
        ],
      },
      {
        category: "Using the app",
        questions: [
          {
            q: "How do I add words?",
            a: "There are two ways. (1) Type or paste a sentence (up to 500 characters) and AI automatically extracts the key vocabulary. (2) Take a photo of a textbook or exam paper and OCR recognizes the text. OCR is available on every plan.",
          },
          {
            q: "How do quizzes work?",
            a: "Based on your saved words, AI generates sentences with similar meanings. Choose Smart mode (auto-selected based on your learning goals), Random mode, or a tag-specific mode. Difficulty auto-adjusts to keep your accuracy around 70-80%.",
          },
          {
            q: "How do tags work?",
            a: "When you save a word, you can assign tags (for example TOEIC, exam prep, or business). Use tags during quizzes or review sessions to focus on a specific category. The Free plan allows up to 3 custom tags; Basic and above have unlimited tags.",
          },
        ],
      },
      {
        category: "Subscriptions & billing",
        questions: [
          {
            q: "Can I use it for free?",
            a: "Yes — the Free plan lets you save and study up to 100 words. To save more, subscribe to Basic (1,000 words) or Pro (unlimited). Exact pricing is shown on the in-app subscription screen. A Lifetime plan is also available for unlimited access with a single one-time purchase.",
          },
          {
            q: "What's the difference between plans?",
            a: "Every plan includes OCR, AI keyword analysis, and the smart quiz. Basic and above unlock unlimited custom tags, and Pro/Lifetime add detailed learning stats and priority support.",
          },
          {
            q: "What happens to my data if I cancel my subscription?",
            a: "Your saved data isn't deleted when you cancel. However, the Free plan's limits (100 words, 3 custom tags) will apply going forward.",
          },
          {
            q: "Can I get a refund?",
            a: "Refunds follow the Apple App Store or Google Play policy for your purchase. You can request one from the subscription management page in the store you purchased from.",
          },
        ],
      },
      {
        category: "Account management",
        questions: [
          {
            q: "I want to delete my account.",
            a: "You can request account deletion from Settings > Account in the app. Deleting your account permanently removes all of your learning data. You can also email support@contextvoca.app to request deletion.",
          },
          {
            q: "Can I use it on more than one device?",
            a: "Yes — sign in with the same account on any device and your learning data stays in sync.",
          },
        ],
      },
    ],
  },
  privacy: {
    metaTitle: "Privacy Policy",
    metaDescription: "The privacy policy for ContextVoca.",
    title: "Privacy Policy",
    lastUpdated: "Last updated: February 7, 2026",
    sections: [
      {
        title: "1. Overview",
        content:
          'ContextVoca (the "Service") takes your privacy seriously and protects your personal information in accordance with applicable law. This Privacy Policy explains what information the Service collects and how it is used.',
      },
      {
        title: "2. Information we collect",
        content: "The Service may collect the following personal information:",
        items: [
          "Account information: email address and name (collected from your social login provider)",
          "Learning data: saved sentences, words, tags, quiz results, and learning statistics",
          "Purchase history: in-app subscription information (payments are processed by the Apple App Store or Google Play; the Service never collects your payment card details directly)",
          "Device information: device type, OS version, app version (for error diagnostics)",
          "Error data: crash logs and error stack traces (collected via Sentry)",
        ],
      },
      {
        title: "3. How we use personal information",
        content: "",
        items: [
          "Creating and managing your Service account",
          "Providing vocabulary, quiz, and learning features",
          "Verifying and managing subscription status",
          "Improving app performance and resolving errors",
          "Responding to user inquiries",
        ],
      },
      {
        title: "4. Sharing information with third parties",
        content:
          "The Service does not sell or share your personal information with third parties, except through the following service providers used to operate it:",
        items: [
          "Supabase: authentication and database (United States)",
          "Sentry: error monitoring (United States)",
          "RevenueCat: subscription management (United States)",
          "Google Cloud: OCR text recognition (United States)",
          "Apple / Google: social login and in-app payment processing",
        ],
      },
      {
        title: "5. Data retention and deletion",
        content:
          "When you delete your account, your related personal information is deleted immediately, except where the law requires us to retain certain records for a specified period.",
      },
      {
        title: "6. Your rights",
        content: "You may exercise the following rights at any time:",
        items: [
          "Request access to your personal information",
          "Request correction of your personal information",
          "Request account deletion and destruction of your personal information",
          "Request data portability",
        ],
      },
      {
        title: "7. Children's privacy",
        content:
          "The Service does not knowingly collect personal information from children under the age of 14. If we learn that a user under 14 has provided personal information, we will delete it immediately.",
      },
      {
        title: "8. Changes to this policy",
        content:
          "This Privacy Policy may be updated to reflect changes in law or in the Service. We will notify you of material changes through an in-app notice or by email.",
      },
      {
        title: "9. Data protection contact",
        content: "",
        items: [
          "Business name: Gongmyeong",
          "Business Registration No.: 520-22-02348",
          "Email: support@contextvoca.app",
        ],
      },
      {
        title: "10. Contact",
        content:
          "For any privacy-related questions, please contact support@contextvoca.app.",
      },
    ],
  },
  terms: {
    metaTitle: "Terms of Use",
    metaDescription: "The terms of use for the ContextVoca service.",
    title: "Terms of Use",
    lastUpdated: "Last updated: February 7, 2026",
    sections: [
      {
        title: "Article 1 (Purpose)",
        content:
          'These Terms govern the basic terms of using ContextVoca (the "Service").',
      },
      {
        title: "Article 2 (Description of the Service)",
        content: "The Service provides the following functionality:",
        items: [
          "AI-based extraction of key vocabulary from text",
          "Vocabulary management based on sentence context",
          "Similar-sentence comparison quizzes",
          "OCR-based text recognition",
          "Learning statistics and adaptive difficulty",
        ],
      },
      {
        title: "Article 3 (Registration and accounts)",
        content: "",
        items: [
          "Using the Service requires signing up with an Apple, Google, or Kakao account.",
          "Users are responsible for managing their own account information and may not transfer or share their account with others.",
          "The Service may restrict use of the account if fraudulent activity is confirmed.",
        ],
      },
      {
        title: "Article 4 (Paid services)",
        content: "",
        items: [
          "The Service offers a Free plan, paid subscription plans (Basic, Pro), and a one-time-purchase Lifetime plan.",
          "Paid subscriptions and the Lifetime purchase are billed through the Apple App Store or Google Play. Prices are shown on the in-app screen for each store.",
          "Subscriptions renew automatically unless canceled. You must cancel at least 24 hours before the renewal date to avoid being charged for the next period.",
          "Refunds are handled according to the Apple or Google refund policy.",
        ],
      },
      {
        title: "Article 5 (Prohibited conduct)",
        content: "Users may not do any of the following:",
        items: [
          "Enter illegal or inappropriate content",
          "Interfere with the normal operation of the Service",
          "Infringe on another person's personal information",
          "Reverse-engineer or decompile the Service",
          "Send bulk automated requests to the Service",
        ],
      },
      {
        title: "Article 6 (Intellectual property)",
        content:
          "All intellectual property rights in the Service's design, logo, software, and content belong to the Service operator. Users retain the rights to the learning content (sentences, words) they input.",
      },
      {
        title: "Article 7 (Disclaimer)",
        content: "",
        items: [
          "Because the Service generates content using AI, it does not fully guarantee the accuracy of the generated results.",
          "The Service is not liable for interruptions caused by maintenance, technical failure, or force majeure.",
          "The Service is not involved in disputes between users, or between a user and a third party.",
        ],
      },
      {
        title: "Article 8 (Changes to and termination of the Service)",
        content:
          "The Service may change or discontinue its content for operational reasons. Material changes will be announced in advance.",
      },
      {
        title: "Article 9 (Changes to these Terms)",
        content:
          "These Terms may be changed as needed, and changes will be announced via an in-app notice or email. If you do not agree to the changed Terms, you may stop using the Service and delete your account.",
      },
      {
        title: "Article 10 (Governing law and jurisdiction)",
        content:
          "These Terms are governed by the laws of the Republic of Korea. The Seoul Central District Court shall have exclusive jurisdiction over any dispute arising from use of the Service.",
      },
      {
        title: "Business information",
        content: "",
        items: [
          "Business name: Gongmyeong",
          "Business Registration No.: 520-22-02348",
          "Email: support@contextvoca.app",
        ],
      },
      {
        title: "Contact",
        content:
          "For any questions about these Terms, please contact support@contextvoca.app.",
      },
    ],
  },
};

export default en;
