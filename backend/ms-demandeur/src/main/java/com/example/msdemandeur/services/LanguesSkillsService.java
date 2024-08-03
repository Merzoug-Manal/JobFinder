package com.example.msdemandeur.services;

import com.example.msdemandeur.entities.Demandeur;
import com.example.msdemandeur.entities.Language;
import com.example.msdemandeur.entities.Skill;
import com.example.msdemandeur.exceptions.ExceptionHandler;
import com.example.msdemandeur.exceptions.ResponseHandler;
import com.example.msdemandeur.repos.DemandeurRepository;

import lombok.extern.slf4j.Slf4j;
import org.hibernate.Hibernate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.io.IOException;
import java.util.List;
import java.util.Optional;

@Service
@Slf4j
@Transactional
public class LanguesSkillsService {
    @Autowired
    DemandeurRepository demandeurRepository;


    public ResponseEntity<Object> updateJobSeekerLanguesById(Long id, List<Language> langues)  {
        try{
            Optional<Demandeur> optionalDemandeur = demandeurRepository.findById(id);
            if (optionalDemandeur.isEmpty()) {
                return ExceptionHandler.itemNotFoundException("JobSeaker not found with ID:" + id);
            }
            Demandeur demandeur = optionalDemandeur.get();
            List<Language> currentLangues = demandeur.getLangues();
            currentLangues.addAll(langues);
            demandeur.setLangues(currentLangues);
            demandeurRepository.save(demandeur);
            return ResponseHandler.generateResponse("Language added successfully", demandeur.getLangues());

        }
        catch (Exception e) {
            System.out.println(e);
            return ExceptionHandler.badRequestException();
        }

    }
    public ResponseEntity<Object> getLangue(Long idDemandeur){
        try {
            Optional<Demandeur> optionalDemandeur = demandeurRepository.findById(idDemandeur);
            if (optionalDemandeur.isEmpty()) {
                return ExceptionHandler.itemNotFoundException("JobSeaker not found with ID:" + idDemandeur);
            }
            Demandeur demandeur = optionalDemandeur.get();
            demandeur.getLangues().size();
            List<Language> langues=demandeur.getLangues();
            return ResponseHandler.generateResponse("Langues list",langues);

        }
        catch (Exception e) {
            System.out.println(e);
            return ExceptionHandler.badRequestException();
        }
    }

    public ResponseEntity<Object> deleteLangueByName( Long idDemandeur, Language langue){
        try{
            Optional<Demandeur> optionalDemandeur = demandeurRepository.findById(idDemandeur);
            if (optionalDemandeur.isEmpty()) {
                return ExceptionHandler.itemNotFoundException("JobSeaker not found with ID:" + idDemandeur);
            }
            Demandeur demandeur = optionalDemandeur.get();
            List<Language> langues=demandeur.getLangues();
            if (langues.contains(langue)) {
                langues.remove(langue);
                demandeurRepository.save(demandeur);
                return ResponseHandler.generateResponse("Langue deleted successfully",null);

            } else {
                return ExceptionHandler.itemNotFoundException("Langue not found");
            }
        }
        catch (Exception e) {
            System.out.println(e);
            return ExceptionHandler.badRequestException();
        }
    }
    public ResponseEntity<Object> updateJobSeekerSkillsById(Long id, List<Skill> skills)  {

        try{
            Optional<Demandeur> optionalDemandeur = demandeurRepository.findById(id);
            if (optionalDemandeur.isEmpty()) {
                return ExceptionHandler.itemNotFoundException("JobSeaker not found with ID:" + id);
            }
            Demandeur demandeur = optionalDemandeur.get();
            List<Skill> currentSkills = demandeur.getSkills();
            currentSkills.addAll(skills);
            demandeur.setSkills(currentSkills);
            demandeurRepository.save(demandeur);
            return ResponseHandler.generateResponse("Skill added successfully", demandeur.getSkills());

        }
        catch (Exception e) {
            System.out.println(e);
            return ExceptionHandler.badRequestException();
        }

    }
    public ResponseEntity<Object> getSkills(Long idDemandeur){
        try {
            Optional<Demandeur> optionalDemandeur = demandeurRepository.findById(idDemandeur);
            if (optionalDemandeur.isEmpty()) {
                return ExceptionHandler.itemNotFoundException("JobSeaker not found with ID:" + idDemandeur);
            }
            Demandeur demandeur = optionalDemandeur.get();
            Hibernate.initialize(demandeur.getSkills());
            Hibernate.initialize(demandeur.getLangues());
            demandeur.getSkills().size();
            demandeur.getLangues().size();
            demandeur.getExperiences().size();
            demandeur.getEducations().size();
            List<Skill> skills=demandeur.getSkills();
            return ResponseHandler.generateResponse("Skills list",skills);

        }
        catch (Exception e) {
            System.out.println(e);
            return ExceptionHandler.badRequestException();
        }
    }

    public ResponseEntity<Object> deleteSkillByName( Long idDemandeur, Skill skill){
        try{
            Optional<Demandeur> optionalDemandeur = demandeurRepository.findById(idDemandeur);
            if (optionalDemandeur.isEmpty()) {
                return ExceptionHandler.itemNotFoundException("JobSeaker not found with ID:" + idDemandeur);
            }
            Demandeur demandeur = optionalDemandeur.get();
            List<Skill> skills=demandeur.getSkills();
            if (skills.contains(skill)) {
                skills.remove(skill);
                demandeurRepository.save(demandeur);
                return ResponseHandler.generateResponse("Skill deleted successfully",null);

            } else {
                return ExceptionHandler.itemNotFoundException("Skill not found");
            }
        }
        catch (Exception e) {
            System.out.println(e);
            return ExceptionHandler.badRequestException();
        }
    }

}