# ContextVoca Web

ContextVoca 앱 지원 웹사이트 - 랜딩페이지, 개인정보처리방침, 이용약관, 고객지원

## Pages

- `/` - 랜딩페이지 (앱 소개, 기능, 요금제)
- `/privacy` - 개인정보처리방침
- `/terms` - 이용약관
- `/support` - 고객지원 (FAQ)
- `/blog` - 블로그 목록, `/blog/{slug}` - 블로그 글 (`content/blog/{locale}/{slug}.mdx`)

## Tech Stack

- Next.js 15 (Static Export)
- TailwindCSS
- GitHub Pages

## Development

```bash
npm install
npm run dev
npm run test    # vitest — 순수 로직(lib/blog/*, scripts/indexnow-submit.mjs) 단위 테스트
```

## Deployment

`main` 브랜치에 push하면 GitHub Actions로 자동 배포됩니다.

배포 URL: https://mementomoriCarpediem.github.io/contextvoca-web/

## 블로그 글 발행 절차

1. `content/blog/{locale}/{slug}.mdx`에 원고 추가. frontmatter는
   `title`/`description`/`date`/`tags`/`locale`/`slug`/`translationKey`를
   필수로 채운다(다른 로케일의 같은 글과 `translationKey`를 맞추면 hreflang이
   자동 연결된다). 검수 전에는 `draft: true`로 둔다 — draft 글은 제목만 보이는
   noindex 스텁으로만 빌드되고 목록·sitemap·llms.txt·헤더 블로그 링크에서
   제외된다(본문·설명·태그는 산출물에 절대 포함되지 않는다).
2. 검수·승인 후 `draft: true`를 지우거나 `draft: false`로 바꾼다.
3. `git commit` 후 `main`에 `git push` — Cloudflare Worker가 자동 빌드·배포한다
   (`wrangler.toml` 참고, 로컬 `wrangler deploy`는 절대 병행하지 않는다).
4. 배포 확인(`https://contextvoca.app/{locale}/blog/{slug}/` 접속) 후:
   ```bash
   node scripts/indexnow-submit.mjs --since <배포 전 커밋 ref>
   # 또는 URL을 직접 지정: node scripts/indexnow-submit.mjs https://contextvoca.app/ko/blog/{slug}/
   ```
   `--since`는 그 ref 이후 `content/blog/`에서 바뀐 글 중 발행(`draft`가 아닌)
   상태인 것만 골라 IndexNow(Bing·Naver·Yandex 등)에 URL 갱신을 통보한다. 키는
   `public/*.txt`(파일명=키)를 그대로 읽으므로 별도 발급이 필요 없다.
