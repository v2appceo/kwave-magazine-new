# 현재 사이트 구조 분석 및 문제점 보고

## 1. 구조 분석

현재 프로젝트는 **Next.js 16 (App Router)** 기반으로 구성되어 있으며, 주요 구조는 다음과 같습니다.

*   **App Directory (`app/`)**:
    *   **(public)**: 일반 사용자가 접근하는 페이지 그룹 (홈페이지 등).
    *   **(admin)**: 관리자용 페이지 그룹.
    *   **layout.tsx**: 전체 애플리케이션의 루트 레이아웃.
*   **Components Directory (`components/`)**:
    *   **templates/**: 페이지 템플릿(CoverStory, Interview 등)이 존재하지만 현재 홈페이지(`page.tsx`)에서는 직접 사용되지 않고 있음.
    *   **ui/**: 비어 있음 (재사용 가능한 기본 UI 컴포넌트 부재).
*   **Data Fetching**:
    *   Supabase를 백엔드로 사용하며, 메인 페이지에서 클라이언트 사이드(`useEffect`)로 데이터를 가져오고 있음.

---

## 2. 주요 문제점 및 개선 제안

### A. 아키텍처 및 구조적 문제 (Architecture)

1.  **Monolithic Homepage (`page.tsx`)**:
    *   **문제점**: `app/(public)/page.tsx` 파일 하나에 헤더(Header), 히어로 섹션(Hero), 추천 기사 목록(Featured Stories), 다국어 처리 로직이 모두 포함되어 있습니다. 코드가 길어 유지보수가 어렵고 가독성이 떨어집니다.
    *   **개선안**:
        *   `Header` 컴포넌트로 분리하여 `(public)/layout.tsx`에 배치 (페이지 이동 시에도 유지되도록).
        *   `HeroSection`, `FeaturedStories` 등을 개별 컴포넌트로 분리.

2.  **클라이언트 사이드 렌더링 과다 사용 (CSR over SSR)**:
    *   **문제점**: 메인 페이지가 `'use client'`로 선언되어 있으며, `useEffect`를 통해 데이터를 가져옵니다. 이는 초기 로딩 속도(LCP)를 늦추고 SEO(검색 엔진 최적화)에 불리합니다.
    *   **개선안**: 메인 페이지를 **Server Component**로 전환하고, 데이터 페칭을 서버 사이드에서 수행하도록 변경해야 합니다. (`async/await` 사용).

3.  **UI 컴포넌트 부재**:
    *   **문제점**: `components/ui` 폴더가 비어 있습니다. 버튼, 카드, 뱃지 등 재사용 가능한 요소들이 `page.tsx` 내에 하드코딩된 Tailwind 클래스로 구현되어 있어 일관성 유지가 어렵습니다.
    *   **개선안**: `Button`, `Card`, `Badge` 등의 공통 컴포넌트를 생성하여 재사용성을 높여야 합니다.

### B. 코드 품질 및 유지보수 (Code Quality)

1.  **하드코딩된 다국어 처리 (Hardcoded I18n)**:
    *   **문제점**: 번역 데이터(`translations` 객체)가 컴포넌트 내부에 하드코딩되어 있습니다. 언어가 추가되거나 텍스트가 많아질수록 관리가 불가능해집니다.
    *   **개선안**: 별도의 번역 파일(JSON 등)로 분리하거나 `next-intl` 같은 라이브러리 도입을 고려해야 합니다.

2.  **이벤트 핸들러 및 상태 관리**:
    *   **문제점**: `setActiveTab`, `setLanguage` 등의 상태 관리가 페이지 레벨에서 이루어지고 있어, 컴포넌트 분리 시 Props Drilling이 발생할 수 있습니다.
    *   **개선안**: 전역 상태 관리(Context API, Zustand 등)가 필요한지 검토하거나, URL Query Parameter(예: `?lang=en`)를 활용하여 상태를 관리하는 것이 웹 표준에 더 적합합니다.

3.  **타입 안전성 부족 (Type Safety)**:
    *   **문제점**: `any` 타입이 다수 사용되고 있습니다 (`cart`, `articles`, `translations`).
    *   **개선안**: `Article`, `Translation` 등의 인터페이스를 정의하여 타입 안정성을 확보해야 합니다.

### C. 사용자 경험 (UX)

1.  **초기 로딩 경험**:
    *   데이터가 로딩되는 동안 처리(Skeleton UI 등)가 미흡하여, 데이터 로딩 전후로 화면 깜빡임이 발생할 수 있습니다.

2.  **SEO 최적화 미흡**:
    *   각 페이지별 메타데이터(Title, Description, OG Tag) 설정이 구체화되어 있지 않습니다.

---

## 3. 요약 및 권장 작업 순서

현재 사이트는 기능적으로는 동작하지만, 확장성과 유지보수성을 위해 **리팩토링이 시급**합니다.

1.  **컴포넌트 분리**: `Header`, `Hero`, `ArticleGrid` 등으로 분할.
2.  **서버 컴포넌트 전환**: 데이터 페칭 로직을 서버로 이동.
3.  **UI 라이브러리 구축**: 기본 UI 컴포넌트 생성.
4.  **다국어 시스템 개선**: 번역 데이터 분리.
