import test from 'node:test'
import assert from 'node:assert/strict'
import * as nextStepModule from './nextStep.ts'
import * as recommendModule from './recommend.ts'
import * as projectsModule from './projects.ts'

function makeProject(overrides = {}) {
  return {
    id: 'project-1',
    name: 'Test Project',
    description: 'Test description',
    type: 'Desktop app',
    phase: 'Build & Refine',
    progress: 50,
    health: 'Needs Attention',
    currentGoal: 'Ship the MVP',
    nextStep: 'Fix the broken task',
    recommendedAgent: 'Claude Code',
    whyThisAgent: 'Manual recommendation',
    lastAgentUsed: 'Claude Code',
    lastWorkedOn: '2026-06-08',
    tasks: [],
    doNotChangeRules: [],
    lastSession: null,
    sessionHistory: [],
    notes: '',
    agentUsageCounts: {},
    knowledgeNotes: [],
    ...overrides
  }
}

test('recommendAgent prefers Codex for blocked or bug-heavy projects', () => {
  assert.equal(typeof recommendModule.recommendAgent, 'function')

  const blockedProject = makeProject({
    tasks: [
      {
        id: 'task-1',
        title: 'Fix the flaky smoke test',
        description: 'Regression bug in the completion flow',
        status: 'Blocked',
        priority: 'High',
        recommendedAgent: 'Claude Code',
        whyThisAgent: '',
        acceptanceCriteria: [],
        notes: ''
      }
    ],
    lastSession: {
      date: '2026-06-07',
      agent: 'Claude Code',
      summary: 'Investigated a regression bug',
      problems: 'TypeScript error still present',
      recommendedNextStep: 'Unblock the test failure'
    }
  })

  const recommendation = recommendModule.recommendAgent(blockedProject)
  assert.equal(recommendation.agent, 'Codex')
  assert.match(recommendation.reason, /blocked|bug|test|error/i)
})

test('recommendAgent prefers Gemini during UX review', () => {
  assert.equal(typeof recommendModule.recommendAgent, 'function')

  const uxProject = makeProject({
    phase: 'UX Review',
    tasks: [
      {
        id: 'task-1',
        title: 'Review onboarding friction',
        description: 'Collect usability feedback',
        status: 'Ready',
        priority: 'Medium',
        recommendedAgent: 'Claude Code',
        whyThisAgent: '',
        acceptanceCriteria: [],
        notes: ''
      }
    ]
  })

  const recommendation = recommendModule.recommendAgent(uxProject)
  assert.equal(recommendation.agent, 'Gemini')
  assert.match(recommendation.reason, /ux|review|design/i)
})

test('pickProjectForNextStep prioritizes blocked projects over merely recent ones', () => {
  assert.equal(typeof nextStepModule.pickProjectForNextStep, 'function')

  const recentStableProject = makeProject({
    id: 'stable',
    name: 'Stable Project',
    phase: 'Stable',
    lastWorkedOn: '2026-06-08'
  })

  const blockedProject = makeProject({
    id: 'blocked',
    name: 'Blocked Project',
    phase: 'Build & Refine',
    lastWorkedOn: '2026-06-06',
    tasks: [
      {
        id: 'task-1',
        title: 'Fix blocked release issue',
        description: '',
        status: 'Blocked',
        priority: 'Critical',
        recommendedAgent: 'Claude Code',
        whyThisAgent: '',
        acceptanceCriteria: [],
        notes: ''
      }
    ]
  })

  const recommended = nextStepModule.pickProjectForNextStep([recentStableProject, blockedProject])
  assert.equal(recommended?.id, 'blocked')
})

test('sortRulesNewestFirst orders rules by createdAt descending without mutating input', () => {
  assert.equal(typeof projectsModule.sortRulesNewestFirst, 'function')

  const rules = [
    { id: 'rule-1', rule: 'Oldest', severity: 'Note', reason: '', createdAt: '2026-06-01' },
    { id: 'rule-2', rule: 'Newest', severity: 'Hard Rule', reason: '', createdAt: '2026-06-08' },
    { id: 'rule-3', rule: 'Middle', severity: 'Warning', reason: '', createdAt: '2026-06-05' }
  ]

  const sorted = projectsModule.sortRulesNewestFirst(rules)
  assert.deepEqual(
    sorted.map((rule) => rule.id),
    ['rule-2', 'rule-3', 'rule-1']
  )
  assert.deepEqual(
    rules.map((rule) => rule.id),
    ['rule-1', 'rule-2', 'rule-3']
  )
})
