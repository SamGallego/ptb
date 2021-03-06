import { Col, Card, Button } from "react-bootstrap"
import { Link } from 'react-router-dom'

const TeamCard = ({ name, picture, players, capacity, _id }) => {
    return (
        <>
            <Col md={4} style={{ marginBottom: '30px' }}>
                <Card className='center'>
                    <Card.Img variant="top" src={picture} />
                    <Card.Body>
                        <Card.Title>{name}</Card.Title>
                        <hr></hr>
                        <h4>Players:</h4>
                        {players.map(elm => <Card.Text>{elm.name}</Card.Text>)}
                        <hr></hr>
                        <Card.Text>Capacity: {players.length}/{capacity}</Card.Text>
                        <Link to={`/team/details/${_id}`}>
                            <Button variant="dark" block >Team Details</Button>
                        </Link>
                    </Card.Body>
                </Card>
            </Col>


        </>
    )
}
export default TeamCard