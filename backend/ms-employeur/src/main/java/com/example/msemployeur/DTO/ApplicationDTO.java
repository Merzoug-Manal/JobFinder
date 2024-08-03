package com.example.msemployeur.DTO;

import com.example.msemployeur.entities.Status;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;


@Data
@AllArgsConstructor
@NoArgsConstructor
public class ApplicationDTO {
    private Long idApplication;
    private Long idOffreEmploi;

    private Status etat;
    private LocalDateTime dateCreation;

    private DemandeurDTO demandeur;

    private List<DiplomeDTO> diplomes;








}
