
import { Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'

const Home: React.FC = () => {
  const navigate = useNavigate()

  const handleNavigate = () => {
    navigate('/fetch') 
  }

  return (
    <div className="d-flex flex-column align-items-center justify-content-center vh-100 bg-dark">
      <h1 className="text-primary fs-1">  SpaceLibrary</h1>
      <p className="text-primary fs-4">Esplora le ultime notizie dal mondo dello spazio!</p>
      <Button variant="primary" onClick={handleNavigate}>
        Vai agli articoli
      </Button>
    </div>
  )
}

export default Home
