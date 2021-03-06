import { Component } from 'react'
import MatchService from './../../../services/match.service'
import { Container, Row, Col, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import PlayerCard from './PlayerCardDetails'
import './MatchDetails.css'

class MatchDetails extends Component {

    constructor() {
        super()
        this.state = {
            match: undefined,
            date: undefined,
            canJoin: false
        }
        this.matchService = new MatchService()

    }


    loadMatchDetails = () => {
        this.matchService
            .getMatchDetails(this.props.match.params.id)
            .then(response => {
                this.setState({
                    match: response.data.match,
                    date: new Date(response.data.match.date),
                    canJoin: this.canJoin(response.data.match)
                })
            })
            .catch(err => console.log(err))
    }

    canJoin = (match) => {
        return !(match.playersA.some(player => player._id == this.props.loggedUser._id) || match.playersB.some(player => player._id == this.props.loggedUser._id))
    }

    deleteMatch = () => {
        this.matchService
            .getMatchDelete(this.props.match.params.id)
            .then(() => this.props.history.push('/match/list'))
            .catch(err => console.log(err))
    }

    joinTeamA = () => {

        this.matchService
            .joinTeamA(this.props.match.params.id, this.props.loggedUser._id)
            .then(response => {
                this.setState({
                    match: {
                        ...this.state.match,
                        playersA: [...this.state.match.playersA, this.props.loggedUser]
                    },
                    canJoin: false
                })
            })
            .catch(err => console.log(err))
    }

    joinTeamB = () => {

        this.matchService
            .joinTeamB(this.props.match.params.id, this.props.loggedUser._id)
            .then(response => {
                this.setState({
                    match: {
                        ...this.state.match,
                        playersB: [...this.state.match.playersB, this.props.loggedUser],
                    },
                    canJoin: false
                })
            })
            .catch(err => console.log(err))
    }

    componentDidMount = () => {
        this.loadMatchDetails()
    }

    render() {

        return (

            (<>
                <Container>

                    {!this.state.match
                        ?
                        <h3>Cargando</h3>
                        :
                        <Row className="justify-content-around">
                            <Col md={3} className='col'>
                                <h1 className='margin-botton'>{this.state.match.name}</h1>
                                <p>Date: {this.state.date.getDate()}-{this.state.date.getMonth() + 1}-{this.state.date.getFullYear()}</p>
                                <p>Hour: {this.state.date.getHours()}:{this.state.date.getMinutes()}</p>
                                <p>Capacity: {this.state.match.capacity}</p>
                                <p>City: {this.state.match.location.city}</p>
                                <p>Address: {this.state.match.location.address}</p>
                                <p>Description: {this.state.match.description}</p>
                            <Link to={`/match/details/editmatch/${this.props.match.params.id}`}>
                                <Button variant="success" block >Edit</Button>
                            </Link>

                                <Button onClick={() => this.deleteMatch()} className='button' variant="danger" type="submit">Delete</Button>
                            </Col>

                            <Col md={4} className='col'>
                                <h2>Local</h2>
                                {this.state.canJoin && (
                                    <Button className='button' onClick={() => this.joinTeamA()}>Join Local</Button>
                                )}
                                {this.state.match.playersA.map(elm => <PlayerCard {...elm} />)}
                                {/* <p>Team A Goals:{this.state.match.score.teamA}</p> */}
                            </Col>
                            <Col md={4} className='col'>
                                <h2>Guest</h2>
                                {this.state.canJoin && (
                                    <Button className='button' onClick={() => this.joinTeamB()}>Join Guest</Button>
                                )}
                                {this.state.match.playersB.map(elm => <PlayerCard {...elm} />)}
                                {/* <p>Team B Goals:{this.state.match.score.teamB}</p> */}
                            </Col>





                        </Row>

                    }

                    <Link to="/match/list" className="btn btn-dark block">Back to List</Link>

                </Container>

            </>
            )
        )
    }
}

export default MatchDetails