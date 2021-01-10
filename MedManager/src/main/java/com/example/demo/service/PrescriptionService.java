package com.example.demo.service;

import com.example.demo.models.Prescription;
import com.example.demo.repository.PrescriptionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.util.List;

@Service
public class PrescriptionService {

    @Autowired
    private PrescriptionRepository prescriptionRepository;

    public void save(Prescription prescription) {

        prescriptionRepository.save(prescription);
    }

    public List<Prescription> findAll() {
        return prescriptionRepository.findAll();

    }
    public Prescription find_by_id(Integer id) {
        return prescriptionRepository.findById(id).orElse(new Prescription());
    }

    public void delete(Integer id){
        Prescription prescription=prescriptionRepository.findById(id).orElse(new Prescription());
        prescriptionRepository.delete(prescription);
    }

    public List< Prescription> findByText(String searchText) {
        return prescriptionRepository.findByText(searchText);

    }

    public List< Prescription> findByDate(Date date1, Date date2) {
        return prescriptionRepository.findByDate(date1,date2);

    }

    public Integer count(Date date){

        return  prescriptionRepository.count(date);
    }

//   public List<Prescription> findByfaculty(String faculty){
//        return prescriptionRepository.findByfaculty(faculty);
//   }

    //search faculty
    public List<Prescription> findByfaculty(String faculty,Date date1,Date date2){
        return prescriptionRepository.findByfaculty(faculty,date1,date2);
    }

    //search  Academic year
    public List<Prescription> findByAYear(String academicYear,Date date1,Date date2){
        return prescriptionRepository.findByAYear(academicYear,date1,date2);
    }

    //search faculty and academic year
    public List<Prescription> findByAYearFaculty(String faculty,String academicYear,Date date1,Date date2){
        return prescriptionRepository.findByAYearFaculty(faculty,academicYear,date1,date2);
    }


    //update PresStatus
    public void updatestatus(Integer id){
        //prescriptionRepository.updatestatus(id);
        Prescription pres=prescriptionRepository.findById(id).orElse(new Prescription());
        pres.setPresStatus(true);
        prescriptionRepository.save(pres);

    }


    //search pres StatusTrue
    public  List<Prescription> findPresStatus(){
        return prescriptionRepository.findPresStatus();
    }
    //search pres StatusFalse
    public  List<Prescription> findPresStatusFalse(){
        return prescriptionRepository.findPresStatusFalse();
    }

}
