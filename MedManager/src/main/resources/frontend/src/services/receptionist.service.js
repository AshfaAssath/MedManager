import axios from 'axios';
import authHeader from './auth-header';

const API_URL="http://localhost:8080/api/test/receptionist/";

//appointments

class ReceptionistService{

 getReceptionistBoard =() =>{
    return axios.get(API_URL+ "receptionist" ,{headers:authHeader() })
};

// get all appointments
getAppointments(){
    return axios.get(API_URL+"appoint/", {headers:authHeader() });
}

//get appointments by date
getAppointmentsByDate(date){
    return axios.get(API_URL+"appointment/"+date, {headers:authHeader() });
}


createAppointment(appointment){
    return axios.post(API_URL+"appoint/",appointment,{headers:authHeader()} );
}

getAppointmentById(appointmentId){
    return axios.get(API_URL +"appoint/"+appointmentId, {headers:authHeader()} );
}

updateAppointment(appointment,appointmentId){
    return axios.put(API_URL+"appoint/"+appointmentId,appointment,{headers:authHeader() });
}

deleteAppointment(appointmentId){
    return axios.delete(API_URL+"appoint/"+appointmentId ,{headers:authHeader() });
}


//students
getStudentById(id){
    return axios.get(API_URL+"student/"+id,{headers:authHeader()});
}
//sms
createSms(sms){
    return axios.post(API_URL+"sms/",sms);
}

getAvailableSlots(){
    return axios.get(API_URL+"timeSlots/", {headers:authHeader() });
}

//get time slots by time allocated

getAvailableSlotsByAllocatedTime(allocatedTime){
    return axios.get(API_URL+"timeSlots/"+allocatedTime,{headers:authHeader() })
}

updateTimeSlotAvailability(timeSlotObject,allocatedTime){
    return axios.put(API_URL+"timeSlots/"+allocatedTime,timeSlotObject, {headers:authHeader()})
}

//update tempDetails

getTempDetailsById(tempId)
{
    return axios.get(API_URL+"temp/"+tempId,{headers:authHeader() })
}

updateTempDetails(tempDetailsId,tempDetails)
{
    return axios.put(API_URL+"temp/"+tempDetailsId,tempDetails,{headers:authHeader() });
}

}


export default new ReceptionistService();