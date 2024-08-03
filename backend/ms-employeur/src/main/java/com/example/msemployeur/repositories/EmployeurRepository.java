package com.example.msemployeur.repositories;

import com.example.msemployeur.entities.Employeur;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

import java.util.Optional;

public interface EmployeurRepository extends JpaRepository<Employeur, Long> {


    Optional <Employeur> findByEmail(String email);

    //nombre des employeurs
    @Query("SELECT COUNT(e) FROM Employeur e")
    int getNombreTotalEmployeurs();


    //nombre des employeurs par wilaya
    @Query("SELECT COUNT(e) FROM Employeur e WHERE e.wilaya = :wilaya")
    int getNombreEmployeursParWilaya(@Param("wilaya") String wilaya);


    @Query("SELECT COUNT(e) FROM Employeur e WHERE e.functionEntreprise = :functionEntreprise")
    int getNombreEmployeursParFunctionEntreprise(@Param("functionEntreprise") String functionEntreprise);

}
