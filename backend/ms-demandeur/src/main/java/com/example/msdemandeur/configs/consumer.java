package com.example.msdemandeur.configs;

import com.example.msdemandeur.DTOs.DemandeurDTO;
import com.example.msdemandeur.services.DemandeurService;
import com.fasterxml.jackson.databind.ObjectMapper;
import net.minidev.json.JSONObject;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Component
@Service
@Slf4j
public class consumer {
    private  final ObjectMapper objectMapper;
    private final  ModelMapper modelMapper;
    private  final DemandeurService demandeurService;



    @Autowired
    public consumer(ObjectMapper objectMapper, ModelMapper modelMapper, DemandeurService demandeurService) {
        this.objectMapper = objectMapper;
        this.modelMapper = modelMapper;
        this.demandeurService = demandeurService;

    }



    @KafkaListener(topics = "creation-demandeur")
    public void listen(String record) throws Exception {

        DemandeurDTO demandeurs = objectMapper.readValue(record, DemandeurDTO.class);
        DemandeurDTO jobSeaker=modelMapper.map(demandeurs, DemandeurDTO.class);
        demandeurService.createJobSeeker(jobSeaker);
        log.info("Message processed successfully: {}", jobSeaker);
       // for (DemandeurDTO demandeur : demandeurs) {
         //   DemandeurDTO jobSeaker=modelMapper.map(demandeur, DemandeurDTO.class);
           // demandeurService.createJobSeeker(jobSeaker);
            //log.info("Message processed successfully: {}", jobSeaker);
        //}

    }
    @KafkaListener(topics = "delete-demandeur-by-admin")
    public Object DeleteDemandeur(String record) throws Exception {
        DemandeurDTO demandeurs = objectMapper.readValue(record, DemandeurDTO.class);
        DemandeurDTO jobSeaker=modelMapper.map(demandeurs, DemandeurDTO.class);
        log.info("Demandeur deleted successfully");
        return demandeurService.DeleteDemandeur(jobSeaker.getEmail());


    }

}
