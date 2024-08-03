package com.example.msdemandeur.repos;

import com.example.msdemandeur.entities.Education;
import com.example.msdemandeur.entities.Experience;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ExperienceRepository extends JpaRepository<Experience,Long> {
    @Query("SELECT e FROM Experience e WHERE e.demandeur.idDemandeur = :id")
    public List<Experience> findExperienceDemandeur(Long id);

    //List<Experience> findExperienceDemandeur(Long idDemandeur);
}
