package com.example.msemployeur.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "offreEmploi")
public class OffreEmploi {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idOffre")
    private Long idOffre;
    private String lieuTravail;
    private Date dateExpiration;
    private Date dateCreation;
    private  String secteurActivite;
    private Integer nombrePostes;
    private  String typeContrat;
    private  String poste;
    private  String niveauEtude;
    private String minExperience;
    private String taches;

    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "idEmployeur", nullable = false)
    private Employeur employeur;

    @OneToMany(mappedBy = "offreEmploi", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Application> applications;


}
