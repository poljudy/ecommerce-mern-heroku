import { Container, Row, Col } from 'react-bootstrap'

const Footer = () => {
  return (
    <footer>
      <Container>
        <Row>
          <Col className='text-center py-3 hide-sm'>
            זץ אחזקות בע"מ 😜 כל הזכויות שמורות
          </Col>
        </Row>
      </Container>
    </footer>
  )
}

export default Footer
