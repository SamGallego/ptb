import axios from 'axios'

class MatchService {

    constructor() {
        this.app = axios.create({
            baseURL: 'http://localhost:5000/api/match',
            withCredentials: true
        })
    }

    getMatchCreate = () => this.app.get('/create')
    postMatchCreate = (name, lat, lng, date, description, owner) => this.app.post('/create', { name, lat, lng, date, description, owner} )
    getMatchList = () => this.app.get('/list')
    getMatchDetails = id => this.app.get(`/details/${id}`)
    getMatchEdit = id => this.app.post(`/edit/${id}`)
    getMatchDelete = id => this.app.post(`/delete/${id}`)

}

export default MatchService