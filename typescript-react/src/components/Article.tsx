import { useEffect, useState, useCallback } from 'react'
import { useParams } from 'react-router-dom'
import { Card, Spinner } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

interface Article {
  id: number
  title: string
  summary: string
  image_url: string
  url: string
}

const Articles: React.FC = () => {
  const { myId } = useParams<{ myId: string }>()
  const [article, setArticle] = useState<Article | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  const fetchArticleDetail = useCallback(() => {
    if (!myId) return;

    fetch(`https://api.spaceflightnewsapi.net/v4/articles/${myId}`)
      .then((response) => {
        if (response.ok) {
          return response.json()
        } else {
          throw new Error('Errore nel recupero del singolo articolo')
        }
      })
      .then((data) => {
        setArticle(data)
      })
      .catch((err) => {
        console.error(err)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [myId]) 

  useEffect(() => {
    fetchArticleDetail()
  }, [fetchArticleDetail])

  return (
    <div  style={{ backgroundColor: 'dark', color: 'white', minHeight: '100vh' }}>
      {isLoading ? (
        <Spinner animation="border" style={{ color: 'white' }} />
      ) : article ? (
        <Card className=" mx-auto mt-5" style={{ width: '50%', backgroundColor: 'white'}}>
          <Card.Img
            variant="top"
            src={article.image_url}
            style={{ objectFit: 'cover', height: '500px', width: '100%' }}
          />
          <Card.Body className="d-flex flex-column align-items-center justify-content-center">
            <Card.Title className="text-primary fs-3">{article.title}</Card.Title>
            <Card.Text>{article.summary}</Card.Text>
            <a href={article.url} target="_blank" rel="noopener noreferrer" style={{ color: 'primary' }}>
              Leggi l'articolo originale
            </a>
          </Card.Body>
        </Card>
      ) : (
        <p>Articolo non trovato.</p>
      )}
    </div>
  )
}

export default Articles
