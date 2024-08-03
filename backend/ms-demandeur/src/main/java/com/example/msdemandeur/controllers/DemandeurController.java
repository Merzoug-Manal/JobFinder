package com.example.msdemandeur.controllers;

import com.example.msdemandeur.DTOs.DemandeurDTO;
import com.example.msdemandeur.configs.FileStorageService;
import com.example.msdemandeur.entities.*;
import com.example.msdemandeur.exceptions.ExceptionHandler;
import com.example.msdemandeur.exceptions.ResponseHandler;
import com.example.msdemandeur.repos.DemandeEmploiRepository;
import com.example.msdemandeur.repos.DemandeurRepository;
import com.example.msdemandeur.services.*;
import org.springframework.core.io.Resource;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import lombok.extern.slf4j.Slf4j;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;


import java.util.List;
import java.util.Optional;

@RestController
@Slf4j

@RequestMapping("api/demandeur")

public class DemandeurController {
    @Autowired
    DemandeEmploiRepository demandeEmploiRepository;
    @Autowired
    EducationService educationService;
    @Autowired
    ExperienceService experienceService;
    @Autowired
    DemandeurService demandeurService;
    @Autowired
    DiplomeService diplomeService;
    @Autowired
    DemandeurRepository demandeurRepository;

    @Autowired
    LanguesSkillsService languesService;

    @Autowired
    private final FileStorageService fileStorageService;

    public DemandeurController(FileStorageService fileStorageService) {
        this.fileStorageService = fileStorageService;
    }




    //create demandeur or cv just test
    @PostMapping("/create")
    ResponseEntity<Object> createDemandeur(@RequestBody DemandeurDTO body){
            return demandeurService.createJobSeeker(body);

    }


    //modification demandeur profil/cv
    @Transactional
    @PutMapping (value = "/update-infos/{idDemandeur}")

    ResponseEntity<Object> updateDemandeur(@RequestBody DemandeurDTO body,
                                           @PathVariable Long idDemandeur
                   ){
            return demandeurService.updateDemandeur(body,idDemandeur);
    }

    @GetMapping("/getById/{idDemandeur}")
    ResponseEntity<Object> getDemandeurById(@PathVariable Long idDemandeur){
        return demandeurService.getDemandeur(idDemandeur);
    }

    @GetMapping("/getByEmail/{email}")
    ResponseEntity<Object> getDemandeurByEmail(@PathVariable String email){
        return demandeurService.getDemandeurByEmail(email);
    }

  //**********************************Ed                        ucation***************************************//
   //lors depot cv create educations crud
  @PostMapping("/education/{idDemandeur}")
  ResponseEntity<Object> createEducationPart(@RequestBody Education body, @PathVariable Long idDemandeur){

        return educationService.createEducation(body, idDemandeur);
  }

  @GetMapping("/education/{idDemandeur}")
  ResponseEntity<Object>  getEducationsDemandeur(@PathVariable Long idDemandeur){
        return educationService.getEducationByIdDemandeur(idDemandeur);
  }

  @PutMapping("/educationId/{idEducation}")
  ResponseEntity<Object> updateEducationById(@RequestBody Education body, @PathVariable Long idEducation){
            return educationService.updateEducation(body, idEducation);

  }

  @DeleteMapping("/educationId/{idEducation}")
  ResponseEntity<Object> deleteEducationById(@PathVariable Long idEducation){
            return educationService.deleteEducation(idEducation);

  }






    //**********************************Experience***************************************//
    @PostMapping(value = "/experience/{idDemandeur}",  consumes = MediaType.APPLICATION_JSON_VALUE)
    ResponseEntity<Object> createExperiencePart(@RequestBody Experience body, @PathVariable Long idDemandeur){
            return experienceService.createExperience(body, idDemandeur);

    }

    @GetMapping("/experience/{idDemandeur}")
    ResponseEntity<Object>  getExperiencesDemandeur(@PathVariable Long idDemandeur){
        return experienceService.getExperienceByIdDemandeur(idDemandeur);
    }

    @PutMapping("/experienceId/{idExperience}")
    ResponseEntity<Object> updateExperienceById(@RequestBody Experience body,
                                                @PathVariable Long idExperience){
            return experienceService.updateExperience(body, idExperience);

    }

    @DeleteMapping("/experienceId/{idExperience}")
    ResponseEntity<Object> deleteExperienceById(@PathVariable Long idExperience){
            return experienceService.deleteExperience(idExperience);
    }




//**************************photo cv******************************
@Transactional
    @PostMapping("/photoCV/{demandeurId}")
    public ResponseEntity<Object> addPhoto(@RequestParam("file") MultipartFile file, @PathVariable Long demandeurId) {

        try{
            Optional<Demandeur> optionalDemandeur = demandeurRepository.findById(demandeurId);
            if (optionalDemandeur.isEmpty()) {
                return ExceptionHandler.itemNotFoundException("JobSeaker not found with ID:" + demandeurId);
            }
            Demandeur demandeur = optionalDemandeur.get();

            demandeur.getSkills().size();
            demandeur.getLangues().size();
            demandeur.getEducations().size();
            demandeur.getExperiences().size();


            String fileName = fileStorageService.storeFile(file);
            String fileDownloadUri = ServletUriComponentsBuilder.fromCurrentContextPath()
                    .path("/api/downloadFile/")
                    .path(fileName)
                    .toUriString();
            demandeur.setPathPhotoId(fileName);
            demandeurRepository.save(demandeur);

            return ResponseHandler.generateResponse("Photo added successfully", demandeur);

        }
        catch (Exception e) {
            System.out.println(e);
            return ExceptionHandler.badRequestException();
        }

    }

    @GetMapping("/get-photo/{fileName}")
    public ResponseEntity<Resource> getImage(@PathVariable String fileName) {
        Resource resource = fileStorageService.getImage(fileName);
        return ResponseEntity.ok()
                .contentType(MediaType.IMAGE_JPEG)
                .body(resource);
    }




    //********************************langues*********************

    @PostMapping("/langues/{idDemandeur}")
    public ResponseEntity<Object> updateLangues(@PathVariable Long idDemandeur, @RequestBody  List<Language> langues) {

            return languesService.updateJobSeekerLanguesById(idDemandeur, langues);
    }

    @DeleteMapping("/langue/{idDemandeur}/{langue}")
    public ResponseEntity<Object> deleteLangue(@PathVariable Long idDemandeur, @PathVariable Language langue) {

        return languesService.deleteLangueByName(idDemandeur, langue);
    }

    @GetMapping("/langue/{idDemandeur}")
    public ResponseEntity<Object> getLangue(@PathVariable Long idDemandeur) {
        return languesService.getLangue(idDemandeur);
    }



    //********************************skills******************************
    @PostMapping("/skills/{idDemandeur}")
    public ResponseEntity<Object> updateSkills(@PathVariable Long idDemandeur, @RequestBody  List<Skill> skills) {
            return languesService.updateJobSeekerSkillsById(idDemandeur, skills);
    }

    @DeleteMapping("/skill/{idDemandeur}/{skill}")
    public ResponseEntity<Object> deleteSkill(@PathVariable Long idDemandeur, @PathVariable Skill skill) {

        return languesService.deleteSkillByName(idDemandeur, skill);
    }

    @GetMapping("/skill/{idDemandeur}")
    public ResponseEntity<Object> getSkill(@PathVariable Long idDemandeur) {
        return languesService.getSkills(idDemandeur);
    }








    //modification cv
  //  @PutMapping("/{demandeurId}/cv")
    //public ResponseEntity<?> updateCV(@PathVariable Long demandeurId, @RequestBody CV newCV) {
    //    Demandeur demandeur = demandeurRepository.findById(demandeurId)
     //           .orElseThrow(() -> new ResourceNotFoundException("Demandeur introuvable avec l'ID " + demandeurId));
    //    CV cv = demandeur.getCv();
   //     cv.setNom(newCV.getNom());
    //    cv.setPrenom(newCV.getPrenom());
    //    cv.setEmail(newCV.getEmail());
    //    cv.setAdresse(newCV.getAdresse());
    //    cv.setDateNaissance(newCV.getDateNaissance());
    //    cv.setDiplomes(newCV.getDiplomes());
    //    cv.setEducations(newCV.getEducations());
    //    cv.setLangues(newCV.getLangues());
    //    cv.setPhone(newCV.getPhone());
    //    cv.setPathPhotoId(newCV.getPathPhotoId());
    //    cv.setSkills(newCV.getSkills());
    //    cv.setExperiences(newCV.getExperiences());
     //   cvRepository.save(cv);
     //   return ResponseEntity.ok().build();
   // }
    //creaction de la demande


//    @PostMapping("/demandes-Emploi")
 //   public ResponseEntity<DemandeEmploi> creerDemande(@RequestBody DemandeEmploi demande) {

  //      Demandeur demandeur = demandeurRepository.findById(demande.getDemandeur().getIdDemandeur())
   //             .orElseThrow(() -> new ResourceNotFoundException("Demandeur introuvable avec l'ID " + demande.getDemandeur().getIdDemandeur()));

   //     CV cv = demandeur.getCv();

  //      demande.setCv(cv);

   //     demandeEmploRepository.save(demande);

   //     return ResponseEntity.ok(demande);
   //
   // }





}
