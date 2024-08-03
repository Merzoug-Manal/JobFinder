package com.example.msdemandeur.controllers;

import com.example.msdemandeur.configs.FileStorageService;
import com.example.msdemandeur.entities.DemandeEmploi;
import com.example.msdemandeur.entities.Demandeur;
import com.example.msdemandeur.entities.Diplome;
import com.example.msdemandeur.repos.DemandeEmploiRepository;
import com.example.msdemandeur.repos.DemandeurRepository;
import com.example.msdemandeur.repos.DiplomeRepository;
import com.example.msdemandeur.services.DiplomeService;
import org.apache.kafka.common.errors.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.util.List;

@RestController
@RequestMapping("/api")
public class DiplomeController {

    @Autowired
    private FileStorageService fileStorageService;

    @Autowired
    private DemandeurRepository demandeurRepository;
    @Autowired
    DiplomeRepository diplomeRepository;
    @Autowired
    DiplomeService diplomeService;
    @Autowired
    DemandeEmploiRepository demandeEmploiRepository;


    @PostMapping("/AddDiplome/{idDemandeEmploi}")
    public ResponseEntity<Object> createDiplomesForDemandeEmploi(@RequestParam("file") MultipartFile file, @PathVariable Long idDemandeEmploi) {
     //   Demandeur user = demandeurRepository.findById(demandeurId).get();
        DemandeEmploi demandeEmploi= demandeEmploiRepository.findById(idDemandeEmploi).get();
        //System.out.println(userId);
        Diplome diplome=new Diplome();

        String fileName = fileStorageService.storeFile(file);
        String fileDownloadUri = ServletUriComponentsBuilder.fromCurrentContextPath()
                .path("/api/downloadFile/")
                .path(fileName)
                .toUriString();

        diplome.setStoragePath(fileName);
        diplome.setDemandeEmploi(demandeEmploi);


        diplomeRepository.save(diplome);
        return ResponseEntity.status(HttpStatus.CREATED).body(diplome);

    }

    @GetMapping("/get-diplome/{fileName}")
    public ResponseEntity<Resource> getDiplome(@PathVariable String fileName) {
        Resource resource = fileStorageService.getImage(fileName);

        try {
            if (fileName.toLowerCase().endsWith(".pdf")) {
                return ResponseEntity.ok()
                        .header(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_PDF_VALUE)
                        .body(resource);
            } else {
                return ResponseEntity.ok()
                        .contentType(MediaType.IMAGE_JPEG)
                        .body(resource);
            }
        } catch (Exception e) {
            // Handle any potential errors
            throw new RuntimeException("Error retrieving file: " + fileName, e);
        }
    }


    @GetMapping("/diplomes/{idDemandeEmploi}")
    List<Diplome> getDiplomesDemandeur(@PathVariable Long idDemandeEmploi){
        return diplomeService.getDiplomesByIdDemandeEmploi(idDemandeEmploi);

    }

    @DeleteMapping("/diplome/{idDiplome}")
    ResponseEntity<String> deleteDiplomeById(@PathVariable Long idDiplome){
        try {
            return diplomeService.deleteDiplome(idDiplome);
        }
        catch (Exception e){
            System.out.println(e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
