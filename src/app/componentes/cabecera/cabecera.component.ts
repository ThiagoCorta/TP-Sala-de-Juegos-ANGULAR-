import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject } from "rxjs";
import { AuthService } from "../../servicios/auth.service";

@Component({
  selector: "app-cabecera",
  templateUrl: "./cabecera.component.html",
  styleUrls: ["./cabecera.component.css"],
})
export class CabeceraComponent implements OnInit {
  public isLoged$: BehaviorSubject<boolean>;
  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit() {
    this.isLoged$ = this.authService.isLoged$;
    this.isLoged$.subscribe((data) => {
      console.log(data);
    });
  }

  Juego(tipo: string) {
    switch (tipo) {
      case "Adivina":
        this.router.navigate(["/Juegos/Adivina"]);
        break;
      case "Agilidad":
        this.router.navigate(["/Juegos/Agilidad"]);
        break;
      case "AdivinaMasListado":
        this.router.navigate(["/Juegos/AdivinaMasListado"]);
        break;
      case "AgilidadaMasListado":
        this.router.navigate(["/Juegos/AgilidadaMasListado"]);
        break;
      case "PPT":
        this.router.navigate(["/Juegos/PPT"]);
        break;
      case "Tateti":
        this.router.navigate(["/Juegos/Tateti"]);
        break;
      case "Arkanoid":
        this.router.navigate(["/Juegos/Arkanoid"]);
        break;
      case "Anagrama":
        this.router.navigate(["/Juegos/Anagrama"]);
        break;
      case "Memotest":
        this.router.navigate(["/Juegos/Memotest"]);
        break;
    }
  }
}
