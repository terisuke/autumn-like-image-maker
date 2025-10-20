# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is **秋風画像メーカー** (Autumn Wind Image Maker), a mobile-first web application that transforms photos into autumn-themed images using Google Gemini 2.5 Flash Image API. The app is designed specifically for mobile devices (smartphones/tablets) with touch-optimized UI.

## Development Commands

```bash
# Install dependencies
npm install

# Start development server (runs on http://localhost:3000)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Environment Setup

The app requires a Gemini API key. Create a `.env.local` file:

```env
GEMINI_API_KEY=your_api_key_here
```

**Important**: The Vite config (vite.config.ts:15-16) maps `GEMINI_API_KEY` to both `process.env.API_KEY` and `process.env.GEMINI_API_KEY`. The service layer uses `process.env.API_KEY`.

## Architecture

### Core Data Flow

1. **Image Upload** → `FileUploader` component accepts file
2. **Validation** → `useImageProcessor` hook validates file type (JPEG/PNG/WEBP only)
3. **Base64 Conversion** → `fileUtils.ts` converts File to base64
4. **AI Processing** → `geminiService.ts` sends to Gemini API with specific prompt
5. **Display** → Processed image shown alongside original in `ImageDisplay` components
6. **Actions** → User can download or share via Web Share API (mobile) or Twitter intent (fallback)

### State Management Pattern

The app uses a custom hook pattern centered around `useImageProcessor` (hooks/useImageProcessor.ts):

- **Single source of truth** for all image processing state
- Returns handlers and state to `App.tsx`
- Manages four processing states: `Idle`, `Loading`, `Success`, `Error` (defined in types.ts)
- Handles cleanup of object URLs to prevent memory leaks

### Component Structure

```
App.tsx (main layout & state orchestration)
├── FileUploader (drag-drop & click upload)
├── ImageDisplay (shows original or processed image)
├── Spinner (loading indicator)
└── ErrorBoundary (error handling wrapper)
```

All UI components receive props from `useImageProcessor` hook—no internal state management in presentational components.

### Mobile-Specific Considerations

- **Touch optimization**: All buttons use `touch-manipulation` CSS class and `active:scale-95` for tactile feedback
- **Responsive grid**: Uses `sm:grid-cols-2` to show images side-by-side on larger mobile screens
- **Web Share API**: Primary sharing mechanism (hooks/useImageProcessor.ts:90-94) with Twitter fallback for desktop
- **Large touch targets**: Buttons are `py-4` (16px vertical padding) minimum for accessibility

### Gemini API Integration

The prompt in `services/geminiService.ts:25` is carefully crafted to:
- Transform **only** foliage and leaves to autumn colors
- Preserve sky, buildings, people, and non-plant objects
- Avoid simple color filters
- Return image modality response (not text)

**Key prompt instruction**: "Do not apply a simple color filter over the entire image" ensures selective transformation.

### File Type Handling

Constants defined in `constants.ts:1`:
- Valid types: `image/jpeg`, `image/png`, `image/webp`
- Validation happens in `useImageProcessor.ts:39-42`

## Code Conventions

### Import Organization
Imports follow this pattern (see App.tsx:1-7):
1. React imports
2. Component imports
3. Constants/utilities
4. Hooks
5. Types

### TypeScript Strictness
- All React components use `React.FC` type
- Hook returns are explicitly typed (e.g., `UseImageProcessorReturn` interface)
- Constants use `as const` assertions for type narrowing

### Path Aliases
The project uses `@/*` alias (tsconfig.json:21-24, vite.config.ts:18-20) for absolute imports from project root.

## Deployment

Hosted on Vercel with:
- Build command: `npm run build` (vercel.json:2)
- Output directory: `dist`
- SPA routing via catch-all rewrite to `/index.html`
- Security headers: `X-Content-Type-Options`, `X-Frame-Options`, `X-XSS-Protection`

Remember to set `GEMINI_API_KEY` environment variable in Vercel project settings.

## Key Files

- **constants.ts**: All user-facing text, error messages, and configuration
- **types.ts**: TypeScript enums and interfaces (minimal—most types are inline)
- **App.tsx**: Main component that orchestrates all UI and state
- **hooks/useImageProcessor.ts**: Core business logic and state management
- **services/geminiService.ts**: Gemini API client and image processing
