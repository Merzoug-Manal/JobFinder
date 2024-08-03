package com.example.msdemandeur.services;


import com.example.msdemandeur.entities.Demandeur;
import com.example.msdemandeur.entities.Experience;
import com.example.msdemandeur.exceptions.ExceptionHandler;
import com.example.msdemandeur.exceptions.ResponseHandler;
import com.example.msdemandeur.repos.DemandeurRepository;
import com.example.msdemandeur.repos.ExperienceRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@Slf4j
public class ExperienceService {
    @Autowired
    ExperienceRepository experienceRepository;
    @Autowired
    DemandeurRepository demandeurRepository;

    public ResponseEntity<Object> createExperience(Experience body, Long idDemandeur){
        try{
            Optional<Demandeur> optionalDemandeur = demandeurRepository.findById(idDemandeur);
            if (optionalDemandeur.isEmpty()) {
                return ExceptionHandler.itemNotFoundException("JobSeaker not found with ID:" + idDemandeur);
            }
            Demandeur demandeur = optionalDemandeur.get();

            Experience experience=new Experience();
            experience.setDemandeur(demandeur);
            experience.setPoste(body.getPoste());
            experience.setDescription(body.getDescription());
            experience.setDateDebut(body.getDateDebut());
            experience.setDateFin(body.getDateFin());


            Experience savedExperience = experienceRepository.save(experience);
            return ResponseHandler.generateResponse("Experience created successfully", savedExperience);

        }
        catch (Exception e) {
            System.out.println(e);
            return ExceptionHandler.badRequestException();
        }

    }

    public ResponseEntity<Object> getExperienceByIdDemandeur(Long idDemandeur){
        try{
            List<Experience> experienceList=experienceRepository.findExperienceDemandeur(idDemandeur);
            return ResponseHandler.generateResponse("All experiences by JobSeaker", experienceList);

        }
         catch (Exception e) {
            System.out.println(e);
            return ExceptionHandler.badRequestException();
        }

    }

    public ResponseEntity<Object> updateExperience(Experience body, Long idExperience){
         try{
            Optional<Experience> optionalExperience = experienceRepository.findById(idExperience);
            if (optionalExperience.isEmpty()) {
                return ExceptionHandler.itemNotFoundException("Exeprience not found with ID:" + idExperience);
            }
            Experience experience = optionalExperience.get();

            if(body.getPoste()!=null){
                experience.setPoste(body.getPoste());
            }
            if(body.getDescription()!=null){
                experience.setDescription(body.getDescription());
            }
            if(body.getDateDebut()!=null){
                experience.setDateDebut(body.getDateDebut());
            }
            if(body.getDateFin()!=null){
                experience.setDateFin(body.getDateFin());
            }

            Experience savedExperience = experienceRepository.save(experience);
             return ResponseHandler.generateResponse("Experience updated successfully", savedExperience);

         }
        catch (Exception e) {
            System.out.println(e);
            return ExceptionHandler.badRequestException();
        }


    }

    public ResponseEntity<Object> deleteExperience(Long idExperience){
        try {
            Optional<Experience> optionalExperience = experienceRepository.findById(idExperience);
            if (optionalExperience.isEmpty()) {
                return ExceptionHandler.itemNotFoundException("Exeprience not found with ID:" + idExperience);
            }
            Experience experience = optionalExperience.get();
            experienceRepository.delete(experience);
            return ResponseHandler.generateResponse("Experience deleted successfully", null);

        }
        catch (Exception e) {
            System.out.println(e);
            return ExceptionHandler.badRequestException();
        }
    }
}
