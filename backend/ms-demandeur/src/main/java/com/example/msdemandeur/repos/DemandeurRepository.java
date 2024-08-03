package com.example.msdemandeur.repos;

import com.example.msdemandeur.entities.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.YearMonth;
import java.util.List;
import java.util.Optional;

public interface DemandeurRepository extends JpaRepository<Demandeur,Long> {


    //le nombre de demandeurs
    @Query("SELECT COUNT(d) FROM Demandeur d")
    Long getNombreDemandeurs();


    //le nombre de demande pour chaqque demandeur
    @Query("SELECT d.idDemandeur, COUNT(dm) FROM Demandeur d LEFT JOIN d.demandeEmplois dm GROUP BY d.idDemandeur")
    List<Object[]> getNombreDemandesParDemandeur();
    //nombre de demandeur selon skills
    @Query("SELECT COUNT(d) FROM Demandeur d WHERE :skill MEMBER OF d.skills")
    int getNombreDemandeursParCompetence(@Param("skill") Skill skill);


    //nombre de demandeurs selon une langue donnee
    @Query("SELECT COUNT(d) FROM Demandeur d WHERE :language MEMBER OF d.langues")
    int getNombreDemandeursParLangue(@Param("language") Language language);
    //le nombre de demandeur par sexe
    @Query("SELECT COUNT(d) FROM Demandeur d WHERE d.genre = :sexe")
    int getNombreDemandeursParSexe(@Param("sexe") Sexe sexe);

    //le nombre de demandeur par age
    @Query("SELECT YEAR(CURRENT_DATE) - YEAR(d.dateNaissance) FROM Demandeur d")
    List<Integer> findAllAges();



    @Query("SELECT COUNT(e) FROM Demandeur e WHERE e.adresse = :wilaya")
    int getNombreDemandeursParWilaya(@Param("wilaya") String wilaya);




    Optional <Demandeur> findByEmail(String email);


}
