package com.example.demo.repository;

import com.example.demo.models.Medicals;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface MedicalRepository extends JpaRepository<Medicals,String> {

    List<Medicals> findAllByStudentId(String studentId);

//    List<Medicals> findAllByFacultyAndAcedemicYearAndStudentId(String faculty,Integer acedemicYear,String studentId);
}
