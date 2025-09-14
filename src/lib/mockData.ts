import { Email } from "@/components/EmailCard";
import { Task } from "@/components/TaskRow";

export const mockEmails: Email[] = [
  {
    id: "1",
    from: {
      name: "Sarah Chen",
      email: "sarah@techstartup.com",
    },
    subject: "Q4 Investor Meeting - Deck Review Needed",
    gist: "Need your review on the Q4 investor presentation deck by tomorrow. Key metrics and growth projections included.",
    importance: 0.9,
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    emailUrl: "https://mail.google.com/mail/u/0/#inbox/1",
  },
  {
    id: "2", 
    from: {
      name: "Marketing Team",
      email: "marketing@company.com",
    },
    subject: "Campaign Performance Report - October",
    gist: "Monthly marketing campaign results are in. Overall ROI increased by 23% compared to last month.",
    importance: 0.6,
    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 hours ago
    emailUrl: "https://mail.google.com/mail/u/0/#inbox/2",
  },
  {
    id: "3",
    from: {
      name: "David Rodriguez", 
      email: "david@clientcorp.com",
    },
    subject: "Contract Amendment - Urgent Response Required",
    gist: "Client requesting contract amendments for the new project scope. Legal review needed before Friday.",
    importance: 0.85,
    timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000), // 8 hours ago
    emailUrl: "https://mail.google.com/mail/u/0/#inbox/3",
  },
  {
    id: "4",
    from: {
      name: "HR Department",
      email: "hr@company.com", 
    },
    subject: "Team Building Event - December Planning",
    gist: "Planning the annual team building event for December. Need headcount and dietary restrictions by next week.",
    importance: 0.3,
    timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000), // 12 hours ago
    emailUrl: "https://mail.google.com/mail/u/0/#inbox/4",
  },
  {
    id: "5",
    from: {
      name: "Alex Thompson",
      email: "alex@vendortech.com",
    },
    subject: "API Integration Update & Timeline",
    gist: "API integration is 80% complete. Testing phase begins next Monday with expected completion by month-end.",
    importance: 0.7,
    timestamp: new Date(Date.now() - 15 * 60 * 60 * 1000), // 15 hours ago
    emailUrl: "https://mail.google.com/mail/u/0/#inbox/5",
  },
];

export const mockHistoryEmails: { date: string; emails: Email[] }[] = [
  {
    date: "September 13, 2025",
    emails: mockEmails.slice(0, 3),
  },
  {
    date: "September 12, 2025", 
    emails: [
      {
        id: "h1",
        from: { name: "Finance Team", email: "finance@company.com" },
        subject: "Monthly Budget Review",
        gist: "September budget analysis shows 12% under forecast. Detailed breakdown attached.",
        importance: 0.6,
        timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
        emailUrl: "https://mail.google.com/mail/u/0/#inbox/h1",
      },
      {
        id: "h2", 
        from: { name: "Product Manager", email: "pm@company.com" },
        subject: "Feature Launch Rollback - Critical Bug",
        gist: "Critical bug found in new feature. Rolling back deployment and scheduling emergency fix.",
        importance: 0.95,
        timestamp: new Date(Date.now() - 26 * 60 * 60 * 1000),
        emailUrl: "https://mail.google.com/mail/u/0/#inbox/h2",
      },
    ],
  },
  {
    date: "September 11, 2025",
    emails: [
      {
        id: "h3",
        from: { name: "Operations", email: "ops@company.com" },
        subject: "Server Maintenance Window Scheduled",
        gist: "Planned maintenance this weekend from 2-6 AM EST. Services will be temporarily unavailable.",
        importance: 0.4,
        timestamp: new Date(Date.now() - 48 * 60 * 60 * 1000),
        emailUrl: "https://mail.google.com/mail/u/0/#inbox/h3",
      },
    ],
  },
];

export const mockTasks: Task[] = [
  {
    id: "t1",
    title: "Review Q4 investor deck",
    gist: "Sarah needs review on Q4 investor presentation deck with key metrics and growth projections.",
    emailUrl: "https://mail.google.com/mail/u/0/#inbox/1",
    deadline: new Date(Date.now() + 18 * 60 * 60 * 1000), // 18 hours from now
    completed: false,
  },
  {
    id: "t2",
    title: "Legal review for contract amendment",
    gist: "Client requesting contract amendments for new project scope. Urgent response required.",
    emailUrl: "https://mail.google.com/mail/u/0/#inbox/3", 
    deadline: new Date(Date.now() + 36 * 60 * 60 * 1000), // 1.5 days from now
    completed: false,
  },
  {
    id: "t3",
    title: "Provide team headcount for December event",
    gist: "HR needs headcount and dietary restrictions for annual team building event planning.",
    emailUrl: "https://mail.google.com/mail/u/0/#inbox/4",
    deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 1 week from now
    completed: false,
  },
  {
    id: "t4",
    title: "Schedule monthly one-on-ones",
    gist: "Completed task: Scheduled all monthly one-on-one meetings with direct reports.",
    emailUrl: "https://mail.google.com/mail/u/0/#inbox/old1",
    deadline: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
    completed: true,
    completedAt: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
  },
  {
    id: "t5",
    title: "Send presentation to board members",
    gist: "Completed task: Distributed monthly board presentation with KPIs and strategic updates.",
    emailUrl: "https://mail.google.com/mail/u/0/#inbox/old2",
    deadline: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
    completed: true,
    completedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
  },
];