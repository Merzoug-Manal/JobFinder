package com.example.msdemandeur.controllers;

import com.example.msdemandeur.configs.FileStorageService;
import com.example.msdemandeur.configs.Producer;
import com.example.msdemandeur.entities.DemandeEmploi;
import com.example.msdemandeur.entities.Demandeur;
import com.example.msdemandeur.entities.Diplome;
import com.example.msdemandeur.entities.Status;
import com.example.msdemandeur.exceptions.ExceptionHandler;
import com.example.msdemandeur.exceptions.ResponseHandler;
import com.example.msdemandeur.repos.DemandeEmploiRepository;
import com.example.msdemandeur.repos.DemandeurRepository;
import com.example.msdemandeur.repos.DiplomeRepository;
import lombok.extern.slf4j.Slf4j;
import org.hibernate.Hibernate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import org.springframework.transaction.annotation.Transactional;
import org.xml.sax.ErrorHandler;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;


@RestController
@Slf4j
@RequestMapping("/api")
public class DemandeEmploiConntroller {
    @Autowired
    DemandeurRepository demandeurRepository;
    @Autowired
    DemandeEmploiRepository demandeEmploiRepository;
    @Autowired
    DiplomeRepository diplomeRepository;
    @Autowired
    private FileStorageService fileStorageService;

    private final Producer producer;
    @Autowired
    private JavaMailSender mailSender;


    public DemandeEmploiConntroller(Producer producer) {
        this.producer = producer;
    }

  @Transactional
    @PostMapping("/demandeEmploi/{idOffre}/{idDemandeur}")
    public ResponseEntity<Object> createDemandeEmploi(
            @PathVariable Long idOffre,
            @PathVariable Long idDemandeur,
            @RequestParam("files") List<MultipartFile> files
    ) {
      try {

          Optional<Demandeur> optionalDemandeur = demandeurRepository.findById(idDemandeur);
          if (optionalDemandeur.isEmpty()) {
              return ExceptionHandler.itemNotFoundException("JobSeaker not found with ID:" + idDemandeur);
          }
          Demandeur demandeur = optionalDemandeur.get();
          demandeur.getExperiences().size();
          demandeur.getSkills().size();
          demandeur.getLangues().size();
          demandeur.getEducations().size();
          demandeur.getEducations().size();

          DemandeEmploi demandeEmploi = new DemandeEmploi();
          demandeEmploi.setDemandeur(demandeur);
          demandeEmploi.setDateCreation(LocalDateTime.now());
          demandeEmploi.setEtat(Status.Not_enrolled);
          demandeEmploi.setIdOffreEmploi(idOffre);

          Set<Diplome> diplomes = new HashSet<>();
          for (MultipartFile file : files) {
              Diplome diplome = new Diplome();
              String fileName = fileStorageService.storeFile(file);
              String fileDownloadUri = ServletUriComponentsBuilder.fromCurrentContextPath()
                      .path("/api/downloadFile/")
                      .path(fileName)
                      .toUriString();
              diplome.setStoragePath(fileName);
              diplome.setDemandeEmploi(demandeEmploi);
              diplomes.add(diplome);
              //diplomeRepository.save(diplome);
          }

          System.out.println("DemandeEmploi ID: " + demandeEmploi.getIdDemande());

          demandeEmploi.setDiplomes(diplomes);

          demandeEmploiRepository.save(demandeEmploi);

          for (Diplome diplome : diplomes) {
              diplome.setDemandeEmploi(demandeEmploi);
              diplomeRepository.save(diplome);
          }
          

          return ResponseHandler.generateResponse("JobRequest updated successfully", demandeEmploi);

      } catch (Exception e) {
          System.out.println(e);
          return ExceptionHandler.badRequestException();
      }

  }
//get by demandeur id la demande d'emploi
    @Transactional
    @GetMapping("/demandeEmploi/{demandeurId}")
    public ResponseEntity<Object> getAllDemandesByDemandeurId(@PathVariable Long demandeurId) {
        try {
            Optional<Demandeur> optionalDemandeur = demandeurRepository.findById(demandeurId);
            if (optionalDemandeur.isEmpty()) {
                return ExceptionHandler.itemNotFoundException("JobSeaker not found with ID:" + demandeurId);
            }
            Demandeur demandeur = optionalDemandeur.get();
            Hibernate.initialize(demandeur.getSkills());
            Hibernate.initialize(demandeur.getLangues());
            demandeur.getSkills().size();
            demandeur.getExperiences().size();
            demandeur.getEducations().size();
            demandeur.getLangues().size();
            List<DemandeEmploi> demandes = demandeEmploiRepository.findByDemandeurId(demandeurId);
            return ResponseHandler.generateResponse("All JobRequest by JobSeaker", demandes);

        } catch (Exception e) {
            System.out.println(e);
            return ExceptionHandler.badRequestException();
        }
    }
//get la demande d'emploi by its id
    @Transactional
    @GetMapping("/demandeEmploiById/{idDemandeEmploi}")
    public ResponseEntity<Object> getAllDemandesById(@PathVariable Long idDemandeEmploi) {
        try{
            Optional<DemandeEmploi> optionalDemande = demandeEmploiRepository.findById(idDemandeEmploi);
            if (optionalDemande.isEmpty()) {
                return ExceptionHandler.itemNotFoundException("Job Request not found with ID:" + idDemandeEmploi);
            }
            DemandeEmploi demandeEmploi = optionalDemande.get();
            Hibernate.initialize(  demandeEmploi.getDemandeur().getSkills());
            Hibernate.initialize(  demandeEmploi.getDemandeur().getLangues());
            demandeEmploi.getDiplomes().size();
            demandeEmploi.getDemandeur().getSkills().size();
            demandeEmploi.getDemandeur().getLangues().size();
            demandeEmploi.getDemandeur().getEducations().size();
            demandeEmploi.getDemandeur().getExperiences().size();
            return ResponseHandler.generateResponse("Job request", demandeEmploi);

        }
        catch (Exception e) {
            System.out.println(e);
            return ExceptionHandler.badRequestException();
        }

    }

    @Transactional
    @GetMapping("/demandeEmploiByIdOffre/{idOffre}")
    public ResponseEntity<Object> getAllDemandesByIdOffre(@PathVariable Long idOffre) {
        try{
            List<DemandeEmploi> demandes = demandeEmploiRepository.findByIdOffre(idOffre);
            for (DemandeEmploi demande: demandes){
                demande.getDiplomes().size();
                demande.getDemandeur().getExperiences().size();
                demande.getDemandeur().getEducations().size();
                demande.getDemandeur().getSkills().size();
                demande.getDemandeur().getLangues().size();

            }
            return ResponseHandler.generateResponse("all demande by id offer", demandes);


        }
        catch (Exception e) {
            System.out.println(e);
            return ExceptionHandler.badRequestException();
        }

    }

//************************************Mail Settings*********************************************


     private void sendRefusedEmail(DemandeEmploi demandeEmploi) {

        String to = demandeEmploi.getDemandeur().getEmail();
        String subject = "Your job application has been refused By the Admin";
        String body = "Dear " + demandeEmploi.getDemandeur().getNom() + " " + demandeEmploi.getDemandeur().getPrenom() + ",\n\n" +
                "We're sorry to inform you that your job application has been refused by the Admin because it did not match the requirements of the job offer.\n" +
                "Please do not be discouraged and continue to apply for other job opportunities. \n\n" +
                "Best regards,\n"
                ;
        mailSender.send(createSimpleMailMessage(to, subject, body));
    }
    private SimpleMailMessage createSimpleMailMessage(String to, String subject, String body) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject(subject);
        message.setText(body);
        return message;
    }


    //le traitement de la demande d'apres l'admin (set etat to pending or refused)
    @Transactional
    @PutMapping("/demandeEmploi-status/{idDemandeEmploi}")
    public ResponseEntity<Object> updateStatusDemandeByAdmin(@PathVariable Long idDemandeEmploi, @RequestBody DemandeEmploi body) {
        try{
            Optional<DemandeEmploi> optionalDemande = demandeEmploiRepository.findById(idDemandeEmploi);
            if (optionalDemande.isEmpty()) {
                return ExceptionHandler.itemNotFoundException("Job Request not found with ID:" + idDemandeEmploi);
            }
            DemandeEmploi demandeEmploi = optionalDemande.get();
            if (body.getEtat()==Status.Pending){
                demandeEmploi.setEtat(body.getEtat());
                DemandeEmploi updatedDemandeEmploi = demandeEmploiRepository.save(demandeEmploi);
                producer.sendDemandeEmploi(demandeEmploi);
                return ResponseHandler.generateResponse("Job Request updated successfully, sent to Employeur!", updatedDemandeEmploi);
            }
            else if (body.getEtat()==Status.Refused){
                demandeEmploi.setEtat(body.getEtat());

                demandeEmploiRepository.save(demandeEmploi);
                sendRefusedEmail(demandeEmploi);
                return ResponseHandler.generateResponse("Job Request refused by admin", null);
            }
            else{
                return ExceptionHandler.itemNotFoundException("Job request can not be updated");
            }



        }
        catch (Exception e) {
            System.out.println(e);
            return ExceptionHandler.badRequestException();
        }


    }


    //annulation d'une demande par demandeur if etat is Not_Enrolled or refused
    @DeleteMapping("/demandeEmploi/{demandeId}")
    public ResponseEntity<Object> annulerDemande(@PathVariable Long demandeId) {
        try{
            Optional<DemandeEmploi> optionalDemande = demandeEmploiRepository.findById(demandeId);
            if (optionalDemande.isEmpty()) {
                return ExceptionHandler.itemNotFoundException("Job Request not found with ID:" + demandeId);
            }
            DemandeEmploi demandeEmploi = optionalDemande.get();
            if ((demandeEmploi.getEtat() == Status.Not_enrolled)|| (demandeEmploi.getEtat() == Status.Refused)) {
                demandeEmploiRepository.delete(demandeEmploi);
                return ResponseHandler.generateResponse("Job Request deleted successfully", null);

            } else {
                return ExceptionHandler.notAuthorizedExceptions("you can't deleted this Job Request");
            }
        }
        catch (Exception e) {
            System.out.println(e);
            return ExceptionHandler.badRequestException();
        }


    }



}
/** Diplome diplome = new Diplome();
 String fileName = fileStorageService.storeFile(file);
 String fileDownloadUri = ServletUriComponentsBuilder.fromCurrentContextPath()
 .path("/api/downloadFile/")
 .path(fileName)
 .toUriString();**/
// diplome.setStoragePath(fileDownloadUri);
//diplome.setDemandeEmploi(demandeEmploi);
//demandeEmploi.setDiplomes(Collections.singleton(diplome));
