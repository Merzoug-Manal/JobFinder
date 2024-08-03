package com.example.msdemandeur.services;

import com.example.msdemandeur.entities.Demandeur;
import com.example.msdemandeur.entities.Education;
import com.example.msdemandeur.exceptions.ExceptionHandler;
import com.example.msdemandeur.exceptions.ResponseHandler;
import com.example.msdemandeur.repos.DemandeurRepository;
import com.example.msdemandeur.repos.EducationRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import javax.print.attribute.standard.JobKOctets;
import java.util.List;
import java.util.Optional;

@Service
@Slf4j
public class EducationService {

    @Autowired
    EducationRepository educationRepository;
    @Autowired
    DemandeurRepository demandeurRepository;

    public ResponseEntity<Object> createEducation(Education body, Long idDemandeur) {

        try {
            Optional<Demandeur> optionalDemandeur = demandeurRepository.findById(idDemandeur);
            if (optionalDemandeur.isEmpty()) {
                return ExceptionHandler.itemNotFoundException("JobSeaker not found with ID:" + idDemandeur);
            }
            Demandeur demandeur = optionalDemandeur.get();

            Education education = new Education();
            education.setDemandeur(demandeur);
            education.setEcole(body.getEcole());
            education.setDateDebut(body.getDateDebut());
            education.setDateFin(body.getDateFin());
            log.info("education ", education);
            Education savedEducation = educationRepository.save(education);
            return ResponseHandler.generateResponse("Education created successfully", savedEducation);

        } catch (Exception e) {
            System.out.println(e);
            return ExceptionHandler.badRequestException();
        }
    }

    public ResponseEntity<Object> getEducationByIdDemandeur(Long idDemandeur){
        try{
            List<Education> educationList=educationRepository.findEducationsDemandeur(idDemandeur);
            return ResponseHandler.generateResponse("All education by Job Seaker:", educationList);

        }
        catch (Exception e) {
            System.out.println(e);
            return ExceptionHandler.badRequestException();
        }

    }

    public ResponseEntity<Object> updateEducation(Education body, Long idEducation){
        try{
            Optional<Education> optionalEducation = educationRepository.findById(idEducation);
            if (optionalEducation.isEmpty()) {
                return ExceptionHandler.itemNotFoundException("Education not found with ID:" + idEducation);
            }
            Education education = optionalEducation.get();
            if(body.getEcole()!=null){
            education.setEcole(body.getEcole());
        }
        if(body.getDateDebut()!=null){
            education.setDateDebut(body.getDateDebut());
        }
        if(body.getDateFin()!=null){
            education.setDateFin(body.getDateFin());
        }
        Education savedEducation = educationRepository.save(education);
            return ResponseHandler.generateResponse("Education updated successfully", savedEducation);

        } catch (Exception e) {
            System.out.println(e);
            return ExceptionHandler.badRequestException();
        }

    }

    public ResponseEntity<Object> deleteEducation(Long idEducation){
        try{
            Optional<Education> optionalEducation = educationRepository.findById(idEducation);
            if (optionalEducation.isEmpty()) {
                return ExceptionHandler.itemNotFoundException("Education not found with ID:" + idEducation);
            }
            Education education = optionalEducation.get();
            educationRepository.delete(education);
            return ResponseHandler.generateResponse("Education deleted successfully", null);

        } catch (Exception e) {
            System.out.println(e);
            return ExceptionHandler.badRequestException();
        }
    }
}
