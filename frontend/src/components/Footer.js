import { Container, Row, Col } from 'react-bootstrap'

const Footer = () => {
  return (
    <footer>
      <Container>
        <Row>
          <Col className='text-center py-3'>
            זץ אחזקות בע"מ &copy; כל הזכויות שמורות
          </Col>
        </Row>
      </Container>
    </footer>
  )
}

export default Footer
