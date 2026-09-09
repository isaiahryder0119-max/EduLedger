import { AWARDS, SPENDING } from '../transparency'

function Transparency() {
  return (
    <div>
      <h1 className="transparency-heading">Transparency Dashboard</h1>
      <p className="transparency-subtitle">See how awarded grants are being used.</p>

      <div className="award-list">
        {AWARDS.map((award) => (
          <div key={award.id} className="award-card">
            <h2>{award.grantName}</h2>
            <p>Awarded to: {award.schoolName}</p>
            <p>Amount: ${award.amountAwarded}</p>
            <p>Date: {award.dateAwarded}</p>

            <h3>How the money was spent:</h3>
            <ul>
              {SPENDING.filter((item) => item.awardId === award.id).map((item, index) => (
                <li key={index}>
                  {item.category}: ${item.amount} — {item.description}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Transparency