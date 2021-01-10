package com.example.demo.entityInterface;

import org.springframework.beans.factory.annotation.Value;

public interface DrugIssuingBean {

    @Value("#{target.id}")
    Integer getId() ;

    @Value("#{target.description}")
    String getDescription();


    @Value("#{target.dosage}")
    String getDosage() ;

    @Value("#{target.drug_name}")
    String getDrugName();

    @Value("#{target.drug_id}")
    String getDrugId() ;

    @Value("#{target.quantity}")
    Integer getQuantity();

    @Value("#{target.sumQty}")
    Integer getSumQty();

}
