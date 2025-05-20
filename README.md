# Turborepo react-native starter

This is a community-maintained example. If you experience a problem, please submit a pull request with a fix. GitHub Issues will be closed.

## Using this example

Run the following command:

```sh
npx create-turbo@latest -e with-react-native-web
```

## What's inside?

This Turborepo includes the following packages/apps:

### Apps and Packages

- `native`: a [react-native](https://reactnative.dev/) app built with [expo](https://docs.expo.dev/)
- `web`: a [Next.js](https://nextjs.org/) app built with [react-native-web](https://necolas.github.io/react-native-web/)
- `@repo/ui`: a stub [react-native](https://reactnative.dev/) component library shared by both `web` and `native` applications
- `@repo/typescript-config`: `tsconfig.json`s used throughout the monorepo

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).

### Utilities

This Turborepo has some additional tools already setup for you:

- [Expo](https://docs.expo.dev/) for native development
- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [Prettier](https://prettier.io) for code formatting

---

## 🛠️ 개발 및 실행 방법 (KOR)

### 1. 의존성 설치

```sh
npm install
```

### 2. 웹앱 실행 (Next.js)

```sh
npm run dev --filter=web
```

- 브라우저에서 [http://localhost:3000](http://localhost:3000) 접속

### 3. 앱 실행 (Expo)

```sh
npm run dev --filter=native
```

- Expo Go 앱 또는 시뮬레이터/에뮬레이터에서 실행

### 4. 공통 UI 컴포넌트 사용 예시

#### 웹 (apps/web/app/page.tsx)
```tsx
import { Button } from "@repo/ui";

<Button text="Boop" onClick={() => alert("Pressed!")} />
```

#### 앱 (apps/native/app/index.tsx)
```tsx
import { Button } from "@repo/ui";

<Button text="Boop" onClick={() => alert("Pressed!")} />
```

---

## 📦 패키지 구조 및 역할 (2024 리팩토링 반영)

- **apps/web**: Next.js 기반 웹앱. 페이지/라우팅/웹 전용 UI 관리
- **apps/native**: Expo 기반 리액트 네이티브 앱. 모바일 전용 화면/라우팅 관리
- **packages/ui**: 공통 UI 컴포넌트(버튼 등). 앞으로 `src/components/` 하위에 확장 예정
- **packages/crossword-core**: 크로스워드 비즈니스 로직, 순수 UI 컴포넌트만 포함 (페이지 컴포넌트는 각 앱으로 이동)
- **packages/typescript-config**: 타입스크립트 공통 설정

### 리팩토링 주요 내용
- core 패키지에서 페이지 컴포넌트 분리, 각 앱으로 이동
- UI 패키지 구조 개선 (components 폴더 신설)
- 패키지별 react-native 버전 통일(0.76.9)
- TypeScript strict 옵션 강화 (noUnusedLocals/Parameters true)

---
