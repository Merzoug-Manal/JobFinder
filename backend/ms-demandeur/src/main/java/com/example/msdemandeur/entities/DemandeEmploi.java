package com.example.msdemandeur.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.Set;

@Entity
@Data @NoArgsConstructor @AllArgsConstructor
@Table(name = "DemandeEmploi")
public class DemandeEmploi {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idDemande")
    private Long idDemande;


   @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "idDemandeur", nullable = false)
    private Demandeur demandeur;

    private Long idOffreEmploi;
    @Enumerated(EnumType.STRING)
    private Status etat;

    @Column(name = "date_creation")
    private LocalDateTime dateCreation;

    @OneToMany(mappedBy = "demandeEmploi", fetch = FetchType.EAGER,  cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private Set<Diplome> diplomes;

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((idDemande == null) ? 0 : idDemande.hashCode());
        return result;
    }





}
