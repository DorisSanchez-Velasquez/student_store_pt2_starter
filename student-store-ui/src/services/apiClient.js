import axios from "axios"

class ApiClient{
    constructor(remoteHostUrl)
    {
        this.remoteHostUrl = remoteHostUrl;
        this.token = null;
    }

    setToken(token)
    {
        this.token = token
    }

    async request({endpoint, method = 'GET', data = {}})
    {
        const url = `${this.remoteHostUrl}/${endpoint}`
        const headers = {
            "Content-Type": "application/json"
        }

        if(this.token)
        {
            headers["Authorization"] = `Bearer ${this.token}`
        }

        try{
            const res = await axios({url, method, data, headers})
            return {data: res.data, error: null}

        }catch(error)
        {
            console.log(error)
            const message = error?.response?.data?.error?.message
            return {data: null, error: message || String(error)}
        }
    }

    async createOrder(order)
    {
        return await this.request({endpoint: "orders", method: 'POST', data: order})
    }

    async loginUser(credentials)
    {
        return await this.request({endpoint: 'auth/login', method: 'POST', data: credentials})
    }

    async registerUser(credentials)
    {
        return await this.request({endpoint: 'auth/register', method: 'POST', data: credentials})
    }
}

export default new ApiClient(process.env.REACT_APP_REMOTE_HOST_URL || "https://localhost:3001")