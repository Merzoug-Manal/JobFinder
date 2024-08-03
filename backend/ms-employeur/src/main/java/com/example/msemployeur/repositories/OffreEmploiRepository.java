package com.example.msemployeur.repositories;

import com.example.msemployeur.entities.OffreEmploi;
import com.example.msemployeur.entities.Skill;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface OffreEmploiRepository extends JpaRepository<OffreEmploi, Long> {

    @Query("SELECT o FROM OffreEmploi  o  WHERE o.employeur.idEmployeur = :id")
    public List<OffreEmploi> findByEmployeurId(Long id);

    @Query("SELECT o FROM OffreEmploi  o  WHERE o.poste= :PostName")
    public List <OffreEmploi> findByPost(String PostName);

    ///nombre d'offre d'emploi
    @Query("SELECT COUNT(o) FROM OffreEmploi o")
    int getNombreOffresEmploi();
    //nombre offre par wilaya
    @Query("SELECT COUNT(e) FROM OffreEmploi e WHERE e.lieuTravail = :wilaya")
    int getNombreOffresParWilaya(@Param("wilaya") String wilaya);

    //nombre d'offre par entreprise
    @Query("SELECT e.entreprise, COUNT(o) FROM Employeur e JOIN e.offres o GROUP BY e.entreprise")
    List<Object[]> getNombreOffresParEntreprise();
    //nombre offre par annnee
    @Query("SELECT COUNT(o) FROM OffreEmploi o WHERE YEAR(o.dateExpiration) = :year")
    int getNombreOffresParAnnee(@Param("year") int year);
    //nombre offre par mois
    @Query("SELECT COUNT(o) FROM OffreEmploi o WHERE YEAR(o.dateExpiration) = :year AND MONTH(o.dateExpiration) = :month")
    int getNombreOffresParMois(@Param("year") int year, @Param("month") int month);


    //nombre offres par semestre

    @Query("SELECT COUNT(o) FROM OffreEmploi o WHERE YEAR(o.dateExpiration) = :year AND MONTH(o.dateExpiration) BETWEEN :startMonth AND :endMonth")
    int getNombreOffresParSemestre(@Param("year") int year, @Param("startMonth") int startMonth, @Param("endMonth") int endMonth);

    default int getNombreOffresParSemestre(int year, int semester) {
        if (semester == 1) {
            return getNombreOffresParSemestre(year, 1, 6);
        } else if (semester == 2) {
            return getNombreOffresParSemestre(year, 7, 12);
        } else {
            throw new IllegalArgumentException("Invalid semester: " + semester);
        }
    }
    //nombre offres par fonction entreprise
    @Query("SELECT e.functionEntreprise, COUNT(o) FROM Employeur e JOIN e.offres o GROUP BY e.functionEntreprise")
    List<Object[]> getNombreOffresParFonctionEntreprise();

//nombre offre par secteur activity
@Query("SELECT COUNT(e) FROM OffreEmploi e WHERE e.secteurActivite = :secteurActivite")
int getNombreOffresParSect(@Param("secteurActivite") String secteurActivite);


}
