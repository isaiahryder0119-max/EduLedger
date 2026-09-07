import { useParams, Link } from 'react-router-dom'
import { MOCK_GRANTS, calculateMatch } from '../grants'
import type { UserProfile } from '../grants'

function GrantDetails() {
  const { id } = useParams()

  const grant = MOCK_GRANTS.find((g) => g.id === id)

  const saved = localStorage.getItem('eduledger-profile')
  const profile: UserProfile | null = saved ? JSON.parse(saved) : null

  if (!grant) {
    return (
      <div>
        <h1>Grant Not Found</h1>
        <Link to="/grants">Back to Grant Finder</Link>
      </div>
    )
  }

  const matchPercent = profile ? calculateMatch(grant, profile) : null

  return (
    <div>
      <h1>{grant.name}</h1>
      <p>{grant.funder}</p>
      {matchPercent !== null && <p>{matchPercent}% Match</p>}
      <p>${grant.amountMin} - ${grant.amountMax}</p>
      <p>Deadline: {grant.deadline}</p>
      <p>{grant.description}</p>
      <a href={grant.applicationLink} target="_blank" rel="noopener noreferrer">
        Apply Now
      </a>
      <br />
      <Link to="/grants">Back to Grant Finder</Link>
    </div>
  )
}

export default GrantDetails