# 한국어 2차 배치 발행 절차 (승인 완료 2026-09-19, 발행일별 draft 전환만 남음)

승인: 대표님 "2차 배치 발행도 승인"(2026-09-19, 데스크톱 세션). 검수: `~/projects/contextvoca/content/20260918-web-blog-kr-batch2/02-review.md`.
세션 크론은 7일 만료라 예약 불가 — **발행일에 세션에서 수행**한다(자동 게시 금지 원칙과 일치).

| 발행일 | slug | 상태 |
|---|---|---|
| 2026-09-23 | novel-reading-photo-vocabulary | 발행 완료 |
| ~~2026-09-25~~ → **2026-09-23** | civil-service-exam-vocab | 발행 완료 — 대표님 지시로 앞당김(2026-09-23). frontmatter `date`도 발행일에 맞춰 09-25→09-23으로 고쳤다(미래 날짜 `datePublished` 방지) |
| 2026-09-30 | middle-school-vocab-method | 대기 |
| 2026-10-02 | transfer-exam-vocab | 대기 |

발행일 절차(편별):
1. `sed -i 's/^draft: true$/draft: false/' content/blog/ko/<slug>.mdx` → `corepack yarn build` → `grep -c noindex out/ko/blog/<slug>/index.html` = 0, `out/sitemap.xml` URL 수 +1 확인
2. `git commit -m "content(blog/ko): <slug> 발행"` → `git push origin main`(단일 명령으로 — 복합 명령은 분류기 차단)
3. 라이브 확인: `curl -s https://contextvoca.app/ko/blog/<slug>/ | grep -o '<meta name="robots"[^>]*'` = index,follow / 홈 최신 글·관련 글에 반영
4. `node scripts/indexnow-submit.mjs https://contextvoca.app/ko/blog/<slug>/`
5. GSC URL 검사→색인 생성 요청 + 네이버 서치어드바이저 수집 요청 (`~/.chrome-agent`, `agent-browser --cdp 9224`, 절차는 메모리 chrome-automation-profile 2026-09-18 절)
6. 기록 4종: resonance/content/published-index.md·performance-log.md·publishing-approval-log.md + contextvoca 저널
