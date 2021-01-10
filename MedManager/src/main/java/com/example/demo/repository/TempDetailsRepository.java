package com.example.demo.repository;

import com.example.demo.models.TempDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TempDetailsRepository extends JpaRepository<TempDetails,Integer> {
}
