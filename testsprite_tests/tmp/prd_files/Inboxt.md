# Product Requirements Document (PRD) for InBoxt

## 1. Document Overview
### 1.1 Purpose
This PRD defines the requirements for building **InBoxt**, a smart AI-powered email digest web app. The app automates the daily review of a user's email inbox by extracting key insights, prioritizing the most important emails, and presenting them in a clean, digestible format. It empowers users to focus on what matters by reducing email overload, with features for quick actions like saving emails to tasks, searching historical digests, and managing a personal task list derived from emails.

The PRD serves as a blueprint to guide development using **Lovable.dev** (for AI-assisted UI/UX and frontend building) and **Supabase** (for secure backend storage, authentication, and database management). As a non-technical user, this document will help clarify the scope, ensuring we build iteratively without overwhelming complexity.

### 1.2 Version History
- **Version 1.0**: Initial draft based on user idea (September 14, 2025).
- **Future Updates**: Will evolve as we prototype and gather feedback.

### 1.3 Key Assumptions
- Users will connect their email via a secure integration (e.g., Gmail API or IMAP for other providers).
- AI processing will use **OpenRouter API** for summarization, gist extraction, and importance scoring (e.g., models like GPT-4o or Claude for natural language understanding).
- Development prioritizes MVP (Minimum Viable Product) first: Core digest + basic tasks.
- No mobile app initially; web-first, responsive design for desktop/mobile browsers.
- Compliance: GDPR/CCPA for data privacy; emails are processed transiently (not stored long-term without consent).

## 2. Product Vision and Goals
### 2.1 Vision
InBoxt transforms chaotic inboxes into actionable daily insights, saving users hours of email triage. For busy professionals, it's a "smart butler" that surfaces priorities, turns emails into tasks, and keeps everything searchable—making email a tool, not a burden.

### 2.2 Target Audience
- **Primary Users**: Entrepreneurs (e.g., solopreneurs juggling leads/sales), Employees/Professionals (e.g., managers handling reports/meetings), Businesses (e.g., teams tracking client comms).
- **Secondary Users**: General people (e.g., anyone overwhelmed by newsletters, personal updates).
- **User Personas**:
  - **Alex the Entrepreneur**: 35, runs a startup, gets 200+ emails/day. Needs quick prioritization of investor outreach or customer issues.
  - **Jordan the Employee**: 28, marketing coordinator, drowns in CCs. Wants gist summaries to prep for meetings.
  - **Sam the Busy Parent**: 42, freelance writer + family duties. Appreciates simple task conversion for reminders like "school pickup email."

### 2.3 Business Objectives
- **User Value**: Reduce email time by 50% (measured via user feedback surveys post-MVP).
- **Growth**: Free tier for individuals; premium for businesses (e.g., team sharing). Aim for 1,000 users in first 3 months.
- **Monetization**: Freemium model—basic digests free; advanced search/tasks premium ($9/month).
- **Success Metrics**: Daily active users (DAU), retention (e.g., 70% weekly), NPS score >8.

### 2.4 Scope
- **In Scope (MVP)**: Email integration, daily digest generation, importance ranking, basic tasks, search.
- **Out of Scope (Post-MVP)**: Multi-user/team collab, email sending/replies, advanced analytics (e.g., sentiment trends), integrations (e.g., Calendar sync).

## 3. Features and Functionality
Features are prioritized: **P0** (Must-Have for MVP), **P1** (Nice-to-Have for v1.1), **P2** (Future).

### 3.1 User Authentication and Onboarding
- **P0**: Secure sign-up/login via email/password or OAuth (Google/Apple for easy email access).
- **P0**: One-time setup wizard: Connect email provider (Gmail/Outlook/Yahoo), set daily check time (e.g., 8 AM via cron job in Supabase Edge Functions), select # of important emails (1-10, default 3-5).
- **P0**: Privacy consent: Explain data usage (transient AI processing; store only gists/tasks with user opt-in).

### 3.2 Daily Email Digest Generation
- **P0**: Cron-scheduled job (via Supabase) fetches unread/unprocessed emails from last 24 hours.
- **P0**: AI-powered processing (OpenRouter):
  - Extract **gist** (1-2 sentence summary) for each email.
  - Score **importance** (0-1 scale) based on criteria: Sender (e.g., boss/client), keywords (urgent/actionable), recency, attachments.
  - Select top N emails (user-set) by score.
- **P0**: If <N important emails: Display friendly message (e.g., "Quiet inbox today! No high-priority emails in the last 24 hours. Check back tomorrow.").
- **P1**: Handle edge cases: Spam filtering, duplicate detection.

### 3.3 Digest Display and Interaction
- **P0**: Web dashboard with daily sections:
  - Header: Date (e.g., "September 14, 2025") + refresh button.
  - Per-email card: Gist (bold), sender/subject snippet, direct link to original email (opens in new tab), "Save to Tasks" button.
- **P0**: Historical view: Scrollable timeline of past digests (e.g., last 30 days, grouped by date).
- **P0**: Search bar at top: Natural language queries (e.g., "Show emails about project deadlines from last week"). AI searches stored gists/tasks via OpenRouter.
- **P1**: Infinite scroll for history; export digest as PDF.

### 3.4 Tasks Management
- **P0**: "Save to Tasks" button extracts email into a task entry:
  - Title: Derived from subject/gist.
  - Description: Full gist + email link.
  - Deadline: AI-inferred (e.g., detect "due Friday" → auto-set date; else, user-editable).
- **P0**: Dedicated "Tasks" menu/tab:
  - List view: Pending (sortable by deadline), Completed (crossed-out, archived).
  - Toggle complete: Marks as done, moves to completed list.
  - Each task: Edit deadline, view email link, delete.
- **P1**: Reminders (email/push notifications for due tasks).
- **P2**: Task categories/tags (e.g., "Work", "Personal").

### 3.5 Data Storage and Memory
- **P0**: Supabase Database Schema (high-level):
  - `users`: ID, email, preferences (check time, N_emails).
  - `digests`: UserID, date, array of email objects {id, gist, sender, subject, link, importance_score, processed_at}.
  - `tasks`: UserID, title, description, deadline (date), status (pending/completed), email_link, created_from_digest_date.
- **P0**: "Memory": Retain all gists/tasks for 90 days (user-deletable); use for search/context in AI queries.
- **P1**: Backup/export user data.

### 3.6 AI Integration
- **P0**: OpenRouter API key stored securely in Supabase secrets.
- Prompts for AI:
  - Gist: "Summarize this email in 1-2 sentences: [email body]."
  - Importance: "Score 0-1 based on urgency for a [user role] professional: [email]."
  - Deadline Extraction: "Extract due date from: [email]. Output YYYY-MM-DD or null."
  - Search: "From these emails [array of gists], find matches for: [query]."

## 4. User Stories
Written as "As a [user], I want [feature] so that [benefit]."

- **Onboarding**: As a new user, I want a guided setup to connect my email and set preferences so I can start receiving digests without hassle.
- **Digest View**: As Alex, I want to see only my top 5 important emails from today, with gists and links, so I can act on priorities quickly.
- **Empty State**: As Jordan, if there are no important emails, I want a positive message so I feel relieved, not neglected.
- **Search**: As Sam, I want to search "reminders from school" across history so I don't lose track of personal commitments.
- **Tasks**: As an entrepreneur, I want to save an email to tasks with auto-deadline so it becomes an actionable item in one click.
- **Completion**: As a professional, I want to toggle tasks complete and archive them so my list stays clean and motivating.

## 5. Non-Functional Requirements
### 5.1 UI/UX
- Clean, modern design: Minimalist (e.g., white space, cards, sans-serif fonts). Use Lovable.dev for AI-generated prototypes.
- Responsive: Works on desktop/mobile (e.g., stack cards vertically on small screens).
- Accessibility: WCAG 2.1 AA (alt text, keyboard nav, color contrast).
- Loading States: Spinners for AI processing; offline mode shows cached digests.

### 5.2 Performance and Security
- **Performance**: Digests load <2s; AI jobs process <30s (queue if busy).
- **Security**: Supabase Auth for users; encrypt email creds; no full email storage—only gists/links.
- **Scalability**: Handle 1,000 users (Supabase auto-scales); rate-limit OpenRouter calls.
- **Reliability**: Error handling (e.g., email fetch fails → notify user); daily logs in Supabase.

### 5.3 Tech Stack Alignment
- **Frontend**: Lovable.dev for drag-and-drop UI + React (auto-generated).
- **Backend**: Supabase (Postgres DB, Auth, Edge Functions for cron/AI calls).
- **Integrations**: Email APIs (e.g., Google Workspace API); OpenRouter for AI.
- **Deployment**: Host on Vercel/Netlify (integrates with Lovable/Supabase).

## 6. Risks and Dependencies
- **Risks**: Email API rate limits (mitigate: Batch fetches); AI hallucination in gists (mitigate: User feedback loop for edits).
- **Dependencies**: OpenRouter API key (user-provided); Supabase project setup.
- **Timeline Estimate (MVP)**: 4-6 weeks iterative build (1 week planning, 2 weeks core features, 1-2 weeks testing/polish).
