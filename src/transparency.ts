export type Award = {
  id: string
  grantName: string
  schoolName: string
  amountAwarded: number
  dateAwarded: string // format: 'YYYY-MM-DD'
}

export type SpendingItem = {
  awardId: string
  category: string
  amount: number
  description: string
}

export const AWARDS: Award[] = [
  {
    id: 'a1',
    grantName: 'STEM Innovation Grant',
    schoolName: 'Lincoln Middle School',
    amountAwarded: 18000,
    dateAwarded: '2026-01-15',
  },
  {
    id: 'a2',
    grantName: 'Arts Access Fund',
    schoolName: 'Riverside Elementary',
    amountAwarded: 7500,
    dateAwarded: '2026-02-10',
  },
  {
    id: 'a3',
    grantName: 'Reading Champions Grant',
    schoolName: 'Oakwood Elementary',
    amountAwarded: 12000,
    dateAwarded: '2026-03-05',
  },
]

export const SPENDING: SpendingItem[] = [
  { awardId: 'a1', category: 'Equipment', amount: 12000, description: 'Robotics kits and lab tools' },
  { awardId: 'a1', category: 'Training', amount: 4000, description: 'Teacher professional development' },
  { awardId: 'a1', category: 'Supplies', amount: 2000, description: 'Consumable lab materials' },

  { awardId: 'a2', category: 'Instruments', amount: 4500, description: 'Classroom musical instruments' },
  { awardId: 'a2', category: 'Supplies', amount: 3000, description: 'Art supplies and materials' },

  { awardId: 'a3', category: 'Books', amount: 8000, description: 'Classroom library expansion' },
  { awardId: 'a3', category: 'Training', amount: 4000, description: 'Literacy coaching sessions' },
]