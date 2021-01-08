import { Component, OnInit } from '@angular/core';
import Fragebogen from '../Models/fragebogen';
import Heuristik from '../Models/heuristik';
import Frage from '../Models/frage';
import Antwort from '../Models/antwort';
import { ActivatedRoute, Router } from '@angular/router';
import { FragebogenService } from '../fragebogen.service';
import { Subscription } from 'rxjs';
import { DetailDialogComponent } from '../detail-dialog/detail-dialog.component';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-heuristik',
  templateUrl: './heuristik.component.html',
  styleUrls: ['./heuristik.component.scss']
})

export class HeuristikComponent implements OnInit {

  heuristikList: Array<Heuristik>

  fragebogen: Fragebogen

  buttonsCounter: Object
  frageAntwort: Antwort

  fragebogenId: string
  routeSub: Subscription

  constructor(
      private fragebogenService: FragebogenService,
      private router: Router,
      private route: ActivatedRoute,
      public dialog: MatDialog
    ) {

    //benötigte Objekte initialisieren
    this.fragebogen = new Fragebogen
    this.fragebogen = history.state.fragebogen
    this.heuristikList = new Array
    this.heuristikList.splice(0)


    this.buttonsCounter = new Object
    this.buttonsCounter =
    [
      { id: 1, label: '1'},
      { id: 2, label: '2'},
      { id: 3, label: '3'},
      { id: 4, label: '4'},
      { id: 5, label: '5'},
      { id: 6, label: '6'},
      { id: 7, label: '7'},
      { id: 8, label: 'k.A.'}
    ]

    //Bestimmen welche Heuristiken displayed werden
    this.checkForHeuristiken("HEU1", "Nachvollziehbarkeit und Feedback zur Aufgabenbearbeitung")
    this.checkForHeuristiken("HEU2", "Von der Flexibilität der Vorgehensweisen zur gemeinsamen Weiterentwicklung des Systems")
    this.checkForHeuristiken("HEU3", "Kommunikationsunterstützung für Aufgabenbearbeitung und sozialen Austausch")
    this.checkForHeuristiken("HEU4", "Aufgabengebundener Informationsaustausch für die Erleichterung geistiger Arbeit")
    this.checkForHeuristiken("HEU5", "Aufgabenorganisation für die Balance zwischen Anstrengung und erlebtem Erfolg ")
    this.checkForHeuristiken("HEU6", "Kompatibilität zwischen Anforderungen, Kompetenzentwicklung und Systemeigenschaften")
    this.checkForHeuristiken("HEU7", "Effiziente Organisation der Aufgabenbearbeitung für ganzheitliche Ziele")
    this.checkForHeuristiken("HEU8", "Unterstützende Technik und Ressourcen für produktive und fehlerfreie Arbeit")

    console.log(this.heuristikList)
    console.log(this.fragebogen)
  }


  checkForHeuristiken(_heuristikId: String, titel: String){
    //this.heuristikList.push(this.Heuristik1)
    if(this.fragebogen.heuristiken.includes(_heuristikId)){

            let heuristik = new Heuristik
            heuristik.fragen
            heuristik._heuristikId = _heuristikId
            heuristik.titel = titel

            let idSuffix: number = 1
            let fragen = [new String]
            fragen.splice(0)

            this.fillFragen(fragen , _heuristikId)

            fragen.forEach(element => {
                let frageHeuristik = new Frage
                frageHeuristik.frage = element
                frageHeuristik._frageId = "F" + idSuffix
                idSuffix++
                heuristik.fragen.push(frageHeuristik)
            });
            this.heuristikList.push(heuristik)
    }
  }

  ngOnInit(): void {
    console.log(this.fragebogenService)

    this.routeSub = this.route.params.subscribe(params => {
      console.log(params) //log the entire params object
      this.fragebogenId = params['id'] //log the value of id
    });
  }

  onTableAddClick(frage: Frage){
    frage.anzahlAntworten = new Array(frage.anzahlAntworten.length+1)
  }

  onButtonSaveClick(){
    console.log(this.heuristikList)
    console.log(this.fragebogenId)

    this.fragebogenService.createHeuristik(this.heuristikList, this.fragebogenId).subscribe(
      (heuristikList: Heuristik[]) => {
        heuristikList = this.heuristikList
        this.router.navigate(['/auswertung', this.fragebogenId], {state: {heuristikList}}
      )})
  }

  onRadiobuttonClick(wert: number, _antwortId: string, frage: Frage){
   let found = false;
   for(let i = 0; i < frage.antworten.length; i++) {
    if (frage.antworten[i]._antwortId == _antwortId) {
        frage.antworten[i].wert = wert
        if(frage.antworten[i].beschreibung == "Standardbeschreibung" && Number(_antwortId) != 0){
            frage.antworten[i].beschreibung == "Zusatzskala: " + _antwortId
        }
        found = true;
        break;
      }
    }
    if(!found){
      this.frageAntwort = new Antwort
      this.frageAntwort._antwortId = _antwortId
      this.frageAntwort.wert = wert
      if(Number(_antwortId) != 0) this.frageAntwort.beschreibung = "Zusatzskala: " + _antwortId
      frage.antworten.push(this.frageAntwort)
    }
  }

  onTableRemoveClick(frage: Frage){
    if(frage.anzahlAntworten.length > 1){
    frage.anzahlAntworten = new Array(frage.anzahlAntworten.length-1)

    for(let i = 0; i < frage.antworten.length; i++) {
     if (frage.antworten[i]._antwortId == (frage.antworten.length-1).toString()) {
         frage.antworten.splice(i)
         break;
       }
     }
    }
  }

  checkIfAntwortExistsAndEdit(_antwortId: string, frage: Frage, beschreibung: String){
    let found = false
    for(let i = 0; i < frage.antworten.length; i++) {
      if (frage.antworten[i]._antwortId == _antwortId) {
          frage.antworten[i].beschreibung = beschreibung
          found = true
          break
        }
    }
    if(!found){
      this.frageAntwort = new Antwort
      this.frageAntwort._antwortId = _antwortId
      if(beschreibung != null){
        this.frageAntwort.beschreibung = beschreibung
      }
      frage.antworten.push(this.frageAntwort)
    }
      console.log(frage)
  }

  antwortBeschreibungFocusOutFunction(_antwortId: string, frage: Frage, beschreibung: String){
    this.checkIfAntwortExistsAndEdit(_antwortId, frage, beschreibung)
  }

  onButtonDetailsClick(heuristik: Heuristik, frage: Frage){
    let getDetails = this.fragebogenService.getDetailview(frage._frageId.toString(), heuristik._heuristikId.toString()).subscribe(
      data => {
        let _fragebogenId
        this.routeSub = this.route.params.subscribe(params => {
          console.log(params) //log the entire params object
          _fragebogenId = params['id'] //log the value of id
        });
          let detailData = data as Object
          let detailFragen = detailData[0].details
          let details = {
            detailFragen: detailFragen,
            heuristikTitel: heuristik.titel,
            frageTitel: frage.frage,
            _frageId: frage._frageId,
            _heuristikId: heuristik._heuristikId,
            _fragebogenId: _fragebogenId,
            isFragebogen: true
          }
          this.openDialog(details, frage)
      },
      err => {
        console.log(err);
      })
  }

  openDialog(details: Object, frage: Frage){
    try{
      const dialogRef = this.dialog.open(DetailDialogComponent, {
        data: {details : details}
      })

      dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog result: ${result}`);
        frage.detailNotiz = result
      });

    }catch(e){console.log(e)}
  }

  fillFragen(fragen: String[], _heuristikId: String){
    switch(_heuristikId){
      case "HEU1":
        fragen.push("Mir ist bewust, welchen Beitrag ich zum Erfolg des Teams leiste.")
        fragen.push("Ich kann nachvollziehen was meine Kollegen und Kolleginnen leisten.")
        fragen.push("Ich bekomme zeitnah angemessenes Feedback zu meiner Arbeit von den richtein Ansprechpersonen.")
        fragen.push("Ich weiß, was meine Kollegen von mir erwarten.(Z.B. wie schnell und wie gut ich meine Arbeit erledige)")
        fragen.push("Ich kenne immer den aktuellen Fortschritt des Arbeitsprozesses, an dem ich gerade arbeite.")
        fragen.push("Die nächsten Schritte im Arbeitsprozess sind mir klar oder ich habe die Möglichkeit diese zu erkunden")
        fragen.push("Mir ist bewusst, welche Schritte (im Arbeitsprozess) gerade nicht möglich sind.")
        fragen.push("Ich weiß, welchen Einfluss meine Arbeitsschritte auf die Arbeitsschritte meiner Kolleginnen und Kollegen haben.")
        fragen.push("Ich kenne die Arbeitsprozesse und Abläufe an denen ich beteiligt bin.")
        fragen.push("Ich habe Informationen über Arbeitsprozesse und Schritte, die ich für meine Arbeit benötige.")
        fragen.push("Informationen über Arbeitsprozesse und -Schritte sind verständlich und in der richtigen Situation verfügbar.")
        fragen.push("Ich kann die Menge der Informationen, die ich bekomme, festlegen und deren Darstellung anpassen.")
        fragen.push("Die Informationen helfen mir dabei mein Arbeitsumfeld und neue/komplizierte Situationen besser zu verstehen.")
      break

      case "HEU2":
        fragen.push("In unserem Team teilen wir die Aufgaben selbstständig unter uns auf und tauschen uns über gemeinsame Arbeiten aus.")
        fragen.push("Ich kann selbst bestimmen, wie und womit ich meine Aufgaben erledige, z.B. in welcher Reihenfolge ich meine Aufgaben bearbeite und welche Werkzeuge oder Programme ich dafür verwende. Darunter fallen z.B. Programme, Software und andere (technische) Unterstützung.")
        fragen.push("Ich beherrsche die Technik und nicht anders herum.")
        fragen.push("Ich kann ausprobieren wie sich meine Anpassungen und Eingriffe auf die Technik und die Organisation der Arbeitsabläufe auswirken. Das betrifft z.B. auch wie sich Änderungen von Einstellungen am System, Programmen und Dokumenten auf die Arbeit auswirken.")
        fragen.push("Durch ständig wechselnde Aufgaben kann ich verschiedene meiner Fähigkeiten weiterentwickeln.")
        fragen.push("Ich profitiere von meinen steigenden Fähigkeiten; z.B. durch mehr Mitsprachemöglichkeiten, vielfältigere Aufgaben oder weniger Aufwand bei gleicher Arbeit.")
        fragen.push("Mein Arbeitsumfeld entwickelt sich ständig weiter und ich kann auf diese Entwicklung Einfluss nehmen. Das umfasst unter anderem meine Aufgaben, Arbeitsabläufe, technische Ausstattung und mein soziales Umfeld.")
        fragen.push("Durch Ausprobieren verschiedener Techniklösungen und Vorgehensweisen können wir als Team unsere Arbeitsweise ständig verbessern.")
        fragen.push("Wir kommen als Team auch mit neuen Herausforderungen und Änderungen der Arbeitsumgebung zurecht.")
      break

      case "HEU3":
        fragen.push("Ich habe regelmäßig Gelegenheiten mich mit meinen Kollegen und Kolleginnen auszutauschen, um z.B. wichtige Themen zu besprechen, nach Hilfe zu fragen oder Aufgaben zu verteilen.")
        fragen.push("Für Gespräche oder den Austausch von Informationen stehen verschiedene Möglichkeiten zur Verfügung (geeignete Räume, Telefon, Video, Textnachrichten, oder anderes).")
        fragen.push("Meine Kollegen/-innen und Vorgesetzten sind erreichbar, wenn ich etwas zu besprechen habe.")
        fragen.push("Ich kann meine Erreichbarkeit anpassen, um nicht bei wichtigen Aufgaben oder in meiner Freizeit gestört zu werden.")
        fragen.push("Ich kann mit meinen Vorgesetzten und Kollegen/-innen auch über schwierige Themen offen sprechen. (z.B. Konflikte, Überforderung, Probleme)")
        fragen.push("Bei vertraulichen Gesprächen kann ich mich darauf verlassen, dass meine privaten Informationen nicht mit anderen geteilt werden.")
        fragen.push("Es gibt auch Gelegenheiten über Themen zu sprechen, die nichts direkt mit der Arbeit zu tun haben oder sich spontan ergeben.")
        fragen.push("Ich bespreche mit meinen Kollegen/-innen was wir gegenseitig voneinander erwarten und welche aktuellen Pflichten wir haben, so dass wir uns besser aufeinander einstellen können.")
        fragen.push("Beim Besprechen von Aufgaben habe ich auch Zeit meine Kollegen besser kennen zu lernen. Dadurch verstehe ich ihre Arbeitsweise und weiß, was ich von ihnen erwarten kann.")
        break

      case "HEU4":
        fragen.push("Ich muss keine Informationen auswendig lernen. Alle Informationen, die ich an meinem Arbeitsplatz brauche, kann ich sofort nachgucken und muss auch nicht den Ort wechseln.")
        fragen.push("Wenn ich an einem Gerät (z.B. Computer, Smartphone, Tablet) arbeite, kann ich mir alle benötigten Informationen direkt an dem Gerät anzeigen lassen.")
        fragen.push("Informationen, die ich für eine Aufgabe benötige, sind an einem (Speicher-)Ort oder in einem Programm gesammelt. Ich muss nicht zwischen mehreren Programmen wechseln um alle Informationen zu bekommen, die ich für meine Arbeit brauche.")
        fragen.push("Die angezeigten Informationen sind gut geordnet und ich kann sie leicht verstehen.")
        fragen.push("Mir wird immer genau das angezeigt, was ich gerade brauche. Ich bekomme nicht zu viel und nicht zu wenig Informationen.")
        fragen.push("Die Informationen beziehen sich auf meine aktuelle Situation und sind für meine Arbeit wichtig.")
        fragen.push("Alle Informationen sind auf dem neusten Stand. Ich kann mich darauf verlassen, dass die Informationen richtig sind.")
        fragen.push("Informationen, die ich selbst eingegeben habe, kann ich jederzeit anschauen.")
        fragen.push("Ich weiß, welche Daten über mich gespeichert werden. Das gilt sowohl für Daten, die ich persönlich eingebe, als auch für Daten, die von anderen über mich, oder automatisch erhoben werden (z.B. durch technische Geräte oder Programme).")
        fragen.push("Es werden nur Daten über mich gespeichert, wenn das für die Erledigung von Aufgaben wichtig ist. Dabei können auch nur Personen meine Daten sehen, die sie auch wirklich brauchen. Jedes Mal, wenn meine Daten mit anderen verglichen werden, muss ich dem zustimmen.")
        fragen.push("Ich kann selber kontrollieren, welche Daten über mich gespeichert werden und was damit gemacht wird. Wenn Daten nicht richtig sind, kann ich sie korrigieren. Daten über mich, die keiner sehen soll, kann ich löschen.")
      break

      case "HEU5":
        fragen.push("Ich kann meine Aufgaben sinnvoll aneinanderreihen oder miteinander kombinieren.")
        fragen.push("Die Aufgaben sind unter mir und meinen Kollegen/-innen gerecht aufgeteilt. Niemand wird überfordert oder unterfordert.")
        fragen.push("Wenn ich bei meiner Arbeit technisch unterstützt werde, hilft mir die Technik und stört mich nicht bei der Arbeit. Der Aufwand beim Nutzen von technischen Geräten zahlt sich aus.")
        fragen.push("Die Aufgaben, die ich bearbeite, sind abwechslungsreich und ich lerne immer wieder etwas dazu.")
        fragen.push("Ich kann meine Aufgaben ohne Probleme erledigen. Stress und körperliche Belastung (auch von mehreren Aufgaben hintereinander) sind nicht zu viel für mich.")
        fragen.push("Meine Aufgaben erledige ich optimal auf meine Gesundheit und körperliche Belastbarkeit angepasst.")
        fragen.push("Ich erledige regelmäßig Aufgaben die ich gerne mache oder die mich interessieren. Ich komme dabei meinen beruflichen Zielen näher.")
        fragen.push("Meine Arbeit macht mir Spaß und ich weiß, warum ich sie erledige.")
        fragen.push("Es lohnt sich, dass ich mich bei der Arbeit anstrenge. Ich sehe den Erfolg meiner Arbeit.")
        fragen.push("Ich werde fachlich und körperlich immer wieder gefordert. Dabei sind die Anforderungen nicht so hoch, dass ich überfordert werde oder mich unwohl fühle.")
        fragen.push("Bei meiner Arbeit setzte ich alle meine Fertigkeiten und mein komplettes Wissen ein. Es gibt keinen Bereich, den ich nicht einsetzte, oder der vernachlässigt wird.")
        fragen.push("Immer, wenn ich mich mit einem Kollegen oder einer Kollegin unterhalten möchte, finde ich einen/eine Gesprächspartner/-in. Das gilt sowohl für fachliche als auch private Gespräche.")
        fragen.push("Ich kann den Stress der Arbeit auf ein erträgliches Maß reduzieren. Ich habe keine gesundheitlichen Auswirkungen durch beruflichen Stress.")
        fragen.push("Meine fachlichen und körperlichen Anforderungen und der erreichte Nutzen werden objektiv gemessen. Ich muss mich nicht nur auf mein Gefühl oder das Gefühl meiner Vorgesetzten verlassen.")
        fragen.push("Der durch mich erreichte Nutzen für mein Team oder das Unternehmen ist angemessen für meinen Aufwand.")
        fragen.push("Aufwand und Nutzen sind sowohl bei der täglichen Arbeit, als auch bei Projekten oder Veränderungen der Arbeitsumgebung ausgeglichen.")
        fragen.push("Die Balance zwischen Aufwand und Erfolg, bzw. Fortschritt gilt nicht nur für mich, sondern auch für mein Team und das ganze Unternehmen. Die Anstrengungen und Ergebnisse von verschiedenen Abteilungen sind vergleichbar.")
      break

      case "HEU6":
        fragen.push("Die technische Ausstattung meiner Arbeitsumgebung entspricht den heutigen Standards. Das umfasst sowohl die eingesetzte Hardware, als auch die Programme und Tools bzw. Werkzeuge. Die verschiedenen technischen Komponenten passen zueinander und erlauben eine einfache Aufgabenbearbeitung.")
        fragen.push("Die Prozesse die wir einsetzen, sind der übliche Standard oder am besten geeignet um unsere Aufgaben zu erledigen. Technische Ausstattung und Prozesse sind aufeinander abgestimmt und unterstützen mich bei meiner Arbeit.")
        fragen.push("Die Prozesse sind aufeinander abgestimmt und erlauben eine sinnvolle und reibungslose Bearbeitung unserer Aufgaben.")
        fragen.push("Wir verwenden die gleiche Sprache und Fachsprache wie unsere Kunden und Vertragspartner. Es gibt keine Missverständnisse in unserem Team, in Zusammenarbeit mit anderen Abteilungen oder im Austausch mit Kunden oder externen Partnern.")
        fragen.push("Meine persönlichen Ziele, die Ziele, die wir als Team verfolgen und die Ziele des Unternehmens passen zusammen. Ich kann mich mit allen Zielen identifizieren.")
        fragen.push("Ich stimme mit den ethischen und politischen Einstellungen meines Unternehmens überein. Das Unternehmen hält sich an rechtliche Vorgaben.")
        fragen.push("Bei der Bearbeitung von Aufgaben werden keine ethischen Grundsätze verletzt.")
        fragen.push("Alle anwendbaren rechtlichen Regelungen werden eingehalten. Das betrifft neben den themenspezifischen fachlichen Auflagen z.B. Arbeitsrecht, Arbeitsschutz, Persönlichkeitsrechte, Strafrecht, Urheberrecht, Datenschutz, etc.")
        fragen.push("Die Arbeitsumgebung wird immer an die aktuelle Situation angepasst. Das bedeutet unter Anderem, dass die technische Ausstattung auf dem neusten Stand gehalten wird, die Organisation von Aufgaben und Prozessen überdacht wird und sich die sozialen Beziehungen zwischen Mitarbeitern und Mitarbeiterinnen und deren Vorgesetzten anpassen können.")
        fragen.push("Ich kann mich in die Weiterentwicklung und Verbesserung meiner Arbeitsumgebung einbringen.")
        fragen.push("Wenn es technische und organisatorische Änderungen meiner Arbeitsumgebung oder Veränderungen der sozialen Beziehungen in meinem Team gibt werden die anderen beiden Bereiche auf notwenige Anpassungen untersucht. Dadurch wird die Arbeitsumgebung kontinuierlich weiterentwickelt.")
        fragen.push("Alle Mitarbeiter und Mitarbeiterinnen werden offen und gut verständlich über Anpassungen und Änderungen informiert.")
        fragen.push("Ich kann verstehen warum die Änderungen gemacht wurden und welche Folgen sie auf meine Arbeitsumgebung haben werden.")
        fragen.push("Ich weiß, wie ich Änderungen umsetzen kann. Ich bekomme Hinweise und Anleitungen. Wenn ich Hilfe benötige, bekomme ich sie. Das passiert auch, wenn ich nicht ausdrücklich danach frage.")
        fragen.push("Durch das Umsetzen von Änderungen und die Bewältigung neuer Situationen erweitere ich meine Kompetenzen immer weiter. Die gewonnenen Erfahrungen kann ich in zukünftigen Herausforderungen einsetzen und anderen Kollegen und Kolleginnen helfen.")
        fragen.push("Durch gewonnene Erfahrungen profitieren nicht nur einzelne Personen, sondern das ganze Team oder das Unternehmen.")
        fragen.push("Die Grenzen für mögliche Änderungen der Arbeitsumgebung und Anpassungen an die Situation innerhalb und außerhalb des Unternehmens werden klar kommuniziert. Ich verstehe, welche Möglichkeiten es gibt und wie ich diese nutzen kann.")
        fragen.push("Die technische Ausstattung, Prozesse und Kollegen/-innen helfen mir dabei neue Herausforderungen und Aufgaben zu meistern.")
        break

      case "HEU7":
        fragen.push("Die Reihenfolge und Kombination meiner Aufgaben ist sinnvoll und erleichtert die Bearbeitung. Ich habe das Gefühl mit meinen Arbeitsschritten auch etwas zu erreichen.")
        fragen.push("Meine Aufgaben sind so geplant, dass ich sie problemlos erledigen kann, ohne die Arbeit einer Kollegen zu stören oder von ihnen beeinträchtigt zu werden. Die Verteilung der Aufgaben in unserem Team unterstützt das")
        fragen.push("Wenn wir gemeinsam an den gleichen Aufgaben oder Geräten arbeiten, müssen wir nicht aufeinander warten und kommen uns auch nicht in die Quere")
        fragen.push("Arbeitsschritte, die auch von Programmen oder Maschinen erledigt werden können, werdentechnisch bearbeitet. Ich muss keine Aufgaben machen, die ein Computer oder Roboter machen könnte.")
        fragen.push("Die Verteilung der Aufgaben zwischen Technik und uns Mitarbeitern/-innen ist sinnvoll und erleichtert unsere Arbeit")
        fragen.push("Ich kann meine Aufgaben effizient erledigen. Es gibt keine unnötigen Schritte und ich kann die Bearbeitung flexibel an die Situation anpassen.")
        fragen.push("Ich muss Arbeitsschritte nicht wiederholen, weil zwischendurch Fehler aufgetreten sind. Daten und Materialien werden zwischen Arbeitsschritten kontrolliert, damit Fehler gefunden werden bevor damit weitergearbeitet wird")
        fragen.push("In unserem Team unterstützen wir uns gegenseitig. Wir tauschen unsere Erfahrungen aus und helfen unseren Kollegen/-innen bei neuen Aufgaben, oder wenn sie Hilfe brauchen.")
        fragen.push("Bei unseren Aufgaben vermeiden wir es Material und Zeit aufzuwenden, wenn das nicht notwendig ist. Durch Erfahrung, Unterstützung durch Kollegen/-innen und die eingesetzte Technik werden Fehler und damit unnötiger Aufwand vermieden.")
        fragen.push("Bei unseren Aufgaben arbeiten nur Personen mit, die auch für die Erledigung der Aufgabe gebraucht werden. Wir werden dabei auch nicht von Mitarbeitern/-innen anderer Abteilungen oder von außen gestört.")
        fragen.push("Bei meiner Arbeit gibt es keine unnötigen Hindernisse")
        fragen.push("Ich kann meine Aufgaben körperlich und geistig gut erledigen. Ich mache mir keine Sorgen um meine Gesundheit.")
        fragen.push("Die Technik und Organisation wird immer besser. Wir können durch die Weiterentwicklung unserer Arbeitsumgebung immer besser arbeiten.")
      break

      case "HEU8":
        fragen.push("Die eingesetzte Technik unterstütz mich bei meiner Arbeit. Die Erledigung meiner Aufgaben wird durch eingesetzte Software und Hardware einfacher.")
        fragen.push("Die eingesetzte Technik unterstützt die Kooperation mit Kollegen/-innen und externen Partnern. Ich kann reibungslos mit ihnen zusammenarbeiten.")
        fragen.push("Geräte und Programme, die ich nutze, sind einfach und schnell zu bedienen. Ich habe keine Probleme bei der Nutzung.")
        fragen.push("Je mehr ich die Technik benutze, desto einfacher fällt mir das. Ich werde mit steigender Erfahrung immer schneller.")
        fragen.push("Niemand aus meinem Team hat Probleme bei der Nutzung von Programmen oder Geräten.")
        fragen.push("Ich finde die eingesetzte Technik gut und komme gut damit zurecht.")
        fragen.push("Die Geräte und Programme sind zuverlässig und machen immer das, was ich möchte")
        fragen.push("Ich kann die Programme und Geräte dann nutzen, wann ich sie brauche. Auch die Informationen und Daten die ich nutze sind immer verfügbar, wenn ich sie brauche.")
        fragen.push("Der Zugang zu Geräten, Daten und Informationen ist unkompliziert und funktioniert zuverlässig. Der Aufwand, den ich bei der Benutzung habe, lohnt sich für meine Arbeit")
        fragen.push("Bei meiner Arbeit muss ich nicht auf Technik warten. Geräte, Programme und die angezeigten Daten und Informationen sind so schnell verfügbar, dass ich keine Wartezeiten habe oder Pausen machen muss.")
        fragen.push("Ich kann Daten nicht ausversehen löschen. Ich habe auch noch keine Daten gesucht, die jemand anderes ausversehen gelöscht hat.")
        fragen.push("Wenn ich Fehler mache, weißt mich die Technik darauf hin und ich kann sie schnell wieder rückgängig machen.")
        fragen.push("Wenn ich mit Kollegen/-innen gemeinsam an den gleichen Aufgaben oder Geräten arbeite, passieren uns keine Fehler. Auch wenn wir gleichzeitig arbeiten oder uns nicht Absprechen gibt es keine Probleme.")
        fragen.push("Wenn Fehler passieren, fallen sie schnell auf und können behoben werden, bevor sie schlimmer werden oder neue Fehler dazukommen.")
        fragen.push("Programme und Geräte warnen mich bevor ich einen Fehler mache und schlagen mir eine Alternative vor.")
        fragen.push("Auch wenn ich es versuche, kann ich die Technik nicht falsch bedienen. Größere Schäden oder langfristige Probleme werden so vermieden.")
        fragen.push("Wenn mir auffällt, dass etwas nicht richtig funktioniert, kann ich immer zu einem funktionierenden Zustand zurückgehen.")
        fragen.push("Die Geräte, Programme, Daten und Informationen sind immer auf dem aktuellsten Stand.")
        fragen.push(" Die Technik wird immer weiterentwickelt und an neue Situationen angepasst.")
        fragen.push(" Die gerade angesprochenen Punkte funktionieren gut zusammen und arbeiten nicht gegeneinander.")
      break

    }


  }
}
