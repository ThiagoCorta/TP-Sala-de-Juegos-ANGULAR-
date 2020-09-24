import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-cabecera",
  templateUrl: "./cabecera.component.html",
  styleUrls: ["./cabecera.component.css"],
})
export class CabeceraComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {}

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
    }
  }
}
