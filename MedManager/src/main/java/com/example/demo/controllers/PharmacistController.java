package com.example.demo.controllers;

import com.example.demo.entityInterface.DrugIssuingBean;
import com.example.demo.entityInterface.StockReportBean;
import com.example.demo.entityInterface.SumQtyBean;
import com.example.demo.models.*;
import com.example.demo.service.DrugIssuingService;
import com.example.demo.service.DrugService;
import com.example.demo.service.PrescriptionService;
import com.example.demo.service.StockService;
import net.sf.jasperreports.engine.JRException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.io.FileNotFoundException;
import java.sql.Date;
import java.util.List;


@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/test/pharmacist")
public class PharmacistController {

    @Autowired
    private DrugService drugService;

    @Autowired
    private DrugIssuingService drugIssuingService;

    @Autowired
    private PrescriptionService prescriptionService;

    @Autowired
    private StockService stockService;


        // drug
    @PostMapping("/drug/save")
    @PreAuthorize("hasRole('PHARMACIST')")
    public void drugSave(@RequestBody Drug drug){

        drugService.save(drug);
    }

    @GetMapping("/drug/viewAll")
    @PreAuthorize("hasRole('PHARMACIST')")
    public List<Drug> viewDrugAll(){

        return drugService.findAll();
    }

    @GetMapping("/drug/{item_id}")
    @PreAuthorize("hasRole('PHARMACIST')")
    public Drug drugFindById(@PathVariable(value= "item_id") String id){

        return  drugService.find_by_id(id);
    }


    @DeleteMapping("/drug/delete/{item_id}")
    @PreAuthorize("hasRole('PHARMACIST')")
    public void drugDelete(@PathVariable(value= "item_id") String id){

        drugService.delete(id);
    }

    @GetMapping("/drug/Drugs")
    @PreAuthorize("hasRole('PHARMACIST')")
    public List<String> findDrugCode(){
        return drugService.findDrugCode();
    }



    //drugIssuing
    @PostMapping("/drugIssue/save")
    @PreAuthorize("hasRole('PHARMACIST')")
    public void drugIssuingSave(@RequestBody DrugIssuing drugIssuing){

        drugIssuingService.save(drugIssuing);
    }

    @GetMapping("/drugIssue/viewAll")
    @PreAuthorize("hasRole('PHARMACIST')")
    public List<DrugIssuing> viewDrugIssuingAll(){

        return drugIssuingService.findAll();
    }


    @GetMapping("/drugIssue/{item_id}")
    @PreAuthorize("hasRole('PHARMACIST')")
    public DrugIssuing drugIssuingFindById(@PathVariable(value= "item_id") Integer id){
        return  drugIssuingService.find_by_id(id);
    }

    @DeleteMapping("/drugIssue/save/{item_id}")
    @PreAuthorize("hasRole('PHARMACIST')")
    public void drugIssuingDelete(@PathVariable(value= "item_id") Integer id){

        drugIssuingService.delete(id);
    }

//    //search drugissuing for pres table
//    @GetMapping("/drugIssue/getD/{id}")
//    public List<DrugIssuing> frindByPid(@PathVariable(value= "id") Integer id){
//        return drugIssuingService.frindByPid(id);
//    }

    @GetMapping("/drugIssue/getDr/{id}")
    @PreAuthorize("hasRole('PHARMACIST')")
    public  List<DrugIssuingBean> findByPresId(@PathVariable(value= "id") Integer id) {
        return drugIssuingService.findByPresId(id);
    }
    //generating daily report
//  @GetMapping("/Dreport/{date}")
//   public List<DailyReportBean> getDailyReport(@PathVariable(value="date") Date date ) throws FileNotFoundException, JRException {
//       return  drugIssuingService.getDailyReport(date);
//   }
//
//    @GetMapping("/getDailyreport/{format}/{date}/")
//    public String exportReportDaily (@PathVariable String format,@PathVariable(value="date") Date date)throws FileNotFoundException, JRException {
//      return drugIssuingService.exportReportDaily(format,date);
//   }
//
//   @GetMapping("/Daily/{date}")
//
//    public List<Integer> getDailyReportQty(@PathVariable(value="date") Date date)
//   {
//       return drugIssuingService.getDailyReportQty(date);
//   }

    //prescriptions

    @PostMapping("/pres/save")
    @PreAuthorize("hasRole('PHARMACIST')")
    public void prescriptionSave(@RequestBody Prescription prescription){

        prescriptionService.save(prescription);
    }

    @GetMapping("/pres/{item_id}")
    @PreAuthorize("hasRole('PHARMACIST')")
    public  Prescription prescriptionFindById(@PathVariable(value= "item_id") Integer id){
        return  prescriptionService.find_by_id(id);
    }

    @GetMapping("/pres/viewAll")
    @PreAuthorize("hasRole('PHARMACIST')")
    public List<Prescription> viewPresAll(){

        return prescriptionService.findAll();
    }

    @DeleteMapping("/pres/save/{item_id}")
    @PreAuthorize("hasRole('PHARMACIST')")
    public void prescriptionDelete(@PathVariable(value= "item_id") Integer id){

        prescriptionService.delete(id);
    }

    @GetMapping("/pres/save/{searchText}")
    @PreAuthorize("hasRole('PHARMACIST')")
    public List<Prescription> findByText(@PathVariable(value= "searchText") String searchText){
        return prescriptionService.findByText(searchText);
    }

    @GetMapping("/pres/save/{date1}/{date2}")
    @PreAuthorize("hasRole('PHARMACIST')")
    public List<Prescription> findPresByDate(@PathVariable(value= "date1") Date date1, @PathVariable(value= "date2") Date date2){
        return prescriptionService.findByDate(date1,date2);
    }

    @GetMapping("/pres/count/{date}")
    @PreAuthorize("hasRole('PHARMACIST')")
    public Integer presCount(@PathVariable(value= "date") Date date){
        return prescriptionService.count(date);
    }


//     @GetMapping("/pres/save/search/{faculty}")
//        public List<Prescription> findByFaculty(@PathVariable(value= "faculty") String faculty){
//            return prescriptionService.findByfaculty(faculty);
//       }

    //searching part
    @GetMapping("/pres/save/search/{faculty}/{date1}/{date2}")
    @PreAuthorize("hasRole('PHARMACIST')")
    public List<Prescription> findPresByFaculty(@PathVariable(value= "faculty") String faculty, @PathVariable(value= "date1") Date date1, @PathVariable(value= "date2") Date date2){
        return prescriptionService.findByfaculty(faculty,date1,date2);
    }

    @GetMapping("/pres/save/searchY/{academicYear}/{date1}/{date2}")
    @PreAuthorize("hasRole('PHARMACIST')")
    public List<Prescription> findPresByAYear(@PathVariable(value= "academicYear") String academicYear, @PathVariable(value= "date1") Date date1, @PathVariable(value= "date2") Date date2){
        return prescriptionService.findByAYear(academicYear,date1,date2);
    }

    @GetMapping("/pres/save/search/{faculty}/{academicYear}/{date1}/{date2}")
    @PreAuthorize("hasRole('PHARMACIST')")
    public List<Prescription> findPresByAYearFaculty(@PathVariable(value= "faculty") String faculty,@PathVariable(value= "academicYear") String academicYear, @PathVariable(value= "date1") Date date1, @PathVariable(value= "date2") Date date2){
        return prescriptionService.findByAYearFaculty(faculty,academicYear,date1,date2);
    }


    //update  presStatus
    @PutMapping("/pres/updateStat/{id}")
    @PreAuthorize("hasRole('PHARMACIST')")
    public  void updatePresStatus(@PathVariable(value="id") Integer id){
        prescriptionService.updatestatus(id);
    }

    //search pres Status
    @GetMapping("/pres/StatusTrue")
    @PreAuthorize("hasRole('PHARMACIST')")
    public List<Prescription> findPresStatus()
    {
        return prescriptionService.findPresStatus();
    }

    //search pres Status
    @GetMapping("/pres/StatusFalse")
    @PreAuthorize("hasRole('PHARMACIST')")
    public List<Prescription> findPresStatusFalse()
    {
        return prescriptionService.findPresStatusFalse();
    }

    //Stock

    @PostMapping("/stock/save")
    @PreAuthorize("hasRole('PHARMACIST')")
    public void stockSave(@RequestBody Stock stock){

        stockService.save(stock);
    }

    @PostMapping("/stock/saveE/{drugcode}")
    @PreAuthorize("hasRole('PHARMACIST')")
    public void stockSaveEx(@PathVariable(value= "drugcode") String drugcode,@RequestBody Stock stock){

        stockService.saveEx(drugcode,stock);
    }


    @GetMapping("/stock/viewAll")
    @PreAuthorize("hasRole('PHARMACIST')")
    public List<Stock> stockViewAll(){

        return stockService.findAll();
    }


    @GetMapping("/stock/dis")
    @PreAuthorize("hasRole('PHARMACIST')")
    public List<String> findStockDistinctBy(){

        return stockService.findDistinctBy();
    }

//    @GetMapping("/stock/less/{value}")
//    public List<Stock> findLessQun(@PathVariable(value= "value") Integer value){
//
//        return stockService.findLessQun(value);
//    }

    //find exdate
    @GetMapping("/stock/ex/{date}")
    @PreAuthorize("hasRole('PHARMACIST')")
    public List<Stock> findStockExDate(@PathVariable(value= "date") Date date){

        return stockService.findExDate(date);
    }

    //find low qutity for warning
    @GetMapping("/stock/low")
    @PreAuthorize("hasRole('PHARMACIST')")
    public List<Stock> findStocklowQun(){
        return stockService.findlowQun();
    }


//    //find low qutity for warning
//    @GetMapping("/stock/low")
//    @PreAuthorize("hasRole('PHARMACIST')")
//    public List<String> findStocklowQun(){
//        return stockService.findlowQunS();
//    }



    @GetMapping("/stock/{item_id}")
    @PreAuthorize("hasRole('PHARMACIST')")
    public Stock findStockById(@PathVariable(value= "item_id") Integer id){

        return  stockService.find_by_id(id);
    }

    @DeleteMapping("/stock/save/{item_id}")
    @PreAuthorize("hasRole('PHARMACIST')")
    public void delete(@PathVariable(value= "item_id") Integer id){

        stockService.delete(id);
    }

    @GetMapping("/stock/save/{searchText}")
    @PreAuthorize("hasRole('PHARMACIST')")
    public List<Stock> finDStockByText(@PathVariable(value= "searchText") String searchText){
        return stockService.findByText(searchText);
    }

    @PutMapping("/stock/save/{item_id}")
    @PreAuthorize("hasRole('PHARMACIST')")
    public void updateStockById(@PathVariable(value= "item_id") Integer id, @RequestBody Stock stock){
        // Stock_item stock_item1=stock_itemService.find_by_id((id);

        stockService.update(id,stock);

    }
    //update stock
    @PostMapping("/stock/updateStock/{drugcode}/{qun}")
    @PreAuthorize("hasRole('PHARMACIST')")
    public void updateStock(@PathVariable(value= "drugcode") String drugcode,@PathVariable(value= "qun") Integer qun){

        stockService.updateStock(drugcode,qun);
    }

    @GetMapping("/stock/qun/{id}")
    @PreAuthorize("hasRole('PHARMACIST')")
    public Integer findStockByQun(@PathVariable(value= "id")Integer id){

        return stockService.findByQun(id);
    }

    //generating stock report
    @GetMapping("/stock/report/{format}")
    @PreAuthorize("hasRole('PHARMACIST')")
    public String generateStockReport(@PathVariable String format) throws FileNotFoundException, JRException {
        return  stockService.exportReport(format);
    }


    //get details for stock report
    @GetMapping("/stock/getstockreport")
    @PreAuthorize("hasRole('PHARMACIST')")
    public List<StockReportBean> getStockDetails(){
        return stockService.generateStockReport();
    }

    //drugCodes for dropdown
    @GetMapping("/stock/drugC/{drugcode}")
    @PreAuthorize("hasRole('PHARMACIST')")
    public Stock findStockByDrugCode(@PathVariable(value= "drugcode") String drugcode){
        return  stockService.findByDrugCode(drugcode);
    }

    @GetMapping("/stock/SumQty")
    @PreAuthorize("hasRole('PHARMACIST')")
    public  List<SumQtyBean>  findStockSumQty(){
        return  stockService.findSumQty();
    }







    @GetMapping("stock/viewAllOrder")
    @PreAuthorize("hasRole('PHARMACIST')")
    public List<OrderRecord> viewAllOrderRecord(){

        return stockService.findAllOrderRecord();
    }

    @GetMapping("stock/viewAllRep")
    @PreAuthorize("hasRole('PHARMACIST')")
    public List<DrugReport> viewAllDrugReport(){

        return stockService.findAllDrugReport();
    }

    @GetMapping("stock/reports/{id}")
   @PreAuthorize("hasRole('PHARMACIST')")
    public List<StockReportBean> findReportDetails(@PathVariable(value= "id")  Integer id){

        return stockService.findReportDetails(id);
    }


    @GetMapping("stock/rep/{id}")
    @PreAuthorize("hasRole('PHARMACIST')")
    public  DrugReport findDrugReport(@PathVariable(value= "id")  Integer id){

        return stockService.findDrugReport(id);
    }


    //


}
