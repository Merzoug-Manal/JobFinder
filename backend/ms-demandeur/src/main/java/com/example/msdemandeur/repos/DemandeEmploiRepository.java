package com.example.msdemandeur.repos;

import com.example.msdemandeur.entities.DemandeEmploi;
import com.example.msdemandeur.entities.Experience;
import com.example.msdemandeur.entities.Sexe;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.YearMonth;
import java.util.List;

public interface DemandeEmploiRepository extends JpaRepository<DemandeEmploi,Long> {
   // List<DemandeEmploi> findByDemandeurId(Long demandeurId);

   @Query("SELECT e FROM DemandeEmploi e  WHERE e.demandeur.idDemandeur = :id")
   public List<DemandeEmploi> findByDemandeurId(Long id);

    @Query("SELECT e from DemandeEmploi e WHERE e.idOffreEmploi=:id ")
    public List<DemandeEmploi> findByIdOffre (Long id);



//le nombre de demaandes d'emploi
 @Query("SELECT COUNT(d) FROM DemandeEmploi d")
 int getNombreDemandes();

 //le nombre de demandes par moi,annee,semestre
 @Query("SELECT COUNT(d) FROM DemandeEmploi d WHERE YEAR(d.dateCreation) = :year")
 int getNombreDemandesParAnnee(@Param("year") int year);

   @Query("SELECT COUNT(d) FROM DemandeEmploi d WHERE YEAR(d.dateCreation) = :year AND MONTH(d.dateCreation) = :month")
   int getNombreDemandesParMois(@Param("year") int year, @Param("month") int month);

   @Query("SELECT COUNT(d) FROM DemandeEmploi d WHERE YEAR(d.dateCreation) = :year AND MONTH(d.dateCreation) BETWEEN :startMonth AND :endMonth")
   int getNombreDemandesParSemestre(@Param("year") int year, @Param("startMonth") int startMonth, @Param("endMonth") int endMonth);

   default int getNombreDemandesParSemestre(int year, int semester) {
      if (semester == 1) {
         return getNombreDemandesParSemestre(year, 1, 6);
      } else if (semester == 2) {
         return getNombreDemandesParSemestre(year, 7, 12);
      } else {
         throw new IllegalArgumentException("Invalid semester: " + semester);
      }
   }

  //le nombre de demande selon le sexe
  @Query("SELECT COUNT(d) FROM DemandeEmploi d WHERE d.demandeur.genre = :sexe")
  int getNombreDemandesEmploiParSexe(@Param("sexe") Sexe sexe);


}
