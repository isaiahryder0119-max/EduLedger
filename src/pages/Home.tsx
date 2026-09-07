import { Link } from 'react-router-dom'

function Home() {
  return (
    <div className="home">
      <img src="/eduledger-logo.png" alt="EduLedger logo" className="logo" />
      <p className="tagline">Find funding. Understand school spending.</p>

      <div className="button-group">
        <Link to="/grants" className="pill-button">Grant Finder</Link>
        <Link to="/transparency" className="pill-button">Transparency</Link>
      </div>
    </div>
  )
}

export default Home