import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { JuegoAgilidad } from "../../clases/juego-agilidad";

@Component({
  selector: "app-agilidad-aritmetica",
  templateUrl: "./agilidad-aritmetica.component.html",
  styleUrls: ["./agilidad-aritmetica.component.css"],
})
export class AgilidadAritmeticaComponent implements OnInit {
  @Output()
  enviarJuego: EventEmitter<any> = new EventEmitter<any>();
  nuevoJuego: JuegoAgilidad;
  ocultarVerificar: boolean;
  Tiempo: number;
  repetidor: any;

  public primerNumero: number;
  public segundoNumero: number;
  public operador: string;
  public operadores: string[] = ["*", "/", "+", "-"];
  public calcular = {
    "+": (x, y) => x + y,
    "-": (x, y) => x - y,
    "*": (x, y) => x * y,
    "/": (x, y) => x / y,
  };

  ngOnInit() {}

  constructor() {
    this.ocultarVerificar = true;
    this.Tiempo = 5;
    this.nuevoJuego = new JuegoAgilidad();
    console.info("Inicio agilidad");
  }

  NuevoJuego() {
    this.ocultarVerificar = false;
    this.generarNumeros();
    this.repetidor = setInterval(() => {
      this.Tiempo--;
      console.log("llego", this.Tiempo);
      if (this.Tiempo == 0) {
        this.verificar();
      }
    }, 900);
  }

  public generarNumeros(): void {
    this.operador = this.operadores[Math.floor(Math.random() * 4)];
    this.primerNumero = Math.floor(Math.random() * 9 + 1);
    this.segundoNumero = Math.floor(Math.random() * 9 + 1);
  }

  public verificar(): void {
    this.restart();
    const numeroIng = this.nuevoJuego.numeroIngresado;
    const operacion = this.calcular[this.operador](
      this.primerNumero,
      this.segundoNumero
    );
    this.nuevoJuego.gano = +operacion === +numeroIng;
  }

  public restart(): void {
    clearInterval(this.repetidor);
    this.ocultarVerificar = true;
    this.Tiempo = 5;
  }
}
