import './App.css'
import { Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import GrantFinder from './pages/GrantFinder'
import Transparency from './pages/Transparency'
import GrantDetails from './pages/GrantDetails'

function App() {
  return (
    <div>
<nav className="main-nav">
  <Link to="/">Home</Link>
  <Link to="/grants">Grant Finder</Link>
  <Link to="/transparency">Transparency</Link>
</nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/grants" element={<GrantFinder />} />
        <Route path="/grants/:id" element={<GrantDetails />} />
        <Route path="/transparency" element={<Transparency />} />
      </Routes>
    </div>
  )
}

export default App