import axios from 'axios';
import authHeader from './auth-header';

const API_URL="http://localhost:8080/api/test/pharmacist/";

//stock          stock/
//prescriptions  pres/
//drug issuing   drugIsuuing/
//student        student/

class PharmacistService{



getAllstock(){
    return axios.get(API_URL+"stock/viewAll", {headers:authHeader() } );
}


getQuantityLow(){
    return axios.get(API_URL+"stock/low" , {headers:authHeader() } )
}

getExpireDate(){
    return axios.get(API_URL+"stock/ex/2020-11-29", {headers:authHeader() } )
}

saveStock(medicine)
{
  return axios.post(API_URL+"stock/save",medicine,{headers:authHeader() })
}

updateAndSaveStock(id,medicine)
{
    axios.put(API_URL+"stock/save/"+ id,medicine,{headers:authHeader() })
}

// updateStock(drugId,quantity){
//     return axios.put(API_URL+"stock/updateStock/"+drugId+"/"+quantity,{headers:authHeader() })
           
// }

updateStock(drugId,quantity){
    return axios.post(API_URL+"stock/updateStock/"+drugId+"/"+quantity,{headers:authHeader() });
}
getPresByTimeDuration(date1,date2){
    return axios.get(API_URL+"pres/save/"+date1+"/"+date2,{headers:authHeader() });
}

}

export default new PharmacistService();