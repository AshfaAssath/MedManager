package com.example.demo.repository;

import com.example.demo.models.OrderRecord;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderRecordRepository extends JpaRepository<OrderRecord,Integer> {
}
