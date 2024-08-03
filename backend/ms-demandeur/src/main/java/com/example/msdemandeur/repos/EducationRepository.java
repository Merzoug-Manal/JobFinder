package com.example.msdemandeur.repos;

import com.example.msdemandeur.entities.Education;
import com.example.msdemandeur.entities.Experience;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface EducationRepository extends JpaRepository<Education,Long> {
    //@Query("SELECT e FROM Education e WHERE e.demandeur.idDemandeur=:idDemandeur")
    //public List<Education> findEducationsDemandeur(Long idDemandeur);
    @Query("SELECT e FROM Education e WHERE e.demandeur.idDemandeur = :id")
    public List<Education> findEducationsDemandeur(Long id);

}
