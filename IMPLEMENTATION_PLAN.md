# 종합 사이트 개선 및 리빌딩 실행 계획서

본 문서는 앞서 분석된 현황, 기대 효과, 리스크 분석을 바탕으로 **K-WAVE 매거진 사이트**를 성공적으로 리빌딩하기 위한 종합 계획서입니다. 이 계획은 **안정성(Error-free)** 과 **점진적 개선(Incremental Update)** 을 최우선으로 합니다.

## 1. 종합 개선 전략 (Strategy)

우리의 목표는 **"유지보수 가능한 고성능 글로벌 웹 애플리케이션"** 으로 전환하는 것입니다.

*   **구조적 모듈화**: `page.tsx`에 집중된 코드를 역할별(Feature-based) 컴포넌트로 분해합니다.
*   **서버 중심 설계 (RSC)**: 초기 로딩 속도와 SEO를 위해 클라이언트 로직을 서버 컴포넌트로 이관합니다.
*   **표준화된 시스템**: 하드코딩을 제거하고, 타입 시스템(TypeScript)과 디자인 시스템(UI Kit)을 정립합니다.

---

## 2. 단계별 실행 계획 (Execution Map)

각 단계는 독립적으로 실행 가능하며, 이전 단계가 완료되어야 다음 단계로 넘어갑니다.

### Phase 1: 기반 공사 (Foundation)
가장 먼저 흔들리지 않는 기초를 다집니다.
- [ ] **타입 정의 (Type Definitions)**: `types/index.ts`에 `Article`, `Translation` 등 핵심 인터페이스 정의.
- [ ] **UI 라이브러리 구축 (UI Kit)**: `components/ui` 폴더에 `Button`, `Badge`, `Card` 등 원자(Atom) 단위 컴포넌트 생성.
- [ ] **다국어 데이터 분리 (I18n Setup)**: `lib/translations.ts` 또는 JSON 파일로 번역 데이터 분리.

### Phase 2: 컴포넌트 분할 (Component Extraction)
페이지를 물리적으로 쪼개어 복잡도를 낮춥니다.
- [ ] **헤더(Header) 분리**: `components/layout/Header.tsx` 생성 및 로직 이관.
- [ ] **히어로 섹션(Hero) 분리**: `components/home/Hero.tsx` 생성.
- [ ] **기사 목록(ArticleList) 분리**: `components/home/FeaturedStories.tsx` 생성.
- [ ] **레이아웃 적용**: `app/(public)/layout.tsx`에 Header 적용.

### Phase 3: 서버 사이드 전환 (Server Transition)
성능과 SEO를 위한 핵심 단계입니다.
- [ ] **API 유틸리티 작성**: `lib/api.ts`에 Supabase 데이터 페칭 함수 작성 (서버용).
- [ ] **페이지 리팩토링**: `app/(public)/page.tsx`를 `async Server Component`로 전환.
- [ ] **클라이언트 로직 격리**: 상호작용이 필요한 부분(탭 전환 등)만 별도 Client Component로 분리.

### Phase 4: 검증 및 마무리 (Verification)
- [ ] **빌드 테스트**: `npm run build`를 통해 프로덕션 빌드 에러 확인.
- [ ] **기능 점검**: 다국어 전환, 데이터 로딩, 모바일 반응형 동작 확인.

---

## 3. 사용자 승인 및 실행 대기
이 계획은 **즉시 실행 가능한 상태**로 준비되었습니다. 사용자가 **"그대로 실행해"** 라고 명령하면, 위 **Phase 1**부터 순차적으로 코드를 작성하고 적용을 시작합니다.

## User Review Required
> [!IMPORTANT]
> 리팩토링 중에는 일시적으로 화면 깨짐이 발생할 수 있으나, 각 단계가 끝날 때마다 정상 동작을 확인합니다.
> 데이터베이스(Supabase) 설정은 변경하지 않으므로 데이터 손실 위험은 없습니다.

## Proposed Changes

### Structure
#### [NEW] [types/index.ts](file:///Users/jimmy/Desktop/kwave-magazine/types/index.ts)
- Type definitions for `Article`, `Product`, `NavItems`.

#### [NEW] [components/ui/button.tsx](file:///Users/jimmy/Desktop/kwave-magazine/components/ui/button.tsx)
- Reusable Button component.

#### [NEW] [lib/translations.ts](file:///Users/jimmy/Desktop/kwave-magazine/lib/translations.ts)
- Extracted translation objects.

#### [MODIFY] [app/(public)/page.tsx](file:///Users/jimmy/Desktop/kwave-magazine/app/(public)/page.tsx)
- Refactor to Server Component, importing new components.
