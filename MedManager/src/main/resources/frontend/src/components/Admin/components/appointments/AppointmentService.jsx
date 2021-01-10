import axios from 'axios';

const REST_API_URL = "http://localhost:8080/api/v1/Appointment"

class AppointmentService{

    AppointmentService(){

    }

    getAppointments(){
        return axios.get(REST_API_URL);
    }

    createAppointment(appointment){
        return axios.post(REST_API_URL, appointment)
    }

    getAppointmentById(appointmentId){
        return axios.get(REST_API_URL + '/' + appointmentId);
    }

    updateAppointment(appointment, appointmentId){
        return axios.put(REST_API_URL + '/' + appointmentId, appointment);
    }

    deleteAppointment(appointmentId){
        return axios.delete(REST_API_URL + '/' +appointmentId)
    }
}

export default new AppointmentService;
