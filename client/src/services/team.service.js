import axios from 'axios'

class TeamService {

    constructor() {
        this.app = axios.create({
            baseURL: `${process.env.REACT_APP_BASE_URL}/team`,
            withCredentials: true
        })
    }

    getTeamCreate = () => this.app.get('/create')
    postTeamCreate = (name, picture, players, capacity, owner) => this.app.post('/create', { name, picture, players, capacity, owner})
    getTeamList = () => this.app.get('/list')
    getTeamDetails = id => this.app.get(`/details/${id}`)
    teamEdit = (id, team) => this.app.put(`/details/${id}`, {team})
    getTeamDelete = id => this.app.delete(`/details/${id}`)
    joinTeam = (id, userId) => this.app.put(`/details/${id}/join`, { userId })


}

export default TeamService