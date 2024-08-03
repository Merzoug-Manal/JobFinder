package com.example.msemployeur.controllers;

import com.example.msemployeur.DTO.ApplicationDTO;
import com.example.msemployeur.DTO.EmployeurDTO;
import com.example.msemployeur.entities.OffreEmploi;
import com.example.msemployeur.repositories.OffreEmploiRepository;
import com.example.msemployeur.services.ApplicationService;
import com.example.msemployeur.services.EmployeurService;
import com.example.msemployeur.services.OffreEmploiService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("api/employeur")
public class EmployeurController {
    @Autowired
    EmployeurService employeurService;
    @Autowired
    OffreEmploiService offreEmploiService;
    @Autowired
    OffreEmploiRepository offreEmploiRepository;

    @Autowired
    ApplicationService applicationService;


    @PostMapping("/create")
    public ResponseEntity<Object> createEmployeur(@RequestBody EmployeurDTO employeur) {
        return employeurService.creerEmployeur(employeur);
    }

    @PutMapping(value = "/update-infos/{idEmployeur}")
    ResponseEntity<Object> updateDemandeur(@RequestBody EmployeurDTO body,
                                           @PathVariable Long idEmployeur){
        return employeurService.updateEmployeur(body,idEmployeur);

    }

    @GetMapping("/getById/{idEmployeur}")
    ResponseEntity<Object> getEmployeurById(@PathVariable Long idEmployeur){
        return employeurService.getEmployeur(idEmployeur);
    }

    @GetMapping("/getByEmail/{email}")
    ResponseEntity<Object> getEmployeurByEmail(@PathVariable String email){
        return employeurService.getEmployeurByEmail(email);
    }



    //**************************Offre Emploi******************************

    @PostMapping("/createOffre/{idEmployeur}")
    public ResponseEntity<Object> createOffreEmploi(@RequestBody OffreEmploi offreEmploi, @PathVariable Long idEmployeur) {
        return offreEmploiService.creerOffre(offreEmploi, idEmployeur);
    }

    @PutMapping(value = "/updateOffre/{idOffre}")
    ResponseEntity<Object> updateDemandeur(@RequestBody OffreEmploi body,
                                           @PathVariable Long idOffre){
        return offreEmploiService.updateOffreEmploi(body,idOffre);

    }
    @GetMapping("/OffreById/{idOffre}")
    public ResponseEntity<Object> getOffreById(@PathVariable Long idOffre){
        return offreEmploiService.getOffreById(idOffre);
    }

    @GetMapping("/recommendedJobs/{postName}")
    public ResponseEntity<Object> getOffreByPost(@PathVariable String postName){
        return offreEmploiService.getOffreByPostName(postName);
    }

    @GetMapping("/Offres/{idEmployeur}")
    public ResponseEntity<Object> getOffres(@PathVariable Long idEmployeur){
        return offreEmploiService.getOffresByIdEmployeur(idEmployeur);
    }
    @DeleteMapping ("/OffreById/{idOffre}")
    public ResponseEntity<Object> DeleteOffreById(@PathVariable Long idOffre){
        return offreEmploiService.deleteOffreEmploi(idOffre);
    }

    @GetMapping("/Offres")
    public ResponseEntity<Object> getAllOffres(){
        return offreEmploiService.getOffres();
    }


    //**************************Applications******************************

    @Transactional
    @GetMapping("/offre/applications/{idOffre}")
    public ResponseEntity<Object> getApplicationByOffre(@PathVariable Long idOffre){
        return applicationService.getApplicationsByIdOffre(idOffre);
    }

    @Transactional
    @GetMapping("/offre/application/{idApp}")
    public ResponseEntity<Object> getApplicationById(@PathVariable Long idApp){
        return applicationService.getApplicationById(idApp);
    }

    @PutMapping("/offre/application-status/{idApp}")
    public ResponseEntity<Object> updateStatusAppByAdmin(@PathVariable Long idApp,@RequestBody ApplicationDTO body)
    {
        return applicationService.UpdateEtatApplication(idApp,body);
    }


}
