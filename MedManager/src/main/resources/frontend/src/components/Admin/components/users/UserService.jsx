import axios from 'axios';

const REST_API_URL = "http://localhost:8080/api/v1/User"

class UserService{

    UserService(){

    }

    getUsers(){
        return axios.get(REST_API_URL);
    }

    createUser(user){
        return axios.post(REST_API_URL, user)
    }

    getUserById(userId){
        return axios.get(REST_API_URL + '/' + userId);
    }

    updateUser(user, userId){
        return axios.put(REST_API_URL + '/' + userId, user);
    }

    deleteUser(userId){
        return axios.delete(REST_API_URL + '/' +userId)
    }
}

export default new UserService;