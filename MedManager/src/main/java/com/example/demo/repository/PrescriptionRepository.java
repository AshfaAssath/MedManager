package com.example.demo.repository;


import com.example.demo.models.Prescription;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.sql.Date;
import java.util.List;

@Repository
public interface PrescriptionRepository extends JpaRepository<Prescription,Integer> {

    List<Prescription> findAllByStudentId(String studentId);

    @Query(" From Prescription p WHERE p.diagnosis=:searchText")
    List<Prescription> findByText(@Param("searchText") String searchText);


    @Query(value = "SELECT count(id) FROM Prescription where issuedDate = :date")
    Integer count(@Param("date") Date date);

    //searching
    @Query(" From Prescription p Where p.issuedDate BETWEEN  :date1  AND :date2 ")
    List<Prescription> findByDate(@Param("date1") Date date1, @Param("date2") Date date2);

    @Query(value="SELECT p.* FROM prescription p join student s on p.student_id = s.id where  (p.issued_date BETWEEN :date1 AND :date2) AND s.faculty=:faculty ",nativeQuery = true)
    List<Prescription> findByfaculty(@Param("faculty") String faculty ,@Param("date1") Date date1, @Param("date2") Date date2 );

    @Query(value="SELECT p.* FROM prescription p join student s on p.student_id = s.id where  (p.issued_date BETWEEN :date1 AND :date2) AND s.acedemic_year=:academicYear ",nativeQuery = true)
    List<Prescription> findByAYear(@Param("academicYear") String academicYear ,@Param("date1") Date date1, @Param("date2") Date date2 );


    @Query(value="SELECT p.* FROM prescription p join student s on p.student_id = s.id where  (p.issued_date BETWEEN :date1 AND :date2) AND s.acedemic_year=:academicYear AND s.faculty=:faculty",nativeQuery = true)
    List<Prescription> findByAYearFaculty(@Param("faculty") String faculty ,@Param("academicYear") String academicYear ,@Param("date1") Date date1, @Param("date2") Date date2 );


    //search pres status
    @Query(value="select p.* from prescription p where pres_status=true",nativeQuery = true)
    List<Prescription> findPresStatus();

    @Query(value="select p.* from prescription p where pres_status=false",nativeQuery = true)
    List<Prescription> findPresStatusFalse();

    //update pres Status
    @Query(value="UPDATE prescription p set  p.pres_status=true where p.id=:id",nativeQuery = true)
    void updatestatus(@Param("id") Integer id);

}
