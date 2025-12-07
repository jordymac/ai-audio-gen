# AI Audio Generation System

A Next.js prototype demonstrating the interface journey for an AI audio generation workflow system. This is a **showcase/portfolio piece** designed to demonstrate systematic thinking about AI-assisted creative workflows.

## Overview

This application showcases a complete 7-screen workflow for AI audio generation:

1. **Brief Intake** (`/`) - Capture creative requests
2. **Prompt Review** (`/prompt-review`) - Review and edit AI-generated prompts
3. **Generation Progress** (`/generation-progress`) - Monitor generation status
4. **Audio Review** (`/audio-review`) - Listen and compare variations ⭐ **Most Important Screen**
5. **Metadata Review** (`/metadata-review`) - Verify and refine metadata
6. **Delivery Confirmation** (`/delivery`) - Confirm asset ready and provide access
7. **Analytics Dashboard** (`/analytics`) - Monitor performance metrics

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui
- **Icons**: lucide-react
- **Audio Player**: react-h5-audio-player
- **State Management**: Zustand
- **Charts**: Recharts

## Getting Started

### Prerequisites

- Node.js 18+
- npm, pnpm, yarn, or bun

### Installation & Running

```bash
# Install dependencies (already done)
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Setup Audio Files

For the demo to work with actual audio playback, add MP3 files to `public/audio/`:
- `variation-1.mp3`
- `variation-2.mp3`
- `variation-3.mp3`

See `public/audio/README.md` for instructions on generating sample audio files or use any royalty-free music samples.

## Project Structure

```
/app
  /page.tsx                    # Brief Intake
  /prompt-review/page.tsx      # Prompt Review
  /generation-progress/page.tsx # Progress
  /audio-review/page.tsx       # Audio Review (main screen)
  /metadata-review/page.tsx    # Metadata Review
  /delivery/page.tsx           # Delivery Confirmation
  /analytics/page.tsx          # Analytics Dashboard
  /layout.tsx                  # Root layout with nav

/components
  /ui/                         # shadcn/ui components

/lib
  /mock-data.ts               # All mock data
  /types.ts                   # TypeScript types
  /utils.ts                   # Helper functions

/public
  /audio/                     # Sample audio files
```

## Features

### User Journey Flow

The application demonstrates a complete workflow:

1. **Brief Intake**: Users describe their audio requirements
2. **Prompt Review**: AI generates a detailed prompt that can be edited
3. **Generation Progress**: Simulated progress indicator (5 seconds)
4. **Audio Review**:
   - Listen to 3 variations with play/pause controls
   - View AI evaluation scores and technical checks
   - Select best variation or reject with feedback
   - Grid and list view options
5. **Metadata Review**:
   - Edit title, tags, genre, mood, instruments
   - Manage use cases
   - Add delivery notes
6. **Delivery**:
   - Download audio and metadata
   - View generation stats
   - Create similar or new request
7. **Analytics**:
   - Key metrics (approval rates, turnaround time)
   - Trend charts (12-week approval rate)
   - Genre performance analysis
   - Rejection reason breakdown
   - AI-powered recommendations

### Key Highlights

- **Mock Data Driven**: All data flows use realistic mock data
- **State Management**: Uses localStorage for cross-page data persistence
- **Responsive Design**: Works on mobile, tablet, and desktop
- **Professional UI**: Clean, modern design with shadcn/ui components
- **Interactive Charts**: Recharts for data visualization
- **Simulated Workflows**: Progress indicators and auto-navigation

## Design Principles

- **Clean & Modern**: Professional interface without being flashy
- **Generous Whitespace**: Easy to read and navigate
- **Clear Typography**: Proper hierarchy and readability
- **Consistent Colors**:
  - Primary: Purple for CTAs
  - Success: Green for approvals
  - Warning: Orange for warnings
  - Error: Red for rejections
  - Neutral: Grays for backgrounds

## Development

### Build for Production

```bash
npm run build
npm start
```

### Type Checking

TypeScript is configured for strict type checking. All types are defined in `lib/types.ts`.

## Demonstration Purpose

This is a **prototype/portfolio piece** demonstrating:
- Systematic thinking about AI workflows
- Data-driven continuous improvement
- Professional UX for complex workflows
- Metrics and analytics integration

**Note**: This is not production software. It uses mock data and simulated generation processes.

---

**Goal**: Showcase a systematic approach to AI audio generation where data and metrics drive continuous improvement.
