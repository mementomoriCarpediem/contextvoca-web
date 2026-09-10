import { describe, expect, it } from "vitest";
import { pickPreferredLocale } from "./pick-preferred-locale";

describe("pickPreferredLocale", () => {
  it("prefers the default locale (en) whenever it's available, regardless of position", () => {
    expect(pickPreferredLocale(["ja", "en", "zh"])).toBe("en");
    expect(pickPreferredLocale(["en"])).toBe("en");
  });

  it("falls back to the first available locale in `locales` order when en is absent", () => {
    expect(pickPreferredLocale(["zh-Hant", "ja"])).toBe("ja"); // ja precedes zh-Hant in locales order
    expect(pickPreferredLocale(["zh"])).toBe("zh");
  });

  it("is independent of input array order — same available set always picks the same locale", () => {
    expect(pickPreferredLocale(["zh-Hant", "ja", "zh"])).toBe(pickPreferredLocale(["zh", "zh-Hant", "ja"]));
  });

  it("returns undefined for an empty list", () => {
    expect(pickPreferredLocale([])).toBeUndefined();
  });
});
