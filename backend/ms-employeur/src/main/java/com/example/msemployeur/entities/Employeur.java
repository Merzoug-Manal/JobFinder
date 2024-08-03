package com.example.msemployeur.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "employeur")
public class Employeur {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idEmployeur")
    private Long idEmployeur;
    private String nom;
    private String prenom;
    @Column(unique = true)
    private String email;
    private String functionEntreprise;
    private String entreprise;

    private String phone;
    private String wilaya;

    private String adresse;
    private String numeroCommerial;
    @OneToMany(mappedBy = "employeur", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<OffreEmploi> offres;




}
