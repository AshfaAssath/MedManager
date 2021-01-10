package com.example.demo.repository;

import com.example.demo.entityInterface.StockReportBean;
import com.example.demo.entityInterface.StockUpdateBean;
import com.example.demo.entityInterface.SumQtyBean;
import com.example.demo.models.Drug;
import com.example.demo.models.DrugReport;
import com.example.demo.models.Stock;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;

@Repository
public interface StockRepository extends JpaRepository<Stock,Integer> {

    //get drug name from stock
    @Query(value = "select d.* from stock s LEFT JOIN drug d on s.drug_code=d.drug_code group by s.drug_code having sum(s.quantity)>0",nativeQuery = true)
    List<Drug> getDrugList();

    //searching
    @Query(" From Stock s WHERE s.DrugCode=:searchText  OR s.quantity=:searchText")
    List<Stock> findByText(@Param("searchText") String searchText);

    @Query(value= "SELECT  s.quantity FROM Stock s WHERE  s.id=:id",nativeQuery = true)
    Integer findByQun(@Param("id") Integer id);



    @Query(value="SELECT DISTINCT category FROM Stock", nativeQuery = true)
    List<String> findDistinctBy();


    //to get warning
//    @Query(value= "select * from stock s  group by s.drug_Code having (sum(s.quantity)-s.low_Quntity)<0",nativeQuery = true)
//    List<Stock> findlowQun();


//    to get warning low qty
    @Query(value="select * from stock s  LEFT JOIN  drug d on s.drug_code=d.drug_code group by s.drug_code having (sum(s.quantity)-d.low_quantity)<0",nativeQuery = true)
    List<Stock> findlowQun();

//    //to get testing warning low qty
//    @Query(value="select d.drug_name from stock s  LEFT JOIN  drug d on s.drug_code=d.drug_code group by s.drug_Code having (sum(s.quantity)-d.low_quantity)<0",nativeQuery = true)
//    List<String> findlowQunS();


    //to get warning Exdate
    @Query("From Stock s WHERE s.expiryDate=:date")
    List<Stock> findExDate(@Param("date") Date date);



    //get latest expiry  date and qty for update stock
    @Query(value = "select min(s.expiry_date) as minEx, s.quantity as minQty,s.id as ID from stock s where s.drug_Code=:drugcode and s.quantity >0 group by s.drug_Code",nativeQuery = true)
    StockUpdateBean findMinExAndQty(@Param(value = "drugcode") String drugcode);

    //update stock
    @Modifying
    @Transactional
    @Query(value = "UPDATE stock s SET s.quantity=(s.quantity-:qun) WHERE s.drug_Code=:drugcode AND s.expiry_date= :date",nativeQuery = true)
    void updateStock(@Param(value = "drugcode") String drugcode, @Param(value = "qun") Integer qun,@Param(value= "date") String date);


    //generating report for drug order list
//    @Query(value = "select x.drug_code,x.order_quantity,x.drug_name from (select distinct s.low_quntity,s.drug_code,s.drug_name,s.order_quantity " +
//            "from stock s) as x join (select  sum(s.quantity) as totalQty,s.drug_code from stock s  group by s.drug_code) as y " +
//            "on x.drug_code=y.drug_code where y.totalQty<=x.low_quntity",nativeQuery = true)
//    List<StockReportBean>  getStockReport();

    //generating report for drug order list
    @Query(value = "select x.drug_code,x.order_quantity,x.drug_name from (select distinct d.low_quantity,s.drug_code,d.drug_name,d.order_quantity from stock s  LEFT JOIN  drug d on s.drug_code=d.drug_code) as x join (select  sum(s.quantity) as totalQty,s.drug_code from stock s  group by s.drug_code) as y on x.drug_code=y.drug_code where y.totalQty<=x.low_quantity",nativeQuery = true)
    List<StockReportBean>  getStockReport();


    //to add exisisting med
    @Query(value="select * from stock s where s.drug_code=:drugcode LIMIT 1",nativeQuery = true)
    Stock findByDrugCode(@Param(value = "drugcode") String drugcode);


    //to get sum qty for drug Issuing
    @Query(value="select sum(s.quantity) as SumQty, s.drug_code as drugCode  from stock s group by  s.drug_code ",nativeQuery = true)
    List<SumQtyBean> findSumQty();

    @Query(value="select drug_code,drug_name,order_quantity from order_record where drug_report_id=:id",nativeQuery = true)
    List<StockReportBean> findReportDetails(@Param("id") Integer id);

    @Query(value="select d.* from drug_report d where d.id=:id",nativeQuery = true)
    DrugReport findDrugReport(@Param("id") Integer id);
}
