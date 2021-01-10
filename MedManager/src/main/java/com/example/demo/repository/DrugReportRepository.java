package com.example.demo.repository;

import com.example.demo.models.DrugReport;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DrugReportRepository  extends JpaRepository<DrugReport,Integer> {
}
