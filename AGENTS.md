# Project Coding Standards & Guidelines (AGENTS.md)

> **[PROJECT CONFIGURATION - POS]**
> - **Framework:** Next.js 16 (App Router) with React 19 & TypeScript
> - **State Management & API:** Redux Toolkit & RTK Query (`@reduxjs/toolkit`) + Redux Persist (Encrypted)
> - **Styling:** Tailwind CSS v4 (`@tailwindcss/postcss`) + Shadcn UI / Base UI + Lucide Icons
> - **Form & Validation:** React Hook Form (`react-hook-form`) + Zod
> - **Internationalization:** next-intl (Localized routing: `app/[locale]/...`)
> - **Rich Text & Utilities:** React Quill New, Sanitize-HTML, Dnd-Kit, Sonner (Toast)

This document outlines the strict engineering standards, architectural patterns, and coding rules for this Next.js frontend application. All AI agents and developers must adhere to these guidelines to ensure production-grade quality.

---

## 1. Architecture & General Principles
- **Senior Persona:** Write clean, modular, self-documenting, type-safe, and production-ready code.
- **No Quick Hacks:** Avoid inline mock data, hardcoded fallbacks, or superficial patches. Always connect to real APIs.
- **Clean Syntax:** Keep comments and code strings strictly ASCII (avoid non-standard Unicode characters like `───` or `—` that cause `□` rendering boxes in editors).
- **Component Reusability:** Extract reusable UI elements into `@/components/common/` or `@/components/ui/` rather than duplicating markup.

---

## 2. UI, Shadcn & Component Standards
- **Shadcn Primitives:** Always prefer Shadcn UI primitives (`@/components/ui/*`) for UI elements, overlays, dialogs, dropdowns, and inputs.
- **Modals & Dialogs:** MUST use Shadcn UI Dialog (`@/components/ui/dialog`). Never use raw inline modals.
- **Delete Operations:** MUST use the shared deletion modal (`@/components/common/DeleteModal`). Never use native `window.confirm()`.
- **Loading States:** Never use plain text "Loading..." placeholders. Always use visual skeleton indicators (e.g., `TableSkeleton`, `CardSkeleton`).
- **Navigation:** Always use `@/components/common/BackNavigation` for back buttons.
- **Image Optimization:** 
  - ALWAYS use Next.js `Image` (`next/image`). Never use standard HTML `<img>` tags.
  - Provide explicit `width` and `height` or `fill` with `sizes` for static/remote images.

---

## 3. API, State Management & Environment Config
- **RTK Query Only:** All HTTP requests MUST be declared as RTK Query endpoints (`features/<feature>/api/<name>Api.ts`). No raw `fetch()` or `axios` inside UI components.
- **Centralized Environment:** ALWAYS import `env` from `@/config/env`. Never read `process.env.NEXT_PUBLIC_*` directly in components.
- **Cache Tags:** Always define clear `providesTags` and `invalidatesTags` for automatic cache invalidation.

---

## 4. Form Handling & Zod Validation
- **React Hook Form:** Manage form state using `react-hook-form` (`useForm`).
- **Zod Validation:** Resolve validation schemas via `@hookform/resolvers/zod`. Keep schemas type-safe and stored in dedicated feature-level modules.

---

## 5. Routing & URL State
- **URL-Driven State:** Store active tabs, filters, and detail view IDs in URL search parameters.
- **Modal State:** Modals/Dialogs MUST use React local state (`useState`). Never set URL search parameters for opening modals.
- **Localization:** Maintain Next.js App Router localized routing structure (`app/[locale]/...`).

---

## 6. React Hooks, Performance & Memory Safety
- **No Sync State Updates in Effects:** Never call `setState` synchronously inside `useEffect` bodies to prevent cascading re-renders.
- **Memory Cleanup:** Always clean up Blob URLs (`URL.revokeObjectURL`) when handling transient media.
- **Toasts:** Use `sonner` (`toast.success()`, `toast.error()`) for API feedback.

---

## 7. Feature-Driven Architecture
Organize code by feature under `@/features/<feature-name>/`:
- `api/` (RTK Query endpoints)
- `components/` (Feature-specific UI elements)
- `hooks/` (Custom feature hooks)
- `types/` (Zod schemas & TypeScript interfaces)
- `utils/` (Feature helper functions)

---

## 8. Internationalization (`next-intl`)
- **No Hardcoded Text:** Never hardcode user-facing strings. Always fetch text using `useTranslations()` from `next-intl`.
- **Route Integrity:** Preserve the current locale parameter (`app/[locale]/...`) across all sub-routes and navigation links.

---

## 9. Styling & Dynamic Classes
- **`cn()` Utility:** Always merge dynamic classes using the `cn()` helper (`clsx` + `tailwind-merge`). Never concatenate class strings manually.
- **Standard Classes Only:** Use standard Tailwind classes. Avoid deprecated or non-standard experimental CSS selectors.

---

## 10. Tailwind Sizing, Tokens & Canonical Classes
- **Use Canonical Tailwind Classes:** Always use standard, canonical Tailwind CSS utility classes instead of arbitrary bracket values whenever a canonical class exists (e.g., `rounded-xs` instead of `rounded-[2px]`, `shadow-xs`, `text-xs`).
- **Avoid Arbitrary Value Warnings (`suggestCanonicalClasses`):** Never write arbitrary pixel bracket values like `max-w-[430px]`, `rounded-[2px]`, `p-[4px]`, or `w-[16px]` when Tailwind CSS v4 supports canonical dynamic scale utilities (e.g., `max-w-[430px]` MUST be written as `max-w-107.5`).
- **Tailwind v4 Scale Calculation (`px / 4 = scale`):**
  - Standard spacing/sizing in Tailwind is based on units of `0.25rem` (4px).
  - Convert arbitrary pixel values to canonical classes by dividing by 4:
    - `430px` -> `max-w-107.5` (or `w-107.5`)
    - `480px` -> `max-w-120`
    - `200px` -> `max-w-50`
    - `130px` -> `max-w-32.5`
- **Standard Scale & Design Tokens:** Adhere strictly to the theme variables, standard spacing, typography, and border radius scales configured in the design system.
- **`size-*` Shorthand:** Prefer `size-N` for square dimensions (e.g., `size-5` instead of `h-5 w-5`).

---

## 11. Error Handling & Resilience
- **Error Boundaries:** Implement `error.tsx` and `not-found.tsx` at route segment levels.
- **Normalized Errors:** Extract and display API error messages standardly through RTK Query error payload helpers before displaying with `sonner`.