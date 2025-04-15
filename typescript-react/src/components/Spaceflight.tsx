import { useEffect, useState } from 'react'
import { Card, Spinner, Container, Button, Row, Col } from 'react-bootstrap'
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
    <Container className="text-center py-4" style={{ minHeight: '100vh' }}>
      <h2 className="my-4 text-primary fw-semibold">Spaceflight News</h2>

      {isLoading ? (
        <Spinner animation="border" />
      ) : (
        <Row className="justify-content-center">
          {articles.slice(0, 10).map((article) => (
            <Col key={article.id} xs={12} sm={6} md={3} lg={3} className="mb-4">
              <Card className="shadow">
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
                  <Button variant="primary" onClick={() => window.open(article.url, '_blank')}>
                    Leggi su Spaceflight News
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  )
}

export default FetchArticle
