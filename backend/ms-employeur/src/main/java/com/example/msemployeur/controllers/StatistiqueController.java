package com.example.msemployeur.controllers;

import com.example.msemployeur.repositories.EmployeurRepository;
import com.example.msemployeur.repositories.OffreEmploiRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/statistiques")
public class StatistiqueController {
    @Autowired
    private EmployeurRepository employeurRepository;
    @Autowired
    private OffreEmploiRepository offreEmploiRepository;
    @GetMapping("/employeurs")
    public int getNombreTotalEmployeurs() {
        return employeurRepository.getNombreTotalEmployeurs();
    }



    @GetMapping("/nombreOffresEmploi")
    public int getNombreOffresEmploi() {
        return offreEmploiRepository.getNombreOffresEmploi();
    }
    @GetMapping("/employeurs/wilaya/{wilaya}")
    public int getNombreEmployeursParWilaya(@PathVariable String wilaya) {
        return employeurRepository.getNombreEmployeursParWilaya(wilaya);
    }
    @GetMapping("/offres/wilaya/{wilaya}")
    public int getNombreOffresParWilaya(@PathVariable String wilaya) {
        return offreEmploiRepository.getNombreOffresParWilaya(wilaya);
    }


    @GetMapping("/offres/nombre-par-entreprise")
    public List<Object[]> getNombreOffresParEntreprise() {
        return offreEmploiRepository.getNombreOffresParEntreprise();
    }


    @GetMapping("/offres/annee/{year}")
    public int getNombreOffresParAnnee(@PathVariable int year) {
        return offreEmploiRepository.getNombreOffresParAnnee(year);
    }


    @GetMapping("/offres/mois/{year}/{month}")
    public int getNombreDemandesParMois(@PathVariable int year, @PathVariable int month) {
        return offreEmploiRepository.getNombreOffresParMois(year, month);
    }

    @GetMapping("/offres/semestre/{year}/{semester}")
    public int getNombreDemandesParSemestre(@PathVariable int year, @PathVariable int semester) {
        return offreEmploiRepository.getNombreOffresParSemestre(year, semester);
    }
    @GetMapping("/offres/nombre-par-fonction-entreprise")
    public List<Object[]> getNombreOffresParFonctionEntreprise() {
        return offreEmploiRepository.getNombreOffresParFonctionEntreprise();
    }
    @GetMapping("/employeurs/FunctionEntreprise/{FunctionEntreprise}")
    public int getNombreEmployeursParFunctionEntreprise(@PathVariable String FunctionEntreprise) {
        return employeurRepository.getNombreEmployeursParFunctionEntreprise(FunctionEntreprise);
    }
    @GetMapping("/offres/secteur/{secteur}")
    public int getNombreOffresParSecteur(@PathVariable String secteur) {
        return offreEmploiRepository.getNombreOffresParSect(secteur);
    }
}
