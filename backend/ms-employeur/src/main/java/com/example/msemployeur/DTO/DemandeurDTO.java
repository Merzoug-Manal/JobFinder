package com.example.msemployeur.DTO;


import com.example.msemployeur.entities.Language;
import com.example.msemployeur.entities.Skill;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

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

    private String phone;
    private Date dateNaissance;
    private String placeNaissance;
    private String adresse;
    private List<Skill> skills;
    private List<Language> langues;

    private List<EducationDTO> educations;
    private List<ExperienceDTO> experiences;
    private String PathPhotoId;



}
