export type Grant = {
  id: string
  name: string
  funder: string
  amountMin: number
  amountMax: number
  deadline: string // format: 'YYYY-MM-DD'
  subject: string
  eligibility: string
  description: string
  state: string // e.g. 'WA', 'Any' for nationwide
  schoolSize: string // e.g. 'Small', 'Medium', 'Large', 'Any'
  applicationLink: string
}

export type UserProfile = {
  schoolType: string
  gradeLevel: string
  subjectNeed: string
  schoolSize: string
  state: string
}

export const MOCK_GRANTS: Grant[] = [
  {
    id: 'g1',
    name: 'STEM Innovation Grant',
    funder: 'National Science Foundation',
    amountMin: 5000,
    amountMax: 25000,
    deadline: '2026-10-15',
    subject: 'STEM',
    eligibility: 'Middle School',
    description: 'Funding for hands-on science and robotics lab equipment.',
    state: 'Any',
    schoolSize: 'Any',
    applicationLink: 'https://example.com/apply/stem-innovation',
  },
  {
    id: 'g2',
    name: 'Arts Access Fund',
    funder: 'Community Arts Alliance',
    amountMin: 1000,
    amountMax: 10000,
    deadline: '2026-09-30',
    subject: 'Arts',
    eligibility: 'Elementary',
    description: 'Supports music, visual arts, and theater programs.',
    state: 'WA',
    schoolSize: 'Small',
    applicationLink: 'https://example.com/apply/arts-access',
  },
  {
    id: 'g3',
    name: 'Reading Champions Grant',
    funder: 'Literacy First Foundation',
    amountMin: 2000,
    amountMax: 15000,
    deadline: '2026-11-01',
    subject: 'Literacy',
    eligibility: 'Elementary',
    description: 'Classroom libraries and literacy coaching support.',
    state: 'Any',
    schoolSize: 'Medium',
    applicationLink: 'https://example.com/apply/reading-champions',
  },
  {
    id: 'g4',
    name: 'Robotics Club Startup Grant',
    funder: 'TechFuture Foundation',
    amountMin: 500,
    amountMax: 5000,
    deadline: '2026-12-01',
    subject: 'STEM',
    eligibility: 'High School',
    description: 'Seed funding for new robotics and coding clubs.',
    state: 'Any',
    schoolSize: 'Large',
    applicationLink: 'https://example.com/apply/robotics-club',
  },
]

export function calculateMatch(grant: Grant, profile: UserProfile): number {
  let totalAnswered = 0
  let totalMatched = 0

  if (profile.subjectNeed !== '') {
    totalAnswered++
    if (grant.subject === profile.subjectNeed) totalMatched++
  }

  if (profile.gradeLevel !== '') {
    totalAnswered++
    if (grant.eligibility === profile.gradeLevel) totalMatched++
  }

  if (profile.schoolSize !== '') {
    totalAnswered++
    if (grant.schoolSize === 'Any' || grant.schoolSize === profile.schoolSize) totalMatched++
  }

  if (profile.state !== '') {
    totalAnswered++
    if (grant.state === 'Any' || grant.state === profile.state) totalMatched++
  }

  if (totalAnswered === 0) return 0

  return Math.round((totalMatched / totalAnswered) * 100)
}