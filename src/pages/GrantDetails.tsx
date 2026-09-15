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
    <div className="page">
      <h1 className="grant-finder-heading">{grant.name}</h1>
      <p className="grant-finder-subtitle">{grant.funder}</p>

      <div className="grant-detail-card">
{matchPercent !== null && (
  <p className="match-badge">
    {matchPercent}% Match
  </p>
)}
        <p className="detail-amount">${grant.amountMin} - ${grant.amountMax}</p>
        <p className="detail-deadline">Deadline: {grant.deadline}</p>
        <p className="detail-description">{grant.description}</p>

    <a
          href={grant.applicationLink}
          target="_blank"
          rel="noopener noreferrer"
          className="pill-button"
        >
          Apply Now
        </a>
      </div>

      <Link to="/grants" className="view-details-link">
        Back to Grant Finder
      </Link>
    </div>
  )
}

export default GrantDetails