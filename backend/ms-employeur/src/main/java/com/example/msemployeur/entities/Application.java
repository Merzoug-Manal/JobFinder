package com.example.msemployeur.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "application")
public class Application {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idApplication")
    private Long idApplication;
    private String nom;
    private String prenom;
    private String email;
    private String adresse;
    private Status etat;
    private String phone;
    private LocalDateTime dateCreation;
    @ElementCollection(fetch = FetchType.EAGER)
    private List<Skill> skills;
    @ElementCollection(fetch = FetchType.EAGER)
    private List<Language> langues;
    @ElementCollection(fetch = FetchType.EAGER)
    private List<String> ExperiencPost;
    @ElementCollection(fetch = FetchType.EAGER)
    private List<String> ExperienceDescription;

    @ElementCollection(fetch = FetchType.EAGER)
    private List<String> EducationEcole;

    private String PhotoStoragePath;
    @ElementCollection(fetch = FetchType.EAGER)
    private List<String> DiplomeStoragePath;

    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "idOffre", nullable = false)
    @JsonIgnore
    private OffreEmploi offreEmploi;






}


