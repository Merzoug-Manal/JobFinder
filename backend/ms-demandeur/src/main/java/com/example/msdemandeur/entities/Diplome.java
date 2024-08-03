package com.example.msdemandeur.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Diplome {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idDiplome")
    private Long idDiplome;
    private String storagePath;


    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "idDemande")
    @JsonBackReference
    private DemandeEmploi demandeEmploi;

}
