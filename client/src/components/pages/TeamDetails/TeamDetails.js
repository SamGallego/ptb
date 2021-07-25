import { Component } from 'react'
import TeamService from './../../../services/team.service'
import { Container, Row, Col, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'



class TeamDetails extends Component {

    constructor() {
        super()
        this.state = {
            team: {}
        }
        this.teamService = new TeamService()
    }


    loadTeamDetails = () => {
        this.teamService
            .getTeamDetails(this.props.match.params.id)
            .then(response => {
                console.log(response.data)
                this.setState(
                    this.state = {
                        team: response.data.team
                    }
                )
            })
            .catch(err => console.log(err))
    }

    componentDidMount = () => {
        this.loadTeamDetails()
    }


    render() {

        return (

            (<>
                <Container>

                    <Row className="justify-content-around">
                        <Col md={3}>
                            <h1>{this.state.team.name}</h1>
                            <Card.Img variant="top" src={this.state.team.picture} />
                            <p>Capacity: {this.state.team.capacity}</p>
                            <p>players: {this.state.team.players}</p>
                        </Col>


                        <Link to="/team/list" className="btn btn-dark">Back to List</Link>


                    </Row>
                </Container>
            </>
            )
        )
    }
}

export default TeamDetails