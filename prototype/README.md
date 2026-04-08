# Impulse Prototype

Vite + React + HashRouter 기반 프로토타입입니다.

## 실행

```bash
npm install
npm run dev
```

브라우저에서 보통 아래 주소로 확인합니다.

```text
http://localhost:5173/#/onboarding/welcome
```

## 편집

- Docker 필요 없음
- VS Code에서 폴더를 연 뒤 파일을 수정하면 Vite dev server가 바로 반영됩니다
- 실시간 확인은 `npm run dev`만 켜면 충분합니다

## 주요 라우트

- `/#/onboarding/welcome`
- `/#/onboarding/permissions`
- `/#/onboarding/apps`
- `/#/main/settings`
- `/#/main/settings/detail/Instagram`
- `/#/main/intervention`

## GitHub Pages

이 프로젝트는 HashRouter를 사용해서 GitHub Pages에서 새로고침/직접진입 이슈를 줄였습니다.

배포 워크플로는 `.github/workflows/deploy.yml`에 들어 있습니다.
