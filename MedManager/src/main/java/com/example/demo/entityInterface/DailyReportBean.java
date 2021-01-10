package com.example.demo.entityInterface;

import org.springframework.beans.factory.annotation.Value;

public interface DailyReportBean {

    @Value("#{target.StockId}")
    Integer getStockId();


    @Value("#{target.totalQty}")
    Integer getTotalQuantity();


//    @Value("#{target.order_quantity}")
//    Integer getOrderQuantity() ;

}
