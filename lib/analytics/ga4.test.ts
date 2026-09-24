import { describe, expect, it } from "vitest";
import { GA4_MEASUREMENT_ID, ga4InitScript } from "./ga4";

// 관제탑 측정(measure.js)과 같은 기준으로 GA 수집을 끈다: 측정 중단·내부 방문 쿠키,
// ?analytics=off|internal, DNT·GPC.
function run({ cookie = "", search = "", doNotTrack = "0", gpc = false } = {}) {
  const win: Record<string, unknown> = {};
  new Function("window", "document", "navigator", "location", ga4InitScript(GA4_MEASUREMENT_ID))(
    win,
    { cookie },
    { doNotTrack, globalPrivacyControl: gpc },
    { search },
  );
  return { disabled: win[`ga-disable-${GA4_MEASUREMENT_ID}`], dataLayer: win.dataLayer };
}

describe("GA4", () => {
  it("uses this site's measurement id", () => {
    expect(GA4_MEASUREMENT_ID).toMatch(/^G-[A-Z0-9]{4,20}$/);
  });
  it("collects for an ordinary visitor", () => {
    const r = run();
    expect(r.disabled).toBe(false);
    expect(Array.isArray(r.dataLayer)).toBe(true);
  });
  it("stops for opted-out, internal and do-not-track browsers", () => {
    expect(run({ cookie: "a=1; orbit_off=1" }).disabled).toBe(true);
    expect(run({ cookie: "orbit_internal=1" }).disabled).toBe(true);
    expect(run({ search: "?analytics=off" }).disabled).toBe(true);
    expect(run({ search: "?analytics=internal" }).disabled).toBe(true);
    expect(run({ doNotTrack: "1" }).disabled).toBe(true);
    expect(run({ gpc: true }).disabled).toBe(true);
  });
  it("counts a browser again once internal marking is cleared", () => {
    expect(run({ cookie: "orbit_internal=1", search: "?analytics=external" }).disabled).toBe(false);
  });
});
