package com.example.demo.service;

import com.example.demo.models.Appointment;
import com.example.demo.repository.AppointmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.util.List;

@Service
public class AppointmentService {

    @Autowired
    private AppointmentRepository appointmentRepository;

    public void save(Appointment appointment){

        appointmentRepository.save(appointment);
    }

    public List<Appointment> findAll(){
        return appointmentRepository.findAll();

    }

    public List<Date> findDistinctBy(){

        return  appointmentRepository.findDistinctBy();
    }

    public List<Appointment> findByDate(Date date) {
        return appointmentRepository.findByDate(date);


    }

    // public List<Appointment> findApp(){

    //return  appointmentRepository.findApp();
    // }

    // public List<Appointment> findByDate(Date date) {
//        return appointmentRepository.findByDate(date);
//
//    }
}
