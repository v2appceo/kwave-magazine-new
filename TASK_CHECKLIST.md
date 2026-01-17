# Task Checklist: Site Rebuilding & Optimization

## Phase 1: 기반 공사 (Foundation)
- [ ] Create type definitions (`types/index.ts`)
- [ ] Implement UI Kit (`Button`, `Badge`, `Card` in `components/ui`)
- [ ] Extract translations to `lib/translations.ts`

## Phase 2: 컴포넌트 분할 (Component Extraction)
- [ ] Create `Header` component and move logic from `page.tsx`
- [ ] Create `Hero` component
- [ ] Create `FeaturedStories` component
- [ ] Update `(public)/layout.tsx` to include `Header`

## Phase 3: 서버 사이드 전환 (Server Transition)
- [ ] Create `lib/api.ts` for Supabase server-side fetching
- [ ] Refactor `page.tsx` to Server Component
- [ ] Implement client-side logic for interactivity (Tabs, etc.)

## Phase 4: 검증 및 마무리 (Verification)
- [ ] Verify build with `npm run build`
- [ ] Check functionality (I18n, Data Loading, Responsive UI)
- [ ] Final Review
