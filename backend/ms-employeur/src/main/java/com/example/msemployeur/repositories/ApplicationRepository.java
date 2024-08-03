package com.example.msemployeur.repositories;

import com.example.msemployeur.entities.Application;
import com.example.msemployeur.entities.OffreEmploi;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ApplicationRepository extends JpaRepository<Application, Long> {


    @Query("SELECT a from Application a WHERE a.offreEmploi.idOffre=:id ")
    public List<Application> findByIdOffre (Long id);

}
