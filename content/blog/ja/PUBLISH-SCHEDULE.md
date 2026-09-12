# 일본어 1차 배치 발행 절차 (2026-09-13 작성)

대표님 발행 승인 완료(2026-09-13, 3편 일괄). 3편은 `draft: true`로 이관되어 있고,
**편별 발행일에 draft만 false로 바꾸면 발행된다.** 초안 상태에서는 목록·본문이 noindex 스텁으로만
렌더되고 sitemap·llms.txt·헤더 링크에 나타나지 않는다.

| 발행일 | 파일 | 제목 |
|---|---|---|
| 2026-10-06 | `content/blog/ja/eiken-2kyu-vocab-method.mdx` | 英検2級の単語の覚え方 |
| 2026-10-13 | `content/blog/ja/photo-vocabulary-guide.mdx` | 写真で英単語帳を作る3つの方法 |
| 2026-10-20 | `content/blog/ja/forgetting-curve-2015-replication.mdx` | 忘却曲線は本当にあるのか |

## 발행일에 실행할 것

```bash
cd ~/projects/contextvoca-web
SLUG=eiken-2kyu-vocab-method          # 발행일에 맞는 slug로 교체
sed -i 's/^draft: true$/draft: false/' content/blog/ja/$SLUG.mdx
COREPACK_ENABLE_DOWNLOAD_PROMPT=0 corepack yarn test   # 63 통과
COREPACK_ENABLE_DOWNLOAD_PROMPT=0 corepack yarn build  # 산출물 확인용
grep -o 'name="robots" content="[^"]*"' out/ja/blog/$SLUG/index.html   # index, follow 여야 함
grep -c '/go/' out/ja/blog/$SLUG/index.html                            # 2 (스토어 CTA)
grep -c "ja/blog/$SLUG" out/sitemap.xml out/llms.txt                   # 각 1 이상
git add content/blog/ja/$SLUG.mdx && git commit && git push origin main # 약 2분 후 자동 배포
node scripts/indexnow-submit.mjs https://contextvoca.app/ja/blog/$SLUG/ https://contextvoca.app/ja/blog/
```

배포 후 라이브에서 확인: 본문 200·`index, follow`, 목록에 링크, sitemap·llms.txt 반영,
일본어 헤더에 "ブログ" 링크 노출(첫 편 발행 시 자동으로 생긴다).

## 발행 후 기록 4종 (SOP)

`~/resonance/content/publishing-approval-log.md`(승인 항목에 발행 결과 추가) ·
`published-index.md`(편별 1행) · `performance-log.md`(1행) · 앱 레포 `.resonance/journal.md`.

## 재활용 (편별 발행 직후)

기획서 2절대로 note.com(ja)에 요약 + 링크를 올린다. 원문 전재는 하지 않는다.
note 계정은 보유(https://note.com/contextvoca). X는 계정 미보유로 이번 배치 대상이 아니다.

근거 문서: 앱 레포 `content/20260912-jp-batch2/`(01-proposal · 02-research · 03-review).
