package com.example.msemployeur.configs;

import com.example.msemployeur.DTO.ApplicationDTO;
import com.example.msemployeur.DTO.EmployeurDTO;
import com.example.msemployeur.services.ApplicationService;
import com.example.msemployeur.services.EmployeurService;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

@Component
@Service
@Slf4j
public class consumer {
    private  final ObjectMapper objectMapper;
    private final  ModelMapper modelMapper;
    private  final EmployeurService employeurService;
    private  final ApplicationService applicationService;




    @Autowired
    public consumer(ObjectMapper objectMapper, ModelMapper modelMapper, EmployeurService employeurService, ApplicationService applicationService) {
        this.objectMapper = objectMapper;
        this.modelMapper = modelMapper;
        this.employeurService = employeurService;
        this.applicationService = applicationService;

    }



    @KafkaListener(topics = "creation-employeur")
    public void listen(String record) throws Exception {

        EmployeurDTO employeurs = objectMapper.readValue(record, EmployeurDTO.class);
        EmployeurDTO employeur=modelMapper.map(employeurs, EmployeurDTO.class);
        employeurService.creerEmployeur(employeur);
        log.info("Message processed successfully: {}", employeur);


    }

    @KafkaListener(topics = "demandeur-send-demandeEmploi")
    public void DemandeEmploi(String record) throws Exception {

        ApplicationDTO applicationDTO = objectMapper.readValue(record, ApplicationDTO.class);
        ApplicationDTO application=modelMapper.map(applicationDTO, ApplicationDTO.class);
        applicationService.creerApplication(application);
        log.info("Message processed successfully: {}", application);


    }

    @KafkaListener(topics = "delete-employeur-by-admin")
    public Object DeleteEmployeur(String record) throws Exception {
        EmployeurDTO employeurs = objectMapper.readValue(record, EmployeurDTO.class);
        EmployeurDTO employeur=modelMapper.map(employeurs, EmployeurDTO.class);
        log.info("Employeur deleted successfully");
        return employeurService.DeleteEmployeur(employeur.getEmail());


    }


}
