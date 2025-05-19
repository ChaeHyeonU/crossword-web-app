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
