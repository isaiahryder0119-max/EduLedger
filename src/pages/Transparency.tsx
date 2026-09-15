import { AWARDS, SPENDING } from '../transparency'
import { useState } from 'react'
import { School, DollarSign, Calendar } from 'lucide-react'
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts'

const CHART_COLORS = ['#d4af37', '#4ade80', '#60a5fa', '#f87171', '#c084fc']

function Transparency() {
  const [query, setQuery] = useState('')

  return (
    <div>
            <h1 className="transparency-heading">Transparency Dashboard</h1>
      <p className="transparency-subtitle">See how awarded grants are being used.</p>

      <input
  type="text"
  className="search-input transparency-search"
  placeholder="Search by school or grant name..."
  value={query}
  onChange={(e) => setQuery(e.target.value)}
/>

      <div className="award-list">
        {AWARDS.filter((award) =>
          award.schoolName.toLowerCase().includes(query.toLowerCase()) ||
          award.grantName.toLowerCase().includes(query.toLowerCase())
        ).map((award) => (
          <div key={award.id} className="award-card">
            <h2>{award.grantName}</h2>
            <p className="icon-row"><School size={15} /> Awarded to: {award.schoolName}</p>
            <p className="icon-row"><DollarSign size={15} /> Amount: ${award.amountAwarded}</p>
            <p className="icon-row"><Calendar size={15} /> Date: {award.dateAwarded}</p>

                         <h3>How the money was spent:</h3>
            <p className="chart-hint">Hover over the chart for details</p>

            <div className="spending-chart">
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={SPENDING.filter((item) => item.awardId === award.id)}
                    dataKey="amount"
                    nameKey="category"
                    cx="50%"
                    cy="50%"
                    outerRadius={70}
                  >
                    {SPENDING.filter((item) => item.awardId === award.id).map((_, index) => (
                      <Cell key={index} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                    ))}
                     </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>

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