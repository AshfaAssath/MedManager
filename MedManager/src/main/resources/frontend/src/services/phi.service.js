import axios from 'axios';
import authHeader from './auth-header';

const API_URL="http://localhost:8080/api/test/phi";

class PhiService{

     getPHIBoard =() =>{
        return axios.get(API_URL+ "phi" ,{headers:authHeader() })
    };
    
}

export default new PhiService();