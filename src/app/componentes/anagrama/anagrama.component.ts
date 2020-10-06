import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../servicios/auth.service";

@Component({
  selector: "app-anagrama",
  templateUrl: "./anagrama.component.html",
  styleUrls: ["./anagrama.component.css"],
})
export class AnagramaComponent implements OnInit {
  ngOnInit() {}

  palabrasParaAdivinar = [
    "palabra",
    "murcielago",
    "hipopotamo",
    "avena",
    "escorpion",
    "alegria",
    "luciernaga",
    "ventana",
    "heladera",
    "alergia",
    "subsuelo",
    "cascara",
    "estante",
  ];
  palabraSecreta: string = "";
  palabraSecretaMezclada: string = "";
  palabraIngresada: string = "";
  mensajeAlUsuario: boolean;
  gano: boolean;
  temporizador: any;
  tiempo: any = 3;
  score: number;
  secondGame: boolean;
  mostrarPalabra: boolean = false;
  constructor(private jugadores: AuthService) {}

  nuevoJuego() {
    this.secondGame = true;
    this.score = 100;
    this.gano = false;
    this.palabraSecreta = this.palabrasParaAdivinar[
      Math.floor(Math.random() * this.palabrasParaAdivinar.length + 1)
    ];

    let arrayDeCaracteresOrdenados = [...this.palabraSecreta];

    this.palabraSecretaMezclada = arrayDeCaracteresOrdenados
      .map((a) => ({ sort: Math.random(), value: a }))
      .sort((a, b) => a.sort - b.sort)
      .map((a) => a.value)
      .toString()
      .replace(/[\,]/gm, " ");
  }

  verificar() {
    if (
      this.palabraIngresada.toLowerCase() == this.palabraSecreta.toLowerCase()
    ) {
      this.gano = true;
      this.jugadores.gano();
    } else {
      this.mensajeAlUsuario = true;
      this.score = this.score - 15 > 0 ? this.score - 15 : 0;
      this.temporizador = setInterval(() => {
        this.tiempo--;
        if (this.tiempo == 0) {
          clearInterval(this.temporizador);
          this.tiempo = 3;
          this.mensajeAlUsuario = false;
        }
      }, 900);
    }
  }
}
