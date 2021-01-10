package com.example.demo.repository;

import com.example.demo.models.Appointment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.sql.Date;
import java.util.List;
//import java.util.Optional;

@Repository
public interface AppointmentRepository extends JpaRepository<Appointment,Integer> {


    List<Appointment> findAllByDate(Date date);

    @Query(value="SELECT DISTINCT date FROM Appointment", nativeQuery = true)
    List<Date> findDistinctBy();

    @Query( "From Appointment a WHERE a.date=:date")
    List<Appointment> findByDate(@Param("date") Date date );


}
