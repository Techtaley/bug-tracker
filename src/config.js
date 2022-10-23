import axios from 'axios'

export const axiosInstance = axios.create({
    baseURL: "https://bugs-api-default-rtdb.firebaseio.com/bugs.json"          //only use /api in heroku
})