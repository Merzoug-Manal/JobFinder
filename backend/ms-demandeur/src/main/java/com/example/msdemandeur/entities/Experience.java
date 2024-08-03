package com.example.msdemandeur.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Date;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "experience")
public class Experience {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idExperience")
    private Long idExperience;
    private String poste;
    @Column(name = "description", length = 500)
    private String description;
    private Date dateDebut;
    private Date dateFin;

    @JsonBackReference
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "idDemandeur")
    private Demandeur demandeur;

   // @JsonIgnore
    //@ManyToOne(fetch = FetchType.LAZY, optional = false)
   // @JoinColumn(name = "idCV", nullable = false)
  //  private CV cv;




}
