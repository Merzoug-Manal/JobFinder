package com.example.msemployeur.services;

import com.example.msemployeur.DTO.EmployeurDTO;
import com.example.msemployeur.entities.Employeur;
import com.example.msemployeur.exceptions.ExceptionHandler;
import com.example.msemployeur.exceptions.ResponseHandler;
import com.example.msemployeur.repositories.EmployeurRepository;
import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;
import org.hibernate.Hibernate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@Slf4j
public class EmployeurService {
    @Autowired
    EmployeurRepository employeurRepository;

    public ResponseEntity<Object> creerEmployeur(EmployeurDTO employeur) {
        try {

            Employeur emp = new Employeur();
            emp.setNom(employeur.getNom());
            emp.setPrenom(employeur.getPrenom());
            emp.setEmail(employeur.getEmail());
            emp.setEntreprise(employeur.getEntreprise());
            emp.setFunctionEntreprise(employeur.getFunctionEntreprise());
            emp.setPhone(employeur.getPhone());
            emp.setWilaya(employeur.getWilaya());
            emp.setAdresse(employeur.getAdresse());
            emp.setNumeroCommerial(employeur.getNumeroCommerial());

            Employeur savedEmployeur = employeurRepository.save(emp);

            return ResponseHandler.generateResponse("Employeur created successfully", savedEmployeur);

        } catch (Exception e) {
            System.out.println(e);
            return ExceptionHandler.badRequestException();
        }

    }

    public ResponseEntity<Object> updateEmployeur(EmployeurDTO body,
                                                  Long idEmployeur) {
        try {
            Optional<Employeur> optionalEmployeur = employeurRepository.findById(idEmployeur);
            if (!optionalEmployeur.isPresent()) {
                return ExceptionHandler.itemNotFoundException("Employeur not found with ID: " + idEmployeur);
            }

            Employeur employeur = optionalEmployeur.get();

            if (body.getNom() != null) {
                employeur.setNom(body.getNom());
            }
            if (body.getPrenom() != null) {
                employeur.setPrenom(body.getPrenom());
            }
            if (body.getAdresse() != null) {
                employeur.setAdresse(body.getAdresse());
            }
            if (body.getPhone() != null) {
                employeur.setPhone(body.getPhone());
            }
            if (body.getNumeroCommerial() != null) {
                employeur.setNumeroCommerial(body.getNumeroCommerial());
            }
            if (body.getFunctionEntreprise() != null) {
                employeur.setFunctionEntreprise(body.getFunctionEntreprise());
            }
            if (body.getEntreprise() != null) {
                employeur.setEntreprise(body.getEntreprise());
            }
            if (body.getWilaya() != null) {
                employeur.setWilaya(body.getWilaya());
            }
            Employeur savedEmployeur = employeurRepository.save(employeur);
            return ResponseHandler.generateResponse("Profile updated successfully ", savedEmployeur);

        } catch (Exception e) {
            System.out.println(e);
            return ExceptionHandler.badRequestException();
        }

    }
    @Transactional
    public ResponseEntity<Object> getEmployeur(Long idEmployeur){
        try
        {
            Optional<Employeur> OptionalEmployeur = employeurRepository.findById(idEmployeur);
            if (OptionalEmployeur.isEmpty()) {
                return ExceptionHandler.itemNotFoundException("Employeur not found with ID:" + idEmployeur);
            }
            Employeur employeur = OptionalEmployeur.get();

            return ResponseHandler.generateResponse("Employeur:", employeur);


        }
        catch (Exception e) {
            System.out.println(e);
            return ExceptionHandler.badRequestException();
        }
    }

    @Transactional
    public ResponseEntity<Object> getEmployeurByEmail(String email){
        try
        {
            Optional<Employeur> OptionalEmployeur = employeurRepository.findByEmail(email);
            if (OptionalEmployeur.isEmpty()) {
                return ExceptionHandler.itemNotFoundException("Employeur not found with email:" + email);
            }
            Employeur employeur = OptionalEmployeur.get();

            return ResponseHandler.generateResponse("Employeur:", employeur);


        }
        catch (Exception e) {
            System.out.println(e);
            return ExceptionHandler.badRequestException();
        }
    }

    public ResponseEntity<Object> DeleteEmployeur(String email){
        try
        {
            Optional<Employeur> OptionalEmployeur = employeurRepository.findByEmail(email);
            if (OptionalEmployeur.isEmpty()) {
                return ExceptionHandler.itemNotFoundException("Employeur not found with email:" + email);
            }
            Employeur employeur = OptionalEmployeur.get();
            employeurRepository.delete(employeur);

            return ResponseHandler.generateResponse("Employeur deleted successfully", null);


        }
        catch (Exception e) {
            System.out.println(e);
            return ExceptionHandler.badRequestException();
        }
    }
}