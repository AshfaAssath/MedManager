package com.example.demo.controllers;

import com.example.demo.models.Appointment;
import com.example.demo.service.AppointmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.sql.Date;
import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/test/phi")
public class PhiController {

    @Autowired
    private AppointmentService appointmentService;


    @PostMapping("/appo/save")
    @PreAuthorize("hasRole('PHI')")
    public void save(@RequestBody Appointment appointment){

        appointmentService.save(appointment);
    }

    @GetMapping("/appo/viewAll")
    @PreAuthorize("hasRole('PHI')")
    public List<Appointment> viewAll(){
        return  appointmentService.findAll();
    }

    @GetMapping("/appo/dis")
    @PreAuthorize("hasRole('PHI')")
    public List<Date> findDistinctBy(){

        return appointmentService.findDistinctBy();
    }

    @GetMapping("/appo/save/{date}")
    @PreAuthorize("hasRole('PHI')")
    public List<Appointment> findByDate(@PathVariable(value= "date") Date date){
        return appointmentService.findByDate(date);
    }

    // @GetMapping("/appo/disapp")
    // public List<Appointment> findApp(){

    //return appointmentService.findApp();
    //}

}
