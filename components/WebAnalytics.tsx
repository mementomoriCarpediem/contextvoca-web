/**
 * Cloudflare Web Analytics 비콘.
 *
 * 이 사이트에는 분석 도구가 하나도 없어 2026-08-27 도메인 이전 이후 유입을 볼 수 없었다.
 * Cloudflare 엣지 로그만으로는 사람과 스캐너를 구분할 수 없다(2026-09-03 실측: 최다일
 * 페이지뷰의 다수가 `.env`·`wp-*` 스캐너였다). 비콘은 브라우저에서만 실행되므로
 * 봇이 걸러진 실제 방문자만 집계된다.
 *
 * 쿠키를 쓰지 않아 동의 배너가 필요 없다. 대시보드: Cloudflare > Analytics > Web Analytics.
 */
const SITE_TAG = "7f525a66d25b4a39964ef2c90017672a";

export function WebAnalytics() {
  return (
    <script
      defer
      src="https://static.cloudflareinsights.com/beacon.min.js"
      data-cf-beacon={`{"token": "${SITE_TAG}"}`}
    />
  );
}
