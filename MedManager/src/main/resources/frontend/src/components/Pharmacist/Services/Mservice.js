import axios from 'axios';

const MED_API_BASE_URL="http://localhost:8080/stock/viewAll";

class Mservice{

    getMedicine(){
      
        return axios.get(MED_API_BASE_URL);
    }
 
   
}

export  default new Mservice();