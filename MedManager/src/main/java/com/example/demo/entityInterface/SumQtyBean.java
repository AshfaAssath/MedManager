package com.example.demo.entityInterface;

import org.springframework.beans.factory.annotation.Value;

public interface SumQtyBean {

    @Value("#{target.SumQty}")
    Integer getSumQty();


    @Value("#{target.drugCode }")
    String getDrugCode() ;
}
