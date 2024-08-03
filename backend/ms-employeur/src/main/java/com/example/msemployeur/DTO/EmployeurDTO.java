package com.example.msemployeur.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class EmployeurDTO {
    private Long idEmployeur;
    private String nom;
    private String prenom;
    private String email;

    private String phone;
    private String wilaya;

    private String adresse;
    private String numeroCommerial;
    private String functionEntreprise;
    private String entreprise;

}
