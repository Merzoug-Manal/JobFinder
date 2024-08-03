package com.example.msdemandeur.services;

import com.example.msdemandeur.DTOs.DemandeurDTO;
import com.example.msdemandeur.entities.Demandeur;

import com.example.msdemandeur.entities.Language;
import com.example.msdemandeur.entities.Skill;

import com.example.msdemandeur.exceptions.ExceptionHandler;
import com.example.msdemandeur.exceptions.ResponseHandler;
import com.example.msdemandeur.repos.DemandeurRepository;
import lombok.extern.slf4j.Slf4j;
import org.hibernate.Hibernate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.xml.sax.ErrorHandler;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;


@Service
@Slf4j
public class DemandeurService {
    private static final String UPLOAD_DIR = "uploads";
    @Autowired
    DemandeurRepository demandeurRepository;

    // creation demandeur
    public ResponseEntity<Object> createJobSeeker(DemandeurDTO body){
        try {

            Demandeur demandeur = new Demandeur();
            demandeur.setIdDemandeur(body.getIdDemandeur());
            demandeur.setNom(body.getNom());
            demandeur.setPrenom(body.getPrenom());
            demandeur.setAdresse(body.getAdresse());
            demandeur.setEmail(body.getEmail());
            demandeur.setGenre(body.getGenre());
            demandeur.setDateNaissance(body.getDateNaissance());
            demandeur.setPlaceNaissance(body.getPlaceNaissance());
            demandeur.setPhone(body.getPhone());
            log.info(body.getEmail());

            //save it
            Demandeur savedDemandeur = demandeurRepository.save(demandeur);
            return ResponseHandler.generateResponse("JobSeaker created successfully", savedDemandeur);
            //return ResponseEntity.status(HttpStatus.CREATED).body(savedDemandeur);

        } catch (Exception e) {
            System.out.println(e);
            return ExceptionHandler.badRequestException();
            //return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }


    //update profil/cv demandeur simple datas (infos) about him
    @Transactional()
    public ResponseEntity<Object> updateDemandeur(DemandeurDTO body,
                                                  Long IdDemandeur
                                                  ) {
        try{
            Optional<Demandeur> optionalDemandeur = demandeurRepository.findById(IdDemandeur);
            if (optionalDemandeur.isEmpty()) {
                return ExceptionHandler.itemNotFoundException("JobSeaker not found with ID:" + IdDemandeur);
            }
            Demandeur demandeur = optionalDemandeur.get();

            if(body.getNom()!=null){
                demandeur.setNom(body.getNom());
            }
            if(body.getPrenom()!=null){
                demandeur.setPrenom(body.getPrenom());
            }
            if(body.getAdresse()!=null){
                demandeur.setAdresse(body.getAdresse());
            }
            if(body.getGenre()!=null){
                demandeur.setGenre(body.getGenre());
            }
            if(body.getDateNaissance()!=null){
                demandeur.setDateNaissance(body.getDateNaissance());
            }
            if(body.getPlaceNaissance()!=null){
                demandeur.setPlaceNaissance(body.getPlaceNaissance());
            }
            if(body.getPhone()!=null){
                demandeur.setPhone(body.getPhone());
            }
            if(body.getBio()!=null){
                demandeur.setBio(body.getBio());
            }
            Hibernate.initialize(demandeur.getSkills());
            if(body.getSkills()!=null){
                List<Skill> currentSkills = demandeur.getSkills();
                currentSkills.addAll(body.getSkills());
                demandeur.setSkills(currentSkills);

            }
            Hibernate.initialize(demandeur.getLangues());
            if(body.getLangues()!=null){
                List<Language> currentLangues = demandeur.getLangues();
                currentLangues.addAll(body.getLangues());
                demandeur.setLangues(currentLangues);
            }
            demandeur.getEducations().size();
            Demandeur savedDemandeur = demandeurRepository.save(demandeur);
            return ResponseHandler.generateResponse("JobSeaker updated successfully", savedDemandeur);

        }
        catch (Exception e) {
            System.out.println(e);
            return ExceptionHandler.badRequestException();
        }

    }
@Transactional
    public ResponseEntity<Object> getDemandeur(Long IdDemandeur){
        try
        {
            Optional<Demandeur> optionalDemandeur = demandeurRepository.findById(IdDemandeur);
            if (optionalDemandeur.isEmpty()) {
                return ExceptionHandler.itemNotFoundException("JobSeaker not found with ID:" + IdDemandeur);
            }
            Demandeur demandeur = optionalDemandeur.get();
            Hibernate.initialize(demandeur.getSkills());
            Hibernate.initialize(demandeur.getLangues());
            demandeur.getSkills().size();
            demandeur.getLangues().size();
            demandeur.getExperiences().size();
            demandeur.getEducations().size();
            return ResponseHandler.generateResponse("JobSeaker:", demandeur);


        }
        catch (Exception e) {
            System.out.println(e);
            return ExceptionHandler.badRequestException();
        }


    }

    @Transactional
    public ResponseEntity<Object> getDemandeurByEmail(String email){
        try
        {
            Optional<Demandeur> optionalDemandeur = demandeurRepository.findByEmail(email);
            if (optionalDemandeur.isEmpty()) {
                return ExceptionHandler.itemNotFoundException("JobSeaker not found with email:" + email);
            }
            Demandeur demandeur = optionalDemandeur.get();
            Hibernate.initialize(demandeur.getSkills());
            Hibernate.initialize(demandeur.getLangues());
            demandeur.getSkills().size();
            demandeur.getLangues().size();
            demandeur.getExperiences().size();
            demandeur.getEducations().size();

            return ResponseHandler.generateResponse("JobSeaker:", demandeur);


        }
        catch (Exception e) {
            System.out.println(e);
            return ExceptionHandler.badRequestException();
        }
    }

    public ResponseEntity<Object> DeleteDemandeur(String email){
        try
        {
            Optional<Demandeur> optionalDemandeur = demandeurRepository.findByEmail(email);
            log.info(optionalDemandeur.get().getNom());
            if (optionalDemandeur==null) {
                return ExceptionHandler.itemNotFoundException("JobSeaker not found with email:" + email);
            }
            Demandeur demandeur = optionalDemandeur.get();
            demandeurRepository.delete(demandeur);

            return ResponseHandler.generateResponse("JobSeaker deleted successfully", null);


        }
        catch (Exception e) {
            System.out.println(e);
            return ExceptionHandler.badRequestException();
        }
    }


}
