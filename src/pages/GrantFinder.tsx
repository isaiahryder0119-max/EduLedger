import { useState } from 'react'
import { MOCK_GRANTS, calculateMatch } from '../grants'
import type { UserProfile } from '../grants'

function GrantFinder() {
    const [query, setQuery] = useState('')
    const [subject, setSubject] = useState('')
const [eligibility, setEligibility] = useState('')
const [maxAmount, setMaxAmount] = useState('')
const [sortBy, setSortBy] = useState('match')
const [profile, setProfile] = useState<UserProfile | null>(() => {
  const saved = localStorage.getItem('eduledger-profile')
  return saved ? JSON.parse(saved) : null
})
const [schoolType, setSchoolType] = useState('')
const [gradeLevel, setGradeLevel] = useState('')
const [subjectNeed, setSubjectNeed] = useState('')
const [profileSchoolSize, setProfileSchoolSize] = useState('')
const [profileState, setProfileState] = useState('')
  return (
    <div>
        {profile === null ? (
  <div className="questionnaire">
    <h2>Tell us about your school</h2>

    <label>
      School type:
      <select value={schoolType} onChange={(e) => setSchoolType(e.target.value)}>
        <option value="">Select...</option>
        <option value="Public">Public</option>
        <option value="Private">Private</option>
        <option value="Charter">Charter</option>
      </select>
    </label>

    <label>
      Grade level:
      <select value={gradeLevel} onChange={(e) => setGradeLevel(e.target.value)}>
        <option value="">Select...</option>
        <option value="Elementary">Elementary</option>
        <option value="Middle School">Middle School</option>
        <option value="High School">High School</option>
      </select>
    </label>

    <label>
      Subject need:
      <select value={subjectNeed} onChange={(e) => setSubjectNeed(e.target.value)}>
        <option value="">Select...</option>
        <option value="STEM">STEM</option>
        <option value="Arts">Arts</option>
        <option value="Literacy">Literacy</option>
      </select>
    </label>

    <label>
      School size:
      <select value={profileSchoolSize} onChange={(e) => setProfileSchoolSize(e.target.value)}>
        <option value="">Select...</option>
        <option value="Small">Small</option>
        <option value="Medium">Medium</option>
        <option value="Large">Large</option>
      </select>
    </label>

    <label>
      State:
      <input
        type="text"
        placeholder="e.g. WA"
        value={profileState}
        onChange={(e) => setProfileState(e.target.value)}
      />
    </label>

    <button
      type="button"
      onClick={() => {
        const newProfile = {
          schoolType,
          gradeLevel,
          subjectNeed,
          schoolSize: profileSchoolSize,
          state: profileState,
        }
        setProfile(newProfile)
        localStorage.setItem('eduledger-profile', JSON.stringify(newProfile))
      }}
    >
      See My Matches
    </button>
  </div>
) : (
    <>
      <h1 className="grant-finder-heading">Grant Finder</h1>
      <p className="grant-finder-subtitle">Search and match grants here.</p>
      <button
  type="button"
  className="retake-button"
  onClick={() => {
    localStorage.removeItem('eduledger-profile')
    setProfile(null)
  }}
>
  Retake Questionnaire
</button>
      <div className="grant-filters">
      <input
  type="text"
  placeholder="Search grants..."
  value={query}
  onChange={(e) => setQuery(e.target.value)}
/>
<select value={subject} onChange={(e) => setSubject(e.target.value)}>
  <option value="">All Subjects</option>
  <option value="STEM">STEM</option>
  <option value="Arts">Arts</option>
  <option value="Literacy">Literacy</option>
</select>
<select value={maxAmount} onChange={(e) => setMaxAmount(e.target.value)}>
  <option value="">Any Amount</option>
  <option value="5000">Up to $5,000</option>
  <option value="15000">Up to $15,000</option>
  <option value="30000">Up to $30,000</option>
</select>

<select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
  <option value="match">Sort: Best Match</option>
  <option value="deadline">Sort: Deadline (soonest)</option>
  <option value="amount">Sort: Amount (highest)</option>
</select>


<select value={eligibility} onChange={(e) => setEligibility(e.target.value)}>
  <option value="">All Eligibility</option>
  <option value="Elementary">Elementary</option>
  <option value="High School">High School</option>
</select>
</div>
<div className="grant-list">
{MOCK_GRANTS.filter((grant) => {
  const matchesQuery = grant.name.toLowerCase().includes(query.toLowerCase())
  const matchesSubject = subject === '' || grant.subject === subject
  const matchesEligibility = eligibility === '' || grant.eligibility === eligibility
  const matchesAmount = maxAmount === '' || grant.amountMin <= Number(maxAmount)
  return matchesQuery && matchesSubject && matchesEligibility && matchesAmount
}).sort((a, b) => {
  if (sortBy === 'match' && profile) {
    return calculateMatch(b, profile) - calculateMatch(a, profile)
  }
  if (sortBy === 'deadline') {
    return a.deadline.localeCompare(b.deadline)
  }
  return b.amountMax - a.amountMax
}).map((grant) => (
<div key={grant.id} className="grant-card">
      <h2>{grant.name}</h2>
      <p className="match-badge">{calculateMatch(grant, profile)}% Match</p>
      <p>{grant.funder}</p>
      <p>${grant.amountMin} - ${grant.amountMax}</p>
      <p>Deadline: {grant.deadline}</p>
    </div>
  ))}
</div>
</>
)}
    </div>
  )
}

export default GrantFinder