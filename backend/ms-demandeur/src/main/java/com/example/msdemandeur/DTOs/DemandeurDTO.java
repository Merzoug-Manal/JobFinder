package com.example.msdemandeur.DTOs;

import com.example.msdemandeur.entities.Language;
import com.example.msdemandeur.entities.Sexe;
import com.example.msdemandeur.entities.Skill;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Enumerated;
import java.util.Date;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DemandeurDTO {
    private Long idDemandeur;
    private String nom;
    private String prenom;
    private String email;
    @Enumerated
    private Sexe genre;
    private String phone;
    private Date dateNaissance;
    private String placeNaissance;
    private String adresse;
    private String bio;
    private String PathPhotoId;
    private List<Skill> skills;
    private List<Language> langues;



}
