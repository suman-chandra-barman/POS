# Project Coding Standards & Guidelines (AGENTS.md)

> **[PROJECT CONFIGURATION - PHOTOGRAPHY PORTAL]**
> - **Framework:** Next.js 16 (App Router) with React 19 & TypeScript
> - **Styling:** Tailwind CSS v4 (`@tailwindcss/postcss`) + Shadcn UI / Base UI (`@base-ui/react`) + Lucide Icons + `tw-animate-css`
> - **Form & Validation:** React Hook Form (`react-hook-form`) + Zod (`@hookform/resolvers/zod`)
> - **Internationalization:** next-intl (Localized routing: `app/[locale]/...`)
> - **Date & Utilities:** date-fns, react-day-picker, react-phone-number-input, countries-list, country-flag-icons, sonner (Toast)

This document outlines the strict engineering standards, architectural patterns, and coding rules for this Next.js frontend application. All AI agents and developers must strictly adhere to these guidelines to ensure production-grade scalability and code quality.

---

## 1. Core Software Engineering Principles
- **Senior Persona:** Write clean, modular, self-documenting, type-safe, and production-ready code.
- **Single Responsibility Principle (SRP):** Every file, hook, and component MUST have exactly ONE distinct responsibility and reason to change. Separate presentation, business logic, state mutations, and data definitions.
- **Open/Closed Principle (OCP):** Components should be open for extension but closed for modification. Favor component composition (`children`, slots, compound component patterns) over endlessly chaining conditional props.
- **Interface Segregation (ISP):** Keep component props minimal and focused. Do not pass large objects down when a component only needs two primitive values.
- **DRY (Don't Repeat Yourself):** Extract repeated UI patterns into reusable common components (`@/components/common/`) and abstract shared logic into custom hooks or pure utility functions (`@/lib/` or `@/utils/`).
- **KISS & YAGNI:** Keep implementations straightforward and readable. Avoid premature abstraction, speculative features, or over-engineering patterns not currently required.
- **One Component Per File:** Every component file MUST export exactly ONE React component. Never declare multiple sub-components, helper UI components, dialogs, or layouts in the same `.tsx` file.
- **No Quick Hacks:** Avoid inline mock data, hardcoded fallbacks, or superficial patches. Always connect to real APIs, type contracts, and actual error states.
- **Clean Syntax:** Keep comments and code strings strictly ASCII (avoid non-standard Unicode characters like `───` or `—` that cause rendering boxes in editors).

---

## 2. Next.js App Router & Component Boundaries
- **Server-First Strategy:** By default, all components must remain Server Components. Do not add `"use client"` unless interactive state (`useState`, `useReducer`), browser event listeners, or client-only hooks are strictly required.
- **Leaf-Level Interactivity:** Push `"use client"` down to the furthest leaves of the component tree to maximize server-side rendering and minimize client bundle size.
- **Passing Server Content to Client Components:** When a Client Component needs to wrap or contain Server Components, always pass them as `children` or explicit JSX slots.
- **Parallel Data Fetching:** Fetch server-side data in parallel using `Promise.all` where applicable to avoid sequential request waterfalls.

---

## 3. UI, Shadcn & Base UI Standards
- **Shadcn & Base UI Primitives:** Always prefer Shadcn UI and Base UI (`@base-ui/react`) primitives (`@/components/ui/*`) for overlays, inputs, pickers, and dialogs.
- **Modals & Dialogs:** MUST use Shadcn UI Dialog (`@/components/ui/dialog`). Never create raw inline modals or window overlays.
- **Delete Operations:** MUST use the shared deletion modal (`@/components/common/DeleteModal`). Never use native `window.confirm()`.
- **Loading & Skeleton States:** NEVER use plain text "Loading..." placeholders. Always render visual skeleton loaders (`TableSkeleton`, `CardSkeleton`).
- **Navigation:** Always use `@/components/common/BackNavigation` for back navigation actions.
- **Image Optimization:** 
  - ALWAYS use Next.js `Image` (`next/image`). NEVER use standard HTML `<img>` tags.
  - Provide explicit `width` and `height` or `fill` with an accurate `sizes` attribute for remote/static images.

---

## 4. Architectural Patterns: Container & Presentational
- **Smart / Dumb Split:**
  - **Presentational (Dumb) Components:** Focus purely on how things look. Receive data and handlers via props and render UI. Kept pure and reusable.
  - **Container (Smart) Components:** Handle side-effects, state synchronization, form bindings, and data orchestration.
- **Custom Hooks for Logic:** Complex UI interactions (e.g., date-range picking with `react-day-picker`, phone formatting with `react-phone-number-input`) MUST be encapsulated inside dedicated custom hooks (`use<Feature>.ts`).

---

## 5. Form Handling & Zod Validation
- **React Hook Form Standard:** All form state and lifecycles must be managed via `react-hook-form` (`useForm`).
- **Strict Zod Resolvers:** Form schemas MUST use Zod and resolve via `@hookform/resolvers/zod`.
- **Single Source of Truth:** Never write separate TypeScript interfaces for forms. Always infer form types directly from the Zod schema:
  ```typescript
  export const profileSchema = z.object({
    fullName: z.string().min(2),
    phoneNumber: z.string().min(8),
  });
  export type ProfileFormValues = z.infer<typeof profileSchema>;
  ```

---

## 6. Routing, URL State & Localization
- **URL as State Holder:** Store active tab identifiers, filter parameters, search queries, and page pagination in URL search parameters to ensure link shareability and refresh persistence.
- **Modals Isolated from URL:** Modals and temporary confirmation dialogs MUST use local React state (`useState`). Never inject transient modal toggles into URL query strings.
- **Localization via `next-intl`:** 
  - Never hardcode user-facing strings in JSX. Always use `useTranslations()` from `next-intl`.
  - Maintain localized route segments (`app/[locale]/...`) and preserve the locale parameter across internal redirects and routing helpers.

---

## 7. Performance, Hooks & Memory Safety
- **No Sync State Updates in Effects:** Never invoke `setState` synchronously inside the body of a `useEffect` to prevent cascading render loops.
- **Memory Cleanup:** Always clean up Object URLs (`URL.revokeObjectURL`) and window event listeners when handling transient images, previews, or file uploads.
- **Date Handling with `date-fns`:** Use immutable functions from `date-fns` for date formatting and manipulations instead of native `Date` mutations.
- **Toasts & Feedback:** Use `sonner` (`toast.success()`, `toast.error()`) for user-facing asynchronous feedback.

---

## 8. Feature-Driven Architecture
Structure codebase domain-by-domain under `@/features/<feature-name>/`:
- `components/` (Feature-specific presentation & container components)
- `hooks/` (Custom hooks specific to the domain workflow)
- `types/` (TypeScript interfaces and Zod schemas)
- `utils/` (Domain-specific calculations and helpers)
- `services/` (HTTP data fetchers or Server Actions)

---

## 9. Styling, Dynamic Classes & Tailwind CSS v4
- **`cn()` Utility:** Always combine conditional classes using the `cn()` helper (`clsx` + `tailwind-merge`). Never concatenate class strings using template literals.
- **Use Canonical Tailwind Classes:** Always use standard Tailwind CSS classes instead of arbitrary bracket values (e.g., `rounded-xs` instead of `rounded-[2px]`, `shadow-xs`, `text-xs`).
- **Avoid Arbitrary Value Warnings (`suggestCanonicalClasses`):** Convert arbitrary pixel values to canonical classes using the v4 scale calculation (`px / 4 = scale`):
  - `430px` -> `max-w-107.5`
  - `480px` -> `max-w-120`
  - `200px` -> `max-w-50`
- **`size-*` Shorthand:** Prefer `size-N` for square dimensions (e.g., `size-5` instead of `h-5 w-5`).

---

## 10. TypeScript Standards & Zero 'any' Tolerance
- **No TypeScript Enums:** NEVER use native TypeScript `enum` keywords. Always use frozen `as const` objects:
  ```typescript
  export const USER_STATUS = {
    ACTIVE: "active",
    SUSPENDED: "suspended",
  } as const;
  export type UserStatus = (typeof USER_STATUS)[keyof typeof USER_STATUS];
  ```
- **Zero 'any' Tolerance:** Strictly prohibit `any`. Use `unknown` with runtime type predicates or Zod validation when receiving unbounded input.
- **Explicit Return Types:** Declare explicit return types on utility functions and hooks to prevent unintended type inference leaks.

---

## 11. Error Handling & App Resilience
- **Error Boundaries:** Provide route-level and segment-level `error.tsx` and `not-found.tsx` boundaries to isolate failures.
- **Safe Async Handlers:** Always wrap network calls or Server Actions in standard try/catch wrappers or unified action handlers, exposing user-friendly error messages through `sonner`.

---

## 12. Mandatory Git Commit Message on Every Response
- **Always Provide Git Commit Command:** At the end of every response where code, configurations, or documents are created or modified, the AI assistant MUST provide a clean, conventional, copy-pasteable Git commit snippet (e.g., `feat(...)`, `refactor(...)`, `fix(...)`, `docs(...)`).