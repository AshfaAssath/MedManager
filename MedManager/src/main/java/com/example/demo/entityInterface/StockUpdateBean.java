package com.example.demo.entityInterface;

import org.springframework.beans.factory.annotation.Value;

import java.sql.Date;

public interface StockUpdateBean {

    @Value("#{target.minEx}")
    Date getMinExDate();


    @Value("#{target.minQty}")
    Integer getMinQty() ;

    @Value("#{target.ID}")
    Integer getId() ;

}
