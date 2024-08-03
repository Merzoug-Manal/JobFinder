package com.example.msdemandeur.controllers;

import com.example.msdemandeur.entities.Language;
import com.example.msdemandeur.entities.Sexe;
import com.example.msdemandeur.entities.Skill;
import com.example.msdemandeur.repos.DemandeEmploiRepository;
import com.example.msdemandeur.repos.DemandeurRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/statistiques")
public class StatistiqueController {
    @Autowired
    private DemandeurRepository demandeurRepository;
    @Autowired
    private DemandeEmploiRepository demandeEmploiRepository;

    @GetMapping("/demandeurs")
    public ResponseEntity<Long> getNombreDemandeurs() {
        Long nombreDemandeurs = demandeurRepository.getNombreDemandeurs();
        return new ResponseEntity<>(nombreDemandeurs, HttpStatus.OK);}


    @GetMapping("/nombreDemandes")
    public int getNombreDemandes() {
        return demandeEmploiRepository.getNombreDemandes();
    }

    @GetMapping("/demandes-par-demandeur")
    public ResponseEntity<List<Object[]>> getNombreDemandesParDemandeur() {
        List<Object[]> nombreDemandesParDemandeur = demandeurRepository.getNombreDemandesParDemandeur();
        return new ResponseEntity<>(nombreDemandesParDemandeur, HttpStatus.OK);
    }
    @GetMapping("/demandes/annee/{year}")
    public int getNombreDemandesParAnnee(@PathVariable int year) {
        return demandeEmploiRepository.getNombreDemandesParAnnee(year);
    }

    @GetMapping("/demandes/mois/{year}/{month}")
    public int getNombreDemandesParMois(@PathVariable int year, @PathVariable int month) {
        return demandeEmploiRepository.getNombreDemandesParMois(year, month);
    }

    @GetMapping("/demandes/semestre/{year}/{semester}")
    public int getNombreDemandesParSemestre(@PathVariable int year, @PathVariable int semester) {
        return demandeEmploiRepository.getNombreDemandesParSemestre(year, semester);
    }


    @GetMapping("/demandeurs/competence/{skill}")
    public int getNombreDemandeursParCompetence(@PathVariable Skill skill) {
        return demandeurRepository.getNombreDemandeursParCompetence(skill);
    }

    @GetMapping("/demandeurs/langue/{language}")
    public int getNombreDemandeursParLangue(@PathVariable Language language) {
        return demandeurRepository.getNombreDemandeursParLangue(language);
    }
    @GetMapping("/demandeurs/sexe/{sexe}")
    public int getNombreDemandeursParSexe(@PathVariable Sexe sexe) {
        return demandeurRepository.getNombreDemandeursParSexe(sexe);
    }


    @GetMapping("/demandes-emploi/sexe/{sexe}")
    public int getNombreDemandesEmploiParSexe(@PathVariable Sexe sexe) {
        return demandeEmploiRepository.getNombreDemandesEmploiParSexe(sexe);
    }
    @GetMapping("/demandeurs/wilaya/{wilaya}")
    public int getNombreDemandeursParWilaya(@PathVariable String wilaya) {
        return demandeurRepository.getNombreDemandeursParWilaya(wilaya);
    }

    @GetMapping("/demandeurs/age")
    public Map<Integer, Long> countDemandeursByAge() {
        List<Integer> ages = demandeurRepository.findAllAges();
        Map<Integer, Long> ageCounts = ages.stream()
                .collect(Collectors.groupingBy(Function.identity(), Collectors.counting()));
        return ageCounts;
    }










}
