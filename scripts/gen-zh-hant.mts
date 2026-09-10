// 繁體中文(臺灣) 사전 생성기.  사용: npx -y tsx scripts/gen-zh-hant.mts
// lib/i18n/zh.ts(간체)를 OpenCC(cn→twp)로 변환한 뒤 대만 어휘·도메인 용어를 치환한다.
// 간체 사전이 바뀌면 다시 실행한다 — 키 구조는 zh.ts와 동일(check-i18n-keys가 검사).
import zh from "../lib/i18n/zh";
import { createRequire } from "node:module";
import fs from "node:fs";
const require = createRequire(import.meta.url);
const OpenCC = require("opencc-js");
const conv = OpenCC.Converter({ from: "cn", to: "twp" });

// "釋出"는 OpenCC cn→twp가 "发布"에 붙이는 배포/릴리스 어감의 대만 어휘 — 콘텐츠
// "발행"에는 "發布"가 자연스러워 2026-09-10 예외 추가.
const TW_TERMS: Array<[string, string]> = [
  ["單詞", "單字"], ["生詞", "生字"], ["詞典", "字典"], ["關鍵詞", "關鍵字"], ["智能", "智慧"],
  ["賬戶", "帳戶"], ["賬號", "帳號"], ["設置", "設定"], ["保存", "儲存"], ["點擊", "點選"],
  ["反饋", "意見回饋"], ["郵箱", "電子郵件"], ["登錄", "登入"], ["加載", "載入"], ["搜索", "搜尋"],
  ["視頻", "影片"], ["屏幕", "螢幕"], ["默認", "預設"], ["支持", "支援"], ["信息", "資訊"],
  ["數據", "資料"], ["初中", "國中"], ["示例", "範例"], ["軟件", "軟體"], ["程序", "程式"],
  ["訂閱", "訂閱"], ["四六級", "多益／英檢"], ["考研", "研究所考試"],
  ["博客", "部落格"], ["釋出", "發布"],
];
function tw(s: string): string {
  let out = conv(s);
  for (const [a, b] of TW_TERMS) out = out.split(a).join(b);
  return out;
}
function walk(v: any): any {
  if (typeof v === "string") return tw(v);
  if (Array.isArray(v)) return v.map(walk);
  if (v && typeof v === "object") return Object.fromEntries(Object.entries(v).map(([k, x]) => [k, walk(x)]));
  return v;
}
// tsx의 CJS interop에 따라 default가 한 겹 더 싸여 올 수 있다
const source = (zh as any).default ?? zh;
const out = walk(source);
// 로케일 종속 값은 변환 대신 명시한다 — 대만 App Store 실측(2026-09-07): 150/1,190·320/2,290·2,990, 할인율은 월×12 대비 내림
out.pricing.plans[1].priceMonthly = "NT$150"; out.pricing.plans[1].priceYearly = "NT$1,190"; out.pricing.plans[1].yearlySavings = "33%";
out.pricing.plans[2].priceMonthly = "NT$320"; out.pricing.plans[2].priceYearly = "NT$2,290"; out.pricing.plans[2].yearlySavings = "40%";
out.pricing.plans[3].priceOnce = "NT$2,990";
for (const i of [1, 2, 3]) out.pricing.plans[i].priceNote = "App Store 台灣區價格";
const header = `import { Translations } from "./types";

// 繁體中文(臺灣) 사전 — scripts/gen-zh-hant.mts가 lib/i18n/zh.ts에서 생성한다. 직접 편집하지 말 것.
// 2026-09-07: 대만·홍콩 스토어 등록정보는 번체인데 웹이 간체로 폴백되던 불일치를 없앤다.

const zhHant: Translations = ${JSON.stringify(out, null, 2)};

export default zhHant;
`;
fs.writeFileSync(new URL("../lib/i18n/zh-Hant.ts", import.meta.url), header);
console.log("written:", out.meta.title, "|", out.pricing.plans[1].priceMonthly);
