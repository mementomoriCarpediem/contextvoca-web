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
- Cloudflare Workers (정적 에셋 서빙)

## Development

```bash
npm install
npm run dev
npm run test    # vitest — 순수 로직(lib/blog/*, scripts/indexnow-submit.mjs) 단위 테스트
```

## Deployment

`main` 브랜치에 push하면 GitHub Actions가 빌드해 Cloudflare Worker(`contextvoca-web`)에
배포합니다(`.github/workflows/deploy-worker.yml`, `wrangler.toml` 참고). 로컬에서
`wrangler deploy`를 병행하지 말 것 — 배포가 겹치면 엣지 매니페스트가 갈린다.

배포 URL: https://contextvoca.app/

(구 주소 `https://mementomoriCarpediem.github.io/contextvoca-web/`는 스토어·심사
링크가 가리켜서 유지하되, 새 도메인으로 보내는 리다이렉트 스텁만 배포한다 —
`legacy-redirect/`, `.github/workflows/deploy.yml` 참고. 실제 사이트가 아니다.)

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
   node scripts/indexnow-submit.mjs --dry-run --since <배포 전 커밋 ref>  # 먼저 페이로드만 확인
   node scripts/indexnow-submit.mjs --since <배포 전 커밋 ref>            # 실제 제출
   # 또는 URL을 직접 지정: node scripts/indexnow-submit.mjs https://contextvoca.app/ko/blog/{slug}/
   ```
   `--since <ref>`는 `git diff --name-only <ref> -- content/blog`로 비교한다 —
   즉 **`<ref>`와 현재 작업 트리를 비교**하며 HEAD나 커밋 이력이 아니다. 커밋하지
   않은 변경도 잡히므로, `main` push·빌드 확인 이후(3번 완료 후)에만 실행할 것.
   변경분 중 발행(`draft`가 아닌) 상태인 글만 골라 IndexNow(Bing·Naver·Yandex 등)에
   URL 갱신을 통보한다. `--dry-run`은 실제 호출 없이 제출될 URL과 요청 페이로드만
   출력한다. 키는 `public/*.txt`(파일명=키)를 그대로 읽으므로 별도 발급이 필요 없다.
