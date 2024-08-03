package com.example.msdemandeur.entities;



import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

import java.util.Date;
import java.util.List;
import java.util.Objects;
import java.util.Set;


@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "demandeur")
public class Demandeur {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idDemandeur")
    private Long idDemandeur;
    private String nom;
    private String prenom;
    @Enumerated
    private Sexe genre;

    @Column(unique = true)
    private String email;

    private String phone;
    private Date dateNaissance;
    private String placeNaissance;
    private String adresse;
    private String bio;
    @Column(length = 255)
    private String PathPhotoId;
    @ElementCollection(fetch = FetchType.LAZY)
    private List<Skill> skills;

    @ElementCollection(fetch = FetchType.LAZY)
    private List<Language> langues;

    @OneToMany(mappedBy = "demandeur",
            cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonManagedReference
    private Set<Education> educations;

    @OneToMany(mappedBy = "demandeur", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JsonManagedReference
    private Set<Experience> experiences;

    @OneToMany(mappedBy = "demandeur", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<DemandeEmploi> demandeEmplois;

    //  @OneToOne(mappedBy = "demandeur", cascade = CascadeType.ALL)
//    @JsonIgnore
    //   private CV cv;  @ElementCollection


    @Override
    public int hashCode() {
        return Objects.hash(idDemandeur);
    }

}