package com.example.msdemandeur.services;

import com.example.msdemandeur.entities.Diplome;
import com.example.msdemandeur.entities.Education;
import com.example.msdemandeur.repos.DemandeurRepository;
import com.example.msdemandeur.repos.DiplomeRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Service
@Slf4j
public class DiplomeService {

    @Autowired
    DiplomeRepository diplomeRepository;
    @Autowired
    DemandeurRepository demandeurRepository;


    public List<Diplome> getDiplomesByIdDemandeEmploi(Long idDemandeEmploi){
        List<Diplome> diplomeList =diplomeRepository.findDiplomesDemandeEmploi(idDemandeEmploi);
        return diplomeList;
    }

    public ResponseEntity<String> deleteDiplome(Long idDiplome){
        Diplome diplome = diplomeRepository.findById(idDiplome)
                .orElseThrow(() -> new ResourceNotFoundException("Diplome introuvable avec l'ID " +idDiplome));
        diplomeRepository.delete(diplome);
        return ResponseEntity.ok().body("File deleted successfully ");
    }
}
