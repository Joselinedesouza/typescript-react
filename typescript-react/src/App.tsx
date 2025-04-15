
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './components/home'
import FetchArticle from './components/Spaceflight'
import Articles from './components/Article'


const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/fetch" element={<FetchArticle />} />
        <Route path="/article/:myId" element={<Articles />} />
      </Routes>
    </Router>
  )
}

export default App
