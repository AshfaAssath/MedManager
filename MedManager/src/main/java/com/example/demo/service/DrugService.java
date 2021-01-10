package com.example.demo.service;

import com.example.demo.models.Drug;
import com.example.demo.repository.DrugRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DrugService {

    @Autowired
    private DrugRepository drugRepository;

    public void save(Drug drug) {

        drugRepository.save(drug);
    }

    public List<Drug> findAll() {

        return drugRepository.findAll();
    }

    public void delete(String id) {
        Drug drug = drugRepository.findById(id).orElse(new Drug());
        drugRepository.delete(drug);
    }

    public Drug find_by_id(String id) {

        return drugRepository.findById(id).orElse(new Drug());
    }

    public void update(String id, Drug drug) {
        //return stock_itemRepository.findById(id).orElse(new Stock_item());

        Drug drug1 = drugRepository.findById(id).orElse(new Drug());
        drug1.setLowQuantity(drug.getLowQuantity());
        drug1.setOrderQuantity(drug.getOrderQuantity());
        drug1.setCategory(drug.getCategory());
        drug1.setDrugName(drug.getDrugName());
        drug1.setDrugCode(drug.getDrugCode());
        drugRepository.save(drug);

    }

    public List<String> findDrugCode(){
        return drugRepository.findDrugCode();
    }


}
