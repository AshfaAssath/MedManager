package com.example.demo.repository;

import com.example.demo.entityInterface.DrugIssuingBean;
import com.example.demo.models.DrugIssuing;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DrugIssuingRepository extends JpaRepository<DrugIssuing,Integer> {

    //search drugissuing for pres table
    @Query(value="select d.id,d.description,d.dosage,d.quantity,d.drug_id,sum(y.quantity) as sumQty,y.drug_name from drug_issuing d   LEFT JOIN (select g.drug_name,s.drug_code,s.quantity from stock s LEFT JOIN drug g on g.drug_code=s.drug_code) as y on d.drug_id=y.drug_code where d.prescription_id=:id  group by y.drug_code ",nativeQuery = true)
    List<DrugIssuingBean> findByPresId(@Param("id") Integer id);



}
