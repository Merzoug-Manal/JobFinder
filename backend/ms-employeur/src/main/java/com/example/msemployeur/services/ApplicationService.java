package com.example.msemployeur.services;

import com.example.msemployeur.DTO.ApplicationDTO;
import com.example.msemployeur.DTO.DiplomeDTO;
import com.example.msemployeur.DTO.*;

import com.example.msemployeur.entities.*;

import com.example.msemployeur.exceptions.ExceptionHandler;
import com.example.msemployeur.exceptions.ResponseHandler;
import com.example.msemployeur.repositories.ApplicationRepository;
import com.example.msemployeur.repositories.OffreEmploiRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;

import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Slf4j
public class ApplicationService {
    @Autowired
    ApplicationRepository applicationRepository;
    @Autowired
    OffreEmploiRepository offreEmploiRepository;

    @Autowired
    private JavaMailSender mailSender;

    public ResponseEntity<Object> creerApplication(ApplicationDTO application) {
        try {
            List<Language> langues = application.getDemandeur().getLangues();
            List<Skill> skills = application.getDemandeur().getSkills();
            Application app = new Application();
            app.setNom(application.getDemandeur().getNom());
            app.setPrenom(application.getDemandeur().getPrenom());
            app.setAdresse(application.getDemandeur().getAdresse());
            app.setEmail(application.getDemandeur().getEmail());
            app.setPhone(application.getDemandeur().getPhone());
            app.setDateCreation(application.getDateCreation());
            app.setEtat(application.getEtat());
            app.setPhotoStoragePath(application.getDemandeur().getPathPhotoId());
            app.setOffreEmploi(offreEmploiRepository.findById(application.getIdOffreEmploi()).get());

            app.setLangues(langues);
            app.setSkills(skills);


            List<String> diplomeStoragePaths = application.getDiplomes().stream()
                    .map(DiplomeDTO::getStoragePath)
                    .collect(Collectors.toList());
            app.setDiplomeStoragePath(diplomeStoragePaths);

            List<String> experiencePost = application.getDemandeur().getExperiences().stream()
                    .map(ExperienceDTO::getPoste)
                    .collect(Collectors.toList());
            app.setExperiencPost(experiencePost);

            List<String> experienceDescription = application.getDemandeur().getExperiences().stream()
                    .map(ExperienceDTO::getDescription)
                    .collect(Collectors.toList());
            app.setExperienceDescription(experienceDescription);


            List<String> educationEcole = application.getDemandeur().getEducations().stream()
                    .map(EducationDTO::getEcole)
                    .collect(Collectors.toList());
            app.setEducationEcole(educationEcole);


            Application saveApp = applicationRepository.save(app);
            return ResponseHandler.generateResponse("Employeur created successfully", saveApp);

        } catch (Exception e) {
            System.out.println(e);
            return ExceptionHandler.badRequestException();
        }
    }
    @Transactional
        public ResponseEntity<Object> getApplicationsByIdOffre(Long idOffre){
            try{
                Optional<OffreEmploi> optionalOffreEmploi = offreEmploiRepository.findById(idOffre);
                if (!optionalOffreEmploi.isPresent()) {
                    return ExceptionHandler.itemNotFoundException("Job Offer not found with ID: " + idOffre);
                }

                OffreEmploi offreEmploi = optionalOffreEmploi.get();
                offreEmploi.getApplications().size();
                List<Application> applications= applicationRepository.findByIdOffre(idOffre);
                return ResponseHandler.generateResponse("All JobRequest by Offer", applications);

            }
            catch (Exception e) {
                System.out.println(e);
                return ExceptionHandler.badRequestException();
            }
        }

        public ResponseEntity<Object> getApplicationById(Long idApp){
        try {
            Optional<Application> optionalApplication = applicationRepository.findById(idApp);
            if (!optionalApplication.isPresent()) {
                return ExceptionHandler.itemNotFoundException("Job Request not found with ID: " + idApp);
            }
            Application application = optionalApplication.get();
            return ResponseHandler.generateResponse("Job request", application);


        }
        catch (Exception e) {
            System.out.println(e);
            return ExceptionHandler.badRequestException();
        }
        }
//**********************************Email setting************************
    private void sendAcceptedEmail(Application application) {
        String to = application.getEmail();
        String subject = "Your job application has been accepted";
        String body = "Dear " + application.getNom()+" "+application.getPrenom() + ",\n\n" +
                "Congratulations! Your job application for the position of " + application.getOffreEmploi().getPoste()+ " has been accepted. " +
                "We will contact you shortly to discuss the next steps.\n\n" +
                "Best regards,\n" +
                application.getOffreEmploi().getEmployeur().getFunctionEntreprise();
        mailSender.send(createSimpleMailMessage(to, subject, body));
    }
    private void sendRefusedEmail(Application application) {
        String to = application.getEmail();
        String subject = "Your job application has been refused";
        String body = "Dear " + application.getNom() + " " + application.getPrenom() + ",\n\n" +
                "We're sorry to tell you that your job application for the position of " + application.getOffreEmploi().getPoste() + " has been refused. " +
                "Please do not be discouraged and continue to apply for other job opportunities. \n\n" +
                "Best regards,\n" +
                application.getOffreEmploi().getEmployeur().getFunctionEntreprise();
        mailSender.send(createSimpleMailMessage(to, subject, body));
    }
    private SimpleMailMessage createSimpleMailMessage(String to, String subject, String body) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject(subject);
        message.setText(body);
        return message;
    }

    //********************************************************************************

        //modify state application by admin to accept or refuse
        public ResponseEntity<Object> UpdateEtatApplication(Long idApp, ApplicationDTO body){
        try{
            Optional<Application> optionalApplication = applicationRepository.findById(idApp);
            if (!optionalApplication.isPresent()) {
                return ExceptionHandler.itemNotFoundException("Job Request not found with ID: " + idApp);
            }
            Application application = optionalApplication.get();
            if (body.getEtat()== Status.Accepted){
                application.setEtat(body.getEtat());
                sendAcceptedEmail(application);
            }
            if (body.getEtat()== Status.Refused){
                application.setEtat(body.getEtat());
                sendRefusedEmail(application);
            }

            applicationRepository.save(application);
            return ResponseHandler.generateResponse("Job request updated successfully", application);


        }
        catch (Exception e) {
            System.out.println(e);
            return ExceptionHandler.badRequestException();
        }
        }

    }


