package com.example.msdemandeur.repos;

import com.example.msdemandeur.entities.Diplome;
import com.example.msdemandeur.entities.Education;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface DiplomeRepository extends JpaRepository<Diplome,Long> {

    //List<Diplome> findDiplomesDemandeur(Long idDemandeur);
    //@Query("SELECT e FROM Diplome e WHERE e.demandeEmploi.idDemande= :demandeId")
   // List<Diplome> findAllByDemandeEmploi_IdDemande(@Param("demandeId") Long demandeId);
    List<Diplome> findAllByDemandeEmploi_IdDemande(Long idDemande);

    @Query("SELECT e FROM Diplome e WHERE e.demandeEmploi.idDemande= :id")
    public List<Diplome> findDiplomesDemandeEmploi(Long id);
}
