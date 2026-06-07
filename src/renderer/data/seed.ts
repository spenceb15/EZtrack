import type { AppData } from '../types'

// Default data written to local JSON on first run or after an explicit reset.
export const seedData: AppData = {
  settings: {
    experienceMode: 'builder',
    theme: 'dark'
  },
  agents: [
    {
      id: 'claude-code',
      name: 'Claude Code',
      bestFor: ['Feature implementation', 'UI building', 'Component work', 'Refactoring', 'Larger code edits'],
      risks: ['May over-redesign', 'May change unrelated files', 'Needs strict boundaries'],
      recommendedFor: ['features', 'ui', 'components', 'refactor', 'build']
    },
    {
      id: 'codex',
      name: 'Codex',
      bestFor: ['Bug fixing', 'Tests', 'Regression checks', 'TypeScript errors', 'Minimal diffs', 'Correctness'],
      risks: ['Not the best tool for broad UX direction'],
      recommendedFor: ['bugs', 'tests', 'regression', 'typescript', 'minimal fixes']
    },
    {
      id: 'gemini',
      name: 'Gemini',
      bestFor: ['UX review', 'Visual critique', 'Requirement gaps', 'Large-context review', 'Design feedback'],
      risks: ['May produce broad suggestions instead of specific implementation steps'],
      recommendedFor: ['ux', 'review', 'critique', 'design']
    },
    {
      id: 'chatgpt',
      name: 'ChatGPT',
      bestFor: ['Planning', 'PRDs', 'Specs', 'Prompt writing', 'Architecture reasoning', 'Strategy', 'Documentation'],
      risks: ['May not directly edit local code unless paired with a coding tool'],
      recommendedFor: ['planning', 'prd', 'spec', 'docs', 'strategy']
    }
  ],
  projects: [
    {
      id: 'project_daily',
      name: 'D.AI.L.Y',
      description:
        'A local-first AI learning app with daily lessons, XP, streaks, progress tracking, and a robot companion named Byte.',
      type: 'Local-first learning app',
      phase: 'UX Review',
      progress: 68,
      health: 'Good',
      currentGoal: 'Improve onboarding and dashboard polish while preserving working lesson/progress functionality.',
      nextStep: 'Run smoke test on lesson completion flow.',
      recommendedAgent: 'Codex',
      whyThisAgent:
        'Recent UI changes may have affected working app behavior. Codex is best for testing and minimal regression fixes.',
      lastAgentUsed: 'Claude Code',
      lastWorkedOn: '2026-06-06',
      tasks: [
        {
          id: 'task_001',
          title: 'Run smoke test on lesson completion flow',
          description:
            'Check that lessons can be completed and progress is saved correctly after recent UI changes.',
          status: 'Ready',
          priority: 'High',
          recommendedAgent: 'Codex',
          whyThisAgent: 'This is a testing and regression task.',
          acceptanceCriteria: [
            'Lesson can be completed',
            'XP updates correctly',
            'Progress bar updates correctly',
            'Streak behavior still works',
            'No unrelated UI redesigns'
          ],
          notes: 'Preserve existing lesson logic.'
        },
        {
          id: 'task_002',
          title: 'Fix Byte mascot box issue',
          description: 'Remove the unwanted box around Byte without altering the mascot or glow rings.',
          status: 'Ready',
          priority: 'High',
          recommendedAgent: 'Codex',
          whyThisAgent: 'This is a targeted visual bug fix that should avoid broad redesign.',
          acceptanceCriteria: [
            'Remove unwanted box around Byte',
            'Preserve Byte mascot design',
            'Preserve glowing rings',
            'Do not change unrelated dashboard layout'
          ],
          notes: ''
        },
        {
          id: 'task_003',
          title: 'Review onboarding flow for beginner clarity',
          description: 'Critique the onboarding flow and suggest plain-English improvements before any code changes.',
          status: 'Backlog',
          priority: 'Medium',
          recommendedAgent: 'Gemini',
          whyThisAgent: 'This is a UX review task and benefits from critique before implementation.',
          acceptanceCriteria: ['Identify confusing steps', 'Suggest plain-English improvements', 'Do not modify code'],
          notes: ''
        }
      ],
      doNotChangeRules: [
        {
          id: 'rule_001',
          rule: 'Do not redesign Byte mascot without explicit approval.',
          severity: 'Hard Rule',
          reason: 'Byte is core to the visual identity.',
          createdAt: '2026-06-06'
        },
        {
          id: 'rule_002',
          rule: 'Do not remove glowing concentric rings.',
          severity: 'Hard Rule',
          reason: 'Rings are a signature visual element.',
          createdAt: '2026-06-06'
        },
        {
          id: 'rule_003',
          rule: 'Do not rewrite working lesson logic.',
          severity: 'Hard Rule',
          reason: 'Lesson/progress flow currently works and is easy to break.',
          createdAt: '2026-06-06'
        },
        {
          id: 'rule_004',
          rule: 'Do not convert the app to a cloud backend.',
          severity: 'Hard Rule',
          reason: 'The app is intentionally local-first.',
          createdAt: '2026-06-06'
        },
        {
          id: 'rule_005',
          rule: 'Do not make broad UI changes outside the assigned task.',
          severity: 'Warning',
          reason: 'Scope creep risks regressions in working screens.',
          createdAt: '2026-06-06'
        }
      ],
      lastSession: {
        date: '2026-06-06',
        agent: 'Claude Code',
        summary: 'Updated the dashboard UI and made onboarding changes.',
        problems: 'Byte mascot was accidentally placed inside an unwanted box.',
        recommendedNextStep:
          'Use Codex to remove the Byte box without redesigning the mascot or changing glow rings.'
      },
      sessionHistory: [
        {
          date: '2026-06-06',
          agent: 'Claude Code',
          summary: 'Updated the dashboard UI and made onboarding changes.',
          problems: 'Byte mascot was accidentally placed inside an unwanted box.',
          recommendedNextStep:
            'Use Codex to remove the Byte box without redesigning the mascot or changing glow rings.'
        }
      ],
      notes: 'Preserve local-first architecture. Keep lesson logic stable.',
      agentUsageCounts: { 'Claude Code': 1 }
    }
  ]
}
