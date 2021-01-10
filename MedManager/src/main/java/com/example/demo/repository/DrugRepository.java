package com.example.demo.repository;

import com.example.demo.models.Drug;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DrugRepository extends JpaRepository<Drug,String> {

    @Query(value="select d.drug_code from drug d",nativeQuery = true)
    List<String> findDrugCode();

}
