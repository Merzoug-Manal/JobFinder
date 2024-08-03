package com.example.msdemandeur.configs;

import com.example.msdemandeur.entities.DemandeEmploi;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Component;

@Slf4j
@Component
public class Producer {

    private final ObjectMapper objectMapper;
    private final KafkaTemplate<String, String> kafkaTemplate;

    @Autowired
    public Producer(KafkaTemplate<String, String> kafkaTemplate, ObjectMapper objectMapper) {
        this.kafkaTemplate = kafkaTemplate;
        this.objectMapper = objectMapper;
    }

    public String sendDemandeEmploi(DemandeEmploi demandeEmploi) {
        try {
            String jobRequestAsMessage = objectMapper.writeValueAsString(demandeEmploi);
            kafkaTemplate.send("demandeur-send-demandeEmploi", jobRequestAsMessage);
            log.info("job request produced {}", jobRequestAsMessage);
            return "message sent";
        } catch (JsonProcessingException e) {
            e.printStackTrace();
            return "failed to send message";
        }
    }
}
