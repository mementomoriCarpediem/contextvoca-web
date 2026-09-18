import { Translations } from "./types";

// 繁體中文(臺灣) 사전 — scripts/gen-zh-hant.mts가 lib/i18n/zh.ts에서 생성한다. 직접 편집하지 말 것.
// 2026-09-07: 대만·홍콩 스토어 등록정보는 번체인데 웹이 간체로 폴백되던 불일치를 없앤다.

const zhHant: Translations = {
  "meta": {
    "title": "語境詞彙 - 拍照生成AI英語單字本",
    "description": "拍下課本或教材，AI 自動挑出值得學的英語單字，連同例句一起存入單字本。用託福、雅思、多益／英檢標籤整理，錯得多的單字在測驗中出現得更頻繁。",
    "keywords": [
      "英語詞彙",
      "單字本",
      "英語學習",
      "背單字",
      "句子學習",
      "AI詞彙本",
      "語境詞彙",
      "ContextVoca"
    ],
    "ogDescription": "拍一張照片，帶例句的英語單字本就做好了。AI 提取、語境儲存、智慧測驗。"
  },
  "header": {
    "features": "功能",
    "pricing": "價格",
    "support": "支援",
    "download": "下載",
    "blog": "部落格"
  },
  "footer": {
    "tagline": "AI結合語境學習英語單字",
    "service": "服務",
    "featureIntro": "功能介紹",
    "pricing": "價格",
    "faq": "常見問題",
    "legal": "法律宣告",
    "privacy": "隱私政策",
    "terms": "使用條款",
    "contact": "聯絡我們",
    "rights": "保留所有權利。",
    "businessInfo": "公明 | 營業執照號: 520-22-02348"
  },
  "hero": {
    "titleLine1": "不要只背單字。",
    "titleLine2": "通過句子來理解。",
    "description": "AI從照片和句子中提取核心詞彙，並通過智慧測驗，\n幫你徹底記住它們。",
    "appStore": "App Store",
    "googlePlay": "Google Play",
    "imageAlt": "語境詞彙App主頁截圖",
    "mascotAlt": "語境詞彙的章魚吉祥物"
  },
  "howItWorks": {
    "title": "學習方法",
    "subtitle": "4步完成基於語境的詞彙學習",
    "steps": [
      {
        "number": "1",
        "title": "輸入句子",
        "description": "複製貼上學習中遇到的句子，或用相機拍照。"
      },
      {
        "number": "2",
        "title": "AI提取核心詞彙",
        "description": "AI自動從句子中找出學習所需的核心詞彙。"
      },
      {
        "number": "3",
        "title": "相似句子對比測試",
        "description": "通過與相似含義的句子對比，測試詞彙的準確含義。"
      },
      {
        "number": "4",
        "title": "實力提升",
        "description": "保持70-80%的正確率，維持學習動力，持續提升實力。"
      }
    ]
  },
  "features": {
    "title": "強大功能",
    "subtitle": "與傳統詞彙本不同。AI驅動的語境學習，一應俱全。",
    "items": [
      {
        "title": "AI核心詞彙提取",
        "description": "輸入句子後，AI自動提取學習所需的核心詞彙。無需手動查詢單字。"
      },
      {
        "title": "句子語境學習",
        "description": "不僅僅背誦詞義，還能在實際句子中學習詞彙的用法。真正理解詞彙。"
      },
      {
        "title": "相似句子對比測試",
        "description": "AI生成相似含義的句子進行對比測試。implement和execute的區別，再也不會混淆。"
      },
      {
        "title": "自適應難度",
        "description": "難度自動調整以保持70-80%的正確率。不會太簡單也不會太難，最佳學習體驗。"
      },
      {
        "title": "OCR圖片識別",
        "description": "拍攝教材或試卷，自動識別文字。無需打字，直接開始學習。"
      },
      {
        "title": "標籤管理",
        "description": "使用標籤（如托業、高考、商務）分類詞彙。選擇特定類別進行集中學習。"
      }
    ],
    "screenshotAlts": [
      "輸入句子並提取核心詞彙的介面",
      "對比相似句子選出正確答案的測驗介面",
      "根據正確率設定難度和出題方式的介面",
      "按標籤分類的單字列表介面"
    ]
  },
  "science": {
    "title": "為什麼有效 — 學習科學依據",
    "subtitle": "語境詞彙採用的學習方法均有學習心理學研究支援。",
    "cards": [
      {
        "title": "語境中的詞彙學習",
        "body": "研究表明，在例句和語境中接觸單字，比孤立地背單字更有助於推斷詞義並加深記憶。[1] 實驗也證實，語境線索越豐富，詞義學習效果越好。[2] 此外，比起只是閱讀單字，補全句子或親自造句能讓記憶保持更久。[3]",
        "productLine": "語境詞彙會原樣儲存你的照片和句子，並由AI提取核心詞彙，讓你在語境中學習每個單字。"
      },
      {
        "title": "遺忘曲線與衰減模型",
        "body": "1885年心理學家艾賓浩斯觀察到的遺忘曲線顯示，遺忘在學習後最初階段最快，之後逐漸放緩。[4] 這一曲線形態在2015年的復現實驗中也得到了同樣的確認。[5]",
        "productLine": "語境詞彙採用衰減模型計算熟練度：根據最近一次答對後的天數衰減，且連續答對次數越多，半衰期越長。"
      },
      {
        "title": "提取練習（測驗）",
        "body": "實驗證實，主動回憶比單純重讀更有利於長期記憶。[6] 學習方法有效性的綜述研究將“自我測驗”和“分散學習”列為證據最確鑿的兩種方法。[7]",
        "productLine": "語境詞彙的智慧測驗通過相似句子對比測試，讓你主動回憶正確答案。"
      },
      {
        "title": "分散與個性化複習",
        "body": "數百項研究反覆證實，比起集中突擊，分散安排複習時間對長期記憶更有效。[8] 最佳複習間隔取決於你希望記住多久。[9] 一項在國中外語課堂進行的整學期實驗發現，按學習者各自的遺忘速度個性化安排複習後，期末成績比統一分散複習高10.0個百分點，比突擊複習高16.5個百分點——這是該研究的結果，並非語境詞彙自身的實驗。[10]",
        "productLine": "語境詞彙會更頻繁地出題給熟練度低、衰減較多或正確率較低的詞彙，從而實現複習時機的個性化。"
      },
      {
        "title": "貌似合理的干擾項",
        "body": "干擾項與正確答案在語義上越接近，學習者就越需要深入思考自己為什麼答錯。[11] 研究表明，這個過程還能強化相關知識。[11]",
        "productLine": "語境詞彙由AI生成與正確答案語義相近的干擾項，精準點出你容易混淆的地方。"
      }
    ],
    "referencesTitle": "參考文獻",
    "references": [
      "[1] Nagy, W. E., Herman, P. A., & Anderson, R. C. (1985). Learning Words From Context. Reading Research Quarterly, 20(2), 233–253.",
      "[2] Webb, S. (2008). The Effects of Context on Incidental Vocabulary Learning. Reading in a Foreign Language, 20(2), 232–245.",
      "[3] Hulstijn, J. H., & Laufer, B. (2001). Some Empirical Evidence for the Involvement Load Hypothesis in Vocabulary Acquisition. Language Learning, 51(3), 539–558.",
      "[4] Ebbinghaus, H. (1885). Über das Gedächtnis. Duncker & Humblot.",
      "[5] Murre, J. M. J., & Dros, J. (2015). Replication and Analysis of Ebbinghaus' Forgetting Curve. PLOS ONE, 10(7), e0120644. https://doi.org/10.1371/journal.pone.0120644",
      "[6] Roediger, H. L., & Karpicke, J. D. (2006). Test-Enhanced Learning: Taking Memory Tests Improves Long-Term Retention. Psychological Science, 17(3), 249–255.",
      "[7] Dunlosky, J., Rawson, K. A., Marsh, E. J., Nathan, M. J., & Willingham, D. T. (2013). Improving Students' Learning With Effective Learning Techniques. Psychological Science in the Public Interest, 14(1), 4–58.",
      "[8] Cepeda, N. J., Pashler, H., Vul, E., Wixted, J. T., & Rohrer, D. (2006). Distributed Practice in Verbal Recall Tasks: A Review and Quantitative Synthesis. Psychological Bulletin, 132(3), 354–380.",
      "[9] Cepeda, N. J., Vul, E., Rohrer, D., Wixted, J. T., & Pashler, H. (2008). Spacing Effects in Learning: A Temporal Ridgeline of Optimal Retention. Psychological Science, 19(11), 1095–1102.",
      "[10] Lindsey, R. V., Shroyer, J. D., Pashler, H., & Mozer, M. C. (2014). Improving Students' Long-Term Knowledge Retention Through Personalized Review. Psychological Science, 25(3), 639–647.",
      "[11] Little, J. L., & Bjork, E. L. (2015). Optimizing Multiple-Choice Tests as Tools for Learning. Memory & Cognition, 43(1), 85–98."
    ],
    "mediaTitle": "延伸閱讀",
    "media": [
      {
        "title": "Learning How to Learn",
        "creator": "Barbara Oakley·Terrence Sejnowski (UC San Diego/McMaster, Coursera)",
        "url": "https://www.coursera.org/learn/learning-how-to-learn"
      },
      {
        "title": "9.00SC Introduction to Psychology — Memory",
        "creator": "John Gabrieli (MIT OpenCourseWare)",
        "url": "https://ocw.mit.edu/courses/9-00sc-introduction-to-psychology-fall-2011/"
      },
      {
        "title": "Desirable Difficulties",
        "creator": "Elizabeth·Robert Bjork (UCLA Bjork Learning and Forgetting Lab)",
        "url": "https://bjorklab.psych.ucla.edu/videos/"
      }
    ],
    "forgettingCurve": {
      "xAxisLabel": "經過天數",
      "yAxisLabel": "記憶保持率",
      "legend": [
        "答對1次 → 7天",
        "連續答對2次 → 14天",
        "連續答對3次 → 30天",
        "連續答對4次 → 90天"
      ]
    },
    "spacedReview": {
      "crammingLabel": "突擊複習",
      "spacedLabel": "分散複習"
    },
    "mascotAlt": "語境詞彙吉祥物",
    "referencesToggle": "檢視參考文獻"
  },
  "pricing": {
    "title": "合理的價格",
    "subtitle": "免費開始，需要時再升級。",
    "popular": "熱門",
    "startButton": "開始使用",
    "monthly": "月付",
    "yearly": "年付",
    "yearlyDiscount": "優惠",
    "oneTime": "一次性付款",
    "yearlySavingsNote": "按年付費省{percent}",
    "perMonth": "/月",
    "perYear": "/年",
    "plans": [
      {
        "name": "Free",
        "wordLimit": "100個詞彙",
        "priceNote": "完全免費",
        "description": "基礎學習功能",
        "features": [
          "儲存100個詞彙",
          "OCR文字提取",
          "AI關鍵字分析",
          "智慧測驗",
          "自定義標籤3個"
        ]
      },
      {
        "name": "Basic",
        "priceMonthly": "NT$150",
        "priceYearly": "NT$1,190",
        "yearlySavings": "33%",
        "wordLimit": "1,000個詞彙",
        "priceNote": "App Store 台灣區價格",
        "description": "儲存更多詞彙",
        "features": [
          "儲存1,000個詞彙",
          "OCR文字提取",
          "AI關鍵字分析",
          "智慧測驗",
          "無限標籤"
        ]
      },
      {
        "name": "Pro",
        "priceMonthly": "NT$320",
        "priceYearly": "NT$2,290",
        "yearlySavings": "40%",
        "wordLimit": "無限",
        "priceNote": "App Store 台灣區價格",
        "description": "使用全部功能",
        "features": [
          "無限詞彙儲存",
          "所有Basic功能",
          "詳細學習統計",
          "優先支援"
        ]
      },
      {
        "name": "Lifetime",
        "priceOnce": "NT$2,990",
        "wordLimit": "無限",
        "priceNote": "App Store 台灣區價格",
        "isLifetime": true,
        "description": "一次性付款，終身無限使用",
        "features": [
          "無限詞彙儲存",
          "所有Pro功能",
          "終身使用",
          "無額外費用"
        ]
      }
    ]
  },
  "cta": {
    "title": "立即開始",
    "subtitle": "在語境中學習，在遺忘之前再次複習。",
    "appStore": "從App Store下載",
    "googlePlay": "從Google Play下載"
  },
  "support": {
    "metaTitle": "支援與常見問題",
    "metaDescription": "檢視關於語境詞彙入門、功能使用、訂閱與付款、帳號管理的常見問題，或聯絡我們的支援團隊。",
    "title": "需要幫助？",
    "subtitle": "檢視常見問題，或通過以下方式聯絡我們。",
    "contactTitle": "直接聯絡",
    "contactDescription": "請通過以下方式聯絡我們，我們會盡快回復。",
    "contactButton": "郵件諮詢: support@contextvoca.app",
    "faqs": [
      {
        "category": "入門",
        "questions": [
          {
            "q": "語境詞彙（ContextVoca）是什麼應用？",
            "a": "語境詞彙是一款基於AI的詞彙學習應用，通過句子語境學習詞彙。輸入文本後，AI提取核心詞彙，並通過相似句子對比測試提供深度學習。"
          },
          {
            "q": "支援哪些裝置？",
            "a": "支援iOS（iPhone、iPad）和Android裝置。請從App Store或Google Play下載。"
          },
          {
            "q": "如何註冊？",
            "a": "可以使用Apple、Google或Kakao帳號快速登入。無需單獨的註冊流程。"
          }
        ]
      },
      {
        "category": "功能使用",
        "questions": [
          {
            "q": "如何新增詞彙？",
            "a": "有兩種方式：(1) 直接輸入或貼上句子（最多500字），AI會自動提取核心詞彙。(2) 用相機拍攝教材或試卷，通過OCR識別文字。OCR在所有方案中均可使用。"
          },
          {
            "q": "測驗如何進行？",
            "a": "基於已儲存的詞彙，AI生成相似含義的句子。可選擇智慧模式（根據學習目標自動篩選）、隨機模式或標籤模式進行測試。難度會自動調整以保持70-80%的正確率。"
          },
          {
            "q": "如何使用標籤？",
            "a": "新增詞彙時可以指定標籤（如托業、高考、商務）。測驗或複習時可以選擇特定標籤進行集中學習。免費方案最多可建立3個自定義標籤，Basic及以上方案無限制。"
          },
          {
            "q": "有科學依據嗎？",
            "a": "有的。數百項研究反覆證實，分散複習比集中突擊更有利於長期記憶，主動回憶也比單純重讀更有效。也有研究表明，按學習者各自的遺忘速度進行個性化複習，效果優於統一的複習安排（這並非語境詞彙自身的實驗）。詳細依據和參考文獻請見首頁的“為什麼有效 — 學習科學依據”板塊（/zh/#science）。"
          }
        ]
      },
      {
        "category": "訂閱與付款",
        "questions": [
          {
            "q": "可以免費使用嗎？",
            "a": "是的，免費方案可以儲存和學習100個詞彙。如需儲存更多詞彙，請訂閱Basic（1,000個）或Pro（無限）方案，具體價格請在應用內訂閱頁面檢視。也可選擇Lifetime方案，一次性付款即可終身無限使用。"
          },
          {
            "q": "各方案有什麼區別？",
            "a": "所有方案均可使用OCR、AI關鍵字分析和智慧測驗。Basic起可無限建立自定義標籤，Pro/Lifetime還包含詳細學習統計和優先支援。"
          },
          {
            "q": "取消訂閱後資料會怎樣？",
            "a": "取消訂閱後，已儲存的資料不會被刪除。但會應用免費方案的詞彙限制（100個）和自定義標籤限制（3個）。"
          },
          {
            "q": "可以退款嗎？",
            "a": "退款按照Apple App Store或Google Play的政策執行。可以在各商店的訂閱管理頁面申請退款。"
          }
        ]
      },
      {
        "category": "帳號管理",
        "questions": [
          {
            "q": "我想刪除帳號。",
            "a": "可以在應用設定 > 帳號管理中申請刪除帳號。刪除帳號後，所有學習資料將被永久刪除。也可以傳送郵件至support@contextvoca.app申請刪除。"
          },
          {
            "q": "可以在其他裝置上使用嗎？",
            "a": "是的，使用同一帳號登入即可在其他裝置上同步學習資料。"
          }
        ]
      }
    ]
  },
  "privacy": {
    "metaTitle": "隱私政策",
    "metaDescription": "語境詞彙（ContextVoca）的隱私政策。",
    "title": "隱私政策",
    "lastUpdated": "最後更新：2026年2月7日",
    "sections": [
      {
        "title": "1. 概述",
        "content": "語境詞彙（ContextVoca，以下簡稱\"服務\"）重視使用者的個人資訊，並根據相關法律法規保護個人資訊。本隱私政策說明服務收集的資訊及其使用目的。"
      },
      {
        "title": "2. 收集的個人資訊",
        "content": "服務可能收集以下個人資訊：",
        "items": [
          "帳號資訊：電子郵件地址、姓名（從社交登入提供商獲取）",
          "學習資料：儲存的句子、詞彙、標籤、測驗結果、學習統計",
          "購買記錄：應用內訂閱資訊（付款通過Apple App Store或Google Play處理，服務不直接收集支付卡資訊）",
          "裝置資訊：裝置型別、作業系統版本、應用版本（用於錯誤診斷）",
          "錯誤資料：崩潰日誌、錯誤堆疊跟蹤（通過Sentry收集）"
        ]
      },
      {
        "title": "3. 個人資訊的使用目的",
        "content": "",
        "items": [
          "建立和管理服務帳號",
          "提供詞彙本、測驗、學習功能",
          "確認和管理訂閱狀態",
          "改善應用效能和解決錯誤",
          "回覆使用者諮詢"
        ]
      },
      {
        "title": "4. 向第三方提供個人資訊",
        "content": "服務不會向第三方出售或共享使用者的個人資訊。但通過以下服務提供商運營：",
        "items": [
          "Supabase：認證和資料庫（美國）",
          "Sentry：錯誤監控（美國）",
          "RevenueCat：訂閱管理（美國）",
          "Google Cloud：OCR文字識別（美國）",
          "Apple / Google：社交登入和應用內支付處理"
        ]
      },
      {
        "title": "5. 個人資訊的儲存和銷燬",
        "content": "使用者刪除帳號後，相關個人資訊將立即刪除。但法律要求儲存的資訊將在規定期限內儲存。"
      },
      {
        "title": "6. 使用者權利",
        "content": "使用者可以隨時行使以下權利：",
        "items": [
          "請求檢視個人資訊",
          "請求修改個人資訊",
          "請求刪除帳號和銷燬個人資訊",
          "請求資料遷移"
        ]
      },
      {
        "title": "7. 兒童的個人資訊",
        "content": "服務不會故意收集14歲以下兒童的個人資訊。如果發現14歲以下使用者提供了個人資訊，將立即刪除該資訊。"
      },
      {
        "title": "8. 隱私政策變更",
        "content": "本隱私政策可能因法規或服務變更而修改。如有重大變更，將通過應用內通知或電子郵件告知。"
      },
      {
        "title": "9. 個人資訊保護負責人",
        "content": "",
        "items": [
          "公司名稱: 공명（Gongmyeong）",
          "營業執照號: 520-22-02348",
          "電子郵件: support@contextvoca.app"
        ]
      },
      {
        "title": "10. 聯絡方式",
        "content": "如有個人資訊相關問題，請聯絡 support@contextvoca.app。"
      }
    ]
  },
  "terms": {
    "metaTitle": "使用條款",
    "metaDescription": "語境詞彙（ContextVoca）服務使用條款。",
    "title": "使用條款",
    "lastUpdated": "最後更新：2026年2月7日",
    "sections": [
      {
        "title": "第1條（目的）",
        "content": "本條款旨在規定語境詞彙（ContextVoca，以下簡稱\"服務\"）使用的基本事項。"
      },
      {
        "title": "第2條（服務內容）",
        "content": "服務提供以下功能：",
        "items": [
          "基於文本的核心詞彙提取（AI）",
          "基於句子語境的詞彙管理",
          "相似句子對比測驗",
          "基於OCR的文字識別",
          "學習統計和自適應難度"
        ]
      },
      {
        "title": "第3條（註冊與帳號）",
        "content": "",
        "items": [
          "使用服務需要通過Apple、Google或Kakao帳號註冊。",
          "使用者有責任管理自己的帳號資訊，不得將帳號轉讓或共享給他人。",
          "如確認存在不當使用，可能限制服務使用。"
        ]
      },
      {
        "title": "第4條（付費服務）",
        "content": "",
        "items": [
          "服務提供免費方案、付費訂閱方案（Basic、Pro）以及一次性付款的Lifetime方案。",
          "付費訂閱及Lifetime購買通過Apple App Store或Google Play支付，價格顯示在各商店的應用內頁面。",
          "訂閱在未取消的情況下自動續訂。需在續訂日前至少24小時取消，以避免下次扣費。",
          "退款按照Apple或Google的退款政策執行。"
        ]
      },
      {
        "title": "第5條（禁止行為）",
        "content": "使用者不得進行以下行為：",
        "items": [
          "輸入非法或不當內容",
          "妨礙服務正常運營的行為",
          "侵犯他人個人資訊的行為",
          "對服務進行逆向工程、反編譯的行為",
          "使用自動化工具進行大量請求"
        ]
      },
      {
        "title": "第6條（智慧財產權）",
        "content": "服務的設計、標誌、軟體、內容的智慧財產權歸服務運營者所有。使用者輸入的學習內容（句子、詞彙）的權利歸使用者所有。"
      },
      {
        "title": "第7條（免責）",
        "content": "",
        "items": [
          "服務基於AI生成內容，不完全保證生成結果的準確性。",
          "對因服務維護、故障、不可抗力導致的服務中斷不承擔責任。",
          "服務不介入使用者之間或使用者與第三方之間的糾紛。"
        ]
      },
      {
        "title": "第8條（服務變更與終止）",
        "content": "服務可能因運營需要變更或終止服務內容。重大變更時將提前通知。"
      },
      {
        "title": "第9條（條款變更）",
        "content": "本條款可能根據需要進行變更，變更時將通過應用內通知或電子郵件告知。如不同意變更後的條款，可以停止使用服務並刪除帳號。"
      },
      {
        "title": "第10條（適用法律與管轄）",
        "content": "本條款的解釋和適用適用大韓民國法律。因使用服務產生的糾紛，以首爾中央地方法院為管轄法院。"
      },
      {
        "title": "經營者資訊",
        "content": "",
        "items": [
          "公司名稱: 공명（Gongmyeong）",
          "營業執照號: 520-22-02348",
          "電子郵件: support@contextvoca.app"
        ]
      },
      {
        "title": "聯絡方式",
        "content": "如有使用條款相關問題，請聯絡 support@contextvoca.app。"
      }
    ]
  },
  "blog": {
    "metaTitle": "部落格",
    "metaDescription": "語境詞彙部落格：單字記憶方法與用照片製作單字本的方法。",
    "title": "部落格",
    "subtitle": "介紹結合語境學習英語單字的方法。",
    "emptyState": "暫無已發布的文章，敬請期待。",
    "allTagsLabel": "全部",
    "updatedLabel": "更新日期：",
    "backToList": "返回部落格列表",
    "latestPosts": {
      "title": "最新文章",
      "viewAll": "查看全部"
    },
    "relatedPosts": {
      "title": "相關文章"
    }
  }
};

export default zhHant;
