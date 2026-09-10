import path from "node:path";
import { defineConfig } from "vitest/config";

// 순수 로직 단위 테스트 전용(lib/blog/*, scripts/*의 파서·정렬·매핑 함수).
// UI 컴포넌트는 빌드(yarn build) + 실물 산출물 대조로 검증한다(coding-standards).
export default defineConfig({
  resolve: {
    alias: {
      // tsconfig.json의 "@/*" 경로 별칭과 동일 — vitest는 tsconfig paths를
      // 자동으로 읽지 않으므로 여기서도 명시해야 한다.
      "@": path.resolve(__dirname, "."),
    },
  },
  test: {
    environment: "node",
    include: ["lib/**/*.test.ts", "scripts/**/*.test.{ts,mjs}"],
  },
});
