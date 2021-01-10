package com.example.demo.service;

import com.example.demo.entityInterface.DrugIssuingBean;
import com.example.demo.models.DrugIssuing;
import com.example.demo.repository.DrugIssuingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DrugIssuingService {


    @Autowired
    private DrugIssuingRepository drugIssuingRepository;
    public  void save(DrugIssuing drugIssuing){

        drugIssuingRepository.save(drugIssuing);
    }

    public List<DrugIssuing> findAll(){
        return drugIssuingRepository.findAll();
    }

    public DrugIssuing find_by_id(Integer id){
        return drugIssuingRepository.findById(id).orElse(new DrugIssuing());
    }

    public void delete(Integer id){
        DrugIssuing drugIssuing=drugIssuingRepository.findById(id).orElse(new DrugIssuing());
        drugIssuingRepository.delete(drugIssuing);
    }
//
//    //search drugissuing for pres table
//    public List<DrugIssuing> frindByPid(Integer id){
//        return drugIssuingRepository.findByPid(id);
//    }

    public  List<DrugIssuingBean> findByPresId(Integer id){
        return  drugIssuingRepository.findByPresId(id);
    }
//
//
//
//    //generating dailyreport
////        public List<DailyReportBean> getDailyReport(Date date){
//        return drugIssuingRepository.getDailyReport(date);
//
//         }
//
//         public List<Integer> getDailyReportQty(Date date){
//            return drugIssuingRepository.getDailyReportQty(date);
//         }



//       public String exportReportDaily(String reportFormat,Date date) throws FileNotFoundException, JRException {
//       String path= "C:\\Users\\dot 123\\Desktop\\Report"; //C:\Users\dot 123\Desktop\Poornima
//            List<DailyReportBean> stock=drugIssuingRepository.getDailyReport(date);
//              File file= ResourceUtils.getFile("classpath:Daily.jrxml");
//              JasperReport jasperReport= JasperCompileManager.compileReport(file.getAbsolutePath());
//              JRBeanCollectionDataSource dataSource=new JRBeanCollectionDataSource(stock);
//              Map<String,Object> parameters=new HashMap<>();
//              parameters.put("CreatedBy", "Java Techie");
//              JasperPrint jasperPrint= JasperFillManager.fillReport(jasperReport,parameters,dataSource);
//
//        if (reportFormat.equalsIgnoreCase("html")){
//           JasperExportManager.exportReportToHtmlFile(jasperPrint, path+"\\Daily.html");
//          }if (reportFormat.equalsIgnoreCase("pdf")){
//           JasperExportManager.exportReportToPdfFile(jasperPrint, path+"\\Daily.pdf");
//      }
//       return "report generated in path :"+path;
//    }

}
