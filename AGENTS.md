# AgileFlow Agent Guidelines

This document provides essential information for agentic coding agents operating in the AgileFlow repository.

## 1. Build, Lint, and Test Commands

Currently, AgileFlow is a pure HTML/JavaScript project without a formal build system or package manager (no `package.json`).

- **Build:** No build step required. Open `index.html` in a modern web browser.
- **Linting:** No automated linter is configured. Adhere to the code style described below.
- **Testing:** 
  - There is no automated test suite (e.g., Jest, Cypress).
  - **Single Test Verification:** Manually verify changes by refreshing the browser and interacting with the UI. Check the browser console for errors.
  - Use `console.log` for debugging as needed, but remove them before finalizing changes unless they are high-value logs.

## 2. Code Style Guidelines

### JavaScript (`main.js`)
- **Formatting:** 4-space indentation. No semicolons are required but used consistently in existing code.
- **Naming Conventions:**
  - **Variables/Functions:** `camelCase` (e.g., `renderProjects`, `currentProject`).
  - **Constants:** `camelCase` or `UPPER_SNAKE_CASE` (sample data uses `camelCase`).
- **Imports:** External libraries (Tailwind, Anime.js, ECharts, etc.) are imported via CDN in the HTML files. Do not add `import` statements in `main.js`.
- **State Management:** Uses global variables for state (e.g., `projects`, `sprints`, `userStories`). Updates should be reflected by re-calling render functions (e.g., `renderProjects()`).
- **Error Handling:** Use `showNotification(message, 'error')` for user-facing errors and `console.error` for developer logs.

### HTML & CSS
- **Styling:** Primarily uses **Tailwind CSS** (via CDN). Custom styles should be added to the `<style>` block in the `<head>` of HTML files.
- **Layout:** Follow the established grid system (8px grid) and Tailwind's utility classes.
- **Typography:** Uses "Inter" as the primary body font.

## 3. Design System & Libraries

Adhere to the design philosophy documented in `design.md`.

- **Animations:** Use **Anime.js** for micro-interactions and transitions.
- **Data Visualization:** Use **ECharts.js** for charts and metrics.
- **Text Effects:** Use **Splitting.js** for text animations and **Typed.js** for dynamic descriptions.
- **Color Palette:**
  - Primary: `#1a365d` (Deep Navy)
  - Secondary: `#319795` (Soft Teal)
  - Accent: `#f6ad55` (Warm Amber)
  - Success: `#38a169` (Sage Green)
  - Warning: `#e53e3e` (Coral)

## 4. Project Structure

- `index.html`: Main dashboard showing project cards and stats.
- `sprints.html`: Sprint management and analytics.
- `kanban.html`: Kanban board for user stories.
- `main.js`: Contains all business logic and sample data.
- `resources/`: Contains images and SVG icons.

## 5. Interaction Model

- **Modals:** Handled via `openProjectModal()` and `closeProjectModal()` styles (removing/adding `hidden` class).
- **Navigation:** Standard anchor tags for page switching.
- **Notifications:** Use `showNotification(message, type)` for all status feedback.

## 6. Development Workflow

1.  **Read Context:** Always read `main.js` and the relevant `.html` file before making changes.
2.  **Verify UI:** Ensure any new UI elements follow the glass-morphism and `card-hover` styles defined in `index.html`.
3.  **Manual Verification:** Since there are no automated tests, you MUST describe how you verified the change in your terminal output (e.g., "Verified that the 'Create Project' modal closes after submission").
