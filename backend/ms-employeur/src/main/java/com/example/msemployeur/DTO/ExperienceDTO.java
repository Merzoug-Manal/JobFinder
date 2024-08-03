package com.example.msemployeur.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ExperienceDTO {
    private Long idExperience;
    private String poste;
    private String description;
    private Date dateDebut;
    private Date dateFin;
}
