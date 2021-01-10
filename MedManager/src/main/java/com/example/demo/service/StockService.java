package com.example.demo.service;

import com.example.demo.entityInterface.StockReportBean;
import com.example.demo.entityInterface.StockUpdateBean;
import com.example.demo.entityInterface.SumQtyBean;
import com.example.demo.models.DrugReport;
import com.example.demo.models.OrderRecord;
import com.example.demo.models.Stock;
import com.example.demo.repository.DrugReportRepository;
import com.example.demo.repository.OrderRecordRepository;
import com.example.demo.repository.StockRepository;
import net.sf.jasperreports.engine.*;
import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource;
import net.sf.jasperreports.engine.export.JRPdfExporter;
import net.sf.jasperreports.export.SimpleExporterInput;
import net.sf.jasperreports.export.SimpleOutputStreamExporterOutput;
import net.sf.jasperreports.export.SimplePdfExporterConfiguration;
import net.sf.jasperreports.export.SimplePdfReportConfiguration;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Service;
import org.springframework.util.ResourceUtils;

import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.OutputStream;
import java.util.Date;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class StockService {

    @Autowired
    private StockRepository stockRepository;

    @Autowired
    private DrugReportRepository drugReportRepository;

    @Autowired
    private OrderRecordRepository orderRecordRepository;

    public void save(Stock stock) {

        stockRepository.save(stock);
    }

    public void saveEx(String drugcode, Stock stock) {

        Stock stock1 = stockRepository.findByDrugCode(drugcode);
        stockRepository.save(stock);
    }

    public List<Stock> findAll() {

        return stockRepository.findAll();
    }

    public void delete(Integer id) {
        Stock stock = stockRepository.findById(id).orElse(new Stock());
        stockRepository.delete(stock);
    }

    public Stock find_by_id(Integer id) {

        return stockRepository.findById(id).orElse(new Stock());
    }

    public void update(Integer id, Stock stock) {
        //return stock_itemRepository.findById(id).orElse(new Stock_item());

        Stock stock1 = stockRepository.findById(id).orElse(new Stock());
        stock1.setQuantity(stock.getQuantity());
        stock1.setEntryDate(stock.getEntryDate());
        stock1.setExpiryDate(stock.getExpiryDate());
        stock1.setDrugCode(stock.getDrugCode());


        stockRepository.save(stock);

    }


    public List<Stock> findByText(String searchText) {    //searching
        return stockRepository.findByText(searchText);
    }

    //to find low quntity for warning low quntity
    public List<Stock> findlowQun() {
        return stockRepository.findlowQun();
    }

//    //to find low quntity for warning low quntity
//    public List<String> findlowQunS() {
//        return stockRepository.findlowQunS();
//    }

    //to find low quntity for warning Exdate
    public List<Stock> findExDate(Date date) {
        return stockRepository.findExDate(date);
    }


    public List<String> findDistinctBy() {

        return stockRepository.findDistinctBy();
    }

//    public List<Stock> findLessQun(Integer value){
//        return stockRepository.findLessQun(value);
//    }




    //update stock
    public void updateStock(String drugcode, Integer qun) {

        Integer updatedQty = qun;

        while (updatedQty > 0) {
            StockUpdateBean stockUpdateBean = stockRepository.findMinExAndQty(drugcode);

            if (stockUpdateBean == null) {
                Stock stock1 = stockRepository.findById(stockUpdateBean.getId()).orElse(new Stock());
                stockRepository.delete(stock1);
                break;


            }

            String pattern = "yyyy-MM-dd HH:mm:ss";
            DateFormat df = new SimpleDateFormat(pattern);
            String dateString = df.format(stockUpdateBean.getMinExDate());


            if (updatedQty <= stockUpdateBean.getMinQty()) {
                stockRepository.updateStock(drugcode, updatedQty, dateString);
            } else {
                stockRepository.updateStock(drugcode, stockUpdateBean.getMinQty(), dateString);
            }
            updatedQty = updatedQty - stockUpdateBean.getMinQty();
        }

    }


//        String pattern = "MM/dd/yyyy HH:mm:ss";

// Create an instance of SimpleDateFormat used for formatting
// the string representation of date according to the chosen pattern
//        DateFormat df = new SimpleDateFormat(pattern);

// Using DateFormat format method we can create a string
// representation of a date with the defined format.
//        String dateString = df.format(date);


//    }

    public Integer findByQun(Integer id) {
        Integer x = stockRepository.findByQun(id);
        return (400 - x);

    }


    //export report
    //export report
    public String exportReport(String reportFormat) throws FileNotFoundException, JRException {

        String path = "E:\\Test-youtubeApp-fullstack\\Test6\\Poornima-Project-Report";
        List<StockReportBean> stock = stockRepository.getStockReport();

        DrugReport drugReportBean=new DrugReport();
//        OrderRecord orderRecordBean=new OrderRecord();

        Date currentUtilDate= new Date();
//        java.sql.Date currentUtilDate = new Date();


        drugReportBean.setDate(currentUtilDate);
        drugReportBean.setId(6);
        drugReportRepository.save(drugReportBean);

//        Integer ID=stockRepository.findLastId();

        for(StockReportBean stock1:stock) {
            String code=stock1.getDrugCode();
            Integer qty=stock1.getOrderQuantity();
            String name=stock1.getDrugName();

            OrderRecord orderRecord = new OrderRecord();
//                orderRecord .setDate(currentUtilDate);
//            orderRecord .setDrugCode(stock1.getDrugCode());
//            orderRecord .setDrugName(stock1.getDrugName());
//            orderRecord .setOrderquantity(stock1.getOrderQuantity());
//            orderRecord.setDrugReport(drugReportBean);
            orderRecord .setDrugCode(code);
            orderRecord .setDrugName(name);
            orderRecord .setOrderQuantity(qty);
            orderRecord.setDrugReport(drugReportBean);

            orderRecordRepository.save(orderRecord);


            //orderRecordRepository.InsertValuesOrderRecords(1,qty,code,name,1)
//          drugOrderListRepository.save(orderRecord);
//          orderRecordRepository.save(drugOrderList);


        }

        File file = ResourceUtils.getFile("classpath:Stocks.jrxml");

        JasperReport jasperReport = JasperCompileManager.compileReport(file.getAbsolutePath());
        JRBeanCollectionDataSource dataSource = new JRBeanCollectionDataSource(stock);
        Map<String, Object> parameters = new HashMap<>();
        parameters.put("Pharmacy", "Stock");
        JasperPrint jasperPrint = JasperFillManager.fillReport(jasperReport, parameters, dataSource);

        if (reportFormat.equalsIgnoreCase("html")) {


            JasperExportManager.exportReportToHtmlFile(jasperPrint, path + "\\stock.html");
//            JasperViewer.viewReport(jasperPrint);

        }
        if (reportFormat.equalsIgnoreCase("pdf")) {
            JasperExportManager.exportReportToPdfFile(jasperPrint, path + "\\stock.pdf");
            //JasperViewer.viewReport(jasperPrint);
//            try {
//                response.setContentType("application/x-pdf");
//                response.setHeader("Content-disposition", "inline; filename=testReport.pdf");
//                final OutputStream outStream = response.getOutputStream();
//                JasperExportManager.exportReportToPdfStream(jasperPrint, outStream);
//
//            }catch(Exception ex){
//                ex.printStackTrace();
//            }
        }

        return "report generated in path :" + path;

    }


    //generating drug ordderlist
    public List<StockReportBean> generateStockReport() {

        return stockRepository.getStockReport();
    }

    //find by drug code
    public Stock findByDrugCode(String drugcode) {
        return stockRepository.findByDrugCode(drugcode);

    }

    //find sumQty for drugIssuing
    public  List<SumQtyBean>  findSumQty( ){
        return stockRepository.findSumQty();
    }



    public List<OrderRecord> findAllOrderRecord() {
        return orderRecordRepository.findAll();
    }

    public List<DrugReport> findAllDrugReport() {
        return drugReportRepository.findAll();
    }

   public List<StockReportBean> findReportDetails(Integer id){
        return stockRepository.findReportDetails(id);
    }

    public DrugReport  findDrugReport(Integer id)
    {
        return stockRepository.findDrugReport(id);
    }
}
