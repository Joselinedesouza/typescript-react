import { useEffect, useState } from 'react'
import { Card, Spinner, Container, Button} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'

interface Article {
  id: number
  title: string
  summary: string
  image_url: string
  url: string
}

const FetchArticle: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)

  const getArticle = () => {
    fetch('https://api.spaceflightnewsapi.net/v4/articles')
      .then((response) => {
        if (response.ok) {
          return response.json()
        } else {
          throw new Error('Errore nel recupero degli articoli')
        }
      })
      .then((data) => {
        setArticles(data.results)
      })
      .catch((err) => {
        console.error(err)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  useEffect(() => {
    getArticle()
  }, [])

  return (
    <Container  className="text-center py-4"    style={{ minHeight: '100vh' }}>
      <h2 className="my-4 text-primary fw-semibold">Spaceflight new..</h2>

      {isLoading ? (
        <Spinner animation="border" />
      ) : (
        articles.slice(0, 5).map((article) => (
          <Card
            key={article.id}
            className="mb-4 mx-auto shadow"
            style={{ width: '300px' }}
          >
            <Card.Img
              variant="top"
              src={article.image_url}
              style={{ objectFit: 'cover', height: '200px', width: '100%' }}
            />
            <Card.Body>
              <Card.Title>
                <Link to={`/article/${article.id}`}>{article.title}</Link>
              </Card.Title>
              <Card.Text>{article.summary}</Card.Text>
              <Button 
              variant="primary" 
              onClick={() => window.open(article.url, '_blank')}
            >
              Leggi su Spaceflight News
            </Button>
            </Card.Body>
          </Card>
        ))
      )}
    </Container>
  )
}

export default FetchArticle
