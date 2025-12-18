# AI Audio Generation - Project Guide

## Project Overview

An AI-powered audio generation system built with Next.js 16 and React 19. The application provides a complete workflow for generating, reviewing, and delivering AI-generated audio content with analytics tracking.

## Tech Stack & Architecture

### Core Framework
- **Next.js** 16.0.7 (App Router)
- **React** 19.2.0
- **TypeScript** 5.x (strict mode enabled)
- **Node.js** Target: ES2017

### Styling & UI
- **Tailwind CSS** v4 with CSS variables
- **shadcn/ui** components (New York style)
- **Radix UI** primitives for accessible components
- **Lucide React** for icons
- **tw-animate-css** for animations
- **Dark mode** support with oklch color space

### State & Data
- **Zustand** for state management
- Mock data patterns in `/lib/mock-data.ts`
- Type definitions in `/lib/types.ts`

### Specialized Libraries
- **react-h5-audio-player** for audio playback
- **Recharts** for analytics visualizations

### Path Aliases
- `@/` → project root
- `@/components` → `/components`
- `@/lib` → `/lib`
- `@/ui` → `/components/ui`

## Application Features

The app follows a workflow pipeline:
1. **Home** - Main dashboard and entry point
2. **Prompt Review** - Review and refine generation prompts
3. **Generation Progress** - Monitor audio generation status
4. **Audio Review** - Listen to and review generated audio
5. **Metadata Review** - Review and edit audio metadata
6. **Delivery** - Finalize and deliver audio content
7. **Analytics** - Track usage and performance metrics

## Project Structure

```
/app                    # Next.js App Router pages
  /analytics           # Analytics dashboard
  /audio-review        # Audio review interface
  /delivery            # Delivery management
  /generation-progress # Generation status tracking
  /metadata-review     # Metadata editing
  /prompt-review       # Prompt refinement
  globals.css          # Global styles with CSS variables
  layout.tsx           # Root layout
  page.tsx             # Home page

/components
  sound-library-sidebar.tsx  # Custom sidebar component
  /ui                        # shadcn/ui components
    alert.tsx
    badge.tsx
    button.tsx
    card.tsx
    dropdown-menu.tsx
    input.tsx
    progress.tsx
    select.tsx
    tabs.tsx
    textarea.tsx

/lib
  mock-data.ts         # Mock data for development
  types.ts             # TypeScript type definitions
  utils.ts             # Utility functions (cn, etc.)

/public                # Static assets
```

## Skills & When to Use Them

### Frontend Design & Development
**When:** Building or modifying UI components, pages, layouts, or any visual interface

**Use:** [frontend-design-skill.md](./frontend-design-skill.md)

This skill provides comprehensive guidelines for creating distinctive, production-grade interfaces that avoid generic aesthetics. Apply when:
- Creating new components or pages
- Redesigning existing interfaces
- Adding animations or interactions
- Making visual/aesthetic decisions
- Implementing responsive layouts

---

*Additional skills will be documented here as they are added to the project*

## MCP Servers & When to Use Them

The project has access to several Model Context Protocol (MCP) servers that provide specialized capabilities. Use the appropriate MCP for each task:

### Desktop Commander
**When:** File operations, system tasks, data analysis, local file processing

**Key Capabilities:**
- **File Operations**: Read, write, edit files with surgical precision
- **Search**: Content search and file search across directories
- **Process Management**: Run terminal commands, Python REPL, interactive shells
- **Data Analysis**: Process CSV, JSON, PDF files using Python/pandas

**Use For:**
- Reading/writing project files
- Searching codebase for specific patterns
- Running build commands and scripts
- Analyzing data files
- Creating and managing directories
- PDF generation and manipulation

**Common Patterns:**
```
- Edit specific code blocks without rewriting entire files
- Search for files or content across the project
- Run Python scripts for data processing
- Execute npm/build commands
```

### GitHub MCP
**When:** GitHub repository operations, PR/issue management, code search

**Key Capabilities:**
- **Repository Operations**: Create, search, get file contents
- **Issues & PRs**: Create, update, review, comment
- **Code Search**: Search code across all of GitHub
- **Branch Management**: Create branches, commits, tags

**Use For:**
- Creating and managing pull requests
- Searching GitHub for code examples
- Managing issues and project tracking
- Getting file contents from remote repositories
- Reviewing pull requests and adding comments

**Common Patterns:**
```
- Create PR after implementing features
- Search GitHub for implementation examples
- Manage issues and track work
- Review code changes in PRs
```

### Next.js MCP
**When:** Next.js development, debugging, documentation, runtime queries

**Key Capabilities:**
- **Runtime Queries**: Query dev server for errors, routes, diagnostics
- **Documentation**: Search official Next.js documentation
- **Knowledge Base**: Access Next.js 16 guides (Cache Components, migrations)
- **Upgrade Tools**: Upgrade to Next.js 16, enable Cache Components

**Use For:**
- Debugging Next.js runtime errors
- Understanding Cache Components and caching strategies
- Looking up Next.js API documentation
- Migrating to Next.js 16
- Querying running dev server for route information

**Common Patterns:**
```
- Query runtime for build errors and diagnostics
- Search docs for Next.js API usage
- Get guidance on Cache Components implementation
- Understand async API migrations
```

**IMPORTANT**: Use `nextjs_runtime` tool to query the running dev server for real-time diagnostics, errors, and route information. Start dev server with `__NEXT_EXPERIMENTAL_MCP_SERVER=true` (Next.js < 16) or rely on default MCP support (Next.js >= 16).

### Browser Automation (Playwright)
**When:** Testing web interfaces, UI verification, screenshots, browser interactions

**Key Capabilities:**
- **Navigation**: Load pages and navigate through the app
- **Interactions**: Click, type, fill forms, upload files
- **Verification**: Take screenshots, capture console logs
- **Testing**: Verify pages load correctly, test user flows

**Use For:**
- Testing the application in a real browser
- Verifying Next.js pages render correctly
- Capturing screenshots of UI
- Testing interactive features
- Monitoring console errors

**Common Patterns:**
```
- Verify all routes work after Next.js upgrade
- Test user workflows (prompt → generation → review)
- Capture screenshots for documentation
- Monitor browser console for runtime errors
```

### Hugging Face MCP
**When:** AI/ML model discovery, datasets, research papers

**Key Capabilities:**
- Search ML models, datasets, and papers
- Get model/dataset details
- Access Hugging Face documentation

**Use For:**
- Finding pre-trained models for audio generation
- Discovering relevant datasets
- Researching AI/ML papers

### Redis MCP
**When:** Caching, data storage, vector search (if needed in future)

**Key Capabilities:**
- Key-value operations
- Vector similarity search
- Pub/sub messaging
- Data structures (lists, sets, hashes)

**Use For:**
- Implementing caching strategies
- Storing session data
- Vector search for audio embeddings (future feature)

### Image Generation MCP
**When:** Generating images for UI mockups, assets, or demonstrations

**Key Capabilities:**
- Generate images using Z-Image-Turbo model
- Custom prompts and styles

**Use For:**
- Creating placeholder images
- Generating UI assets
- Visual mockups

## Development Conventions

### Component Patterns
- Use TypeScript for all components
- Leverage Radix UI primitives via shadcn/ui components
- Apply Tailwind utility classes for styling
- Use CSS variables for theming (defined in `globals.css`)
- Keep components focused and composable
- Export types alongside components

### Styling Guidelines
- Use Tailwind utility classes
- Leverage CSS variables for colors (oklch color space)
- Support both light and dark modes
- Use `cn()` utility from `/lib/utils.ts` for conditional classes
- Follow shadcn/ui component patterns

### File Naming
- Pages: `page.tsx` in route directories
- Components: `kebab-case.tsx`
- Types: defined in `/lib/types.ts` or co-located
- Utilities: `utils.ts` or descriptive names

### State Management
- Use Zustand for global state
- Keep component state local when possible
- Follow React 19 best practices

### TypeScript
- Enable strict mode
- Define types in `/lib/types.ts` or co-located
- Use proper type annotations
- Avoid `any` types

### Code Quality
- Maintain type safety throughout
- Follow Next.js 16 App Router conventions
- Ensure responsive design across devices
- Prioritize performance and accessibility
- Write clean, readable code
