package com.example.msemployeur.services;

import com.example.msemployeur.entities.Employeur;
import com.example.msemployeur.entities.OffreEmploi;
import com.example.msemployeur.exceptions.ExceptionHandler;
import com.example.msemployeur.exceptions.ResponseHandler;
import com.example.msemployeur.repositories.EmployeurRepository;
import com.example.msemployeur.repositories.OffreEmploiRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;
import java.util.Optional;

@Service
@Slf4j
@CrossOrigin
public class OffreEmploiService {
    @Autowired
    OffreEmploiRepository offreEmploiRepository;

    @Autowired
    EmployeurRepository employeurRepository;
    public ResponseEntity<Object> creerOffre(OffreEmploi offreEmploi, Long idEmployeur){
        try {
            Optional<Employeur> optionalEmployeur = employeurRepository.findById(idEmployeur);
            if(!optionalEmployeur.isPresent()){
                return ExceptionHandler.itemNotFoundException("Employeur not found with ID: " + idEmployeur);
            }

            Employeur employeur = optionalEmployeur.get();

            OffreEmploi offre = new OffreEmploi();

            offre.setPoste(offreEmploi.getPoste());
            offre.setLieuTravail(offreEmploi.getLieuTravail());
            offre.setSecteurActivite(offreEmploi.getSecteurActivite());
            offre.setNombrePostes(offreEmploi.getNombrePostes());
            offre.setDateExpiration(offreEmploi.getDateExpiration());
            offre.setNiveauEtude(offreEmploi.getNiveauEtude());
            offre.setMinExperience(offreEmploi.getMinExperience());
            offre.setTaches(offreEmploi.getTaches());
            offre.setTypeContrat(offreEmploi.getTypeContrat());
            offre.setEmployeur(employeur);

            OffreEmploi savedOffre = offreEmploiRepository.save(offre);

            return ResponseHandler.generateResponse("JobOffre created successfully", savedOffre);

        }
        catch (Exception e) {
            System.out.println(e);
            return ExceptionHandler.badRequestException();
        }
    }

    public ResponseEntity<Object> updateOffreEmploi(OffreEmploi body, Long idOffre){
        try {
            Optional<OffreEmploi> optionalOffreEmploi = offreEmploiRepository.findById(idOffre);
            if(!optionalOffreEmploi.isPresent()){
                return ExceptionHandler.itemNotFoundException("JobOffer not found with ID: " + idOffre);
            }

            OffreEmploi offre = optionalOffreEmploi.get();

            if (body.getPoste() != null) {
                offre.setPoste(body.getPoste());
            }
            if (body.getLieuTravail() != null) {
                offre.setLieuTravail(body.getLieuTravail());
            }
            if (body.getSecteurActivite() != null) {
                offre.setSecteurActivite(body.getSecteurActivite());
            }
            if (body.getNombrePostes() != null) {
                offre.setNombrePostes(body.getNombrePostes());
            }
            if (body.getDateExpiration() != null) {
                offre.setDateExpiration(body.getDateExpiration());
            }
            if (body.getNiveauEtude() != null) {
                offre.setNiveauEtude(body.getNiveauEtude());
            }
            if (body.getMinExperience() != null) {
                offre.setMinExperience(body.getMinExperience());
            }
            if (body.getTaches() != null) {
                offre.setTaches(body.getTaches());
            }
            if (body.getTypeContrat() != null) {
                offre.setTypeContrat(body.getTypeContrat());
            }

            OffreEmploi savedOffre = offreEmploiRepository.save(offre);

            return ResponseHandler.generateResponse("JobOffre updated successfully", savedOffre);

        }
        catch (Exception e) {
            System.out.println(e);
            return ExceptionHandler.badRequestException();
        }
    }

    public ResponseEntity<Object> getOffreByPostName(String post){
        try{

            List <OffreEmploi> offre = offreEmploiRepository.findByPost(post);
            if (offre==null){
                return ExceptionHandler.itemNotFoundException("No recommended Offers found!");
            }
            return ResponseHandler.generateResponse("Recommended Job: ",offre);


        }
        catch (Exception e) {
            System.out.println(e);
            return ExceptionHandler.badRequestException();
        }
    }


    public ResponseEntity<Object> getOffres() {
        List<OffreEmploi> offres = offreEmploiRepository.findAll();
        return ResponseHandler.generateResponse("All Job Offers", offres);
    }

    public ResponseEntity<Object> getOffreById(Long idOffre){
        try{
            Optional<OffreEmploi> optionalOffreEmploi = offreEmploiRepository.findById(idOffre);
            if(!optionalOffreEmploi.isPresent()){
                return ExceptionHandler.itemNotFoundException("JobOffer not found with ID: " + idOffre);
            }

            OffreEmploi offre = optionalOffreEmploi.get();

            return ResponseHandler.generateResponse("Job offer:", offre);

        }
        catch (Exception e) {
            System.out.println(e);
            return ExceptionHandler.badRequestException();
        }
    }
    public ResponseEntity<Object> getOffresByIdEmployeur(Long idEmployeur){
        try{
            Optional<Employeur> optionalEmployeur = employeurRepository.findById(idEmployeur);
            if (!optionalEmployeur.isPresent()) {
                return ExceptionHandler.itemNotFoundException("Employeur not found with ID: " + idEmployeur);
            }
            Employeur employeur = optionalEmployeur.get();
            List<OffreEmploi> offres = offreEmploiRepository.findByEmployeurId(employeur.getIdEmployeur());
            return ResponseHandler.generateResponse("All the Job offers of Employeur:", offres);

        }
        catch (Exception e) {
            System.out.println(e);
            return ExceptionHandler.badRequestException();
        }
    }

    public ResponseEntity<Object> deleteOffreEmploi(Long idOffre){
        try{
            Optional<OffreEmploi> optionalOffreEmploi = offreEmploiRepository.findById(idOffre);
            if(!optionalOffreEmploi.isPresent()){
                return ExceptionHandler.itemNotFoundException("JobOffer not found with ID: " + idOffre);
            }

            OffreEmploi offre = optionalOffreEmploi.get();
            offreEmploiRepository.delete(offre);
            return ResponseHandler.generateResponse("Job offer deleted successfully", null);

        }
        catch (Exception e) {
            System.out.println(e);
            return ExceptionHandler.badRequestException();
        }
    }


}
