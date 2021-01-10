package com.example.demo.entityInterface;

import org.springframework.beans.factory.annotation.Value;

public interface StockReportBean {


    @Value("#{target.drug_code}")
    String getDrugCode();


    @Value("#{target.drug_name}")
    String getDrugName() ;


    @Value("#{target.order_quantity}")
    Integer getOrderQuantity() ;

//    @Value("#{@mapperUtility.buildOrderDTO(target.orderNumber, target.totalAmount)}")
//    StockBean getStockDetails();


}
